# Marketing Video Pipeline Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate a professional video production pipeline into vanguardm.com with admin UI, client portal, and Python script orchestration.

**Architecture:** Next.js App Router pages + API routes for the web layer, Python scripts for video processing, Prisma models for data, direct PostgreSQL access from Python via psycopg2. Admin panel manages projects and triggers pipeline stages; client portal exposes delivered videos for download.

**Tech Stack:** Next.js 16 (App Router), Prisma 7, PostgreSQL, Python 3 + psycopg2 + NumPy, FFmpeg, After Effects JSX, Tailwind CSS v4, lucide-react icons.

**Spec:** `docs/superpowers/specs/2026-03-12-marketing-video-pipeline-design.md`

---

## Chunk 1: Database Schema + Sidebar Navigation

### Task 1: Add Prisma schema models and enums

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Add new enums after existing enums block (after line 82)**

Add after the `OnboardingStatus` enum:

```prisma
// ── Video Pipeline enums ────────────────────

enum VideoProjectStatus {
  INTAKE
  NORMALIZING
  EDITING
  MIXING
  REVIEW
  DELIVERED
  FAILED
  ARCHIVED
}

enum VideoPlatform {
  YOUTUBE_LONG
  YOUTUBE_SHORT
  INSTAGRAM_REEL
  TIKTOK
}

enum DeliverableStatus {
  PENDING
  PROCESSING
  COMPLETE
  FAILED
}
```

- [ ] **Step 2: Add VideoProject model after Lead/ChatSession models (end of file)**

```prisma
// ══════════════════════════════════════════════
// Phase 9: Video Production Pipeline
// ══════════════════════════════════════════════

model VideoProject {
  id            String             @id @default(cuid())
  name          String
  clientId      String
  client        Client             @relation(fields: [clientId], references: [id], onDelete: Cascade)
  status        VideoProjectStatus @default(INTAKE)
  config        Json
  notes         String?            @db.Text
  pipelineLock  DateTime?
  errorMessage  String?            @db.Text
  createdAt     DateTime           @default(now())
  updatedAt     DateTime           @updatedAt
  deliverables  VideoDeliverable[]

  @@index([clientId])
  @@index([status])
}

model VideoDeliverable {
  id             String           @id @default(cuid())
  videoProjectId String
  videoProject   VideoProject     @relation(fields: [videoProjectId], references: [id], onDelete: Cascade)
  name           String
  platform       VideoPlatform
  status         DeliverableStatus @default(PENDING)
  filePath       String?
  fileSize       BigInt?
  duration       Int?
  resolution     String?
  createdAt      DateTime         @default(now())
  updatedAt      DateTime         @updatedAt

  @@index([videoProjectId])
}
```

- [ ] **Step 3: Add relation field to Client model**

In the `Client` model (around line 390), add before the closing `}`:

```prisma
  // Phase 9: Video Pipeline
  videoProjects  VideoProject[]
```

- [ ] **Step 4: Generate Prisma client**

Run: `npx prisma generate`
Expected: "Generated Prisma Client" success message

- [ ] **Step 5: Commit**

```bash
git add prisma/schema.prisma lib/generated/
git commit -m "feat: add VideoProject and VideoDeliverable Prisma models"
```

---

### Task 2: Add Video nav item to AdminSidebar

**Files:**
- Modify: `components/admin/layout/AdminSidebar.tsx`

- [ ] **Step 1: Add Video import to lucide-react imports (line 6-23)**

Add `Video` to the import block:

```typescript
import {
  LayoutDashboard,
  Building2,
  FolderKanban,
  KanbanSquare,
  LifeBuoy,
  MessageSquare,
  UserCog,
  Bot,
  GraduationCap,
  Settings,
  ChevronLeft,
  CreditCard,
  ChevronRight,
  ClipboardList,
  Newspaper,
  BarChart3,
  Video,
} from "lucide-react";
```

- [ ] **Step 2: Add Video entry to NAV_ITEMS (after Reports, before Team — line 35-36)**

```typescript
  { label: "Reports", icon: BarChart3, href: "/admin/reports", adminOnly: true },
  { label: "Video", icon: Video, href: "/admin/video", adminOnly: true },
  { label: "Team", icon: UserCog, href: "/admin/team", adminOnly: true },
```

- [ ] **Step 3: Commit**

```bash
git add components/admin/layout/AdminSidebar.tsx
git commit -m "feat: add Video nav item to admin sidebar"
```

---

### Task 3: Add Videos nav item to PortalSidebar

**Files:**
- Modify: `components/portal/PortalSidebar.tsx`

- [ ] **Step 1: Add Video import (line 6-16)**

Add `Video` to the lucide-react import.

- [ ] **Step 2: Add Videos entry to NAV_ITEMS (after Reports, before Settings)**

```typescript
  { label: "Reports", icon: BarChart3, href: "/portal/reports" },
  { label: "Videos", icon: Video, href: "/portal/videos" },
  { label: "Settings", icon: Settings, href: "/portal/settings" },
```

- [ ] **Step 3: Commit**

```bash
git add components/portal/PortalSidebar.tsx
git commit -m "feat: add Videos nav item to portal sidebar"
```

---

## Chunk 2: Admin API Routes (CRUD + Pipeline Triggers)

### Task 4: Create video project CRUD API routes

**Files:**
- Create: `app/api/admin/video/route.ts`

- [ ] **Step 1: Create GET + POST route**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";

const DEFAULT_CONFIG = {
  brand: {
    name: "",
    primaryColor: "#3B82F6",
    secondaryColor: "#1E293B",
    accentColor: "#FFFFFF",
    fontFamily: "Montserrat",
    fontWeight: "700",
    logoPath: "",
    watermark: { position: "bottom-right", opacity: 0.6, scale: 10 },
  },
  intro: { style: "fade", duration: 5, showLogo: true, showTagline: true, tagline: "" },
  outro: { duration: 5, ctaText: "CONTACT US TODAY", ctaColor: "#3B82F6", showLogo: true, showPhone: true, phone: "", showWebsite: true, website: "" },
  lowerThirds: { style: "bar", bgColor: "#3B82F6", textColor: "#FFFFFF", position: "bottom-left" },
  captions: { enabled: true, fontColor: "#FFFFFF", strokeColor: "#000000", strokeWidth: 4, fontSize: 48, position: "center" },
  music: { style: "corporate", volume: 0.12 },
  voiceover: { source: "file", delayMs: 500 },
};

export async function GET(request: NextRequest) {
  const blocked = checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN" && role !== "TEAM") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const clientId = searchParams.get("clientId");

  const where: Record<string, unknown> = {};
  if (status && status !== "ALL") where.status = status;
  else where.status = { not: "ARCHIVED" };
  if (clientId) where.clientId = clientId;

  const videoProjects = await prisma.videoProject.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      client: { select: { id: true, name: true, domain: true } },
      _count: { select: { deliverables: true } },
    },
  });

  return NextResponse.json(videoProjects);
}

export async function POST(request: NextRequest) {
  const blocked = checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  if (!body.name || !body.clientId) {
    return NextResponse.json({ error: "name and clientId required" }, { status: 400 });
  }

  const client = await prisma.client.findUnique({ where: { id: body.clientId }, select: { name: true } });
  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

  const config = { ...DEFAULT_CONFIG, brand: { ...DEFAULT_CONFIG.brand, name: client.name } };

  const videoProject = await prisma.videoProject.create({
    data: {
      clientId: body.clientId,
      name: body.name,
      notes: body.notes || null,
      config,
    },
    include: {
      client: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(videoProject, { status: 201 });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/admin/video/route.ts
git commit -m "feat: add video project list/create API routes"
```

---

### Task 5: Create video project detail API route (GET/PATCH/DELETE)

**Files:**
- Create: `app/api/admin/video/[id]/route.ts`

- [ ] **Step 1: Create the route**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN" && role !== "TEAM") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const project = await prisma.videoProject.findUnique({
    where: { id },
    include: {
      client: { select: { id: true, name: true, domain: true } },
      deliverables: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await request.json();

  const data: Record<string, unknown> = {};
  if (body.config !== undefined) data.config = body.config;
  if (body.status !== undefined) data.status = body.status;
  if (body.notes !== undefined) data.notes = body.notes;
  if (body.errorMessage !== undefined) data.errorMessage = body.errorMessage;

  const updated = await prisma.videoProject.update({ where: { id }, data });
  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  await prisma.videoProject.update({ where: { id }, data: { status: "ARCHIVED" } });
  return NextResponse.json({ success: true });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/admin/video/[id]/route.ts
git commit -m "feat: add video project detail GET/PATCH/DELETE routes"
```

---

### Task 6: Create pipeline trigger API route

**Files:**
- Create: `app/api/admin/video/[id]/run/route.ts`

- [ ] **Step 1: Create the trigger route**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { spawn } from "child_process";
import path from "path";

const STALE_LOCK_MS = 2 * 60 * 60 * 1000; // 2 hours

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const project = await prisma.videoProject.findUnique({ where: { id } });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Concurrency check
  if (project.pipelineLock) {
    const lockAge = Date.now() - new Date(project.pipelineLock).getTime();
    if (lockAge < STALE_LOCK_MS) {
      return NextResponse.json({ error: "Pipeline already running" }, { status: 409 });
    }
  }

  // Set lock
  await prisma.videoProject.update({
    where: { id },
    data: { pipelineLock: new Date(), errorMessage: null, status: "NORMALIZING" },
  });

  // Spawn pipeline process
  const scriptPath = path.join(process.cwd(), "pipeline", "video", "scripts", "run_pipeline.py");
  const child = spawn("python3", [scriptPath, "--project", id], {
    env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL!, VIDEO_PROJECT_ID: id },
    stdio: "ignore",
    detached: true,
  });
  child.unref();

  return NextResponse.json({ message: "Pipeline started", projectId: id }, { status: 202 });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/admin/video/[id]/run/route.ts
git commit -m "feat: add pipeline trigger API route with concurrency lock"
```

---

## Chunk 3: Admin UI — Video Projects List Page

### Task 7: Create VideoStatusBadge and PlatformBadge components

**Files:**
- Create: `components/admin/video/VideoStatusBadge.tsx`
- Create: `components/admin/video/PlatformBadge.tsx`

- [ ] **Step 1: Create VideoStatusBadge**

```typescript
const STATUS_MAP: Record<string, { label: string; color: string }> = {
  INTAKE: { label: "Intake", color: "bg-cyan-400/10 text-cyan-400" },
  NORMALIZING: { label: "Normalizing", color: "bg-amber/10 text-amber" },
  EDITING: { label: "Editing", color: "bg-amber/10 text-amber" },
  MIXING: { label: "Mixing", color: "bg-amber/10 text-amber" },
  REVIEW: { label: "Review", color: "bg-purple-400/10 text-purple-400" },
  DELIVERED: { label: "Delivered", color: "bg-emerald/10 text-emerald" },
  FAILED: { label: "Failed", color: "bg-red-400/10 text-red-400" },
  ARCHIVED: { label: "Archived", color: "bg-slate-400/10 text-slate-400" },
};

export default function VideoStatusBadge({ status }: { status: string }) {
  const { label, color } = STATUS_MAP[status] ?? { label: status, color: "bg-slate-400/10 text-slate-400" };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${color}`}>
      {label}
    </span>
  );
}
```

- [ ] **Step 2: Create PlatformBadge**

```typescript
const PLATFORM_MAP: Record<string, { label: string; color: string }> = {
  YOUTUBE_LONG: { label: "YT Long", color: "bg-red-400/10 text-red-400" },
  YOUTUBE_SHORT: { label: "YT Short", color: "bg-red-400/10 text-red-400" },
  INSTAGRAM_REEL: { label: "IG Reel", color: "bg-purple-400/10 text-purple-400" },
  TIKTOK: { label: "TikTok", color: "bg-cyan-400/10 text-cyan-400" },
};

export default function PlatformBadge({ platform }: { platform: string }) {
  const { label, color } = PLATFORM_MAP[platform] ?? { label: platform, color: "bg-slate-400/10 text-slate-400" };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${color}`}>
      {label}
    </span>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/admin/video/
git commit -m "feat: add VideoStatusBadge and PlatformBadge components"
```

---

### Task 8: Create VideoProjectsClient component

**Files:**
- Create: `components/admin/video/VideoProjectsClient.tsx`

- [ ] **Step 1: Create the client component**

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Inbox, Clapperboard, Eye, CheckCircle, Plus } from "lucide-react";
import MetricCard from "@/components/admin/shared/MetricCard";
import SidePanel from "@/components/admin/shared/SidePanel";
import VideoStatusBadge from "./VideoStatusBadge";

interface VideoProject {
  id: string;
  name: string;
  status: string;
  notes: string | null;
  pipelineLock: string | null;
  errorMessage: string | null;
  createdAt: string;
  client: { id: string; name: string; domain: string | null };
  _count: { deliverables: number };
}

interface ClientOption {
  id: string;
  name: string;
}

interface Props {
  projects: VideoProject[];
  clients: ClientOption[];
  metrics: { intakeCount: number; productionCount: number; reviewCount: number; deliveredCount: number };
}

const inputClass = "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:border-emerald-400/50 focus:outline-none";
const labelClass = "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5";

export default function VideoProjectsClient({ projects, clients, metrics }: Props) {
  const router = useRouter();
  const [panelOpen, setPanelOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", clientId: "", notes: "" });

  const updateField = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const resetForm = () => {
    setForm({ name: "", clientId: "", notes: "" });
    setError("");
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.clientId) { setError("Name and client are required"); return; }
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) { const d = await res.json(); setError(d.error || "Failed"); return; }
      resetForm();
      setPanelOpen(false);
      router.refresh();
    } catch { setError("Network error"); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-white">Video Production</h1>
        <button
          onClick={() => setPanelOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald text-black font-semibold text-sm hover:bg-emerald/90 transition-colors"
        >
          <Plus size={16} /> New Video Project
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Intake" value={metrics.intakeCount} icon={Inbox} accent="cyan" />
        <MetricCard label="In Production" value={metrics.productionCount} icon={Clapperboard} accent="amber" />
        <MetricCard label="In Review" value={metrics.reviewCount} icon={Eye} accent="purple" />
        <MetricCard label="Delivered" value={metrics.deliveredCount} icon={CheckCircle} accent="emerald" />
      </div>

      <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/6 text-xs text-slate-400 uppercase tracking-wider">
              <th className="text-left p-4">Project</th>
              <th className="text-left p-4">Client</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Deliverables</th>
              <th className="text-left p-4">Created</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-white/4 hover:bg-white/2 transition-colors">
                <td className="p-4">
                  <Link href={`/admin/video/${p.id}`} className="text-sm font-medium text-white hover:text-emerald transition-colors">
                    {p.name}
                  </Link>
                </td>
                <td className="p-4 text-sm text-slate-300">{p.client.name}</td>
                <td className="p-4"><VideoStatusBadge status={p.status} /></td>
                <td className="p-4 text-sm text-slate-400">{p._count.deliverables}</td>
                <td className="p-4 text-sm text-slate-500">{new Date(p.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-slate-500">No video projects yet</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <SidePanel open={panelOpen} onClose={() => { setPanelOpen(false); resetForm(); }} title="New Video Project">
        <form onSubmit={handleCreate} className="space-y-4">
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div>
            <label className={labelClass}>Client</label>
            <select value={form.clientId} onChange={(e) => updateField("clientId", e.target.value)} className={inputClass}>
              <option value="">Select client...</option>
              {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Project Name</label>
            <input value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="March Social Campaign" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Notes</label>
            <textarea value={form.notes} onChange={(e) => updateField("notes", e.target.value)} rows={3} placeholder="Internal production notes..." className={inputClass} />
          </div>
          <button type="submit" disabled={saving} className="w-full py-2.5 rounded-lg bg-emerald text-black font-semibold text-sm hover:bg-emerald/90 disabled:opacity-50 transition-colors">
            {saving ? "Creating..." : "Create Project"}
          </button>
        </form>
      </SidePanel>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/admin/video/VideoProjectsClient.tsx
git commit -m "feat: add VideoProjectsClient component with metrics and table"
```

---

### Task 9: Create admin video list page

**Files:**
- Create: `app/admin/video/page.tsx`

- [ ] **Step 1: Create the server page**

```typescript
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import VideoProjectsClient from "@/components/admin/video/VideoProjectsClient";

export const metadata = { title: "Video Production" };

export default async function VideoPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const [intakeCount, productionCount, reviewCount, deliveredCount, projects, clients] = await Promise.all([
    prisma.videoProject.count({ where: { status: "INTAKE" } }),
    prisma.videoProject.count({ where: { status: { in: ["NORMALIZING", "EDITING", "MIXING"] } } }),
    prisma.videoProject.count({ where: { status: "REVIEW" } }),
    prisma.videoProject.count({ where: { status: "DELIVERED" } }),
    prisma.videoProject.findMany({
      where: { status: { not: "ARCHIVED" } },
      orderBy: { createdAt: "desc" },
      include: {
        client: { select: { id: true, name: true, domain: true } },
        _count: { select: { deliverables: true } },
      },
    }),
    prisma.client.findMany({
      where: { status: { in: ["ACTIVE", "PROSPECT"] } },
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  const serializedProjects = projects.map((p) => ({
    id: p.id,
    name: p.name,
    status: p.status,
    notes: p.notes,
    pipelineLock: p.pipelineLock ? p.pipelineLock.toISOString() : null,
    errorMessage: p.errorMessage,
    createdAt: p.createdAt.toISOString(),
    client: p.client,
    _count: p._count,
  }));

  return (
    <VideoProjectsClient
      projects={serializedProjects}
      clients={clients}
      metrics={{ intakeCount, productionCount, reviewCount, deliveredCount }}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/admin/video/page.tsx
git commit -m "feat: add admin video projects list page"
```

---

## Chunk 4: Admin UI — Video Project Detail Page

### Task 10: Create PipelineControls component

**Files:**
- Create: `components/admin/video/PipelineControls.tsx`

- [ ] **Step 1: Create the component**

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Play, Loader2, Wand2, Music, AudioLines, Package, Rocket } from "lucide-react";

interface Props {
  projectId: string;
  status: string;
  pipelineLock: string | null;
}

const STAGES = [
  { key: "normalize", label: "Normalize", icon: Wand2, endpoint: "normalize" },
  { key: "ae", label: "Generate AE", icon: Package, endpoint: "generate-ae" },
  { key: "music", label: "Generate Music", icon: Music, endpoint: "generate-music" },
  { key: "mix", label: "Mix Audio", icon: AudioLines, endpoint: "mix" },
  { key: "build", label: "Build Deliverables", icon: Package, endpoint: "build" },
];

export default function PipelineControls({ projectId, status, pipelineLock }: Props) {
  const router = useRouter();
  const [running, setRunning] = useState<string | null>(null);
  const [error, setError] = useState("");
  const isLocked = !!pipelineLock;

  const triggerStage = async (endpoint: string, key: string) => {
    setRunning(key);
    setError("");
    try {
      const res = await fetch(`/api/admin/video/${projectId}/${endpoint}`, { method: "POST" });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error || "Failed to trigger");
      } else {
        router.refresh();
      }
    } catch { setError("Network error"); }
    finally { setRunning(null); }
  };

  const triggerFull = async () => {
    setRunning("full");
    setError("");
    try {
      const res = await fetch(`/api/admin/video/${projectId}/run`, { method: "POST" });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error || "Failed to trigger");
      } else {
        router.refresh();
      }
    } catch { setError("Network error"); }
    finally { setRunning(null); }
  };

  const approveDeliver = async () => {
    setRunning("approve");
    try {
      const res = await fetch(`/api/admin/video/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "DELIVERED" }),
      });
      if (res.ok) router.refresh();
    } catch { setError("Network error"); }
    finally { setRunning(null); }
  };

  return (
    <div className="bg-[#111827] border border-white/6 rounded-xl p-6 space-y-4">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Pipeline Controls</h3>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {isLocked && (
        <div className="flex items-center gap-2 text-amber text-sm">
          <Loader2 size={14} className="animate-spin" /> Pipeline running...
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {STAGES.map((s) => (
          <button
            key={s.key}
            onClick={() => triggerStage(s.endpoint, s.key)}
            disabled={isLocked || running !== null}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/10 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {running === s.key ? <Loader2 size={14} className="animate-spin" /> : <s.icon size={14} />}
            {s.label}
          </button>
        ))}
      </div>

      <button
        onClick={triggerFull}
        disabled={isLocked || running !== null}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald text-black font-semibold text-sm hover:bg-emerald/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {running === "full" ? <Loader2 size={16} className="animate-spin" /> : <Rocket size={16} />}
        Run Full Pipeline
      </button>

      {status === "REVIEW" && (
        <button
          onClick={approveDeliver}
          disabled={running !== null}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-purple-500 text-white font-semibold text-sm hover:bg-purple-400 disabled:opacity-40 transition-colors"
        >
          {running === "approve" ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
          Approve & Deliver
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/admin/video/PipelineControls.tsx
git commit -m "feat: add PipelineControls component with stage triggers"
```

---

### Task 11: Create VideoProjectDetail component

**Files:**
- Create: `components/admin/video/VideoProjectDetail.tsx`

- [ ] **Step 1: Create the component**

```typescript
"use client";

import Link from "next/link";
import { ArrowLeft, Settings } from "lucide-react";
import VideoStatusBadge from "./VideoStatusBadge";
import PlatformBadge from "./PlatformBadge";
import PipelineControls from "./PipelineControls";

interface Deliverable {
  id: string;
  name: string;
  platform: string;
  status: string;
  filePath: string | null;
  fileSize: string | null;
  duration: number | null;
  resolution: string | null;
}

interface VideoProject {
  id: string;
  name: string;
  status: string;
  config: Record<string, unknown>;
  notes: string | null;
  pipelineLock: string | null;
  errorMessage: string | null;
  createdAt: string;
  client: { id: string; name: string; domain: string | null };
  deliverables: Deliverable[];
}

function formatBytes(bytes: string | null): string {
  if (!bytes) return "—";
  const b = Number(bytes);
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  if (b < 1073741824) return `${(b / 1048576).toFixed(1)} MB`;
  return `${(b / 1073741824).toFixed(2)} GB`;
}

export default function VideoProjectDetail({ project }: { project: VideoProject }) {
  const config = project.config as { brand?: { name?: string; primaryColor?: string; secondaryColor?: string; logoPath?: string } };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/video" className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-display font-bold text-white">{project.name}</h1>
            <p className="text-sm text-slate-400">{project.client.name}</p>
          </div>
          <VideoStatusBadge status={project.status} />
        </div>
        <Link
          href={`/admin/video/${project.id}/config`}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Settings size={14} /> Edit Config
        </Link>
      </div>

      {/* Error banner */}
      {project.errorMessage && (
        <div className="bg-red-400/10 border border-red-400/20 rounded-xl p-4 text-red-400 text-sm">
          <strong>Pipeline Error:</strong> {project.errorMessage}
        </div>
      )}

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column — 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Brand Config card */}
          <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Brand Config</h3>
            <div className="flex items-center gap-4">
              {config.brand?.primaryColor && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-lg border border-white/10" style={{ backgroundColor: config.brand.primaryColor }} title="Primary" />
                  <div className="w-8 h-8 rounded-lg border border-white/10" style={{ backgroundColor: config.brand.secondaryColor }} title="Secondary" />
                </div>
              )}
              <span className="text-sm text-slate-300">{config.brand?.name || "No brand name set"}</span>
            </div>
          </div>

          {/* Notes */}
          {project.notes && (
            <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Notes</h3>
              <p className="text-sm text-slate-300 whitespace-pre-wrap">{project.notes}</p>
            </div>
          )}

          {/* Deliverables table */}
          <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/6">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Deliverables</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/6 text-xs text-slate-500 uppercase tracking-wider">
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Platform</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Resolution</th>
                  <th className="text-left p-3">Duration</th>
                  <th className="text-left p-3">Size</th>
                </tr>
              </thead>
              <tbody>
                {project.deliverables.map((d) => (
                  <tr key={d.id} className="border-b border-white/4">
                    <td className="p-3 text-sm text-white">{d.name}</td>
                    <td className="p-3"><PlatformBadge platform={d.platform} /></td>
                    <td className="p-3"><VideoStatusBadge status={d.status} /></td>
                    <td className="p-3 text-sm text-slate-400">{d.resolution || "—"}</td>
                    <td className="p-3 text-sm text-slate-400">{d.duration ? `${d.duration}s` : "—"}</td>
                    <td className="p-3 text-sm text-slate-400">{formatBytes(d.fileSize)}</td>
                  </tr>
                ))}
                {project.deliverables.length === 0 && (
                  <tr><td colSpan={6} className="p-6 text-center text-slate-500 text-sm">No deliverables yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column — 1/3 */}
        <div className="space-y-6">
          <PipelineControls projectId={project.id} status={project.status} pipelineLock={project.pipelineLock} />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/admin/video/VideoProjectDetail.tsx
git commit -m "feat: add VideoProjectDetail component with deliverables table"
```

---

### Task 12: Create admin video detail page

**Files:**
- Create: `app/admin/video/[id]/page.tsx`

- [ ] **Step 1: Create the server page**

```typescript
import { redirect, notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import VideoProjectDetail from "@/components/admin/video/VideoProjectDetail";

export const metadata = { title: "Video Project" };

export default async function VideoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const { id } = await params;
  const project = await prisma.videoProject.findUnique({
    where: { id },
    include: {
      client: { select: { id: true, name: true, domain: true } },
      deliverables: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!project) notFound();

  const serialized = {
    id: project.id,
    name: project.name,
    status: project.status,
    config: project.config as Record<string, unknown>,
    notes: project.notes,
    pipelineLock: project.pipelineLock ? project.pipelineLock.toISOString() : null,
    errorMessage: project.errorMessage,
    createdAt: project.createdAt.toISOString(),
    client: project.client,
    deliverables: project.deliverables.map((d) => ({
      id: d.id,
      name: d.name,
      platform: d.platform,
      status: d.status,
      filePath: d.filePath,
      fileSize: d.fileSize ? d.fileSize.toString() : null,
      duration: d.duration,
      resolution: d.resolution,
    })),
  };

  return <VideoProjectDetail project={serialized} />;
}
```

- [ ] **Step 2: Commit**

```bash
git add app/admin/video/[id]/page.tsx
git commit -m "feat: add admin video project detail page"
```

---

## Chunk 5: Client Portal — Video Pages

### Task 13: Create portal video list and detail pages

**Files:**
- Create: `app/portal/videos/page.tsx`
- Create: `app/portal/videos/[id]/page.tsx`
- Create: `components/portal/videos/PortalVideosClient.tsx`
- Create: `app/api/portal/videos/[id]/download/[deliverableId]/route.ts`

- [ ] **Step 1: Create PortalVideosClient**

```typescript
"use client";

import Link from "next/link";
import { Video } from "lucide-react";

interface VideoProject {
  id: string;
  name: string;
  createdAt: string;
  deliverableCount: number;
}

export default function PortalVideosClient({ projects }: { projects: VideoProject[] }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold text-white">Videos</h1>
      {projects.length === 0 ? (
        <div className="bg-[#111827] border border-white/6 rounded-xl p-12 text-center">
          <Video size={40} className="mx-auto text-slate-500 mb-3" />
          <p className="text-slate-400">No videos delivered yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <Link key={p.id} href={`/portal/videos/${p.id}`}
              className="bg-[#111827] border border-white/6 rounded-xl p-6 hover:border-emerald/30 transition-colors">
              <h3 className="font-semibold text-white mb-1">{p.name}</h3>
              <p className="text-xs text-slate-500">Delivered {new Date(p.createdAt).toLocaleDateString()}</p>
              <p className="text-sm text-slate-400 mt-3">{p.deliverableCount} deliverable{p.deliverableCount !== 1 ? "s" : ""}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create portal videos list page**

```typescript
// app/portal/videos/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import PortalVideosClient from "@/components/portal/videos/PortalVideosClient";

export const metadata = { title: "Videos" };

export default async function PortalVideosPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");
  if (session.user.role !== "CLIENT" || !session.user.clientId) redirect("/portal");

  const projects = await prisma.videoProject.findMany({
    where: { clientId: session.user.clientId, status: "DELIVERED" },
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { deliverables: true } } },
  });

  const serialized = projects.map((p) => ({
    id: p.id,
    name: p.name,
    createdAt: p.updatedAt.toISOString(),
    deliverableCount: p._count.deliverables,
  }));

  return <PortalVideosClient projects={serialized} />;
}
```

- [ ] **Step 3: Create portal video detail page**

```typescript
// app/portal/videos/[id]/page.tsx
import { redirect, notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { Download } from "lucide-react";
import PlatformBadge from "@/components/admin/video/PlatformBadge";

export const metadata = { title: "Video Details" };

export default async function PortalVideoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");
  if (session.user.role !== "CLIENT" || !session.user.clientId) redirect("/portal");

  const { id } = await params;
  const project = await prisma.videoProject.findUnique({
    where: { id },
    include: { deliverables: { where: { status: "COMPLETE" } } },
  });

  if (!project || project.clientId !== session.user.clientId || project.status !== "DELIVERED") notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold text-white">{project.name}</h1>
      <p className="text-sm text-slate-400">Delivered {project.updatedAt.toLocaleDateString()}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {project.deliverables.map((d) => (
          <div key={d.id} className="bg-[#111827] border border-white/6 rounded-xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">{d.name}</span>
              <PlatformBadge platform={d.platform} />
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              {d.resolution && <span>{d.resolution}</span>}
              {d.duration && <span>{d.duration}s</span>}
            </div>
            <a
              href={`/api/portal/videos/${project.id}/download/${d.id}`}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-emerald text-black font-semibold text-sm hover:bg-emerald/90 transition-colors"
            >
              <Download size={14} /> Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create download API route with path traversal protection**

```typescript
// app/api/portal/videos/[id]/download/[deliverableId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { createReadStream, statSync } from "fs";
import path from "path";
import { Readable } from "stream";

const SAFE_PREFIX = path.resolve(process.cwd(), "pipeline", "video", "projects");

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; deliverableId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "CLIENT" || !session.user.clientId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, deliverableId } = await params;

  const project = await prisma.videoProject.findUnique({ where: { id }, select: { clientId: true, status: true } });
  if (!project || project.clientId !== session.user.clientId || project.status !== "DELIVERED") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const deliverable = await prisma.videoDeliverable.findUnique({ where: { id: deliverableId } });
  if (!deliverable || deliverable.videoProjectId !== id || !deliverable.filePath) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Path traversal protection
  const resolvedPath = path.resolve(deliverable.filePath);
  if (!resolvedPath.startsWith(SAFE_PREFIX)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const stat = statSync(resolvedPath);
    const stream = createReadStream(resolvedPath);
    const webStream = Readable.toWeb(stream) as ReadableStream;

    return new NextResponse(webStream, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": `attachment; filename="${deliverable.name}"`,
        "Content-Length": stat.size.toString(),
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
```

- [ ] **Step 5: Commit**

```bash
git add app/portal/videos/ components/portal/videos/ app/api/portal/videos/
git commit -m "feat: add client portal video pages with secure download"
```

---

## Chunk 6: Python Pipeline Scripts

### Task 14: Create pipeline utility modules

**Files:**
- Create: `pipeline/video/scripts/utils/__init__.py`
- Create: `pipeline/video/scripts/utils/config_loader.py`
- Create: `pipeline/video/scripts/utils/logger.py`
- Create: `pipeline/video/scripts/utils/ffmpeg_helpers.py`
- Create: `pipeline/video/scripts/utils/db.py`
- Create: `pipeline/video/requirements.txt`

- [ ] **Step 1: Create requirements.txt**

```
psycopg2-binary>=2.9
numpy>=1.24
```

- [ ] **Step 2: Create db.py — PostgreSQL helper**

```python
import os
import json
import psycopg2
from datetime import datetime

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def update_project_status(project_id: str, status: str, error_message: str = None):
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            if error_message:
                cur.execute(
                    'UPDATE "VideoProject" SET status = %s, "errorMessage" = %s, "pipelineLock" = NULL, "updatedAt" = NOW() WHERE id = %s',
                    (status, error_message, project_id)
                )
            else:
                cur.execute(
                    'UPDATE "VideoProject" SET status = %s, "errorMessage" = NULL, "updatedAt" = NOW() WHERE id = %s',
                    (status, project_id)
                )
        conn.commit()
    finally:
        conn.close()

def set_pipeline_lock(project_id: str):
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                'UPDATE "VideoProject" SET "pipelineLock" = NOW(), "updatedAt" = NOW() WHERE id = %s',
                (project_id,)
            )
        conn.commit()
    finally:
        conn.close()

def clear_pipeline_lock(project_id: str):
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                'UPDATE "VideoProject" SET "pipelineLock" = NULL, "updatedAt" = NOW() WHERE id = %s',
                (project_id,)
            )
        conn.commit()
    finally:
        conn.close()

def get_project_config(project_id: str) -> dict:
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute('SELECT config FROM "VideoProject" WHERE id = %s', (project_id,))
            row = cur.fetchone()
            if not row:
                raise ValueError(f"Project {project_id} not found")
            config = row[0]
            return config if isinstance(config, dict) else json.loads(config)
    finally:
        conn.close()

def create_deliverable(project_id: str, name: str, platform: str):
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                'INSERT INTO "VideoDeliverable" (id, "videoProjectId", name, platform, status, "createdAt", "updatedAt") VALUES (gen_random_uuid()::text, %s, %s, %s, %s, NOW(), NOW()) RETURNING id',
                (project_id, name, platform, "PROCESSING")
            )
            row = cur.fetchone()
        conn.commit()
        return row[0]
    finally:
        conn.close()

def complete_deliverable(deliverable_id: str, file_path: str, file_size: int, duration: int, resolution: str):
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                'UPDATE "VideoDeliverable" SET status = %s, "filePath" = %s, "fileSize" = %s, duration = %s, resolution = %s, "updatedAt" = NOW() WHERE id = %s',
                ("COMPLETE", file_path, file_size, duration, resolution, deliverable_id)
            )
        conn.commit()
    finally:
        conn.close()

def fail_deliverable(deliverable_id: str):
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                'UPDATE "VideoDeliverable" SET status = %s, "updatedAt" = NOW() WHERE id = %s',
                ("FAILED", deliverable_id)
            )
        conn.commit()
    finally:
        conn.close()
```

- [ ] **Step 3: Create config_loader.py**

```python
import json
import os

def load_config(project_dir: str) -> dict:
    config_path = os.path.join(project_dir, "config.json")
    with open(config_path, "r") as f:
        return json.load(f)

def save_config(project_dir: str, config: dict):
    config_path = os.path.join(project_dir, "config.json")
    with open(config_path, "w") as f:
        json.dump(config, f, indent=2)
```

- [ ] **Step 4: Create logger.py**

```python
import os
import sys
import logging
from datetime import datetime

def setup_logger(project_dir: str, name: str = "pipeline") -> logging.Logger:
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)
    log_path = os.path.join(project_dir, "project.log")
    fh = logging.FileHandler(log_path, encoding="utf-8")
    fh.setLevel(logging.DEBUG)
    ch = logging.StreamHandler(sys.stdout)
    ch.setLevel(logging.INFO)
    fmt = logging.Formatter("[%(asctime)s] %(levelname)s: %(message)s", datefmt="%Y-%m-%d %H:%M:%S")
    fh.setFormatter(fmt)
    ch.setFormatter(fmt)
    logger.addHandler(fh)
    logger.addHandler(ch)
    return logger
```

- [ ] **Step 5: Create ffmpeg_helpers.py**

```python
import subprocess
import json
import os
import sys

# Fix Windows encoding
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

def run_ffmpeg(args: list[str], logger=None):
    cmd = ["ffmpeg", "-y"] + args
    if logger:
        logger.info(f"FFmpeg: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        error = result.stderr[-500:] if result.stderr else "Unknown error"
        raise RuntimeError(f"FFmpeg failed: {error}")
    return result

def get_video_info(file_path: str) -> dict:
    cmd = ["ffprobe", "-v", "quiet", "-print_format", "json", "-show_format", "-show_streams", file_path]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(f"ffprobe failed for {file_path}")
    data = json.loads(result.stdout)
    video_stream = next((s for s in data.get("streams", []) if s["codec_type"] == "video"), None)
    duration = float(data.get("format", {}).get("duration", 0))
    width = int(video_stream["width"]) if video_stream else 0
    height = int(video_stream["height"]) if video_stream else 0
    return {"duration": int(duration), "width": width, "height": height, "resolution": f"{width}x{height}"}

def normalize_clip(input_path: str, output_path: str, target_width: int = 1920, target_height: int = 1080, logger=None):
    run_ffmpeg([
        "-i", input_path,
        "-vf", f"scale={target_width}:{target_height}:force_original_aspect_ratio=decrease,pad={target_width}:{target_height}:(ow-iw)/2:(oh-ih)/2",
        "-c:v", "libx264", "-preset", "medium", "-crf", "18",
        "-c:a", "aac", "-b:a", "192k",
        "-r", "30",
        output_path,
    ], logger)
```

- [ ] **Step 6: Create __init__.py**

Empty file.

- [ ] **Step 7: Commit**

```bash
git add pipeline/video/
git commit -m "feat: add pipeline utility modules (db, config, logger, ffmpeg)"
```

---

### Task 15: Create normalize.py

**Files:**
- Create: `pipeline/video/scripts/normalize.py`

- [ ] **Step 1: Create the script**

```python
import os
import glob
from utils.ffmpeg_helpers import normalize_clip, get_video_info
from utils.logger import setup_logger

def normalize(project_dir: str, logger=None):
    footage_dir = os.path.join(project_dir, "footage")
    output_dir = os.path.join(project_dir, "normalized")
    os.makedirs(output_dir, exist_ok=True)

    clips = glob.glob(os.path.join(footage_dir, "*.*"))
    video_exts = {".mp4", ".mov", ".avi", ".mkv", ".webm", ".gif"}
    clips = [c for c in clips if os.path.splitext(c)[1].lower() in video_exts]

    if not clips:
        raise FileNotFoundError(f"No video files found in {footage_dir}")

    logger.info(f"Normalizing {len(clips)} clips")
    for clip in clips:
        base = os.path.splitext(os.path.basename(clip))[0]
        out_path = os.path.join(output_dir, f"{base}.mp4")
        logger.info(f"  {os.path.basename(clip)} -> {os.path.basename(out_path)}")
        normalize_clip(clip, out_path, logger=logger)
        info = get_video_info(out_path)
        logger.info(f"    {info['resolution']}, {info['duration']}s")

    logger.info(f"Normalization complete: {len(clips)} clips")
    return output_dir

if __name__ == "__main__":
    import sys
    project_dir = sys.argv[1] if len(sys.argv) > 1 else "."
    logger = setup_logger(project_dir)
    normalize(project_dir, logger)
```

- [ ] **Step 2: Commit**

```bash
git add pipeline/video/scripts/normalize.py
git commit -m "feat: add normalize.py clip conversion script"
```

---

### Task 16: Create generate_music.py

**Files:**
- Create: `pipeline/video/scripts/generate_music.py`

- [ ] **Step 1: Create the script** (adapted from gaming pipeline with mood presets)

```python
import os
import numpy as np
from utils.logger import setup_logger

SAMPLE_RATE = 44100
PRESETS = {
    "corporate": {"base_hz": 65.41, "chord": [1, 1.25, 1.5], "bpm": 100, "pulse_vol": 0.03, "shimmer": True, "noise": 0.003},
    "upbeat": {"base_hz": 73.42, "chord": [1, 1.26, 1.5], "bpm": 130, "pulse_vol": 0.05, "shimmer": True, "noise": 0.004},
    "ambient": {"base_hz": 55.0, "chord": [1, 1.25, 1.5], "bpm": 0, "pulse_vol": 0.0, "shimmer": True, "noise": 0.005},
    "energetic": {"base_hz": 82.41, "chord": [1, 1.26, 1.5, 2.0], "bpm": 140, "pulse_vol": 0.06, "shimmer": True, "noise": 0.004},
}

def generate_music(project_dir: str, style: str = "corporate", duration: float = 120.0, logger=None):
    preset = PRESETS.get(style, PRESETS["corporate"])
    output_dir = os.path.join(project_dir, "music")
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, "bg_music.wav")

    if logger:
        logger.info(f"Generating {style} music ({duration}s)")

    t = np.linspace(0, duration, int(SAMPLE_RATE * duration), dtype=np.float32)
    audio = np.zeros_like(t)

    # Sub bass
    lfo = 1.0 + 0.02 * np.sin(2 * np.pi * 0.05 * t)
    audio += 0.10 * np.sin(2 * np.pi * preset["base_hz"] * lfo * t)

    # Chord pad
    for ratio in preset["chord"]:
        freq = preset["base_hz"] * 4 * ratio
        swell = 0.5 + 0.5 * np.sin(2 * np.pi * 0.08 * t)
        audio += 0.04 * swell * np.sin(2 * np.pi * freq * t)

    # Shimmer
    if preset["shimmer"]:
        audio += 0.015 * np.sin(2 * np.pi * preset["base_hz"] * 16 * t + np.sin(2 * np.pi * 0.1 * t))

    # Pulse
    if preset["bpm"] > 0:
        pulse_freq = preset["bpm"] / 60.0
        pulse = np.sin(2 * np.pi * pulse_freq * t)
        pulse = np.where(pulse > 0.7, 1.0, 0.0)
        audio += preset["pulse_vol"] * pulse * np.sin(2 * np.pi * preset["base_hz"] * 2 * t)

    # Noise texture
    noise = np.random.randn(len(t)).astype(np.float32) * preset["noise"]
    from scipy.signal import butter, lfilter
    try:
        b, a = butter(4, 500 / (SAMPLE_RATE / 2), btype="low")
        noise = lfilter(b, a, noise).astype(np.float32)
    except ImportError:
        pass  # skip filtering if scipy unavailable
    audio += noise

    # Fade in/out
    fade_in = int(3 * SAMPLE_RATE)
    fade_out = int(4 * SAMPLE_RATE)
    audio[:fade_in] *= np.linspace(0, 1, fade_in)
    audio[-fade_out:] *= np.linspace(1, 0, fade_out)

    # Normalize
    peak = np.max(np.abs(audio))
    if peak > 0:
        audio = audio * (0.7 / peak)

    # Write WAV
    audio_16 = (audio * 32767).astype(np.int16)
    import struct
    with open(output_path, "wb") as f:
        num_samples = len(audio_16)
        data_size = num_samples * 2
        f.write(b"RIFF")
        f.write(struct.pack("<I", 36 + data_size))
        f.write(b"WAVE")
        f.write(b"fmt ")
        f.write(struct.pack("<IHHIIHH", 16, 1, 1, SAMPLE_RATE, SAMPLE_RATE * 2, 2, 16))
        f.write(b"data")
        f.write(struct.pack("<I", data_size))
        f.write(audio_16.tobytes())

    if logger:
        logger.info(f"Music generated: {output_path} ({duration}s, {style})")
    return output_path

if __name__ == "__main__":
    import sys
    project_dir = sys.argv[1] if len(sys.argv) > 1 else "."
    style = sys.argv[2] if len(sys.argv) > 2 else "corporate"
    logger = setup_logger(project_dir)
    generate_music(project_dir, style, logger=logger)
```

- [ ] **Step 2: Commit**

```bash
git add pipeline/video/scripts/generate_music.py
git commit -m "feat: add procedural music generator with mood presets"
```

---

### Task 17: Create mix_audio.py

**Files:**
- Create: `pipeline/video/scripts/mix_audio.py`

- [ ] **Step 1: Create the script**

```python
import os
from utils.ffmpeg_helpers import run_ffmpeg
from utils.logger import setup_logger

def mix_audio(project_dir: str, vo_delay_ms: int = 500, music_volume: float = 0.12, logger=None):
    vo_path = os.path.join(project_dir, "voiceover", "voiceover.mp3")
    music_path = os.path.join(project_dir, "music", "bg_music.wav")
    output_path = os.path.join(project_dir, "mixed_audio.aac")

    if not os.path.exists(vo_path):
        raise FileNotFoundError(f"Voiceover not found: {vo_path}")
    if not os.path.exists(music_path):
        raise FileNotFoundError(f"Music not found: {music_path}")

    if logger:
        logger.info(f"Mixing audio: VO delay={vo_delay_ms}ms, music vol={music_volume}")

    filter_complex = (
        f"[0:a]adelay={vo_delay_ms}|{vo_delay_ms},apad[vo];"
        f"[1:a]volume={music_volume}[music];"
        f"[vo][music]amix=inputs=2:duration=longest:dropout_transition=2,volume=2.0,afade=t=out:st=0:d=3[aout]"
    )

    run_ffmpeg([
        "-i", vo_path,
        "-i", music_path,
        "-filter_complex", filter_complex,
        "-map", "[aout]",
        "-c:a", "aac", "-b:a", "192k",
        output_path,
    ], logger)

    if logger:
        logger.info(f"Audio mixed: {output_path}")
    return output_path

if __name__ == "__main__":
    import sys
    project_dir = sys.argv[1] if len(sys.argv) > 1 else "."
    logger = setup_logger(project_dir)
    mix_audio(project_dir, logger=logger)
```

- [ ] **Step 2: Commit**

```bash
git add pipeline/video/scripts/mix_audio.py
git commit -m "feat: add audio mixing script (VO + background music)"
```

---

### Task 18: Create build_deliverables.py

**Files:**
- Create: `pipeline/video/scripts/build_deliverables.py`

- [ ] **Step 1: Create the script**

```python
import os
import glob
from utils.ffmpeg_helpers import run_ffmpeg, get_video_info
from utils.config_loader import load_config
from utils.logger import setup_logger

PLATFORMS = {
    "YOUTUBE_LONG": {"width": 1920, "height": 1080, "max_duration": None, "suffix": "youtube_long"},
    "YOUTUBE_SHORT": {"width": 1080, "height": 1920, "max_duration": 60, "suffix": "youtube_short"},
    "INSTAGRAM_REEL": {"width": 1080, "height": 1920, "max_duration": 90, "suffix": "instagram_reel"},
    "TIKTOK": {"width": 1080, "height": 1920, "max_duration": 60, "suffix": "tiktok"},
}

def build_deliverables(project_dir: str, logger=None):
    config = load_config(project_dir)
    output_dir = os.path.join(project_dir, "output")
    os.makedirs(output_dir, exist_ok=True)

    # Find the AE-rendered master or concatenated normalized clips
    master = os.path.join(project_dir, "ae", "master_render.mp4")
    if not os.path.exists(master):
        # Fallback: concat normalized clips
        normalized = sorted(glob.glob(os.path.join(project_dir, "normalized", "*.mp4")))
        if not normalized:
            raise FileNotFoundError("No master render or normalized clips found")
        # Create concat list
        concat_list = os.path.join(project_dir, "concat_list.txt")
        with open(concat_list, "w") as f:
            for clip in normalized:
                f.write(f"file '{clip}'\n")
        master = os.path.join(project_dir, "master_concat.mp4")
        run_ffmpeg(["-f", "concat", "-safe", "0", "-i", concat_list, "-c", "copy", master], logger)

    mixed_audio = os.path.join(project_dir, "mixed_audio.aac")
    has_audio = os.path.exists(mixed_audio)

    results = []
    for platform, spec in PLATFORMS.items():
        out_path = os.path.join(output_dir, f"{spec['suffix']}.mp4")
        if logger:
            logger.info(f"Building {platform}: {spec['width']}x{spec['height']}")

        vf = f"scale={spec['width']}:{spec['height']}:force_original_aspect_ratio=decrease,pad={spec['width']}:{spec['height']}:(ow-iw)/2:(oh-ih)/2"

        args = ["-i", master]
        if has_audio:
            args += ["-i", mixed_audio]

        args += ["-vf", vf, "-c:v", "libx264", "-preset", "medium", "-crf", "18"]

        if spec["max_duration"]:
            args += ["-t", str(spec["max_duration"])]

        if has_audio:
            args += ["-map", "0:v", "-map", "1:a", "-c:a", "aac", "-b:a", "192k", "-shortest"]
        else:
            args += ["-an"]

        args.append(out_path)
        run_ffmpeg(args, logger)

        info = get_video_info(out_path)
        file_size = os.path.getsize(out_path)
        results.append({
            "platform": platform,
            "path": out_path,
            "name": f"{spec['suffix']}.mp4",
            "size": file_size,
            "duration": info["duration"],
            "resolution": info["resolution"],
        })

        if logger:
            logger.info(f"  -> {out_path} ({info['resolution']}, {info['duration']}s, {file_size / 1048576:.1f}MB)")

    return results

if __name__ == "__main__":
    import sys
    project_dir = sys.argv[1] if len(sys.argv) > 1 else "."
    logger = setup_logger(project_dir)
    build_deliverables(project_dir, logger)
```

- [ ] **Step 2: Commit**

```bash
git add pipeline/video/scripts/build_deliverables.py
git commit -m "feat: add multi-platform deliverable builder"
```

---

### Task 19: Create run_pipeline.py orchestrator

**Files:**
- Create: `pipeline/video/scripts/run_pipeline.py`

- [ ] **Step 1: Create the orchestrator**

```python
#!/usr/bin/env python3
import os
import sys
import argparse

# Add scripts dir to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from utils.db import (
    get_project_config, update_project_status, set_pipeline_lock,
    clear_pipeline_lock, create_deliverable, complete_deliverable, fail_deliverable,
)
from utils.config_loader import save_config
from utils.logger import setup_logger
from normalize import normalize
from generate_music import generate_music
from mix_audio import mix_audio
from build_deliverables import build_deliverables

def main():
    parser = argparse.ArgumentParser(description="Run video production pipeline")
    parser.add_argument("--project", required=True, help="VideoProject ID")
    args = parser.parse_args()

    project_id = args.project
    base_dir = os.path.join(os.path.dirname(__file__), "..", "projects", project_id)
    os.makedirs(base_dir, exist_ok=True)

    logger = setup_logger(base_dir)
    logger.info(f"=== Pipeline start: {project_id} ===")

    try:
        # Load config from DB and snapshot to disk
        config = get_project_config(project_id)
        save_config(base_dir, config)
        logger.info(f"Config loaded for: {config.get('brand', {}).get('name', 'unknown')}")

        # Ensure project directories exist
        for subdir in ["footage", "normalized", "voiceover", "music", "ae", "output"]:
            os.makedirs(os.path.join(base_dir, subdir), exist_ok=True)

        # Stage 1: Normalize
        logger.info("--- Stage 1: Normalize ---")
        update_project_status(project_id, "NORMALIZING")
        normalize(base_dir, logger)

        # Stage 2: Generate AE project (placeholder — requires AE templates)
        logger.info("--- Stage 2: Generate AE Project ---")
        update_project_status(project_id, "EDITING")
        logger.info("AE project generation: skipped (manual AE step)")

        # Stage 3: Generate music
        logger.info("--- Stage 3: Generate Music ---")
        music_style = config.get("music", {}).get("style", "corporate")
        generate_music(base_dir, style=music_style, logger=logger)

        # Stage 4: Mix audio
        logger.info("--- Stage 4: Mix Audio ---")
        update_project_status(project_id, "MIXING")
        vo_delay = config.get("voiceover", {}).get("delayMs", 500)
        music_vol = config.get("music", {}).get("volume", 0.12)
        vo_path = os.path.join(base_dir, "voiceover", "voiceover.mp3")
        if os.path.exists(vo_path):
            mix_audio(base_dir, vo_delay_ms=vo_delay, music_volume=music_vol, logger=logger)
        else:
            logger.warning("No voiceover file found, skipping audio mix")

        # Stage 5: Build deliverables
        logger.info("--- Stage 5: Build Deliverables ---")
        results = build_deliverables(base_dir, logger)

        # Register deliverables in DB
        for r in results:
            try:
                d_id = create_deliverable(project_id, r["name"], r["platform"])
                complete_deliverable(d_id, r["path"], r["size"], r["duration"], r["resolution"])
            except Exception as e:
                logger.error(f"Failed to register deliverable {r['name']}: {e}")

        # Done — set to REVIEW
        update_project_status(project_id, "REVIEW")
        clear_pipeline_lock(project_id)
        logger.info(f"=== Pipeline complete: {project_id} — status: REVIEW ===")

    except Exception as e:
        logger.error(f"Pipeline failed: {e}", exc_info=True)
        update_project_status(project_id, "FAILED", error_message=str(e))
        clear_pipeline_lock(project_id)
        sys.exit(1)

if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Commit**

```bash
git add pipeline/video/scripts/run_pipeline.py
git commit -m "feat: add pipeline orchestrator with full stage execution"
```

---

## Chunk 7: Config Editor + AE Templates (Stub)

### Task 20: Create config editor page

**Files:**
- Create: `app/admin/video/[id]/config/page.tsx`
- Create: `components/admin/video/VideoConfigEditor.tsx`

- [ ] **Step 1: Create VideoConfigEditor component**

A tab-based form with Brand, Intro/Outro, Lower Thirds, Captions, Audio tabs. Each tab renders form fields that read/write the config JSON. Uses the same `inputClass`/`labelClass` patterns from existing forms. Saves via `PATCH /api/admin/video/[id]` with `{ config: updatedConfig }`.

Full implementation follows the existing form patterns in `components/admin/projects/ProjectsClient.tsx` — state managed via `useState`, tabs via a `activeTab` string state, color inputs via `<input type="color">`, dropdowns for style/position selects.

- [ ] **Step 2: Create the config page (server component)**

```typescript
// app/admin/video/[id]/config/page.tsx
import { redirect, notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import VideoConfigEditor from "@/components/admin/video/VideoConfigEditor";

export const metadata = { title: "Edit Video Config" };

export default async function VideoConfigPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const { id } = await params;
  const project = await prisma.videoProject.findUnique({
    where: { id },
    select: { id: true, name: true, config: true, client: { select: { name: true } } },
  });
  if (!project) notFound();

  return <VideoConfigEditor projectId={project.id} projectName={project.name} clientName={project.client.name} config={project.config as Record<string, unknown>} />;
}
```

- [ ] **Step 3: Commit**

```bash
git add app/admin/video/[id]/config/ components/admin/video/VideoConfigEditor.tsx
git commit -m "feat: add video project config editor"
```

---

### Task 21: Create AE template stubs

**Files:**
- Create: `pipeline/video/templates/intro_fade.jsx`
- Create: `pipeline/video/templates/lower_third_bar.jsx`
- Create: `pipeline/video/templates/outro_cta.jsx`
- Create: `pipeline/video/scripts/generate_ae_project.py`

- [ ] **Step 1: Create stub AE templates and generator script**

These are placeholder JSX files that will be fleshed out when After Effects automation is needed. The `generate_ae_project.py` reads the config and writes a project-specific JSX file that references the templates and applies brand settings.

- [ ] **Step 2: Commit**

```bash
git add pipeline/video/templates/ pipeline/video/scripts/generate_ae_project.py
git commit -m "feat: add AE template stubs and generator script"
```

---

### Task 22: Add pipeline/video to .gitignore for project outputs

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Add pipeline output exclusions**

```
# Video pipeline outputs (large files)
pipeline/video/projects/*/footage/
pipeline/video/projects/*/normalized/
pipeline/video/projects/*/output/
pipeline/video/projects/*/music/
pipeline/video/projects/*/ae/
pipeline/video/projects/*/voiceover/
pipeline/video/projects/*/*.log
pipeline/video/projects/*/config.json
pipeline/video/projects/*/mixed_audio.aac
pipeline/video/projects/*/concat_list.txt
pipeline/video/projects/*/master_concat.mp4
pipeline/video/clients/*/logo.png
pipeline/video/clients/*/watermark.png
```

- [ ] **Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: add video pipeline output dirs to gitignore"
```

---

### Task 23: Final integration test

- [ ] **Step 1: Run Prisma generate to verify schema**

Run: `npx prisma generate`
Expected: Success

- [ ] **Step 2: Run Next.js build to verify no compile errors**

Run: `npm run build`
Expected: Build succeeds with no type errors in new files

- [ ] **Step 3: Fix any type errors and commit**

```bash
git add -A
git commit -m "fix: resolve any type errors from video pipeline integration"
```
