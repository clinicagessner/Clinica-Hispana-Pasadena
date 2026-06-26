"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  PromotionDialog,
  type PromotionDialogContact,
  type PromotionDialogLabels,
} from "@/components/promotions/promotion-dialog";
import { Reveal } from "@/components/animations/reveal";
import type { PromotionCardData } from "@/types";

export interface PromotionsGridLabels extends PromotionDialogLabels {
  viewDetail: string;
}

export function PromotionsGrid({
  promotions,
  labels,
  contact,
  formHref,
}: {
  promotions: PromotionCardData[];
  labels: PromotionsGridLabels;
  contact: PromotionDialogContact;
  formHref: string;
}) {
  const [active, setActive] = useState<PromotionCardData | null>(null);

  // Deep-link: /promociones#<slug> abre ese dialog. Limpiamos el hash de
  // inmediato (replaceState SÍNCRONO antes de abrir) para que cerrar no reabra.
  useEffect(() => {
    const slug = window.location.hash.replace(/^#/, "");
    if (!slug) return;
    const match = promotions.find((p) => p.slug === slug);
    if (!match) return;
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
    // Init de deep-link de una sola vez al montar (window no existe en SSR, así
    // que no puede hacerse en el render): abrir el dialog del slug del hash.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(match);
  }, [promotions]);

  const dialogLabels: PromotionDialogLabels = {
    priceLabel: labels.priceLabel,
    includesLabel: labels.includesLabel,
    ctaCall: labels.ctaCall,
    ctaDirections: labels.ctaDirections,
    ctaForm: labels.ctaForm,
    close: labels.close,
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {promotions.map((promo, i) => (
          <Reveal key={promo.slug} delay={(i % 4) * 70}>
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-blue-deep/10 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-red-accent/50 hover:shadow-lg hover:shadow-red-accent/10">
              <button
                type="button"
                onClick={() => setActive(promo)}
                aria-label={labels.viewDetail + ": " + promo.title}
                className="relative block aspect-4/5 overflow-hidden bg-slate-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-accent"
              >
                <Image
                  src={promo.image}
                  alt={promo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-heading text-lg font-extrabold leading-snug text-slate-dark">
                  {promo.title}
                </h3>
                {promo.price && (
                  <p className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-slate-muted">
                      {labels.priceLabel}
                    </span>
                    <span className="font-heading text-xl font-black leading-none text-red-accent">
                      {promo.price}
                    </span>
                  </p>
                )}
                {/* blurb completo en el DOM (line-clamp solo visual → indexable) */}
                <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-primary">
                  {promo.blurb}
                </p>
                <button
                  type="button"
                  onClick={() => setActive(promo)}
                  className="mt-4 inline-flex items-center gap-1.5 self-start border-t border-blue-deep/10 pt-4 text-sm font-semibold text-blue-dark transition-colors hover:text-red-accent"
                >
                  {labels.viewDetail}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <PromotionDialog
        promo={active}
        labels={dialogLabels}
        contact={contact}
        formHref={formHref}
        onClose={() => setActive(null)}
      />
    </>
  );
}
