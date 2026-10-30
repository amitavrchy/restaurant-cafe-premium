import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
            <p className="mt-5 max-w-lg text-[var(--text-base)] leading-[var(--leading-body)] text-cream/80">
              From a courtyard café to a dining room where seasons lead the menu —
              and hospitality feels composed, never performed.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page section-pad text-ink">
        <Reveal>
          <p className="text-eyebrow">Beginnings</p>
          <h2 className="heading-xl mt-3 max-w-2xl">
            What started as morning coffee became an evening tasting
          </h2>
          <p className="text-body-lg mt-6 max-w-2xl">
            Maison Verdant opened as a small café on Rue des Jardins — a few
            tables, a single espresso machine, and financiers still warm from the
            oven. Guests asked for dinner. We answered carefully: first one
            service a week, then three, then a full dining room with a tasting
            menu written like a short story.
          </p>
          <p className="text-body mt-5 max-w-2xl">
            Chef Élise Marchand cooks with restraint — fewer gestures, clearer
            flavors, and a belief that the plate should leave room for
            conversation. The garden behind the house still informs the kitchen
            and the bar: herbs pressed the morning they are cut, honey warmed
            with citrus after ten.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h2 className="heading-lg text-ink">Philosophy</h2>
            <p className="text-body mt-4">
              We source within a day&apos;s drive when we can, ferment what we
              cannot use fresh, and refuse garnish that does not belong on the
              fork. Service is unhurried without being slow — paced to the table,
              not to a kitchen clock.
            </p>
            <p className="text-body mt-4">
              Every new menu is walked on an empty floor before the first
              seating. Servers taste every dish. Captains learn where a guest’s
              gaze falls when a plate lands. Hospitality, for us, is rehearsal
              made invisible.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-lg text-ink">The café by day</h2>
            <p className="text-body mt-4">
              Until late afternoon the front room stays bright and unfussy —
              single-origin espresso, tartines, almond financiers, and a soft
              soundtrack of cups and conversation. It is the same house, in a
              different key.
            </p>
            <p className="text-body mt-4">
              By evening, curtains draw, candles appear, and the tasting
              narrative begins. Guests who know us for coffee often return for
              dinner; we like that continuum.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-12 border-t border-line pt-16 md:grid-cols-3">
          <Reveal>
            <h3 className="heading-md">The brigade</h3>
            <p className="text-body mt-3">
              A small kitchen team led by Élise, with pastry and garde-manger
              working in close rhythm. We prefer depth over scale — fewer covers,
              more attention.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="heading-md">The cellar</h3>
            <p className="text-body mt-3">
              Grower Champagne, precise Chablis, Burgundy with soft tannin, and a
              short list of skin-contact wines. Pairings are available for tasting
              menus; bottles can be chosen with the sommelier.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <h3 className="heading-md">The table</h3>
            <p className="text-body mt-3">
              Linen, quiet crystal, and space between courses. We hold
              reservations for fifteen minutes and welcome smart casual dress —
              jackets optional, intention required.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-16 flex flex-wrap gap-3">
          <Link href="/menu" className="btn btn-ink">
            Explore the menu
          </Link>
          <Link href="/reservations" className="btn btn-ghost">
            Reserve a table
          </Link>
        </Reveal>
      </section>
    </>
  );
}
