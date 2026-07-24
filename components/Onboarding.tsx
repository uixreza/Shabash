"use client";

import { useState } from "react";
import { useTheme } from "@/components/Wrapper";

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const { theme, setTheme } = useTheme();
  const [step, setStep] = useState(1);
  const [fullname, setFullname] = useState("");
  const [dob, setDob] = useState("");
  const [pid, setPid] = useState("");

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50  backdrop-blur-sm" />
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-primary/10 bg-background p-8 shadow-2xl shadow-primary/20">
        <div className="mb-6 flex items-center justify-center gap-2">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`h-1.5 w-12 rounded-full transition-all ${s <= step ? "bg-primary" : "bg-primary/20"}`}
            />
          ))}
        </div>

        {step === 1 ? (
          <div className="flex flex-col items-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" x2="12" y1="1" y2="3" />
                <line x1="12" x2="12" y1="21" y2="23" />
                <line x1="4.22" x2="5.64" y1="4.22" y2="5.64" />
                <line x1="18.36" x2="19.78" y1="18.36" y2="19.78" />
                <line x1="1" x2="3" y1="12" y2="12" />
                <line x1="21" x2="23" y1="12" y2="12" />
                <line x1="4.22" x2="5.64" y1="19.78" y2="18.36" />
                <line x1="18.36" x2="19.78" y1="5.64" y2="4.22" />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-foreground">
              حالت نمایش را انتخاب کنید
            </h2>
            <p className="-mt-3 text-sm text-foreground/50">
              رابط کاربری مورد نظر خود را انتخاب کنید
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setTheme("light")}
                className={`flex w-32 flex-col items-center gap-3 rounded-2xl border-2 p-5 transition-all ${
                  theme === "light"
                    ? "border-primary bg-primary/5 shadow-sm shadow-primary/20"
                    : "border-primary/10 hover:border-primary/30"
                }`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-500">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" x2="12" y1="1" y2="3" />
                  <line x1="12" x2="12" y1="21" y2="23" />
                  <line x1="4.22" x2="5.64" y1="4.22" y2="5.64" />
                  <line x1="18.36" x2="19.78" y1="18.36" y2="19.78" />
                  <line x1="1" x2="3" y1="12" y2="12" />
                  <line x1="21" x2="23" y1="12" y2="12" />
                  <line x1="4.22" x2="5.64" y1="19.78" y2="18.36" />
                  <line x1="18.36" x2="19.78" y1="5.64" y2="4.22" />
                </svg>
                <span className="text-sm font-medium text-foreground">
                  روشن
                </span>
              </button>

              <button
                onClick={() => setTheme("dark")}
                className={`flex w-32 flex-col items-center gap-3 rounded-2xl border-2 p-5 transition-all ${
                  theme === "dark"
                    ? "border-primary bg-primary/5 shadow-sm shadow-primary/20"
                    : "border-primary/10 hover:border-primary/30"
                }`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-indigo-500">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                <span className="text-sm font-medium text-foreground">
                  تاریک
                </span>
              </button>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-white transition-all hover:bg-primary/90 active:scale-[0.98]">
              ادامه
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-xl font-bold text-foreground">
                اطلاعات شخصی
              </h2>
              <p className="-mt-1 text-sm text-foreground/50">
                لطفا اطلاعات خود را وارد کنید
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground/60">
                نام و نام خانوادگی
              </label>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="مثال: علی رضایی"
                className="w-full rounded-xl border border-primary/20 bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-foreground/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground/60">
                کد ملی
              </label>
              <input
                type="text"
                value={pid}
                onChange={(e) =>
                  setPid(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                placeholder="۱۰ رقمی"
                className="w-full rounded-xl border border-primary/20 bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-foreground/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground/60">
                تاریخ تولد
              </label>
              <input
                type="text"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="مثال: ۱۳۷۵/۰۶/۱۵"
                className="w-full rounded-xl border border-primary/20 bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-foreground/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button
              onClick={onComplete}
              disabled={!fullname.trim() || !pid.trim() || !dob.trim()}
              className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-white transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-40">
              ثبت و شروع
            </button>
          </div>
        )}
      </div>
    </>
  );
}
