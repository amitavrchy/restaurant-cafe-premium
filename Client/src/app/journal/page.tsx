import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { JournalList } from "@/components/journal/JournalList";

export const metadata: Metadata = {
  title: "Journal",
  description: "Events, recipes, and notes from Maison Verdant.",
};

export default function JournalPage() {
  return (
    <div className="container-wide section-pad">
      <Reveal>
        <p className="text-eyebrow">Journal</p>
        <h1 className="heading-display mt-4 max-w-3xl">
          Notes from the house
        </h1>
        <p className="text-body-lg mt-5 max-w-2xl">
          Seasonal menus, service notes, courtyard harvests, and the quiet
          details behind an evening at Maison Verdant. We publish when there is
          something worth saying — not on a fixed calendar.
        </p>
        <p className="text-body mt-4 max-w-2xl">
          For press inquiries or collaboration, write to{" "}
          <a
            href="mailto:press@maisonverdant.com"
            className="text-terracotta underline-offset-4 hover:underline"
          >
            press@maisonverdant.com
          </a>
          .
        </p>
      </Reveal>
      <JournalList />
    </div>
  );
}
