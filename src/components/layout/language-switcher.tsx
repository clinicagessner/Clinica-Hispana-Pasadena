"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

// Enlaces reales (<a href>) en vez de router.replace: los rastreadores no
// ejecutan onClick, y sin href ninguna página en español enlazaba a su versión
// /en. El href se construye a mano porque con localePrefix "as-needed" el
// español va sin prefijo y el Link de next-intl con locale="es" genera /es/...
// (redirección 307).
function localizedHref(pathname: string, locale: string) {
  if (locale === routing.defaultLocale) return pathname;
  return pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-blue-light bg-white p-0.5 text-xs font-semibold",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((l) => (
        <Link
          key={l}
          href={localizedHref(pathname, l)}
          replace
          hrefLang={l}
          aria-current={l === locale ? "true" : undefined}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors",
            l === locale
              ? "bg-blue-dark text-white"
              : "text-slate-muted hover:text-blue-dark",
          )}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
