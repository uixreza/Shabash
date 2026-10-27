"use client";

import Link from "next/link";
import { toast } from "@/lib/toast";
import {
  CONSULTATION_STEPS,
  REQUEST_STATUS_LABELS,
  currentStepIndex,
  formatToman,
  type RequestStatus,
  type WeddingRequest,
} from "@/data/requests";

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

function SectionTitle({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-2.5 text-base font-bold text-foreground">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
        {number}
      </span>
      {children}
    </h2>
  );
}

function InfoRow({
  label,
  value,
  ltr,
}: {
  label: string;
  value: string | null | undefined;
  ltr?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <span className="text-sm text-foreground/50">{label}</span>
      <span
        dir={ltr ? "ltr" : undefined}
        className="text-sm font-medium text-foreground">
        {value || "ارائه نشده"}
      </span>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function RequestDetail({
  request,
}: {
  request: WeddingRequest;
}) {
  const step = currentStepIndex(request.status);

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/dashboard/requests"
          className="inline-flex items-center gap-1.5 text-sm text-foreground/50 transition-colors hover:text-primary">
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
            <path d="m9 18 6-6-6-6" />
          </svg>
          بازگشت به درخواست‌ها
        </Link>

        <div className="mt-4 rounded-2xl border border-primary/10 bg-background/60 p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                مشاوره عروسی
              </h1>
              <p className="mt-1 text-sm text-foreground/50">
                تاریخ ثبت: {request.submittedAt}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span
                className={`rounded-lg px-3 py-1 text-xs font-medium ${statusBadgeClass(request.status)}`}>
                {REQUEST_STATUS_LABELS[request.status]}
              </span>
              <span
                dir="ltr"
                className="font-mono text-xs font-semibold tracking-wide text-primary">
                درخواست #{request.id}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-6 divide-y divide-primary/10">
            <section className="pb-6">
              <SectionTitle number="۱">اطلاعات زوجین</SectionTitle>
              <div className="mt-3 divide-y divide-primary/5 px-1">
                <InfoRow
                  label="نام زوجین"
                  value={`${request.groomName} و ${request.brideName}`}
                />
                <InfoRow
                  label="شماره تماس"
                  value={request.phone}
                  ltr
                />
                <InfoRow label="تاریخ عروسی" value={request.weddingDate} />
                <InfoRow label="مکان برگزاری" value={request.venue} />
              </div>
            </section>

            <section className="pb-6">
              <SectionTitle number="۲">ترجیحات عروسی</SectionTitle>
              <div className="mt-3 px-1">
                <p className="text-sm text-foreground/50">خدمات انتخاب‌شده</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {request.services.map((service) => (
                    <span
                      key={service.id}
                      className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium ${
                        service.done
                          ? "border-green-200 bg-green-50 text-green-700"
                          : "border-primary/20 bg-primary/[0.04] text-foreground/70"
                      }`}>
                      {service.label}
                      {service.done && (
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-white">
                          <CheckIcon />
                        </span>
                      )}
                    </span>
                  ))}
                </div>
                <div className="mt-4 divide-y divide-primary/5">
                  <InfoRow label="سبک یا تم مورد نظر" value={request.style} />
                </div>
                <div className="mt-3">
                  <p className="text-sm text-foreground/50">توضیحات تکمیلی</p>
                  <p className="mt-2 rounded-xl border border-primary/10 bg-primary/[0.02] p-4 text-sm leading-relaxed text-foreground/70">
                    {request.notes || "ارائه نشده"}
                  </p>
                </div>
              </div>
            </section>

            <section className="pb-6">
              <SectionTitle number="۳">بودجه</SectionTitle>
              <div className="mt-3 px-1">
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <span className="text-sm text-foreground/50">
                    بودجه تخمینی کل
                  </span>
                  <span className="text-base font-bold text-primary">
                    {request.budgetTotal
                      ? formatToman(request.budgetTotal)
                      : "ارائه نشده"}
                  </span>
                </div>
                {request.budgetAllocation.length > 0 && (
                  <div className="mt-2 divide-y divide-primary/5 rounded-xl border border-primary/10 bg-primary/[0.02] px-4">
                    {request.budgetAllocation.map((line) => (
                      <div
                        key={line.service}
                        className="flex items-center justify-between gap-4 py-2.5">
                        <span className="text-sm text-foreground/60">
                          {line.service}
                        </span>
                        <span
                          dir="ltr"
                          className="text-sm font-medium text-foreground">
                          {formatToman(line.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section>
              <SectionTitle number="۴">پیشرفت مشاوره</SectionTitle>
              <ol className="mt-4 space-y-0">
                {CONSULTATION_STEPS.map((label, i) => {
                  const isDone =
                    i < step || request.status === "consultation_completed";
                  const isCurrent =
                    i === step && request.status !== "consultation_completed";
                  return (
                    <li key={label} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                          {isCurrent && (
                            <span
                              aria-hidden
                              className="absolute -inset-1 animate-pulse rounded-full bg-primary/20"
                            />
                          )}
                          <span
                            className={`relative flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                              isDone
                                ? "bg-green-600 text-white"
                                : isCurrent
                                  ? "bg-primary text-primary-fg"
                                  : "bg-primary/[0.06] text-foreground/30"
                            }`}>
                            {isDone ? (
                              <CheckIcon />
                            ) : isCurrent ? (
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-fg/30 border-t-primary-fg" />
                            ) : (
                              i + 1
                            )}
                          </span>
                        </span>
                        {i < CONSULTATION_STEPS.length - 1 && (
                          <span
                            className={`my-1 w-0.5 flex-1 rounded-full ${
                              isDone ? "bg-green-600/60" : "bg-primary/10"
                            }`}
                          />
                        )}
                      </div>
                      <div className="pb-6">
                        <p
                          className={`text-sm ${
                            isDone || isCurrent
                              ? "font-semibold text-foreground"
                              : "text-foreground/35"
                          }`}>
                          {label}
                        </p>
                        {isCurrent && (
                          <p className="mt-0.5 text-xs text-primary">
                            در حال حاضر در این مرحله هستیم
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          </div>

          <div className="mt-2 flex flex-col gap-3 border-t border-primary/10 pt-6 sm:flex-row">
            <Link
              href="/request"
              className="flex-1 rounded-xl border border-primary/25 bg-background py-3 text-center text-sm font-medium text-primary transition-all hover:bg-primary/[0.06] active:scale-[0.98]">
              ویرایش درخواست
            </Link>
            <button
              onClick={() =>
                toast.success(
                  "درخواست رزرو مشاوره ثبت شد؛ به‌زودی با شما تماس می‌گیریم."
                )
              }
              className="flex-1 rounded-xl bg-primary py-3 text-sm font-medium text-primary-fg shadow-sm shadow-primary/30 transition-all hover:bg-primary/90 active:scale-[0.98]">
              رزرو مشاوره
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
