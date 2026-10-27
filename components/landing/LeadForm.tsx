"use client";

import { useState, type FormEvent } from "react";
import { toast } from "@/lib/toast";
import { isValidIranPhone, normalizeIranPhone, toFaDigits } from "@/lib/format";
import { LockIcon, PhoneIcon, RingsIcon } from "./icons";

export default function LeadForm() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const normalized = normalizeIranPhone(phone);
    if (!isValidIranPhone(normalized)) {
      setError("شماره موبایل معتبر وارد کنید (مثال: ۰۹۱۲۳۴۵۶۷۸۹)");
      return;
    }
    setError(null);
    setPhone("");
    toast.success(
      "درخواست شما ثبت شد؛ کارشناس شاباشچی تا کمتر از ۲۵ دقیقه دیگر با شما تماس می‌گیرد.",
    );
  }

  return (
    <section id="lead-form" className="relative scroll-mt-20 py-16 lg:py-24">
      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
        <div className="lp-glass relative overflow-hidden rounded-3xl p-7 text-center sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-lp-gold/15 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-lp-green/12 blur-[80px]" />

          <div className="lp-gold-gradient relative z-10 mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-lp-on-gold shadow-lg">
            <RingsIcon className="h-7 w-7" />
          </div>

          <h2 className="relative z-10 mb-3 text-xl font-bold text-lp-text sm:text-3xl">
            آماده‌اید مراسم رویایی‌تان را شروع کنید؟
          </h2>
          <p className="relative z-10 mx-auto mb-8 max-w-xl text-sm leading-loose text-lp-muted sm:text-base">
            شماره تماس خود را بگذارید تا کارشناس ارشد تشریفات شاباشچی در کمتر از
            ۲۵ دقیقه، جهت{" "}
            <span className="font-bold text-lp-gold">
              مشاوره ۳۰ دقیقه‌ای رایگان
            </span>{" "}
            و برآورد دقیق هزینه‌ها با شما تماس بگیرد.
          </p>

          <form
            onSubmit={handleSubmit}
            className="relative z-10 mx-auto flex w-full max-w-md flex-col items-stretch gap-3 sm:flex-row">
            <input
              type="tel"
              inputMode="numeric"
              required
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (error) setError(null);
              }}
              placeholder="شماره تماس (مثلاً ۰۹۱۲۳۴۵۶۷۸۹)"
              className="w-full rounded-full border border-lp-border bg-lp-bg/70 px-5 py-3.5 text-right text-sm text-lp-text shadow-inner outline-none transition-all placeholder:text-lp-muted/70 focus:border-lp-gold focus:ring-2 focus:ring-lp-gold/30 sm:text-base"
            />
            <button
              type="submit"
              className="lp-gold-gradient flex-shrink-0 rounded-full px-7 py-3.5 text-sm font-bold text-lp-on-gold shadow-lg transition-all hover:brightness-110 active:scale-[0.98] sm:text-base">
              درخواست تماس فوری کارشناس
            </button>
          </form>

          {error && (
            <p className="relative z-10 mt-3 text-xs font-medium text-red-500">
              {toFaDigits(error)}
            </p>
          )}

          <span className="relative z-10 mt-5 inline-flex items-center gap-1.5 text-[11px] text-lp-muted sm:text-xs">
            <LockIcon className="h-3.5 w-3.5 text-lp-green" />
            اطلاعات شما نزد تشریفات لوکس شاباشچی محفوظ می‌ماند.
            <PhoneIcon className="hidden h-3.5 w-3.5 text-lp-gold sm:block" />
          </span>
        </div>
      </div>
    </section>
  );
}
