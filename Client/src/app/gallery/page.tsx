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
    alt: "Tasting table",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&q=80",
    alt: "Dining room",
  },
  {
    src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1000&q=80",
    alt: "Wine pour",
  },
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80",
    alt: "Scallops",
  },
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1000&q=80",
    alt: "Café espresso",
  },
  {
    src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1000&q=80",
    alt: "Garden plate",
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
      </Reveal>
      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <Reveal
            key={img.src}
            delay={i * 0.05}
            className="media-frame dish-zoom relative aspect-[4/3]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
