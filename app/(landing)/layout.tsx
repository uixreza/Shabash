import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "شاباشچی",
  description:
    "برنامه‌ریزی هوشمندانه و بی‌دغدغه‌ترین شب زندگی شما — رزرو آنلاین مجلل‌ترین تالارها و باغ‌عمارت‌های خراسان شمالی با شاباشچی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
