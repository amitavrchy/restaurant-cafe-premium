import { Reveal } from "@/components/motion/Reveal";

export function HoursLocation() {
  return (
    <section className="border-y border-line bg-cream">
      <div className="container-wide grid md:grid-cols-2">
        <Reveal className="border-b border-line px-0 py-14 md:border-b-0 md:border-r md:py-16 md:pr-12">
          <p className="text-eyebrow">Hours</p>
          <p className="text-body mt-4 max-w-sm">
            We open Tuesday through Saturday. Sunday and Monday are for rest,
            market runs, and the next menu.
          </p>
          <ul className="mt-6 space-y-3 text-[var(--text-lg)]">
            <li className="flex justify-between gap-6 border-b border-line/80 py-3">
              <span>Lunch</span>
              <span className="font-mono-price text-[var(--text-sm)] text-muted">
                12:00 – 15:00
              </span>
            </li>
            <li className="flex justify-between gap-6 border-b border-line/80 py-3">
              <span>Dinner</span>
              <span className="font-mono-price text-[var(--text-sm)] text-muted">
                18:00 – 22:00
              </span>
            </li>
            <li className="flex justify-between gap-6 border-b border-line/80 py-3">
              <span>Café counter</span>
              <span className="font-mono-price text-[var(--text-sm)] text-muted">
                09:00 – 16:00
              </span>
            </li>
            <li className="flex justify-between gap-6 py-3">
              <span>Closed</span>
              <span className="text-[var(--text-sm)] text-muted">Sun – Mon</span>
            </li>
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="py-14 md:py-16 md:pl-12">
          <p className="text-eyebrow">Location</p>
          <p className="heading-lg mt-6">18 Rue des Jardins</p>
          <p className="mt-2 text-body">
            Paris, 75004 · Le Marais
            <br />
            Métro Saint-Paul · Bus 69, 76
          </p>
          <p className="text-body mt-4 max-w-sm">
            Street parking is limited. A public garage sits two blocks toward
            Place des Vosges. We are happy to call a taxi at the end of service.
          </p>
          <a
            href="https://maps.google.com/?q=18+Rue+des+Jardins+Paris"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost mt-8"
          >
            Get directions
          </a>
        </Reveal>
      </div>
    </section>
  );
}
