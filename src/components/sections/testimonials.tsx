import { getLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/animations/reveal";
import { StarRating } from "@/components/shared/star-rating";
import {
  TestimonialsCarousel,
  type CarouselTestimonial,
} from "@/components/sections/testimonials-carousel";
import { CONTACT_INFO, FALLBACK_TESTIMONIALS } from "@/lib/constants";
import { getGooglePlaceData } from "@/lib/google-places";
import { ctaButton } from "@/lib/button-styles";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

export async function Testimonials() {
  const t = await getTranslations("Testimonials");
  const tc = await getTranslations("Common");
  const locale = (await getLocale()) as Locale;
  const place = await getGooglePlaceData();

  // Reseñas en vivo si existen; si no, testimonios de respaldo localizados.
  const items: CarouselTestimonial[] =
    place.reviews.length >= 3
      ? place.reviews.map((r) => ({
          author: r.author,
          rating: r.rating,
          text: r.text,
          relativeTime: r.relativeTime,
          photoUrl: r.photoUrl,
        }))
      : FALLBACK_TESTIMONIALS.map((r) => ({
          author: r.author,
          rating: r.rating,
          text: locale === "en" ? r.textEn : r.text,
          relativeTime: r.relativeTime,
        }));

  return (
    <section id="resenas" className="relative isolate overflow-hidden scroll-mt-24 bg-white py-20 lg:py-28">
      <div
        aria-hidden
        className="cross-pattern pointer-events-none absolute -left-24 top-10 -z-10 h-96 w-96 text-blue-deep/5"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 className="mt-4 max-w-2xl font-heading text-4xl font-black leading-[1.05] tracking-tight text-ink sm:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-muted">
              {t("subtitle")}
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="frame-card flex items-center gap-4 border-l-4 border-l-red-accent p-5 shadow-sm lg:ml-auto lg:max-w-xs">
              <span className="font-heading text-5xl font-black leading-none text-blue-dark">
                {place.averageRating.toFixed(1)}
              </span>
              <span className="leading-tight">
                <StarRating rating={place.averageRating} />
                <span className="mt-1 block text-sm font-medium text-slate-muted">
                  {tc("ratingSummary", { count: place.totalReviews })}
                </span>
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160} className="mt-12">
          <TestimonialsCarousel items={items} verifiedLabel={t("verified")} />
        </Reveal>

        <div className="mt-10 flex justify-center">
          <a
            href={CONTACT_INFO.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(ctaButton({ variant: "outline", size: "md" }))}
          >
            {t("reviewCta")}
          </a>
        </div>
      </div>
    </section>
  );
}
