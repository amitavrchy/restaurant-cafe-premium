import type { MenuSection } from "@/lib/api";
import { DishCard } from "./DishCard";
import { Reveal } from "@/components/motion/Reveal";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

type Props = {
  section: MenuSection;
  index: number;
};

export function MenuChapter({ section, index }: Props) {
  const isWine = section.slug === "wine";
  const [featured, ...rest] = section.items;
  const roman = ROMAN[index] ?? String(index + 1);
  const tinted = index % 2 === 1;

  return (
    <section
      id={section.slug}
      className={`scroll-mt-36 py-14 md:py-20 ${
        tinted
          ? "rounded-[1.75rem] bg-[linear-gradient(180deg,rgba(63,74,60,0.05),rgba(246,241,231,0))] px-5 md:px-10"
          : ""
      }`}
    >
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
          <div>
            <p className="text-eyebrow">
              Chapter {roman}
            </p>
            <h2 className="heading-xl mt-2">{section.title}</h2>
            <div className="menu-chapter-rule" />
          </div>
          <p className="max-w-xs text-right text-[var(--text-sm)] text-muted">
            {isWine
              ? "By the glass · ask for bottle list"
              : `${section.items.length} compositions`}
          </p>
        </div>
      </Reveal>

      {isWine ? (
        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3">
          {section.items.map((item, i) => (
            <Reveal
              key={item.id}
              delay={i * 0.05}
              className="min-w-[78%] snap-start sm:min-w-[46%] lg:min-w-[30%]"
            >
              <div className="h-full rounded-2xl border border-line bg-[linear-gradient(165deg,#F8F4EC,#EFE6D8)] p-5">
                <DishCard item={item} />
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-10 space-y-12 md:space-y-14">
          {featured ? (
            <Reveal>
              <div className="rounded-2xl border border-line/80 bg-cream/60 p-4 md:p-6">
                <DishCard item={featured} featured reverse={index % 2 === 1} />
              </div>
            </Reveal>
          ) : null}
          <div className="grid gap-8 md:grid-cols-2 md:gap-x-12 md:gap-y-2">
            {rest.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.04}>
                <DishCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
