"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import {
  PromotionDialog,
  type PromotionDialogContact,
  type PromotionDialogLabels,
} from "@/components/promotions/promotion-dialog";
import type { PromotionCardData } from "@/types";

export interface PromotionsCarouselLabels extends PromotionDialogLabels {
  viewPromo: string;
  swipeHint: string;
  prev: string;
  next: string;
}

export function PromotionsCarousel({
  promotions,
  labels,
  contact,
  formHref,
}: {
  promotions: PromotionCardData[];
  labels: PromotionsCarouselLabels;
  contact: PromotionDialogContact;
  formHref: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 4500, stopOnInteraction: false }),
  ]);
  const [active, setActive] = useState<PromotionCardData | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const dialogLabels: PromotionDialogLabels = {
    priceLabel: labels.priceLabel,
    includesLabel: labels.includesLabel,
    ctaCall: labels.ctaCall,
    ctaDirections: labels.ctaDirections,
    ctaForm: labels.ctaForm,
    close: labels.close,
  };

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y py-2">
          {promotions.map((promo) => (
            <div
              key={promo.slug}
              className="min-w-0 shrink-0 grow-0 basis-[82%] px-2.5 sm:basis-1/2 lg:basis-1/3"
            >
              <button
                type="button"
                onClick={() => setActive(promo)}
                aria-label={labels.viewPromo + ": " + promo.title}
                className="group relative block w-full overflow-hidden rounded-2xl border border-blue-deep/10 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-red-accent/50 hover:shadow-lg hover:shadow-red-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-accent focus-visible:ring-offset-2"
              >
                {/* Flyer limpio (sin badges superpuestos: el diseño ya los trae) */}
                <div className="relative aspect-4/5 overflow-hidden bg-slate-light">
                  <Image
                    src={promo.image}
                    alt={promo.alt}
                    fill
                    sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay "Ver promoción" al hover/focus */}
                  <span className="absolute inset-0 flex items-end justify-center bg-linear-to-t from-blue-deep/70 via-blue-deep/0 to-blue-deep/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 font-heading text-sm font-bold text-blue-dark shadow-md">
                      <Plus className="h-4 w-4 text-red-accent" />
                      {labels.viewPromo}
                    </span>
                  </span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Flechas laterales (desktop) */}
      <button
        type="button"
        onClick={scrollPrev}
        aria-label={labels.prev}
        className="absolute -left-3 top-[calc(50%-1.5rem)] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-blue-deep/10 bg-white text-blue-dark shadow-md transition-colors hover:bg-sky-bg hover:text-red-accent lg:inline-flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        aria-label={labels.next}
        className="absolute -right-3 top-[calc(50%-1.5rem)] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-blue-deep/10 bg-white text-blue-dark shadow-md transition-colors hover:bg-sky-bg hover:text-red-accent lg:inline-flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Controles deslizar + pista (siempre visibles) */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label={labels.prev}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-blue-deep/10 bg-white text-blue-dark shadow-sm transition-colors hover:bg-sky-bg hover:text-red-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-accent lg:hidden"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <p className="text-sm text-slate-muted">{labels.swipeHint}</p>
        <button
          type="button"
          onClick={scrollNext}
          aria-label={labels.next}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-blue-deep/10 bg-white text-blue-dark shadow-sm transition-colors hover:bg-sky-bg hover:text-red-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-accent lg:hidden"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <PromotionDialog
        promo={active}
        labels={dialogLabels}
        contact={contact}
        formHref={formHref}
        onClose={() => setActive(null)}
      />
    </div>
  );
}
