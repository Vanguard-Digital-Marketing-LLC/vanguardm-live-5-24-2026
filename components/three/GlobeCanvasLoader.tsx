"use client";

import dynamic from "next/dynamic";
import GlobeCanvasSkeleton from "./GlobeCanvasSkeleton";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";

const GlobeCanvas = dynamic(() => import("./GlobeCanvas"), {
  ssr: false,
  loading: () => <GlobeCanvasSkeleton />,
});

export default function GlobeCanvasLoader() {
  const mouse = useMousePosition();
  const scrollProgress = useScrollProgress();
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <GlobeCanvas
      mouse={mouse}
      scrollProgress={scrollProgress}
      reducedMotion={reducedMotion}
      isMobile={isMobile}
    />
  );
}
