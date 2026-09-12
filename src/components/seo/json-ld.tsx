import { getLocale } from "next-intl/server";
import {
  CONTACT_INFO,
  OPENING_HOURS,
  SITE_CONFIG,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { getAllServices } from "@/lib/services";
import { getGooglePlaceData } from "@/lib/google-places";
import { getLocalizedService } from "@/lib/utils";
import { absoluteUrl } from "@/lib/seo";
import type { Locale, LocalizedFaq } from "@/types";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON serializado de forma segura
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: CONTACT_INFO.address,
  addressLocality: CONTACT_INFO.city,
  addressRegion: CONTACT_INFO.state,
  postalCode: CONTACT_INFO.zip,
  addressCountry: "US",
};

const CLINIC_ID = `${SITE_CONFIG.baseUrl}/#clinic`;

// Perfiles reales verificados (GBP, Facebook, Instagram). No inventar más.
const SAME_AS = [SOCIAL_LINKS.facebook, SOCIAL_LINKS.instagram];

// Ciudades del área de servicio, en el mismo orden que el bloque AREAS del
// sitio. Pasadena es la ciudad de marca; la postal (GBP y USPS) es South Houston.
const AREA_SERVED = [
  "Pasadena",
  "South Houston",
  "South Belt",
  "Genoa",
  "Sagemont",
  "Galena Park",
  "Deer Park",
  "Houston",
].map((name) => ({ "@type": "City", name }));

/**
 * Nodo ligero de la clínica para las páginas que no son la home: resuelve el
 * `provider: {@id}` de cada MedicalProcedure sin repetir rating, reseñas y
 * los 29 servicios en 90 páginas (y sin que reviewCount difiera entre
 * páginas regeneradas en momentos distintos).
 */
export async function JsonLdMedicalClinicRef() {
  const locale = (await getLocale()) as Locale;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "MedicalClinic",
        "@id": CLINIC_ID,
        name: SITE_CONFIG.name,
        url: absoluteUrl("/", locale),
        telephone: CONTACT_INFO.phone,
        address: postalAddress,
        sameAs: SAME_AS,
        inLanguage: locale,
      }}
    />
  );
}

/**
 * MedicalClinic completo (solo en la home, una única fuente de verdad para
 * el rating). Async: trae rating y reseñas 5★ en vivo con fallback a
 * GOOGLE_REVIEWS_DATA. availableService usa MedicalProcedure (sin price).
 */
export async function JsonLdMedicalClinic({ locale }: { locale: Locale }) {
  const place = await getGooglePlaceData();
  const services = getAllServices().map((s) => getLocalizedService(s, locale));
  const homeUrl = absoluteUrl("/", locale);

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": CLINIC_ID,
    name: SITE_CONFIG.name,
    inLanguage: locale,
    sameAs: SAME_AS,
    // Ubicación exacta para que buscadores e IAs no la mezclen con otras
    // clínicas del mismo nombre en el área. Sin nombrarlas.
    disambiguatingDescription:
      locale === "en"
        ? `Family walk-in clinic at ${CONTACT_INFO.address}, ${CONTACT_INFO.city}, TX ${CONTACT_INFO.zip} (Pasadena area). Phone ${CONTACT_INFO.phoneDisplay}.`
        : `Clínica familiar sin cita en ${CONTACT_INFO.address}, ${CONTACT_INFO.city}, TX ${CONTACT_INFO.zip} (área de Pasadena). Teléfono ${CONTACT_INFO.phoneDisplay}.`,
    description:
      locale === "en" ? SITE_CONFIG.descriptionEn : SITE_CONFIG.description,
    url: homeUrl,
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    image: `${SITE_CONFIG.baseUrl}${SITE_CONFIG.ogImage}`,
    logo: `${SITE_CONFIG.baseUrl}${SITE_CONFIG.logoUrl}`,
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card",
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: CONTACT_INFO.coordinates.lat,
      longitude: CONTACT_INFO.coordinates.lng,
    },
    hasMap: CONTACT_INFO.googleMapsUrl,
    areaServed: AREA_SERVED,
    availableLanguage: ["es", "en"],
    openingHoursSpecification: OPENING_HOURS.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${h.day}`,
      opens: h.opens,
      closes: h.closes,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: place.averageRating,
      reviewCount: place.totalReviews,
      bestRating: 5,
      worstRating: 1,
    },
    availableService: services.map((s) => ({
      "@type": "MedicalProcedure",
      name: s.title,
      url: absoluteUrl(`/services/${s.slug}`, locale),
    })),
  };

  if (place.reviews.length > 0) {
    data.review = place.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
      },
      reviewBody: r.text,
    }));
  }

  return <JsonLd data={data} />;
}

export async function JsonLdBreadcrumb({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const locale = await getLocale();
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        inLanguage: locale,
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

export async function JsonLdMedicalProcedure({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const locale = await getLocale();
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        name,
        description,
        url,
        inLanguage: locale,
        provider: { "@id": CLINIC_ID },
      }}
    />
  );
}

export async function JsonLdFaqPage({ faqs }: { faqs: LocalizedFaq[] }) {
  if (faqs.length === 0) return null;
  const locale = await getLocale();
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: locale,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }}
    />
  );
}

export async function JsonLdCollectionPage({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string }[];
}) {
  const locale = await getLocale();
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name,
        description,
        url,
        inLanguage: locale,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            url: item.url,
          })),
        },
      }}
    />
  );
}
