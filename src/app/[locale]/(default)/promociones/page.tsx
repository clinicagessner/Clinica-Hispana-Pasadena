import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/animations/reveal";
import {
  PromotionsGrid,
  type PromotionsGridLabels,
} from "@/components/promotions/promotions-grid";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { ContactForm } from "@/components/forms/contact-form";
import { StarRating } from "@/components/shared/star-rating";
import {
  JsonLdBreadcrumb,
  JsonLdCollectionPage,
  JsonLdFaqPage,
} from "@/components/seo/json-ld";
import { getPromotionCardData } from "@/lib/promotions";
import { getGooglePlaceData } from "@/lib/google-places";
import { getAllServices } from "@/lib/services";
import { getLocalizedService } from "@/lib/utils";
import { CONTACT_INFO } from "@/lib/constants";
import { absoluteUrl, buildAlternates } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import type { Locale, LocalizedFaq } from "@/types";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PromotionsPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates("/promociones", locale as Locale),
  };
}

export default async function PromotionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const loc = locale as Locale;

  const t = await getTranslations("PromotionsPage");
  const tp = await getTranslations("Promotions");
  const tc = await getTranslations("Common");

  const promotions = getPromotionCardData(loc);
  const place = await getGooglePlaceData();
  const services = getAllServices().map((s) => {
    const l = getLocalizedService(s, loc);
    return { value: l.slug, label: l.title };
  });

  const faqs: LocalizedFaq[] = [
    { question: t("faq1Q"), answer: t("faq1A") },
    { question: t("faq2Q"), answer: t("faq2A") },
    { question: t("faq3Q"), answer: t("faq3A") },
  ];

  const gridLabels: PromotionsGridLabels = {
    viewDetail: t("viewDetail"),
    priceLabel: tp("priceLabel"),
    includesLabel: tp("includesLabel"),
    ctaCall: tp("ctaCall"),
    ctaDirections: tp("ctaDirections"),
    ctaForm: tp("ctaForm"),
    close: tp("close"),
  };

  const contact = {
    phone: CONTACT_INFO.phone,
    phoneFormatted: CONTACT_INFO.phoneFormatted,
    googleMapsUrl: CONTACT_INFO.googleMapsUrl,
  };

  const homeLabel = loc === "en" ? "Home" : "Inicio";

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: homeLabel, url: absoluteUrl("/", loc) },
          { name: t("title"), url: absoluteUrl("/promociones", loc) },
        ]}
      />
      <JsonLdCollectionPage
        name={t("title")}
        description={t("subtitle")}
        url={absoluteUrl("/promociones", loc)}
        items={promotions.map((p) => ({
          name: p.title,
          url: absoluteUrl(`/promociones#${p.slug}`, loc),
        }))}
      />
      <JsonLdFaqPage faqs={faqs} />

      {/* Encabezado compacto + badge de reseñas en vivo */}
      <section className="relative overflow-hidden bg-sand-bg pb-14 pt-10 lg:pb-16 lg:pt-12">
        <div
          aria-hidden
          className="cross-pattern pointer-events-none absolute -right-12 -top-12 h-64 w-64 text-blue-deep/6"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-dark transition-colors hover:text-red-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToHome")}
          </Link>

          <Reveal className="mt-6 max-w-2xl">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h1 className="mt-4 font-heading text-4xl font-black leading-[1.05] tracking-tight text-slate-dark sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-primary">
              {t("subtitle")}
            </p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-blue-deep/10 bg-white px-4 py-2 shadow-sm">
              <span className="font-heading text-xl font-black leading-none text-blue-dark">
                {place.averageRating.toFixed(1)}
              </span>
              <StarRating rating={place.averageRating} />
              <span className="text-sm font-medium text-slate-muted">
                {tc("ratingSummary", { count: place.totalReviews })}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Grid de promociones */}
      <section className="bg-cloud py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PromotionsGrid
            promotions={promotions}
            labels={gridLabels}
            contact={contact}
            formHref="#lead-form"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden bg-sand-bg py-16 lg:py-20">
        <div
          aria-hidden
          className="cross-pattern pointer-events-none absolute -left-20 top-8 h-80 w-80 text-blue-deep/5"
        />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-heading text-3xl font-black tracking-tight text-ink sm:text-4xl">
              {t("faqTitle")}
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <div className="frame-card px-6 py-2 shadow-sm">
              <FaqAccordion items={faqs} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Formulario (lead form) */}
      <section
        id="lead-form"
        className="relative scroll-mt-24 overflow-hidden bg-cloud py-16 lg:py-24"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <span className="eyebrow justify-center">{t("eyebrow")}</span>
            <h2 className="mt-4 font-heading text-3xl font-black tracking-tight text-ink sm:text-4xl">
              {t("formTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-muted">
              {t("formSubtitle")}
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <ContactForm services={services} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
