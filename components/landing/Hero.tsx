"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/Wrapper";
import { metrics } from "@/data/landing";
import {
  ArrowLeftIcon,
  CalendarEditIcon,
  CelebrationIcon,
  HeartIcon,
  PriceIcon,
  VerifiedIcon,
  VillaIcon,
  ZapIcon,
} from "./icons";

const metricIcons = {
  verified: VerifiedIcon,
  villa: VillaIcon,
  price: PriceIcon,
};

export default function Hero() {
  const { theme } = useTheme();

  return (
    <section className="relative overflow-hidden pt-24 pb-14 sm:pt-28 lg:pt-32 lg:pb-20">
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lp-gold/10 blur-[130px]" />
      <div className="pointer-events-none absolute top-24 right-1/4 h-[320px] w-[320px] rounded-full bg-lp-green/15 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-right">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lp-gold/25 bg-lp-surface-strong/80 px-4 py-1.5 backdrop-blur-md">
              <ZapIcon className="h-4 w-4 text-lp-gold" />
              <span className="text-xs font-bold text-lp-gold sm:text-sm">
                فقط ۳ دقیقه تا برنامه‌ریزی کامل مراسم
              </span>
            </div>

            <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-lp-text sm:text-5xl lg:text-6xl lg:leading-[1.15]">
              شاباش <span className="lp-gold-text">یادت نره</span>
            </h1>

            <p className="mb-3 text-base font-bold leading-relaxed text-lp-gold sm:text-lg lg:text-xl">
              برنامه‌ریزی هوشمندانه و بی‌دغدغه‌ترین شب زندگی شما
            </p>

            <p className="mb-8 max-w-xl text-sm leading-loose text-lp-muted sm:text-base lg:text-lg">
              از رزرو خاص‌ترین باغ‌عمارت‌ها و تالارهای بجنورد تا هماهنگی بهترین
              عکاسان، گل‌آرایی و کترینگ — همه در یک مسیر هموار، شفاف و بدون استرس.
            </p>

            <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Link
                href="/request"
                className="lp-gold-gradient inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-lp-on-gold shadow-[0_6px_28px_rgba(212,175,55,0.35)] transition-all hover:-translate-y-0.5 hover:brightness-110 sm:text-base">
                <CalendarEditIcon className="h-5 w-5" />
                ثبت اطلاعات و شروع سریع
              </Link>
              <a
                href="#featured-venues"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-lp-gold/35 bg-lp-surface px-6 py-3.5 text-sm font-semibold text-lp-text backdrop-blur-md transition-all hover:border-lp-gold/80 hover:bg-lp-surface-strong sm:text-base">
                مشاهده تالارها و باغ‌ها
                <ArrowLeftIcon className="h-4 w-4 text-lp-gold" />
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:col-span-5">
            <div className="group relative w-full max-w-[340px] sm:max-w-[400px]">
              <div className="absolute -top-5 -right-5 z-20 flex h-14 w-14 items-center justify-center rounded-full border border-lp-border bg-lp-surface-strong/90 text-lp-gold shadow-xl backdrop-blur-md">
                <HeartIcon className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-lp-border bg-lp-surface-strong/90 text-lp-green shadow-xl backdrop-blur-md">
                <CelebrationIcon className="h-5 w-5" />
              </div>
              <div className="absolute inset-4 rounded-full bg-lp-gold/20 blur-3xl" />
              <Image
                src={theme === "dark" ? "/couplesDark.png" : "/couples.jpeg"}
                alt="شب رویایی عروسی با شاباشچی"
                width={512}
                height={512}
                priority
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 400px, 400px"
                className="relative w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-16">
          {metrics.map((metric) => {
            const Icon = metricIcons[metric.icon];
            return (
              <div
                key={metric.id}
                className="lp-glass flex items-center gap-4 rounded-2xl p-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-lp-gold-soft text-lp-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-extrabold text-lp-text">
                      {metric.value}
                    </span>
                    <span className="text-sm font-bold text-lp-text">
                      {metric.title}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs leading-relaxed text-lp-muted">
                    {metric.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
