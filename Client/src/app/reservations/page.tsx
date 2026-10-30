import type { Metadata } from "next";
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
            Parties of nine or more — please inquire via private dining. We hold
            tables for fifteen minutes past the reserved hour.
          </p>
          <dl className="mt-10 space-y-4 text-[var(--text-base)]">
            <div>
              <dt className="text-eyebrow">Lunch</dt>
              <dd className="mt-1 font-mono-price text-[var(--text-sm)] text-muted">
                12:00 – 15:00
              </dd>
            </div>
            <div>
              <dt className="text-eyebrow">Dinner</dt>
              <dd className="mt-1 font-mono-price text-[var(--text-sm)] text-muted">
                18:00 – 22:00
              </dd>
            </div>
            <div>
              <dt className="text-eyebrow">Dress</dt>
              <dd className="mt-1 text-muted">Smart casual · jackets welcome</dd>
            </div>
          </dl>
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
