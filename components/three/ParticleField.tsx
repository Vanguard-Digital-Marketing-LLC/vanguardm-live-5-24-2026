"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  radius?: number;
}

export default function ParticleField({ count = 600, radius = 4 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [particleData] = useState(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius + (Math.random() - 0.5) * 2;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    return { positions: pos, velocities: vel };
  });
  
  const { positions, velocities } = particleData;


  useFrame(() => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // eslint-disable-next-line react-hooks/immutability
      posArray[i * 3] += velocities[i * 3];
      // eslint-disable-next-line react-hooks/immutability
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      // eslint-disable-next-line react-hooks/immutability
      posArray[i * 3 + 2] += velocities[i * 3 + 2];

      const x = posArray[i * 3];
      const y = posArray[i * 3 + 1];
      const z = posArray[i * 3 + 2];
      const dist = Math.sqrt(x * x + y * y + z * z);

      if (dist > radius + 2 || dist < 2.5) {
        // eslint-disable-next-line react-hooks/immutability
        velocities[i * 3] *= -1;
        // eslint-disable-next-line react-hooks/immutability
        velocities[i * 3 + 1] *= -1;
        // eslint-disable-next-line react-hooks/immutability
        velocities[i * 3 + 2] *= -1;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#10b981"
        size={0.02}
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
