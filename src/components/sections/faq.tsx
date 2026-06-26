import { Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/animations/reveal";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { JsonLdFaqPage } from "@/components/seo/json-ld";
import { HOME_FAQS } from "@/lib/home-faqs";
import { CONTACT_INFO } from "@/lib/constants";
import { getLocalizedFaq } from "@/lib/utils";
import { ctaButton } from "@/lib/button-styles";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

export function Faq() {
  const t = useTranslations("Faq");
  const locale = useLocale() as Locale;
  const faqs = HOME_FAQS.map((f) => getLocalizedFaq(f, locale));

  return (
    <section id="preguntas-frecuentes" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <JsonLdFaqPage faqs={faqs} />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Encabezado editorial a la izquierda */}
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2 className="mt-4 font-heading text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
              <span className="ink-underline">{t("title")}</span>
            </h2>
            <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-slate-primary">
              {t("subtitle")}
            </p>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className={cn(ctaButton({ variant: "red", size: "md" }), "mt-7")}
            >
              <Phone className="h-4 w-4" />
              {CONTACT_INFO.phoneDisplay}
            </a>
          </div>
        </Reveal>

        {/* Acordeón con items de borde fino a la derecha */}
        <Reveal delay={120} className="lg:col-span-7">
          <div className="frame-card px-6 py-2 sm:px-8">
            <FaqAccordion items={faqs} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
