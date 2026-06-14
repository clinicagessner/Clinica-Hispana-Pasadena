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

      {/* Encabezado */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cloud to-sky-bg py-16 lg:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-blue-soft/15 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-deep">
              Clínica Hispana Nueva Salud Pasadena
            </p>
            <h1 className="mt-3 max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-slate-dark sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-primary">
              {t("subtitle")}
            </p>
            <div className="mt-5 h-0.5 w-24 rounded-full bg-gradient-to-r from-blue-primary to-teal" />
          </Reveal>
        </div>
      </section>

      {/* Grid + filtro */}
      <section className="bg-cloud py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServicesFilter services={services} categories={categories} />
        </div>
      </section>

      <FaqSection items={HOME_FAQS} className="bg-sky-bg" />
    </>
  );
}
