"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useAppSelector } from "@/store/hooks";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reserveOpen = useAppSelector((s) => s.ui.reserveOpen);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      // Nested scroll areas marked with data-lenis-prevent stay native
      prevent: (node) =>
        node instanceof HTMLElement &&
        Boolean(
          node.closest("[data-lenis-prevent]") ||
            node.closest("[data-radix-dialog-content]"),
        ),
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (reserveOpen) {
      lenis.stop();
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      lenis.start();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [reserveOpen]);

  return <>{children}</>;
}
