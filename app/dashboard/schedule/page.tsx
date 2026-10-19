import Link from "next/link";
import {
  WEDDING_REQUESTS,
  REQUEST_STATUS_LABELS,
  formatToman,
  type RequestStatus,
} from "@/data/requests";
import { toFaDigits } from "@/lib/format";

function statusBadgeClass(status: RequestStatus) {
  switch (status) {
    case "submitted":
      return "bg-sky-100 text-sky-700";
    case "under_review":
      return "bg-amber-100 text-amber-700";
    case "consultation_scheduled":
      return "bg-primary/15 text-primary";
    case "consultation_completed":
      return "bg-green-100 text-green-700";
  }
}

function ClockIcon() {
  return (
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckIcon() {
  return (
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
      <path d="M21.801 10A10 10 0 1 1 17 3.335" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}

export default function SchedulePage() {
  const requests = WEDDING_REQUESTS;

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">درخواست‌ها</h1>
            <p className="mt-1 text-sm text-foreground/50">
              درخواست‌های ثبت‌شده عروسی خود را پیگیری کنید
            </p>
          </div>
          {requests.length > 0 && (
            <Link
              href="/request"
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-fg shadow-sm shadow-primary/30 transition-all hover:bg-primary/90 active:scale-[0.98]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              افزودن عروسی
            </Link>
          )}
        </div>

        {requests.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-primary/25 bg-background/40 px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
              </svg>
            </div>
            <h2 className="mt-5 text-lg font-bold text-foreground">
              هنوز درخواستی ثبت نکرده‌اید
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-foreground/50">
              اولین عروسی خود را اضافه کنید تا تیم شاباشچی آماده انجام کارهای
              آن شود.
            </p>
            <Link
              href="/request"
              className="mt-6 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-fg shadow-sm shadow-primary/30 transition-all hover:bg-primary/90 active:scale-[0.98]">
              افزودن عروسی
            </Link>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="rounded-xl border border-primary/10 bg-background/60 p-5 transition-all hover:border-primary/20 hover:shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <span
                    dir="ltr"
                    className="rounded-lg bg-primary/[0.06] px-2.5 py-1 font-mono text-xs font-semibold tracking-wide text-primary">
                    {request.id}
                  </span>
                  <span
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-medium ${statusBadgeClass(request.status)}`}>
                    {REQUEST_STATUS_LABELS[request.status]}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
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
                      خدمات انتخاب‌شده
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {toFaDigits(request.services.length)} خدمت
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-primary/10 bg-primary/[0.02] p-3">
                  <p className="px-1 text-[11px] font-semibold tracking-wider text-foreground/40">
                    خدمات انتخابی
                  </p>
                  <ul className="mt-2 divide-y divide-primary/5">
                    {request.services.map((service) => (
                      <li
                        key={service.id}
                        className="flex items-center justify-between px-1 py-2">
                        <span className="text-sm text-foreground/70">
                          {service.label}
                        </span>
                        {service.done ? (
                          <span className="text-green-600" title="انجام شده">
                            <CheckIcon />
                          </span>
                        ) : (
                          <span
                            className="text-foreground/25"
                            title="در انتظار انجام">
                            <ClockIcon />
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/dashboard/schedule/${request.id}`}
                  className="mt-4 block w-full rounded-xl border border-primary/25 bg-primary/[0.04] py-3 text-center text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-fg active:scale-[0.98]">
                  مشاهده جزئیات درخواست
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
