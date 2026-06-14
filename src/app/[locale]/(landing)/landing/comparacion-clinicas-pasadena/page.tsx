import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Check, Phone, Star, X } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { ContactForm } from "@/components/forms/contact-form";
import { JsonLdBreadcrumb, JsonLdFaqPage } from "@/components/seo/json-ld";
import { CONTACT_INFO, FALLBACK_TESTIMONIALS } from "@/lib/constants";
import { getServiceCardData } from "@/lib/services";
import { getLandingContent } from "@/lib/landing-conquesting";
import { absoluteUrl, buildAlternates } from "@/lib/seo";
import { ctaButton } from "@/lib/button-styles";
import { cn } from "@/lib/utils";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/types";

const PATH = "/landing/comparacion-clinicas-pasadena";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = getLandingContent(locale as Locale);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: buildAlternates(PATH, locale as Locale),
  };
}

export default async function ComparacionLandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const loc = locale as Locale;
  const c = getLandingContent(loc);
  const services = getServiceCardData(loc).map((s) => ({
    value: s.slug,
    label: s.title,
  }));
  const reviews = FALLBACK_TESTIMONIALS.slice(0, 3);

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: "Home", url: absoluteUrl("/", loc) },
          { name: c.eyebrow, url: absoluteUrl(PATH, loc) },
        ]}
      />
      <JsonLdFaqPage faqs={c.faqs} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-deep via-blue-dark to-blue-primary py-20 text-sky-bg lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-teal/15 blur-3xl"
        />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-light">
              {c.eyebrow}
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl">
              {c.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sky-bg/85">
              {c.subtitle}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className={cn(ctaButton({ variant: "gold", size: "lg" }))}
              >
                <Phone className="h-5 w-5" />
                {c.ctaCall}
              </a>
              <a
                href="#lead-form"
                className={cn(ctaButton({ variant: "white", size: "lg" }))}
              >
                {c.ctaForm}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Comparación */}
      <section className="bg-cloud py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-3xl font-extrabold tracking-tight text-slate-dark">
            {c.comparisonTitle}
          </h2>
          <Reveal className="mt-10 overflow-hidden rounded-2xl border border-blue-light bg-white shadow-sm">
            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-b border-blue-light bg-sky-bg px-5 py-4 sm:gap-x-8 sm:px-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-muted">
                &nbsp;
              </span>
              <span className="text-center font-heading text-sm font-bold text-blue-dark">
                {c.clinicLabel}
              </span>
              <span className="text-center font-heading text-sm font-semibold text-slate-muted">
                {c.othersLabel}
              </span>
            </div>
            <ul>
              {c.comparison.map((row, i) => (
                <li
                  key={row.feature}
                  className={cn(
                    "grid grid-cols-[1fr_auto_auto] items-center gap-x-4 px-5 py-3.5 sm:gap-x-8 sm:px-8",
                    i % 2 === 1 && "bg-cloud",
                  )}
                >
                  <span className="text-sm font-medium text-slate-primary">
                    {row.feature}
                  </span>
                  <span className="flex justify-center">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-light text-blue-dark">
                      <Check className="h-4 w-4" />
                    </span>
                  </span>
                  <span className="flex justify-center">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-bg text-red-accent">
                      <X className="h-4 w-4" />
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Diferenciadores */}
      <section className="bg-sky-bg py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-3xl font-extrabold tracking-tight text-slate-dark">
            {c.diffTitle}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {c.differentiators.map((d, i) => (
              <Reveal key={d.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-blue-light bg-white p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-primary font-heading text-lg font-extrabold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-bold text-slate-dark">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-muted">
                    {d.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="bg-cloud py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-3xl font-extrabold tracking-tight text-slate-dark">
            {c.offeringsTitle}
          </h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {c.offerings.map((o) => (
              <li
                key={o}
                className="flex items-start gap-3 rounded-xl border border-blue-light bg-white px-4 py-3.5"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-light text-blue-dark">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-sm font-medium text-slate-primary">
                  {o}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reseñas */}
      <section className="bg-sky-bg py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-3xl font-extrabold tracking-tight text-slate-dark">
            {c.reviewsTitle}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <figure
                key={r.author}
                className="flex h-full flex-col rounded-2xl border border-blue-light bg-white p-6 shadow-sm"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 fill-teal text-teal"
                    />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-primary">
                  {loc === "en" ? r.textEn : r.text}
                </blockquote>
                <figcaption className="mt-5 border-t border-blue-light pt-4 font-heading font-bold text-slate-dark">
                  {r.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cloud py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-3xl font-extrabold tracking-tight text-slate-dark">
            {c.faqTitle}
          </h2>
          <div className="mt-8 rounded-2xl border border-blue-light bg-white px-6 py-2">
            <FaqAccordion items={c.faqs} />
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section
        id="lead-form"
        className="scroll-mt-20 bg-gradient-to-br from-blue-deep via-blue-dark to-blue-deep py-20 text-sky-bg lg:py-24"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              {c.finalTitle}
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-sky-bg/85">
              {c.finalBody}
            </p>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className={cn(ctaButton({ variant: "gold", size: "lg" }), "mt-7")}
            >
              <Phone className="h-5 w-5" />
              {CONTACT_INFO.phoneFormatted}
            </a>
          </div>
          <ContactForm services={services} />
        </div>
      </section>
    </>
  );
}
