"use client";

import { useState } from "react";
import Image from "next/image";
import { useTheme } from "@/components/Wrapper";
export default function Home() {
  const { theme } = useTheme();
  const [selectedStep, setSelectedStep] = useState(0);
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden ">
      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
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
            <button
              key={i}
              onClick={() => setSelectedStep(i)}
              className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 text-sm font-bold transition-all md:h-14 md:w-14 md:text-base ${
                    selectedStep === i
                      ? "border-primary bg-primary/15 text-primary shadow-sm"
                      : "border-primary/30 text-primary shadow-sm hover:border-primary hover:shadow-md hover:shadow-primary/20"
                  }`}>
                  {step.num}
                </div>
                <span className="whitespace-nowrap text-[10px] font-medium text-foreground/50 md:text-xs">
                  {step.label}
                </span>
              </div>
              {i < 3 && (
                <div className="mx-1 h-px w-6 bg-primary/60 md:mx-2 md:w-10" />
              )}
            </button>
          ))}
        </div>
      </main>

      {/* Copyright */}
      <footer className="fixed bottom-4 mx-auto z-10 text-xs text-foreground/30">
        © ۲۰۲۶ شاباش. تمامی حقوق محفوظ است.
      </footer>
    </div>
  );
}
