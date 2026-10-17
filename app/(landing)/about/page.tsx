import Link from "next/link";
import { ArrowLeftIcon } from "@/components/landing/icons";

export default function About() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-lp-bg text-lp-text selection:bg-lp-gold/25">
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lp-gold/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[320px] w-[320px] rounded-full bg-lp-green/15 blur-[100px]" />

      <main className="relative z-10 flex flex-col items-center gap-6 px-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-lp-text md:text-5xl">
          درباره <span className="lp-gold-text">شاباشچی</span>
        </h1>

        <p className="max-w-lg text-lg leading-loose text-lp-muted md:text-xl">
          شاباشچی تیمی است مستقر در خراسان شمالی، بجنورد که به زوج‌ها کمک می‌کند به
          راحتی مراسم عروسی خود را مدیریت کنند و دیگر نگران سردرگمی‌های آن
          نباشند.
        </p>

        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-lp-gold/35 bg-lp-surface px-6 py-3 text-sm font-semibold text-lp-text backdrop-blur-md transition-all hover:border-lp-gold/80 hover:bg-lp-surface-strong active:scale-95">
          بازگشت به صفحه اصلی
          <ArrowLeftIcon className="h-4 w-4 text-lp-gold" />
        </Link>
      </main>
    </div>
  );
}
