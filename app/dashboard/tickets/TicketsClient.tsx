"use client";

import { useState, useTransition } from "react";
import { createSupportTicket, sendSupportTicketMessage, type TicketView } from "./actions";

const categories = ["مشکل فنی", "مشکل پرداخت", "سایر"];
const statusLabels = { answered: "پاسخ داده شده", pending: "در انتظار", closed: "بسته شده" } as const;
const statusStyles = { answered: "bg-green-100 text-green-700", pending: "bg-amber-100 text-amber-700", closed: "bg-foreground/5 text-foreground/40" } as const;

export default function TicketsClient({ initialTickets, initialError = "" }: { initialTickets: TicketView[]; initialError?: string }) {
  const [tickets, setTickets] = useState(initialTickets);
  const [selectedId, setSelectedId] = useState<number | null>(initialTickets[0]?.id ?? null);
  const [input, setInput] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState(categories[0]);
  const [error, setError] = useState(initialError);
  const [isPending, startTransition] = useTransition();
  const selected = tickets.find((ticket) => ticket.id === selectedId) ?? null;

  function handleSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!input.trim() || !selected || isPending) return;
    const body = input.trim();
    setError("");
    startTransition(async () => {
      const result = await sendSupportTicketMessage({ ticketId: selected.id, body });
      if (!result.ok || !result.message) { setError(result.error ?? "ارسال پیام ناموفق بود"); return; }
      setTickets((current) => current.map((ticket) => ticket.id === selected.id ? { ...ticket, status: "pending", messages: [...ticket.messages, result.message!] } : ticket));
      setInput("");
    });
  }

  function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newTitle.trim() || isPending) return;
    setError("");
    startTransition(async () => {
      const result = await createSupportTicket({ title: newTitle, category: newCategory });
      if (!result.ok || !result.ticket) { setError(result.error ?? "ایجاد تیکت ناموفق بود"); return; }
      setTickets((current) => [result.ticket!, ...current]);
      setSelectedId(result.ticket.id);
      setNewTitle("");
      setNewCategory(categories[0]);
      setShowNew(false);
    });
  }

  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-hidden p-3 sm:p-6">
      <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col overflow-hidden rounded-2xl border border-primary/10 bg-background/70 md:flex-row">
        <section className="flex max-h-[42%] shrink-0 flex-col border-b border-primary/10 md:max-h-none md:w-80 md:border-b-0 md:border-l" aria-label="فهرست تیکت‌ها">
          <div className="flex items-center justify-between border-b border-primary/10 p-4">
            <h1 className="text-sm font-bold text-foreground">تیکت‌های پشتیبانی</h1>
            <button type="button" onClick={() => { setError(""); setShowNew(true); }} aria-label="ایجاد تیکت جدید" className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-fg transition-all hover:bg-primary/90 active:scale-95"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" /></svg></button>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto p-3">
            {tickets.length ? tickets.map((ticket) => <button key={ticket.id} type="button" onClick={() => { setSelectedId(ticket.id); setError(""); }} aria-pressed={selected?.id === ticket.id} className={`w-full rounded-xl border p-3 text-right transition-all ${selected?.id === ticket.id ? "border-primary/30 bg-primary/5" : "border-primary/10 bg-background/60 hover:border-primary/20"}`}>
              <p className="text-sm font-medium text-foreground">{ticket.title}</p><p className="mt-0.5 text-[11px] text-foreground/40">{ticket.category}</p>
              <div className="mt-1.5 flex items-center justify-between gap-2"><span className="text-xs text-foreground/40">{ticket.date}</span><span className={`rounded-lg px-2 py-0.5 text-[10px] font-medium ${statusStyles[ticket.status]}`}>{statusLabels[ticket.status]}</span></div>
            </button>) : <div className="px-3 py-8 text-center text-sm leading-6 text-foreground/45">هنوز تیکتی ثبت نکرده‌اید.<br />برای شروع روی + بزنید.</div>}
          </div>
        </section>

        <section className="flex min-h-0 flex-1 flex-col" aria-label="گفت‌وگوی تیکت">
          {selected ? <>
            <div className="border-b border-primary/10 px-4 py-3"><h2 className="font-semibold text-foreground">{selected.title}</h2><p className="mt-1 text-xs text-foreground/45">{selected.category} · {statusLabels[selected.status]}</p></div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
              {selected.messages.length ? selected.messages.map((message) => <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm sm:max-w-[75%] ${message.role === "user" ? "rounded-bl-sm bg-primary text-primary-fg" : "rounded-br-sm bg-primary/5 text-foreground"}`}><p>{message.text}</p><p className={`mt-1 text-[10px] ${message.role === "user" ? "text-primary-fg/60" : "text-foreground/40"}`}>{message.time}</p></div></div>) : <p className="py-8 text-center text-sm text-foreground/45">تیکت ایجاد شد. پیام خود را ارسال کنید تا تیم پشتیبانی پیگیری کند.</p>}
            </div>
            {selected.status === "closed" ? <p className="border-t border-primary/10 p-4 text-center text-sm text-foreground/50">این تیکت بسته شده و امکان ارسال پیام ندارد.</p> : <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-primary/10 p-3 sm:p-4"><input type="text" value={input} maxLength={4000} onChange={(event) => setInput(event.target.value)} placeholder="پیام خود را بنویسید..." aria-label="متن پیام" className="min-w-0 flex-1 rounded-xl border border-primary/20 bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-foreground/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20" /><button type="submit" disabled={!input.trim() || isPending} aria-label="ارسال پیام" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-fg transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-40"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="11" y1="2" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg></button></form>}
          </> : <div className="flex flex-1 flex-col items-center justify-center p-6 text-center text-sm text-foreground/45"><p>برای پیگیری درخواست یا پرسش خود یک تیکت جدید ثبت کنید.</p><button type="button" onClick={() => setShowNew(true)} className="mt-4 rounded-xl bg-primary px-4 py-2.5 font-medium text-primary-fg">ایجاد تیکت</button></div>}
        </section>
      </div>

      {error && <p role="alert" className="mx-auto mt-3 w-full max-w-6xl rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-600">{error}</p>}
      {isPending && <p role="status" className="sr-only">در حال ذخیره...</p>}
      {showNew && <>
        <button type="button" aria-label="بستن پنجره ایجاد تیکت" className="fixed inset-0 z-40 cursor-default bg-black/40 backdrop-blur-sm" onClick={() => setShowNew(false)} />
        <div role="dialog" aria-modal="true" aria-labelledby="new-ticket-title" className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-primary/10 bg-background p-6 shadow-2xl shadow-primary/20">
          <button type="button" aria-label="بستن" onClick={() => setShowNew(false)} className="absolute left-3 top-3 text-foreground/40 transition-colors hover:text-foreground"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg></button>
          <form onSubmit={handleCreate} className="flex flex-col gap-4"><h2 id="new-ticket-title" className="text-lg font-bold text-foreground">تیکت جدید</h2>
            <div><label htmlFor="ticket-title" className="mb-1.5 block text-xs font-medium text-foreground/60">عنوان</label><input id="ticket-title" type="text" required maxLength={120} autoFocus value={newTitle} onChange={(event) => setNewTitle(event.target.value)} placeholder="موضوع تیکت" className="w-full rounded-xl border border-primary/20 bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-foreground/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20" /></div>
            <fieldset><legend className="mb-1.5 block text-xs font-medium text-foreground/60">دسته‌بندی</legend><div className="flex flex-wrap gap-2">{categories.map((category) => <button key={category} type="button" aria-pressed={newCategory === category} onClick={() => setNewCategory(category)} className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${newCategory === category ? "border-primary bg-primary text-primary-fg" : "border-primary/20 text-foreground/60 hover:border-primary/40"}`}>{category}</button>)}</div></fieldset>
            <button type="submit" disabled={!newTitle.trim() || isPending} className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-fg transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-40">{isPending ? "در حال ثبت..." : "ایجاد تیکت"}</button>
          </form>
        </div>
      </>}
    </main>
  );
}
