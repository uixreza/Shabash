import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "شاباش | برنامه‌ریز عروسی در بجنورد",
  description:
    "برنامه‌ریزی هوشمندانه و بی‌دغدغه‌ترین شب زندگی شما — رزرو آنلاین مجلل‌ترین تالارها و باغ‌عمارت‌های خراسان شمالی با شاباش",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
