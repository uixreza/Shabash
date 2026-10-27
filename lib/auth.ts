import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma, withDbRetry } from "@/lib/db";
import { isValidIranPhone, normalizeIranPhone } from "@/lib/format";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/" },
  providers: [
    CredentialsProvider({
      name: "phone-otp",
      credentials: {
        phone: { label: "شماره موبایل", type: "text" },
        code: { label: "کد تأیید", type: "text" },
      },
      async authorize(credentials) {
        const phone = normalizeIranPhone(credentials?.phone ?? "");
        const code = (credentials?.code ?? "").replace(/\D/g, "");
        if (!isValidIranPhone(phone) || code.length !== 5) return null;

        // Atomically consume a matching, unexpired code
        const consumed = await withDbRetry(() =>
          prisma.verificationCode.deleteMany({
            where: { phone, code, expiresAt: { gt: new Date() } },
          })
        );
        if (consumed.count === 0) return null;

        // Returning user? if not, sign them up
        const user = await withDbRetry(() =>
          prisma.user.upsert({
            where: { phone },
            update: {},
            create: { phone },
          })
        );

        return {
          id: String(user.id),
          phone: user.phone,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.phone = user.phone;
        token.role = user.role;
        return token;
      }
      // Keep the role fresh so promotions/demotions apply without a re-login.
      if (token.phone) {
        try {
          const row = await withDbRetry(() =>
            prisma.user.findUnique({
              where: { phone: token.phone as string },
              select: { role: true },
            })
          );
          token.role = row?.role ?? "user";
        } catch {
          token.role = token.role ?? "user";
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.phone = (token.phone as string) ?? "";
        session.user.role = token.role === "admin" ? "admin" : "user";
      }
      return session;
    },
  },
};
