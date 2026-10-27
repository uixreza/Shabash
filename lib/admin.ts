import { getServerSession } from "next-auth";
import { toJalaali } from "jalaali-js";
import type { RequestStatus, WeddingRequest } from "@/data/requests";
import { authOptions } from "@/lib/auth";
import { prisma, withDbRetry } from "@/lib/db";
import { toFaDigits } from "@/lib/format";
import { toJalaliDateString } from "@/lib/jalali";
import { toWeddingRequestView } from "@/lib/requests";

export const REQUEST_STATUSES: RequestStatus[] = [
  "submitted",
  "under_review",
  "consultation_scheduled",
  "consultation_completed",
];

export const TICKET_STATUSES = ["pending", "answered", "closed"] as const;

export type TicketStatus = (typeof TICKET_STATUSES)[number];

export function isRequestStatus(value: unknown): value is RequestStatus {
  return (
    typeof value === "string" &&
    (REQUEST_STATUSES as string[]).includes(value)
  );
}

export function isTicketStatus(value: unknown): value is TicketStatus {
  return (
    typeof value === "string" && (TICKET_STATUSES as readonly string[]).includes(value)
  );
}

export type AdminUser = { id: number; phone: string };

/** Session user only if the database row has the admin role (source of truth). */
export async function getAdminUser(): Promise<AdminUser | null> {
  const session = await getServerSession(authOptions);
  const phone = session?.user?.phone;
  if (!phone) return null;
  const user = await withDbRetry(() =>
    prisma.user.findUnique({
      where: { phone },
      select: { id: true, role: true },
    })
  );
  if (!user || user.role !== "admin") return null;
  return { id: user.id, phone };
}

export type AdminTicketView = {
  id: number;
  title: string;
  category: string;
  date: string;
  status: TicketStatus;
  userPhone: string;
  messages: {
    id: number;
    role: "user" | "support";
    text: string;
    time: string;
  }[];
};

function formatJalaliDate(value: Date): string {
  const date = toJalaali(value);
  return toFaDigits(toJalaliDateString(date.jy, date.jm, date.jd));
}

function formatClock(value: Date): string {
  return toFaDigits(
    new Intl.DateTimeFormat("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Tehran",
    }).format(value)
  );
}

export async function listAllWeddingRequests(
  status?: RequestStatus
): Promise<WeddingRequest[]> {
  const rows = await withDbRetry(() =>
    prisma.weddingRequest.findMany({
      where: status ? { status } : undefined,
      orderBy: { submittedAt: "desc" },
    })
  );
  return rows.map(toWeddingRequestView);
}

export async function getWeddingRequestAdmin(
  id: string
): Promise<WeddingRequest | null> {
  const row = await withDbRetry(() =>
    prisma.weddingRequest.findUnique({ where: { id } })
  );
  return row ? toWeddingRequestView(row) : null;
}

export async function listAllSupportTickets(): Promise<AdminTicketView[]> {
  const tickets = await withDbRetry(() =>
    prisma.supportTicket.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        user: { select: { phone: true } },
        messages: { orderBy: { createdAt: "asc" } },
      },
    })
  );
  return tickets.map((ticket) => ({
    id: ticket.id,
    title: ticket.title,
    category: ticket.category,
    date: formatJalaliDate(ticket.createdAt),
    status: ticket.status,
    userPhone: ticket.user.phone,
    messages: ticket.messages.map((message) => ({
      id: message.id,
      role: message.sender,
      text: message.body,
      time: formatClock(message.createdAt),
    })),
  }));
}

export type ConsoleStats = {
  requests: number;
  requestsByStatus: Record<RequestStatus, number>;
  users: number;
  tickets: number;
  openTickets: number;
};

export async function getConsoleStats(): Promise<ConsoleStats> {
  const [requestGroups, users, ticketGroups] = await Promise.all([
    withDbRetry(() =>
      prisma.weddingRequest.groupBy({ by: ["status"], _count: { _all: true } })
    ),
    withDbRetry(() => prisma.user.count()),
    withDbRetry(() =>
      prisma.supportTicket.groupBy({ by: ["status"], _count: { _all: true } })
    ),
  ]);

  const requestsByStatus: Record<RequestStatus, number> = {
    submitted: 0,
    under_review: 0,
    consultation_scheduled: 0,
    consultation_completed: 0,
  };
  let requests = 0;
  for (const group of requestGroups) {
    requestsByStatus[group.status as RequestStatus] = group._count._all;
    requests += group._count._all;
  }

  let tickets = 0;
  let openTickets = 0;
  for (const group of ticketGroups) {
    tickets += group._count._all;
    if (group.status !== "closed") openTickets += group._count._all;
  }

  return { requests, requestsByStatus, users, tickets, openTickets };
}
