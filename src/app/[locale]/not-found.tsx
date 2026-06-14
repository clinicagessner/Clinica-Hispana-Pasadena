import { Home } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ctaButton } from "@/lib/button-styles";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-cloud px-4 text-center">
      <span className="font-heading text-7xl font-extrabold text-blue-primary/30">
        404
      </span>
      <h1 className="mt-2 font-heading text-3xl font-extrabold text-slate-dark">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-md text-slate-primary">{t("body")}</p>
      <Link href="/" className={cn(ctaButton({ size: "lg" }), "mt-8")}>
        <Home className="h-5 w-5" />
        {t("cta")}
      </Link>
    </div>
  );
}
