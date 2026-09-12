import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

// Los bots de búsqueda y de IA van listados explícitamente aunque `*` ya
// permita todo: algunos operadores leen solo su propio bloque. CCBot (Common
// Crawl) se bloquea: alimenta datasets, no buscadores que envíen pacientes.
const AI_AND_SEARCH_BOTS = [
  "Googlebot",
  "Bingbot",
  "Applebot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "DuckAssistBot",
  "Amazonbot",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: AI_AND_SEARCH_BOTS, allow: "/", disallow: ["/api/"] },
      { userAgent: "CCBot", disallow: "/" },
    ],
    sitemap: `${SITE_CONFIG.baseUrl}/sitemap.xml`,
    host: SITE_CONFIG.baseUrl,
  };
}
