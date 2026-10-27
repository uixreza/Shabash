"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { toast } from "@/lib/toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  formatPrice as addCommas,
  isValidIranPhone,
  normalizeIranPhone,
} from "@/lib/format";
import { submitWeddingRequest } from "@/app/actions";
import { CHECKLIST_ITEMS, PRICE_MAP } from "@/data/requests";
import {
  ArrowLeftIcon,
  CameraIcon,
  CalendarIcon,
  CalendarEditIcon,
  CateringIcon,
  CheckCircleIcon,
  HeartIcon,
  MailIcon,
  MakeupIcon,
  MusicIcon,
  PhoneIcon,
  SendIcon,
  UserIcon,
  VillaIcon,
} from "@/components/landing/icons";

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
  { value: "country", label: "خارج از شهر" },
  { value: "none", label: "بدون ترجیح" },
];

const FORM_STEP_COUNT = 4;

const FORM_STEPS = [
  {
    id: "basic",
    label: "اطلاعات شما",
    title: "اطلاعات اولیه",
    subtitle: "نام و شماره تماس خود را وارد کنید — بدون نیاز به ثبت‌نام",
  },
  {
    id: "event",
    label: "جزئیات مراسم",
    title: "اطلاعات مراسم",
    subtitle: "تاریخ، نوع مراسم و بودجه تقریبی خود را مشخص کنید",
  },
  {
    id: "services",
    label: "خدمات مورد نیاز",
    title: "موارد مورد نیاز",
    subtitle: "خدماتی که نیاز دارید را انتخاب کنید تا مراحل بعدی برایتان نمایش داده شود",
  },
  {
    id: "dream",
    label: "رویای شما",
    title: "رویای عروسی شما",
    subtitle: "در چند جمله از عروسی ایده‌آل‌تان بگویید",
  },
] as const;

const CONFIRM_LABEL = "تأیید و پرداخت";

const CHECKLIST_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  talar: VillaIcon,
  ateliye: CameraIcon,
  mezon: MakeupIcon,
  car: CalendarIcon,
  nail: HeartIcon,
  cookery: CateringIcon,
  band: MusicIcon,
  card: MailIcon,
};

const CONTACT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  phone: PhoneIcon,
  whatsapp: SendIcon,
  telegram: SendIcon,
  email: MailIcon,
};

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

function formatPrice(amount: number) {
  return amount.toLocaleString("fa-IR") + " تومان";
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-[11px] font-semibold text-lp-muted">
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
      className={`w-full rounded-xl border bg-lp-bg/60 px-4 py-3 text-sm text-lp-text outline-none shadow-sm transition-all placeholder:text-lp-muted/40 focus:border-lp-gold focus:shadow-md focus:shadow-lp-gold/10 focus:ring-2 focus:ring-lp-gold/25 ${
        error ? "border-red-400/60" : "border-lp-border"
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
      className={`w-full rounded-xl border bg-lp-bg/60 px-4 py-3 text-sm text-lp-text outline-none shadow-sm transition-all placeholder:text-lp-muted/40 focus:border-lp-gold focus:shadow-md focus:shadow-lp-gold/10 focus:ring-2 focus:ring-lp-gold/25 resize-none ${
        error ? "border-red-400/60" : "border-lp-border"
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
        className={`flex w-full items-center justify-between rounded-xl border bg-lp-bg/60 px-4 py-3 text-sm shadow-sm transition-all ${
          error ? "border-red-400/60" : "border-lp-border"
        } ${open ? "border-lp-gold shadow-md shadow-lp-gold/10 ring-2 ring-lp-gold/25" : "hover:border-lp-border-strong"}`}>
        <span className={value ? "text-lp-text" : "text-lp-muted/40"}>
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
          className={`shrink-0 text-lp-muted transition-transform ${open ? "rotate-180" : ""}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-1 w-full rounded-xl border border-lp-border bg-lp-surface-strong p-1 shadow-xl backdrop-blur-xl">
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
                  ? "bg-lp-gold-soft font-medium text-lp-gold"
                  : "text-lp-text hover:bg-lp-gold-soft/60"
              }`}>
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                  opt.value === value
                    ? "border-lp-gold bg-lp-gold"
                    : "border-lp-border-strong"
                }`}>
                {opt.value === value && <CheckIcon className="text-white" />}
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

const JALALI_MONTHS = [
  { value: "1", label: "فروردین" },
  { value: "2", label: "اردیبهشت" },
  { value: "3", label: "خرداد" },
  { value: "4", label: "تیر" },
  { value: "5", label: "مرداد" },
  { value: "6", label: "شهریور" },
  { value: "7", label: "مهر" },
  { value: "8", label: "آبان" },
  { value: "9", label: "آذر" },
  { value: "10", label: "دی" },
  { value: "11", label: "بهمن" },
  { value: "12", label: "اسفند" },
];

const JALALI_DAYS = Array.from({ length: 31 }, (_, i) => ({
  value: String(i + 1).padStart(2, "0"),
  label: String(i + 1),
}));

function JalaliDatePicker({
  month,
  day,
  onMonthChange,
  onDayChange,
  disabled,
}: {
  month: string;
  day: string;
  onMonthChange: (v: string) => void;
  onDayChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-2 gap-2 ${disabled ? "pointer-events-none opacity-40" : ""}`}>
      <CustomSelect
        value={month}
        onChange={onMonthChange}
        options={JALALI_MONTHS}
        placeholder="ماه"
      />
      <CustomSelect
        value={day}
        onChange={onDayChange}
        options={JALALI_DAYS}
        placeholder="روز"
      />
    </div>
  );
}

function CustomCheckbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="group flex w-full items-center gap-3 rounded-xl border border-lp-border bg-lp-surface/50 p-4 text-right transition-all hover:border-lp-border-strong hover:bg-lp-gold-soft">
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
          checked
            ? "lp-gold-gradient border-transparent text-lp-on-gold"
            : "border-lp-border-strong text-transparent group-hover:border-lp-gold/50"
        }`}>
        {checked && <CheckIcon />}
      </span>
      <span
        className={`text-sm transition-all ${
          checked ? "font-medium text-lp-gold" : "text-lp-muted"
        }`}>
        {children}
      </span>
    </button>
  );
}

function OptionTile({
  selected,
  onClick,
  icon,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl border p-4 text-right transition-all ${
        selected
          ? "border-lp-gold bg-lp-gold/10"
          : "border-lp-border bg-lp-surface/50 hover:border-lp-border-strong hover:bg-lp-gold-soft"
      }`}>
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all ${
          selected ? "lp-gold-gradient text-lp-on-gold" : "bg-lp-gold-soft text-lp-gold/70"
        }`}>
        {icon}
      </div>
      <div className="flex-1">
        <p
          className={`text-sm font-medium transition-all ${
            selected ? "text-lp-gold" : "text-lp-text"
          }`}>
          {label}
        </p>
      </div>
      <div
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
          selected ? "border-lp-gold bg-lp-gold text-lp-on-gold" : "border-lp-border-strong text-transparent"
        }`}>
        {selected && <CheckIcon />}
      </div>
    </button>
  );
}

function ChipButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-2.5 text-sm transition-all ${
        active
          ? "border-lp-gold bg-lp-gold-soft font-medium text-lp-gold"
          : "border-lp-border text-lp-muted hover:border-lp-border-strong"
      }`}>
      {children}
    </button>
  );
}

function WizardProgress({
  current,
  total,
  phaseLabel,
}: {
  current: number;
  total: number;
  phaseLabel: string;
}) {
  const pct = total <= 1 ? 100 : (current / (total - 1)) * 100;
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-[11px] font-semibold tracking-[0.15em] text-lp-gold uppercase">
          Shabash
        </span>
        <span className="text-xs text-lp-muted">
          مرحله {current + 1} از {total}
        </span>
      </div>
      <div className="relative h-1.5 overflow-hidden rounded-full bg-lp-border">
        <motion.div
          className="lp-gold-gradient absolute inset-y-0 right-0 rounded-full"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      </div>
      <p className="mt-3 text-center text-sm font-medium text-lp-muted">
        {phaseLabel}
      </p>
    </div>
  );
}

export default function RequestPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    groomName: "",
    brideName: "",
    phone: "",
    contactMethod: "phone",
    referralSource: "",
    weddingMonth: "",
    weddingDay: "",
    leaveToShabashchi: false,
    weddingType: "",
    budget: "",
    guestCount: "",
    dreamWedding: "",
    checkedItems: ["talar", "ateliye", "mezon", "car", "nail", "cookery"],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consented, setConsented] = useState(false);
  const [talarMode, setTalarMode] = useState<"shabashchi" | "choose" | null>(null);
  const [selectedTalar, setSelectedTalar] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sessionPhone, setSessionPhone] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/auth/session", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const phone = data?.user?.phone;
        if (cancelled || typeof phone !== "string" || !phone) return;
        setSessionPhone(phone);
        setFormData((prev) => ({ ...prev, phone }));
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const serviceIds = formData.checkedItems;
  const confirmStep = FORM_STEP_COUNT + serviceIds.length;
  const totalSteps = confirmStep + 1;
  const safeStep = Math.min(step, totalSteps - 1);

  function stepMeta(index: number) {
    if (index < FORM_STEP_COUNT) {
      const s = FORM_STEPS[index];
      return { label: s.label, title: s.title, subtitle: s.subtitle };
    }
    if (index < confirmStep) {
      const id = serviceIds[index - FORM_STEP_COUNT];
      const item = CHECKLIST_ITEMS.find((i) => i.id === id);
      return {
        label: item?.label ?? "",
        title: item?.label ?? "",
        subtitle: "جزئیات این خدمت را مشخص کنید",
      };
    }
    return {
      label: CONFIRM_LABEL,
      title: "تأیید و پرداخت",
      subtitle: "قوانین را مطالعه کرده و درخواست خود را نهایی کنید",
    };
  }

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

  function validateStep(s: number): boolean {
    const e: Record<string, string> = {};

    if (s === 0) {
      if (!formData.groomName.trim()) e.groomName = "نام داماد الزامی است";
      if (!formData.brideName.trim()) e.brideName = "نام عروس الزامی است";
      if (
        !sessionPhone &&
        !isValidIranPhone(normalizeIranPhone(formData.phone))
      ) {
        e.phone = "شماره موبایل معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹)";
      }
      if (!formData.contactMethod) e.contactMethod = "روش تماس را انتخاب کنید";
    }

    if (s === 1) {
      if (!formData.weddingType) e.weddingType = "نوع عروسی را انتخاب کنید";
      if (!formData.budget) e.budget = "بودجه مورد نظر را وارد کنید";
      if (!formData.leaveToShabashchi && !(formData.weddingMonth && formData.weddingDay))
        e.weddingDate = "تاریخ عروسی را وارد کنید";
    }

    if (s === 2) {
      if (formData.checkedItems.length === 0)
        e.checkedItems = "حداقل یک خدمت انتخاب کنید";
    }

    if (s >= FORM_STEP_COUNT && s < confirmStep) {
      const id = serviceIds[s - FORM_STEP_COUNT];
      if (id === "talar") {
        const hasTalarChoice =
          talarMode === "shabashchi" || (talarMode === "choose" && selectedTalar);
        if (!hasTalarChoice) e.talar = "یکی از گزینه‌ها را انتخاب کنید";
      }
    }

    if (s === confirmStep && !consented) {
      e.consent = "برای ادامه باید قوانین را بپذیرید";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function goNext() {
    if (!validateStep(safeStep)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setStep((s) => Math.min(s + 1, totalSteps - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goPrev() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleFinish() {
    if (submitting || !validateStep(confirmStep)) return;

    const venue =
      talarMode === "choose" && selectedTalar
        ? (TALAR_LIST.find((talar) => talar.id === selectedTalar)?.name ?? null)
        : talarMode === "shabashchi"
          ? "به انتخاب شاباشچی"
          : null;

    setSubmitting(true);
    try {
      const result = await submitWeddingRequest({
        groomName: formData.groomName,
        brideName: formData.brideName,
        phone: formData.phone,
        weddingMonth: formData.weddingMonth,
        weddingDay: formData.weddingDay,
        leaveToShabashchi: formData.leaveToShabashchi,
        budget: formData.budget,
        guestCount: formData.guestCount,
        style:
          WEDDING_TYPES.find((t) => t.value === formData.weddingType)?.label ??
          null,
        venue,
        notes: formData.dreamWedding,
        checkedItems: formData.checkedItems,
      });

      if (!result.ok) {
        toast.error(
          result.error ?? "ثبت درخواست ناموفق بود؛ لطفاً دوباره تلاش کنید.",
        );
        return;
      }

      toast.success(
        "درخواست شما با موفقیت ثبت شد؛ از بخش «درخواست‌ها» در داشبورد قابل پیگیری است.",
      );
      setStep(0);
      setConsented(false);
      setTalarMode(null);
      setSelectedTalar("");
      setErrors({});
    } catch {
      toast.error("ارتباط با سرور برقرار نشد؛ لطفاً دوباره تلاش کنید.");
    } finally {
      setSubmitting(false);
    }
  }

  const meta = stepMeta(safeStep);
  const isConfirm = safeStep === confirmStep;
  const isLast = safeStep === totalSteps - 1;

  function renderStepContent() {
    if (safeStep === 0) {
      return (
        <div className="lp-glass space-y-4 rounded-2xl border border-lp-border p-5 sm:p-6">
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
              readOnly={Boolean(sessionPhone)}
              error={errors.phone}
            />
            {sessionPhone && (
              <p className="mt-1.5 text-[11px] leading-relaxed text-lp-muted">
                شماره حساب شما به‌صورت خودکار در این درخواست استفاده می‌شود.
              </p>
            )}
            {errors.phone && <ErrorMsg>{errors.phone}</ErrorMsg>}
          </div>
          <div>
            <Label>روش ترجیحی تماس</Label>
            <div className="grid grid-cols-2 gap-3">
              {CONTACT_METHODS.map((m) => {
                const Icon = CONTACT_ICONS[m.value] ?? PhoneIcon;
                return (
                  <OptionTile
                    key={m.value}
                    selected={formData.contactMethod === m.value}
                    onClick={() => update("contactMethod", m.value)}
                    icon={<Icon className="h-5 w-5" />}
                    label={m.label}
                  />
                );
              })}
            </div>
            {errors.contactMethod && <ErrorMsg>{errors.contactMethod}</ErrorMsg>}
          </div>
        </div>
      );
    }

    if (safeStep === 1) {
      return (
        <div className="lp-glass space-y-5 rounded-2xl border border-lp-border p-5 sm:p-6">
          <div>
            <Label>تاریخ عروسی</Label>
            <JalaliDatePicker
              month={formData.weddingMonth}
              day={formData.weddingDay}
              onMonthChange={(v) => update("weddingMonth", v)}
              onDayChange={(v) => update("weddingDay", v)}
              disabled={formData.leaveToShabashchi}
            />
            {errors.weddingDate && <ErrorMsg>{errors.weddingDate}</ErrorMsg>}
            <div className="mt-3">
              <CustomCheckbox
                checked={formData.leaveToShabashchi}
                onChange={(v) => update("leaveToShabashchi", v)}>
                هنوز تصمیم نگرفته ایم
              </CustomCheckbox>
            </div>
          </div>
          <div>
            <Label>نوع مراسم</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {WEDDING_TYPES.map((t) => (
                <ChipButton
                  key={t.value}
                  active={formData.weddingType === t.value}
                  onClick={() => update("weddingType", t.value)}>
                  {t.label}
                </ChipButton>
              ))}
            </div>
            {errors.weddingType && <ErrorMsg>{errors.weddingType}</ErrorMsg>}
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
              <span className="absolute end-3 top-1/2 -translate-y-1/2 text-sm text-lp-muted select-none">
                تومان
              </span>
            </div>
            {errors.budget && <ErrorMsg>{errors.budget}</ErrorMsg>}
          </div>
          <div>
            <Label>تعداد مهمانان</Label>
            <div className="relative">
              <Input
                type="text"
                inputMode="numeric"
                value={formData.guestCount}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  update("guestCount", raw);
                }}
                placeholder="مثلاً: ۲۰۰"
                className="pe-12"
              />
              <UserIcon className="absolute end-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-lp-muted select-none" />
            </div>
          </div>
          <div>
            <Label>از کجا با ما آشنا شدید؟ (اختیاری)</Label>
            <CustomSelect
              value={formData.referralSource}
              onChange={(v) => update("referralSource", v)}
              options={REFERRAL_SOURCES}
              placeholder="انتخاب کنید..."
            />
          </div>
        </div>
      );
    }

    if (safeStep === 2) {
      return (
        <div className="lp-glass space-y-4 rounded-2xl border border-lp-border p-5 sm:p-6">
          <p className="text-xs text-lp-muted">
            مواردی که نیاز دارید را انتخاب کنید تا به عنوان مراحل برنامه به شما
            نمایش داده شوند
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {CHECKLIST_ITEMS.map((item) => {
              const Icon = CHECKLIST_ICONS[item.id] ?? HeartIcon;
              return (
                <OptionTile
                  key={item.id}
                  selected={formData.checkedItems.includes(item.id)}
                  onClick={() => toggleCheck(item.id)}
                  icon={<Icon className="h-5 w-5" />}
                  label={item.label}
                />
              );
            })}
          </div>
          {errors.checkedItems && <ErrorMsg>{errors.checkedItems}</ErrorMsg>}
        </div>
      );
    }

    if (safeStep === 3) {
      return (
        <div className="lp-glass rounded-2xl border border-lp-border p-5 sm:p-6">
          <Label>در چند جمله از عروسی رویایی خود بگویید</Label>
          <Textarea
            value={formData.dreamWedding}
            onChange={(e) => update("dreamWedding", e.target.value)}
            placeholder='مثلاً: "ما یک گروه موسیقی زنده سنتی می‌خواهیم" یا "عروس به گل‌آرایی خاصی علاقه دارد"'
            rows={5}
          />
        </div>
      );
    }

    if (isConfirm) {
      const totalPrice = serviceIds.reduce(
        (sum, id) => sum + (PRICE_MAP[id] || 0),
        0,
      );
      const halfPrice = Math.round(totalPrice / 2);

      return (
        <div className="lp-glass space-y-6 rounded-2xl border border-lp-border p-5 sm:p-6">
          <div>
            <h2 className="text-base font-semibold text-lp-text">
              قرارداد خدمات مراسم
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-lp-muted">
              این قرارداد فی‌مابین کارفرما (داماد و عروس) و برنامه‌ریز مراسم
              «شاباش» منعقد می‌گردد.
            </p>
          </div>

          <div className="max-h-72 space-y-4 overflow-y-auto rounded-xl border border-lp-border bg-lp-gold-soft/40 p-4 text-[13px] leading-loose text-lp-muted">
            <p>
              <span className="font-semibold text-lp-text">ماده ۱ — موضوع
              قرارداد:</span>{" "}
              شاباش متعهد می‌شود خدمات برنامه‌ریزی، هماهنگی و اجرای مراسم عروسی
              شامل رزرو تالار، آتلیه، میکاپ، ماشین، دکوراسیون و سایر موارد انتخابی
              کارفرما را طبق جزئیات این درخواست و توافق طرفین ارائه نماید.
            </p>
            <p>
              <span className="font-semibold text-lp-text">ماده ۲ — تعهدات
              شاباش:</span>{" "}
              شاباش موظف است پیش از مراسم، زمان‌بندی دقیق خدمات، معرفی
              تامین‌کنندگان مورد تأیید و نظارت بر اجرای صحیح تعهدات را بر عهده
              بگیرد و در صورت بروز مشکل از سوی تامین‌کنندگان، پیگیری و رفع مشکل
              را انجام دهد.
            </p>
            <p>
              <span className="font-semibold text-lp-text">ماده ۳ — تعهدات
              کارفرما:</span>{" "}
              کارفرما موظف است اطلاعات صحیح و کامل در اختیار شاباش قرار دهد،
              مبلغ قرارداد را در موعد مقرر پرداخت نماید و هرگونه تغییر در جزئیات
              مراسم (تاریخ، تعداد مهمان، خدمات) را حداقل ۴۸ ساعت قبل اطلاع دهد.
            </p>
            <p>
              <span className="font-semibold text-lp-text">ماده ۴ — مبلغ و شیوه
              پرداخت:</span>{" "}
              مبلغ کل قرارداد {formatPrice(totalPrice)} تعیین می‌گردد که
              به دو قسط پرداخت می‌شود: نصف مبلغ به عنوان پیش‌پرداخت هنگام ثبت
              نهایی و نصف باقی‌مانده حداکثر تا یک شب پیش از برگزاری مراسم.
            </p>
            <p>
              <span className="font-semibold text-lp-text">ماده ۵ — استرداد
              وجه:</span>{" "}
              در صورت انصراف کارفرما پیش از برگزاری مراسم، مبلغ پیش‌پرداخت به
              دلیل رزرو و تعهدات انجام‌شده غیرقابل استرداد است. تغییرات کوچک در
              خدمات با توافق طرفین و بدون جریمه امکان‌پذیر است.
            </p>
            <p>
              <span className="font-semibold text-lp-text">ماده ۶ — محرمانگی:</span>{" "}
              کلیه اطلاعات شخصی، تصاویر و جزئیات مراسم کارفرما محرمانه بوده و
              صرفاً جهت اجرای قرارداد استفاده می‌شود؛ مگر با کسب اجازه کتبی از
              کارفرما.
            </p>
            <p>
              <span className="font-semibold text-lp-text">ماده ۷ — فورس
              ماجور:</span>{" "}
              در صورت وقوع حوادث غیرمترقبه (بلایای طبیعی، ممنوعیت قانونی برگزاری
              مراسم و موارد مشابه)، طرفین متعهد به همکاری جهت تعویق یا جایگزینی
              خدمات در اولین فرصت ممکن هستند.
            </p>
            <p>
              <span className="font-semibold text-lp-text">ماده ۸ — حاکمیت
              قانونی:</span>{" "}
              این قرارداد تابع قوانین جمهوری اسلامی ایران است و در صورت بروز
              اختلاف، مراجع قضایی صالح شهر بجنورد رسیدگی خواهند کرد.
            </p>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-lp-gold/30 bg-lp-gold-soft/60 p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 shrink-0 text-lp-gold">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <p className="text-[13px] leading-relaxed text-lp-text">
              نسخه کاغذی این قرارداد برای امضا به آدرس شما ارسال خواهد شد.
            </p>
          </div>

          <CustomCheckbox
            checked={consented}
            onChange={(v) => {
              setConsented(v);
              if (errors.consent) setErrors({});
            }}>
            قرارداد و شرایط را مطالعه کردم و موافقم
          </CustomCheckbox>
          {errors.consent && <ErrorMsg>{errors.consent}</ErrorMsg>}

          <div className="space-y-4 rounded-xl border border-lp-border bg-lp-surface/50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-lp-text">
                مبلغ کل قرارداد
              </span>
              <span className="text-lg font-bold text-lp-gold">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-lp-border bg-lp-bg/40 p-3 text-center">
                <p className="text-[11px] text-lp-muted">الان (پیش‌پرداخت)</p>
                <p className="mt-1 text-sm font-bold text-lp-text">
                  {formatPrice(halfPrice)}
                </p>
              </div>
              <div className="rounded-lg border border-lp-border bg-lp-bg/40 p-3 text-center">
                <p className="text-[11px] text-lp-muted">تا شب عروسی</p>
                <p className="mt-1 text-sm font-bold text-lp-text">
                  {formatPrice(totalPrice - halfPrice)}
                </p>
              </div>
            </div>

            <div className="lp-gold-gradient rounded-xl p-4 text-center">
              <p className="text-[11px] font-medium text-lp-on-gold/80">
                مبلغ قابل پرداخت هم‌اکنون
              </p>
              <p className="mt-1 text-xl font-extrabold text-lp-on-gold">
                {formatPrice(halfPrice)}
              </p>
            </div>
          </div>
        </div>
      );
    }

    const currentServiceId = serviceIds[safeStep - FORM_STEP_COUNT];

    if (currentServiceId === "talar") {
      return (
        <div className="lp-glass space-y-5 rounded-2xl border border-lp-border p-5 sm:p-6">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setTalarMode("shabashchi");
                setSelectedTalar("");
                if (errors.talar) setErrors({});
              }}
              className={`flex-1 rounded-xl border py-3 text-sm font-medium transition-all ${
                talarMode === "shabashchi"
                  ? "border-lp-gold bg-lp-gold-soft text-lp-gold"
                  : "border-lp-border text-lp-muted hover:border-lp-border-strong"
              }`}>
              به شاباشچی می‌سپارم
            </button>
            <button
              type="button"
              onClick={() => {
                setTalarMode("choose");
                if (errors.talar) setErrors({});
              }}
              className={`flex-1 rounded-xl border py-3 text-sm font-medium transition-all ${
                talarMode === "choose"
                  ? "border-lp-gold bg-lp-gold-soft text-lp-gold"
                  : "border-lp-border text-lp-muted hover:border-lp-border-strong"
              }`}>
              انتخاب تالار
            </button>
          </div>
          {errors.talar && <ErrorMsg>{errors.talar}</ErrorMsg>}

          {talarMode === "shabashchi" && (
            <div className="rounded-xl bg-lp-gold-soft/50 p-8 text-center">
              <CheckCircleIcon className="mx-auto mb-3 h-10 w-10 text-lp-gold" />
              <p className="text-base font-medium text-lp-text">
                با تشکر از اعتماد شما
              </p>
              <p className="mt-2 text-sm text-lp-muted">
                شاباشچی با توجه به اطلاعات شما بهترین تالار را انتخاب خواهد کرد
              </p>
            </div>
          )}

          {talarMode === "choose" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {TALAR_LIST.map((talar) => (
                <button
                  key={talar.id}
                  type="button"
                  onClick={() => {
                    setSelectedTalar(talar.id);
                    if (errors.talar) setErrors({});
                  }}
                  className={`group overflow-hidden rounded-xl border text-right transition-all ${
                    selectedTalar === talar.id
                      ? "border-lp-gold ring-2 ring-lp-gold/30"
                      : "border-lp-border hover:border-lp-border-strong"
                  }`}>
                  <div
                    className={`flex h-32 items-center justify-center ${talar.image}`}>
                    <VillaIcon className="h-9 w-9 text-white opacity-60" />
                  </div>
                  <div className="space-y-1.5 p-4">
                    <p className="text-sm font-semibold text-lp-text">
                      {talar.name}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-lp-muted">
                      <span>
                        ظرفیت: {talar.capacity.toLocaleString("fa-IR")} نفر
                      </span>
                      <span>•</span>
                      <span>{talar.category}</span>
                    </div>
                    <p className="text-xs text-lp-muted">
                      {talar.providesFood ? "غذا ارائه می‌شود" : "غذا ارائه نمی‌شود"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!talarMode && (
            <div className="rounded-xl border border-dashed border-lp-border p-8 text-center">
              <p className="text-sm text-lp-muted">
                لطفاً یکی از گزینه‌های بالا را انتخاب کنید
              </p>
            </div>
          )}
        </div>
      );
    }

    const Icon = CHECKLIST_ICONS[currentServiceId] ?? HeartIcon;
    return (
      <div className="lp-glass rounded-2xl border border-lp-border p-8 text-center">
        <div className="lp-gold-gradient mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl text-lp-on-gold">
          <Icon className="h-6 w-6" />
        </div>
        <p className="text-base font-medium text-lp-text">{meta.title}</p>
        <p className="mt-1 text-sm text-lp-muted">
          جزئیات این خدمت در تماس کارشناس شاباش با شما تکمیل می‌شود
        </p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-8 sm:px-6 lg:px-12">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 rounded-full border border-lp-border bg-lp-surface px-4 py-2 text-xs font-medium text-lp-muted backdrop-blur-md transition-all hover:border-lp-gold/50 hover:text-lp-gold">
        <ArrowLeftIcon className="h-3.5 w-3.5" />
        بازگشت به صفحه اصلی
      </Link>

      <WizardProgress
        current={safeStep}
        total={totalSteps}
        phaseLabel={meta.title}
      />

      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-lp-text">{meta.title}</h1>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-lp-muted">
          {meta.subtitle}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={safeStep}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: "easeOut" }}>
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex gap-3">
        {safeStep > 0 && (
          <button
            type="button"
            onClick={goPrev}
            className="flex-1 rounded-xl border border-lp-border bg-lp-surface py-3 text-sm font-medium text-lp-text backdrop-blur-md transition-all hover:border-lp-gold/50 hover:text-lp-gold active:scale-[0.98]">
            مرحله قبل
          </button>
        )}
        {!isLast ? (
          <button
            type="button"
            onClick={goNext}
            className="lp-gold-gradient flex-1 rounded-xl py-3 text-sm font-bold text-lp-on-gold transition-all hover:brightness-110 active:scale-[0.98]">
            {safeStep === 3 ? "انتخاب خدمات" : "مرحله بعد"}
            <CalendarEditIcon className="mr-2 inline h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFinish}
            disabled={submitting}
            className="lp-gold-gradient flex-1 rounded-xl py-3 text-sm font-bold text-lp-on-gold transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70">
            {submitting ? "در حال ثبت درخواست..." : "پرداخت"}
            <CalendarIcon className="mr-2 inline h-4 w-4" />
          </button>
        )}
      </div>

      {safeStep === 3 && (
        <p className="mt-3 text-center text-xs text-lp-muted">
          این مرحله اختیاری است؛ می‌توانید مستقیم به خدمات بروید
        </p>
      )}
    </main>
  );
}
