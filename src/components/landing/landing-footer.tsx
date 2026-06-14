import { MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CONTACT_INFO, SITE_CONFIG } from "@/lib/constants";

export function LandingFooter() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-blue-deep py-10 text-sky-bg/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="font-heading text-lg font-bold text-white">
            {SITE_CONFIG.name}
          </p>
          <div className="flex flex-col items-center gap-2 text-sm sm:flex-row sm:gap-6">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-teal" />
              {CONTACT_INFO.address}, {CONTACT_INFO.city}, {CONTACT_INFO.state}{" "}
              {CONTACT_INFO.zip}
            </span>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <Phone className="h-4 w-4 text-teal" />
              {CONTACT_INFO.phoneFormatted}
            </a>
          </div>
          <p className="mt-2 max-w-xl text-xs text-sky-bg/50">
            {t("disclaimer")}
          </p>
          <div className="mt-2 flex items-center gap-4 text-xs text-sky-bg/50">
            <span>
              © {year} {SITE_CONFIG.name}.
            </span>
            <Link href="/privacy" className="hover:text-white">
              {t("privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
