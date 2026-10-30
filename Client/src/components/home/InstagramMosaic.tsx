import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

const shots = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80",
  "https://images.unsplash.com/photo-1510817742738-060be7c38f3d?w=900&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=900&q=80",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80",
  "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=900&q=80",
];

export function InstagramMosaic() {
  return (
    <section className="section-pad pt-0">
      <div className="container-wide">
        <Reveal className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-eyebrow">Atelier</p>
            <h2 className="heading-xl mt-3">From the house</h2>
          </div>
          <p className="text-[var(--text-sm)] text-muted">@maisonverdant</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {shots.map((src, i) => (
            <Reveal key={src} delay={i * 0.05} className="dish-zoom relative aspect-square overflow-hidden bg-line">
              <Image
                src={src}
                alt={`Maison Verdant moment ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
