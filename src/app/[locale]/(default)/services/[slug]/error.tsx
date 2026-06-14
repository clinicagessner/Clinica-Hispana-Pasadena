"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ctaButton } from "@/lib/button-styles";
import { cn } from "@/lib/utils";

export default function ServiceError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");
  const ts = useTranslations("ServiceDetail");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-cloud px-4 text-center">
      <h1 className="font-heading text-3xl font-extrabold text-slate-dark">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-md text-slate-primary">{t("body")}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button onClick={reset} className={cn(ctaButton({ size: "lg" }))}>
          <RefreshCw className="h-5 w-5" />
          {t("retry")}
        </button>
        <Link
          href="/services"
          className={cn(ctaButton({ variant: "outline", size: "lg" }))}
        >
          {ts("backToServices")}
        </Link>
      </div>
    </div>
  );
}
