"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { formatPrice as addCommas } from "@/lib/format";

const CHECKLIST_ITEMS = [
  { id: "talar", label: "تالار" },
  { id: "ateliye", label: "آتلیه" },
  { id: "mezon", label: "میزون و آرایشگاه" },
  { id: "car", label: "رزرو ماشین و دکوراسیون" },
  { id: "nail", label: "سالن ناخن" },
  { id: "cookery", label: "آشپزخانه" },
];

const CONTACT_METHODS = [
  { value: "phone", label: "تماس تلفنی" },
  { value: "whatsapp", label: "واتساپ" },
  { value: "telegram", label: "تلگرام" },
  { value: "email", label: "ایمیل" },
];

const REFERRAL_SOURCES = [
  { value: "instagram", label: "اینستاگرام" },
  { value: "google", label: "گوگل" },
  { value: "family", label: "آشنایی از دوستان و خانواده" },
  { value: "telegram", label: "تلگرام" },
  { value: "other", label: "سایر" },
];

const WEDDING_TYPES = [
  { value: "modern", label: "مدرن و لوکس" },
  { value: "garden", label: "باغ سنتی" },
  { value: "hall", label: "تالار کلاسیک" },
  { value: "rooftop", label: "پشت بام" },
  { value: "none", label: "بدون ترجیح" },
];

const PRICE_MAP: Record<string, number> = {
  talar: 15000000,
  ateliye: 5000000,
  mezon: 4000000,
  car: 3000000,
  nail: 2000000,
  cookery: 6000000,
};

function formatPrice(amount: number) {
  return amount.toLocaleString("fa-IR") + " تومان";
}

const TALAR_LIST = [
  {
    id: "1",
    name: "تالار پردیس",
    capacity: 500,
    providesFood: true,
    category: "باغ",
    image: "bg-gradient-to-br from-emerald-300/60 to-emerald-500/60",
  },
  {
    id: "2",
    name: "تالار ساری",
    capacity: 300,
    providesFood: false,
    category: "کلاسیک",
    image: "bg-gradient-to-br from-amber-300/60 to-rose-400/60",
  },
  {
    id: "3",
    name: "باغ رستوران بهشت",
    capacity: 800,
    providesFood: true,
    category: "باغ",
    image: "bg-gradient-to-br from-green-300/60 to-teal-500/60",
  },
  {
    id: "4",
    name: "تالار مدرن",
    capacity: 250,
    providesFood: true,
    category: "مدرن",
    image: "bg-gradient-to-br from-sky-300/60 to-indigo-500/60",
  },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-[11px] font-semibold tracking-wider text-foreground/50">
      {children}
    </label>
  );
}

function Input({
  error,
  ...props
}: { error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border bg-primary/[0.02] px-4 py-3 text-sm text-foreground outline-none shadow-sm transition-all placeholder:text-foreground/25 focus:border-primary/60 focus:shadow-md focus:shadow-primary/10 focus:ring-2 focus:ring-primary/20 ${
        error ? "border-red-400/60" : "border-primary/25"
      } ${props.className || ""}`}
    />
  );
}

function Textarea({
  error,
  ...props
}: { error?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-xl border bg-primary/[0.02] px-4 py-3 text-sm text-foreground outline-none shadow-sm transition-all placeholder:text-foreground/25 focus:border-primary/60 focus:shadow-md focus:shadow-primary/10 focus:ring-2 focus:ring-primary/20 resize-none ${
        error ? "border-red-400/60" : "border-primary/25"
      } ${props.className || ""}`}
    />
  );
}

function CustomSelect({
  value,
  onChange,
  error,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between rounded-xl border bg-primary/[0.02] px-4 py-3 text-sm shadow-sm transition-all ${
          error ? "border-red-400/60" : "border-primary/25"
        } ${open ? "border-primary/60 shadow-md shadow-primary/10 ring-2 ring-primary/20" : "hover:border-primary/40"}`}>
        <span className={value ? "text-foreground" : "text-foreground/25"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 text-foreground/40 transition-transform ${open ? "rotate-180" : ""}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-1 w-full rounded-xl border border-primary/10 bg-background p-1 shadow-xl shadow-primary/10">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-right text-sm transition-all ${
                opt.value === value
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-foreground hover:bg-primary/5"
              }`}>
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                  opt.value === value
                    ? "border-primary bg-primary"
                    : "border-primary/30"
                }`}>
                {opt.value === value && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              {opt.label}
            </button>
          ))}
        </div>
      )}
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </div>
  );
}

function ErrorMsg({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-xs text-red-400">{children}</p>;
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-primary/10 bg-background/60 p-5">
      <h2 className="mb-4 text-base font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}

export default function SchedulePage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<number>(0);
  const [activeSteps, setActiveSteps] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    groomName: "",
    brideName: "",
    phone: "",
    contactMethod: "phone",
    referralSource: "",
    weddingDate: "",
    leaveToShabashchi: false,
    weddingType: "",
    budget: "",
    dreamWedding: "",
    checkedItems: ["talar", "ateliye", "mezon", "car", "nail", "cookery"],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consented, setConsented] = useState(false);
  const [talarMode, setTalarMode] = useState<"shabashchi" | "choose" | null>(
    null,
  );
  const [selectedTalar, setSelectedTalar] = useState("");

  function update<T>(field: string, value: T) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  }

  function toggleCheck(id: string) {
    setFormData((prev) => ({
      ...prev,
      checkedItems: prev.checkedItems.includes(id)
        ? prev.checkedItems.filter((i) => i !== id)
        : [...prev.checkedItems, id],
    }));
  }

  function hasRequiredFields(): boolean {
    return (
      formData.groomName.trim() !== "" &&
      formData.brideName.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.contactMethod !== "" &&
      formData.referralSource !== "" &&
      formData.weddingType !== "" &&
      formData.budget !== ""
    );
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!formData.groomName.trim()) e.groomName = "نام داماد الزامی است";
    if (!formData.brideName.trim()) e.brideName = "نام عروس الزامی است";
    if (!formData.phone.trim()) e.phone = "شماره تماس الزامی است";
    if (!formData.contactMethod) e.contactMethod = "روش تماس را انتخاب کنید";
    if (!formData.referralSource)
      e.referralSource = "منبع آشنایی را انتخاب کنید";
    if (!formData.weddingType) e.weddingType = "نوع عروسی را انتخاب کنید";
    if (!formData.budget) e.budget = "بودجه مورد نظر را وارد کنید";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (!validate()) {
      mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setActiveSteps(formData.checkedItems);
    setStep(1);
  }

  function handleFinish() {
    // TODO: submit form data
  }

  if (step === 0) {
    return (
      <main
        ref={mainRef}
        className="flex-1 overflow-y-auto p-6"
        style={{ overscrollBehavior: "contain" }}>
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold text-foreground">برنامه عروسی</h1>
          <p className="mt-1 text-sm text-foreground/50">
            اطلاعات اولیه برنامه عروسی خود را وارد کنید
          </p>

          <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-50/60 p-4 text-sm text-amber-900/80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 shrink-0 text-amber-500">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" x2="12" y1="9" y2="13" />
              <line x1="12" x2="12.01" y1="17" y2="17" />
            </svg>
            <span>
              لطفاً اطلاعات شخصی خود را در بخش{" "}
              <Link
                href="/dashboard/account"
                className="font-semibold text-amber-700 underline underline-offset-2 transition-colors hover:text-amber-600">
                حساب کاربری
              </Link>{" "}
              تکمیل کنید
            </span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
            className="mt-6 space-y-6">
            <SectionCard title="اطلاعات اولیه">
              <div className="space-y-4">
                <div>
                  <Label>نام داماد</Label>
                  <Input
                    value={formData.groomName}
                    onChange={(e) => update("groomName", e.target.value)}
                    placeholder="نام داماد"
                    error={errors.groomName}
                  />
                  {errors.groomName && <ErrorMsg>{errors.groomName}</ErrorMsg>}
                </div>
                <div>
                  <Label>نام عروس</Label>
                  <Input
                    value={formData.brideName}
                    onChange={(e) => update("brideName", e.target.value)}
                    placeholder="نام عروس"
                    error={errors.brideName}
                  />
                  {errors.brideName && <ErrorMsg>{errors.brideName}</ErrorMsg>}
                </div>
                <div>
                  <Label>شماره تماس</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    error={errors.phone}
                  />
                  {errors.phone && <ErrorMsg>{errors.phone}</ErrorMsg>}
                </div>
                <div>
                  <Label>روش ترجیحی تماس</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {CONTACT_METHODS.map((m) => {
                      const selected = formData.contactMethod === m.value;
                      return (
                        <button
                          type="button"
                          key={m.value}
                          onClick={() => update("contactMethod", m.value)}
                          className={`flex items-center gap-3 rounded-xl border p-4 text-right transition-all ${
                            selected
                              ? "border-primary bg-primary/5"
                              : "border-primary/10 bg-background hover:border-primary/20 hover:bg-primary/[0.03]"
                          }`}>
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg transition-all ${
                              selected
                                ? "bg-primary text-white"
                                : "bg-primary/10 text-primary/60"
                            }`}>
                            {m.value === "phone" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                              </svg>
                            )}
                            {m.value === "whatsapp" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                              </svg>
                            )}
                            {m.value === "telegram" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <line x1="22" x2="11" y1="2" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                              </svg>
                            )}
                            {m.value === "email" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <rect
                                  width="20"
                                  height="16"
                                  x="2"
                                  y="4"
                                  rx="2"
                                />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1">
                            <p
                              className={`text-sm font-medium transition-all ${
                                selected ? "text-primary" : "text-foreground"
                              }`}>
                              {m.label}
                            </p>
                          </div>
                          <div
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                              selected
                                ? "border-primary bg-primary text-white"
                                : "border-primary/30 text-transparent"
                            }`}>
                            {selected && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {errors.contactMethod && (
                    <ErrorMsg>{errors.contactMethod}</ErrorMsg>
                  )}
                </div>
              </div>
            </SectionCard>

            <SectionCard title="اطلاعات مراسم">
              <div className="space-y-4">
                <div>
                  <Label>از کجا با ما آشنا شدید؟</Label>
                  <CustomSelect
                    value={formData.referralSource}
                    onChange={(v) => update("referralSource", v)}
                    error={errors.referralSource}
                    options={REFERRAL_SOURCES}
                    placeholder="انتخاب کنید..."
                  />
                </div>
                <div>
                  <Label>تاریخ عروسی</Label>
                  <Textarea
                    value={formData.weddingDate}
                    onChange={(e) => update("weddingDate", e.target.value)}
                    disabled={formData.leaveToShabashchi}
                    placeholder='مثلاً: "پاییز ۱۴۰۵" یا "۱۵ شهریور ۱۴۰۵"'
                    rows={2}
                    className={
                      formData.leaveToShabashchi
                        ? "cursor-not-allowed opacity-40"
                        : ""
                    }
                  />
                  <label className="mt-2 flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.leaveToShabashchi}
                      onChange={(e) =>
                        update("leaveToShabashchi", e.target.checked)
                      }
                      className="accent-primary"
                    />
                    <span className="text-sm text-foreground/70">
                      این موضوع را به شاباشچی می‌سپارم
                    </span>
                  </label>
                </div>
                <div>
                  <Label>نوع عروسی</Label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {WEDDING_TYPES.map((t) => (
                      <button
                        type="button"
                        key={t.value}
                        onClick={() => update("weddingType", t.value)}
                        className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-2.5 text-sm transition-all ${
                          formData.weddingType === t.value
                            ? "border-primary bg-primary/10 font-medium text-primary"
                            : "border-primary/20 text-foreground/60 hover:border-primary/30"
                        }`}>
                        {t.label}
                      </button>
                    ))}
                  </div>
{errors.weddingType && (
                      <ErrorMsg>{errors.weddingType}</ErrorMsg>
                    )}
                  </div>
                  <div>
                    <Label>بودجه مورد نظر</Label>
                    <div className="relative">
                      <Input
                        type="text"
                        inputMode="numeric"
                        value={formData.budget ? addCommas(formData.budget) : ""}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/\D/g, "");
                          update("budget", raw);
                        }}
                        placeholder="مثلاً: ۵۰,۰۰۰,۰۰۰"
                        className="pe-14"
                      />
                      <span className="absolute end-3 top-1/2 -translate-y-1/2 text-sm text-foreground/40 select-none">
                        تومان
                      </span>
                    </div>
                    {errors.budget && <ErrorMsg>{errors.budget}</ErrorMsg>}
                  </div>
                </div>
            </SectionCard>

            <SectionCard title="موارد مورد نیاز">
              <p className="mb-4 text-xs text-foreground/40">
                مواردی که نیاز دارید را انتخاب کنید تا به عنوان مراحل برنامه به
                شما نمایش داده شوند
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {CHECKLIST_ITEMS.map((item) => {
                  const checked = formData.checkedItems.includes(item.id);
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`group flex items-center gap-3 rounded-xl border p-4 text-right transition-all ${
                        checked
                          ? "border-primary bg-primary/5"
                          : "border-primary/10 bg-background hover:border-primary/20 hover:bg-primary/[0.03]"
                      }`}>
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg transition-all ${
                          checked
                            ? "bg-primary text-white"
                            : "bg-primary/10 text-primary/60"
                        }`}>
                        {item.id === "talar" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M3 21h18" />
                            <path d="M3 10h18" />
                            <path d="M5 6l7-3 7 3" />
                            <path d="M4 10v11" />
                            <path d="M20 10v11" />
                            <path d="M8 14v.01" />
                            <path d="M12 14v.01" />
                            <path d="M16 14v.01" />
                          </svg>
                        )}
                        {item.id === "ateliye" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                            <circle cx="12" cy="13" r="3" />
                          </svg>
                        )}
                        {item.id === "mezon" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        )}
                        {item.id === "car" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
                            <circle cx="6.5" cy="16.5" r="2.5" />
                            <circle cx="16.5" cy="16.5" r="2.5" />
                          </svg>
                        )}
                        {item.id === "nail" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M12 2a2 2 0 0 1 2 2v4a2 2 0 0 1-4 0V4a2 2 0 0 1 2-2z" />
                            <path d="M8 14v.01" />
                            <path d="M16 14v.01" />
                            <path d="M6 10h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z" />
                          </svg>
                        )}
                        {item.id === "cookery" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M6 2v6a6 6 0 0 0 12 0V2" />
                            <path d="M12 14v8" />
                            <path d="M2 14h20" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium transition-all ${
                            checked ? "text-primary" : "text-foreground"
                          }`}>
                          {item.label}
                        </p>
                      </div>
                      <div
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                          checked
                            ? "border-primary bg-primary text-white"
                            : "border-primary/30 text-transparent"
                        }`}>
                        {checked && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </SectionCard>

            <SectionCard title="رویای عروسی شما">
              <Label>در چند جمله از عروسی رویایی خود بگویید</Label>
              <Textarea
                value={formData.dreamWedding}
                onChange={(e) => update("dreamWedding", e.target.value)}
                placeholder='مثلاً: "ما یک گروه موسیقی زنده سنتی می‌خواهیم" یا "عروس به گل‌آرایی خاصی علاقه دارد"'
                rows={4}
              />
            </SectionCard>

            <button
              type="submit"
              disabled={!hasRequiredFields()}
              className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-white transition-all hover:bg-primary/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40">
              مرحله بعد
            </button>
          </form>
        </div>
      </main>
    );
  }

  const checkedLabels = activeSteps.map(
    (id) => CHECKLIST_ITEMS.find((i) => i.id === id)!.label,
  );
  const totalSteps = activeSteps.length + 1;
  const currentLabel =
    step <= activeSteps.length ? checkedLabels[step - 1] : "تأیید و پرداخت";
  const isConsentStep = step === totalSteps;
  const currentStepId =
    step <= activeSteps.length ? activeSteps[step - 1] : null;

  return (
    <main
      className="flex-1 overflow-y-auto p-6"
      style={{ overscrollBehavior: "contain" }}>
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => setStep(0)}
          className="mb-6 flex items-center gap-1 rounded-xl border border-primary/20 px-3 py-1.5 text-xs font-medium text-foreground/60 transition-all hover:bg-primary/10 hover:text-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          بازگشت به اطلاعات اولیه
        </button>

        <div className="mb-8 flex items-center overflow-x-auto pb-2">
          {activeSteps.map((id, i) => {
            const completed = i < step - 1;
            const current = i === step - 1;
            return (
              <div key={id} className="flex items-center">
                {i > 0 && (
                  <div
                    className={`mx-1 h-0.5 w-6 rounded-full sm:mx-2 sm:w-12 ${
                      i < step ? "bg-primary" : "bg-primary/15"
                    }`}
                  />
                )}
                <div className="flex shrink-0 flex-col items-center gap-1.5">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                      completed
                        ? "bg-primary text-white shadow-sm shadow-primary/30"
                        : current
                          ? "bg-primary text-white shadow-sm shadow-primary/30"
                          : "border-2 border-primary/25 text-foreground/40"
                    }`}>
                    {completed ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span
                    className={`whitespace-nowrap text-[10px] font-medium ${
                      completed || current ? "text-primary" : "text-foreground/30"
                    }`}>
                    {CHECKLIST_ITEMS.find((item) => item.id === id)?.label}
                  </span>
                </div>
              </div>
            );
          })}
          <div className="flex items-center">
            <div
              className={`mx-1 h-0.5 w-6 rounded-full sm:mx-2 sm:w-12 ${
                isConsentStep || step > activeSteps.length ? "bg-primary" : "bg-primary/15"
              }`}
            />
            <div className="flex shrink-0 flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  isConsentStep
                    ? "bg-primary text-white shadow-sm shadow-primary/30"
                    : "border-2 border-primary/25 text-foreground/40"
                }`}>
                {activeSteps.length + 1}
              </div>
              <span
                className={`whitespace-nowrap text-[10px] font-medium ${
                  isConsentStep ? "text-primary" : "text-foreground/30"
                }`}>
                تأیید و پرداخت
              </span>
            </div>
          </div>
        </div>

        {isConsentStep ? (
          <div className="space-y-6 rounded-xl border border-primary/10 bg-background/60 p-6">
            <h2 className="text-base font-semibold text-foreground">
              شرایط و قوانین
            </h2>
            <div className="space-y-4 rounded-xl border border-primary/10 bg-primary/5 p-4 text-sm leading-relaxed text-foreground/70">
              <p>
                ۱. پس از امضای قرارداد و پرداخت هزینه، هیچ‌گونه تغییری در
                قرارداد اعمال نخواهد شد و مشتری حق کامل انصراف از تغییرات را
                دارد.
              </p>
              <p>
                ۲. کلیه مبالغ پرداختی بابت رزرو خدمات و هماهنگی‌های انجام شده
                غیرقابل استرداد می‌باشد.
              </p>
              <p>
                ۳. زمان‌بندی مراسم پس از نهایی‌سازی قرارداد و با توافق طرفین
                تعیین می‌شود و هرگونه تغییر در تاریخ منوط به تأیید شاباشچی و
                تامین‌کنندگان مربوطه است.
              </p>
              <p>
                ۴. مشتری موظف است حداقل ۴۸ ساعت قبل از مراسم هرگونه تغییر در
                تعداد مهمانان یا جزئیات خدمات را اطلاع دهد.
              </p>
              <p>
                ۵. شاباشچی متعهد می‌شود کلیه خدمات انتخاب شده را طبق توافق و در
                زمان مقرر ارائه نماید.
              </p>
              <p>
                ۶. در صورت بروز هرگونه مشکل یا تخلف از سوی تامین‌کنندگان،
                شاباشچی به عنوان واسطه پیگیری لازم را انجام خواهد داد.
              </p>
              <p>
                ۷. اطلاعات شخصی و جزئیات مراسم مشتری محرمانه بوده و صرفاً برای
                هماهنگی‌های مربوط به عروسی استفاده می‌شود.
              </p>
              <p>
                ۸. مشتری می‌تواند تا ۷ روز پس از امضای قرارداد، نسبت به لغو کامل
                سفارش اقدام نماید که در این صورت ۳۰٪ از مبلغ پرداختی به عنوان
                جریمه کسر خواهد شد.
              </p>
            </div>
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={consented}
                onChange={(e) => setConsented(e.target.checked)}
                className="h-4 w-4 accent-primary"
              />
              <span className="text-sm text-foreground">
                قوانین و شرایط را مطالعه کردم و موافقم
              </span>
            </label>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <p className="mb-3 text-center text-xs text-foreground/50">
                جزئیات مبلغ قابل پرداخت
              </p>
              <div className="space-y-2">
                {activeSteps.map((id) => {
                  const item = CHECKLIST_ITEMS.find((i) => i.id === id);
                  const price = PRICE_MAP[id];
                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between text-sm">
                      <span className="text-foreground/70">{item?.label}</span>
                      <span className="font-medium text-foreground">
                        {formatPrice(price)}
                      </span>
                    </div>
                  );
                })}
                <div className="border-t border-primary/20 pt-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-foreground">مجموع</span>
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(
                        activeSteps.reduce(
                          (sum, id) => sum + (PRICE_MAP[id] || 0),
                          0,
                        ),
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : currentStepId === "talar" ? (
          <div className="rounded-xl border border-primary/10 bg-background/60 p-6">
            <div className="mb-5 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setTalarMode("shabashchi");
                  setSelectedTalar("");
                }}
                className={`flex-1 rounded-xl border py-3 text-sm font-medium transition-all ${
                  talarMode === "shabashchi"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-primary/20 text-foreground/60 hover:border-primary/30"
                }`}>
                به شاباشچی می‌سپارم
              </button>
              <button
                type="button"
                onClick={() => setTalarMode("choose")}
                className={`flex-1 rounded-xl border py-3 text-sm font-medium transition-all ${
                  talarMode === "choose"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-primary/20 text-foreground/60 hover:border-primary/30"
                }`}>
                انتخاب تالار
              </button>
            </div>

            {talarMode === "shabashchi" ? (
              <div className="rounded-xl bg-primary/5 p-8 text-center">
                <p className="text-base font-medium text-foreground">
                  با تشکر از اعتماد شما
                </p>
                <p className="mt-2 text-sm text-foreground/50">
                  شاباشچی با توجه به اطلاعات شما بهترین تالار را انتخاب خواهد
                  کرد
                </p>
              </div>
            ) : talarMode === "choose" ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {TALAR_LIST.map((talar) => (
                  <button
                    key={talar.id}
                    type="button"
                    onClick={() => setSelectedTalar(talar.id)}
                    className={`group overflow-hidden rounded-xl border text-right transition-all ${
                      selectedTalar === talar.id
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-primary/20 hover:border-primary/40"
                    }`}>
                    <div
                      className={`flex h-32 items-center justify-center ${talar.image}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-60">
                        <path d="M3 21h18" />
                        <path d="M5 21V7l8-4v18" />
                        <path d="M19 21V11l-6-4" />
                        <path d="M9 9v.1" />
                        <path d="M9 12v.1" />
                        <path d="M9 15v.1" />
                        <path d="M9 18v.1" />
                      </svg>
                    </div>
                    <div className="space-y-1.5 p-4">
                      <p className="text-sm font-semibold text-foreground">
                        {talar.name}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-foreground/50">
                        <span>
                          ظرفیت: {talar.capacity.toLocaleString("fa-IR")} نفر
                        </span>
                        <span>•</span>
                        <span>{talar.category}</span>
                      </div>
                      <p className="text-xs text-foreground/50">
                        {talar.providesFood
                          ? "غذا ارائه می‌شود"
                          : "غذا ارائه نمی‌شود"}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-primary/20 p-8 text-center">
                <p className="text-sm text-foreground/40">
                  لطفاً یکی از گزینه‌های بالا را انتخاب کنید
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-xl border border-primary/10 bg-background/60 p-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
              {step}
            </div>
            <p className="text-base font-medium text-foreground">
              {currentLabel}
            </p>
            <p className="mt-1 text-sm text-foreground/40">
              محتوای این مرحله به زودی اضافه می‌شود
            </p>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 rounded-xl border border-primary/20 py-3 text-sm font-medium text-foreground transition-all hover:bg-primary/10 active:scale-[0.98]">
              مرحله قبل
            </button>
          )}
          {!isConsentStep ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={
                currentStepId === "talar" &&
                !(
                  talarMode === "shabashchi" ||
                  (talarMode === "choose" && selectedTalar)
                )
              }
              className="flex-1 rounded-xl bg-primary py-3 text-sm font-medium text-white transition-all hover:bg-primary/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40">
              مرحله بعد
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={!consented}
              className="flex-1 rounded-xl bg-primary py-3 text-sm font-medium text-white transition-all hover:bg-primary/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40">
              پرداخت
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
