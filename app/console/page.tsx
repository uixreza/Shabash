import Link from "next/link";
import StatusBadge from "@/components/console/StatusBadge";
import {
  getConsoleStats,
  listAllSupportTickets,
  listAllWeddingRequests,
} from "@/lib/admin";
import { toFaDigits } from "@/lib/format";

function buildStats(stats: Awaited<ReturnType<typeof getConsoleStats>>) {
  return [
    { label: "کل درخواست‌ها", value: stats.requests },
    { label: "ثبت‌شده", value: stats.requestsByStatus.submitted },
    { label: "در حال بررسی", value: stats.requestsByStatus.under_review },
    {
      label: "مشاوره رزروشده",
      value: stats.requestsByStatus.consultation_scheduled,
    },
    {
      label: "تکمیل‌شده",
      value: stats.requestsByStatus.consultation_completed,
    },
    { label: "کاربران", value: stats.users },
    { label: "تیکت‌های باز", value: stats.openTickets },
    { label: "کل تیکت‌ها", value: stats.tickets },
  ];
}

export default async function ConsoleHomePage() {
  const [stats, requests, tickets] = await Promise.all([
    getConsoleStats(),
    listAllWeddingRequests(),
    listAllSupportTickets(),
  ]);
  const openTickets = tickets.filter((ticket) => ticket.status !== "closed");

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold text-foreground">پیشخوان مدیریت</h1>
        <p className="mt-1 text-sm text-foreground/50">
          نمای کلی درخواست‌ها، کاربران و تیکت‌های پشتیبانی
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {buildStats(stats).map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-primary/10 bg-primary/[0.02] p-4">
              <p className="text-xs text-foreground/50">{stat.label}</p>
              <p className="mt-3 text-2xl font-bold text-foreground">
                {toFaDigits(stat.value)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-primary/10 bg-primary/[0.02] p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground">
              آخرین درخواست‌ها
            </h2>
            <Link
              href="/console/requests"
              className="text-xs font-medium text-primary transition-colors hover:text-primary/80">
              مشاهده همه
            </Link>
          </div>
          <div className="mt-3 divide-y divide-primary/5">
            {requests.length === 0 ? (
              <p className="py-4 text-center text-sm text-foreground/50">
                هنوز درخواستی ثبت نشده است
              </p>
            ) : (
              requests.slice(0, 8).map((request) => (
                <Link
                  key={request.id}
                  href={`/console/requests/${request.id}`}
                  className="flex items-center justify-between gap-3 py-3 transition-colors hover:bg-primary/[0.03]">
                  <div className="flex items-center gap-3">
                    <span
                      dir="ltr"
                      className="rounded-lg bg-primary/[0.06] px-2.5 py-1 font-mono text-xs font-semibold tracking-wide text-primary">
                      {request.id}
                    </span>
                    <span className="text-sm text-foreground/70">
                      {request.groomName} و {request.brideName}
                    </span>
                  </div>
                  <StatusBadge status={request.status} />
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-primary/10 bg-primary/[0.02] p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground">
              تیکت‌های در انتظار پاسخ
            </h2>
            <Link
              href="/console/tickets"
              className="text-xs font-medium text-primary transition-colors hover:text-primary/80">
              مشاهده همه
            </Link>
          </div>
          <div className="mt-3 divide-y divide-primary/5">
            {openTickets.length === 0 ? (
              <p className="py-4 text-center text-sm text-foreground/50">
                تیکت بازی وجود ندارد
              </p>
            ) : (
              openTickets.slice(0, 5).map((ticket) => (
                <Link
                  key={ticket.id}
                  href="/console/tickets"
                  className="flex items-center justify-between gap-3 py-3 transition-colors hover:bg-primary/[0.03]">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-foreground/70">
                      {ticket.title}
                    </p>
                    <p
                      dir="ltr"
                      className="mt-0.5 text-right text-[11px] text-foreground/40">
                      {ticket.userPhone}
                    </p>
                  </div>
                  <span
                    className={`whitespace-nowrap rounded-lg px-2 py-0.5 text-[10px] font-medium ${
                      ticket.status === "pending"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-sky-100 text-sky-700"
                    }`}>
                    {ticket.status === "pending" ? "در انتظار" : "پاسخ داده شده"}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        <p className="mt-6 rounded-xl border border-primary/10 bg-primary/5 px-4 py-3 text-sm leading-relaxed text-foreground/60">
          برای مدیریت درخواست‌ها گزینه{" "}
          <span className="font-medium text-primary">درخواست‌ها</span> و برای
          پاسخ به کاربران گزینه{" "}
          <span className="font-medium text-primary">تیکت‌های پشتیبانی</span> را
          از منوی کناری انتخاب کنید.
        </p>
      </div>
    </main>
  );
}
