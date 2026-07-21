import type { Metadata } from "next";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Wrapper from "@/components/Wrapper";
export const metadata: Metadata = {
  title: "شاباش | برنامه‌ریز عروسی",
  description: "برنامه‌ریزی عروسی رویایی شما با شاباش",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className="h-full antialiased"
      suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <Wrapper>
          <Header />
          <PageTransition>{children}</PageTransition>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: { fontFamily: "Dana, sans-serif" },
            }}
          />
        </Wrapper>
      </body>
    </html>
  );
}
