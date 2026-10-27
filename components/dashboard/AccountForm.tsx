"use client";

import { useState, type FormEvent } from "react";
import { toast } from "@/lib/toast";
import { updateAccount } from "@/app/actions";
import BirthDateWheel from "./BirthDateWheel";
import { toFaDigits } from "@/lib/format";

interface AccountFormProps {
  initial: {
    phone: string;
    name: string;
    nationalId: string;
    dateOfBirth: string;
  };
}

const inputClass =
  "w-full rounded-xl border border-primary/15 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 transition-colors focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10";

export default function AccountForm({ initial }: AccountFormProps) {
  const [name, setName] = useState(initial.name);
  const [nationalId, setNationalId] = useState(initial.nationalId);
  const [dob, setDob] = useState(initial.dateOfBirth);
  const [saving, setSaving] = useState(false);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await updateAccount({
      name,
      nationalId,
      dateOfBirth: dob,
    });
    setSaving(false);
    if (!res.ok) {
      toast.error(res.error ?? "ذخیره اطلاعات با خطا مواجه شد");
    } else {
      toast.success("اطلاعات با موفقیت ذخیره شد");
    }
  }

  return (
    <form onSubmit={handleSave} className="mt-6 space-y-6">
      <div className="rounded-2xl border border-primary/10 bg-primary/[0.02] p-5">
        <div className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground/70">
              شماره موبایل
            </label>
            <input
              dir="ltr"
              value={initial.phone}
              readOnly
              disabled
              className={`${inputClass} cursor-not-allowed text-right text-foreground/50`}
            />
            <p className="mt-1.5 text-xs text-foreground/40">
              شماره موبایل هویت حساب شماست و قابل تغییر نیست
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground/70">
              نام و نام خانوادگی
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثلاً علی رضایی"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground/70">
              کد ملی
            </label>
            <input
              dir="ltr"
              value={nationalId}
              onChange={(e) =>
                setNationalId(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              inputMode="numeric"
              placeholder={toFaDigits("1234567890")}
              className={`${inputClass} text-right tracking-widest`}
            />
            <p className="mt-1.5 text-xs text-foreground/40">
              ۱۰ رقم بدون خط و فاصله
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-primary/10 bg-primary/[0.02] p-5">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-foreground/70">
              تاریخ تولد (شمسی)
            </label>
            <p className="mt-1 text-xs text-foreground/40">
              با بالا و پایین رول کردن یا فلش‌های بالا و پایین هر ستون، سال و ماه
              و روز را انتخاب کنید
            </p>
          </div>
          {dob && (
            <button
              type="button"
              onClick={() => setDob("")}
              className="text-xs text-foreground/40 transition-colors hover:text-red-500">
              پاک کردن
            </button>
          )}
        </div>
        <div className="relative">
          <div className="rounded-2xl border border-primary/10 bg-background p-2">
            <BirthDateWheel value={dob} onChange={setDob} />
          </div>
          {!dob && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-background/70 text-sm text-foreground/40">
              برای انتخاب تولد، رول کردن را شروع کنید
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-fg shadow-sm shadow-primary/30 transition-all hover:bg-primary/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60">
        {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
      </button>
    </form>
  );
}
