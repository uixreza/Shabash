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
      className="h-full overflow-hidden antialiased"
      suppressHydrationWarning>
      <body className="min-h-full  flex  flex-col">
        {/* Fade glares of primary color */}
        <div className="pointer-events-none fixed inset-0  z-0">
          <div className="absolute -top-32 -right-32 h-[400px] w-[400px] rounded-full bg-primary/8 blur-[100px]" />
          <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-primary/8 blur-[100px]" />
          <div className="absolute top-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[90px]" />
        </div>
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
