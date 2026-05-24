"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import GrowthStreams from "./GrowthStreams";
import MarketingIcons from "./MarketingIcons";
import AmbientOrbs from "./AmbientOrbs";

interface SceneProps {
  mouse: { x: number; y: number };
  scrollProgress: number;
  particleCount?: number;
}

export default function Scene({ mouse, scrollProgress, particleCount = 200 }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetX = mouse.x * 0.3;
    const targetY = mouse.y * 0.2;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.02);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.02);
  });

  return (
    <group ref={groupRef}>
      <AmbientOrbs />
      <MarketingIcons />
      <GrowthStreams count={particleCount} />
    </group>
  );
}
