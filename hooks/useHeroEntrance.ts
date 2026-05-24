"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Stagger-animates child elements on mount for hero/above-fold sections.
 * Uses transform + opacity only (GPU-accelerated, no CLS).
 */
export function useHeroEntrance() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !containerRef.current) return;

    const children = containerRef.current.children;
    if (!children.length) return;

    const ctx = gsap.context(() => {
      gsap.from(children, {
        y: 30,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        delay: 0.15,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reduced]);

  return containerRef;
}
