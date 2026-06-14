import { Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/shared/logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { CONTACT_INFO } from "@/lib/constants";
import { ctaButton } from "@/lib/button-styles";
import { cn } from "@/lib/utils";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-blue-light bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Link href="/" aria-label="Clínica Hispana Nueva Salud Pasadena">
          <Logo />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className={cn(ctaButton({ size: "sm" }))}
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">
              {CONTACT_INFO.phoneDisplay}
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
