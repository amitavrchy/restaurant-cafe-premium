import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-olive text-cream">
      <div className="container-wide section-pad grid gap-12 md:grid-cols-3">
        <div>
          <p className="font-display text-[2rem] leading-none">Maison Verdant</p>
          <p className="mt-4 max-w-xs text-[var(--text-sm)] leading-[var(--leading-body)] text-cream/75">
            Fine dining and all-day café in Le Marais. An evening composed like a
            tasting menu — seasonal, paced, and meant to be shared.
          </p>
          <p className="mt-4 text-[var(--text-sm)] text-cream/65">
            <a href="mailto:hello@maisonverdant.com" className="hover:text-cream">
              hello@maisonverdant.com
            </a>
            <br />
            <a href="tel:+33142600000" className="hover:text-cream">
              +33 1 42 60 00 00
            </a>
          </p>
        </div>

        <div>
          <p className="text-[var(--text-xs)] font-medium uppercase tracking-[0.18em] text-cream/60">
            Visit
          </p>
          <p className="mt-3 text-[var(--text-base)] text-cream/90">
            18 Rue des Jardins
            <br />
            Paris, 75004
            <br />
            Métro Saint-Paul
          </p>
          <p className="mt-4 text-[var(--text-sm)] text-cream/70">
            Café 09:00–16:00
            <br />
            Lunch 12:00–15:00
            <br />
            Dinner 18:00–22:00
            <br />
            Closed Sun–Mon
          </p>
        </div>

        <div>
          <p className="text-[var(--text-xs)] font-medium uppercase tracking-[0.18em] text-cream/60">
            Explore
          </p>
          <ul className="mt-3 space-y-2 text-[var(--text-base)] text-cream/85">
            <li>
              <Link href="/menu" className="hover:text-cream">
                Menu
              </Link>
            </li>
            <li>
              <Link href="/reservations" className="hover:text-cream">
                Reservations
              </Link>
            </li>
            <li>
              <Link href="/private-dining" className="hover:text-cream">
                Private dining
              </Link>
            </li>
            <li>
              <Link href="/story" className="hover:text-cream">
                Our story
              </Link>
            </li>
            <li>
              <Link href="/journal" className="hover:text-cream">
                Journal
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-cream">
                Gallery
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/15 py-5 text-center text-[var(--text-xs)] tracking-[0.12em] uppercase text-cream/50">
        © 2026 Maison Verdant · Paris
      </div>
    </footer>
  );
}
