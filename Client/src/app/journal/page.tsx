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
      </Reveal>
      <JournalList />
    </div>
  );
}
