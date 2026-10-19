import {
  isValidJalaaliDate,
  jalaaliMonthLength,
  toJalaali,
} from "jalaali-js";

export const JALALI_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export function daysInJalaliMonth(jy: number, jm: number): number {
  return jalaaliMonthLength(jy, jm);
}

export function currentJalaliYear(): number {
  return toJalaali(new Date()).jy;
}

export function isValidJalaliDateString(value: string): boolean {
  const match = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/.exec(value);
  if (!match) return false;
  return isValidJalaaliDate(Number(match[1]), Number(match[2]), Number(match[3]));
}

export function toJalaliDateString(jy: number, jm: number, jd: number): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${jy}/${pad(jm)}/${pad(jd)}`;
}

export function parseJalaliDateString(
  value: string
): { jy: number; jm: number; jd: number } | null {
  if (!isValidJalaliDateString(value)) return null;
  const [jy, jm, jd] = value.split("/").map(Number);
  return { jy, jm, jd };
}
