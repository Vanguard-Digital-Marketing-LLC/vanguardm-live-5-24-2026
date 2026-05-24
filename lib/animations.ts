import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Re-export for convenience so consumers don't need separate imports
export { gsap, ScrollTrigger };

// ---------------------------------------------------------------------------
// Shared animation preset configs
// These are plain objects describing "from" values and tween vars.
// Hooks apply them via gsap.fromTo() or gsap.to() as appropriate.
// ---------------------------------------------------------------------------

export interface AnimationPreset {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
}

export const presets = {
  fadeUp: {
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
  },

  staggerGrid: {
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.1 },
  },

  counterUp: {
    from: { innerText: 0 },
    to: {
      snap: { innerText: 1 },
      duration: 2,
      ease: "power1.out",
    },
  },

  parallaxBg: {
    from: { y: 0 },
    to: { y: -80, ease: "none" },
  },

  slideInLeft: {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
  },

  slideInRight: {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
  },
} as const satisfies Record<string, AnimationPreset>;

export type PresetName = keyof typeof presets;
