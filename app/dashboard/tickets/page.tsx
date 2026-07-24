"use client";

import { useState } from "react";

type TicketStatus = "پاسخ داده شده" | "در انتظار" | "بسته شده";

interface Message {
  role: "user" | "support";
  text: string;
  time: string;
}

interface Ticket {
  id: number;
  title: string;
  category: string;
  date: string;
  status: TicketStatus;
  messages: Message[];
}

const initialTickets: Ticket[] = [
  {
    id: 1,
    title: "مشکل در ثبت نام",
    category: "مشکل فنی",
    date: "۱۴۰۵/۰۴/۲۵",
    status: "پاسخ داده شده",
    messages: [
      { role: "user", text: "سلام، هنگام ثبت نام با خطا مواجه می‌شوم", time: "۱۴:۳۰" },
      { role: "support", text: "سلام. لطفا کد خطا را ارسال کنید", time: "۱۴:۳۵" },
      { role: "user", text: "خطای ۴۰۰ دریافت می‌کنم", time: "۱۴:۴۰" },
      { role: "support", text: "مشکل حل شد. لطفا مجددا تلاش کنید", time: "۱۵:۱۰" },
    ],
  },
  {
    id: 2,
    title: "درخواست تغییر تاریخ عکاسی",
    category: "سایر",
    date: "۱۴۰۵/۰۴/۲۰",
    status: "در انتظار",
    messages: [
      { role: "user", text: "می‌خواهم تاریخ عکاسی را تغییر دهم", time: "۱۰:۰۰" },
      { role: "support", text: "درخواست شما ثبت شد. پیگیری می‌کنیم", time: "۱۰:۱۵" },
    ],
  },
  {
    id: 3,
    title: "استعلام قیمت بسته طلایی",
    category: "مشکل پرداخت",
    date: "۱۴۰۵/۰۴/۱۵",
    status: "بسته شده",
    messages: [
      { role: "user", text: "قیمت بسته طلایی چقدر است؟", time: "۰۹:۰۰" },
      { role: "support", text: "بسته طلایی ۱۵ میلیون تومان می‌باشد", time: "۰۹:۲۰" },
      { role: "user", text: "ممنون از اطلاعات", time: "۰۹:۲۵" },
    ],
  },
];

const categories = ["مشکل فنی", "مشکل پرداخت", "سایر"];

const statusStyles: Record<string, string> = {
  "پاسخ داده شده": "bg-green-100 text-green-700",
  "در انتظار": "bg-amber-100 text-amber-700",
  "بسته شده": "bg-foreground/5 text-foreground/40",
};

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [input, setInput] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState(categories[0]);

  function handleSend() {
    if (!input.trim() || !selected) return;
    const updated = tickets.map((t) =>
      t.id === selected.id
        ? { ...t, messages: [...t.messages, { role: "user" as const, text: input, time: "اکنون" }] }
        : t
    );
    setTickets(updated);
    const next = updated.find((t) => t.id === selected.id);
    if (next) setSelected(next);
    setInput("");
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newTicket: Ticket = {
      id: Math.max(...tickets.map((t) => t.id), 0) + 1,
      title: newTitle,
      category: newCategory,
      date: "امروز",
      status: "در انتظار",
      messages: [],
    };
    setTickets([newTicket, ...tickets]);
    setSelected(newTicket);
    setNewTitle("");
    setNewCategory(categories[0]);
    setShowNew(false);
  }

  return (
    <>
      <div className="flex flex-1 overflow-hidden">
          <div className="flex w-80 shrink-0 flex-col border-l border-primary/10">
            <div className="flex items-center justify-between border-b border-primary/10 p-4">
              <h2 className="text-sm font-bold text-foreground">تیکت‌ها</h2>
              <button
                onClick={() => setShowNew(true)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white transition-all hover:bg-primary/90 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {tickets.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => setSelected(ticket)}
                  className={`w-full rounded-xl border p-3 text-right transition-all ${
                    selected?.id === ticket.id
                      ? "border-primary/30 bg-primary/5"
                      : "border-primary/10 bg-background/60 hover:border-primary/20"
                  }`}
                >
                  <p className="text-sm font-medium text-foreground">{ticket.title}</p>
                  <p className="mt-0.5 text-[11px] text-foreground/40">{ticket.category}</p>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="text-xs text-foreground/40">{ticket.date}</span>
                    <span className={`rounded-lg px-2 py-0.5 text-[10px] font-medium ${statusStyles[ticket.status]}`}>
                      {ticket.status}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-1 flex-col">
            {selected ? (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {selected.messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-xs rounded-2xl px-4 py-2.5 text-sm ${
                        msg.role === "user"
                          ? "bg-primary text-white rounded-bl-sm"
                          : "bg-primary/5 text-foreground rounded-br-sm"
                      }`}>
                        <p>{msg.text}</p>
                        <p className={`mt-1 text-[10px] ${msg.role === "user" ? "text-white/60" : "text-foreground/40"}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 border-t border-primary/10 p-4">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="پیام خود را بنویسید..."
                    className="flex-1 rounded-xl border border-primary/20 bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-foreground/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-40"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" x2="11" y1="2" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center text-sm text-foreground/40">
                یک تیکت را انتخاب کنید
              </div>
            )}
          </div>
        </div>

      {showNew && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setShowNew(false)} />
          <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-primary/10 bg-background p-6 shadow-2xl shadow-primary/20">
            <button onClick={() => setShowNew(false)} className="absolute left-3 top-3 text-foreground/40 transition-colors hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            </button>

            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <h2 className="text-lg font-bold text-foreground">تیکت جدید</h2>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground/60">عنوان</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="موضوع تیکت"
                  className="w-full rounded-xl border border-primary/20 bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-foreground/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground/60">دسته‌بندی</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewCategory(cat)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                        newCategory === cat
                          ? "border-primary bg-primary text-white"
                          : "border-primary/20 text-foreground/60 hover:border-primary/40"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={!newTitle.trim()}
                className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-white transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-40"
              >
                ایجاد تیکت
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
