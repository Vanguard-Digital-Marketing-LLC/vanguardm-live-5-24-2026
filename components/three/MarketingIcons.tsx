"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/*
  Floating line-art icons representing marketing services.
  Each icon is a minimal geometric shape — faint, slowly drifting and rotating.
  Think subtle watermarks that whisper "marketing agency" without shouting.
*/

// ── Icon geometry builders ───────────────────

function makeSearchIcon(): THREE.BufferGeometry {
  // Magnifying glass — circle + handle line (SEO)
  const points: THREE.Vector3[] = [];
  const segments = 20;
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * 0.25, Math.sin(angle) * 0.25 + 0.08, 0));
  }
  // Handle
  points.push(new THREE.Vector3(-0.18, -0.12, 0));
  points.push(new THREE.Vector3(-0.35, -0.32, 0));
  return new THREE.BufferGeometry().setFromPoints(points);
}

function makeBarChart(): THREE.BufferGeometry {
  // 4 ascending bars (Analytics / PPC)
  const points: THREE.Vector3[] = [];
  const bars = [
    { x: -0.25, h: 0.15 },
    { x: -0.08, h: 0.25 },
    { x: 0.09, h: 0.2 },
    { x: 0.26, h: 0.35 },
  ];
  for (const bar of bars) {
    points.push(new THREE.Vector3(bar.x, -0.18, 0));
    points.push(new THREE.Vector3(bar.x, -0.18 + bar.h, 0));
    // Small gap to next bar (NaN break won't work, so we'll just accept connected lines)
    points.push(new THREE.Vector3(bar.x + 0.1, -0.18 + bar.h, 0));
    points.push(new THREE.Vector3(bar.x + 0.1, -0.18, 0));
  }
  // Base line
  points.push(new THREE.Vector3(-0.32, -0.18, 0));
  points.push(new THREE.Vector3(0.38, -0.18, 0));
  return new THREE.BufferGeometry().setFromPoints(points);
}

function makeTarget(): THREE.BufferGeometry {
  // Bullseye — two concentric circles + crosshair (PPC / Ads targeting)
  const points: THREE.Vector3[] = [];
  const segments = 24;
  // Outer ring
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * 0.3, Math.sin(angle) * 0.3, 0));
  }
  // Inner ring
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * 0.15, Math.sin(angle) * 0.15, 0));
  }
  // Crosshair
  points.push(new THREE.Vector3(0, 0.35, 0), new THREE.Vector3(0, -0.35, 0));
  points.push(new THREE.Vector3(-0.35, 0, 0), new THREE.Vector3(0.35, 0, 0));
  return new THREE.BufferGeometry().setFromPoints(points);
}

function makeGrowthArrow(): THREE.BufferGeometry {
  // Upward trending arrow (Growth / Strategy)
  const points: THREE.Vector3[] = [];
  // Ascending line
  points.push(new THREE.Vector3(-0.3, -0.2, 0));
  points.push(new THREE.Vector3(-0.1, 0.0, 0));
  points.push(new THREE.Vector3(0.05, -0.05, 0));
  points.push(new THREE.Vector3(0.3, 0.25, 0));
  // Arrowhead
  points.push(new THREE.Vector3(0.18, 0.25, 0));
  points.push(new THREE.Vector3(0.3, 0.25, 0));
  points.push(new THREE.Vector3(0.3, 0.13, 0));
  return new THREE.BufferGeometry().setFromPoints(points);
}

function makeFunnel(): THREE.BufferGeometry {
  // Marketing funnel — wide top narrowing down (Strategy / CRO)
  const points: THREE.Vector3[] = [];
  points.push(new THREE.Vector3(-0.3, 0.25, 0));
  points.push(new THREE.Vector3(0.3, 0.25, 0));
  points.push(new THREE.Vector3(0.12, -0.05, 0));
  points.push(new THREE.Vector3(0.08, -0.3, 0));
  points.push(new THREE.Vector3(-0.08, -0.3, 0));
  points.push(new THREE.Vector3(-0.12, -0.05, 0));
  points.push(new THREE.Vector3(-0.3, 0.25, 0));
  // Middle stage line
  points.push(new THREE.Vector3(-0.2, 0.1, 0));
  points.push(new THREE.Vector3(0.2, 0.1, 0));
  return new THREE.BufferGeometry().setFromPoints(points);
}

function makeEnvelope(): THREE.BufferGeometry {
  // Envelope — rectangle + V flap (Email Marketing)
  const points: THREE.Vector3[] = [];
  // Rectangle
  points.push(new THREE.Vector3(-0.3, -0.18, 0));
  points.push(new THREE.Vector3(0.3, -0.18, 0));
  points.push(new THREE.Vector3(0.3, 0.18, 0));
  points.push(new THREE.Vector3(-0.3, 0.18, 0));
  points.push(new THREE.Vector3(-0.3, -0.18, 0));
  // V flap
  points.push(new THREE.Vector3(-0.3, 0.18, 0));
  points.push(new THREE.Vector3(0, -0.02, 0));
  points.push(new THREE.Vector3(0.3, 0.18, 0));
  return new THREE.BufferGeometry().setFromPoints(points);
}

function makeNetwork(): THREE.BufferGeometry {
  // Connected nodes — triangle of dots with lines (Social Media)
  const points: THREE.Vector3[] = [];
  const nodes = [
    new THREE.Vector3(0, 0.28, 0),
    new THREE.Vector3(-0.25, -0.14, 0),
    new THREE.Vector3(0.25, -0.14, 0),
  ];
  // Lines connecting nodes
  points.push(nodes[0], nodes[1], nodes[1], nodes[2], nodes[2], nodes[0]);
  // Small circles at each node
  for (const node of nodes) {
    for (let i = 0; i <= 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      points.push(new THREE.Vector3(
        node.x + Math.cos(angle) * 0.06,
        node.y + Math.sin(angle) * 0.06,
        0
      ));
    }
  }
  return new THREE.BufferGeometry().setFromPoints(points);
}

function makeLineChart(): THREE.BufferGeometry {
  // Trending line chart with grid (Analytics / Reporting)
  const points: THREE.Vector3[] = [];
  // Axes
  points.push(new THREE.Vector3(-0.3, -0.2, 0), new THREE.Vector3(-0.3, 0.25, 0));
  points.push(new THREE.Vector3(-0.3, -0.2, 0), new THREE.Vector3(0.3, -0.2, 0));
  // Trend line going up with dip
  points.push(new THREE.Vector3(-0.25, -0.12, 0));
  points.push(new THREE.Vector3(-0.1, 0.0, 0));
  points.push(new THREE.Vector3(0.0, -0.04, 0));
  points.push(new THREE.Vector3(0.12, 0.1, 0));
  points.push(new THREE.Vector3(0.25, 0.22, 0));
  return new THREE.BufferGeometry().setFromPoints(points);
}

function makeMegaphone(): THREE.BufferGeometry {
  // Megaphone / speaker (Branding / PR)
  const points: THREE.Vector3[] = [];
  // Cone shape
  points.push(new THREE.Vector3(-0.2, -0.05, 0));
  points.push(new THREE.Vector3(0.25, 0.22, 0));
  points.push(new THREE.Vector3(0.25, -0.22, 0));
  points.push(new THREE.Vector3(-0.2, -0.05, 0));
  // Handle
  points.push(new THREE.Vector3(-0.2, 0.05, 0));
  points.push(new THREE.Vector3(-0.2, -0.05, 0));
  points.push(new THREE.Vector3(-0.3, -0.05, 0));
  points.push(new THREE.Vector3(-0.3, 0.05, 0));
  points.push(new THREE.Vector3(-0.2, 0.05, 0));
  // Sound waves
  for (let r = 1; r <= 2; r++) {
    const radius = 0.12 * r;
    for (let i = 0; i <= 6; i++) {
      const angle = -0.5 + (i / 6) * 1.0;
      points.push(new THREE.Vector3(
        0.28 + Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
      ));
    }
  }
  return new THREE.BufferGeometry().setFromPoints(points);
}

function makeGlobe(): THREE.BufferGeometry {
  // Globe with meridian (Web / Global Reach)
  const points: THREE.Vector3[] = [];
  const segments = 24;
  // Outer circle
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * 0.28, Math.sin(angle) * 0.28, 0));
  }
  // Vertical meridian (ellipse)
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * 0.12, Math.sin(angle) * 0.28, 0));
  }
  // Horizontal line
  points.push(new THREE.Vector3(-0.28, 0, 0), new THREE.Vector3(0.28, 0, 0));
  return new THREE.BufferGeometry().setFromPoints(points);
}

// ── All icon factories ───────────────────────

const ICON_BUILDERS = [
  { build: makeSearchIcon, color: "#10b981" },   // SEO
  { build: makeBarChart, color: "#06b6d4" },      // Analytics
  { build: makeTarget, color: "#f59e0b" },        // PPC targeting
  { build: makeGrowthArrow, color: "#10b981" },   // Growth
  { build: makeFunnel, color: "#8b5cf6" },        // Strategy / CRO
  { build: makeEnvelope, color: "#06b6d4" },      // Email
  { build: makeNetwork, color: "#f59e0b" },       // Social Media
  { build: makeLineChart, color: "#10b981" },     // Reporting
  { build: makeMegaphone, color: "#8b5cf6" },     // Branding / PR
  { build: makeGlobe, color: "#06b6d4" },         // Web / Global
];

interface IconInstance {
  geometryIdx: number;
  position: [number, number, number];
  rotation: number;
  speed: number;
  rotSpeed: number;
  phase: number;
  color: string;
}

export default function MarketingIcons() {
  const groupRef = useRef<THREE.Group>(null);

  const icons = useMemo<IconInstance[]>(() => {
    const instances: IconInstance[] = [];
    // Place 14 icons spread across the scene — each service represented at least once
    const count = 14;
    for (let i = 0; i < count; i++) {
      const iconDef = ICON_BUILDERS[i % ICON_BUILDERS.length];
      instances.push({
        geometryIdx: i % ICON_BUILDERS.length,
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 14,
          -1.5 - Math.random() * 2,
        ],
        rotation: Math.random() * Math.PI * 2,
        speed: 0.03 + Math.random() * 0.04,
        rotSpeed: (Math.random() - 0.5) * 0.08,
        phase: Math.random() * Math.PI * 2,
        color: iconDef.color,
      });
    }
    return instances;
  }, []);

  // Pre-build Three.js Line objects (avoids JSX <line> ↔ SVG conflict)
  const lineObjects = useMemo(() =>
    icons.map((icon) => {
      const geometry = ICON_BUILDERS[icon.geometryIdx].build();
      const material = new THREE.LineBasicMaterial({
        color: icon.color,
        transparent: true,
        opacity: 0.06,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const line = new THREE.Line(geometry, material);
      line.position.set(...icon.position);
      line.rotation.z = icon.rotation;
      return line;
    }), [icons]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const time = clock.getElapsedTime();

    groupRef.current.children.forEach((child, i) => {
      const icon = icons[i];
      if (!icon) return;

      // Slow drift
      child.position.x = icon.position[0] + Math.sin(time * icon.speed + icon.phase) * 0.6;
      child.position.y = icon.position[1] + Math.cos(time * icon.speed * 0.7 + icon.phase) * 0.5;

      // Very slow rotation
      child.rotation.z = icon.rotation + time * icon.rotSpeed;

      // Gentle opacity pulse
      const mat = (child as THREE.Line).material as THREE.LineBasicMaterial;
      const fade = (Math.sin(time * 0.25 + icon.phase) + 1) * 0.5;
      mat.opacity = 0.04 + fade * 0.07;
    });
  });

  return (
    <group ref={groupRef}>
      {lineObjects.map((obj, i) => (
        <primitive key={i} object={obj} />
      ))}
    </group>
  );
}
