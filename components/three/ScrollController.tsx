"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ScrollControllerProps {
  scrollProgress: number;
}

export default function ScrollController({ scrollProgress }: ScrollControllerProps) {
  const { camera } = useThree();

  useFrame(() => {
    const targetZ = 6 + Math.sin(scrollProgress * Math.PI) * 1.5;
    // eslint-disable-next-line react-hooks/immutability
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.03);

    const inServices = scrollProgress > 0.35 && scrollProgress < 0.65;
    const targetX = inServices ? 1.5 : 0;
    // eslint-disable-next-line react-hooks/immutability
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.03);
  });

  return null;
}
