import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Story",
  description: "The philosophy and kitchen behind Maison Verdant.",
};

export default function StoryPage() {
  return (
    <>
      <section className="relative min-h-[70vh] overflow-hidden rounded-b-[1.75rem] md:rounded-b-[2.25rem]">
        <Image
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1800&q=85"
          alt="Chef plating in the Maison Verdant kitchen"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="relative container-wide flex min-h-[70vh] items-end pb-16">
          <div className="max-w-2xl text-cream">
            <p className="text-eyebrow !text-cream/75">Our story</p>
            <h1 className="heading-display mt-4 text-cream">
              A kitchen rooted in the garden
            </h1>
          </div>
        </div>
      </section>

      <section className="container-page section-pad">
        <Reveal>
          <p className="text-body-lg max-w-2xl">
            Maison Verdant began as a courtyard café and grew into a dining room
            where seasons dictate the menu more firmly than trends. Chef Élise
            Marchand cooks with restraint — fewer gestures, clearer flavors.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h2 className="heading-lg">Philosophy</h2>
            <p className="text-body mt-4">
              We source within a day&apos;s drive when we can, ferment what we
              cannot use fresh, and leave space on the plate for conversation.
              Service is unhurried without being slow.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-lg">The café</h2>
            <p className="text-body mt-4">
              By day the front room is bright and unfussy — espresso, tartines,
              financiers. By evening curtains draw, candles appear, and the
              tasting narrative begins.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
