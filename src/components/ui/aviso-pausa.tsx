import { WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { I693_AVISO, I693_PAUSADO } from "@/lib/pausas";

export function AvisoPausaI693({ locale, className = "" }: { locale: string; className?: string }) {
  if (!I693_PAUSADO) return null;
  const aviso = locale === "en" ? I693_AVISO.en : I693_AVISO.es;
  return (
    <div
      role="note"
      className={`flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900 ${className}`}
    >
      <WarningCircle className="size-6 shrink-0 mt-0.5" weight="fill" aria-hidden="true" />
      <p className="text-base leading-relaxed">
        <strong>{aviso.label}:</strong> {aviso.text}
      </p>
    </div>
  );
}
