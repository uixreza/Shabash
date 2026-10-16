import Image from "next/image";
import { venues } from "@/data/landing";
import { ArrowLeftIcon, MapPinIcon, StarIcon } from "./icons";

export default function Venues() {
  return (
    <section id="featured-venues" className="relative scroll-mt-20 py-16 lg:py-24">
      <div className="pointer-events-none absolute top-1/3 right-0 h-[380px] w-[380px] rounded-full bg-lp-green/10 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between lg:mb-14">
          <div>
            <span className="text-xs font-bold text-lp-gold sm:text-sm">
              تالارهای اختصاصی بجنورد و خراسان شمالی
            </span>
            <h2 className="mt-1 text-2xl font-bold text-lp-text sm:text-3xl lg:text-4xl">
              منتخب مجلل‌ترین باغ‌عمارت‌ها
            </h2>
          </div>
        </div>

        <div className="lp-no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0">
          {venues.map((venue) => (
            <article
              key={venue.id}
              className="lp-glass group flex w-[85%] flex-shrink-0 snap-start flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-lp-border-strong sm:w-[60%] lg:w-auto lg:flex-shrink">
              <div className="relative h-56 w-full overflow-hidden lg:h-64">
                {venue.image ? (
                  <Image
                    src={venue.image}
                    alt={venue.name}
                    fill
                    sizes="(max-width: 1024px) 85vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="lp-gold-gradient flex h-full w-full items-center justify-center">
                    <span className="text-6xl font-extrabold text-lp-on-gold/25">
                      {venue.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-lp-surface-strong via-transparent to-transparent" />
                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full border border-lp-border bg-lp-bg/80 px-3 py-1 text-xs font-bold text-lp-gold backdrop-blur-md">
                  <StarIcon className="h-3.5 w-3.5" />
                  <span>
                    {venue.rating} ({venue.reviews} نظر)
                  </span>
                </div>
                {venue.badge && (
                  <div className="lp-gold-gradient absolute top-3 left-3 rounded-full px-3 py-1 text-[11px] font-bold text-lp-on-gold">
                    {venue.badge}
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5 lg:p-6">
                <div className="mb-1 flex items-center gap-1.5 text-xs text-lp-muted">
                  <MapPinIcon className="h-4 w-4 flex-shrink-0 text-lp-gold" />
                  <span>{venue.location}</span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-lp-text">{venue.name}</h3>
                <p className="flex-1 text-xs leading-loose text-lp-muted sm:text-sm">
                  {venue.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-lp-border pt-4">
                  <div>
                    <span className="block text-[11px] text-lp-muted">ظرفیت مهمان</span>
                    <span className="text-sm font-bold text-lp-text">{venue.capacity}</span>
                  </div>
                  <a
                    href="#lead-form"
                    className="inline-flex items-center gap-1.5 rounded-full border border-lp-border bg-lp-surface-strong px-4 py-2 text-xs font-bold text-lp-text transition-all hover:border-transparent hover:bg-lp-gold hover:text-lp-on-gold">
                    استعلام ظرفیت و تاریخ
                    <ArrowLeftIcon className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-lp-muted lg:hidden">
          برای مشاهده همه تالارها، انگشت بکشید
        </p>
      </div>
    </section>
  );
}
