"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import { TEXAS_ORIGIN, TARGET_CITIES, latLngToVector3 } from "@/lib/globe-data";

function createArc(
  start: [number, number, number],
  end: [number, number, number]
): THREE.QuadraticBezierCurve3 {
  const mid = new THREE.Vector3(
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2
  );
  const midLen = mid.length();
  mid.normalize().multiplyScalar(midLen + 0.8);

  return new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(...start),
    mid,
    new THREE.Vector3(...end)
  );
}

export default function NetworkArcs() {
  const groupRef = useRef<THREE.Group>(null);

  const arcs = useMemo(() => {
    const texasPos = latLngToVector3(TEXAS_ORIGIN.lat, TEXAS_ORIGIN.lng, 2);
    return TARGET_CITIES.map((city) => {
      const cityPos = latLngToVector3(city.lat, city.lng, 2);
      const curve = createArc(texasPos, cityPos);
      const points = curve.getPoints(50);
      return { points, name: city.name, position: cityPos };
    });
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {arcs.map((arc) => (
        <group key={arc.name}>
          <Line
            points={arc.points}
            color="#f59e0b"
            lineWidth={1}
            transparent
            opacity={0.5}
          />
          <mesh position={arc.position}>
            <sphereGeometry args={[0.025, 12, 12]} />
            <meshBasicMaterial color="#f59e0b" transparent opacity={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
