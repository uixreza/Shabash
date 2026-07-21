import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "شاباش | برنامه‌ریز عروسی",
  description: "برنامه‌ریزی عروسی رویایی شما با شاباش",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
