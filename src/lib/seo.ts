import { SITE_CONFIG } from "@/lib/constants";
import type { Locale } from "@/types";

export function localePrefix(locale: Locale): string {
  return locale === "en" ? "/en" : "";
}

/** URL absoluta para un path interno en un locale (es sin prefijo). */
export function absoluteUrl(path: string, locale: Locale): string {
  const clean = path === "/" ? "" : path;
  return `${SITE_CONFIG.baseUrl}${localePrefix(locale)}${clean}`;
}

/**
 * Bloque alternates para generateMetadata: canonical del locale actual
 * + hreflang es / en / x-default. El español nunca lleva prefijo.
 */
/**
 * Título SEO de servicio: nombre + ciudad + marca, solo lo que quepa en 60
 * caracteres. Los títulos eran el nombre a secas ("Wound Care", 10 chars),
 * sin señal local ni de marca en la SERP.
 */
export function seoTitle(title: string, locale: Locale, max = 60): string {
  let t = title;
  if (!/pasadena/i.test(t)) {
    const city = locale === "en" ? " in Pasadena, TX" : " en Pasadena, TX";
    if (t.length + city.length <= max) t += city;
  }
  const brand = " | Nueva Salud";
  if (t.length + brand.length <= max) t += brand;
  return t;
}

export function buildAlternates(path: string, locale: Locale) {
  const clean = path === "/" ? "" : path;
  return {
    canonical: absoluteUrl(path, locale),
    languages: {
      es: `${SITE_CONFIG.baseUrl}${clean}`,
      en: `${SITE_CONFIG.baseUrl}/en${clean}`,
      "x-default": `${SITE_CONFIG.baseUrl}${clean}`,
    },
  };
}
