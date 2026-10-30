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
        className={`grid items-center gap-6 md:grid-cols-[minmax(0,220px)_minmax(0,1fr)] md:gap-10 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="dish-zoom relative mx-auto aspect-[4/5] w-full max-w-[240px] overflow-hidden rounded-2xl bg-line md:mx-0 md:max-w-none">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 240px, 260px"
          />
        </div>
        <div>
          <p className="text-eyebrow text-gold">Signature</p>
          <div className="mt-3 flex items-end gap-3">
            <h3 className="heading-lg text-[clamp(1.6rem,2.4vw,2.15rem)]">
              {item.name}
            </h3>
            <span className="menu-leader hidden sm:block" aria-hidden />
            <p className="shrink-0 font-mono-price text-[var(--text-sm)] text-ink">
              {formatPrice(item.price)}
            </p>
          </div>
          <p className="mt-3 max-w-xl text-[var(--text-base)] leading-[var(--leading-body)] text-muted">
            {item.description}
          </p>
          {tags.length > 0 ? (
            <p className="mt-4 text-[var(--text-xs)] tracking-[0.16em] uppercase text-gold">
              {tags.join(" · ")}
            </p>
          ) : null}
        </div>
      </article>
    );
  }

  return (
    <article className="group flex gap-4 border-b border-line/80 pb-6 last:border-b-0 last:pb-0 md:gap-5">
      {item.imageUrl ? (
        <div className="dish-zoom relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-xl bg-line md:h-[5.25rem] md:w-[5.25rem]">
          <Image
            src={item.imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="84px"
          />
        </div>
      ) : null}
      <div className="min-w-0 flex-1">
        <div className="flex items-end gap-3">
          <h3 className="heading-md min-w-0 text-[1.25rem] md:text-[1.35rem]">
            {item.name}
          </h3>
          <span className="menu-leader" aria-hidden />
          <p className="shrink-0 font-mono-price text-[var(--text-sm)] text-ink">
            {formatPrice(item.price)}
          </p>
        </div>
        <p className="mt-2 text-[var(--text-sm)] leading-[var(--leading-body)] text-muted md:text-[var(--text-base)]">
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
