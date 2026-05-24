"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TEXAS_ORIGIN, latLngToVector3 } from "@/lib/globe-data";

export default function TexasMarker() {
  const markerRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const position = latLngToVector3(TEXAS_ORIGIN.lat, TEXAS_ORIGIN.lng, 2.02);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 2) * 0.3;
    if (markerRef.current) markerRef.current.scale.setScalar(pulse);
    if (glowRef.current) {
      glowRef.current.scale.setScalar(pulse * 2);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.15 + Math.sin(t * 2) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh ref={markerRef}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}
