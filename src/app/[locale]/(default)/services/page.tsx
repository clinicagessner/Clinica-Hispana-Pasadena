import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/animations/reveal";
import { ServicesFilter } from "@/components/services/services-filter";
import { FaqSection } from "@/components/sections/faq-section";
import { JsonLdBreadcrumb, JsonLdCollectionPage } from "@/components/seo/json-ld";
import { HOME_FAQS } from "@/lib/home-faqs";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import {
  getCategoryLabel,
  getServiceCardData,
} from "@/lib/services";
import { absoluteUrl, buildAlternates } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/types";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesPage" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: buildAlternates("/services", locale as Locale),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("ServicesPage");
  const loc = locale as Locale;

  const services = getServiceCardData(loc);
  const categories = SERVICE_CATEGORIES.map((c) => ({
    value: c.value,
    label: getCategoryLabel(c.value, loc),
  }));

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: "Home", url: absoluteUrl("/", loc) },
          { name: t("title"), url: absoluteUrl("/services", loc) },
        ]}
      />
      <JsonLdCollectionPage
        name={t("title")}
        description={t("subtitle")}
        url={absoluteUrl("/services", loc)}
        items={services.map((s) => ({
          name: s.title,
          url: absoluteUrl(`/services/${s.slug}`, loc),
        }))}
      />

      {/* Encabezado editorial cálido */}
      <section className="relative overflow-hidden border-b border-blue-deep/10 bg-sand-bg py-16 lg:py-24">
        <div
          aria-hidden
          className="cross-pattern pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 text-blue-primary/15 lg:block"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow">Clínica Hispana Nueva Salud Pasadena</p>
            <h1 className="mt-5 max-w-3xl font-heading text-4xl font-black leading-[1.05] tracking-tight text-slate-dark sm:text-5xl lg:text-6xl">
              <span className="ink-underline">{t("title")}</span>
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-slate-primary">
              {t("subtitle")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Grid + filtro */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServicesFilter services={services} categories={categories} />
        </div>
      </section>

      <FaqSection items={HOME_FAQS} />
    </>
  );
}
