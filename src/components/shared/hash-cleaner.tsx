"use client";

import { useEffect } from "react";

/**
 * Al llegar a una página con #ancla (p. ej. desde otra página vía /#contacto),
 * hace scroll al destino y LIMPIA el hash de la URL para no dejar /# colgado.
 */
export function HashCleaner() {
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    });
  }, []);

  return null;
}
