import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      phone: string;
    } & DefaultSession["user"];
  }

  interface User {
    phone: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    phone?: string;
  }
}
