import { steps } from "@/data/landing";
import {
  ArrowLeftIcon,
  CalendarEditIcon,
  CameraIcon,
  CelebrationIcon,
  SparklesIcon,
  VillaIcon,
} from "./icons";

const stepIcons = {
  calendar: CalendarEditIcon,
  villa: VillaIcon,
  camera: CameraIcon,
  celebration: CelebrationIcon,
};

export default function Steps() {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-lp-bg-alt/60" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <div className="mb-12 flex flex-col items-center text-center lg:mb-16">
          <div className="mb-2 inline-flex items-center gap-2 text-lp-gold">
            <SparklesIcon className="h-4 w-4" />
            <span className="text-xs font-bold sm:text-sm">
              مسیر چهارگانه شاباشچی
            </span>
          </div>
          <h2 className="text-2xl font-bold text-lp-text sm:text-3xl lg:text-4xl">
            از درخواست تا شب رویایی، قدم به قدم
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-lp-muted sm:text-base">
            از لحظه تصمیم‌گیری تا پایان شب رویایی‌تان، تیم شاباشچی همراه شماست؛
            بدون سردرگمی، بدون قراردادهای پنهان.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => {
            const Icon = stepIcons[step.icon];
            const highlighted = i === 0 || i === steps.length - 1;
            return (
              <div
                key={step.number}
                className="lp-glass group flex h-full flex-col rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-lp-border-strong lg:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg font-extrabold shadow-md ${
                      highlighted
                        ? "lp-gold-gradient text-lp-on-gold"
                        : "border border-lp-border bg-lp-surface-strong text-lp-gold"
                    }`}>
                    {step.number}
                  </div>
                  <Icon className="h-7 w-7 text-lp-gold transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="mb-2 text-base font-bold text-lp-text lg:text-lg">
                  {step.title}
                </h3>
                <p className="flex-1 text-xs leading-loose text-lp-muted sm:text-sm">
                  {step.description}
                </p>
                <div className="mt-5 flex items-center gap-2 border-t border-lp-border pt-4 text-xs font-bold text-lp-gold">
                  <span>{step.hint}</span>
                  <ArrowLeftIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
