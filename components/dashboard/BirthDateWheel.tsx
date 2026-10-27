"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  JALALI_MONTHS,
  currentJalaliYear,
  daysInJalaliMonth,
  parseJalaliDateString,
  toJalaliDateString,
} from "@/lib/jalali";
import { toFaDigits } from "@/lib/format";

const ITEM_H = 40;
const WHEEL_H = 160;
const PAD = (WHEEL_H - ITEM_H) / 2;

function Wheel({
  labels,
  selectedIndex,
  onChange,
  ariaLabel,
}: {
  labels: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const settleRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const target = selectedIndex * ITEM_H;
    if (Math.abs(el.scrollTop - target) > 1) {
      el.scrollTo({ top: target, behavior: "smooth" });
    }
  }, [selectedIndex]);

  useEffect(() => () => clearTimeout(settleRef.current), []);

  function handleScroll() {
    clearTimeout(settleRef.current);
    settleRef.current = setTimeout(() => {
      const el = ref.current;
      if (!el) return;
      const max = labels.length - 1;
      const idx = Math.min(max, Math.max(0, Math.round(el.scrollTop / ITEM_H)));
      if (idx !== selectedIndex) onChange(idx);
    }, 120);
  }

  function step(delta: number) {
    const next = Math.min(
      labels.length - 1,
      Math.max(0, selectedIndex + delta)
    );
    if (next !== selectedIndex) onChange(next);
  }

  const btnClass =
    "flex h-6 w-6 items-center justify-center rounded-lg text-foreground/50 transition-colors hover:bg-primary/10 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:pointer-events-none disabled:opacity-30";

  return (
    <div className="flex w-full flex-col items-center gap-1">
      <button
        type="button"
        onClick={() => step(-1)}
        disabled={selectedIndex <= 0}
        aria-label={`${ariaLabel} قبلی`}
        className={btnClass}>
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
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
      <div className="relative w-full" style={{ height: WHEEL_H }}>
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-10 -translate-y-1/2 rounded-xl border border-primary/20 bg-primary/[0.06]" />
        <div
          ref={ref}
          onScroll={handleScroll}
          role="listbox"
          aria-label={ariaLabel}
          className="lp-no-scrollbar h-full snap-y snap-mandatory overscroll-contain overflow-y-scroll"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
          }}
        >
          <div style={{ height: PAD }} />
          {labels.map((label, i) => (
            <div
              key={i}
              role="option"
              aria-selected={i === selectedIndex}
              style={{ height: ITEM_H }}
              className={`flex snap-center items-center justify-center text-sm transition-colors ${
                i === selectedIndex
                  ? "font-bold text-primary"
                  : "text-foreground/40"
              }`}
            >
              {label}
            </div>
          ))}
          <div style={{ height: PAD }} />
        </div>
      </div>
      <button
        type="button"
        onClick={() => step(1)}
        disabled={selectedIndex >= labels.length - 1}
        aria-label={`${ariaLabel} بعدی`}
        className={btnClass}>
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
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}

export default function BirthDateWheel({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const parsed = parseJalaliDateString(value);
  const maxYear = currentJalaliYear();
  const minYear = maxYear - 100;
  const years = useMemo(
    () =>
      Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i),
    [minYear, maxYear]
  );

  const jy = parsed?.jy ?? 1360;
  const jm = parsed?.jm ?? 1;
  const jd = parsed?.jd ?? 1;
  const monthLen = daysInJalaliMonth(jy, jm);
  const safeDay = Math.min(jd, monthLen);

  const yearIdx = Math.max(0, years.indexOf(jy));
  const monthIdx = jm - 1;
  const dayIdx = safeDay - 1;

  const dayLabels = Array.from({ length: monthLen }, (_, i) =>
    toFaDigits(String(i + 1).padStart(2, "0"))
  );

  function commit(nextY: number, nextM: number, nextD: number) {
    const len = daysInJalaliMonth(nextY, nextM);
    const d = Math.min(Math.max(1, nextD), len);
    onChange(toJalaliDateString(nextY, nextM, d));
  }

  return (
    <div className="flex gap-1 px-1">
      <div className="flex-1">
        <Wheel
          ariaLabel="سال تولد"
          labels={years.map((y) => toFaDigits(y))}
          selectedIndex={yearIdx}
          onChange={(i) => commit(years[i], jm, safeDay)}
        />
      </div>
      <div className="flex-1">
        <Wheel
          ariaLabel="ماه تولد"
          labels={JALALI_MONTHS}
          selectedIndex={monthIdx}
          onChange={(i) => commit(jy, i + 1, safeDay)}
        />
      </div>
      <div className="flex-1">
        <Wheel
          ariaLabel="روز تولد"
          labels={dayLabels}
          selectedIndex={dayIdx}
          onChange={(i) => commit(jy, jm, i + 1)}
        />
      </div>
    </div>
  );
}
