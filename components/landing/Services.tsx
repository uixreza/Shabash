import { services } from "@/data/landing";
import {
  CameraIcon,
  CateringIcon,
  FlowerIcon,
  MakeupIcon,
  MusicIcon,
  VillaIcon,
} from "./icons";

const serviceIcons = {
  villa: VillaIcon,
  camera: CameraIcon,
  makeup: MakeupIcon,
  flower: FlowerIcon,
  music: MusicIcon,
  catering: CateringIcon,
};

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-20 py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-lp-bg-alt/60" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <span className="text-xs font-bold tracking-wide text-lp-gold sm:text-sm">
            خدمات جامع عروسی
          </span>
          <h2 className="mt-1 text-2xl font-bold text-lp-text sm:text-3xl lg:text-4xl">
            تمام خدمات در یک پنجره واحد
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-lp-muted sm:text-base">
            دیگر نیازی به هماهنگی با ده‌ها فرد مختلف نیست؛ شاباش بهترین هنرمندان
            و متخصصان هر حوزه را یکجا به شما متصل می‌کند.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {services.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <div
                key={service.id}
                className="lp-glass lp-service-card group flex cursor-pointer flex-col items-center rounded-2xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-lp-border-strong sm:p-5">
                <div className="lp-service-icon mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-lp-border bg-lp-surface-strong text-lp-gold shadow-md transition-all duration-300">
                  <Icon className="h-7 w-7" />
                </div>
                <span className="text-sm font-bold text-lp-text">{service.title}</span>
                <span className="mt-1 text-[11px] text-lp-muted">{service.meta}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
