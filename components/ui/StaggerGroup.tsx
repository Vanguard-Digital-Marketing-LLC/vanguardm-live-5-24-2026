"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, ensureScrollTrigger } from "@/lib/gsap";

type Variant = "fadeUp" | "fadeIn" | "scale";

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  /** CSS selector for items to stagger within the group */
  itemSelector?: string;
  stagger?: number;
  duration?: number;
  variant?: Variant;
  start?: string;
}

const VARIANT_FROM: Record<Variant, gsap.TweenVars> = {
  fadeUp: { y: 40, autoAlpha: 0 },
  fadeIn: { autoAlpha: 0 },
  scale: { scale: 0.92, autoAlpha: 0 },
};

export default function StaggerGroup({
  children,
  className,
  itemSelector = ":scope > *",
  stagger = 0.1,
  duration = 0.6,
  variant = "fadeUp",
  start = "top 85%",
}: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;

    let ctx: gsap.Context;

    (async () => {
      await ensureScrollTrigger();
      const items = ref.current!.querySelectorAll(itemSelector);
      if (!items.length) return;

      ctx = gsap.context(() => {
        gsap.from(items, {
          ...VARIANT_FROM[variant],
          duration,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current!,
            start,
            toggleActions: "play none none none",
          },
        });
      }, ref);
    })();

    return () => ctx?.revert();
  }, [itemSelector, stagger, duration, variant, start, reduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
