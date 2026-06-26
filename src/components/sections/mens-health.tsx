import { Activity, ArrowRight, HeartPulse, Mars, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/animations/reveal";
import { ctaButton } from "@/lib/button-styles";
import { cn } from "@/lib/utils";

export function MensHealth() {
  const t = useTranslations("MensHealth");
  const conditions = [
    { icon: Mars, label: t("cond1"), desc: t("cond1d") },
    { icon: Activity, label: t("cond2"), desc: t("cond2d") },
    { icon: HeartPulse, label: t("cond3"), desc: t("cond3d") },
    { icon: ShieldCheck, label: t("cond4"), desc: t("cond4d") },
  ];

  return (
    <section id="salud-hombre" className="scroll-mt-24 bg-blue-deep py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Motivo decorativo de cruz medica */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 text-sky-bg/10 cross-pattern"
        />
        <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <p className="eyebrow text-teal-light!">{t("eyebrow")}</p>
              <h2 className="mt-4 max-w-xl font-heading text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                {t("title")}
              </h2>
              <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-sky-bg/85">
                {t("body")}
              </p>
              <Link
                href="/services/salud-hombre"
                className={cn(ctaButton({ variant: "white", size: "lg" }), "mt-9")}
              >
                {t("cta")}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {conditions.map((c) => (
                <li
                  key={c.label}
                  className="rounded-2xl border border-sky-bg/15 bg-sky-bg/5 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-teal-light/40 hover:bg-sky-bg/10"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-bg/10 text-teal-light">
                    <c.icon className="h-6 w-6" />
                  </span>
                  <p className="mt-5 font-heading text-base font-semibold leading-snug text-white">
                    {c.label}
                  </p>
                  <p className="mt-1.5 font-sans text-sm leading-relaxed text-sky-bg/70">
                    {c.desc}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
