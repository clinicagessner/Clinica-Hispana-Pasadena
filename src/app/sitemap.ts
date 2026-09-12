import type { MetadataRoute } from "next";
import { SERVICES, SERVICES_LAST_MODIFIED, SITE_CONFIG } from "@/lib/constants";
import { getAllPosts } from "@/lib/blog";
import { locales } from "@/i18n/config";

const BASE = SITE_CONFIG.baseUrl;

// Fechas reales del último cambio de copy de cada página estática (git).
// Actualizar a mano cuando cambie el contenido, no en refactors.
const STATIC_DATES: Record<string, string> = {
  "": "2026-08-27",
  "/services": "2026-09-11",
  "/walk-in": "2026-07-30",
  "/promociones": "2026-09-01",
  "/blog": "2026-06-15",
};

// Strings YYYY-MM-DD comparan bien lexicográficamente.
const latest = (dates: string[], fallback: string) =>
  dates.reduce((max, d) => (d > max ? d : max), fallback);

const localePath = (locale: string) => (locale === "es" ? "" : `/${locale}`);

// Cada idioma lleva su propia <url> con alternates recíprocos (formato que
// pide Google para hreflang en sitemaps). Sin priority/changefreq: Google los
// ignora. /privacy va noindex y por eso no se lista.
function entries(path: string, lastModified: string): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${BASE}${localePath(locale)}${path}`,
    lastModified,
    alternates: {
      languages: {
        es: `${BASE}${path}`,
        en: `${BASE}/en${path}`,
        "x-default": `${BASE}${path}`,
      },
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts("es");
  const serviceDate = (s: (typeof SERVICES)[number]) =>
    s.dateModified ?? SERVICES_LAST_MODIFIED;
  const postDate = (p: (typeof posts)[number]) => p.dateModified ?? p.date;

  const newestService = latest(SERVICES.map(serviceDate), STATIC_DATES["/services"]);
  const newestPost = latest(posts.map(postDate), STATIC_DATES["/blog"]);

  return [
    ...entries("", latest([STATIC_DATES[""], newestService, newestPost], STATIC_DATES[""])),
    ...entries("/services", newestService),
    ...entries("/promociones", STATIC_DATES["/promociones"]),
    ...entries("/blog", newestPost),
    ...entries("/walk-in", STATIC_DATES["/walk-in"]),
    ...SERVICES.flatMap((s) => entries(`/services/${s.slug}`, serviceDate(s))),
    ...posts.flatMap((p) => entries(`/blog/${p.slug}`, postDate(p))),
  ];
}
