"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { fetchMenu } from "@/lib/api";
import { DietaryFilters, type DietaryFilter } from "./DietaryFilters";
import { MenuChapter } from "./MenuChapter";
import { MenuGsapReveal } from "./MenuGsapReveal";
import { cn } from "@/lib/utils";
import { openReserve } from "@/features/ui/uiSlice";
import { useAppDispatch } from "@/store/hooks";

export function MenuPageClient() {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<DietaryFilter>("ALL");
  const menuQuery = useQuery({
    queryKey: ["menu"],
    queryFn: fetchMenu,
  });

  const sections = useMemo(() => {
    const data = menuQuery.data ?? [];
    if (filter === "ALL") return data;
    return data
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => item.dietary.includes(filter)),
      }))
      .filter((section) => section.items.length > 0);
  }, [menuQuery.data, filter]);

  return (
    <div className="bg-[radial-gradient(ellipse_at_top,#EFE6D8_0%,#F6F1E7_42%,#F6F1E7_100%)]">
      <div className="sticky top-[var(--header-h)] z-30 border-b border-line/80 bg-cream/90 backdrop-blur-md">
        <div className="container-wide flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <nav
            className="flex gap-1 overflow-x-auto pb-1"
            aria-label="Menu chapters"
          >
            {(menuQuery.data ?? []).map((section) => (
              <a
                key={section.id}
                href={`#${section.slug}`}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-2 text-[var(--text-sm)] tracking-[0.04em] text-olive/80 transition-colors hover:bg-line/50 hover:text-olive",
                )}
              >
                {section.title}
              </a>
            ))}
          </nav>
          <DietaryFilters value={filter} onChange={setFilter} />
        </div>
      </div>

      <div className="container-wide pb-24">
        <header className="section-pad relative overflow-hidden pb-10 pt-16">
          <div className="pointer-events-none absolute -right-8 top-8 hidden h-48 w-48 rounded-full border border-gold/25 md:block" />
          <div className="pointer-events-none absolute right-16 top-24 hidden h-28 w-28 rounded-full border border-line md:block" />
          <p className="text-eyebrow">The menu</p>
          <h1 className="heading-display mt-4 max-w-3xl">
            An evening composed like a tasting menu
          </h1>
          <p className="text-body-lg mt-5 max-w-xl">
            Lunch through late wine — each chapter paced for the table. Marks: V
            vegetarian · VG vegan · GF gluten free.
          </p>
          <button
            type="button"
            className="btn btn-primary mt-8"
            onClick={() => dispatch(openReserve())}
          >
            Reserve for dinner
          </button>
        </header>

        {menuQuery.isLoading ? (
          <p className="py-16 text-muted">Loading the kitchen’s composition…</p>
        ) : menuQuery.isError ? (
          <p className="py-16 text-terracotta" role="alert">
            Unable to load menu. Is the API running on port 4000?
          </p>
        ) : sections.length === 0 ? (
          <p className="py-16 text-muted">No dishes match this filter.</p>
        ) : (
          <MenuGsapReveal>
            <div className="space-y-4 md:space-y-6">
              {sections.map((section, index) => (
                <MenuChapter
                  key={section.id}
                  section={section}
                  index={index}
                />
              ))}
            </div>
          </MenuGsapReveal>
        )}
      </div>
    </div>
  );
}
