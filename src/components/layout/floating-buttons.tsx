"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Navigation, Phone } from "lucide-react";
import { WhatsappLogoIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { CONTACT_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FloatingButtons() {
  const t = useTranslations("Floating");
  const tc = useTranslations("Common");
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 480);
      // Los CTAs aparecen al entrar la sección que sigue al hero. Se consulta
      // el hero en cada scroll (y no una sola vez al montar) porque este
      // componente vive en el layout y sobrevive a la navegación entre
      // páginas con y sin hero. En páginas sin hero son visibles siempre.
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      setPastHero(hero ? window.scrollY > hero.offsetHeight - 96 : true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // WhatsApp usa su número dedicado (exclusivo para chat): nunca el principal
  // ni el de tracking. No se muestra como texto visible para que swap.js de
  // CallRail no lo intercambie y nadie intente llamar a un número que no
  // recibe llamadas.
  const whatsappHref = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(tc("whatsappMessage"))}`;

  return (
    <>
      {/* Volver arriba — lado izquierdo, aparece al hacer scroll */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={t("backToTop")}
        className={cn(
          "fixed bottom-5 left-4 z-40 flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-deep/10 bg-white text-blue-dark shadow-md transition-all duration-300 hover:bg-sand-bg hover:text-red-accent sm:bottom-6 sm:left-6",
          scrolled
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {/* CTAs — lado derecho, aparecen a partir de la sección tras el hero */}
      <div
        className={cn(
          "pointer-events-none fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 transition-all duration-300 sm:bottom-6 sm:right-6",
          pastHero
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-3 opacity-0",
        )}
      >
        {/* Cómo llegar — círculo en móvil, pastilla con texto en escritorio */}
        <a
          href={CONTACT_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("directions")}
          className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-dark font-heading text-sm font-semibold text-white shadow-lg shadow-blue-deep/30 ring-1 ring-white/10 transition-colors hover:bg-blue-deep sm:h-12 sm:w-auto sm:gap-2 sm:px-5"
        >
          <Navigation className="h-5 w-5 shrink-0" />
          <span className="hidden sm:inline">{t("directions")}</span>
        </a>

        {/* Llamar — círculo en móvil, pastilla con teléfono en escritorio */}
        <a
          href={`tel:${CONTACT_INFO.phone}`}
          aria-label={t("call")}
          className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-accent font-heading text-sm font-semibold text-white shadow-lg shadow-red-accent/30 ring-1 ring-white/10 transition-colors hover:bg-red-dark sm:h-12 sm:w-auto sm:gap-2 sm:px-5"
        >
          <Phone className="h-5 w-5 shrink-0" />
          <span className="hidden sm:inline">{CONTACT_INFO.phoneDisplay}</span>
        </a>

        {/* WhatsApp — círculo en móvil, pastilla con texto en escritorio */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("whatsapp")}
          className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-whatsapp font-heading text-sm font-semibold text-white shadow-lg shadow-whatsapp/30 ring-1 ring-white/10 transition-colors hover:bg-whatsapp-dark sm:h-12 sm:w-auto sm:gap-2 sm:px-5"
        >
          <WhatsappLogoIcon weight="fill" className="h-5 w-5 shrink-0" />
          <span className="hidden sm:inline">{t("whatsapp")}</span>
        </a>
      </div>
    </>
  );
}
