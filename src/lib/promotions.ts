import { PROMOTIONS } from "@/lib/constants";
import type { Locale, Promotion, PromotionCardData } from "@/types";

export function getAllPromotions(): Promotion[] {
  return [...PROMOTIONS].sort((a, b) => a.order - b.order);
}

/** DTOs ligeros ya localizados (seguros para el cliente). Una sola fuente para
 *  el carrusel de la home y el grid de /promociones. */
export function getPromotionCardData(locale: Locale): PromotionCardData[] {
  const isEn = locale === "en";
  return getAllPromotions().map((p) => ({
    slug: p.slug,
    image: p.image,
    price: p.price,
    title: isEn ? p.titleEn : p.title,
    blurb: isEn ? p.blurbEn : p.blurb,
    includes: isEn ? p.includesEn : p.includes,
    alt: isEn ? p.altEn : p.alt,
  }));
}
