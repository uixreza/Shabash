"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import {
  REQUEST_STATUS_LABELS,
  type RequestStatus,
  type WeddingRequest,
} from "@/data/requests";
import StatusBadge from "@/components/console/StatusBadge";
import {
  updateWeddingRequest,
  updateWeddingRequestStatus,
} from "@/app/console/actions";
import { toast } from "@/lib/toast";

const STATUSES: RequestStatus[] = [
  "submitted",
  "under_review",
  "consultation_scheduled",
  "consultation_completed",
];

const inputClass =
  "w-full rounded-xl border border-primary/20 bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-foreground/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-foreground/60">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function RequestEditor({
  request,
}: {
  request: WeddingRequest;
}) {
  const [groomName, setGroomName] = useState(request.groomName);
  const [brideName, setBrideName] = useState(request.brideName);
  const [phone, setPhone] = useState(request.phone);
  const [weddingDate, setWeddingDate] = useState(request.weddingDate ?? "");
  const [venue, setVenue] = useState(request.venue ?? "");
  const [style, setStyle] = useState(request.style ?? "");
  const [notes, setNotes] = useState(request.notes ?? "");
  const [budgetTotal, setBudgetTotal] = useState(
    request.budgetTotal ? String(request.budgetTotal) : ""
  );
  const [services, setServices] = useState(request.services);
  const [status, setStatus] = useState<RequestStatus>(request.status);
  const [isPending, startTransition] = useTransition();

  function handleStatusChange(next: RequestStatus) {
    if (next === status || isPending) return;
    startTransition(async () => {
      const result = await updateWeddingRequestStatus({
        id: request.id,
        status: next,
      });
      if (!result.ok) {
        toast.error(result.error ?? "تغییر وضعیت ناموفق بود");
        return;
      }
      setStatus(next);
      toast.success(`وضعیت به «${REQUEST_STATUS_LABELS[next]}» تغییر کرد`);
    });
  }

  function toggleService(id: string) {
    setServices((current) =>
      current.map((service) =>
        service.id === id ? { ...service, done: !service.done } : service
      )
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isPending) return;

    const digits = budgetTotal.replace(/\D/g, "");
    startTransition(async () => {
      const result = await updateWeddingRequest({
        id: request.id,
        groomName,
        brideName,
        phone,
        weddingDate,
        venue,
        style,
        notes,
        budgetTotal: digits ? Number(digits) : null,
        services: services.map((service) => ({
          id: service.id,
          done: service.done,
        })),
      });
      if (!result.ok || !result.request) {
        toast.error(result.error ?? "ذخیره تغییرات ناموفق بود");
        return;
      }
      toast.success("تغییرات با موفقیت ذخیره شد");
    });
  }

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/console/requests"
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
          بازگشت به مدیریت درخواست‌ها
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
              <StatusBadge status={status} />
              <span
                dir="ltr"
                className="font-mono text-xs font-semibold tracking-wide text-primary">
                درخواست #{request.id}
              </span>
            </div>
          </div>

          <section className="mt-6">
            <h2 className="text-base font-bold text-foreground">وضعیت درخواست</h2>
            <p className="mt-1 text-xs text-foreground/50">
              با انتخاب هر گزینه، وضعیت درخواست بلافاصله برای کاربر به‌روز
              می‌شود.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {STATUSES.map((value) => (
                <button
                  key={value}
                  type="button"
                  disabled={isPending}
                  onClick={() => handleStatusChange(value)}
                  aria-pressed={status === value}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all disabled:opacity-50 ${
                    status === value
                      ? "border-primary bg-primary text-primary-fg"
                      : "border-primary/20 text-foreground/60 hover:border-primary/40"
                  }`}>
                  {REQUEST_STATUS_LABELS[value]}
                </button>
              ))}
            </div>
          </section>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-6 divide-y divide-primary/10 border-t border-primary/10 pt-6">
            <section className="pb-6">
              <h2 className="text-base font-bold text-foreground">
                اطلاعات زوجین
              </h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <Field label="نام داماد">
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={groomName}
                    onChange={(e) => setGroomName(e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="نام عروس">
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={brideName}
                    onChange={(e) => setBrideName(e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="شماره تماس">
                  <input
                    type="text"
                    required
                    dir="ltr"
                    inputMode="tel"
                    maxLength={15}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`${inputClass} text-right`}
                  />
                </Field>
                <Field label="تاریخ عروسی (شمسی)">
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="1405/08/06"
                    maxLength={10}
                    value={weddingDate}
                    onChange={(e) => setWeddingDate(e.target.value)}
                    className={`${inputClass} text-right`}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="مکان برگزاری">
                    <input
                      type="text"
                      maxLength={200}
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                </div>
              </div>
            </section>

            <section className="pb-6">
              <h2 className="text-base font-bold text-foreground">
                ترجیحات عروسی
              </h2>
              <div className="mt-3 space-y-4">
                <Field label="سبک یا تم مورد نظر">
                  <input
                    type="text"
                    maxLength={200}
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <div>
                  <p className="mb-1.5 text-xs font-medium text-foreground/60">
                    خدمات انتخاب‌شده
                  </p>
                  {services.length === 0 ? (
                    <p className="text-sm text-foreground/50">
                      خدماتی انتخاب نشده است
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {services.map((service) => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => toggleService(service.id)}
                          aria-pressed={service.done}
                          className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                            service.done
                              ? "border-green-200 bg-green-50 text-green-700"
                              : "border-primary/20 bg-primary/[0.04] text-foreground/70 hover:border-primary/40"
                          }`}>
                          {service.label}
                          {service.done && (
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
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                  <p className="mt-2 text-[11px] text-foreground/40">
                    با کلیک روی هر خدمت، وضعیت «انجام شده» آن تغییر می‌کند.
                  </p>
                </div>

                <Field label="توضیحات تکمیلی">
                  <textarea
                    rows={4}
                    maxLength={2000}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className={`${inputClass} resize-y`}
                  />
                </Field>
              </div>
            </section>

            <section className="pb-6">
              <h2 className="text-base font-bold text-foreground">بودجه</h2>
              <div className="mt-3 max-w-xs">
                <Field label="بودجه تخمینی (تومان)">
                  <input
                    type="text"
                    inputMode="numeric"
                    dir="ltr"
                    placeholder="0"
                    value={budgetTotal}
                    onChange={(e) => setBudgetTotal(e.target.value)}
                    className={`${inputClass} text-right`}
                  />
                </Field>
              </div>
              {request.budgetAllocation.length > 0 && (
                <div className="mt-4 divide-y divide-primary/5 rounded-xl border border-primary/10 bg-primary/[0.02] px-4">
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
                        {line.amount.toLocaleString("fa-IR")} تومان
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <div className="flex items-center justify-between gap-3 pt-2">
              <p className="text-xs text-foreground/40" aria-live="polite">
                {isPending ? "در حال ذخیره..." : ""}
              </p>
              <button
                type="submit"
                disabled={isPending}
                className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-fg shadow-sm shadow-primary/30 transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-40">
                {isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
