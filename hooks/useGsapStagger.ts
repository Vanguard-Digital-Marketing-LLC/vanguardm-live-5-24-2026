"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, presets } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Scroll-triggered staggered animation for a container's children.
 *
 * @param childSelector - CSS selector for the children to animate (default: "> *")
 * @param options       - Optional overrides for stagger amount and start position
 * @returns A ref to attach to the container element
 *
 * Usage:
 * ```tsx
 * const gridRef = useGsapStagger<HTMLDivElement>();
 * return (
 *   <div ref={gridRef} className="grid grid-cols-3 gap-6">
 *     <Card />
 *     <Card />
 *     <Card />
 *   </div>
 * );
 * ```
 */
export function useGsapStagger<T extends HTMLElement = HTMLDivElement>(
  childSelector: string = "> *",
  options?: { stagger?: number; start?: string },
) {
  const containerRef = useRef<T>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const children = container.querySelectorAll(childSelector);
      if (children.length === 0) return;

      const config = presets.fadeUp;

      // Respect prefers-reduced-motion: show everything immediately
      if (reduced) {
        gsap.set(children, config.to);
        return;
      }

      gsap.fromTo(children, config.from, {
        ...config.to,
        stagger: options?.stagger ?? 0.08,
        scrollTrigger: {
          trigger: container,
          start: options?.start ?? "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef, dependencies: [childSelector, reduced] },
  );

  return containerRef;
}
