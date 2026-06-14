import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type {
  BlogPost,
  Locale,
  LocalizedFaq,
  LocalizedService,
  Service,
  ServiceFaq,
} from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resuelve un Service bilingüe a un locale concreto.
 * Fallback a español si falta el campo en inglés.
 */
export function getLocalizedService(
  service: Service,
  locale: Locale,
): LocalizedService {
  const en = locale === "en";
  return {
    slug: service.slug,
    order: service.order,
    category: service.category,
    icon: service.icon,
    highlighted: service.highlighted ?? false,
    title: en && service.titleEn ? service.titleEn : service.title,
    shortDescription:
      en && service.shortDescriptionEn
        ? service.shortDescriptionEn
        : service.shortDescription,
    description:
      en && service.descriptionEn ? service.descriptionEn : service.description,
    keywords:
      en && service.keywordsEn?.length ? service.keywordsEn : service.keywords,
    features:
      en && service.featuresEn?.length ? service.featuresEn : service.features,
    longDescription:
      en && service.longDescriptionEn
        ? service.longDescriptionEn
        : service.longDescription,
  };
}

export function getLocalizedFaq(faq: ServiceFaq, locale: Locale): LocalizedFaq {
  const en = locale === "en";
  return {
    question: en && faq.questionEn ? faq.questionEn : faq.question,
    answer: en && faq.answerEn ? faq.answerEn : faq.answer,
  };
}

/**
 * Selecciona la variante de un post de blog según el locale, con
 * fallback al español. Acepta el español como base y el inglés opcional.
 */
export function getLocalizedPost(
  es: BlogPost | undefined,
  en: BlogPost | undefined,
  locale: Locale,
): BlogPost | undefined {
  if (locale === "en") return en ?? es;
  return es ?? en;
}

export function formatDate(date: string, locale: Locale): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(d);
}

/** Path de imagen de un servicio (el usuario coloca el binario luego). */
export function serviceImagePath(slug: string): string {
  return `/images/services/${slug}.webp`;
}
