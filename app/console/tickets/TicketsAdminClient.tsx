"use client";

import { useState, useTransition } from "react";
import type { AdminTicketView } from "@/lib/admin";
import {
  replySupportTicket,
  setSupportTicketStatus,
} from "@/app/console/actions";

const statusLabels = {
  answered: "پاسخ داده شده",
  pending: "در انتظار",
  closed: "بسته شده",
} as const;

const statusStyles = {
  answered: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  closed: "bg-foreground/5 text-foreground/40",
} as const;

export default function TicketsAdminClient({
  initialTickets,
}: {
  initialTickets: AdminTicketView[];
}) {
  const [tickets, setTickets] = useState(initialTickets);
  const [selectedId, setSelectedId] = useState<number | null>(
    initialTickets[0]?.id ?? null
  );
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const selected = tickets.find((ticket) => ticket.id === selectedId) ?? null;

  function patchTicket(id: number, patch: Partial<AdminTicketView>) {
    setTickets((current) =>
      current.map((ticket) => (ticket.id === id ? { ...ticket, ...patch } : ticket))
    );
  }

  function handleReply(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!input.trim() || !selected || isPending) return;
    const body = input.trim();
    setError("");
    startTransition(async () => {
      const result = await replySupportTicket({ ticketId: selected.id, body });
      if (!result.ok || !result.message) {
        setError(result.error ?? "ارسال پیام ناموفق بود");
        return;
      }
      patchTicket(selected.id, {
        status: "answered",
        messages: [...selected.messages, result.message],
      });
      setInput("");
    });
  }

  function handleStatus(next: "answered" | "closed") {
    if (!selected || isPending || selected.status === next) return;
    setError("");
    startTransition(async () => {
      const result = await setSupportTicketStatus({
        ticketId: selected.id,
        status: next,
      });
      if (!result.ok) {
        setError(result.error ?? "تغییر وضعیت ناموفق بود");
        return;
      }
      patchTicket(selected.id, { status: next });
    });
  }

  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-hidden p-3 sm:p-6">
      <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col overflow-hidden rounded-2xl border border-primary/10 bg-background/70 md:flex-row">
        <section
          className="flex max-h-[42%] shrink-0 flex-col border-b border-primary/10 md:max-h-none md:w-80 md:border-b-0 md:border-l"
          aria-label="فهرست تیکت‌ها">
          <div className="border-b border-primary/10 p-4">
            <h1 className="text-sm font-bold text-foreground">
              تیکت‌های پشتیبانی
            </h1>
            <p className="mt-0.5 text-[11px] text-foreground/40">
              پیام‌های کاربران در این بخش پاسخ داده می‌شود
            </p>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto p-3">
            {tickets.length ? (
              tickets.map((ticket) => (
                <button
                  key={ticket.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(ticket.id);
                    setError("");
                  }}
                  aria-pressed={selected?.id === ticket.id}
                  className={`w-full rounded-xl border p-3 text-right transition-all ${
                    selected?.id === ticket.id
                      ? "border-primary/30 bg-primary/5"
                      : "border-primary/10 bg-background/60 hover:border-primary/20"
                  }`}>
                  <p className="text-sm font-medium text-foreground">
                    {ticket.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-foreground/40">
                    {ticket.category}
                  </p>
                  <div className="mt-1.5 flex items-center justify-between gap-2">
                    <span
                      dir="ltr"
                      className="text-right text-xs text-foreground/40">
                      {ticket.userPhone}
                    </span>
                    <span
                      className={`rounded-lg px-2 py-0.5 text-[10px] font-medium ${statusStyles[ticket.status]}`}>
                      {statusLabels[ticket.status]}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-3 py-8 text-center text-sm leading-6 text-foreground/45">
                تیکتی ثبت نشده است.
              </div>
            )}
          </div>
        </section>

        <section
          className="flex min-h-0 flex-1 flex-col"
          aria-label="گفت‌وگوی تیکت">
          {selected ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary/10 px-4 py-3">
                <div>
                  <h2 className="font-semibold text-foreground">
                    {selected.title}
                  </h2>
                  <p className="mt-1 text-xs text-foreground/45">
                    {selected.category} ·{" "}
                    <span dir="ltr">{selected.userPhone}</span> ·{" "}
                    {statusLabels[selected.status]}
                  </p>
                </div>
                {selected.status === "closed" ? (
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleStatus("answered")}
                    className="rounded-xl border border-primary/25 px-3 py-2 text-xs font-medium text-primary transition-all hover:bg-primary/[0.06] disabled:opacity-40">
                    بازگشایی تیکت
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleStatus("closed")}
                    className="rounded-xl border border-red-500/30 px-3 py-2 text-xs font-medium text-red-600 transition-all hover:bg-red-500/5 disabled:opacity-40">
                    بستن تیکت
                  </button>
                )}
              </div>
              <div
                className="flex-1 space-y-3 overflow-y-auto p-4"
                aria-live="polite">
                {selected.messages.length ? (
                  selected.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}>
                      <div
                        className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm sm:max-w-[75%] ${
                          message.role === "user"
                            ? "rounded-bl-sm bg-primary/5 text-foreground"
                            : "rounded-br-sm bg-primary text-primary-fg"
                        }`}>
                        <p>{message.text}</p>
                        <p
                          className={`mt-1 text-[10px] ${
                            message.role === "user"
                              ? "text-foreground/40"
                              : "text-primary-fg/60"
                          }`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="py-8 text-center text-sm text-foreground/45">
                    هنوز پیامی در این تیکت وجود ندارد.
                  </p>
                )}
              </div>
              {selected.status === "closed" ? (
                <p className="border-t border-primary/10 p-4 text-center text-sm text-foreground/50">
                  این تیکت بسته شده است؛ برای ادامه گفت‌وگو آن را بازگشایی
                  کنید.
                </p>
              ) : (
                <form
                  onSubmit={handleReply}
                  className="flex items-center gap-2 border-t border-primary/10 p-3 sm:p-4">
                  <input
                    type="text"
                    value={input}
                    maxLength={4000}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="پاسخ خود را بنویسید..."
                    aria-label="متن پاسخ"
                    className="min-w-0 flex-1 rounded-xl border border-primary/20 bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-foreground/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isPending}
                    aria-label="ارسال پاسخ"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-fg transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-40">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <line x1="22" x2="11" y1="2" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </form>
              )}
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center p-6 text-center text-sm text-foreground/45">
              <p>برای پاسخ به کاربران، یک تیکت را از فهرست انتخاب کنید.</p>
            </div>
          )}
        </section>
      </div>

      {error && (
        <p
          role="alert"
          className="mx-auto mt-3 w-full max-w-6xl rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}
      {isPending && (
        <p role="status" className="sr-only">
          در حال ذخیره...
        </p>
      )}
    </main>
  );
}
