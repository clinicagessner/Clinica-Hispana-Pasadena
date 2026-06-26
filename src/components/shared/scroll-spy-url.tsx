"use client";

import { useEffect } from "react";

/**
 * Refleja en la URL (#ancla) la sección visible mientras se hace scroll, sin
 * navegar ni saltar (history.replaceState). Cerca del top (hero) deja la URL
 * limpia. Observa todas las <section id> dentro de <main>, así que basta con
 * que cada sección tenga su id. Pensado para la home.
 */
export function ScrollSpyUrl() {
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;
    const sections = Array.from(
      main.querySelectorAll<HTMLElement>("section[id]"),
    );
    if (sections.length === 0) return;

    let frame = 0;
    let currentHash = window.location.hash;

    const update = () => {
      frame = 0;
      // La sección activa es la última cuyo borde superior ya cruzó una línea
      // imaginaria al 35% del alto del viewport.
      const line = window.innerHeight * 0.35;
      let activeId = "";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) activeId = section.id;
      }
      // Muy cerca del inicio (hero) → URL limpia.
      if (window.scrollY < 80) activeId = "";

      const nextHash = activeId ? `#${activeId}` : "";
      if (nextHash === currentHash) return;
      currentHash = nextHash;
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search + nextHash,
      );
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
