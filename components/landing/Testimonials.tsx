import { testimonials } from "@/data/landing";
import { StarIcon } from "./icons";

export default function Testimonials() {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="pointer-events-none absolute top-1/4 left-0 h-[360px] w-[360px] rounded-full bg-lp-gold/8 blur-[110px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <div className="mb-12 flex flex-col items-center text-center lg:mb-16">
          <span className="text-xs font-bold text-lp-gold sm:text-sm">
            صدای پیوندهای ماندگار
          </span>
          <h2 className="mt-1 text-2xl font-bold text-lp-text sm:text-3xl lg:text-4xl">
            تجربه عروسی رویایی با شاباش
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {testimonials.map((item) => (
            <figure
              key={item.id}
              className="lp-glass flex h-full flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-lp-border-strong lg:p-8">
              <div>
                <div className="mb-4 flex items-center gap-1 text-lp-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4" />
                  ))}
                </div>
                <blockquote className="text-sm leading-loose text-lp-muted sm:text-base">
                  {item.quote}
                </blockquote>
              </div>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-lp-border pt-5">
                <div className="lp-gold-gradient flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-lp-on-gold">
                  {item.initials}
                </div>
                <div>
                  <span className="block text-sm font-bold text-lp-text">{item.name}</span>
                  <span className="mt-0.5 block text-[11px] text-lp-muted">{item.tag}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
