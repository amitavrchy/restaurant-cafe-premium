"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { formatPrice } from "@/lib/utils";

const dishes = [
  {
    name: "Langoustine Crudo",
    note: "Yuzu kosho · finger lime",
    price: 28,
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1000&q=80",
  },
  {
    name: "Duck Breast à l’Orange",
    note: "Blood orange · endive",
    price: 48,
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1000&q=80",
  },
  {
    name: "Wild Mushroom Risotto",
    note: "Parmesan veil · thyme",
    price: 36,
    image:
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1000&q=80",
  },
  {
    name: "Chocolate Ganache",
    note: "Olive oil ice cream",
    price: 16,
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1000&q=80",
  },
];

export function SignatureCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="section-pad bg-cream">
      <div className="container-wide">
        <Reveal className="flex items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-eyebrow">Signatures</p>
            <h2 className="heading-xl mt-3">Plates we return to</h2>
            <p className="text-body mt-3">
              A few compositions that stay on the menu through seasons — refined,
              never static. Ask for tonight’s pairing notes.
            </p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={scrollPrev}
              className="btn btn-ghost px-4"
              aria-label="Previous dishes"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="btn btn-ghost px-4"
              aria-label="Next dishes"
            >
              Next
            </button>
          </div>
        </Reveal>

        <div className="mt-10 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {dishes.map((dish, i) => (
              <Reveal
                key={dish.name}
                delay={i * 0.08}
                className="min-w-[72%] sm:min-w-[42%] lg:min-w-[28%]"
              >
                <article className="group">
                  <div className="media-frame dish-zoom relative aspect-[4/3] w-full">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 70vw, 28vw"
                    />
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="heading-md text-[1.35rem]">{dish.name}</h3>
                      <p className="mt-1 text-[var(--text-sm)] text-muted">
                        {dish.note}
                      </p>
                    </div>
                    <p className="font-mono-price text-[var(--text-sm)] text-ink">
                      {formatPrice(dish.price)}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
