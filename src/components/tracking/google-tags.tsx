"use client";

import { useEffect } from "react";

/**
 * GA4 y Google Ads (un solo gtag.js) y Meta Pixel se cargan con la PRIMERA
 * interacción del visitante (toque, clic, tecla o scroll), no al cargar la
 * página. Misma receta que Airline, Corazón y Vida y 529 (decisión del usuario,
 * 2026-10-03): en móvil sumaban ~1 s de bloqueo del hilo principal y la home
 * se quedaba por debajo de 70 en Lighthouse.
 *
 * Coste asumido: quien entra y sale sin tocar ni desplazar nada no se mide.
 * Las conversiones sí: para llamar, escribir o enviar el formulario hay que
 * tocar la página, y ese toque ya dispara la carga. `dataLayer` y `gtag`
 * existen desde el montaje, así que lo que se encole antes se envía al cargar.
 *
 * CallRail se queda en `lazyOnload` (layout): cambia el número visible y, si
 * llegara tarde, la llamada de un visitante de Ads iría al número sin rastrear.
 * IDs desde env: NEXT_PUBLIC_GOOGLE_ADS_ID, NEXT_PUBLIC_GA_ID y
 * NEXT_PUBLIC_META_PIXEL_ID. Se conserva el ID de GA4 como cargador, igual que antes de este cambio.
 */

const INTERACTION_EVENTS = ["pointerdown", "touchstart", "keydown", "scroll", "wheel"] as const;

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
};

type TagsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: Fbq;
  _fbq?: Fbq;
  __tagsLoaded?: boolean;
  __gtagConfigured?: boolean;
};

function loadScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadTags(w: TagsWindow, ids: string[], pixelId: string | undefined) {
  if (w.__tagsLoaded) return;
  w.__tagsLoaded = true;

  if (w.gtag && !w.__gtagConfigured) {
    w.__gtagConfigured = true;
    w.gtag("js", new Date());
    for (const id of ids) w.gtag("config", id);
  }
  if (ids[0]) loadScript(`https://www.googletagmanager.com/gtag/js?id=${ids[0]}`);

  if (pixelId && !w.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    } as Fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    w.fbq = fbq;
    w._fbq = fbq;
    loadScript("https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", pixelId);
    fbq("track", "PageView");
  }
}

export function GoogleTags() {
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  useEffect(() => {
    const w = window as TagsWindow;
    const ids = [gaId, adsId].filter(Boolean) as string[];
    w.dataLayer = w.dataLayer || [];
    if (typeof w.gtag !== "function") {
      w.gtag = function gtag() {
        // gtag.js espera el objeto `arguments`, no un array.
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer!.push(arguments);
      };
    }
    // `trackEvent` (conversion-events.tsx) también puede crear `gtag`; la
    // configuración (`js` + `config`) se hace una sola vez, en loadTags.
    if (w.__tagsLoaded) return;
    if (ids.length === 0 && !pixelId) return;

    const onFirstInteraction = () => {
      for (const e of INTERACTION_EVENTS) window.removeEventListener(e, onFirstInteraction);
      loadTags(w, ids, pixelId);
    };
    for (const e of INTERACTION_EVENTS) {
      window.addEventListener(e, onFirstInteraction, { once: true, passive: true });
    }
    return () => {
      for (const e of INTERACTION_EVENTS) window.removeEventListener(e, onFirstInteraction);
    };
  }, [adsId, gaId, pixelId]);

  return null;
}
