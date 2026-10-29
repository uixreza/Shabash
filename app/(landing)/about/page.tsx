import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { ArrowLeftIcon, MapPinIcon, VerifiedIcon } from "@/components/landing/icons";
import { breadcrumbJsonLd } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "درباره شاباشچی | تیم برنامه‌ریزی عروسی بجنورد و خراسان شمالی",
  description:
    "آشنایی با شاباشچی؛ تیم مستقر در بجنورد که زوج‌های خراسان شمالی را در رزرو تالار، باغ‌عمارت، آتلیه، میکاپ و کلیه خدمات عروسی همراهی می‌کند. مشاوره رایگان عروسی.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `درباره ${SITE_NAME} | تیم برنامه‌ریزی عروسی خراسان شمالی`,
    description:
      "شاباشچی؛ تیم برنامه‌ریزی عروسی مستقر در بجنورد، خراسان شمالی. رزرو تالار و باغ‌عمارت، آتلیه، میکاپ، گل‌آرایی و کترینگ با مشاوره رایگان.",
    url: `${SITE_URL}/about`,
    locale: "fa_IR",
    type: "website",
    images: ["/opengraph-image"],
  },
};

const COVERAGE_CITIES = [
  "بجنورد",
  "شیروان",
  "آشخانه",
  "گرمه",
  "جاجرم",
  "فاروج",
  "مانه",
  "سملقان",
];

const PROMISES = [
  {
    title: "مشاوره رایگان و بدون تعهد",
    description:
      "ثبت درخواست و دریافت فهرست تالارها، برآورد هزینه و راهنمایی تخصصی هیچ هزینه‌ای برای شما ندارد.",
  },
  {
    title: "تضمین بهترین قیمت",
    description:
      "مذاکره مستقیم شاباشچی با مالکان تالارها و باغ‌عمارت‌ها؛ بدون هزینه پنهان و با تخفیف‌های ویژه فصل.",
  },
  {
    title: "هماهنگی تا شب عروسی",
    description:
      "از انتخاب تالار تا روز مراسم، تیم تشریفات شاباشچی کنار شماست تا تنها دغدغه‌تان لبخند زدن باشد.",
  },
];

export default function About() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "صفحه اصلی", path: "/" },
    { name: "درباره شاباشچی", path: "/about" },
  ]);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-lp-bg text-lp-text selection:bg-lp-gold/25">
      <JsonLd data={breadcrumb} />
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lp-gold/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[320px] w-[320px] rounded-full bg-lp-green/15 blur-[100px]" />

      <main className="relative z-10 mx-auto flex max-w-4xl flex-col gap-12 px-5 py-16 sm:px-6 lg:px-12 lg:py-24">
        <section className="flex flex-col items-center gap-5 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-lp-text sm:text-4xl md:text-5xl">
            درباره <span className="lp-gold-text">شاباشچی</span>
          </h1>
          <p className="max-w-2xl text-base leading-loose text-lp-muted sm:text-lg md:text-xl">
            شاباشچی تیمی مستقر در خراسان شمالی، بجنورد است که به زوج‌های جوان
            کمک می‌کند مراسم عروسی خود را به‌راحتی و بدون سردرگمی برنامه‌ریزی
            کنند؛ از رزرو تالار و باغ‌عمارت تا هماهنگی آتلیه، میکاپ، گل‌آرایی و
            کترینگ — همه در یک مسیر شفاف و حرفه‌ای.
          </p>
          <p className="max-w-2xl text-sm leading-loose text-lp-muted sm:text-base">
            ما با شعار «شاباشچی یادت نره» کنار شما هستیم تا شبی که سال‌ها انتظارش
            را کشیده‌اید، دقیقاً همان‌طور که رویا می‌بینید برگزار شود.
          </p>
        </section>

        <section aria-labelledby="promises-heading">
          <h2
            id="promises-heading"
            className="mb-6 text-center text-xl font-bold text-lp-text sm:text-2xl">
            چرا زوج‌های بجنورد شاباشچی را انتخاب می‌کنند؟
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {PROMISES.map((promise) => (
              <div key={promise.title} className="lp-glass rounded-2xl p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-lp-gold-soft text-lp-gold">
                  <VerifiedIcon className="h-5 w-5" />
                </div>
                <h3 className="mb-1.5 text-sm font-bold text-lp-text sm:text-base">
                  {promise.title}
                </h3>
                <p className="text-xs leading-loose text-lp-muted sm:text-sm">
                  {promise.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="coverage-heading"
          className="lp-glass rounded-2xl p-6 text-center sm:p-8">
          <h2
            id="coverage-heading"
            className="mb-3 text-xl font-bold text-lp-text sm:text-2xl">
            پوشش خدمات در سراسر خراسان شمالی
          </h2>
          <p className="mx-auto mb-5 max-w-2xl text-sm leading-loose text-lp-muted sm:text-base">
            تیم شاباشچی علاوه بر بجنورد، در تمامی شهرهای خراسان شمالی آماده
            معرفی بهترین تالارها، باغ‌تالارها و تأمین‌کنندگان خدمات عروسی است:
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-2.5">
            {COVERAGE_CITIES.map((city) => (
              <li
                key={city}
                className="inline-flex items-center gap-1.5 rounded-full border border-lp-gold/30 bg-lp-surface px-4 py-1.5 text-xs font-bold text-lp-text sm:text-sm">
                <MapPinIcon className="h-3.5 w-3.5 text-lp-gold" />
                {city}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-xl font-bold text-lp-text sm:text-2xl">
            آماده‌اید مراسم رویایی‌تان را شروع کنید؟
          </h2>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Link
              href="/request"
              className="lp-gold-gradient inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-lp-on-gold shadow-[0_6px_28px_rgba(212,175,55,0.35)] transition-all hover:-translate-y-0.5 hover:brightness-110 sm:text-base">
              ثبت درخواست رایگان عروسی
              <ArrowLeftIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-lp-gold/35 bg-lp-surface px-6 py-3 text-sm font-semibold text-lp-text backdrop-blur-md transition-all hover:border-lp-gold/80 hover:bg-lp-surface-strong active:scale-95">
              بازگشت به صفحه اصلی
              <ArrowLeftIcon className="h-4 w-4 text-lp-gold" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
