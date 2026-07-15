import Image from "next/image";
import {
  ArrowRight,
  Check,
  Clock,
  Navigation,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { getTranslations } from "next-intl/server";
import { CONTACT_INFO } from "@/lib/constants";
import { getGooglePlaceData } from "@/lib/google-places";
import { StarRating } from "@/components/shared/star-rating";

export async function Hero() {
  const [t, tc, place] = await Promise.all([
    getTranslations("Hero"),
    getTranslations("Common"),
    getGooglePlaceData(),
  ]);

  // WhatsApp usa su número dedicado (exclusivo para chat): nunca el principal
  // ni el de tracking. No se muestra como texto visible para que swap.js de
  // CallRail no lo intercambie y nadie intente llamar a un número que no
  // recibe llamadas.
  const whatsappHref = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(tc("whatsappMessage"))}`;

  return (
    <section
      data-hero
      className="relative isolate flex min-h-[88vh] items-center overflow-hidden"
    >
      {/* Fachada real de la clínica como fondo full-bleed */}
      <Image
        src="/images/hero-bg.webp"
        alt="Fachada de Clínica Hispana Nueva Salud Pasadena en 1101 Spencer Hwy, South Houston, TX"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover object-center"
      />
      {/* Overlay navy con peso a la izquierda para legibilidad del texto */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-blue-deep/95 via-blue-deep/80 to-blue-deep/45"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-blue-deep/70 via-transparent to-blue-deep/30"
      />
      {/* Motivo de cruz médica difuminado */}
      <div
        aria-hidden
        className="cross-pattern pointer-events-none absolute -right-16 top-10 -z-10 h-104 w-104 text-white/10"
      />

      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <span className="eyebrow text-teal-light!">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {t("openToday")} · {CONTACT_INFO.city}, TX
          </span>

          <h1 className="mt-5 font-heading text-[2.9rem] font-black leading-[0.98] tracking-tight text-white drop-shadow-sm sm:text-6xl lg:text-[4.3rem]">
            {t("titleLead")}{" "}
            <span className="text-teal-light">{t("titleHighlight")}</span>
            <span className="mt-3 block text-2xl font-semibold text-sky-bg/90 sm:text-3xl">
              {t("titleTail")}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-sky-bg/90">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              aria-label={`${t("ctaCall")} ${CONTACT_INFO.phoneFormatted}`}
              className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-xl bg-red-accent px-7 font-heading text-base font-semibold text-white shadow-xl shadow-red-accent/30 transition-all duration-200 hover:bg-red-dark hover:shadow-2xl hover:shadow-red-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-deep"
            >
              <Phone className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110" />
              <span className="whitespace-nowrap">
                {t("callShort")} · {CONTACT_INFO.phoneDisplay}
              </span>
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tc("whatsapp")}
              className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-xl bg-whatsapp px-7 font-heading text-base font-semibold text-white shadow-xl shadow-whatsapp/30 transition-all duration-200 hover:bg-whatsapp-dark hover:shadow-2xl hover:shadow-whatsapp/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-deep"
            >
              <WhatsappLogoIcon
                weight="fill"
                className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110"
              />
              {t("ctaWhatsapp")}
            </a>
            <a
              href={CONTACT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-7 font-heading text-base font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-deep"
            >
              <Navigation className="h-5 w-5 shrink-0" />
              {t("ctaDirections")}
            </a>
          </div>

          {/* Alternativa de contacto: enlace al formulario */}
          <a
            href="#contacto"
            className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-sky-bg/90 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-deep"
          >
            {t("contactPrefer")}{" "}
            <span className="font-semibold text-teal-light underline-offset-4 group-hover:underline">
              {t("contactWrite")}
            </span>
            <ArrowRight className="h-4 w-4 text-teal-light transition-transform group-hover:translate-x-1" />
          </a>

          {/* Reseñas + chips de confianza */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="inline-flex items-center gap-2">
              <StarRating rating={place.averageRating} />
              <span className="text-sm font-semibold text-white">
                {place.averageRating.toFixed(1)}
                <span className="ml-1 font-normal text-sky-bg/75">
                  ({tc("ratingSummary", { count: place.totalReviews })})
                </span>
              </span>
            </div>
            <span className="hidden h-4 w-px bg-white/25 sm:block" />
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-white/90">
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-teal-light" />
                {t("trustWalkIn")}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-teal-light" />
                {t("trustInsurance")}
              </span>
            </div>
          </div>

          {/* Badge de horario */}
          <div className="mt-9 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-light/20 text-teal-light">
              <Clock className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-heading text-sm font-bold text-white">
                {t("openToday")}
              </span>
              <span className="block text-xs text-sky-bg/80">
                {t("hoursLine")}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
