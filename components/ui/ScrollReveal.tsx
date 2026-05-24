"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, ensureScrollTrigger } from "@/lib/gsap";

type Variant = "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  delay?: number;
  duration?: number;
  start?: string;
  once?: boolean;
}

const VARIANT_FROM: Record<Variant, gsap.TweenVars> = {
  fadeUp: { y: 40, autoAlpha: 0 },
  fadeIn: { autoAlpha: 0 },
  slideLeft: { x: -60, autoAlpha: 0 },
  slideRight: { x: 60, autoAlpha: 0 },
  scale: { scale: 0.92, autoAlpha: 0 },
};

export default function ScrollReveal({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  duration = 0.7,
  start = "top 85%",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;

    let ctx: gsap.Context;

    (async () => {
      await ensureScrollTrigger();
      ctx = gsap.context(() => {
        gsap.from(ref.current!, {
          ...VARIANT_FROM[variant],
          duration,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current!,
            start,
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        });
      }, ref);
    })();

    return () => ctx?.revert();
  }, [variant, delay, duration, start, once, reduced]);

  return (
    <div
      ref={ref}
      className={className}
      style={reduced ? undefined : { visibility: "hidden" }}
    >
      {children}
    </div>
  );
}
