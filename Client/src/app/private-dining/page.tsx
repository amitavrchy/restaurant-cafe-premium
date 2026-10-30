import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { PrivateInquiryForm } from "@/components/private/PrivateInquiryForm";

export const metadata: Metadata = {
  title: "Private Dining",
  description: "Salon packages and private event inquiries at Maison Verdant.",
};

const packages = [
  {
    name: "Salon Lunch",
    detail:
      "Up to 12 guests. A composed three-course lunch with seasonal produce, coffee or tea to finish. Wine by the glass or a short pairing available on request.",
    price: "From €95 / guest",
  },
  {
    name: "Evening Tasting",
    detail:
      "Up to 24 guests. Five courses with optional wine flight, dedicated captain, and pacing tuned to speeches or simply to conversation. Ideal for milestones.",
    price: "From €145 / guest",
  },
  {
    name: "Full Buyout",
    detail:
      "Dining room and Salon together. Bespoke menu written with the chef, full brigade, florals and printed menus available. Advance planning required.",
    price: "On request",
  },
];

const inclusions = [
  {
    title: "Dedicated service",
    body: "A captain assigned to your room, briefed on dietary needs, timing, and any toasts or pauses you prefer.",
  },
  {
    title: "Kitchen access",
    body: "Menus are confirmed with the chef one week prior. Last-minute allergies are handled with care when possible.",
  },
  {
    title: "Cellar guidance",
    body: "Sommelier pairing notes, Champagne on arrival, or a quiet non-alcoholic flight built from the courtyard garden.",
  },
  {
    title: "Simple extras",
    body: "Printed menus, place cards, and seasonal flowers can be arranged. AV is intentionally minimal — we prefer conversation.",
  },
];

export default function PrivateDiningPage() {
  return (
    <div>
      <section className="relative min-h-[55vh] overflow-hidden rounded-b-[1.75rem] md:rounded-b-[2.25rem]">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800&q=85"
          alt="Private salon"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/45 to-ink/25" />
        <div className="relative container-wide flex min-h-[55vh] items-end pb-14">
          <div className="max-w-2xl text-cream">
            <p className="text-[var(--text-xs)] font-medium uppercase tracking-[0.18em] text-cream/80">
              Private dining
            </p>
            <h1 className="heading-display mt-4 text-cream">
              Celebrate without spectacle
            </h1>
            <p className="mt-5 max-w-lg text-[var(--text-base)] leading-[var(--leading-body)] text-cream/80">
              Birthdays, partnerships, quiet reunions — the Salon holds the room
              so your evening can stay intimate.
            </p>
          </div>
        </div>
      </section>

      <section className="container-wide section-pad">
        <Reveal className="max-w-2xl">
          <p className="text-eyebrow">The Salon</p>
          <h2 className="heading-xl mt-3">A room of its own inside the house</h2>
          <p className="text-body-lg mt-5">
            Separated by linen and soft light, the Salon seats eight to
            twenty-four. Service follows the same philosophy as the dining room —
            paced, seasonal, and never rushed for the kitchen’s convenience.
          </p>
          <p className="text-body mt-4">
            We ask for a minimum spend depending on day and season. Deposit
            details arrive with your proposal. Cancellations within seventy-two
            hours may forfeit the deposit; we always try to rebook first.
          </p>
        </Reveal>
      </section>

      <section className="container-wide pb-8 md:pb-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {inclusions.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <h3 className="heading-md text-[1.35rem]">{item.title}</h3>
              <p className="text-body mt-3">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-wide section-pad grid gap-16 border-t border-line lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="text-eyebrow">Packages</p>
            <h2 className="heading-xl mt-3">Composed for your table</h2>
            <p className="text-body mt-4 max-w-md">
              Prices are per guest and exclude beverages unless noted. Custom
              menus and cultural celebrations are welcome — tell us the story of
              the evening.
            </p>
          </Reveal>
          <ul className="mt-10 space-y-8">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 0.08}>
                <li className="border-b border-line pb-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="heading-md">{pkg.name}</h3>
                    <span className="font-mono-price text-[var(--text-sm)] text-muted">
                      {pkg.price}
                    </span>
                  </div>
                  <p className="mt-2 text-body">{pkg.detail}</p>
                </li>
              </Reveal>
            ))}
          </ul>
          <div className="mt-10 grid grid-cols-2 gap-3">
            {[
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80",
              "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=900&q=80",
            ].map((src) => (
              <div key={src} className="media-frame relative aspect-[4/5]">
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="40vw"
                />
              </div>
            ))}
          </div>
        </div>
        <Reveal delay={0.1}>
          <div className="border border-line bg-cream p-6 md:p-8 lg:sticky lg:top-28">
            <h2 className="heading-md">Inquire</h2>
            <p className="text-body mt-2 mb-8">
              Share a preferred date, guest count, and intention. Our events team
              responds within two business days with availability and a written
              proposal.
            </p>
            <PrivateInquiryForm />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
