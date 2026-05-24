import gsap from "gsap";

let scrollTriggerRegistered = false;

/**
 * Lazily register ScrollTrigger plugin. Only loads the module
 * when the first component that needs scroll-driven animations mounts.
 */
export async function ensureScrollTrigger() {
  if (scrollTriggerRegistered) return;
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);
  scrollTriggerRegistered = true;
}

export { gsap };
