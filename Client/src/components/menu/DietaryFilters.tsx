"use client";

import { cn } from "@/lib/utils";

export const DIETARY_OPTIONS = [
  { id: "ALL", label: "All" },
  { id: "VEGETARIAN", label: "V" },
  { id: "VEGAN", label: "VG" },
  { id: "GLUTEN_FREE", label: "GF" },
] as const;

export type DietaryFilter = (typeof DIETARY_OPTIONS)[number]["id"];

type Props = {
  value: DietaryFilter;
  onChange: (value: DietaryFilter) => void;
};

export function DietaryFilters({ value, onChange }: Props) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Dietary filters"
    >
      {DIETARY_OPTIONS.map((opt) => (
        <button
          key={opt.id}
          type="button"
          className={cn(
            "min-w-11 border px-3 py-2 text-[var(--text-xs)] tracking-[0.14em] uppercase transition-colors",
            value === opt.id
              ? "border-ink bg-ink text-cream"
              : "border-line text-muted hover:border-ink hover:text-ink",
          )}
          aria-pressed={value === opt.id}
          onClick={() => onChange(opt.id)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
