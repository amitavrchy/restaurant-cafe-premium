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
};

export function DishCard({ item, featured }: Props) {
  const tags = item.dietary
    .map((d) => dietaryLabel[d] ?? d)
    .filter(Boolean);

  return (
    <article className={featured ? "grid gap-6 md:grid-cols-2 md:gap-10" : ""}>
      {featured && item.imageUrl ? (
        <div className="dish-zoom relative aspect-[4/5] overflow-hidden bg-line md:aspect-[5/6]">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      ) : null}
      <div className={featured ? "flex flex-col justify-center" : ""}>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="heading-md text-[1.4rem] md:text-[1.55rem]">
            {item.name}
          </h3>
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
