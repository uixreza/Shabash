import { toJalaali } from "jalaali-js";
import { prisma, withDbRetry } from "@/lib/db";
import { toFaDigits } from "@/lib/format";
import { toJalaliDateString } from "@/lib/jalali";
import type { WeddingRequest as DbWeddingRequest } from "@/lib/generated/prisma/client";
import type {
  BudgetLine,
  RequestService,
  RequestStatus,
  WeddingRequest,
} from "@/data/requests";

function parseBudgetAllocation(value: unknown): BudgetLine[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const { service, amount } = entry as { service?: unknown; amount?: unknown };
    if (typeof service !== "string" || typeof amount !== "number") return [];
    return [{ service, amount }];
  });
}

function parseServices(value: unknown): RequestService[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const { id, label, done } = entry as {
      id?: unknown;
      label?: unknown;
      done?: unknown;
    };
    if (typeof id !== "string" || typeof label !== "string") return [];
    return [{ id, label, done: done === true }];
  });
}

export function toWeddingRequestView(
  row: DbWeddingRequest
): WeddingRequest {
  const submitted = toJalaali(row.submittedAt);
  return {
    id: row.id,
    groomName: row.groomName,
    brideName: row.brideName,
    phone: row.phone,
    weddingDate: row.weddingDate ? toFaDigits(row.weddingDate) : null,
    venue: row.venue,
    style: row.style,
    notes: row.notes,
    budgetTotal: row.budgetTotal,
    budgetAllocation: parseBudgetAllocation(row.budgetAllocation),
    services: parseServices(row.services),
    status: row.status as RequestStatus,
    submittedAt: toFaDigits(
      toJalaliDateString(submitted.jy, submitted.jm, submitted.jd)
    ),
  };
}

export async function listWeddingRequests(
  phone: string
): Promise<WeddingRequest[]> {
  const rows = await withDbRetry(() =>
    prisma.weddingRequest.findMany({
      where: { phone },
      orderBy: { submittedAt: "desc" },
    })
  );
  return rows.map(toWeddingRequestView);
}

export async function getWeddingRequest(
  phone: string,
  id: string
): Promise<WeddingRequest | null> {
  const row = await withDbRetry(() =>
    prisma.weddingRequest.findFirst({ where: { id, phone } })
  );
  return row ? toWeddingRequestView(row) : null;
}
