"use client";

import { Navigation, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { CONTACT_INFO } from "@/lib/constants";

export function LandingFloatingCall() {
  const t = useTranslations("Floating");

  return (
    <div className="pointer-events-none fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <a
        href={CONTACT_INFO.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("directions")}
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-dark font-heading text-sm font-semibold text-white shadow-lg shadow-blue-primary/25 transition-transform hover:scale-[1.03] sm:h-12 sm:w-auto sm:gap-2 sm:px-5"
      >
        <Navigation className="h-5 w-5 shrink-0" />
        <span className="hidden sm:inline">{t("directions")}</span>
      </a>
      <a
        href={`tel:${CONTACT_INFO.phone}`}
        aria-label={t("call")}
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-accent font-heading text-sm font-semibold text-white shadow-lg shadow-red-accent/30 transition-transform hover:scale-[1.03] sm:h-12 sm:w-auto sm:gap-2 sm:px-5"
      >
        <Phone className="h-5 w-5 shrink-0" />
        <span className="hidden sm:inline">{CONTACT_INFO.phoneDisplay}</span>
      </a>
    </div>
  );
}
