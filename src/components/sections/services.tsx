import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/animations/reveal";
import { ServiceCard } from "@/components/services/service-card";
import { getServiceCardData } from "@/lib/services";
import { ctaButton } from "@/lib/button-styles";
import { cn } from "@/lib/utils";
import type { Locale, ServiceCardData } from "@/types";

// En el home solo se destacan estos 3; el catálogo completo vive en /services.
const HOME_SERVICE_SLUGS = [
  "condiciones-cronicas",
  "ginecologia",
  "examenes-sangre",
];

export function Services() {
  const t = useTranslations("Services");
  const locale = useLocale() as Locale;
  const bySlug = new Map(
    getServiceCardData(locale).map((s) => [s.slug, s]),
  );
  const services = HOME_SERVICE_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (s): s is ServiceCardData => Boolean(s),
  );

  return (
    <section id="servicios" className="relative overflow-hidden scroll-mt-24 bg-white py-20 lg:py-28">
      {/* Patrón de cruz médica decorativo, esquina superior derecha */}
      <div
        aria-hidden
        className="cross-pattern pointer-events-none absolute -right-12 -top-12 h-64 w-64 text-blue-deep/6"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado editorial: rótulo + título serif grande */}
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 className="mt-5 font-heading text-4xl font-black leading-[1.05] tracking-tight text-slate-dark sm:text-5xl">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-primary">
              {t("subtitle")}
            </p>
          </Reveal>
        </div>

        {/* Grid de servicios */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 80}>
              <ServiceCard service={service} className="h-full" />
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/services"
            className={cn(ctaButton({ variant: "primary", size: "lg" }))}
          >
            {t("cta")}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
