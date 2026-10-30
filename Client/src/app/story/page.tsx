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
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=85"
          alt="Evening service at Maison Verdant"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/25" />
        <div className="relative container-wide flex min-h-[70vh] items-end pb-16">
          <div className="max-w-2xl text-cream">
            <p className="text-[var(--text-xs)] font-medium uppercase tracking-[0.18em] text-cream/80">
              Our story
            </p>
            <h1 className="heading-display mt-4 text-cream">
              A kitchen rooted in the garden
            </h1>
          </div>
        </div>
      </section>

      <section className="container-page section-pad text-ink">
        <Reveal>
          <p className="text-body-lg max-w-2xl">
            Maison Verdant began as a courtyard café and grew into a dining room
            where seasons dictate the menu more firmly than trends. Chef Élise
            Marchand cooks with restraint — fewer gestures, clearer flavors.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h2 className="heading-lg text-ink">Philosophy</h2>
            <p className="text-body mt-4">
              We source within a day&apos;s drive when we can, ferment what we
              cannot use fresh, and leave space on the plate for conversation.
              Service is unhurried without being slow.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-lg text-ink">The café</h2>
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
