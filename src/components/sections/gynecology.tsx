import { ArrowRight, Check, Flower2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/animations/reveal";
import { ctaButton } from "@/lib/button-styles";
import { cn } from "@/lib/utils";

export function Gynecology() {
  const t = useTranslations("Gynecology");
  const points = [t("point1"), t("point2"), t("point3")];

  return (
    <section id="ginecologia" className="scroll-mt-24 bg-sand-bg py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Lado imagen / marco editorial */}
          <Reveal>
            <div className="relative">
              {/* Marco decorativo desfasado */}
              <div
                aria-hidden
                className="pointer-events-none absolute -left-4 -top-4 h-full w-full rounded-3xl border border-teal/30"
              />
              <div className="relative overflow-hidden rounded-3xl border border-blue-deep/10 bg-sand-alt shadow-xl shadow-blue-deep/10">
                {/* Motivo de cruz médica */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 text-teal/15 cross-pattern"
                />
                <div className="relative flex flex-col items-start gap-6 p-10 sm:p-12">
                  <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-teal text-white shadow-md">
                    <Flower2 className="h-10 w-10" />
                  </span>
                  <ul className="space-y-4">
                    {points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-bg text-teal-deep">
                          <Check className="h-4 w-4" />
                        </span>
                        <span className="text-base font-medium text-slate-dark">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Lado texto */}
          <Reveal delay={120}>
            <div>
              <p className="eyebrow">{t("eyebrow")}</p>
              <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight tracking-tight text-slate-dark sm:text-4xl lg:text-[2.75rem]">
                <span className="ink-underline">{t("title")}</span>
              </h2>
              <p className="mt-6 max-w-lg font-sans text-lg leading-relaxed text-slate-primary">
                {t("body")}
              </p>
              <Link
                href="/services/ginecologia"
                className={cn(ctaButton({ variant: "primary", size: "lg" }), "mt-9")}
              >
                {t("cta")}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
