import {
  CONTACT_INFO,
  OPENING_HOURS,
  SITE_CONFIG,
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

/**
 * MedicalClinic global (montado en (default)/layout). Async: trae rating y
 * reseñas 5★ en vivo (cache 1h) con fallback a GOOGLE_REVIEWS_DATA.
 * availableService usa MedicalProcedure (sin price → no rompe validación).
 */
export async function JsonLdMedicalClinic({ locale }: { locale: Locale }) {
  const place = await getGooglePlaceData();
  const services = getAllServices().map((s) => getLocalizedService(s, locale));
  const homeUrl = absoluteUrl("/", locale);

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${SITE_CONFIG.baseUrl}/#clinic`,
    name: SITE_CONFIG.name,
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
    areaServed: { "@type": "City", name: "Pasadena" },
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

export function JsonLdBreadcrumb({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
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

export function JsonLdMedicalProcedure({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        name,
        description,
        url,
        provider: { "@id": `${SITE_CONFIG.baseUrl}/#clinic` },
      }}
    />
  );
}

export function JsonLdFaqPage({ faqs }: { faqs: LocalizedFaq[] }) {
  if (faqs.length === 0) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }}
    />
  );
}

export function JsonLdCollectionPage({
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
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name,
        description,
        url,
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
