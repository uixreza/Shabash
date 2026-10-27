export function formatPrice(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function toFaDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

export function normalizeIranPhone(value: string): string {
  const digits = value
    .replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .replace(/\D/g, "");

  // Accept +98 / 0098 / 98 / 9… (missing leading zero) formats too.
  if (digits.startsWith("0098")) return ("0" + digits.slice(4)).slice(0, 11);
  if (digits.startsWith("98") && digits.length >= 12)
    return ("0" + digits.slice(2)).slice(0, 11);
  if (digits.startsWith("9") && digits.length === 10)
    return ("0" + digits).slice(0, 11);
  return digits.slice(0, 11);
}

export function isValidIranPhone(value: string): boolean {
  return /^09\d{9}$/.test(value);
}