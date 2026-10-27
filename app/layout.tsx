import type { Metadata } from "next";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import "./globals.css";
import { Toaster } from "sileo";
import Wrapper from "@/components/Wrapper";
import Providers from "@/components/Providers";
export const metadata: Metadata = {
  title: "شاباشچی",
  description: "برنامه‌ریزی عروسی رویایی شما با شاباشچی",
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
      <body className="min-h-full  flex  flex-col">
        {/* Fade glares of primary color */}
        <div className="pointer-events-none fixed inset-0  z-0">
          <div className="absolute -top-32 -right-32 h-[400px] w-[400px] rounded-full bg-primary/8 blur-[100px]" />
          <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-primary/8 blur-[100px]" />
          <div className="absolute top-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[90px]" />
        </div>
        <Wrapper>
          <Providers>
            <Header />
            <PageTransition>{children}</PageTransition>
          </Providers>
          <Toaster
            position="top-center"
            options={{
              duration: 3000,
              fill: "#171717",
              styles: {
                title: "text-white!",
                description: "text-white/75!",
                badge: "bg-white/10!",
                button: "bg-white/10! hover:bg-white/15!",
              },
            }}
          />
        </Wrapper>
      </body>
    </html>
  );
}
