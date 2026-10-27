"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { jalaaliMonthLength, toGregorian, toJalaali } from "jalaali-js";
import { authOptions } from "@/lib/auth";
import { prisma, withDbRetry } from "@/lib/db";
import { CHECKLIST_ITEMS, PRICE_MAP } from "@/data/requests";
import { isValidIranPhone, normalizeIranPhone, toFaDigits } from "@/lib/format";
import { isValidJalaliDateString, toJalaliDateString } from "@/lib/jalali";
import type { Prisma } from "@/lib/generated/prisma/client";

const OTP_TTL_MINUTES = 3;

export async function requestOtp(
  rawPhone: string
): Promise<{ ok: boolean; error?: string; devCode?: string }> {
  const phone = normalizeIranPhone(rawPhone);
  if (!isValidIranPhone(phone)) {
    return { ok: false, error: "شماره موبایل معتبر نیست" };
  }

  const code = String(Math.floor(10000 + Math.random() * 90000));
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

  try {
    await withDbRetry(() =>
      prisma.verificationCode.deleteMany({ where: { phone } })
    );
    await withDbRetry(() =>
      prisma.verificationCode.create({ data: { phone, code, expiresAt } })
    );
  } catch (error) {
    console.error("[شاباشچی] خطا در ایجاد کد تأیید:", error);
    return {
      ok: false,
      error: "ارتباط با سرور برقرار نشد؛ لطفاً دوباره تلاش کنید",
    };
  }

  console.log(`[شاباشچی] کد تأیید برای ${phone}: ${code}`);

  return {
    ok: true,
    ...(process.env.NODE_ENV !== "production" ? { devCode: code } : {}),
  };
}

export async function updateAccount(input: {
  name: string;
  nationalId: string;
  dateOfBirth: string;
}): Promise<{ ok: boolean; error?: string }> {
  const session = await getServerSession(authOptions);
  const phone = session?.user?.phone;
  if (!phone) {
    return { ok: false, error: "ابتدا وارد حساب خود شوید" };
  }

  const name = input.name.trim();
  const nationalId = input.nationalId.replace(/\D/g, "");
  const dateOfBirth = input.dateOfBirth.trim();

  if (name.length > 100) {
    return { ok: false, error: "نام باید حداکثر ۱۰۰ کاراکتر باشد" };
  }
  if (nationalId && nationalId.length !== 10) {
    return { ok: false, error: "کد ملی باید ۱۰ رقم باشد" };
  }
  if (dateOfBirth && !isValidJalaliDateString(dateOfBirth)) {
    return { ok: false, error: "تاریخ تولد معتبر نیست" };
  }

  const data = {
    name: name || null,
    nationalId: nationalId || null,
    dateOfBirth: dateOfBirth || null,
  };

  try {
    await withDbRetry(() =>
      prisma.user.upsert({
        where: { phone },
        update: data,
        create: { phone, ...data },
      })
    );
  } catch (error) {
    console.error("[شاباشچی] خطا در ذخیره اطلاعات حساب:", error);
    return {
      ok: false,
      error: "ارتباط با سرور برقرار نشد؛ لطفاً دوباره تلاش کنید",
    };
  }

  revalidatePath("/dashboard/account");
  return { ok: true };
}

export async function getUserLocation(): Promise<{
  state: string | null;
  city: string | null;
}> {
  const session = await getServerSession(authOptions);
  const phone = session?.user?.phone;
  if (!phone) return { state: null, city: null };

  try {
    const user = await withDbRetry(() =>
      prisma.user.findUnique({
        where: { phone },
        select: { state: true, city: true },
      })
    );
    return { state: user?.state ?? null, city: user?.city ?? null };
  } catch (error) {
    console.error("[شاباشچی] خطا در دریافت شهر کاربر:", error);
    return { state: null, city: null };
  }
}

export async function saveUserLocation(input: {
  state: string;
  city: string;
}): Promise<{ ok: boolean; error?: string }> {
  const session = await getServerSession(authOptions);
  const phone = session?.user?.phone;
  if (!phone) return { ok: false, error: "ابتدا وارد حساب خود شوید" };

  const state = input.state.trim();
  const city = input.city.trim();
  if (!state || !city) {
    return { ok: false, error: "استان و شهر را انتخاب کنید" };
  }
  if (state.length > 50 || city.length > 50) {
    return { ok: false, error: "نام استان یا شهر معتبر نیست" };
  }

  try {
    await withDbRetry(() =>
      prisma.user.upsert({
        where: { phone },
        update: { state, city },
        create: { phone, state, city },
      })
    );
  } catch (error) {
    console.error("[شاباشچی] خطا در ذخیره شهر کاربر:", error);
    return {
      ok: false,
      error: "ارتباط با سرور برقرار نشد؛ لطفاً دوباره تلاش کنید",
    };
  }

  revalidatePath("/dashboard");
  return { ok: true };
}

export type WeddingRequestSubmission = {
  groomName: string;
  brideName: string;
  phone: string;
  weddingMonth?: string;
  weddingDay?: string;
  leaveToShabashchi?: boolean;
  budget?: string;
  guestCount?: string;
  style?: string | null;
  venue?: string | null;
  notes?: string | null;
  checkedItems: string[];
};

function resolveWeddingDate(input: WeddingRequestSubmission): string | null {
  if (input.leaveToShabashchi) return null;

  const jm = Number(input.weddingMonth);
  const jd = Number(input.weddingDay);
  if (!Number.isInteger(jm) || jm < 1 || jm > 12) return null;
  if (!Number.isInteger(jd) || jd < 1) return null;

  const now = new Date();
  const jy = toJalaali(now).jy;
  const dayFor = (year: number) => Math.min(jd, jalaaliMonthLength(year, jm));

  const thisYear = toGregorian(jy, jm, dayFor(jy));
  const passed =
    Date.UTC(thisYear.gy, thisYear.gm - 1, thisYear.gd) <
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const year = passed ? jy + 1 : jy;

  return toJalaliDateString(year, jm, dayFor(year));
}

async function createWeddingRequest(
  data: Omit<Prisma.WeddingRequestUncheckedCreateInput, "id">
) {
  const base = await withDbRetry(() => prisma.weddingRequest.count());

  for (let i = 0; i < 10; i++) {
    const id = `REQ-${String(base + 1 + i).padStart(5, "0")}`;
    try {
      return await withDbRetry(() =>
        prisma.weddingRequest.create({ data: { ...data, id } })
      );
    } catch (error) {
      if ((error as { code?: string }).code !== "P2002") throw error;
    }
  }

  throw new Error("Could not generate a unique request id");
}

export async function submitWeddingRequest(
  input: WeddingRequestSubmission
): Promise<{ ok: boolean; error?: string; id?: string }> {
  const session = await getServerSession(authOptions);
  const sessionPhone = session?.user?.phone ?? null;
  const formPhone = normalizeIranPhone(input.phone ?? "");

  // Logged-in users always own their requests and never need to retype their
  // number; guests fall back to the phone they typed, so the request still
  // shows up after they sign in with that number.
  let phone = sessionPhone;
  if (!phone) {
    if (!isValidIranPhone(formPhone)) {
      const error = "شماره موبایل معتبر نیست";
      console.warn(`[شاباشچی] submitWeddingRequest رد شد: ${error}`);
      return { ok: false, error };
    }
    phone = formPhone;
  }

  const groomName = (input.groomName ?? "").trim();
  const brideName = (input.brideName ?? "").trim();
  if (!groomName || !brideName) {
    const error = "نام داماد و عروس الزامی است";
    console.warn(`[شاباشچی] submitWeddingRequest رد شد: ${error}`);
    return { ok: false, error };
  }
  if (groomName.length > 100 || brideName.length > 100) {
    const error = "نام باید حداکثر ۱۰۰ کاراکتر باشد";
    console.warn(`[شاباشچی] submitWeddingRequest رد شد: ${error}`);
    return { ok: false, error };
  }

  const services = (input.checkedItems ?? [])
    .map((id) => CHECKLIST_ITEMS.find((item) => item.id === id))
    .filter((item): item is (typeof CHECKLIST_ITEMS)[number] => Boolean(item))
    .map((item) => ({ id: item.id, label: item.label, done: false }));
  if (services.length === 0) {
    const error = "حداقل یک خدمت انتخاب کنید";
    console.warn(`[شاباشچی] submitWeddingRequest رد شد: ${error}`);
    return { ok: false, error };
  }

  const budgetRaw = (input.budget ?? "").replace(/\D/g, "");
  const budgetTotal = budgetRaw ? Number(budgetRaw) : null;
  const guestCount = (input.guestCount ?? "").replace(/\D/g, "");
  const notes =
    [
      (input.notes ?? "").trim(),
      guestCount ? `تعداد مهمانان: ${toFaDigits(guestCount)}` : "",
    ]
      .filter(Boolean)
      .join("\n\n") || null;

  try {
    const request = await createWeddingRequest({
      groomName,
      brideName,
      phone,
      weddingDate: resolveWeddingDate(input),
      venue: input.venue?.trim() || null,
      style: input.style?.trim() || null,
      notes,
      budgetTotal: Number.isFinite(budgetTotal) ? budgetTotal : null,
      budgetAllocation: services.map((service) => ({
        service: service.label,
        amount: PRICE_MAP[service.id] ?? 0,
      })),
      services,
      status: "submitted",
    });

    revalidatePath("/dashboard/requests");
    return { ok: true, id: request.id };
  } catch (error) {
    console.error("[شاباشچی] خطا در ثبت درخواست عروسی:", error);
    return {
      ok: false,
      error: "ارتباط با سرور برقرار نشد؛ لطفاً دوباره تلاش کنید",
    };
  }
}
