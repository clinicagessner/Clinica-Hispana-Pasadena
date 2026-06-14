import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "@/i18n/config";

export const routing = defineRouting({
  locales,
  defaultLocale,
  // URLs en español sin prefijo; inglés con /en/...
  localePrefix: "as-needed",
  // Español SIEMPRE por defecto: no autodetectar el idioma del navegador.
  // El inglés solo se sirve si el usuario lo elige (switcher → /en o cookie).
  localeDetection: false,
});
