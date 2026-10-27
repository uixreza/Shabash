"use server";

import { revalidatePath } from "next/cache";
import { CHECKLIST_ITEMS, type RequestStatus, type WeddingRequest } from "@/data/requests";
import {
  getAdminUser,
  isRequestStatus,
  isTicketStatus,
} from "@/lib/admin";
import { prisma, withDbRetry } from "@/lib/db";
import { isValidIranPhone, normalizeIranPhone, toFaDigits } from "@/lib/format";
import { isValidJalaliDateString } from "@/lib/jalali";
import { toWeddingRequestView } from "@/lib/requests";

export type AdminTicketMessage = {
  id: number;
  role: "user" | "support";
  text: string;
  time: string;
};

function formatClock(value: Date): string {
  return toFaDigits(
    new Intl.DateTimeFormat("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Tehran",
    }).format(value)
  );
}

function revalidateConsole(id?: string) {
  revalidatePath("/console");
  revalidatePath("/console/requests");
  revalidatePath("/console/tickets");
  if (id) revalidatePath(`/console/requests/${id}`);
}

export async function updateWeddingRequestStatus(input: {
  id?: string;
  status?: string;
}): Promise<{ ok: boolean; error?: string; status?: RequestStatus }> {
  const id = typeof input?.id === "string" ? input.id.trim() : "";
  const status = input?.status;
  if (!id) return { ok: false, error: "درخواست معتبر نیست" };
  if (!isRequestStatus(status))
    return { ok: false, error: "وضعیت انتخاب‌شده معتبر نیست" };

  try {
    const admin = await getAdminUser();
    if (!admin) return { ok: false, error: "دسترسی مدیریت ندارید" };

    const existing = await withDbRetry(() =>
      prisma.weddingRequest.findUnique({ where: { id }, select: { id: true } })
    );
    if (!existing) return { ok: false, error: "درخواست پیدا نشد" };

    await withDbRetry(() =>
      prisma.weddingRequest.update({ where: { id }, data: { status } })
    );
    revalidateConsole(id);
    return { ok: true, status };
  } catch (error) {
    console.error("[شاباشچی] خطا در تغییر وضعیت درخواست:", error);
    return { ok: false, error: "تغییر وضعیت ناموفق بود؛ لطفاً دوباره تلاش کنید" };
  }
}

export async function updateWeddingRequest(input: {
  id?: string;
  groomName?: string;
  brideName?: string;
  phone?: string;
  weddingDate?: string | null;
  venue?: string | null;
  style?: string | null;
  notes?: string | null;
  budgetTotal?: number | null;
  services?: { id?: string; done?: boolean }[];
}): Promise<{ ok: boolean; error?: string; request?: WeddingRequest }> {
  const id = typeof input?.id === "string" ? input.id.trim() : "";
  if (!id) return { ok: false, error: "درخواست معتبر نیست" };

  const groomName = (input?.groomName ?? "").trim();
  const brideName = (input?.brideName ?? "").trim();
  if (!groomName || !brideName)
    return { ok: false, error: "نام داماد و عروس الزامی است" };
  if (groomName.length > 100 || brideName.length > 100)
    return { ok: false, error: "نام باید حداکثر ۱۰۰ کاراکتر باشد" };

  const phone = normalizeIranPhone(input?.phone ?? "");
  if (!isValidIranPhone(phone))
    return { ok: false, error: "شماره موبایل معتبر نیست" };

  const weddingDateRaw = (input?.weddingDate ?? "").trim();
  if (weddingDateRaw && !isValidJalaliDateString(weddingDateRaw))
    return { ok: false, error: "تاریخ عروسی باید به صورت شمسی (مثال: ۱۴۰۵/۰۸/۰۶) باشد" };

  const venue = (input?.venue ?? "").trim() || null;
  const style = (input?.style ?? "").trim() || null;
  const notes = (input?.notes ?? "").trim() || null;
  if ((venue?.length ?? 0) > 200)
    return { ok: false, error: "مکان برگزاری حداکثر ۲۰۰ کاراکتر باشد" };
  if ((style?.length ?? 0) > 200)
    return { ok: false, error: "سبک یا تم حداکثر ۲۰۰ کاراکتر باشد" };
  if ((notes?.length ?? 0) > 2000)
    return { ok: false, error: "توضیحات حداکثر ۲۰۰۰ کاراکتر باشد" };

  const budgetRaw = input?.budgetTotal;
  let budgetTotal: number | null = null;
  if (budgetRaw !== null && budgetRaw !== undefined) {
    const value = Number(budgetRaw);
    if (!Number.isFinite(value) || value < 0 || !Number.isSafeInteger(value))
      return { ok: false, error: "بودجه تخمینی باید عدد صحیح مثبت باشد" };
    budgetTotal = value;
  }

  let services: { id: string; label: string; done: boolean }[] | undefined;
  if (Array.isArray(input?.services)) {
    const parsed: { id: string; label: string; done: boolean }[] = [];
    for (const entry of input.services) {
      const item = CHECKLIST_ITEMS.find((c) => c.id === entry?.id);
      if (!item) return { ok: false, error: "خدمت انتخاب‌شده معتبر نیست" };
      parsed.push({ id: item.id, label: item.label, done: entry?.done === true });
    }
    services = parsed;
  }

  try {
    const admin = await getAdminUser();
    if (!admin) return { ok: false, error: "دسترسی مدیریت ندارید" };

    const existing = await withDbRetry(() =>
      prisma.weddingRequest.findUnique({ where: { id }, select: { id: true } })
    );
    if (!existing) return { ok: false, error: "درخواست پیدا نشد" };

    const row = await withDbRetry(() =>
      prisma.weddingRequest.update({
        where: { id },
        data: {
          groomName,
          brideName,
          phone,
          weddingDate: weddingDateRaw || null,
          venue,
          style,
          notes,
          budgetTotal,
          ...(services ? { services } : {}),
        },
      })
    );
    revalidateConsole(id);
    return { ok: true, request: toWeddingRequestView(row) };
  } catch (error) {
    console.error("[شاباشچی] خطا در ویرایش درخواست:", error);
    return { ok: false, error: "ذخیره تغییرات ناموفق بود؛ لطفاً دوباره تلاش کنید" };
  }
}

export async function replySupportTicket(input: {
  ticketId?: number;
  body?: string;
}): Promise<{ ok: boolean; message?: AdminTicketMessage; error?: string }> {
  const ticketId = Number(input?.ticketId);
  const body = typeof input?.body === "string" ? input.body.trim() : "";
  if (!Number.isSafeInteger(ticketId) || ticketId < 1)
    return { ok: false, error: "تیکت معتبر نیست" };
  if (!body || body.length > 4000)
    return { ok: false, error: "پیام را وارد کنید (حداکثر ۴۰۰۰ نویسه)" };

  try {
    const admin = await getAdminUser();
    if (!admin) return { ok: false, error: "دسترسی مدیریت ندارید" };

    const ticket = await withDbRetry(() =>
      prisma.supportTicket.findUnique({ where: { id: ticketId }, select: { id: true } })
    );
    if (!ticket) return { ok: false, error: "تیکت پیدا نشد" };

    const message = await withDbRetry(() =>
      prisma.supportTicketMessage.create({
        data: { ticketId, sender: "support", body },
      })
    );
    await withDbRetry(() =>
      prisma.supportTicket.update({
        where: { id: ticketId },
        data: { status: "answered" },
      })
    );
    revalidateConsole();
    return {
      ok: true,
      message: {
        id: message.id,
        role: message.sender,
        text: message.body,
        time: formatClock(message.createdAt),
      },
    };
  } catch (error) {
    console.error("[شاباشچی] خطا در پاسخ به تیکت:", error);
    return { ok: false, error: "ارسال پیام ناموفق بود؛ لطفاً دوباره تلاش کنید" };
  }
}

export async function setSupportTicketStatus(input: {
  ticketId?: number;
  status?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const ticketId = Number(input?.ticketId);
  const status = input?.status;
  if (!Number.isSafeInteger(ticketId) || ticketId < 1)
    return { ok: false, error: "تیکت معتبر نیست" };
  if (!isTicketStatus(status) || status === "pending")
    return { ok: false, error: "وضعیت انتخاب‌شده معتبر نیست" };

  try {
    const admin = await getAdminUser();
    if (!admin) return { ok: false, error: "دسترسی مدیریت ندارید" };

    const ticket = await withDbRetry(() =>
      prisma.supportTicket.findUnique({ where: { id: ticketId }, select: { id: true } })
    );
    if (!ticket) return { ok: false, error: "تیکت پیدا نشد" };

    await withDbRetry(() =>
      prisma.supportTicket.update({ where: { id: ticketId }, data: { status } })
    );
    revalidateConsole();
    return { ok: true };
  } catch (error) {
    console.error("[شاباشچی] خطا در تغییر وضعیت تیکت:", error);
    return { ok: false, error: "تغییر وضعیت ناموفق بود؛ لطفاً دوباره تلاش کنید" };
  }
}
