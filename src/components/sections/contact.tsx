import { Mail, MapPin, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/animations/reveal";
import { ContactForm } from "@/components/forms/contact-form";
import { CONTACT_INFO } from "@/lib/constants";
import { getAllServices } from "@/lib/services";
import { getLocalizedService } from "@/lib/utils";
import type { Locale } from "@/types";

export function Contact() {
  const t = useTranslations("Contact");
  const locale = useLocale() as Locale;
  const services = getAllServices().map((s) => {
    const l = getLocalizedService(s, locale);
    return { value: l.slug, label: l.title };
  });

  return (
    <section
      id="contacto"
      className="relative isolate overflow-hidden scroll-mt-24 bg-sand-bg py-16 lg:py-24"
    >
      <div
        aria-hidden
        className="cross-pattern pointer-events-none absolute -right-24 top-0 -z-10 h-104 w-104 text-blue-deep/5"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Info */}
          <Reveal className="lg:col-span-5">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 className="mt-4 font-heading text-4xl font-black leading-[1.05] tracking-tight text-ink sm:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-muted">
              {t("subtitle")}
            </p>

            <ul className="mt-8 space-y-3">
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="group flex items-center gap-4 rounded-2xl border border-blue-deep/10 bg-white p-4 shadow-sm transition-colors hover:border-red-accent/40"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-red-bg text-red-accent transition-colors group-hover:bg-red-accent group-hover:text-white">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-widest text-slate-muted">
                      {t("orCall")}
                    </span>
                    <span className="font-heading text-lg font-bold text-ink">
                      {CONTACT_INFO.phoneFormatted}
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-4 rounded-2xl border border-blue-deep/10 bg-white p-4 shadow-sm">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-teal-bg text-teal-deep">
                  <Mail className="h-5 w-5" />
                </span>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="break-all font-medium text-slate-primary hover:text-blue-dark"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-4 rounded-2xl border border-blue-deep/10 bg-white p-4 shadow-sm">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-sky-bg text-blue-dark">
                  <MapPin className="h-5 w-5" />
                </span>
                <span className="font-medium text-slate-primary">
                  {CONTACT_INFO.address}, {CONTACT_INFO.city},{" "}
                  {CONTACT_INFO.state} {CONTACT_INFO.zip}
                </span>
              </li>
            </ul>
          </Reveal>

          {/* Formulario */}
          <Reveal delay={120} className="lg:col-span-7">
            <ContactForm services={services} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
