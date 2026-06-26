import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { getAllServiceSlugs } from "@/lib/services";
import { getPostSlugs } from "@/lib/blog";

const BASE = SITE_CONFIG.baseUrl;

function entry(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
): MetadataRoute.Sitemap[number] {
  const clean = path === "/" ? "" : path;
  return {
    url: `${BASE}${clean}`,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        es: `${BASE}${clean}`,
        en: `${BASE}/en${clean}`,
        "x-default": `${BASE}${clean}`,
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: MetadataRoute.Sitemap = [
    entry("/", "weekly", 1),
    entry("/services", "weekly", 0.9),
    entry("/promociones", "weekly", 0.8),
    entry("/blog", "weekly", 0.7),
    entry("/walk-in", "monthly", 0.8),
    entry("/privacy", "yearly", 0.3),
  ];

  const services: MetadataRoute.Sitemap = getAllServiceSlugs().map((slug) =>
    entry(`/services/${slug}`, "monthly", 0.8),
  );

  const posts: MetadataRoute.Sitemap = getPostSlugs().map((slug) =>
    entry(`/blog/${slug}`, "monthly", 0.6),
  );

  return [...staticPaths, ...services, ...posts];
}
