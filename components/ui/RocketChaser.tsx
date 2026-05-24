"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* ──────────────────────────────────────────────
   Rocket — Interactive marketing co-pilot.
   - Follows the user's mouse loosely
   - Guides first-time visitors toward Academy
   - Clickable for service info
   - Drops dad-joke service bubbles
   ────────────────────────────────────────────── */

// ── Types ────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

interface RocketState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  targetX: number;
  targetY: number;
  particles: Particle[];
  bubbleTimer: number;
  frameCount: number;
  hovering: number;
}

interface ServiceMessage {
  emoji: string;
  service: string;
  joke: string;
  link: string;
}

interface Bubble {
  id: number;
  msg: ServiceMessage;
  x: number;
  y: number;
}

type RocketMode = "guiding" | "following" | "roaming";

// ── Constants ────────────────────────────────

const LERP_FOLLOW = 0.006; // gentle pull toward mouse
const LERP_ROAM = 0.008; // autonomous steering
const DAMPING = 0.97;
const WAYPOINT_RADIUS = 50;
const MARGIN = 100;
const HOVER_FRAMES = 90;
const BUBBLE_MIN = 480; // ~8s at 60fps
const BUBBLE_MAX = 720; // ~12s at 60fps
const BUBBLE_LIFETIME = 5500;
const MOUSE_IDLE_MS = 4000; // 4s of no movement → roam
const FOLLOW_OFFSET = 100; // how far from cursor to orbit

// ── Colors ───────────────────────────────────

const COLOR_AMBER = "#f59e0b";
const COLOR_AMBER_400 = "#fbbf24";
const COLOR_EMERALD = "#10b981";
const COLOR_EMERALD_400 = "#34d399";

// ── Service Messages with Dad Jokes ──────────

const SERVICE_MESSAGES: ServiceMessage[] = [
  // SEO
  { emoji: "🔍", service: "SEO", joke: "Page 2 of Google? We don't know her.", link: "/services/seo" },
  { emoji: "🔍", service: "SEO", joke: "We rank higher than my dad's expectations. And that's a tall order.", link: "/services/seo" },
  { emoji: "🔍", service: "SEO", joke: "Our SEO strategy has more layers than a corporate org chart.", link: "/services/seo" },
  { emoji: "🔍", service: "SEO", joke: "We optimize keywords so you don't have to Google 'how to Google.'", link: "/services/seo" },
  { emoji: "🔍", service: "SEO", joke: "We put your site on page one. Where it has a corner office.", link: "/services/seo" },

  // Web Design
  { emoji: "🖥️", service: "Web Design", joke: "Our sites load faster than Monday morning excuses.", link: "/services/web-design" },
  { emoji: "🖥️", service: "Web Design", joke: "404 errors? Not on our watch. We're basically web lifeguards.", link: "/services/web-design" },
  { emoji: "🖥️", service: "Web Design", joke: "We build websites so clean, even your intern can't break them.", link: "/services/web-design" },
  { emoji: "🖥️", service: "Web Design", joke: "Responsive design: looks great on phones, tablets, and your boss's ancient laptop.", link: "/services/web-design" },
  { emoji: "🖥️", service: "Web Design", joke: "Our designs have been known to cause spontaneous approval from CFOs.", link: "/services/web-design" },

  // PPC & Google Ads
  { emoji: "📈", service: "PPC Ads", joke: "Stop throwing money at Google. Let us throw it strategically.", link: "/services/ppc" },
  { emoji: "📈", service: "PPC Ads", joke: "Our click-through rates are higher than my coffee intake. That's saying something.", link: "/services/ppc" },
  { emoji: "📈", service: "PPC Ads", joke: "We turn ad spend into revenue. It's like alchemy, but with spreadsheets.", link: "/services/ppc" },
  { emoji: "📈", service: "PPC Ads", joke: "Your competitor's ads called. They're nervous.", link: "/services/ppc" },
  { emoji: "📈", service: "PPC Ads", joke: "We A/B test everything. Even our lunch orders.", link: "/services/ppc" },

  // Social Media
  { emoji: "📱", service: "Social Media", joke: "We make brands go viral. The good kind. HR approved.", link: "/services/social-media" },
  { emoji: "📱", service: "Social Media", joke: "Your competitors are posting. Just saying.", link: "/services/social-media" },
  { emoji: "📱", service: "Social Media", joke: "We turn likes into leads. It's basically corporate wizardry.", link: "/services/social-media" },
  { emoji: "📱", service: "Social Media", joke: "Our engagement rates are higher than office birthday party attendance.", link: "/services/social-media" },
  { emoji: "📱", service: "Social Media", joke: "We manage social media so you can stop asking the intern to do it.", link: "/services/social-media" },

  // Branding
  { emoji: "🎨", service: "Branding", joke: "Logos so good, your mom will finally understand what you do.", link: "/services/branding" },
  { emoji: "🎨", service: "Branding", joke: "Branding so sharp, it should come with a warning label.", link: "/services/branding" },
  { emoji: "🎨", service: "Branding", joke: "We give your brand an identity. No witness protection needed.", link: "/services/branding" },
  { emoji: "🎨", service: "Branding", joke: "Our brand guides are thicker than a Monday morning inbox.", link: "/services/branding" },

  // Content Marketing
  { emoji: "✍️", service: "Content", joke: "Our content is like a good dad joke — you can't help but share it.", link: "/services/content-marketing" },
  { emoji: "✍️", service: "Content", joke: "We write blogs that people actually read. Revolutionary, we know.", link: "/services/content-marketing" },
  { emoji: "✍️", service: "Content", joke: "Content so engaging, even the bots leave comments.", link: "/services/content-marketing" },
  { emoji: "✍️", service: "Content", joke: "We put the 'fun' in 'funnel.' Wait, that's not... never mind.", link: "/services/content-marketing" },

  // General / Strategy
  { emoji: "🚀", service: "Strategy", joke: "Marketing budget meeting? We brought snacks and ROI.", link: "/contact" },
  { emoji: "🚀", service: "Strategy", joke: "Our reports have more charts than a pirate convention.", link: "/contact" },
  { emoji: "🚀", service: "Strategy", joke: "We put the 'digital' in 'digital marketing.' The rest was already there.", link: "/contact" },
  { emoji: "🚀", service: "Growth", joke: "Your growth trajectory called. It wants to go up and to the right.", link: "/contact" },
  { emoji: "🚀", service: "Analytics", joke: "Data-driven decisions: fancier than a coin flip, more reliable than a horoscope.", link: "/contact" },
];

// ── Click responses (cycle through these) ────

const CLICK_RESPONSES: ServiceMessage[] = [
  { emoji: "🎓", service: "Academy", joke: "Want to learn digital marketing? We've got 30+ free courses waiting for you!", link: "/academy" },
  { emoji: "💼", service: "Services", joke: "Curious what we do? SEO, PPC, web design, branding — the whole shebang.", link: "/services" },
  { emoji: "📂", service: "Portfolio", joke: "Don't take our word for it. Check out the receipts.", link: "/portfolio" },
  { emoji: "👋", service: "Let's Talk", joke: "Ready to chat? Our team doesn't bite. Much.", link: "/contact" },
  { emoji: "🧑‍💼", service: "About Us", joke: "We're a Texas-based agency that runs on coffee, data, and dad jokes.", link: "/about" },
];

// ── Intro sequence (first visit) ─────────────

const INTRO_MESSAGES: ServiceMessage[] = [
  { emoji: "👋", service: "Hey there!", joke: "I'm your marketing co-pilot. I'll be hanging around if you need me!", link: "" },
  { emoji: "🎓", service: "Academy", joke: "We've got free marketing courses! Check out our Academy — it's like school, but useful.", link: "/academy" },
  { emoji: "👆", service: "Tip", joke: "Click me anytime for quick links to our services, portfolio, and more!", link: "" },
];

// ── Rocket sprite (pixel art, 8×8) ──────────

const ROCKET_SPRITE = [
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 0, 0, 0, 0, 1, 0],
];

// ── Drawing helpers ──────────────────────────

function drawRotatedRocket(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  pixelSize: number
) {
  const spriteW = pixelSize * 8;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle + Math.PI / 2);
  ctx.translate(-spriteW / 2, -spriteW / 2);

  ctx.shadowColor = COLOR_AMBER;
  ctx.shadowBlur = 10;
  ctx.fillStyle = "#e2e8f0";

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (ROCKET_SPRITE[row][col]) {
        ctx.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
      }
    }
  }

  ctx.shadowBlur = 0;
  ctx.restore();
}

function nextBubbleDelay(): number {
  return BUBBLE_MIN + Math.floor(Math.random() * (BUBBLE_MAX - BUBBLE_MIN));
}

function randomWaypoint(w: number, h: number) {
  return {
    x: MARGIN + Math.random() * (w - MARGIN * 2),
    y: MARGIN + Math.random() * (h - MARGIN * 2),
  };
}

function initRocketState(w: number, h: number): RocketState {
  const wp = randomWaypoint(w, h);
  return {
    x: w * 0.3,
    y: h * 0.5,
    vx: 0,
    vy: 0,
    angle: 0,
    targetX: wp.x,
    targetY: wp.y,
    particles: [],
    bubbleTimer: nextBubbleDelay(),
    frameCount: 0,
    hovering: 0,
  };
}

// ── Physics update ───────────────────────────

function updateRocket(
  state: RocketState,
  w: number,
  h: number,
  mode: RocketMode,
  mouseX: number,
  mouseY: number
): { state: RocketState; spawnBubble: boolean } {
  const s = { ...state };
  s.frameCount++;

  // ─── Determine target based on mode ───
  if (mode === "following") {
    // Orbit near the mouse — offset position that slowly rotates
    const orbitAngle = s.frameCount * 0.008;
    s.targetX = mouseX + Math.cos(orbitAngle) * FOLLOW_OFFSET;
    s.targetY = mouseY + Math.sin(orbitAngle) * FOLLOW_OFFSET;
  } else if (mode === "guiding") {
    // Target is set externally (Academy link position)
    // Don't override targetX/targetY
  }
  // "roaming" uses existing waypoint logic

  // ─── Hovering at waypoint ───
  if (s.hovering > 0) {
    s.hovering--;
    s.vx *= 0.92;
    s.vy *= 0.92;
    s.x += s.vx;
    s.y += s.vy;

    if (s.frameCount % 4 === 0) {
      const exhaustX = s.x - Math.cos(s.angle) * 16;
      const exhaustY = s.y - Math.sin(s.angle) * 16;
      s.particles.push({
        x: exhaustX + (Math.random() - 0.5) * 4,
        y: exhaustY + (Math.random() - 0.5) * 4,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: 15 + Math.floor(Math.random() * 10),
        maxLife: 25,
        size: 1.5 + Math.random() * 2,
      });
    }

    if (s.hovering === 0 && mode === "roaming") {
      const wp = randomWaypoint(w, h);
      s.targetX = wp.x;
      s.targetY = wp.y;
    }

    s.particles = s.particles
      .map((p) => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, vx: p.vx * 0.96, vy: p.vy * 0.96, life: p.life - 1 }))
      .filter((p) => p.life > 0);

    let spawnBubble = false;
    s.bubbleTimer--;
    if (s.bubbleTimer <= 0) {
      spawnBubble = true;
      s.bubbleTimer = nextBubbleDelay();
    }
    return { state: s, spawnBubble };
  }

  // ─── Steer toward target ───
  const dx = s.targetX - s.x;
  const dy = s.targetY - s.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  const lerpFactor = mode === "following" ? LERP_FOLLOW : LERP_ROAM;

  // In following mode, don't "arrive" — just orbit
  if (mode !== "following" && dist < WAYPOINT_RADIUS) {
    s.hovering = HOVER_FRAMES;
  }

  const approachFactor = mode === "following" ? 1 : Math.min(1, dist / 200);
  s.vx += dx * lerpFactor * approachFactor;
  s.vy += dy * lerpFactor * approachFactor;
  s.vx *= DAMPING;
  s.vy *= DAMPING;
  s.x += s.vx;
  s.y += s.vy;

  // Clamp to viewport
  s.x = Math.max(30, Math.min(w - 30, s.x));
  s.y = Math.max(30, Math.min(h - 30, s.y));

  // ─── Rotation ───
  const speed = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
  if (speed > 0.2) {
    const targetAngle = Math.atan2(s.vy, s.vx);
    let angleDiff = targetAngle - s.angle;
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
    s.angle += angleDiff * 0.06;
  }

  // ─── Exhaust particles ───
  const exhaustX = s.x - Math.cos(s.angle) * 16;
  const exhaustY = s.y - Math.sin(s.angle) * 16;

  if (s.frameCount % 2 === 0) {
    const spread = 0.8;
    s.particles.push({
      x: exhaustX + (Math.random() - 0.5) * 6,
      y: exhaustY + (Math.random() - 0.5) * 6,
      vx: -Math.cos(s.angle) * (0.8 + Math.random() * 0.8) + (Math.random() - 0.5) * spread,
      vy: -Math.sin(s.angle) * (0.8 + Math.random() * 0.8) + (Math.random() - 0.5) * spread,
      life: 20 + Math.floor(Math.random() * 15),
      maxLife: 35,
      size: 2 + Math.random() * 3,
    });
  }

  s.particles = s.particles
    .map((p) => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, vx: p.vx * 0.96, vy: p.vy * 0.96, life: p.life - 1 }))
    .filter((p) => p.life > 0);

  let spawnBubble = false;
  s.bubbleTimer--;
  if (s.bubbleTimer <= 0) {
    spawnBubble = true;
    s.bubbleTimer = nextBubbleDelay();
  }

  return { state: s, spawnBubble };
}

function renderRocket(ctx: CanvasRenderingContext2D, state: RocketState, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
  const pixelSize = Math.max(2, Math.floor(w / 250));

  for (const p of state.particles) {
    const t = p.life / p.maxLife;
    ctx.globalAlpha = t * 0.7;
    ctx.fillStyle = t > 0.6 ? COLOR_AMBER_400 : t > 0.3 ? COLOR_EMERALD_400 : COLOR_EMERALD;
    const size = p.size * (0.3 + t * 0.7);
    ctx.beginPath();
    ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  drawRotatedRocket(ctx, state.x, state.y, state.angle, pixelSize);
}

// ── Main Component ───────────────────────────

let bubbleIdCounter = 0;

export default function RocketChaser() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const router = useRouter();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clickZoneRef = useRef<HTMLButtonElement>(null);
  const stateRef = useRef<RocketState | null>(null);
  const rafRef = useRef<number>(0);

  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const lastMsgRef = useRef(-1);
  const clickCountRef = useRef(0);

  // Mouse tracking
  const mouseRef = useRef({ x: 0, y: 0, lastMove: Date.now() });
  const modeRef = useRef<RocketMode>("roaming");
  const guidePhaseRef = useRef(0); // 0 = not started, 1-3 = intro steps, 4 = done
  const guideTimerRef = useRef(0);
  const isFirstVisitRef = useRef(false);

  // ─── Bubble spawner ───
  const addBubble = useCallback((msg: ServiceMessage, x: number, y: number) => {
    const id = ++bubbleIdCounter;
    const clampedX = Math.max(160, Math.min(x, window.innerWidth - 160));
    const clampedY = Math.max(80, Math.min(y - 40, window.innerHeight - 80));
    setBubbles((prev) => [...prev, { id, msg, x: clampedX, y: clampedY }]);
    setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== id));
    }, BUBBLE_LIFETIME);
  }, []);

  // ─── Service joke bubble ───
  const spawnServiceBubble = useCallback((x: number, y: number) => {
    let idx = Math.floor(Math.random() * SERVICE_MESSAGES.length);
    if (idx === lastMsgRef.current) idx = (idx + 1) % SERVICE_MESSAGES.length;
    lastMsgRef.current = idx;
    addBubble(SERVICE_MESSAGES[idx], x, y);
  }, [addBubble]);

  // ─── Click handler ───
  const handleRocketClick = useCallback(() => {
    if (!stateRef.current) return;
    const { x, y } = stateRef.current;
    const idx = clickCountRef.current % CLICK_RESPONSES.length;
    clickCountRef.current++;
    const msg = CLICK_RESPONSES[idx];
    addBubble(msg, x, y);

    // Also navigate after a short delay so they can read the bubble
    if (msg.link) {
      setTimeout(() => router.push(msg.link), 1200);
    }
  }, [addBubble, router]);

  // ─── Guide sequence ───
  const advanceGuide = useCallback(() => {
    if (!stateRef.current) return;
    const phase = guidePhaseRef.current;
    const { x, y } = stateRef.current;

    if (phase < INTRO_MESSAGES.length) {
      addBubble(INTRO_MESSAGES[phase], x, y);
      guidePhaseRef.current = phase + 1;

      // Phase 1: after greeting, steer rocket toward Academy nav area (~top center)
      if (phase === 1 && stateRef.current) {
        stateRef.current.targetX = window.innerWidth * 0.58;
        stateRef.current.targetY = 35;
      }
    }

    // After all intro messages, switch to normal behavior
    if (guidePhaseRef.current >= INTRO_MESSAGES.length) {
      modeRef.current = "roaming";
    }
  }, [addBubble]);

  // ─── Animation loop ───
  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    if (!stateRef.current) {
      stateRef.current = initRocketState(w, h);
    }

    // ─── Mode switching ───
    const now = Date.now();
    const mouseIdle = now - mouseRef.current.lastMove > MOUSE_IDLE_MS;

    if (modeRef.current === "guiding") {
      // Advance guide on a timer
      guideTimerRef.current++;
      // Phase 0 at frame 120 (~2s), phase 1 at 300 (~5s), phase 2 at 480 (~8s)
      const thresholds = [120, 300, 480];
      if (guidePhaseRef.current < thresholds.length && guideTimerRef.current >= thresholds[guidePhaseRef.current]) {
        advanceGuide();
      }
    } else if (!mouseIdle && mouseRef.current.x > 0) {
      modeRef.current = "following";
    } else {
      modeRef.current = "roaming";
    }

    // ─── Update rocket ───
    const { state: newState, spawnBubble: shouldSpawn } = updateRocket(
      stateRef.current,
      w,
      h,
      modeRef.current,
      mouseRef.current.x,
      mouseRef.current.y
    );
    stateRef.current = newState;

    // Only spawn service bubbles when NOT in guide mode
    if (shouldSpawn && modeRef.current !== "guiding") {
      spawnServiceBubble(newState.x, newState.y);
    }

    renderRocket(ctx, stateRef.current, w, h);

    // ─── Update clickable zone position ───
    if (clickZoneRef.current) {
      clickZoneRef.current.style.left = `${newState.x}px`;
      clickZoneRef.current.style.top = `${newState.y}px`;
    }

    rafRef.current = requestAnimationFrame(loop);
  }, [spawnServiceBubble, advanceGuide]);

  // ─── Setup ───
  useEffect(() => {
    if (isMobile || reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check first visit
    try {
      if (!localStorage.getItem("vanguard_visited")) {
        isFirstVisitRef.current = true;
        modeRef.current = "guiding";
        localStorage.setItem("vanguard_visited", "1");
      }
    } catch {
      // localStorage unavailable — skip guide
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stateRef.current = initRocketState(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.lastMove = Date.now();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [loop, isMobile, reducedMotion]);

  if (isMobile || reducedMotion) return null;

  return (
    <>
      {/* Rocket canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[5] pointer-events-none"
        style={{ opacity: 0.35 }}
        aria-hidden="true"
      />

      {/* Clickable rocket hit zone — follows the rocket position */}
      <button
        ref={clickZoneRef}
        onClick={handleRocketClick}
        className="fixed z-[6] w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{ left: 0, top: 0 }}
        aria-label="Click the rocket for more info"
      >
        <span className="block w-full h-full rounded-full border border-emerald-400/30 animate-pulse" />
      </button>

      {/* Bubble layer */}
      <div className="fixed inset-0 z-[5] pointer-events-none" aria-hidden="true">
        {bubbles.map((b) => (
          <Link
            key={b.id}
            href={b.msg.link || "#"}
            onClick={(e) => { if (!b.msg.link) e.preventDefault(); }}
            className="absolute pointer-events-auto animate-rocketBubble glass rounded-2xl px-5 py-3 max-w-[280px] hover:border-emerald-400/40 transition-colors cursor-pointer group"
            style={{
              left: b.x,
              top: b.y,
              transform: "translate(-50%, -100%)",
            }}
          >
            <span className="flex items-center gap-2 mb-1">
              <span className="text-sm">{b.msg.emoji}</span>
              <span className="font-display text-[11px] font-bold uppercase tracking-widest text-emerald-400 group-hover:text-white transition-colors">
                {b.msg.service}
              </span>
            </span>
            <span className="block text-xs leading-relaxed text-slate-300/90 group-hover:text-white transition-colors">
              {b.msg.joke}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
