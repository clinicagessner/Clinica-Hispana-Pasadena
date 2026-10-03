"use client";

import { useEffect } from "react";

// Eventos clave de GA4 de la red: `llamada` (clic en tel:), `whatsapp` (clic en
// wa.me / WhatsApp) y `formulario` (envío correcto del formulario de contacto,
// desde contact-form). Se marcan como clave en GA4; sin ellos las conversiones
// salían a 0.
//
// Un solo listener delegado en document: cubre todos los enlaces (header, CTA,
// botón flotante, footer, páginas de servicio) sin tocar cada componente.
// Si gtag.js aún no ha cargado (lazyOnload), el evento queda en dataLayer y se
// envía al inicializarse.

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;
  if (typeof w.gtag !== "function") {
    w.dataLayer = w.dataLayer || [];
    // gtag.js solo procesa objetos `arguments`, no arrays: misma forma que el snippet oficial.
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
  }
  w.gtag("event", name, params);
}

const WHATSAPP = /(^whatsapp:|wa\.me\/|whatsapp\.com\/)/i;

export function ConversionEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const link = target?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const params = { link_url: href, page_path: window.location.pathname };
      if (href.startsWith("tel:")) trackEvent("llamada", params);
      else if (WHATSAPP.test(href)) trackEvent("whatsapp", params);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
