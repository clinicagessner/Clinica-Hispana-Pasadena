import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Check, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ScrollLink } from "@/components/shared/scroll-link";
import { ServiceCard } from "@/components/services/service-card";
import { ServiceIcon } from "@/components/shared/service-icon";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import {
  JsonLdBreadcrumb,
  JsonLdFaqPage,
  JsonLdMedicalProcedure,
} from "@/components/seo/json-ld";
import {
  getAllServiceSlugs,
  getCategoryLabel,
  getRelatedServices,
  getServiceBySlug,
  hasServiceImage,
} from "@/lib/services";
import { getServiceFaqs } from "@/lib/service-faqs";
import { CONTACT_INFO } from "@/lib/constants";
import {
  getLocalizedFaq,
  getLocalizedService,
  serviceImagePath,
} from "@/lib/utils";
import { absoluteUrl, buildAlternates } from "@/lib/seo";
import { ctaButton } from "@/lib/button-styles";
import { cn } from "@/lib/utils";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/types";

export function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const l = getLocalizedService(service, locale as Locale);
  return {
    title: l.title,
    description: l.description,
    keywords: l.keywords,
    alternates: buildAlternates(`/services/${slug}`, locale as Locale),
    openGraph: {
      title: l.title,
      description: l.description,
      type: "article",
      url: absoluteUrl(`/services/${slug}`, locale as Locale),
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const loc = locale as Locale;

  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const l = getLocalizedService(service, loc);
  const t = await getTranslations("ServiceDetail");
  const categoryLabel = getCategoryLabel(l.category, loc);
  const faqs = getServiceFaqs(slug).map((f) => getLocalizedFaq(f, loc));
  const related = getRelatedServices(slug, 3).map((s) => {
    const rl = getLocalizedService(s, loc);
    return {
      slug: rl.slug,
      title: rl.title,
      shortDescription: rl.shortDescription,
      icon: rl.icon,
      category: rl.category,
      categoryLabel: getCategoryLabel(rl.category, loc),
    };
  });

  const url = absoluteUrl(`/services/${slug}`, loc);

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: "Home", url: absoluteUrl("/", loc) },
          { name: "Servicios", url: absoluteUrl("/services", loc) },
          { name: l.title, url },
        ]}
      />
      <JsonLdMedicalProcedure
        name={l.title}
        description={l.description}
        url={url}
      />
      <JsonLdFaqPage faqs={faqs} />

      {/* Hero del servicio (foto del servicio de fondo + overlay verde) */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-blue-deep via-blue-dark to-blue-deep py-16 text-sky-bg lg:py-20">
        {hasServiceImage(slug) ? (
          <>
            <Image
              src={serviceImagePath(slug)}
              alt={l.title}
              fill
              priority
              sizes="100vw"
              className="absolute inset-0 -z-20 object-cover object-center"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-deep via-blue-deep/85 to-blue-deep/45"
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-blue-deep/40" />
          </>
        ) : (
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 top-1/3 h-72 w-72 rounded-full bg-blue-primary/30 blur-3xl"
          />
        )}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-bg/70 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToServices")}
          </Link>

          <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-teal-light">
              <ServiceIcon name={l.icon} className="h-8 w-8" />
            </span>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-light">
                {categoryLabel}
              </span>
              <h1 className="mt-2 max-w-3xl font-heading text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
                {l.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-sky-bg/80">
                {l.shortDescription}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className={cn(ctaButton({ variant: "gold", size: "lg" }))}
                >
                  <Phone className="h-5 w-5" />
                  {t("ctaCall")}
                </a>
                <ScrollLink
                  href="/#contacto"
                  className={cn(ctaButton({ variant: "white", size: "lg" }))}
                >
                  {t("ctaContact")}
                </ScrollLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido */}
      <section className="bg-cloud py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-8">
            {/* Features */}
            <ul className="grid gap-3 sm:grid-cols-2">
              {l.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 rounded-xl border border-blue-light bg-white px-4 py-3"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-light text-blue-dark">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-sm font-medium text-slate-primary">
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            {/* Long description (markdown) */}
            <div
              className={cn(
                "mt-10 space-y-4",
                "[&_h2]:mt-9 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-dark",
                "[&_h3]:mt-6 [&_h3]:font-heading [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-slate-dark",
                "[&_p]:leading-relaxed [&_p]:text-slate-primary",
                "[&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_li]:text-slate-primary [&_li]:leading-relaxed",
                "[&_strong]:font-semibold [&_strong]:text-slate-dark",
              )}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {l.longDescription}
              </ReactMarkdown>
            </div>

            {/* FAQ */}
            {faqs.length > 0 && (
              <div className="mt-12">
                <h2 className="font-heading text-2xl font-bold text-slate-dark">
                  {t("faqTitle")}
                </h2>
                <div className="mt-5 rounded-2xl border border-blue-light bg-white px-6 py-2">
                  <FaqAccordion items={faqs} />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar CTA */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-2xl border border-blue-light bg-gradient-to-br from-blue-primary to-blue-dark p-7 text-white shadow-lg">
                <h2 className="font-heading text-xl font-bold">
                  {t("ctaTitle")}
                </h2>
                <p className="mt-2 text-sm text-sky-bg/85">{t("ctaBody")}</p>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className={cn(
                    ctaButton({ variant: "gold", size: "md" }),
                    "mt-5 w-full",
                  )}
                >
                  <Phone className="h-4 w-4" />
                  {CONTACT_INFO.phoneDisplay}
                </a>
                <ScrollLink
                  href="/#contacto"
                  className={cn(
                    ctaButton({ variant: "white", size: "md" }),
                    "mt-3 w-full",
                  )}
                >
                  {t("ctaContact")}
                </ScrollLink>
              </div>

              {l.keywords.length > 0 && (
                <div className="mt-6 rounded-2xl border border-blue-light bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-muted">
                    {t("keywordsLabel")}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {l.keywords.map((k) => (
                      <li
                        key={k}
                        className="rounded-full bg-sky-bg px-3 py-1 text-xs text-blue-dark"
                      >
                        {k}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* Relacionados */}
      <section className="bg-sky-bg py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-slate-dark">
            {t("relatedTitle")}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ServiceCard key={r.slug} service={r} className="h-full" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
