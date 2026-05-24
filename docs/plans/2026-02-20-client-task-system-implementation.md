# Client + Task System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a full Client CRM, Project tracking, Support tickets, Communication logs, and enhanced Task management across 6 service lines (SMA, PPC, Web, Support, SEO, Reporting) to the vanguardm.com admin dashboard.

**Architecture:** Prisma schema migration adds 6 new models (Client, ClientContact, ClientService, Project, ClientNote, SupportTicket) plus enhances the existing Task model. Server Components fetch data with Prisma, API routes handle CRUD. Shared components (badges, filters, modals) provide consistent UX. All new pages follow the existing dark-theme pattern (bg-[#0A0F1A], border-white/6, emerald/amber accents).

**Tech Stack:** Next.js 16.1.6, React 19, Prisma 7.4 + PrismaPg, PostgreSQL, Tailwind v4, Lucide icons, TypeScript strict. No new dependencies required (recharts already installed for charts).

---

## Task 1: Prisma Schema Migration — New Enums and Models

**Files:**
- Modify: `prisma/schema.prisma`

**Step 1: Add new enums after existing enums (line 29)**

Add these enums after the `TaskPriority` enum:

```prisma
enum ClientStatus {
  PROSPECT
  ACTIVE
  PAUSED
  CHURNED
}

enum ServiceType {
  SMA
  PPC
  WEB
  SUPPORT
  SEO
  REPORTING
}

enum BillingCycle {
  MONTHLY
  QUARTERLY
  ANNUAL
}

enum ProjectStatus {
  PLANNING
  ACTIVE
  ON_HOLD
  COMPLETED
}

enum NoteType {
  CALL
  EMAIL
  MEETING
  NOTE
  SUPPORT
}

enum TicketStatus {
  OPEN
  IN_PROGRESS
  WAITING
  RESOLVED
  CLOSED
}
```

**Step 2: Add Client model after the admin dashboard tables comment (after line 173)**

```prisma
model Client {
  id                String       @id @default(cuid())
  name              String
  domain            String?
  phone             String?
  email             String?
  address           String?      @db.Text
  status            ClientStatus @default(PROSPECT)
  monthlyRetainer   Int?
  billingCycle      BillingCycle @default(MONTHLY)
  contractStart     DateTime?
  contractEnd       DateTime?
  slaResponseHours  Int?         @default(24)
  nimbataProjectId  String?
  gtmContainerId    String?
  cloudflareZoneId  String?
  notes             String?      @db.Text
  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt

  contacts       ClientContact[]
  services       ClientService[]
  projects       Project[]
  tasks          Task[]
  clientNotes    ClientNote[]
  supportTickets SupportTicket[]

  @@index([status])
  @@index([name])
}
```

**Step 3: Add ClientContact model**

```prisma
model ClientContact {
  id        String   @id @default(cuid())
  clientId  String
  client    Client   @relation(fields: [clientId], references: [id], onDelete: Cascade)
  name      String
  email     String
  phone     String?
  role      String   @default("primary")
  isPrimary Boolean  @default(false)
  createdAt DateTime @default(now())

  @@index([clientId])
}
```

**Step 4: Add ClientService model**

```prisma
model ClientService {
  id            String       @id @default(cuid())
  clientId      String
  client        Client       @relation(fields: [clientId], references: [id], onDelete: Cascade)
  serviceType   ServiceType
  status        ClientStatus @default(ACTIVE)
  monthlyBudget Int?
  startDate     DateTime     @default(now())
  createdAt     DateTime     @default(now())

  @@unique([clientId, serviceType])
  @@index([clientId])
}
```

**Step 5: Add Project model**

```prisma
model Project {
  id            String        @id @default(cuid())
  clientId      String
  client        Client        @relation(fields: [clientId], references: [id], onDelete: Cascade)
  name          String
  serviceType   ServiceType
  status        ProjectStatus @default(PLANNING)
  description   String?       @db.Text
  startDate     DateTime?
  dueDate       DateTime?
  completedDate DateTime?
  budget        Int?
  tasks         Task[]
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  @@index([clientId])
  @@index([status])
  @@index([serviceType])
}
```

**Step 6: Add ClientNote model**

```prisma
model ClientNote {
  id        String   @id @default(cuid())
  clientId  String
  client    Client   @relation(fields: [clientId], references: [id], onDelete: Cascade)
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  type      NoteType @default(NOTE)
  content   String   @db.Text
  createdAt DateTime @default(now())

  @@index([clientId])
  @@index([userId])
}
```

**Step 7: Add SupportTicket model**

```prisma
model SupportTicket {
  id          String       @id @default(cuid())
  clientId    String
  client      Client       @relation(fields: [clientId], references: [id], onDelete: Cascade)
  title       String
  description String?      @db.Text
  status      TicketStatus @default(OPEN)
  priority    TaskPriority @default(NORMAL)
  assigneeId  String?
  assignee    User?        @relation(fields: [assigneeId], references: [id])
  slaDeadline DateTime?
  resolvedAt  DateTime?
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt

  @@index([clientId])
  @@index([status])
  @@index([assigneeId])
}
```

**Step 8: Enhance existing Task model — add 3 new optional fields**

Add after `category String?` (line 197 in current schema):

```prisma
  clientId    String?
  client      Client?      @relation(fields: [clientId], references: [id])
  projectId   String?
  project     Project?     @relation(fields: [projectId], references: [id])
  serviceType ServiceType?
```

Add new indexes:

```prisma
  @@index([clientId])
  @@index([serviceType])
```

**Step 9: Add new relations to User model**

Add after `conversations Conversation[]` (line 57):

```prisma
  clientNotes      ClientNote[]
  assignedTickets  SupportTicket[]
```

**Step 10: Run the migration**

```bash
cd /home/vanguardm/public_html
npx prisma migrate dev --name add_client_crm_system
```

Expected: Migration creates 6 new tables + adds columns to Task table.

**Step 11: Generate Prisma client**

```bash
npx prisma generate
```

Expected: Client types regenerated at `lib/generated/prisma/`.

**Step 12: Verify migration**

```bash
PGPASSWORD='EffC8hw8n4_Fs-G' psql -h localhost -U vanguard_app -d vanguardm_vanguard_app -c "\dt"
```

Expected: 20 tables (14 existing + 6 new: Client, ClientContact, ClientService, Project, ClientNote, SupportTicket).

---

## Task 2: Shared Components — Service Badges and Filter Tabs

**Files:**
- Create: `components/admin/shared/ServiceTypeBadge.tsx`
- Create: `components/admin/shared/ClientStatusBadge.tsx`
- Create: `components/admin/shared/ServiceFilterTabs.tsx`

**Step 1: Create ServiceTypeBadge**

```typescript
// components/admin/shared/ServiceTypeBadge.tsx
interface ServiceTypeBadgeProps {
  type: string;
}

const SERVICE_COLORS: Record<string, string> = {
  SMA: "bg-purple-400/10 text-purple-400",
  PPC: "bg-blue-400/10 text-blue-400",
  WEB: "bg-cyan-400/10 text-cyan-400",
  SUPPORT: "bg-amber/10 text-amber",
  SEO: "bg-emerald/10 text-emerald",
  REPORTING: "bg-slate-400/10 text-slate-400",
};

export default function ServiceTypeBadge({ type }: ServiceTypeBadgeProps) {
  const colorClass = SERVICE_COLORS[type] || SERVICE_COLORS.REPORTING;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${colorClass}`}>
      {type}
    </span>
  );
}
```

**Step 2: Create ClientStatusBadge**

```typescript
// components/admin/shared/ClientStatusBadge.tsx
interface ClientStatusBadgeProps {
  status: string;
}

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "bg-emerald/10 text-emerald",
  PROSPECT: "bg-blue-400/10 text-blue-400",
  PAUSED: "bg-amber/10 text-amber",
  CHURNED: "bg-red-400/10 text-red-400",
};

export default function ClientStatusBadge({ status }: ClientStatusBadgeProps) {
  const colorClass = STATUS_COLORS[status] || STATUS_COLORS.PROSPECT;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${colorClass}`}>
      {status}
    </span>
  );
}
```

**Step 3: Create ServiceFilterTabs**

```typescript
// components/admin/shared/ServiceFilterTabs.tsx
"use client";

const TABS = ["ALL", "SMA", "PPC", "WEB", "SUPPORT", "SEO", "REPORTING"] as const;

interface ServiceFilterTabsProps {
  active: string;
  onChange: (tab: string) => void;
  counts?: Record<string, number>;
}

export default function ServiceFilterTabs({ active, onChange, counts }: ServiceFilterTabsProps) {
  return (
    <div className="flex items-center gap-1 bg-[#111827] border border-white/6 rounded-lg p-1">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors ${
            active === tab
              ? "bg-emerald/10 text-emerald"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          {tab === "ALL" ? "All" : tab}
          {counts && counts[tab] !== undefined && (
            <span className="ml-1.5 text-slate-500">{counts[tab]}</span>
          )}
        </button>
      ))}
    </div>
  );
}
```

---

## Task 3: Client API Routes

**Files:**
- Create: `app/api/admin/clients/route.ts`
- Create: `app/api/admin/clients/[id]/route.ts`
- Create: `app/api/admin/clients/[id]/contacts/route.ts`
- Create: `app/api/admin/clients/[id]/services/route.ts`
- Create: `app/api/admin/clients/[id]/notes/route.ts`

**Step 1: Create clients list + create route**

```typescript
// app/api/admin/clients/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN" && role !== "TEAM") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const service = searchParams.get("service");
  const search = searchParams.get("search") || "";

  const where: Record<string, unknown> = {};
  if (status && status !== "ALL") where.status = status;
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { domain: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }
  if (service && service !== "ALL") {
    where.services = { some: { serviceType: service } };
  }

  const clients = await prisma.client.findMany({
    where,
    orderBy: { name: "asc" },
    include: {
      services: { select: { serviceType: true, status: true } },
      contacts: { where: { isPrimary: true }, take: 1, select: { name: true, email: true, phone: true } },
      _count: { select: { tasks: true, supportTickets: true, projects: true } },
    },
  });

  return NextResponse.json(clients);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  if (!body.name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

  const client = await prisma.client.create({
    data: {
      name: body.name,
      domain: body.domain || null,
      phone: body.phone || null,
      email: body.email || null,
      address: body.address || null,
      status: body.status || "PROSPECT",
      monthlyRetainer: body.monthlyRetainer || null,
      billingCycle: body.billingCycle || "MONTHLY",
      contractStart: body.contractStart ? new Date(body.contractStart) : null,
      contractEnd: body.contractEnd ? new Date(body.contractEnd) : null,
      slaResponseHours: body.slaResponseHours || 24,
      nimbataProjectId: body.nimbataProjectId || null,
      gtmContainerId: body.gtmContainerId || null,
      cloudflareZoneId: body.cloudflareZoneId || null,
      notes: body.notes || null,
      ...(body.contacts?.length && {
        contacts: {
          create: body.contacts.map((c: { name: string; email: string; phone?: string; role?: string; isPrimary?: boolean }) => ({
            name: c.name,
            email: c.email,
            phone: c.phone || null,
            role: c.role || "primary",
            isPrimary: c.isPrimary ?? false,
          })),
        },
      }),
      ...(body.services?.length && {
        services: {
          create: body.services.map((s: { serviceType: string; monthlyBudget?: number }) => ({
            serviceType: s.serviceType,
            monthlyBudget: s.monthlyBudget || null,
          })),
        },
      }),
    },
    include: {
      contacts: true,
      services: true,
    },
  });

  return NextResponse.json(client, { status: 201 });
}
```

**Step 2: Create client detail + update + delete route**

```typescript
// app/api/admin/clients/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN" && role !== "TEAM") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;

  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      contacts: { orderBy: { isPrimary: "desc" } },
      services: true,
      projects: { orderBy: { createdAt: "desc" }, include: { _count: { select: { tasks: true } } } },
      tasks: {
        orderBy: { createdAt: "desc" },
        take: 10,
        include: {
          assignee: { select: { id: true, name: true, email: true } },
        },
      },
      clientNotes: {
        orderBy: { createdAt: "desc" },
        take: 20,
        include: { user: { select: { id: true, name: true } } },
      },
      supportTickets: {
        orderBy: { createdAt: "desc" },
        take: 10,
        include: { assignee: { select: { id: true, name: true, email: true } } },
      },
      _count: { select: { tasks: true, supportTickets: true, projects: true, clientNotes: true } },
    },
  });

  if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(client);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await request.json();

  const data: Record<string, unknown> = {};
  const fields = ["name", "domain", "phone", "email", "address", "status", "monthlyRetainer",
    "billingCycle", "slaResponseHours", "nimbataProjectId", "gtmContainerId", "cloudflareZoneId", "notes"];

  for (const field of fields) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  if (body.contractStart !== undefined) data.contractStart = body.contractStart ? new Date(body.contractStart) : null;
  if (body.contractEnd !== undefined) data.contractEnd = body.contractEnd ? new Date(body.contractEnd) : null;

  const client = await prisma.client.update({ where: { id }, data });
  return NextResponse.json(client);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  await prisma.client.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
```

**Step 3: Create client contacts route**

```typescript
// app/api/admin/clients/[id]/contacts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await request.json();
  if (!body.name || !body.email) return NextResponse.json({ error: "Name and email required" }, { status: 400 });

  const contact = await prisma.clientContact.create({
    data: {
      clientId: id,
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      role: body.role || "primary",
      isPrimary: body.isPrimary ?? false,
    },
  });

  return NextResponse.json(contact, { status: 201 });
}
```

**Step 4: Create client services route**

```typescript
// app/api/admin/clients/[id]/services/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await request.json();
  if (!body.serviceType) return NextResponse.json({ error: "Service type required" }, { status: 400 });

  const service = await prisma.clientService.create({
    data: {
      clientId: id,
      serviceType: body.serviceType,
      monthlyBudget: body.monthlyBudget || null,
    },
  });

  return NextResponse.json(service, { status: 201 });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const serviceType = searchParams.get("serviceType");
  if (!serviceType) return NextResponse.json({ error: "serviceType required" }, { status: 400 });

  await prisma.clientService.delete({
    where: { clientId_serviceType: { clientId: id, serviceType: serviceType as any } },
  });

  return NextResponse.json({ success: true });
}
```

**Step 5: Create client notes route**

```typescript
// app/api/admin/clients/[id]/notes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const notes = await prisma.clientNote.findMany({
    where: { clientId: id },
    orderBy: { createdAt: "desc" },
    include: { user: { select: { id: true, name: true, email: true } } },
  });

  return NextResponse.json(notes);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  if (!body.content) return NextResponse.json({ error: "Content required" }, { status: 400 });

  const note = await prisma.clientNote.create({
    data: {
      clientId: id,
      userId: session.user.id,
      type: body.type || "NOTE",
      content: body.content,
    },
    include: { user: { select: { id: true, name: true } } },
  });

  return NextResponse.json(note, { status: 201 });
}
```

---

## Task 4: Project and Ticket API Routes

**Files:**
- Create: `app/api/admin/projects/route.ts`
- Create: `app/api/admin/projects/[id]/route.ts`
- Create: `app/api/admin/tickets/route.ts`
- Create: `app/api/admin/tickets/[id]/route.ts`

**Step 1: Create projects route**

```typescript
// app/api/admin/projects/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN" && role !== "TEAM") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(request.url);
  const serviceType = searchParams.get("serviceType");
  const status = searchParams.get("status");
  const clientId = searchParams.get("clientId");

  const where: Record<string, unknown> = {};
  if (serviceType && serviceType !== "ALL") where.serviceType = serviceType;
  if (status && status !== "ALL") where.status = status;
  if (clientId) where.clientId = clientId;

  const projects = await prisma.project.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      client: { select: { id: true, name: true, domain: true } },
      _count: { select: { tasks: true } },
    },
  });

  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  if (!body.name || !body.clientId || !body.serviceType) {
    return NextResponse.json({ error: "name, clientId, and serviceType required" }, { status: 400 });
  }

  const project = await prisma.project.create({
    data: {
      clientId: body.clientId,
      name: body.name,
      serviceType: body.serviceType,
      description: body.description || null,
      startDate: body.startDate ? new Date(body.startDate) : null,
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
      budget: body.budget || null,
    },
    include: {
      client: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(project, { status: 201 });
}
```

**Step 2: Create projects [id] route**

```typescript
// app/api/admin/projects/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await request.json();

  const data: Record<string, unknown> = {};
  if (body.name !== undefined) data.name = body.name;
  if (body.description !== undefined) data.description = body.description;
  if (body.status !== undefined) data.status = body.status;
  if (body.serviceType !== undefined) data.serviceType = body.serviceType;
  if (body.startDate !== undefined) data.startDate = body.startDate ? new Date(body.startDate) : null;
  if (body.dueDate !== undefined) data.dueDate = body.dueDate ? new Date(body.dueDate) : null;
  if (body.completedDate !== undefined) data.completedDate = body.completedDate ? new Date(body.completedDate) : null;
  if (body.budget !== undefined) data.budget = body.budget;

  const project = await prisma.project.update({ where: { id }, data });
  return NextResponse.json(project);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
```

**Step 3: Create tickets route**

```typescript
// app/api/admin/tickets/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN" && role !== "TEAM") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const clientId = searchParams.get("clientId");

  const where: Record<string, unknown> = {};
  if (status && status !== "ALL") where.status = status;
  if (priority) where.priority = priority;
  if (clientId) where.clientId = clientId;
  if (role === "TEAM") where.assigneeId = session.user.id;

  const tickets = await prisma.supportTicket.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      client: { select: { id: true, name: true, domain: true, slaResponseHours: true } },
      assignee: { select: { id: true, name: true, email: true } },
    },
  });

  return NextResponse.json(tickets);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  if (!body.title || !body.clientId) {
    return NextResponse.json({ error: "title and clientId required" }, { status: 400 });
  }

  // Auto-calculate SLA deadline from client settings
  let slaDeadline = null;
  if (body.clientId) {
    const client = await prisma.client.findUnique({
      where: { id: body.clientId },
      select: { slaResponseHours: true },
    });
    if (client?.slaResponseHours) {
      slaDeadline = new Date(Date.now() + client.slaResponseHours * 60 * 60 * 1000);
    }
  }

  const ticket = await prisma.supportTicket.create({
    data: {
      clientId: body.clientId,
      title: body.title,
      description: body.description || null,
      priority: body.priority || "NORMAL",
      assigneeId: body.assigneeId || null,
      slaDeadline,
    },
    include: {
      client: { select: { id: true, name: true } },
      assignee: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(ticket, { status: 201 });
}
```

**Step 4: Create tickets [id] route**

```typescript
// app/api/admin/tickets/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN" && role !== "TEAM") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await request.json();

  const data: Record<string, unknown> = {};
  if (body.title !== undefined) data.title = body.title;
  if (body.description !== undefined) data.description = body.description;
  if (body.status !== undefined) {
    data.status = body.status;
    if (body.status === "RESOLVED" || body.status === "CLOSED") {
      data.resolvedAt = new Date();
    }
  }
  if (body.priority !== undefined) data.priority = body.priority;
  if (body.assigneeId !== undefined) data.assigneeId = body.assigneeId || null;

  const ticket = await prisma.supportTicket.update({
    where: { id },
    data,
    include: {
      client: { select: { id: true, name: true } },
      assignee: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(ticket);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  await prisma.supportTicket.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
```

---

## Task 5: Enhanced Task API — Add Client/Project/Service Filters

**Files:**
- Modify: `app/api/admin/tasks/route.ts`

**Step 1: Update GET to accept new filters**

Add to the existing `where` object building:

```typescript
// Add after the role-based where filter
const { searchParams } = new URL(request.url);
const clientId = searchParams.get("clientId");
const serviceType = searchParams.get("serviceType");
const projectId = searchParams.get("projectId");

if (clientId) where.clientId = clientId;
if (serviceType && serviceType !== "ALL") where.serviceType = serviceType;
if (projectId) where.projectId = projectId;
```

Add to the `include` in findMany:

```typescript
client: { select: { id: true, name: true } },
project: { select: { id: true, name: true } },
```

**Step 2: Update POST to accept new fields**

Add to the `data` object in create:

```typescript
clientId: body.clientId || null,
projectId: body.projectId || null,
serviceType: body.serviceType || null,
```

---

## Task 6: Clients List Page

**Files:**
- Create: `app/admin/clients/page.tsx`

**Step 1: Create the clients page**

```typescript
// app/admin/clients/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { Building2, UserPlus, Pause, TrendingUp } from "lucide-react";
import MetricCard from "@/components/admin/shared/MetricCard";
import ServiceTypeBadge from "@/components/admin/shared/ServiceTypeBadge";
import ClientStatusBadge from "@/components/admin/shared/ClientStatusBadge";
import Link from "next/link";

export const metadata = { title: "Clients" };

export default async function ClientsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const [activeCount, prospectCount, pausedCount, clients] = await Promise.all([
    prisma.client.count({ where: { status: "ACTIVE" } }),
    prisma.client.count({ where: { status: "PROSPECT" } }),
    prisma.client.count({ where: { status: "PAUSED" } }),
    prisma.client.findMany({
      orderBy: { name: "asc" },
      include: {
        services: { select: { serviceType: true, status: true } },
        contacts: { where: { isPrimary: true }, take: 1, select: { name: true, email: true } },
        _count: { select: { tasks: true, supportTickets: true, projects: true } },
      },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Clients</h1>
          <p className="text-sm text-slate-400 mt-1">Manage your client portfolio</p>
        </div>
        <Link
          href="/admin/clients/new"
          className="px-4 py-2 rounded-lg bg-emerald text-slate-950 text-xs font-display font-semibold uppercase tracking-wider hover:bg-emerald-400 transition-colors"
        >
          + New Client
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard label="Active Clients" value={activeCount} icon={Building2} accent="emerald" />
        <MetricCard label="Prospects" value={prospectCount} icon={UserPlus} accent="cyan" />
        <MetricCard label="Paused" value={pausedCount} icon={Pause} accent="amber" />
      </div>

      <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/6">
          <h2 className="font-display text-base font-semibold text-white">All Clients ({clients.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Client</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Services</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Contact</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Tasks</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Tickets</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => {
                const primary = client.contacts[0];
                return (
                  <tr key={client.id} className="border-b border-white/4 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/admin/clients/${client.id}`} className="block">
                        <p className="text-sm font-medium text-white hover:text-emerald transition-colors">{client.name}</p>
                        {client.domain && <p className="text-xs text-slate-500">{client.domain}</p>}
                      </Link>
                    </td>
                    <td className="px-4 py-3"><ClientStatusBadge status={client.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {client.services.map((s) => (
                          <ServiceTypeBadge key={s.serviceType} type={s.serviceType} />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {primary ? (
                        <div>
                          <p className="text-sm text-slate-300">{primary.name}</p>
                          <p className="text-xs text-slate-500">{primary.email}</p>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-600">No contact</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">{client._count.tasks}</td>
                    <td className="px-4 py-3 text-sm text-slate-300">{client._count.supportTickets}</td>
                  </tr>
                );
              })}
              {clients.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-slate-500">No clients yet. Click "+ New Client" to add one.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
```

---

## Task 7: Client Detail Page (Tabbed View)

**Files:**
- Create: `app/admin/clients/[id]/page.tsx`

This page uses a tabbed layout showing Overview, Contacts, Services, Projects, Tasks, Notes, and Tickets. Due to plan size, this task provides the page shell — each tab renders inline sections.

**Implementation:** Server component that fetches the full client with all relations (same query as the GET /api/admin/clients/[id] route). Renders tabs as anchor sections within a single page for simplicity (no client-side tab state needed initially).

---

## Task 8: New Client Form Page

**Files:**
- Create: `app/admin/clients/new/page.tsx`

**Implementation:** Client component form with fields for: name, domain, phone, email, address, status, retainer, billing cycle, contract dates, SLA hours, integration IDs. Service checkboxes (SMA/PPC/WEB/SUPPORT/SEO/REPORTING). Primary contact fields. Submit POSTs to `/api/admin/clients` and redirects to the new client detail page.

---

## Task 9: Projects Page

**Files:**
- Create: `app/admin/projects/page.tsx`

**Implementation:** Server component listing all projects with ServiceFilterTabs. Metrics: Active Projects, Planning, Completed, On Hold. Table: project name, client, service type badge, status badge, due date, task count.

---

## Task 10: Tickets Page

**Files:**
- Create: `app/admin/tickets/page.tsx`

**Implementation:** Server component listing support tickets. Metrics: Open, In Progress, Overdue (slaDeadline < now). Table: title, client, status, priority, assignee, SLA deadline (with red highlight if overdue), created date.

---

## Task 11: Enhanced Tasks Page — Add Client Column, Service Filters, Create Modal

**Files:**
- Modify: `app/admin/tasks/page.tsx`
- Create: `components/admin/tasks/TaskCreateModal.tsx`

**Implementation:** Add ServiceFilterTabs at top. Add client name column to task cards. Add "+ New Task" button that opens TaskCreateModal with client selector, project selector, service type, and all existing fields.

---

## Task 12: Updated Sidebar Navigation

**Files:**
- Modify: `components/admin/layout/AdminSidebar.tsx`

**Step 1: Update NAV_ITEMS array**

```typescript
import { Building2, FolderKanban, LifeBuoy } from "lucide-react";

const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, href: "/admin", adminOnly: true },
  { label: "Clients", icon: Building2, href: "/admin/clients", adminOnly: true },
  { label: "Projects", icon: FolderKanban, href: "/admin/projects", adminOnly: true },
  { label: "Tasks", icon: KanbanSquare, href: "/admin/tasks", adminOnly: false },
  { label: "Tickets", icon: LifeBuoy, href: "/admin/tickets", adminOnly: false },
  { label: "Leads", icon: MessageSquare, href: "/admin/leads", adminOnly: true },
  { label: "Team", icon: UserCog, href: "/admin/team", adminOnly: true },
  { label: "AI Agent", icon: Bot, href: "/admin/agent", adminOnly: true },
  { label: "Academy", icon: GraduationCap, href: "/admin/academy", adminOnly: true },
  { label: "Settings", icon: Settings, href: "/admin/settings", adminOnly: true },
];
```

---

## Task 13: Enhanced Overview Dashboard

**Files:**
- Modify: `app/admin/page.tsx`

**Implementation:** Add new metrics: Active Clients count, Open Tickets count. Add "Tasks by Service Line" section showing counts per service type. Add "Upcoming Deadlines" section listing tasks/tickets due within 7 days. Keep existing Recent Leads and Recent Exams sections.

---

## Task 14: Seed Data — Pre-populate Known Clients

**Files:**
- Create: `prisma/seed-clients.ts`

**Implementation:** Script that creates Client records for known agency clients:
- Howdy Garage Doors (howdygarage.com) — PPC, WEB, SEO
- Brazos Valley HVAC (brazosvalleyhvac.com) — PPC, WEB, SEO, SMA
- ADVTECH Detailing (advtechdetailing.com) — WEB
- ABWMS (abwmsonline.org) — WEB, SEO
- + remaining Nimbata clients (Century Home, Cinnaholic, Hospice BV, etc.)

Sets nimbataProjectId and gtmContainerId from known values. Creates primary contacts where known.

Run: `npx tsx prisma/seed-clients.ts`

---

## Task 15: Fix Existing Issues

**Files:**
- Modify: `auth.ts` (account lockout)
- Run: SQL to fix team roles

**Step 1: Fix team member roles**

```sql
UPDATE "User" SET role = 'TEAM', "isAdmin" = false
WHERE email LIKE '%@mentservices.com' AND role = 'USER';
```

**Step 2: Add account lockout logic to auth.ts authorize function**

Before the password check, add:

```typescript
// Check lockout
if (user.lockedUntil && user.lockedUntil > new Date()) return null;

// After failed password check:
if (!isValid) {
  const attempts = user.failedLoginAttempts + 1;
  const data: Record<string, unknown> = { failedLoginAttempts: attempts };
  if (attempts >= 5) data.lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 min
  await prisma.user.update({ where: { id: user.id }, data });
  return null;
}

// On successful login, reset counter:
// Add to the role sync update:
data.failedLoginAttempts = 0;
data.lockedUntil = null;
```

---

## Task 16: Build and Deploy

**Step 1: Build**

```bash
cd /home/vanguardm/public_html
npm run build
```

**Step 2: Copy static assets to standalone**

```bash
cp -r .next/static .next/standalone/.next/
```

**Step 3: Restart PM2**

```bash
pm2 restart vanguardm
```

**Step 4: Clear nginx cache**

```bash
rm -rf /var/cache/ea-nginx/proxy/vanguardm/
systemctl restart ea-nginx
```

**Step 5: Verify**

```bash
curl -sI https://vanguardm.com/admin/clients
```

Expected: 307 redirect to sign-in (auth working). After login, clients page should render.

---

## Implementation Order Summary

| Task | Description | Dependencies |
|------|-------------|-------------|
| 1 | Schema migration | None |
| 2 | Shared components (badges, tabs) | None |
| 3 | Client API routes | Task 1 |
| 4 | Project + Ticket API routes | Task 1 |
| 5 | Enhanced Task API | Task 1 |
| 6 | Clients list page | Tasks 1, 2, 3 |
| 7 | Client detail page | Tasks 1, 2, 3 |
| 8 | New client form | Tasks 1, 3 |
| 9 | Projects page | Tasks 1, 2, 4 |
| 10 | Tickets page | Tasks 1, 2, 4 |
| 11 | Enhanced tasks page | Tasks 1, 2, 5 |
| 12 | Sidebar update | None |
| 13 | Enhanced overview | Tasks 1, 2 |
| 14 | Seed data | Task 1 |
| 15 | Fix existing issues | None |
| 16 | Build and deploy | All above |
