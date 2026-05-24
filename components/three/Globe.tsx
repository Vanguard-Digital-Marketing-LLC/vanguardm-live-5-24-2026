"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Globe() {
  const wireframeRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const [pointsGeometry] = useState(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const radius = 2;

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  });

  useFrame((_, delta) => {
    if (wireframeRef.current) wireframeRef.current.rotation.y += delta * 0.05;
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.05;
  });

  return (
    <group>
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[2, 3]} />
        <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.12} />
      </mesh>
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial color="#10b981" size={0.015} transparent opacity={0.4} sizeAttenuation />
      </points>
    </group>
  );
}
