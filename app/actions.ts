"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isValidIranPhone, normalizeIranPhone } from "@/lib/format";
import { isValidJalaliDateString } from "@/lib/jalali";

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

  await prisma.verificationCode.deleteMany({ where: { phone } });
  await prisma.verificationCode.create({ data: { phone, code, expiresAt } });

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

  await prisma.user.update({
    where: { phone },
    data: {
      name: name || null,
      nationalId: nationalId || null,
      dateOfBirth: dateOfBirth || null,
    },
  });

  revalidatePath("/dashboard/account");
  return { ok: true };
}
