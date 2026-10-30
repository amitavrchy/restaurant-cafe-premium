"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { openReserve } from "@/features/ui/uiSlice";
import { useAppDispatch } from "@/store/hooks";
import Link from "next/link";

export function Hero() {
  const dispatch = useAppDispatch();
  const reduced = useReducedMotion();

  return (
    <section className="relative min-h-[min(78svh,720px)] overflow-hidden rounded-b-[1.75rem] md:min-h-[min(85svh,780px)] md:rounded-b-[2.25rem]">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80"
          alt="Candlelit tasting table at Maison Verdant"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/35 to-ink/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(26,22,18,0.45)_100%)]" />
      </div>

      <div className="relative container-wide flex min-h-[min(78svh,720px)] flex-col justify-end pb-14 pt-20 md:min-h-[min(85svh,780px)] md:pb-20">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl text-cream"
        >
          <p className="font-display text-[clamp(2.5rem,8vw,4.5rem)] leading-[0.95] !text-cream">
            Maison Verdant
          </p>
          <h1 className="mt-5 max-w-2xl font-display text-[clamp(1.5rem,3.5vw,2.35rem)] font-normal leading-snug !text-cream/90">
            An evening composed like a tasting menu.
          </h1>
          <p className="mt-5 max-w-md text-[var(--text-base)] leading-[var(--leading-body)] text-cream/75">
            Fine dining after dusk. All-day café until the light softens.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => dispatch(openReserve())}
            >
              Reserve
            </button>
            <Link href="/menu" className="btn border border-cream/40 text-cream hover:border-cream">
              View menu
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
