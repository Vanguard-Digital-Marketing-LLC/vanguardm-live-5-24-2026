# Vanguard 3D Website — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild vanguardm.com as an immersive 3D showcase with a persistent hybrid globe + particle field background and glassmorphism content layers.

**Architecture:** Next.js 14 App Router with React Three Fiber for 3D, GSAP ScrollTrigger for scroll-driven animations, Tailwind CSS for styling. The R3F Canvas is fixed-position behind all content; page sections use glassmorphism to float above the 3D scene. The globe persists across route changes.

**Tech Stack:** Next.js 14, React Three Fiber, Drei, Three.js, GSAP + ScrollTrigger, Tailwind CSS, @react-three/postprocessing

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `app/layout.tsx`, `app/page.tsx`, `tailwind.config.ts`, `next.config.js`, `tsconfig.json`, `package.json`
- Existing static files in project root (`index.html`, `css/`, `js/`) will be preserved but unused by Next.js

**Step 1: Initialize Next.js with TypeScript and Tailwind**

```bash
cd /c/Users/james/Projects/vanguardm.com
npx create-next-app@latest next-app --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

When prompted, accept defaults. This creates a `next-app/` subdirectory. We'll move contents to root after.

**Step 2: Move Next.js files to project root**

```bash
# Move all Next.js scaffolded files into project root
cp -r next-app/* next-app/.* . 2>/dev/null
rm -rf next-app
```

**Step 3: Install 3D and animation dependencies**

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing gsap @gsap/react
npm install -D @types/three
```

**Step 4: Verify dev server starts**

```bash
npm run dev
```

Expected: Next.js dev server at localhost:3000, default page renders.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with R3F and GSAP deps"
```

---

## Task 2: Tailwind Config, Global Styles, and Fonts

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Step 1: Configure Tailwind with Vanguard design tokens**

In `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: "#0a0f1a",
          900: "#0f1729",
          800: "#1a2332",
        },
        emerald: {
          DEFAULT: "#10b981",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
        },
        amber: {
          DEFAULT: "#f59e0b",
          400: "#fbbf24",
          500: "#f59e0b",
        },
      },
      fontFamily: {
        display: ["Chakra Petch", "sans-serif"],
        body: ["Outfit", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 2: Set up global CSS with glassmorphism utilities**

In `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-primary: #0a0f1a;
  --emerald: #10b981;
  --amber: #f59e0b;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg-primary);
  color: #e2e8f0;
  font-family: "Outfit", sans-serif;
  overflow-x: hidden;
}

/* Glassmorphism utility */
@layer utilities {
  .glass {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .glass-strong {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.12);
  }
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #0a0f1a;
}
::-webkit-scrollbar-thumb {
  background: #10b98144;
  border-radius: 3px;
}
```

**Step 3: Update layout.tsx with fonts**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vanguard Digital Marketing | Full-Service Digital Marketing Agency in Texas",
  description:
    "Vanguard Digital Marketing is a full-service digital marketing agency based in Texas. We build brands that dominate digital with SEO, PPC, web design, social media, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
```

**Step 4: Replace app/page.tsx with placeholder**

```tsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="font-display text-4xl font-bold text-emerald">
        Vanguard Digital Marketing
      </h1>
    </main>
  );
}
```

**Step 5: Verify fonts and Tailwind render**

```bash
npm run dev
```

Open browser — confirm Chakra Petch heading on dark background with emerald color.

**Step 6: Commit**

```bash
git add tailwind.config.ts app/globals.css app/layout.tsx app/page.tsx
git commit -m "feat: configure Tailwind tokens, fonts, and glassmorphism utilities"
```

---

## Task 3: Globe Data — City Coordinates and Arc Definitions

**Files:**
- Create: `lib/globe-data.ts`

**Step 1: Create globe data module**

This file defines lat/lng coordinates for US cities and the Texas origin point, plus a helper to convert lat/lng to 3D sphere coordinates.

```ts
// lib/globe-data.ts

export interface CityNode {
  name: string;
  lat: number;
  lng: number;
}

export const TEXAS_ORIGIN: CityNode = {
  name: "Texas",
  lat: 31.0,
  lng: -99.5,
};

export const TARGET_CITIES: CityNode[] = [
  { name: "New York", lat: 40.71, lng: -74.01 },
  { name: "Los Angeles", lat: 34.05, lng: -118.24 },
  { name: "Chicago", lat: 41.88, lng: -87.63 },
  { name: "Miami", lat: 25.76, lng: -80.19 },
  { name: "Seattle", lat: 47.61, lng: -122.33 },
  { name: "Denver", lat: 39.74, lng: -104.99 },
  { name: "Atlanta", lat: 33.75, lng: -84.39 },
  { name: "Dallas", lat: 32.78, lng: -96.8 },
];

/**
 * Convert lat/lng (degrees) to 3D position on a sphere of given radius.
 * Uses standard spherical coordinate convention:
 * - latitude: -90 (south pole) to +90 (north pole)
 * - longitude: -180 to +180
 */
export function latLngToVector3(
  lat: number,
  lng: number,
  radius: number
): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z];
}
```

**Step 2: Commit**

```bash
git add lib/globe-data.ts
git commit -m "feat: add globe city coordinates and lat/lng conversion"
```

---

## Task 4: 3D Canvas Wrapper and Basic Globe

**Files:**
- Create: `components/three/GlobeCanvas.tsx`
- Create: `components/three/Globe.tsx`
- Create: `components/three/Scene.tsx`
- Modify: `app/layout.tsx`

**Step 1: Create the Globe component (wireframe sphere + dotted surface)**

```tsx
// components/three/Globe.tsx
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Globe() {
  const wireframeRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Generate point cloud on sphere surface to approximate continents
  const pointsGeometry = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const radius = 2;

    for (let i = 0; i < count; i++) {
      // Uniform sphere distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += delta * 0.05;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group>
      {/* Wireframe sphere */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[2, 3]} />
        <meshBasicMaterial
          color="#10b981"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Dot surface */}
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial
          color="#10b981"
          size={0.015}
          transparent
          opacity={0.4}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
```

**Step 2: Create Scene composition**

```tsx
// components/three/Scene.tsx
"use client";

import Globe from "./Globe";

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <Globe />
    </>
  );
}
```

**Step 3: Create Canvas wrapper with Suspense**

```tsx
// components/three/GlobeCanvas.tsx
"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

export default function GlobeCanvas() {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{ pointerEvents: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

**Step 4: Add GlobeCanvas to root layout**

Update `app/layout.tsx` to render the canvas persistently:

```tsx
import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";

const GlobeCanvas = dynamic(() => import("@/components/three/GlobeCanvas"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Vanguard Digital Marketing | Full-Service Digital Marketing Agency in Texas",
  description:
    "Vanguard Digital Marketing is a full-service digital marketing agency based in Texas. We build brands that dominate digital with SEO, PPC, web design, social media, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <GlobeCanvas />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
```

**Step 5: Verify globe renders**

```bash
npm run dev
```

Open browser — confirm rotating wireframe globe with dotted surface on dark background with "Vanguard Digital Marketing" text in front.

**Step 6: Commit**

```bash
git add components/three/ app/layout.tsx
git commit -m "feat: add R3F canvas with wireframe globe and dot surface"
```

---

## Task 5: Texas Marker and Network Arcs

**Files:**
- Create: `components/three/TexasMarker.tsx`
- Create: `components/three/NetworkArcs.tsx`
- Modify: `components/three/Scene.tsx`

**Step 1: Create pulsing Texas marker**

```tsx
// components/three/TexasMarker.tsx
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

    if (markerRef.current) {
      markerRef.current.scale.setScalar(pulse);
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(pulse * 2);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.15 + Math.sin(t * 2) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Core dot */}
      <mesh ref={markerRef}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>
      {/* Glow ring */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}
```

**Step 2: Create network arc curves**

```tsx
// components/three/NetworkArcs.tsx
"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  TEXAS_ORIGIN,
  TARGET_CITIES,
  latLngToVector3,
} from "@/lib/globe-data";

function createArc(
  start: [number, number, number],
  end: [number, number, number]
): THREE.QuadraticBezierCurve3 {
  const mid = new THREE.Vector3(
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2
  );

  // Lift the midpoint above the sphere surface for the arc
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
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      return { geometry, name: city.name, position: cityPos };
    });
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Sync rotation with globe
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {arcs.map((arc) => (
        <group key={arc.name}>
          {/* Arc line */}
          <line geometry={arc.geometry}>
            <lineBasicMaterial
              color="#f59e0b"
              transparent
              opacity={0.5}
              linewidth={1}
            />
          </line>
          {/* City endpoint dot */}
          <mesh position={arc.position}>
            <sphereGeometry args={[0.025, 12, 12]} />
            <meshBasicMaterial color="#f59e0b" transparent opacity={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
```

**Step 3: Add to Scene**

Update `components/three/Scene.tsx`:

```tsx
"use client";

import Globe from "./Globe";
import TexasMarker from "./TexasMarker";
import NetworkArcs from "./NetworkArcs";

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <Globe />
      <TexasMarker />
      <NetworkArcs />
    </>
  );
}
```

**Step 4: Verify arcs and marker render**

```bash
npm run dev
```

Confirm: golden arcs curve from Texas to 8 cities, pulsing amber dot on Texas, all rotate with globe.

**Step 5: Commit**

```bash
git add components/three/TexasMarker.tsx components/three/NetworkArcs.tsx components/three/Scene.tsx
git commit -m "feat: add Texas marker and network arc connections"
```

---

## Task 6: Particle Field

**Files:**
- Create: `components/three/ParticleField.tsx`
- Modify: `components/three/Scene.tsx`

**Step 1: Create ambient particle field**

```tsx
// components/three/ParticleField.tsx
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  radius?: number;
}

export default function ParticleField({
  count = 600,
  radius = 4,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Distribute in a spherical shell around the globe
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius + (Math.random() - 0.5) * 2;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      // Slow drift velocities
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    return { positions: pos, velocities: vel };
  }, [count, radius]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];

      // Keep particles within bounds
      const x = posArray[i * 3];
      const y = posArray[i * 3 + 1];
      const z = posArray[i * 3 + 2];
      const dist = Math.sqrt(x * x + y * y + z * z);

      if (dist > radius + 2 || dist < 2.5) {
        velocities[i * 3] *= -1;
        velocities[i * 3 + 1] *= -1;
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
          count={count}
          array={positions}
          itemSize={3}
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
```

**Step 2: Add to Scene**

```tsx
// components/three/Scene.tsx
"use client";

import Globe from "./Globe";
import TexasMarker from "./TexasMarker";
import NetworkArcs from "./NetworkArcs";
import ParticleField from "./ParticleField";

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <Globe />
      <TexasMarker />
      <NetworkArcs />
      <ParticleField />
    </>
  );
}
```

**Step 3: Verify particles**

Confirm: ~600 small emerald particles drift slowly in a shell around the globe.

**Step 4: Commit**

```bash
git add components/three/ParticleField.tsx components/three/Scene.tsx
git commit -m "feat: add ambient particle field around globe"
```

---

## Task 7: Postprocessing — Bloom and Vignette

**Files:**
- Modify: `components/three/GlobeCanvas.tsx`

**Step 1: Add postprocessing effects**

```tsx
// components/three/GlobeCanvas.tsx
"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import Scene from "./Scene";

export default function GlobeCanvas() {
  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene />
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              intensity={0.8}
            />
            <Vignette eskil={false} offset={0.1} darkness={0.8} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
```

**Step 2: Verify bloom glow**

The Texas marker and arcs should now have a soft amber glow. Globe wireframe gets a subtle emerald bloom.

**Step 3: Commit**

```bash
git add components/three/GlobeCanvas.tsx
git commit -m "feat: add bloom and vignette postprocessing"
```

---

## Task 8: Mouse Interaction — Globe Tilt and Particle Repulsion

**Files:**
- Create: `hooks/useMousePosition.ts`
- Modify: `components/three/Scene.tsx`
- Modify: `components/three/GlobeCanvas.tsx`

**Step 1: Create mouse position hook**

```ts
// hooks/useMousePosition.ts
"use client";

import { useState, useEffect } from "react";

export function useMousePosition() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return mouse;
}
```

**Step 2: Add tilt to Scene root group**

Update Scene to accept mouse coords and apply subtle tilt to the entire globe group:

```tsx
// components/three/Scene.tsx
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Globe from "./Globe";
import TexasMarker from "./TexasMarker";
import NetworkArcs from "./NetworkArcs";
import ParticleField from "./ParticleField";

interface SceneProps {
  mouse: { x: number; y: number };
}

export default function Scene({ mouse }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    // Subtle tilt toward cursor (max ~5 degrees = 0.087 rad)
    const targetX = mouse.y * 0.087;
    const targetY = mouse.x * 0.087;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      0.05
    );
    // Don't override Y — globe auto-rotates on Y
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <Globe />
      <TexasMarker />
      <NetworkArcs />
      <ParticleField />
    </group>
  );
}
```

**Step 3: Pass mouse to Scene from GlobeCanvas**

```tsx
// components/three/GlobeCanvas.tsx
"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import Scene from "./Scene";
import { useMousePosition } from "@/hooks/useMousePosition";

export default function GlobeCanvas() {
  const mouse = useMousePosition();

  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene mouse={mouse} />
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              intensity={0.8}
            />
            <Vignette eskil={false} offset={0.1} darkness={0.8} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
```

**Step 4: Verify mouse tilt**

Move cursor around — globe should tilt subtly (max 5 degrees) toward cursor.

**Step 5: Commit**

```bash
git add hooks/useMousePosition.ts components/three/Scene.tsx components/three/GlobeCanvas.tsx
git commit -m "feat: add mouse-driven globe tilt interaction"
```

---

## Task 9: Scroll-Driven Globe State with GSAP

**Files:**
- Create: `hooks/useScrollProgress.ts`
- Create: `components/three/ScrollController.tsx`
- Modify: `components/three/Scene.tsx`
- Modify: `components/three/GlobeCanvas.tsx`

**Step 1: Create scroll progress hook**

```ts
// hooks/useScrollProgress.ts
"use client";

import { useState, useEffect } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setProgress(scrollHeight > 0 ? current / scrollHeight : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}
```

**Step 2: Create ScrollController (inside R3F)**

This component runs inside the Canvas and adjusts globe properties based on scroll:

```tsx
// components/three/ScrollController.tsx
"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ScrollControllerProps {
  scrollProgress: number;
}

export default function ScrollController({ scrollProgress }: ScrollControllerProps) {
  const { camera } = useThree();

  useFrame(() => {
    // Camera Z: zoomed in at top (6), zoomed out in middle (7.5), back in at CTA (6)
    const targetZ = 6 + Math.sin(scrollProgress * Math.PI) * 1.5;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.03);

    // Camera X: shift right during services section (scroll 0.4-0.7)
    const inServices = scrollProgress > 0.35 && scrollProgress < 0.65;
    const targetX = inServices ? 1.5 : 0;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.03);
  });

  return null;
}
```

**Step 3: Create a GlobeOpacity controller**

Add an opacity uniform that dims the globe during dense content. We'll handle this by adjusting the group's children opacity via a shared context or direct ref. For simplicity, we wrap the globe group and adjust its visible material opacity.

Add a `dimFactor` prop to Scene:

```tsx
// Update components/three/Scene.tsx to accept scrollProgress
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Globe from "./Globe";
import TexasMarker from "./TexasMarker";
import NetworkArcs from "./NetworkArcs";
import ParticleField from "./ParticleField";

interface SceneProps {
  mouse: { x: number; y: number };
  scrollProgress: number;
}

export default function Scene({ mouse, scrollProgress }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetX = mouse.y * 0.087;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      0.05
    );
  });

  // Dim factor: 1.0 in hero/CTA, 0.6 in services area
  const dimFactor =
    scrollProgress < 0.15
      ? 1.0
      : scrollProgress < 0.35
        ? 0.8
        : scrollProgress < 0.65
          ? 0.6
          : scrollProgress < 0.85
            ? 0.8
            : scrollProgress > 0.95
              ? 0.2
              : 1.0;

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3 * dimFactor} />
      <pointLight position={[10, 10, 10]} intensity={0.5 * dimFactor} />
      <Globe opacity={dimFactor} />
      <TexasMarker />
      <NetworkArcs opacity={dimFactor} />
      <ParticleField opacity={dimFactor} />
    </group>
  );
}
```

Then update Globe, NetworkArcs, and ParticleField to accept an `opacity` prop and multiply it into their material opacity. (Quick pass-through prop for each.)

**Step 4: Wire scroll into GlobeCanvas**

```tsx
// Update GlobeCanvas.tsx
"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import Scene from "./Scene";
import ScrollController from "./ScrollController";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function GlobeCanvas() {
  const mouse = useMousePosition();
  const scrollProgress = useScrollProgress();

  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene mouse={mouse} scrollProgress={scrollProgress} />
          <ScrollController scrollProgress={scrollProgress} />
          <EffectComposer>
            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={0.8} />
            <Vignette eskil={false} offset={0.1} darkness={0.8} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
```

**Step 5: Verify scroll behavior**

Scroll the page — globe should dim during middle sections, camera should shift right during services zone, zoom in/out at hero/CTA.

**Step 6: Commit**

```bash
git add hooks/useScrollProgress.ts components/three/ScrollController.tsx components/three/Scene.tsx components/three/GlobeCanvas.tsx
git commit -m "feat: add scroll-driven globe dimming and camera movement"
```

---

## Task 10: UI Components — GlassCard, Header, Footer

**Files:**
- Create: `components/ui/GlassCard.tsx`
- Create: `components/ui/Header.tsx`
- Create: `components/ui/Footer.tsx`
- Create: `components/ui/Button.tsx`

**Step 1: Create GlassCard**

```tsx
// components/ui/GlassCard.tsx
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={`glass rounded-2xl p-6 transition-all duration-300 hover:border-emerald/20 ${className}`}
    >
      {children}
    </div>
  );
}
```

**Step 2: Create Button**

```tsx
// components/ui/Button.tsx
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-display text-sm font-semibold uppercase tracking-wider transition-all duration-300";
  const variants = {
    primary:
      "bg-amber text-slate-950 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber/25",
    outline:
      "border border-emerald/30 text-emerald hover:bg-emerald/10 hover:border-emerald/50",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
```

**Step 3: Create Header**

```tsx
// components/ui/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "./Button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-lg font-bold text-white">
            Vanguard<span className="text-emerald"> Digital</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-xs font-semibold uppercase tracking-widest text-slate-300 hover:text-emerald transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Button href="/contact" variant="primary">
            Get Started
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden glass-strong border-t border-white/5 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block font-display text-sm font-semibold uppercase tracking-widest text-slate-300 hover:text-emerald transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button href="/contact" variant="primary" className="w-full justify-center mt-4">
            Get Started
          </Button>
        </nav>
      )}
    </header>
  );
}
```

**Step 4: Create Footer**

```tsx
// components/ui/Footer.tsx
import Link from "next/link";

const footerSections = [
  {
    title: "Hosting",
    links: [
      { label: "Web Hosting", href: "#" },
      { label: "Cloud Servers", href: "#" },
      { label: "Domain Names", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/about" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "SEO", href: "/services" },
      { label: "Web Design", href: "/services" },
      { label: "PPC Ads", href: "/services" },
      { label: "Social Media", href: "/services" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Status Page", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <span className="font-display text-lg font-bold text-white">
            Vanguard<span className="text-emerald"> Digital</span>
          </span>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            Full-service digital marketing agency based in Texas, serving businesses nationwide.
          </p>
        </div>

        {footerSections.map((section) => (
          <div key={section.title}>
            <h4 className="font-display text-xs font-semibold uppercase tracking-widest text-white mb-4">
              {section.title}
            </h4>
            <ul className="space-y-2.5">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-emerald transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/5 py-6 px-6">
        <p className="text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Vanguard Digital Marketing LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

**Step 5: Add Header and Footer to layout**

Update `app/layout.tsx` body:

```tsx
<body className="font-body antialiased">
  <GlobeCanvas />
  <div className="relative z-10">
    <Header />
    {children}
    <Footer />
  </div>
</body>
```

(Import Header and Footer at top.)

**Step 6: Verify header/footer render**

Confirm: glassmorphism sticky header with nav links, footer with columns, both layered above the 3D canvas.

**Step 7: Commit**

```bash
git add components/ui/ app/layout.tsx
git commit -m "feat: add glassmorphism Header, Footer, GlassCard, and Button components"
```

---

## Task 11: Homepage Sections

**Files:**
- Create: `components/sections/Hero.tsx`
- Create: `components/sections/TrustBar.tsx`
- Create: `components/sections/StatsSection.tsx`
- Create: `components/sections/ServicesGrid.tsx`
- Create: `components/sections/WhyChooseUs.tsx`
- Create: `components/sections/CTASection.tsx`
- Modify: `app/page.tsx`

**Step 1: Create Hero section**

```tsx
// components/sections/Hero.tsx
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald/20 bg-emerald/5 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            <span className="font-display text-xs font-semibold uppercase tracking-widest text-emerald">
              Texas-Based Full-Service Digital Marketing
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
            We Build Brands That{" "}
            <span className="text-amber">Dominate Digital</span>
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl">
            From strategy to execution, Vanguard Digital Marketing delivers
            full-service solutions that drive real growth. Based in Texas,
            trusted nationwide.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button href="/contact">Get Your Free Consultation</Button>
            <Button href="/services" variant="outline">
              Our Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Create TrustBar**

```tsx
// components/sections/TrustBar.tsx
const clients = [
  "Lone Star Auto",
  "Hill Country Homes",
  "Gulf Coast Medical",
  "Summit Properties",
  "Texan Energy",
  "Frontier Legal",
];

export default function TrustBar() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-xs font-display font-semibold uppercase tracking-widest text-slate-500 mb-8">
          Trusted by businesses across Texas
        </p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {clients.map((name) => (
            <span
              key={name}
              className="font-display text-sm font-semibold text-slate-500 uppercase tracking-wider"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Create StatsSection**

```tsx
// components/sections/StatsSection.tsx
"use client";

import GlassCard from "@/components/ui/GlassCard";

const stats = [
  { value: "148+", label: "Clients Served" },
  { value: "495+", label: "Projects Delivered" },
  { value: "97%", label: "Client Retention" },
  { value: "7+", label: "Years in Business" },
];

export default function StatsSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <GlassCard key={stat.label} className="text-center py-8">
            <div className="font-display text-3xl md:text-4xl font-bold text-emerald mb-2">
              {stat.value}
            </div>
            <div className="text-xs font-display uppercase tracking-widest text-slate-400">
              {stat.label}
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
```

**Step 4: Create ServicesGrid**

```tsx
// components/sections/ServicesGrid.tsx
import GlassCard from "@/components/ui/GlassCard";
import Link from "next/link";

const services = [
  {
    icon: "🔍",
    title: "SEO & Search Marketing",
    desc: "Dominate search results with data-driven SEO strategies.",
  },
  {
    icon: "🖥️",
    title: "Web Design & Development",
    desc: "Custom websites built for speed, conversions, and impact.",
  },
  {
    icon: "📱",
    title: "Social Media Marketing",
    desc: "Build your brand presence across every platform.",
  },
  {
    icon: "📈",
    title: "PPC & Google Ads",
    desc: "Maximize your ad spend with precision-targeted campaigns.",
  },
  {
    icon: "🎨",
    title: "Branding & Identity",
    desc: "We develop visual identities and brand strategies that stick.",
  },
  {
    icon: "✍️",
    title: "Content Marketing",
    desc: "Content that educates, engages, and converts your audience.",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-xs font-display font-semibold uppercase tracking-widest text-emerald mb-3">
          What We Do
        </p>
        <h2 className="text-center font-display text-3xl md:text-4xl font-bold mb-4">
          Full-Service Digital{" "}
          <span className="text-amber">Marketing Solutions</span>
        </h2>
        <p className="text-center text-slate-400 max-w-2xl mx-auto mb-12">
          We combine strategy, creativity, and technology to deliver marketing
          that moves the needle for your business.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc) => (
            <GlassCard
              key={svc.title}
              className="group hover:translate-y-[-4px] cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-emerald/10 flex items-center justify-center text-2xl mb-4 group-hover:bg-emerald/20 transition-colors">
                {svc.icon}
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">
                {svc.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                {svc.desc}
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-1 font-display text-xs font-semibold uppercase tracking-widest text-emerald hover:text-emerald-400 transition-colors"
              >
                Learn More →
              </Link>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 5: Create WhyChooseUs**

```tsx
// components/sections/WhyChooseUs.tsx
const differentiators = [
  {
    num: "01",
    title: "Strategy First",
    desc: "Every engagement starts with deep research and a custom strategy.",
  },
  {
    num: "02",
    title: "Full Transparency",
    desc: "Real-time reporting and open communication on every campaign.",
  },
  {
    num: "03",
    title: "Scalable Systems",
    desc: "Marketing infrastructure designed to grow with your business.",
  },
  {
    num: "04",
    title: "Real Results",
    desc: "Performance-driven approach with measurable ROI on every dollar.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs font-display font-semibold uppercase tracking-widest text-emerald mb-3">
            Why Choose Us
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Your Growth Is Our <span className="text-amber">Mission</span>
          </h2>
          <p className="text-slate-400 leading-relaxed mb-6">
            We&apos;re not just another agency. Vanguard Digital Marketing is a results-driven
            partner built to help Texas businesses scale with confidence, clarity,
            and measurable impact.
          </p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>✓ No long-term contracts or hidden fees</li>
            <li>✓ Dedicated account managers</li>
            <li>✓ Transparent reporting backed by data</li>
            <li>✓ White-glove service from strategy to execution</li>
          </ul>
        </div>
        <div className="space-y-4">
          {differentiators.map((d) => (
            <div
              key={d.num}
              className="glass rounded-xl p-5 flex gap-4 items-start hover:border-emerald/20 transition-colors"
            >
              <span className="font-display text-2xl font-bold text-amber/40">
                {d.num}
              </span>
              <div>
                <h3 className="font-display font-semibold mb-1">{d.title}</h3>
                <p className="text-sm text-slate-400">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 6: Create CTASection**

```tsx
// components/sections/CTASection.tsx
import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Ready to Grow <span className="text-amber">Your Business</span>?
        </h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Let&apos;s build a digital marketing strategy that drives real results. Get
          in touch with our team and discover what Vanguard can do for you.
        </p>
        <Button href="/contact">Get Your Free Consultation</Button>
      </div>
    </section>
  );
}
```

**Step 7: Assemble homepage**

```tsx
// app/page.tsx
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import StatsSection from "@/components/sections/StatsSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <StatsSection />
      <ServicesGrid />
      <WhyChooseUs />
      <CTASection />
    </main>
  );
}
```

**Step 8: Verify homepage renders**

All sections visible, glassmorphism cards over the 3D globe, header/footer present.

**Step 9: Commit**

```bash
git add components/sections/ app/page.tsx
git commit -m "feat: build complete homepage with all content sections"
```

---

## Task 12: About Page

**Files:**
- Create: `app/about/page.tsx`

**Step 1: Build About page**

Port content from existing `about.html`. Include company story, values, timeline, stats. Use GlassCard components and the same section patterns as homepage. Globe should be visible behind all content.

```tsx
// app/about/page.tsx
import type { Metadata } from "next";
import GlassCard from "@/components/ui/GlassCard";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About Us | Vanguard Digital Marketing",
  description:
    "Learn about Vanguard Digital Marketing — a Texas-based, full-service digital marketing agency serving businesses nationwide.",
};

const milestones = [
  { year: "2019", event: "Founded in Texas with a mission to deliver transparent, results-driven marketing" },
  { year: "2020", event: "Expanded to serve clients across 15 states" },
  { year: "2022", event: "Surpassed 100 active clients nationwide" },
  { year: "2024", event: "Launched Texas-based hosting and full-stack development services" },
  { year: "2026", event: "Serving 148+ clients with a 97% retention rate" },
];

export default function AboutPage() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <p className="text-xs font-display font-semibold uppercase tracking-widest text-emerald mb-3">
          About Vanguard
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Built in Texas. <span className="text-amber">Trusted Nationwide.</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Vanguard Digital Marketing is a results-driven agency helping businesses
          build strong digital presences through strategy, creativity, and technology.
        </p>
      </section>

      {/* Story */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-8 md:p-12">
            <h2 className="font-display text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              Founded with the belief that every business deserves access to world-class
              digital marketing, Vanguard has grown from a small Texas startup to a
              nationwide agency serving over 148 clients. We combine strategy, creativity,
              and relentless execution to drive measurable growth.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Our team of dedicated marketers, designers, and developers work as an
              extension of your team — with full transparency, no long-term contracts,
              and a singular focus on your success.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-center mb-12">
            Our <span className="text-amber">Journey</span>
          </h2>
          <div className="space-y-6">
            {milestones.map((m) => (
              <div key={m.year} className="glass rounded-xl p-5 flex gap-6 items-start">
                <span className="font-display text-xl font-bold text-emerald shrink-0">
                  {m.year}
                </span>
                <p className="text-slate-300 text-sm leading-relaxed">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
```

**Step 2: Verify and commit**

```bash
git add app/about/
git commit -m "feat: add About page with story and timeline"
```

---

## Task 13: Services Page

**Files:**
- Create: `app/services/page.tsx`

**Step 1: Build Services page**

Port content from `services.html`. Expandable service cards, process section, hosting upsell.

Create full page component with detailed service cards (each with description + bullet checklist), "Our Process" 4-step flow, and CTA. Use GlassCard for each service detail card.

**Step 2: Verify and commit**

```bash
git add app/services/
git commit -m "feat: add Services page with detailed cards and process flow"
```

---

## Task 14: Portfolio Page

**Files:**
- Create: `app/portfolio/page.tsx`

**Step 1: Build Portfolio page**

Filterable grid of project cards. Each card: glassmorphism, project name, category tag, brief description, hover lift effect. Filter buttons at top (All, Web Design, SEO, Branding, etc.).

Use sample/placeholder project data (can be updated with real projects later). Modal or expand-in-place for project details.

**Step 2: Verify and commit**

```bash
git add app/portfolio/
git commit -m "feat: add Portfolio page with filterable project grid"
```

---

## Task 15: Contact Page and API Route

**Files:**
- Create: `app/contact/page.tsx`
- Create: `app/api/contact/route.ts`

**Step 1: Build Contact page**

Centered glassmorphism form with fields: Name, Email, Phone, Company, Message, Service Interest (dropdown). Form uses React state and submits to `/api/contact`.

**Step 2: Create API route**

```ts
// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, phone, company, message, service } = body;

  // Validate required fields
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  // TODO: Integrate with email service (SendGrid, Resend, etc.)
  // For now, log and return success
  console.log("Contact form submission:", { name, email, phone, company, message, service });

  return NextResponse.json({ success: true });
}
```

**Step 3: Verify form submits and commit**

```bash
git add app/contact/ app/api/
git commit -m "feat: add Contact page with form and API route"
```

---

## Task 16: Page Transitions

**Files:**
- Create: `components/ui/PageTransition.tsx`
- Modify: `app/layout.tsx`

**Step 1: Create fade transition wrapper**

Use CSS transitions or framer-motion (lightweight) to fade content in/out on route changes. Wrap `{children}` in layout with the transition component.

```tsx
// components/ui/PageTransition.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className={`transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {children}
    </div>
  );
}
```

**Step 2: Wrap children in layout**

**Step 3: Verify transitions and commit**

```bash
git add components/ui/PageTransition.tsx app/layout.tsx
git commit -m "feat: add fade page transitions on route change"
```

---

## Task 17: Reduced Motion and Performance

**Files:**
- Create: `hooks/useReducedMotion.ts`
- Modify: `components/three/GlobeCanvas.tsx`
- Modify: `components/three/ParticleField.tsx`

**Step 1: Create reduced motion hook**

```ts
// hooks/useReducedMotion.ts
"use client";

import { useState, useEffect } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}
```

**Step 2: Conditionally reduce particles on mobile**

In GlobeCanvas, detect mobile via viewport width and pass lower particle count to ParticleField. If `prefers-reduced-motion`, disable auto-rotation and reduce postprocessing.

**Step 3: Verify and commit**

```bash
git add hooks/useReducedMotion.ts components/three/GlobeCanvas.tsx components/three/ParticleField.tsx
git commit -m "feat: add reduced motion support and mobile performance optimization"
```

---

## Task 18: SEO and Metadata

**Files:**
- Modify: `app/layout.tsx`
- Verify all page `metadata` exports

**Step 1: Add OpenGraph, favicon, and structured metadata**

Ensure every page has proper `<title>`, `<meta description>`, and OpenGraph tags via Next.js metadata exports. Add favicon to `app/` or `public/`.

**Step 2: Add Google Tag Manager**

Port the GTM script from existing `index.html` into `app/layout.tsx` `<head>` (replace GTM-XXXXXXX with actual ID when ready).

**Step 3: Verify and commit**

```bash
git add app/
git commit -m "feat: add SEO metadata and GTM integration"
```

---

## Task 19: Final Visual Polish and QA

**Step 1: Run dev server and test all pages**

```bash
npm run dev
```

Walk through every page. Check:
- Globe renders and rotates
- Arcs and Texas marker visible
- Scroll dimming/camera shifts work
- All glassmorphism cards readable over globe
- Header nav works on all pages
- Mobile responsive (resize browser)
- Contact form submits

**Step 2: Run production build**

```bash
npm run build && npm run start
```

Confirm no build errors, pages render in production mode.

**Step 3: Commit any polish fixes**

```bash
git add -A
git commit -m "chore: final visual polish and QA fixes"
```

---

## Summary

| Task | Description | Est. Complexity |
|------|-------------|----------------|
| 1 | Scaffold Next.js project | Low |
| 2 | Tailwind config + fonts + globals | Low |
| 3 | Globe data (coordinates) | Low |
| 4 | Canvas + basic Globe | Medium |
| 5 | Texas marker + network arcs | Medium |
| 6 | Particle field | Medium |
| 7 | Postprocessing (bloom/vignette) | Low |
| 8 | Mouse interaction | Medium |
| 9 | Scroll-driven globe state | High |
| 10 | UI components (Header/Footer/Glass) | Medium |
| 11 | Homepage sections | Medium |
| 12 | About page | Low |
| 13 | Services page | Medium |
| 14 | Portfolio page | Medium |
| 15 | Contact page + API | Medium |
| 16 | Page transitions | Low |
| 17 | Reduced motion + performance | Low |
| 18 | SEO + metadata | Low |
| 19 | Final polish + QA | Medium |
