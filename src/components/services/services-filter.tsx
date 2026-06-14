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
        className="flex flex-wrap gap-2.5"
      >
        <FilterButton active={active === "all"} onClick={() => setActive("all")}>
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

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-slate-muted">{t("resultsEmpty")}</p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
        "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
        active
          ? "border-blue-dark bg-blue-dark text-white"
          : "border-blue-light bg-white text-slate-primary hover:border-blue-primary/40 hover:text-blue-dark",
      )}
    >
      {children}
    </button>
  );
}
