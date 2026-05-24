"use client";

import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, ensureScrollTrigger } from "@/lib/gsap";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (reduced || !ref.current) {
      setDisplay(value);
      return;
    }

    let ctx: gsap.Context;
    const proxy = { val: 0 };

    (async () => {
      await ensureScrollTrigger();
      ctx = gsap.context(() => {
        gsap.to(proxy, {
          val: value,
          duration,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current!,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          onUpdate: () => setDisplay(Math.round(proxy.val)),
        });
      }, ref);
    })();

    return () => ctx?.revert();
  }, [value, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
