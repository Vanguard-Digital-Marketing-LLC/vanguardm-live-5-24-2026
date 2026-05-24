"use client";

import { useEffect, useRef } from "react";

/**
 * Tracks raw pixel cursor position in a ref (no re-renders).
 * Designed for high-frequency reads inside requestAnimationFrame loops.
 */
export function useRawMousePosition() {
  const pos = useRef({ x: -1, y: -1 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return pos;
}
