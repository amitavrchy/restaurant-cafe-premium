import type { MenuSection } from "@/lib/api";
import { DishCard } from "./DishCard";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  section: MenuSection;
};

export function MenuChapter({ section }: Props) {
  const isWine = section.slug === "wine";
  const [featured, ...rest] = section.items;

  return (
    <section
      id={section.slug}
      className="scroll-mt-36 border-t border-line py-16 md:py-20"
    >
      <Reveal>
        <p className="text-eyebrow">Chapter</p>
        <h2 className="heading-xl mt-3">{section.title}</h2>
      </Reveal>

      {isWine ? (
        <div className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
          {section.items.map((item, i) => (
            <Reveal
              key={item.id}
              delay={i * 0.05}
              className="min-w-[75%] snap-start sm:min-w-[42%] lg:min-w-[28%]"
            >
              <div className="border border-line bg-[linear-gradient(180deg,#F6F1E7,#EFE6D8)] p-6">
                <DishCard item={item} />
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-10 space-y-14">
          {featured ? (
            <Reveal>
              <DishCard item={featured} featured />
            </Reveal>
          ) : null}
          <div className="grid gap-10 md:grid-cols-2">
            {rest.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.05}>
                <DishCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
