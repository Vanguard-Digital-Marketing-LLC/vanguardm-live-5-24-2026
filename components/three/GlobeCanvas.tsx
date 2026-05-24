"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import Scene from "./Scene";

interface GlobeCanvasProps {
  mouse: { x: number; y: number };
  scrollProgress: number;
  reducedMotion: boolean;
  isMobile: boolean;
}

export default function GlobeCanvas({ mouse, scrollProgress, reducedMotion, isMobile }: GlobeCanvasProps) {
  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: !isMobile, alpha: true }}
        style={{ pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <Scene
            mouse={reducedMotion ? { x: 0, y: 0 } : mouse}
            scrollProgress={scrollProgress}
            particleCount={isMobile ? 100 : 200}
          />
          <EffectComposer>
            <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.9} intensity={isMobile ? 0.3 : 0.45} />
            <Vignette offset={0.1} darkness={0.7} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
