"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function MenuGsapReveal({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || !root.current) return;

      const images = root.current.querySelectorAll(".dish-zoom img");
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.12, opacity: 0.65 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              end: "top 35%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
