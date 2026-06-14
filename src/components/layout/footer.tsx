import { useLocale, useTranslations } from "next-intl";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import {
  FacebookLogo,
  InstagramLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/shared/logo";
import { ScrollLink } from "@/components/shared/scroll-link";
import {
  CONTACT_INFO,
  FOOTER_NAV_LINKS,
  SITE_CONFIG,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { getAllServices } from "@/lib/services";
import { getLocalizedService } from "@/lib/utils";
import type { Locale } from "@/types";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();
  const services = getAllServices()
    .slice(0, 6)
    .map((s) => getLocalizedService(s, locale));

  return (
    <footer className="relative overflow-hidden bg-blue-deep text-sky-alt">
      <div
        aria-hidden="true"
        className="cross-pattern pointer-events-none absolute -top-16 right-0 h-64 w-xl text-teal-light/20"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Marca */}
          <div className="lg:col-span-4">
            <div className="w-fit rounded-xl bg-white px-4 py-3 ring-1 ring-white/20">
              <Logo />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-sky-bg/80">
              {t("tagline")}
            </p>
            {(SOCIAL_LINKS.facebook || SOCIAL_LINKS.instagram) && (
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-teal-light">
                  {t("followUs")}
                </p>
                <div className="mt-2 flex gap-3">
                  {SOCIAL_LINKS.facebook && (
                    <a
                      href={SOCIAL_LINKS.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/10 transition-colors hover:bg-teal hover:text-blue-deep"
                    >
                      <FacebookLogo className="h-4 w-4" weight="fill" />
                    </a>
                  )}
                  {SOCIAL_LINKS.instagram && (
                    <a
                      href={SOCIAL_LINKS.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/10 transition-colors hover:bg-teal hover:text-blue-deep"
                    >
                      <InstagramLogo className="h-4 w-4" weight="fill" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navegación */}
          <nav className="lg:col-span-2" aria-label={t("navTitle")}>
            <h2 className="inline-block border-b-2 border-red-accent pb-1.5 font-heading text-sm font-bold uppercase tracking-widest text-white">
              {t("navTitle")}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-sky-bg/80 hover:text-teal-light">
                  {tNav("home")}
                </Link>
              </li>
              {FOOTER_NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <ScrollLink
                    href={link.href}
                    className="text-sky-bg/80 hover:text-teal-light"
                  >
                    {tNav(link.key)}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Servicios */}
          <nav className="lg:col-span-3" aria-label={t("servicesTitle")}>
            <h2 className="inline-block border-b-2 border-red-accent pb-1.5 font-heading text-sm font-bold uppercase tracking-widest text-white">
              {t("servicesTitle")}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sky-bg/80 hover:text-teal-light"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div className="lg:col-span-3">
            <h2 className="inline-block border-b-2 border-red-accent pb-1.5 font-heading text-sm font-bold uppercase tracking-widest text-white">
              {t("contactTitle")}
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                <span className="text-sky-bg/80">
                  {CONTACT_INFO.address}, {CONTACT_INFO.city},{" "}
                  {CONTACT_INFO.state} {CONTACT_INFO.zip}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-teal" />
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-sky-bg/80 hover:text-teal-light"
                >
                  {CONTACT_INFO.phoneFormatted}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-teal" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="break-all text-sky-bg/80 hover:text-teal-light"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                <span className="text-sky-bg/80">
                  {locale === "en" ? CONTACT_INFO.hoursEn : CONTACT_INFO.hours}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer médico */}
        <p className="mt-12 border-t border-white/10 pt-6 text-xs leading-relaxed text-sky-bg/60">
          {t("disclaimer")}
        </p>

        {/* Barra legal */}
        <div className="mt-4 flex flex-col items-start justify-between gap-3 text-xs text-sky-bg/60 sm:flex-row sm:items-center">
          <p>
            © {year} {SITE_CONFIG.name}. {t("rights")}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>
              {t("developedBy")}{" "}
              <a
                href="https://rcweb.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-sky-bg/80 hover:text-teal-light"
              >
                RC Web Solutions LLC
              </a>
            </p>
            <Link href="/privacy" className="hover:text-teal-light">
              {t("privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
