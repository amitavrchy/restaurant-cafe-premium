"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/motion/Reveal";

export function Newsletter() {
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <section className="border-t border-line bg-[linear-gradient(160deg,#F6F1E7_0%,#EDE4D4_55%,#F6F1E7_100%)]">
      <div className="container-page section-pad">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-eyebrow">Correspondence</p>
          <h2 className="heading-xl mt-3">Seasonal notes from the kitchen</h2>
          <p className="text-body mt-4">
            Menu changes, late openings, courtyard harvests, and private dining
            dates — rarely more than once a month, never clutter.
          </p>
          <p className="mt-3 text-[var(--text-sm)] text-muted">
            Unsubscribe anytime. We do not share your address.
          </p>
          {done ? (
            <p className="mt-8 text-[var(--text-base)] text-olive" role="status">
              Thank you — you are on the list. Watch for the next seasonal note.
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <label className="sr-only" htmlFor="newsletter-email">
                Email
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="you@email.com"
                className="min-h-11 flex-1 border border-line bg-cream/70 px-4 text-[var(--text-base)] outline-none focus:border-ink"
              />
              <button type="submit" className="btn btn-ink">
                Subscribe
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
