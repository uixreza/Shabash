import Link from "next/link";
import { REQUEST_STATUS_LABELS, formatToman } from "@/data/requests";
import StatusBadge from "@/components/console/StatusBadge";
import {
  REQUEST_STATUSES,
  isRequestStatus,
  listAllWeddingRequests,
} from "@/lib/admin";
import { toFaDigits } from "@/lib/format";

export default async function ConsoleRequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: statusRaw } = await searchParams;
  const status = isRequestStatus(statusRaw) ? statusRaw : undefined;
  const requests = await listAllWeddingRequests(status);

  const filters = [
    { label: "همه", href: "/console/requests", active: !status },
    ...REQUEST_STATUSES.map((value) => ({
      label: REQUEST_STATUS_LABELS[value],
      href: `/console/requests?status=${value}`,
      active: status === value,
    })),
  ];

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              مدیریت درخواست‌ها
            </h1>
            <p className="mt-1 text-sm text-foreground/50">
              همه درخواست‌های عروسی ثبت‌شده توسط کاربران
            </p>
          </div>
          <span className="rounded-xl border border-primary/15 bg-primary/[0.04] px-3 py-2 text-sm font-medium text-foreground/70">
            {toFaDigits(requests.length)} درخواست
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Link
              key={filter.href}
              href={filter.href}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                filter.active
                  ? "border-primary bg-primary text-primary-fg"
                  : "border-primary/20 text-foreground/60 hover:border-primary/40"
              }`}>
              {filter.label}
            </Link>
          ))}
        </div>

        {requests.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-primary/25 bg-background/40 px-6 py-16 text-center">
            <h2 className="text-lg font-bold text-foreground">
              درخواستی با این فیلتر وجود ندارد
            </h2>
            <p className="mt-2 text-sm text-foreground/50">
              فیلتر دیگری را انتخاب کنید یا منتظر درخواست‌های جدید باشید.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {requests.map((request) => (
              <Link
                key={request.id}
                href={`/console/requests/${request.id}`}
                className="block rounded-xl border border-primary/10 bg-background/60 p-5 transition-all hover:border-primary/20 hover:shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      dir="ltr"
                      className="rounded-lg bg-primary/[0.06] px-2.5 py-1 font-mono text-xs font-semibold tracking-wide text-primary">
                      {request.id}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {request.groomName} و {request.brideName}
                    </span>
                  </div>
                  <StatusBadge status={request.status} />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl bg-primary/[0.03] p-3">
                    <p className="text-[11px] font-semibold tracking-wider text-foreground/40">
                      شماره تماس
                    </p>
                    <p
                      dir="ltr"
                      className="mt-1 text-right text-sm font-medium text-foreground">
                      {request.phone}
                    </p>
                  </div>
                  <div className="rounded-xl bg-primary/[0.03] p-3">
                    <p className="text-[11px] font-semibold tracking-wider text-foreground/40">
                      تاریخ عروسی
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {request.weddingDate || "تعیین نشده"}
                    </p>
                  </div>
                  <div className="rounded-xl bg-primary/[0.03] p-3">
                    <p className="text-[11px] font-semibold tracking-wider text-foreground/40">
                      بودجه تخمینی
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {request.budgetTotal
                        ? formatToman(request.budgetTotal)
                        : "تعیین نشده"}
                    </p>
                  </div>
                  <div className="rounded-xl bg-primary/[0.03] p-3">
                    <p className="text-[11px] font-semibold tracking-wider text-foreground/40">
                      تاریخ ثبت
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {request.submittedAt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
