import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Marca de Clínica Hispana Nueva Salud Pasadena: logo real (insignia circular,
 * fondo transparente) + wordmark legible al lado. variant="light" para fondos
 * oscuros (navy).
 */
export function Logo({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "light";
}) {
  const isLight = variant === "light";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/logo-nueva-salud.webp"
        alt="Logo de Clínica Hispana Nueva Salud Pasadena"
        width={512}
        height={512}
        className="h-14 w-14 shrink-0 object-contain"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-[0.6rem] font-semibold uppercase tracking-[0.24em]",
            isLight ? "text-sky-alt" : "text-red-accent",
          )}
        >
          Clínica Hispana
        </span>
        <span
          className={cn(
            "font-heading text-lg font-extrabold tracking-tight",
            isLight ? "text-white" : "text-blue-dark",
          )}
        >
          Nueva Salud
        </span>
        <span
          className={cn(
            "font-heading text-[0.6rem] font-medium uppercase tracking-[0.2em]",
            isLight ? "text-sky-alt/80" : "text-teal-deep",
          )}
        >
          Pasadena
        </span>
      </span>
    </span>
  );
}
