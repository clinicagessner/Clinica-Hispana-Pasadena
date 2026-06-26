import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/animations/reveal";
import {
  PromotionsCarousel,
  type PromotionsCarouselLabels,
} from "@/components/promotions/promotions-carousel";
import { getPromotionCardData } from "@/lib/promotions";
import { CONTACT_INFO } from "@/lib/constants";
import { ctaButton } from "@/lib/button-styles";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

export function Promotions() {
  const t = useTranslations("Promotions");
  const locale = useLocale() as Locale;
  const promotions = getPromotionCardData(locale);

  const labels: PromotionsCarouselLabels = {
    viewPromo: t("viewPromo"),
    swipeHint: t("swipeHint"),
    prev: t("prev"),
    next: t("next"),
    priceLabel: t("priceLabel"),
    includesLabel: t("includesLabel"),
    ctaCall: t("ctaCall"),
    ctaDirections: t("ctaDirections"),
    ctaForm: t("ctaForm"),
    close: t("close"),
  };

  return (
    <section
      id="promociones"
      className="relative overflow-hidden bg-sand-bg py-20 scroll-mt-24 lg:py-28"
    >
      {/* Patrón de cruz médica decorativo, esquina inferior izquierda */}
      <div
        aria-hidden
        className="cross-pattern pointer-events-none absolute -bottom-12 -left-12 h-64 w-64 text-red-accent/6"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado centrado */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow justify-center">{t("eyebrow")}</span>
            <h2 className="mt-5 font-heading text-4xl font-black leading-[1.05] tracking-tight text-slate-dark sm:text-5xl">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 text-lg leading-relaxed text-slate-primary">
              {t("subtitle")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={160} className="mt-14">
          <PromotionsCarousel
            promotions={promotions}
            labels={labels}
            contact={{
              phone: CONTACT_INFO.phone,
              phoneFormatted: CONTACT_INFO.phoneFormatted,
              googleMapsUrl: CONTACT_INFO.googleMapsUrl,
            }}
            formHref="#contacto"
          />
        </Reveal>

        <div className="mt-12 flex justify-center">
          <Link
            href="/promociones"
            className={cn(ctaButton({ variant: "primary", size: "lg" }))}
          >
            {t("viewAll")}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
