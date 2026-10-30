import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Interiors, plates, and evenings at Maison Verdant.",
};

const images = [
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    alt: "Candlelit tasting table",
    caption: "Dinner service — linen, crystal, quiet pacing",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&q=80",
    alt: "Dining room",
    caption: "The main room before first seating",
  },
  {
    src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1000&q=80",
    alt: "Wine pour",
    caption: "Grower Champagne at the start of tasting",
  },
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80",
    alt: "Scallops",
    caption: "Day-boat scallops, brown butter, capers",
  },
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1000&q=80",
    alt: "Café espresso",
    caption: "Morning espresso in the front room",
  },
  {
    src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1000&q=80",
    alt: "Garden plate",
    caption: "Garden-led lunch compositions",
  },
  {
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1000&q=80",
    alt: "Pastry",
    caption: "Pastry finishes before dinner service",
  },
  {
    src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1000&q=80",
    alt: "Plated fish",
    caption: "Halibut en papillote, citrus beurre blanc",
  },
  {
    src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1000&q=80",
    alt: "Steak service",
    caption: "Dry-aged ribeye for the dining room",
  },
];

export default function GalleryPage() {
  return (
    <div className="container-wide section-pad">
      <Reveal>
        <p className="text-eyebrow">Gallery</p>
        <h1 className="heading-display mt-4 max-w-3xl">
          Light, linen, and the quiet of a finished plate
        </h1>
        <p className="text-body-lg mt-5 max-w-2xl">
          A visual journal of the house — mornings in the café, evenings in the
          dining room, and the plates that move between them. Photography is
          taken during service and quiet hours; nothing staged beyond the work
          itself.
        </p>
        <p className="text-body mt-4 max-w-2xl">
          For press or private-event moodboards, write to{" "}
          <a
            href="mailto:press@maisonverdant.com"
            className="text-terracotta underline-offset-4 hover:underline"
          >
            press@maisonverdant.com
          </a>
          .
        </p>
      </Reveal>
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <Reveal key={img.src} delay={i * 0.04}>
            <figure>
              <div className="media-frame dish-zoom relative aspect-[4/3]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                />
              </div>
              <figcaption className="mt-3 text-[var(--text-sm)] text-muted">
                {img.caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
