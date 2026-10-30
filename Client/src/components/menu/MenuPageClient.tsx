"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { fetchMenu } from "@/lib/api";
import { DietaryFilters, type DietaryFilter } from "./DietaryFilters";
import { MenuChapter } from "./MenuChapter";
import { cn } from "@/lib/utils";

export function MenuPageClient() {
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
    <div>
      <div className="sticky top-[var(--header-h)] z-30 border-b border-line bg-cream/95 backdrop-blur-md">
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
                  "shrink-0 px-3 py-2 text-[var(--text-sm)] tracking-[0.04em] text-muted transition-colors hover:text-ink",
                )}
              >
                {section.title}
              </a>
            ))}
          </nav>
          <DietaryFilters value={filter} onChange={setFilter} />
        </div>
      </div>

      <div className="container-wide pb-20">
        <header className="section-pad pb-8 pt-14">
          <p className="text-eyebrow">The menu</p>
          <h1 className="heading-display mt-4 max-w-3xl">
            Chapters for lunch, dinner, tasting, café & wine
          </h1>
          <p className="text-body-lg mt-5 max-w-xl">
            Dietary marks: V vegetarian · VG vegan · GF gluten free. Pairing notes
            appear with wine.
          </p>
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/menu`}
            className="btn btn-ghost mt-8"
            target="_blank"
            rel="noopener noreferrer"
          >
            Print / JSON menu
          </a>
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
          sections.map((section) => (
            <MenuChapter key={section.id} section={section} />
          ))
        )}
      </div>
    </div>
  );
}
