import { getLocale, getTranslations } from "next-intl/server";
import { ShieldCheck } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Locale } from "@/types";

// Caja de autoría y revisión (E-E-A-T): quién responde por el contenido y
// cuándo se revisó, con <time> legible por máquinas. No hay médico nombrado:
// el cliente decidió atribuirlo al equipo médico de la clínica.
export async function MedicalReview({
  published,
  updated,
}: {
  published?: string;
  updated: string;
}) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("MedicalReview");
  return (
    <aside
      aria-label={t("reviewedBy")}
      className="mt-10 flex gap-4 rounded-2xl border border-blue-deep/10 bg-sand-bg p-5 text-sm text-slate-primary"
    >
      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal-deep" aria-hidden />
      <div className="space-y-1">
        <p className="font-semibold text-ink">{t("reviewedBy")}</p>
        <p className="flex flex-wrap gap-x-4 gap-y-1">
          {published && (
            <span>
              {t("published", { date: "" })}
              <time dateTime={published}>{formatDate(published, locale)}</time>
            </span>
          )}
          <span>
            {t("updated", { date: "" })}
            <time dateTime={updated}>{formatDate(updated, locale)}</time>
          </span>
        </p>
        <p className="text-slate-muted">{t("disclaimer")}</p>
      </div>
    </aside>
  );
}
