import Image from "next/image";
import Link from "next/link";
import { AwardIcon, HeadsetIcon, InstagramIcon, MailIcon, MapPinIcon, PhoneIcon, SendIcon, ShieldIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="relative border-t border-lp-border bg-lp-bg-alt/80">
      <div className="mx-auto max-w-7xl px-5 pt-14 pb-8 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-5">
            <div className="mb-4 flex items-center gap-2.5">
              <Image
                src="/logo.jpg"
                alt="لوگوی شاباشچی"
                width={40}
                height={40}
                className="h-10 w-10 rounded-xl object-cover shadow-md ring-1 ring-lp-gold/40"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-lp-gold">شاباشچی</span>
                <span className="text-[10px] tracking-[0.25em] text-lp-muted uppercase">
                  Shabashchi Luxury
                </span>
              </div>
            </div>
            <p className="mb-5 max-w-md text-sm leading-loose text-lp-muted">
              سامانه جامع برنامه‌ریزی جشن عروسی، رزرو آنلاین برترین تالارها و
              باغ‌عمارت‌های مجلل خراسان شمالی؛ پیونددهنده برترین هنرمندان و
              خاطره‌ساز باشکوه‌ترین شب زندگی شما در بجنورد.
            </p>
            <div className="flex items-center gap-3">
              {[
                { label: "پشتیبانی تلفنی", Icon: PhoneIcon },
                { label: "کانال تلگرام", Icon: SendIcon },
                { label: "گالری اینستاگرام", Icon: InstagramIcon },
                { label: "ایمیل اختصاصی", Icon: MailIcon },
              ].map(({ label, Icon }) => (
                <a
                  key={label}
                  aria-label={label}
                  href="#lead-form"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-lp-border bg-lp-surface text-lp-muted backdrop-blur-md transition-all hover:border-lp-gold/60 hover:text-lp-gold">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-4 text-sm font-bold text-lp-text">خدمات شاباشچی</h3>
            <ul className="space-y-2.5 text-sm text-lp-muted">
              <li>
                <a href="#featured-venues" className="transition-colors hover:text-lp-gold">
                  رزرو آنلاین تالار و باغ‌عمارت
                </a>
              </li>
              <li>
                <a href="#services" className="transition-colors hover:text-lp-gold">
                  آتلیه عکاسی و فیلمبرداری
                </a>
              </li>
              <li>
                <a href="#services" className="transition-colors hover:text-lp-gold">
                  میکاپ و شینیون عروس
                </a>
              </li>
              <li>
                <a href="#services" className="transition-colors hover:text-lp-gold">
                  گل‌آرایی، ماشین عروس و دسته گل
                </a>
              </li>
              <li>
                <a href="#services" className="transition-colors hover:text-lp-gold">
                  موزیک، نورپردازی و کترینگ
                </a>
              </li>
              <li>
                <Link href="/request" className="font-bold text-lp-text transition-colors hover:text-lp-gold">
                  ثبت درخواست رایگان عروسی
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-lp-gold">
                  درباره شاباشچی
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="mb-4 text-sm font-bold text-lp-text">پشتیبانی و اعتماد</h3>
            <a
              href="tel:+985832220000"
              className="mb-4 flex items-center gap-2.5 rounded-2xl border border-lp-border bg-lp-surface p-3 backdrop-blur-md transition-colors hover:border-lp-gold/50">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-lp-gold-soft text-lp-gold">
                <HeadsetIcon className="h-5 w-5" />
              </div>
              <div className="text-right">
                <span className="block text-[11px] text-lp-muted">پشتیبانی ۲۴ ساعته</span>
                <span className="block text-sm font-bold text-lp-text" dir="ltr">
                  ۳۲۲۲۰۰۰۰-۰۵۸
                </span>
              </div>
            </a>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "نماد اعتماد الکترونیکی", Icon: ShieldIcon },
                { label: "اتحادیه تالارداران", Icon: AwardIcon },
                { label: "درگاه پرداخت امن", Icon: ShieldIcon },
              ].map(({ label, Icon }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center gap-1 rounded-xl border border-lp-border bg-lp-surface px-3 py-2.5 text-center">
                  <Icon className="h-5 w-5 text-lp-gold" />
                  <span className="text-[10px] leading-tight text-lp-muted">{label}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-1.5 text-xs text-lp-muted">
              <MapPinIcon className="h-4 w-4 flex-shrink-0 text-lp-gold" />
              خراسان شمالی، بجنورد — پشتیبانی سراسر استان
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-lp-border pt-6 text-xs text-lp-muted/80 sm:flex-row">
          <p>© ۱۴۰۴ شاباشچی. تمامی حقوق محفوظ است.</p>
          <p>ساخته‌شده با ❤ در بجنورد</p>
        </div>
      </div>
    </footer>
  );
}
