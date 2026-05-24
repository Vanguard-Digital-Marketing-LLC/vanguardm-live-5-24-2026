"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GrowthStreamsProps {
  count?: number;
}

/*
  Subtle rising particles — like fine dust catching light.
  Two muted streams (emerald + cyan) scattered wide, not clustered.
  Slow, gentle, ambient. Supports the background, never dominates.
*/

export default function GrowthStreams({ count = 200 }: GrowthStreamsProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [particleData] = useState(() => {
    const pos = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const meta = new Float32Array(count * 2); // speed, phase

    const palette = [
      new THREE.Color("#10b981"), // emerald
      new THREE.Color("#06b6d4"), // cyan
    ];

    for (let i = 0; i < count; i++) {
      // Spread evenly across a wide, tall area
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;

      // Mostly emerald, some cyan
      const color = palette[Math.random() > 0.7 ? 1 : 0];
      const v = 0.7 + Math.random() * 0.3;
      colors[i * 3] = color.r * v;
      colors[i * 3 + 1] = color.g * v;
      colors[i * 3 + 2] = color.b * v;

      meta[i * 2] = 0.06 + Math.random() * 0.14; // slow speeds
      meta[i * 2 + 1] = Math.random() * Math.PI * 2; // phase
    }

    return { positions: pos, colors, meta };
  });

  const { positions, colors, meta } = particleData;

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;
    const time = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const speed = meta[i * 2];
      const phase = meta[i * 2 + 1];

      // Slow rise
      posArray[i * 3 + 1] += speed * 0.01;

      // Very gentle horizontal drift
      posArray[i * 3] += Math.sin(time * 0.1 + phase) * 0.0004;

      // Reset to bottom
      if (posArray[i * 3 + 1] > 9) {
        posArray[i * 3 + 1] = -9;
        posArray[i * 3] = (Math.random() - 0.5) * 14;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.025}
        transparent
        opacity={0.2}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
