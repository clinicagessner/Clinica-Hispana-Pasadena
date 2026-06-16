import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ServiceIcon } from "@/components/shared/service-icon";
import { cn } from "@/lib/utils";
import type { ServiceCardData } from "@/types";

export function ServiceCard({
  service,
  className,
}: {
  service: ServiceCardData;
  className?: string;
}) {
  const t = useTranslations("Common");

  // Variante con foto: imagen arriba con marco, contenido editorial abajo.
  if (service.image) {
    return (
      <Link
        href={`/services/${service.slug}`}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-2xl border border-blue-deep/10 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-red-accent/50 hover:shadow-lg hover:shadow-red-accent/10",
          className,
        )}
      >
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-bg text-teal-deep shadow-sm">
            <ServiceIcon name={service.icon} />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-red-accent">
            {service.categoryLabel}
          </span>
          <h3 className="mt-2 font-heading text-xl font-extrabold leading-snug text-slate-dark">
            {service.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-primary">
            {service.shortDescription}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 border-t border-blue-deep/10 pt-4 text-sm font-semibold text-blue-dark">
            {t("learnMore")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    );
  }

  // Variante con icono (fallback mientras no haya foto).
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group relative flex flex-col rounded-2xl border border-blue-deep/10 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-red-accent/50 hover:shadow-lg hover:shadow-red-accent/10",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-bg text-teal-deep transition-colors group-hover:bg-teal group-hover:text-white">
          <ServiceIcon name={service.icon} />
        </span>
      </div>

      <span className="mt-5 text-xs font-semibold uppercase tracking-widest text-red-accent">
        {service.categoryLabel}
      </span>
      <h3 className="mt-2 font-heading text-xl font-extrabold leading-snug text-slate-dark">
        {service.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-primary">
        {service.shortDescription}
      </p>

      <span className="mt-5 inline-flex items-center gap-1.5 border-t border-blue-deep/10 pt-4 text-sm font-semibold text-blue-dark">
        {t("learnMore")}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
