import { Reveal } from "@/components/motion/Reveal";

export function ChefQuote() {
  return (
    <section className="relative overflow-hidden bg-olive text-cream">
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_20%_20%,#F6F1E7,transparent_45%),radial-gradient(circle_at_80%_70%,#B08D57,transparent_40%)]" />
      <div className="container-page section-pad relative">
        <Reveal>
          <p className="text-[var(--text-xs)] font-medium uppercase tracking-[0.18em] text-cream/55">
            From the kitchen
          </p>
          <blockquote className="mt-6 max-w-3xl font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.2] font-normal text-cream">
            “We cook the way we host — slowly, with intention, and always toward
            the people at the table.”
          </blockquote>
          <p className="mt-6 max-w-xl text-[var(--text-base)] leading-[var(--leading-body)] text-cream/75">
            Élise Marchand founded Maison Verdant after years in Paris and Lyon
            kitchens. Her cooking favors seasonal clarity over spectacle —
            garden herbs, precise heat, and desserts that still taste of fruit.
          </p>
          <p className="mt-8 text-[var(--text-sm)] tracking-[0.12em] uppercase text-cream/65">
            Élise Marchand · Chef Patron
          </p>
        </Reveal>
      </div>
    </section>
  );
}
