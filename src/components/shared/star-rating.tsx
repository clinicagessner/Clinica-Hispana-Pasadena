import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Estrellas que se rellenan proporcionalmente al rating (p. ej. 4.9 → ~98%).
 * Dos capas alineadas: base (estrellas vacías) + relleno dorado recortado por
 * ancho = rating/5. Se actualiza solo según el promedio real de Google.
 */
export function StarRating({
  rating,
  starClassName = "h-4 w-4",
  gapClassName = "gap-0.5",
  className,
}: {
  rating: number;
  starClassName?: string;
  gapClassName?: string;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  return (
    <span
      className={cn("relative inline-flex w-max", className)}
      role="img"
      aria-label={`${rating.toFixed(1)} de 5 estrellas`}
    >
      {/* Base: estrellas vacías (contorno tenue) */}
      <span className={cn("flex text-slate-light", gapClassName)} aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={cn("shrink-0 fill-current", starClassName)} />
        ))}
      </span>
      {/* Relleno: estrellas doradas recortadas al porcentaje del rating */}
      <span
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${pct}%` }}
        aria-hidden
      >
        <span className={cn("flex w-max text-warning", gapClassName)}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn("shrink-0 fill-current", starClassName)}
            />
          ))}
        </span>
      </span>
    </span>
  );
}
