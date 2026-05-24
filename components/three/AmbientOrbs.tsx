"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Large, soft gradient spheres that drift slowly — creates Jitter-style color wash
export default function AmbientOrbs() {
  const groupRef = useRef<THREE.Group>(null);

  const [orbs] = useState(() => [
    {
      pos: [-3, 2, -6] as [number, number, number],
      colorA: new THREE.Color("#10b981"),
      colorB: new THREE.Color("#06b6d4"),
      size: 3.5,
      speed: 0.08,
      phase: 0,
    },
    {
      pos: [4, -1, -7] as [number, number, number],
      colorA: new THREE.Color("#f59e0b"),
      colorB: new THREE.Color("#8b5cf6"),
      size: 3.0,
      speed: 0.06,
      phase: 2.1,
    },
    {
      pos: [0, 5, -8] as [number, number, number],
      colorA: new THREE.Color("#8b5cf6"),
      colorB: new THREE.Color("#10b981"),
      size: 2.8,
      speed: 0.1,
      phase: 4.2,
    },
    {
      pos: [-2, -4, -5] as [number, number, number],
      colorA: new THREE.Color("#06b6d4"),
      colorB: new THREE.Color("#f59e0b"),
      size: 2.5,
      speed: 0.07,
      phase: 1.4,
    },
  ]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const time = clock.getElapsedTime();

    groupRef.current.children.forEach((child, i) => {
      const orb = orbs[i];
      if (!orb) return;
      const mesh = child as THREE.Mesh;

      // Slow drift
      mesh.position.x = orb.pos[0] + Math.sin(time * orb.speed + orb.phase) * 1.5;
      mesh.position.y = orb.pos[1] + Math.cos(time * orb.speed * 0.7 + orb.phase) * 1.2;

      // Color interpolation between two brand colors
      const t = (Math.sin(time * 0.15 + orb.phase) + 1) * 0.5;
      const material = mesh.material as THREE.MeshBasicMaterial;
      material.color.copy(orb.colorA).lerp(orb.colorB, t);

      // Gentle size breathing
      const breathe = 1 + Math.sin(time * 0.2 + orb.phase) * 0.08;
      mesh.scale.setScalar(orb.size * breathe);
    });
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.pos}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshBasicMaterial
            color={orb.colorA}
            transparent
            opacity={0.04}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
