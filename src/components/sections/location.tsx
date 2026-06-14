import Image from "next/image";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/animations/reveal";
import { CONTACT_INFO } from "@/lib/constants";
import { ctaButton } from "@/lib/button-styles";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

export function Location() {
  const t = useTranslations("Location");
  const locale = useLocale() as Locale;
  const en = locale === "en";

  return (
    <section className="relative overflow-hidden bg-blue-deep py-20 lg:py-28">
      {/* Patrón sutil de cruz médica para textura editorial sobre el navy */}
      <div
        aria-hidden
        className="cross-pattern pointer-events-none absolute inset-0 text-sky-bg/6"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow text-teal-light!">{t("eyebrow")}</p>
            <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
              {t("title")}
            </h2>
            <div className="mt-5 h-px w-24 bg-teal-light/50" />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Columna de info: tarjetas editoriales sobre el navy */}
          <Reveal className="lg:col-span-5">
            <div className="flex h-full flex-col gap-4">
              <InfoCard
                icon={<MapPin className="h-5 w-5" />}
                label={t("addressLabel")}
              >
                {CONTACT_INFO.address}
                <br />
                {CONTACT_INFO.city}, {CONTACT_INFO.state} {CONTACT_INFO.zip}
              </InfoCard>

              <InfoCard
                icon={<Clock className="h-5 w-5" />}
                label={t("hoursLabel")}
              >
                {en
                  ? CONTACT_INFO.hoursWeekday.replace(
                      "Lunes a Viernes",
                      "Mon–Fri",
                    )
                  : CONTACT_INFO.hoursWeekday}
                <br />
                {en
                  ? CONTACT_INFO.hoursWeekend.replace(
                      "Sábado y Domingo",
                      "Sat–Sun",
                    )
                  : CONTACT_INFO.hoursWeekend}
              </InfoCard>

              <InfoCard
                icon={<Phone className="h-5 w-5" />}
                label={t("phoneLabel")}
              >
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="transition-colors hover:text-teal-light"
                >
                  {CONTACT_INFO.phoneFormatted}
                </a>
              </InfoCard>

              <InfoCard
                icon={<Mail className="h-5 w-5" />}
                label={t("emailLabel")}
              >
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="break-all transition-colors hover:text-teal-light"
                >
                  {CONTACT_INFO.email}
                </a>
              </InfoCard>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className={cn(ctaButton({ variant: "white", size: "md" }), "flex-1")}
                >
                  <Phone className="h-4 w-4" />
                  {t("callCta")}
                </a>
                <a
                  href={CONTACT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    ctaButton({ variant: "gold", size: "md" }),
                    "flex-1",
                  )}
                >
                  <Navigation className="h-4 w-4" />
                  {t("directionsCta")}
                </a>
              </div>
            </div>
          </Reveal>

          {/* Columna derecha: foto de la clínica + mapa embed */}
          <Reveal delay={120} className="lg:col-span-7">
            <div className="flex h-full flex-col gap-6">
              {/* Foto del exterior de la clínica */}
              <div className="overflow-hidden rounded-2xl border border-white/15">
                <Image
                  src="/images/clinica-exterior.webp"
                  alt={`Fachada de Clínica Hispana Nueva Salud Pasadena en ${CONTACT_INFO.address}, ${CONTACT_INFO.city}, ${CONTACT_INFO.state}`}
                  width={1360}
                  height={1020}
                  sizes="(max-width: 1024px) 100vw, 720px"
                  className="h-52 w-full object-cover sm:h-64"
                />
              </div>

              {/* Mapa (iframe gratis, sin API key) */}
              <div className="flex-1 overflow-hidden rounded-2xl border border-white/15">
                <iframe
                  src={CONTACT_INFO.googleMapsEmbed}
                  title={t("mapTitle")}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full min-h-72 w-full"
                  allowFullScreen
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-light/15 text-teal-light">
        {icon}
      </span>
      <div>
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sky-bg/60">
          {label}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-sky-bg">{children}</p>
      </div>
    </div>
  );
}
