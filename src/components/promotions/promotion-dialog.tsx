"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";
import { Check, MapPin, Phone, SquarePen, X } from "lucide-react";
import { ctaButton } from "@/lib/button-styles";
import { cn } from "@/lib/utils";
import type { PromotionCardData } from "@/types";

export interface PromotionDialogLabels {
  priceLabel: string;
  includesLabel: string;
  ctaCall: string;
  ctaDirections: string;
  ctaForm: string;
  close: string;
}

export interface PromotionDialogContact {
  phone: string;
  phoneFormatted: string;
  googleMapsUrl: string;
}

export function PromotionDialog({
  promo,
  labels,
  contact,
  formHref,
  onClose,
}: {
  promo: PromotionCardData | null;
  labels: PromotionDialogLabels;
  contact: PromotionDialogContact;
  /** Ancla del formulario en la página actual (#contacto en home, #lead-form en la page). */
  formHref: string;
  onClose: () => void;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const open = promo !== null;

  // Escape para cerrar + bloquear scroll del body mientras está abierto.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Enfocar el botón cerrar al abrir.
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!promo) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-blue-deep/70 p-4 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        // Una sola columna scrollable en TODOS los tamaños (no se corta en desktop).
        className="my-auto flex max-h-[90vh] w-full max-w-md flex-col overflow-y-auto rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Flyer completo, sin recorte */}
        <div className="relative shrink-0">
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-t-3xl bg-slate-light">
            <Image
              src={promo.image}
              alt={promo.alt}
              fill
              sizes="(max-width: 640px) 100vw, 28rem"
              className="object-cover"
            />
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={labels.close}
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-dark shadow-sm transition-colors hover:bg-white hover:text-red-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-accent"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-5 p-6 sm:p-7">
          <div>
            <h2
              id={titleId}
              className="font-heading text-2xl font-black leading-tight tracking-tight text-slate-dark"
            >
              {promo.title}
            </h2>
            {promo.price && (
              <p className="mt-2 flex items-baseline gap-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-muted">
                  {labels.priceLabel}
                </span>
                <span className="font-heading text-3xl font-black leading-none text-red-accent">
                  {promo.price}
                </span>
              </p>
            )}
            <p className="mt-3 text-base leading-relaxed text-slate-primary">
              {promo.blurb}
            </p>
          </div>

          {promo.includes.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-red-accent">
                {labels.includesLabel}
              </p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {promo.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/12 text-success">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm leading-relaxed text-slate-primary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 3 CTAs contextuales */}
          <div className="flex flex-col gap-2.5 border-t border-blue-deep/10 pt-5">
            <a
              href={`tel:${contact.phone}`}
              aria-label={`${labels.ctaCall} ${contact.phoneFormatted} — ${promo.title}`}
              className={cn(ctaButton({ variant: "red", size: "md" }), "w-full")}
            >
              <Phone className="h-4 w-4" />
              {labels.ctaCall}
            </a>
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(ctaButton({ variant: "outline", size: "md" }))}
              >
                <MapPin className="h-4 w-4" />
                {labels.ctaDirections}
              </a>
              <a
                href={formHref}
                onClick={onClose}
                className={cn(ctaButton({ variant: "primary", size: "md" }))}
              >
                <SquarePen className="h-4 w-4" />
                {labels.ctaForm}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
