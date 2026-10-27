"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma, withDbRetry } from "@/lib/db";
import { toJalaliDateString } from "@/lib/jalali";
import { toFaDigits } from "@/lib/format";
import { toJalaali } from "jalaali-js";

export type TicketView = {
  id: number;
  title: string;
  category: string;
  date: string;
  status: "answered" | "pending" | "closed";
  messages: { id: number; role: "user" | "support"; text: string; time: string }[];
};

const CATEGORIES = ["مشکل فنی", "مشکل پرداخت", "سایر"];

function asTicketView(ticket: {
  id: number;
  title: string;
  category: string;
  status: "answered" | "pending" | "closed";
  createdAt: Date;
  messages: { id: number; sender: "user" | "support"; body: string; createdAt: Date }[];
}): TicketView {
  const date = toJalaali(ticket.createdAt);
  return {
    id: ticket.id,
    title: ticket.title,
    category: ticket.category,
    date: toFaDigits(toJalaliDateString(date.jy, date.jm, date.jd)),
    status: ticket.status,
    messages: ticket.messages.map((message) => ({
      id: message.id,
      role: message.sender,
      text: message.body,
      time: toFaDigits(
        new Intl.DateTimeFormat("fa-IR", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Tehran" }).format(message.createdAt)
      ),
    })),
  };
}

async function getOwner() {
  const session = await getServerSession(authOptions);
  const phone = session?.user?.phone;
  if (!phone) return null;
  return withDbRetry(() => prisma.user.findUnique({ where: { phone }, select: { id: true } }));
}

export async function listSupportTickets(): Promise<{ ok: boolean; tickets: TicketView[]; error?: string }> {
  try {
    const owner = await getOwner();
    if (!owner) return { ok: false, tickets: [], error: "ابتدا وارد حساب خود شوید" };
    const tickets = await withDbRetry(() => prisma.supportTicket.findMany({
      where: { userId: owner.id },
      orderBy: { updatedAt: "desc" },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    }));
    return { ok: true, tickets: tickets.map(asTicketView) };
  } catch (error) {
    console.error("[شاباشچی] خطا در دریافت تیکت‌ها:", error);
    return { ok: false, tickets: [], error: "دریافت تیکت‌ها ناموفق بود؛ لطفاً دوباره تلاش کنید" };
  }
}

export async function createSupportTicket(input: { title: string; category: string }): Promise<{ ok: boolean; ticket?: TicketView; error?: string }> {
  const title = typeof input?.title === "string" ? input.title.trim() : "";
  const category = typeof input?.category === "string" ? input.category : "";
  if (!title || title.length > 120) return { ok: false, error: "عنوان تیکت را وارد کنید (حداکثر ۱۲۰ نویسه)" };
  if (!CATEGORIES.includes(category)) return { ok: false, error: "دسته‌بندی تیکت معتبر نیست" };

  try {
    const owner = await getOwner();
    if (!owner) return { ok: false, error: "ابتدا وارد حساب خود شوید" };
    const ticket = await withDbRetry(() => prisma.supportTicket.create({
      data: { userId: owner.id, title, category },
      include: { messages: true },
    }));
    return { ok: true, ticket: asTicketView(ticket) };
  } catch (error) {
    console.error("[شاباشچی] خطا در ایجاد تیکت:", error);
    return { ok: false, error: "ایجاد تیکت ناموفق بود؛ لطفاً دوباره تلاش کنید" };
  }
}

export async function sendSupportTicketMessage(input: { ticketId: number; body: string }): Promise<{ ok: boolean; message?: TicketView["messages"][number]; error?: string }> {
  const ticketId = Number(input?.ticketId);
  const body = typeof input?.body === "string" ? input.body.trim() : "";
  if (!Number.isSafeInteger(ticketId) || ticketId < 1) return { ok: false, error: "تیکت معتبر نیست" };
  if (!body || body.length > 4000) return { ok: false, error: "پیام را وارد کنید (حداکثر ۴۰۰۰ نویسه)" };

  try {
    const owner = await getOwner();
    if (!owner) return { ok: false, error: "ابتدا وارد حساب خود شوید" };
    const ticket = await withDbRetry(() => prisma.supportTicket.findFirst({ where: { id: ticketId, userId: owner.id }, select: { id: true, status: true } }));
    if (!ticket) return { ok: false, error: "تیکت پیدا نشد" };
    if (ticket.status === "closed") return { ok: false, error: "این تیکت بسته شده است" };

    const message = await withDbRetry(() => prisma.supportTicketMessage.create({ data: { ticketId, sender: "user", body } }));
    await withDbRetry(() => prisma.supportTicket.update({ where: { id: ticketId }, data: { status: "pending", updatedAt: new Date() } }));
    return {
      ok: true,
      message: {
        id: message.id,
        role: message.sender,
        text: message.body,
        time: toFaDigits(new Intl.DateTimeFormat("fa-IR", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Tehran" }).format(message.createdAt)),
      },
    };
  } catch (error) {
    console.error("[شاباشچی] خطا در ارسال پیام تیکت:", error);
    return { ok: false, error: "ارسال پیام ناموفق بود؛ لطفاً دوباره تلاش کنید" };
  }
}
