import Link from "next/link";

export const faqs = [
  {
    question: "شاباشچی چیست و چه خدماتی ارائه می‌دهد؟",
    answer:
      "شاباشچی سامانه جامع برنامه‌ریزی جشن عروسی در بجنورد و خراسان شمالی است. از رزرو آنلاین تالار و باغ‌عمارت گرفته تا آتلیه عکاسی و فیلمبرداری، میکاپ و شینیون عروس، گل‌آرایی ماشین عروس، موزیک و نورپردازی، کترینگ و کارت دعوت — همه خدمات مراسم شما در یک پنجره واحد و بدون سردرگمی مدیریت می‌شود.",
  },
  {
    question: "رزرو تالار و باغ‌عمارت در بجنورد چگونه انجام می‌شود؟",
    answer:
      "کافی است فرم درخواست سه‌دقیقه‌ای شاباشچی را تکمیل کنید. تیم ما با توجه به تاریخ، محدوده بودجه و تعداد مهمان‌های شما، مناسب‌ترین تالارها و باغ‌عمارت‌های بجنورد و خراسان شمالی را معرفی می‌کند و هماهنگی بازدید حضوری رایگان را نیز بر عهده می‌گیرد.",
  },
  {
    question: "هزینه برنامه‌ریزی و مشاوره عروسی با شاباشچی چقدر است؟",
    answer:
      "مشاوره اولیه و ثبت درخواست در شاباشچی کاملاً رایگان است. شما هیچ هزینه‌ای برای دریافت فهرست تالارها، برآورد هزینه و راهنمایی تیم ما پرداخت نمی‌کنید و تضمین بهترین قیمت نیز از مزایای رزرو از طریق شاباشچی است.",
  },
  {
    question: "آیا شاباشچی در شهرهای دیگر خراسان شمالی هم فعالیت می‌کند؟",
    answer:
      "بله. علاوه بر بجنورد، تیم شاباشچی در سراسر خراسان شمالی از جمله شیروان، آشخانه، گرمه، جاجرم، فاروج، مانه و سملقان پشتیبانی می‌کند و می‌تواند تالار، باغ و تأمین‌کنندگان خدمات عروسی را در این شهرها نیز به شما معرفی کند.",
  },
  {
    question: "چه خدماتی در کنار تالار قابل رزرو است؟",
    answer:
      "در کنار رزرو تالار و باغ‌عمارت، می‌توانید آتلیه عکاسی و فیلمبرداری سینمایی، میکاپ و شینیون عروس، گل‌آرایی ماشین عروس و دسته‌گل، گروه موسیقی زنده و دیجی، نورپردازی و دکوراسیون، کترینگ و منوی شام و طراحی کارت دعوت را از طریق شاباشچی رزرو کنید.",
  },
  {
    question: "برای شروع برنامه‌ریزی عروسی چه اطلاعاتی لازم است؟",
    answer:
      "فقط نام، شماره تماس، تقریبی تاریخ مراسم (ماه و روز به شمسی)، محدوده بودجه و تعداد مهمان‌ها کافی است. حتی اگر تاریخ قطعی را هم انتخاب نکرده‌اید، می‌توانید با ثبت اطلاعات اولیه از مشاوره رایگان و فهرست گزینه‌های مناسب بهره‌مند شوید.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="relative scroll-mt-20 py-16 lg:py-24">
      <div className="pointer-events-none absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-lp-gold/8 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-6 lg:px-12">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold text-lp-gold sm:text-sm">
            راهنمای جامع عروسی در بجنورد و خراسان شمالی
          </span>
          <h2 className="mt-1 text-2xl font-bold text-lp-text sm:text-3xl lg:text-4xl">
            سوالات متداول برنامه‌ریزی عروسی
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-loose text-lp-muted sm:text-base">
            پاسخ صادقانه و شفاف به رایج‌ترین پرسش‌های زوج‌های جوان درباره رزرو
            تالار، هزینه‌ها و خدمات مراسم عروسی.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="lp-glass group rounded-2xl p-5 transition-colors sm:p-6">
              <summary className="cursor-pointer list-none text-sm font-bold text-lp-text sm:text-base">
                <span className="flex items-start justify-between gap-3">
                  <span>{faq.question}</span>
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-lp-gold-soft text-lp-gold transition-transform group-open:rotate-45">
                    <span aria-hidden="true" className="text-lg leading-none">
                      +
                    </span>
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-xs leading-loose text-lp-muted sm:text-sm">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-lp-muted">
          پاسخ سؤال خود را پیدا نکردید؟{" "}
          <a
            href="tel:+985832220000"
            className="font-bold text-lp-gold underline-offset-4 hover:underline">
            با پشتیبانی شاباشچی تماس بگیرید
          </a>{" "}
          یا{" "}
          <Link
            href="/request"
            className="font-bold text-lp-gold underline-offset-4 hover:underline">
            فرم درخواست رایگان را تکمیل کنید
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
