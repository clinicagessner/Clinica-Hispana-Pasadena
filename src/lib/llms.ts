import {
  CONTACT_INFO,
  PROMOTIONS,
  SERVICES,
  SERVICES_LAST_MODIFIED,
  SERVICE_CATEGORIES,
  SITE_CONFIG,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { getAllPosts } from "@/lib/blog";
import { getServiceFaqs } from "@/lib/service-faqs";
import { HOME_FAQS } from "@/lib/home-faqs";
import { getLocalizedFaq, getLocalizedService } from "@/lib/utils";
import type { Locale } from "@/types";

// llms.txt y llms-full.txt se generan desde los mismos datos que las páginas
// (servicios, promociones, posts, FAQ, contacto), así nunca vuelven a quedar
// desfasados como los archivos estáticos que reemplazan. Solo hechos que el
// sitio ya publica: nada de credenciales ni cifras que no estén en los datos.

const base = SITE_CONFIG.baseUrl;
const url = (path: string, locale: Locale = "es") =>
  `${base}${locale === "en" ? "/en" : ""}${path === "/" ? "" : path}`;
const byOrder = [...SERVICES].sort((a, b) => a.order - b.order);
const byPromoOrder = [...PROMOTIONS].sort((a, b) => a.order - b.order);

const ADDRESS = `${CONTACT_INFO.address}, ${CONTACT_INFO.city}, ${CONTACT_INFO.state} ${CONTACT_INFO.zip}`;
const HOURS_EN =
  "Monday to Sunday, 9:00 AM to 9:00 PM, including weekends. Walk-ins accepted during all open hours.";
const HOURS_ES = "Lunes a domingo de 9:00 AM a 9:00 PM. Sin cita previa en todo el horario.";
const AREA_EN =
  "Pasadena, TX and nearby: South Houston, South Belt, Genoa, Sagemont, Galena Park, Deer Park and Hobby (Houston). The clinic sits on Spencer Hwy in ZIP 77587, inside the Pasadena area of Greater Houston.";
const ENTITY_EN = `${SITE_CONFIG.name} is a Hispanic family walk-in clinic at ${ADDRESS}, on Spencer Hwy in the Pasadena area of Houston. It is a different location from the other "Clínica Hispana Nueva Salud" clinics in La Porte and in Houston (Bellfort Ave), and from "Clínica Hispana Nueva Salud Michoacana" on Spencer Hwy in Pasadena 77505. Official phone: ${CONTACT_INFO.phoneDisplay}. Website: ${base}.`;

const lastUpdated = () => {
  const dates = [
    SERVICES_LAST_MODIFIED,
    ...SERVICES.map((s) => s.dateModified ?? SERVICES_LAST_MODIFIED),
    ...getAllPosts("es").map((p) => p.dateModified ?? p.date),
  ];
  return dates.reduce((m, d) => (d > m ? d : m), "2026-01-01");
};

export function buildLlmsTxt(): string {
  const posts = getAllPosts("en");
  const L: string[] = [];
  L.push(`# ${SITE_CONFIG.name} — Pasadena, TX`, "", `> ${SITE_CONFIG.descriptionEn}`, "");
  L.push("## About", "", ENTITY_EN, "", SITE_CONFIG.description, "");
  L.push(
    "## Location and contact",
    "",
    `- Address: ${ADDRESS}`,
    `- Phone (calls): ${CONTACT_INFO.phoneDisplay}`,
    `- WhatsApp (chat only, not for calls): ${CONTACT_INFO.whatsappDisplay} — https://wa.me/${CONTACT_INFO.whatsapp}`,
    `- Email: ${CONTACT_INFO.email}`,
    `- Coordinates: ${CONTACT_INFO.coordinates.lat}, ${CONTACT_INFO.coordinates.lng}`,
    `- Google Maps: ${CONTACT_INFO.googleMapsUrl}`,
    `- Google reviews: ${CONTACT_INFO.googleReviewUrl}`,
    "",
  );
  L.push("## Hours", "", HOURS_EN, "", "## Service area", "", AREA_EN, "");
  L.push("## Languages", "", "- Spanish (primary; every consultation available in Spanish)", "- English (also available)", "");
  L.push(`## Services (${SERVICES.length} total)`, "");
  for (const cat of SERVICE_CATEGORIES) {
    const group = byOrder.filter((s) => s.category === cat.value);
    if (!group.length) continue;
    L.push(`### ${cat.labelEn} / ${cat.label}`, "");
    for (const raw of group) {
      const s = getLocalizedService(raw, "en");
      L.push(`- ${s.title} — ${url(`/services/${raw.slug}`)}`);
    }
    L.push("");
  }
  L.push(
    "## Key pages",
    "",
    `- Homepage: ${url("/")}`,
    `- All services: ${url("/services")}`,
    `- Walk-in clinic info: ${url("/walk-in")}`,
    `- Promotions / health packages: ${url("/promociones")}`,
    `- Blog: ${url("/blog")}`,
    `- English version: ${url("/", "en")}`,
    "",
  );
  L.push(`## Current promotions (${PROMOTIONS.length})`, "");
  for (const p of byPromoOrder) {
    L.push(`- ${p.titleEn}${p.price ? ` (${p.price})` : ""}: ${p.includesEn.join(", ")} — ${url("/promociones")}#${p.slug}`);
  }
  L.push("", "Prices are the ones printed on each promotion flyer and may change without notice.", "");
  L.push(`## Guides (${posts.length})`, "");
  for (const p of posts) L.push(`- ${p.title} (updated ${p.dateModified ?? p.date}) — ${url(`/blog/${p.slug}`)}`);
  L.push("");
  L.push(
    "## Pricing and insurance",
    "",
    "Self-pay with affordable direct prices; no insurance is required. Patients with insurance are also welcome. Cash and cards accepted. Call for the current price of a specific service.",
    "",
  );
  L.push("## Frequently asked questions", "");
  for (const f of HOME_FAQS) {
    const q = getLocalizedFaq(f, "en");
    L.push(`Q: ${q.question}`, `A: ${q.answer}`, "");
  }
  L.push("## Social media", "", `- Facebook: ${SOCIAL_LINKS.facebook}`, `- Instagram: ${SOCIAL_LINKS.instagram}`, "");
  L.push("## Full descriptions", "", url("/llms-full.txt"), "");
  L.push(`Last updated: ${lastUpdated()}`, "");
  return L.join("\n");
}

export function buildLlmsFullTxt(): string {
  const L: string[] = [];
  L.push(`# ${SITE_CONFIG.name} — Full service descriptions`, "");
  L.push(`Website: ${base}`, `Address: ${ADDRESS}`, `Phone: ${CONTACT_INFO.phoneDisplay}`, `Hours: ${HOURS_EN}`, "");
  L.push("## About / Sobre la clínica", "", ENTITY_EN, "", SITE_CONFIG.description, "", "---", "");
  for (const raw of byOrder) {
    const s = getLocalizedService(raw, "es");
    const e = getLocalizedService(raw, "en");
    L.push(`## ${s.title} / ${e.title}`, "", s.description, "", e.description, "");
    if (raw.features?.length) {
      L.push("Incluye / Includes:");
      raw.features.forEach((f, i) => L.push(`- ${f}${raw.featuresEn?.[i] ? ` / ${raw.featuresEn[i]}` : ""}`));
      L.push("");
    }
    const faqs = getServiceFaqs(raw.slug);
    if (faqs.length) {
      L.push("Preguntas frecuentes / FAQ:");
      for (const f of faqs) {
        const es = getLocalizedFaq(f, "es");
        const en = getLocalizedFaq(f, "en");
        L.push(`Q: ${es.question}`, `A: ${es.answer}`, `Q: ${en.question}`, `A: ${en.answer}`, "");
      }
    }
    L.push(
      `Service page: ${url(`/services/${raw.slug}`)} | English: ${url(`/services/${raw.slug}`, "en")}`,
      `Last updated: ${raw.dateModified ?? SERVICES_LAST_MODIFIED}`,
      "",
      "---",
      "",
    );
  }
  L.push(
    "## Clínica sin cita previa / Walk-in clinic",
    "",
    `${SITE_CONFIG.name} atiende sin cita ${HOURS_ES.charAt(0).toLowerCase()}${HOURS_ES.slice(1)} Dirección: ${ADDRESS}. Traiga una identificación con foto y su lista de medicamentos. No se necesita seguro médico.`,
    "",
    `Walk-ins welcome ${HOURS_EN.charAt(0).toLowerCase()}${HOURS_EN.slice(1)} Bring a photo ID and your medication list. No insurance needed.`,
    "",
    `Page: ${url("/walk-in")} | English: ${url("/walk-in", "en")}`,
    "",
    "---",
    "",
  );
  L.push(`## Promociones / Promotions (${PROMOTIONS.length})`, "");
  for (const p of byPromoOrder) {
    L.push(`### ${p.title} / ${p.titleEn}${p.price ? ` — ${p.price}` : ""}`, "", p.blurb, "", p.blurbEn, "");
    L.push("Incluye / Includes:");
    p.includes.forEach((x, i) => L.push(`- ${x}${p.includesEn[i] ? ` / ${p.includesEn[i]}` : ""}`));
    L.push("", `Page: ${url("/promociones")}#${p.slug}`, "");
  }
  L.push("---", "");
  const posts = getAllPosts("es");
  L.push(`## Guías del blog / Blog guides (${posts.length})`, "");
  for (const p of posts) {
    L.push(`### ${p.title}`, "", p.description, "", `Published: ${p.date} | Updated: ${p.dateModified ?? p.date}`, `Page: ${url(`/blog/${p.slug}`)} | English: ${url(`/blog/${p.slug}`, "en")}`, "");
  }
  L.push("---", "", `Last updated: ${lastUpdated()}`, "");
  return L.join("\n");
}
