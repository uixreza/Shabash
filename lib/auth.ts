import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
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
        const consumed = await prisma.verificationCode.deleteMany({
          where: { phone, code, expiresAt: { gt: new Date() } },
        });
        if (consumed.count === 0) return null;

        // Returning user? if not, sign them up
        const user = await prisma.user.upsert({
          where: { phone },
          update: {},
          create: { phone },
        });

        return { id: String(user.id), phone: user.phone, name: user.name };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.phone = user.phone;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.phone = (token.phone as string) ?? "";
      return session;
    },
  },
};
