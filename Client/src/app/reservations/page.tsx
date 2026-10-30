import type { Metadata } from "next";
import Link from "next/link";
import { ReservationForm } from "@/components/reserve/ReservationForm";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Reservations",
  description: "Book lunch or dinner at Maison Verdant.",
};

export default function ReservationsPage() {
  return (
    <div className="container-wide section-pad">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="text-eyebrow">Reservations</p>
          <h1 className="heading-display mt-4">
            Choose a date, a time, a table.
          </h1>
          <p className="text-body-lg mt-5 max-w-md">
            We seat lunch from noon and dinner from six. Parties of nine or more
            should inquire through{" "}
            <Link
              href="/private-dining"
              className="text-terracotta underline-offset-4 hover:underline"
            >
              private dining
            </Link>
            . Tables are held for fifteen minutes past the reserved hour.
          </p>
          <p className="text-body mt-4 max-w-md">
            Please note dietary needs in the form — we accommodate most requests
            with advance notice. Same-day changes are handled by phone when the
            kitchen allows.
          </p>

          <dl className="mt-10 space-y-5 text-[var(--text-base)]">
            <div>
              <dt className="text-eyebrow">Lunch</dt>
              <dd className="mt-1 font-mono-price text-[var(--text-sm)] text-muted">
                12:00 – 15:00 · Tue–Sat
              </dd>
              <dd className="mt-1 text-[var(--text-sm)] text-muted">
                Lighter chapters, café energy still in the room
              </dd>
            </div>
            <div>
              <dt className="text-eyebrow">Dinner</dt>
              <dd className="mt-1 font-mono-price text-[var(--text-sm)] text-muted">
                18:00 – 22:00 · Tue–Sat
              </dd>
              <dd className="mt-1 text-[var(--text-sm)] text-muted">
                Full dining room · tasting available
              </dd>
            </div>
            <div>
              <dt className="text-eyebrow">Dress</dt>
              <dd className="mt-1 text-muted">
                Smart casual · jackets welcome, not required
              </dd>
            </div>
            <div>
              <dt className="text-eyebrow">Arrival</dt>
              <dd className="mt-1 text-muted">
                18 Rue des Jardins, 75004 · Métro Saint-Paul
              </dd>
            </div>
          </dl>

          <div className="mt-10 max-w-md border-t border-line pt-8">
            <h2 className="heading-md">A few house notes</h2>
            <ul className="mt-4 space-y-3 text-body">
              <li>
                Children are welcome at lunch; dinner is paced for a quieter
                room.
              </li>
              <li>
                Corkage is not offered — our cellar is short by design and chosen
                for the menu.
              </li>
              <li>
                For large celebrations, flowers, or printed menus, use the Salon
                inquiry form.
              </li>
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="border border-line bg-cream p-6 md:p-8">
            <ReservationForm embedded />
          </div>
        </Reveal>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ReserveAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://maisonverdant.example/reservations",
            },
            result: {
              "@type": "Reservation",
              name: "Table reservation",
            },
          }),
        }}
      />
    </div>
  );
}
