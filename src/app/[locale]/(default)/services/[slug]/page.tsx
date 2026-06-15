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

      {/* Hero del servicio: split editorial sobre crema */}
      <section className="relative isolate overflow-hidden bg-sand-bg py-12 lg:py-16">
        <div
          aria-hidden
          className="cross-pattern pointer-events-none absolute -right-20 -top-16 -z-10 h-96 w-96 text-blue-deep/5"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-muted transition-colors hover:text-blue-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToServices")}
          </Link>

          <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-teal-bg text-teal-deep">
                  <ServiceIcon name={l.icon} className="h-6 w-6" />
                </span>
                <span className="eyebrow">{categoryLabel}</span>
              </span>
              <h1 className="mt-5 font-heading text-4xl font-black leading-[1.05] tracking-tight text-ink sm:text-5xl">
                {l.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-muted">
                {l.shortDescription}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className={cn(ctaButton({ variant: "red", size: "lg" }))}
                >
                  <Phone className="h-5 w-5" />
                  {t("ctaCall")}
                </a>
                <ScrollLink
                  href="/#contacto"
                  className={cn(ctaButton({ variant: "outline", size: "lg" }))}
                >
                  {t("ctaContact")}
                </ScrollLink>
              </div>
            </div>

            {hasServiceImage(slug) && (
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -bottom-4 -right-4 -z-10 hidden h-full w-full rounded-3xl border-2 border-blue-primary/25 lg:block"
                />
                <div className="overflow-hidden rounded-3xl border border-blue-deep/10 shadow-2xl shadow-blue-deep/15">
                  <Image
                    src={serviceImagePath(slug)}
                    alt={l.title}
                    width={760}
                    height={570}
                    priority
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    className="aspect-4/3 h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contenido */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-8">
            {/* Features */}
            <ul className="grid gap-3 sm:grid-cols-2">
              {l.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 rounded-xl border border-blue-deep/10 bg-sand-bg px-4 py-3"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-teal-bg text-teal-deep">
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
                "mt-10 space-y-5",
                "[&_h2]:mt-9 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink",
                "[&_h3]:mt-6 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink",
                "[&_p]:text-lg [&_p]:leading-relaxed [&_p]:text-slate-primary",
                "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:text-lg [&_li]:text-slate-primary [&_li]:leading-relaxed",
                "[&_strong]:font-semibold [&_strong]:text-ink",
                "[&_a]:font-medium [&_a]:text-blue-dark [&_a]:underline [&_a]:underline-offset-2",
              )}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {l.longDescription}
              </ReactMarkdown>
            </div>

            {/* FAQ */}
            {faqs.length > 0 && (
              <div className="mt-12">
                <h2 className="font-heading text-2xl font-bold text-ink">
                  {t("faqTitle")}
                </h2>
                <div className="frame-card mt-5 px-6 py-2">
                  <FaqAccordion items={faqs} />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar CTA */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="relative isolate overflow-hidden rounded-3xl bg-blue-deep p-7 text-sky-bg shadow-xl">
                <div
                  aria-hidden
                  className="cross-pattern pointer-events-none absolute inset-0 -z-10 text-white/5"
                />
                <h2 className="font-heading text-xl font-bold text-white">
                  {t("ctaTitle")}
                </h2>
                <p className="mt-2 text-sm text-sky-bg/85">{t("ctaBody")}</p>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className={cn(
                    ctaButton({ variant: "red", size: "md" }),
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
                <div className="mt-6 rounded-2xl border border-blue-deep/10 bg-sand-bg p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-muted">
                    {t("keywordsLabel")}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {l.keywords.map((k) => (
                      <li
                        key={k}
                        className="rounded-md border border-blue-deep/10 bg-white px-3 py-1 text-xs font-medium text-slate-primary"
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
      <section className="bg-sand-bg py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-black tracking-tight text-ink">
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
