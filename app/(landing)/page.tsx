"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useTheme } from "@/components/Wrapper";
export default function Home() {
  const { theme } = useTheme();
  return (
    <div className="relative flex min-h-[calc(100vh-13rem)] sm:min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden ">
      {/* Main content */}
      <main className="relative bg-blend-multiply z-10 flex flex-col items-center gap-6 px-4 text-center">
        <Image
          src={theme === "dark" ? "/couplesDark.png" : "/couples.jpeg"}
          alt="wedding"
          width={360}
          height={360}
          className="pointer-events-none"
          priority
        />

        <h1 className="text-5xl z-10 font-bold tracking-tight text-foreground md:text-7xl">
          شاباش یادت نره
        </h1>

        <p className="max-w-md text-lg text-foreground/60 md:text-xl">
          با شاباشچی ، دیگه نگران مراسم نباش
        </p>

        {/* Steps */}
        <div className="sm:mt-8 mt-5 flex items-center gap-0 md:gap-2">
          {[
            { num: "۱", label: "درخواست" },
            { num: "۲", label: "رزرو تالار" },
            { num: "۳", label: "عکاسی" },
            { num: "۴", label: "روز عروسی" },
          ].map((step, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 bg-background text-sm font-bold transition-all md:h-14 md:w-14 md:text-base ${i === 0 ? "border-primary bg-primary text-white shadow-lg shadow-primary/40 ring-2 ring-primary/30" : "border-primary/30 text-primary shadow-sm hover:border-primary hover:shadow-md hover:shadow-primary/20"}`}>
                  {step.num}
                </div>
                <span className="whitespace-nowrap text-[10px] font-medium text-foreground/50 md:text-xs">
                  {step.label}
                </span>
              </div>
              {i < 3 && (
                <div className="mx-1 h-px w-6 bg-primary/60 md:mx-2 md:w-10" />
              )}
            </div>
          ))}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-20 h-40 bg-gradient-to-b from-transparent to-background/70 md:hidden" />

      <Navbar />

      {/* Copyright */}
      <footer className="fixed bottom-4 mx-auto z-10 text-xs text-foreground/30">
        © ۲۰۲۶ شاباش. تمامی حقوق محفوظ است.
      </footer>
    </div>
  );
}
