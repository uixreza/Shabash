import { DefaultSession } from "next-auth";

export type UserRole = "user" | "admin";

declare module "next-auth" {
  interface Session {
    user: {
      phone: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    phone: string;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    phone?: string;
    role?: UserRole;
  }
}
