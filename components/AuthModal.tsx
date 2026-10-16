"use client";

import { useState, useRef, type FormEvent } from "react";
import { createPortal } from "react-dom";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  function handlePhoneSubmit(e: FormEvent) {
    e.preventDefault();
    if (phone.length < 10) return;
    setStep("otp");
    setTimeout(() => inputsRef.current[0]?.focus(), 0);
  }

  function handleOtpChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handleClose() {
    setPhone("");
    setStep("phone");
    setOtp(["", "", "", ""]);
    onClose();
  }

  if (!open) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      <div className="fixed left-1/2 top-1/2 z-[70] w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-lp-border bg-lp-surface-strong/95 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <button onClick={handleClose} className="absolute left-3 top-3 text-lp-muted transition-colors hover:text-lp-gold">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        </button>

        {step === "phone" ? (
          <form onSubmit={handlePhoneSubmit} className="flex flex-col items-center gap-4">
            <div className="lp-gold-gradient flex h-12 w-12 items-center justify-center rounded-xl text-lp-on-gold shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>

            <h2 className="text-lg font-bold text-lp-text">ورود به شاباش</h2>
            <p className="-mt-2 text-sm text-lp-muted">شماره موبایل خود را وارد کنید</p>

            <input
              type="tel"
              inputMode="numeric"
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
              className="w-full rounded-xl border border-lp-border bg-lp-bg/70 px-4 py-3 text-center text-lg tracking-[0.15em] text-lp-text outline-none transition-all placeholder:text-lp-muted/50 focus:border-lp-gold focus:ring-2 focus:ring-lp-gold/30"
            />

            <button
              type="submit"
              disabled={phone.length < 10}
              className="lp-gold-gradient w-full rounded-xl py-3 text-sm font-bold text-lp-on-gold transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            >
              دریافت کد
            </button>

            <p className="text-[11px] leading-relaxed text-lp-muted">
              با ثبت‌نام، <span className="font-bold text-lp-gold">قوانین</span> و <span className="font-bold text-lp-gold">حریم خصوصی</span> شاباش را می‌پذیرید.
            </p>
          </form>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (otp.some((d) => !d)) return;
              handleClose();
            }}
            className="flex flex-col items-center gap-4"
          >
            <div className="lp-gold-gradient flex h-12 w-12 items-center justify-center rounded-xl text-lp-on-gold shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

            <h2 className="text-lg font-bold text-lp-text">کد تأیید</h2>
            <p className="-mt-2 text-sm text-lp-muted">کد ۴ رقمی را وارد کنید</p>

            <div className="flex gap-3" dir="ltr">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputsRef.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className="h-14 w-12 rounded-xl border border-lp-border bg-lp-bg/70 text-center text-xl font-bold text-lp-text outline-none transition-all focus:border-lp-gold focus:ring-2 focus:ring-lp-gold/30"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={otp.some((d) => !d)}
              className="lp-gold-gradient w-full rounded-xl py-3 text-sm font-bold text-lp-on-gold transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            >
              تأیید
            </button>

            <button type="button" onClick={() => { setStep("phone"); setOtp(["", "", "", ""]); }} className="text-xs font-bold text-lp-gold transition-colors hover:underline">
              تغییر شماره
            </button>
          </form>
        )}
      </div>
    </>,
    document.body,
  );
}
