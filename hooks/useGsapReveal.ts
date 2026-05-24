"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, presets, type PresetName } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Scroll-triggered reveal animation for a single element.
 *
 * @param preset  - Name of an animation preset from lib/animations.ts
 * @param options - Optional overrides for ScrollTrigger start position
 * @returns A ref to attach to the element you want to animate
 *
 * Usage:
 * ```tsx
 * const ref = useGsapReveal<HTMLDivElement>("fadeUp");
 * return <div ref={ref}>Content</div>;
 * ```
 */
export function useGsapReveal<T extends HTMLElement = HTMLDivElement>(
  preset: PresetName = "fadeUp",
  options?: { start?: string },
) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const config = presets[preset];

      // Respect prefers-reduced-motion: jump to final state immediately
      if (reduced) {
        gsap.set(el, config.to);
        return;
      }

      // parallaxBg uses scrub-based ScrollTrigger (no one-shot play)
      if (preset === "parallaxBg") {
        gsap.fromTo(el, config.from, {
          ...config.to,
          scrollTrigger: {
            trigger: el,
            start: options?.start ?? "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
        return;
      }

      // Standard one-shot reveal
      gsap.fromTo(el, config.from, {
        ...config.to,
        scrollTrigger: {
          trigger: el,
          start: options?.start ?? "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref, dependencies: [preset, reduced] },
  );

  return ref;
}
