"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ServiceCard } from "@/components/services/service-card";
import { Reveal } from "@/components/animations/reveal";
import { cn } from "@/lib/utils";
import type { ServiceCardData, ServiceCategory } from "@/types";

type Filter = "all" | ServiceCategory;

export function ServicesFilter({
  services,
  categories,
}: {
  services: ServiceCardData[];
  categories: { value: ServiceCategory; label: string }[];
}) {
  const t = useTranslations("ServicesPage");
  const [active, setActive] = useState<Filter>("all");

  const filtered =
    active === "all"
      ? services
      : services.filter((s) => s.category === active);

  return (
    <div>
      <div
        role="group"
        aria-label={t("filtersLabel")}
        className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-blue-deep/10 pb-5"
      >
        <span className="eyebrow text-blue-dark">{t("filtersLabel")}</span>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <FilterButton
            active={active === "all"}
            onClick={() => setActive("all")}
          >
            {t("filterAll")}
          </FilterButton>
          {categories.map((c) => (
            <FilterButton
              key={c.value}
              active={active === c.value}
              onClick={() => setActive(c.value)}
            >
              {c.label}
            </FilterButton>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center font-sans text-slate-muted">
          {t("resultsEmpty")}
        </p>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 70}>
              <ServiceCard service={service} className="h-full" />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "relative pb-1 font-sans text-sm font-semibold tracking-tight transition-colors",
        "after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full after:transition-all after:content-['']",
        active
          ? "text-blue-dark after:bg-red-accent"
          : "text-slate-muted after:bg-transparent hover:text-blue-dark hover:after:bg-blue-primary/40",
      )}
    >
      {children}
    </button>
  );
}
