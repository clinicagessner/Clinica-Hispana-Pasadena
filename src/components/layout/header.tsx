"use client";

import { useEffect, useState } from "react";
import { Phone, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/shared/logo";
import { ScrollLink } from "@/components/shared/scroll-link";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { CONTACT_INFO } from "@/lib/constants";
import { NAV_LINKS } from "@/lib/constants";
import { ctaButton } from "@/lib/button-styles";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Sección in-page activa (scroll-spy) para resaltar el nav anclado (#contacto).
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    if (pathname !== "/") {
      setActiveHash("");
      return;
    }
    const ids = NAV_LINKS.filter((l) => l.href.startsWith("/#")).map(
      (l) => l.href.split("#")[1],
    );
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(entry.target.id);
          } else {
            setActiveHash((prev) => (prev === entry.target.id ? "" : prev));
          }
        });
      },
      // Una sección cuenta como "activa" cuando su centro cruza el centro
      // del viewport.
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return pathname === "/" && activeHash === href.split("#")[1];
    }
    const path = href.split("#")[0];
    if (!path || path === "/") return false;
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-blue-deep/10 bg-white/90 backdrop-blur supports-backdrop-filter:bg-white/75">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Clínica Hispana Nueva Salud Pasadena"
          className="shrink-0"
          onClick={(e) => {
            // En la home: ir al inicio (top) con scroll suave aunque estés
            // scrolleado en cualquier sección. En otras páginas: navega a "/".
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <Logo />
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          <NavItem
            href="/"
            label={t("home")}
            active={pathname === "/" && !activeHash}
          />
          {NAV_LINKS.map((link) => (
            <NavItem
              key={link.key}
              href={link.href}
              label={t(link.key)}
              active={isActive(link.href)}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            aria-label={`${t("callNow")} ${CONTACT_INFO.phoneFormatted}`}
            className={cn(
              ctaButton({ variant: "red", size: "sm" }),
              "hidden sm:inline-flex",
            )}
          >
            <Phone className="h-4 w-4" />
            {CONTACT_INFO.phoneDisplay}
          </a>

          {/* Mobile */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label={t("openMenu")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-blue-deep/15 text-blue-dark transition-colors hover:bg-sand-bg hover:text-red-accent lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Link
                    href="/"
                    aria-label="Inicio"
                    onClick={(e) => {
                      if (pathname === "/") {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                      setOpen(false);
                    }}
                  >
                    <Logo />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav
                className="mt-2 flex flex-col gap-1 px-4"
                aria-label="Móvil"
              >
                <Link
                  href="/"
                  onClick={(e) => {
                    if (pathname === "/") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                    setOpen(false);
                  }}
                  className="rounded-lg border-l-2 border-transparent px-3 py-3 font-heading text-lg font-semibold text-slate-dark transition-colors hover:border-red-accent hover:bg-sand-bg hover:text-blue-dark"
                >
                  {t("home")}
                </Link>
                {NAV_LINKS.map((link) => (
                  <MobileItem
                    key={link.key}
                    href={link.href}
                    label={t(link.key)}
                    onNavigate={() => setOpen(false)}
                  />
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-3 px-4">
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className={cn(
                    ctaButton({ variant: "red", size: "md" }),
                    "w-full",
                  )}
                >
                  <Phone className="h-4 w-4" />
                  {CONTACT_INFO.phoneDisplay}
                </a>
                <LanguageSwitcher className="self-start" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function NavItem({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <ScrollLink
      href={href}
      className={cn(
        "group relative px-3.5 py-2 text-sm font-medium transition-colors",
        active ? "text-blue-dark" : "text-slate-primary hover:text-blue-dark",
      )}
    >
      {label}
      <span
        className={cn(
          "absolute inset-x-3.5 bottom-1 h-0.5 origin-left rounded-full transition-transform duration-200 ease-out",
          active
            ? "scale-x-100 bg-red-accent"
            : "scale-x-0 bg-teal group-hover:scale-x-100",
        )}
      />
    </ScrollLink>
  );
}

function MobileItem({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate: () => void;
}) {
  return (
    <ScrollLink
      href={href}
      onNavigate={onNavigate}
      className="rounded-lg border-l-2 border-transparent px-3 py-3 font-heading text-lg font-semibold text-slate-dark transition-colors hover:border-red-accent hover:bg-sand-bg hover:text-blue-dark"
    >
      {label}
    </ScrollLink>
  );
}
