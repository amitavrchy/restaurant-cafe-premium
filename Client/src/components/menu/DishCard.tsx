import Image from "next/image";
import type { MenuItem } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

const dietaryLabel: Record<string, string> = {
  VEGETARIAN: "V",
  VEGAN: "VG",
  GLUTEN_FREE: "GF",
  NONE: "",
};

type Props = {
  item: MenuItem;
  featured?: boolean;
  reverse?: boolean;
};

export function DishCard({ item, featured, reverse }: Props) {
  const tags = item.dietary
    .map((d) => dietaryLabel[d] ?? d)
    .filter(Boolean);

  if (featured && item.imageUrl) {
    return (
      <article
        className={`flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7 ${
          reverse ? "sm:flex-row-reverse" : ""
        }`}
      >
        <div className="media-frame dish-zoom relative h-36 w-36 shrink-0 sm:h-40 sm:w-40">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            sizes="160px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-eyebrow text-gold">Signature</p>
          <div className="mt-2 flex items-end gap-3">
            <h3 className="heading-md min-w-0 text-[1.45rem] md:text-[1.65rem]">
              {item.name}
            </h3>
            <span className="menu-leader hidden sm:block" aria-hidden />
            <p className="shrink-0 font-mono-price text-[var(--text-sm)] text-ink">
              {formatPrice(item.price)}
            </p>
          </div>
          <p className="mt-2 max-w-xl text-[var(--text-base)] leading-[var(--leading-body)] text-muted">
            {item.description}
          </p>
          {tags.length > 0 ? (
            <p className="mt-3 text-[var(--text-xs)] tracking-[0.16em] uppercase text-gold">
              {tags.join(" · ")}
            </p>
          ) : null}
        </div>
      </article>
    );
  }

  return (
    <article className="group flex gap-3.5 border-b border-line/80 pb-5 last:border-b-0 last:pb-0 md:gap-4">
      {item.imageUrl ? (
        <div className="media-frame dish-zoom relative h-16 w-16 shrink-0 md:h-[4.25rem] md:w-[4.25rem]">
          <Image
            src={item.imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="68px"
          />
        </div>
      ) : null}
      <div className="min-w-0 flex-1">
        <div className="flex items-end gap-3">
          <h3 className="heading-md min-w-0 text-[1.2rem] md:text-[1.3rem]">
            {item.name}
          </h3>
          <span className="menu-leader" aria-hidden />
          <p className="shrink-0 font-mono-price text-[var(--text-sm)] text-ink">
            {formatPrice(item.price)}
          </p>
        </div>
        <p className="mt-1.5 text-[var(--text-sm)] leading-[var(--leading-body)] text-muted">
          {item.description}
        </p>
        {tags.length > 0 ? (
          <p className="mt-2 text-[var(--text-xs)] tracking-[0.16em] uppercase text-gold">
            {tags.join(" · ")}
          </p>
        ) : null}
      </div>
    </article>
  );
}
