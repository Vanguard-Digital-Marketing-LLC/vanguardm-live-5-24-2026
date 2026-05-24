# Admin Dashboard Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a comprehensive admin dashboard at `/admin/*` with 8 modules: Overview, Academy, Users, Team, Tasks (Kanban), Leads, AI Agent, and Settings — inspired by Supabase Studio + Dashbrd X, using the existing Vanguard brand system.

**Architecture:** Next.js 16 App Router with a dedicated admin route group (`app/admin/`), its own layout (collapsible sidebar + header), Role-based access via NextAuth v5 JWT, server-side paginated data tables, Recharts for visualizations, SSE for real-time Kanban, and Claude API streaming for the AI agent panel.

**Tech Stack:** Next.js 16.1.6, React 19, Tailwind v4, Prisma 7.4 + PostgreSQL, NextAuth v5 (JWT), Recharts, Lucide React, @tanstack/react-query, @hello-pangea/dnd (drag-and-drop)

**Project Root:** `/home/vanguardm/public_html/`

**Existing patterns:**
- Fonts: `font-display` (Chakra Petch), `font-body` (Outfit) — defined in `globals.css` @theme
- Colors: `text-emerald`, `text-amber`, `bg-slate-950` (#0a0f1a) — defined in `globals.css` @theme
- Glass cards: `glass` utility class — defined in `globals.css`
- Auth: `auth()` from `@/auth`, JWT strategy, `session.user.isAdmin` boolean
- DB: `prisma` from `@/lib/db`, PrismaClient with PrismaPg adapter
- Admin check pattern: `if (!session?.user?.isAdmin) redirect("/dashboard")`
- Deploy: `next build` → PM2 restart from `/home/vanguardm/env/ecosystem.config.cjs`

---

## Phase 1: Foundation (Schema + Auth + Layout + Overview)

### Task 1: Install new dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install production deps**

Run:
```bash
cd /home/vanguardm/public_html && npm install recharts lucide-react @tanstack/react-query @hello-pangea/dnd
```

**Step 2: Install dev deps**

Run:
```bash
cd /home/vanguardm/public_html && npm install -D @types/recharts
```

**Step 3: Verify install**

Run: `cd /home/vanguardm/public_html && npm ls recharts lucide-react @tanstack/react-query @hello-pangea/dnd`
Expected: All 4 packages listed without errors

---

### Task 2: Extend Prisma schema with Role enum and new models

**Files:**
- Modify: `prisma/schema.prisma`

**Step 1: Add Role enum and update User model**

Replace the User model and add the Role enum. Key changes:
- Add `Role` enum (ADMIN, TEAM, USER)
- Add `role` field to User with `@default(USER)`
- Keep `isAdmin` temporarily for backward compat (remove in Task 4)
- Add new relation fields for tasks, comments, notifications, invites, conversations

```prisma
enum Role {
  ADMIN
  TEAM
  USER
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?
  isAdmin       Boolean   @default(false)
  role          Role      @default(USER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts        Account[]
  sessions        Session[]
  coursePurchases CoursePurchase[]
  quizAttempts    QuizAttempt[]
  certificates    Certificate[]
  assignedTasks   Task[]          @relation("TaskAssignee")
  createdTasks    Task[]          @relation("TaskCreator")
  taskComments    TaskComment[]
  notifications   Notification[]
  teamInvitesSent TeamInvite[]    @relation("InvitedBy")
  conversations   Conversation[]
}
```

**Step 2: Add TeamInvite model**

```prisma
model TeamInvite {
  id          String    @id @default(cuid())
  email       String
  role        Role      @default(TEAM)
  token       String    @unique @default(cuid())
  invitedById String
  invitedBy   User      @relation("InvitedBy", fields: [invitedById], references: [id])
  expiresAt   DateTime
  acceptedAt  DateTime?
  createdAt   DateTime  @default(now())

  @@index([token])
  @@index([email])
}
```

**Step 3: Add Task enums and Task model**

```prisma
enum TaskStatus {
  NEW
  IN_PROGRESS
  COMPLETED
}

enum TaskPriority {
  LOW
  NORMAL
  HIGH
  URGENT
}

model Task {
  id          String       @id @default(cuid())
  title       String
  description String?      @db.Text
  status      TaskStatus   @default(NEW)
  priority    TaskPriority @default(NORMAL)
  category    String?
  dueDate     DateTime?
  assigneeId  String?
  assignee    User?        @relation("TaskAssignee", fields: [assigneeId], references: [id])
  createdById String
  createdBy   User         @relation("TaskCreator", fields: [createdById], references: [id])
  subtasks    Json?
  comments    TaskComment[]
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt

  @@index([status])
  @@index([assigneeId])
  @@index([createdById])
}
```

**Step 4: Add TaskComment model**

```prisma
model TaskComment {
  id        String   @id @default(cuid())
  taskId    String
  task      Task     @relation(fields: [taskId], references: [id], onDelete: Cascade)
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  content   String   @db.Text
  createdAt DateTime @default(now())

  @@index([taskId])
}
```

**Step 5: Add Notification model**

```prisma
model Notification {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  type      String
  title     String
  message   String
  read      Boolean  @default(false)
  link      String?
  createdAt DateTime @default(now())

  @@index([userId, read])
}
```

**Step 6: Add Conversation model**

```prisma
model Conversation {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  title     String   @default("New conversation")
  messages  Json
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
}
```

**Step 7: Generate Prisma client and push schema**

Run:
```bash
cd /home/vanguardm/public_html && npx prisma generate && npx prisma db push
```
Expected: `Your database is now in sync with your Prisma schema.`

---

### Task 3: Update NextAuth config for Role-based auth

**Files:**
- Modify: `auth.ts`
- Modify: `types/next-auth.d.ts`

**Step 1: Update `types/next-auth.d.ts`**

Replace the entire file:

```typescript
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isAdmin: boolean;
      role: "ADMIN" | "TEAM" | "USER";
    };
  }
}
```

**Step 2: Update `auth.ts` callbacks**

In the `authorize` function, add `role` to the return object:

```typescript
return {
  id: user.id,
  name: user.name,
  email: user.email,
  image: user.image,
  isAdmin: user.isAdmin,
  role: user.role,
};
```

In the `jwt` callback, add role:

```typescript
async jwt({ token, user }) {
  if (user) {
    token.id = user.id;
    token.isAdmin = (user as Record<string, unknown>).isAdmin ?? false;
    token.role = (user as Record<string, unknown>).role ?? "USER";
  }
  return token;
},
```

In the `session` callback, add role:

```typescript
async session({ session, token }) {
  if (token?.id) {
    session.user.id = token.id as string;
    session.user.isAdmin = token.isAdmin as boolean;
    session.user.role = (token.role as "ADMIN" | "TEAM" | "USER") ?? "USER";
  }
  return session;
},
```

---

### Task 4: Update middleware to protect `/admin/*` routes

**Files:**
- Modify: `middleware.ts`

**Step 1: Replace middleware.ts**

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // All protected routes require authentication
  if (!token) {
    const signInUrl = new URL("/auth/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Admin routes require ADMIN role (or legacy isAdmin)
  if (pathname.startsWith("/admin")) {
    const role = token.role as string | undefined;
    const isAdmin = token.isAdmin as boolean | undefined;

    // ADMIN role OR legacy isAdmin flag
    if (role !== "ADMIN" && !isAdmin) {
      // Team members can access /admin/tasks
      if (role === "TEAM" && pathname.startsWith("/admin/tasks")) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
```

---

### Task 5: Create admin layout with collapsible sidebar + header

**Files:**
- Create: `app/admin/layout.tsx`
- Create: `components/admin/layout/AdminSidebar.tsx`
- Create: `components/admin/layout/AdminHeader.tsx`

**Step 1: Create the admin layout**

`app/admin/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminHeader from "@/components/admin/layout/AdminHeader";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin — Vanguard" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN" && role !== "TEAM") redirect("/dashboard");

  return (
    <div className="flex h-screen bg-[#0A0F1A] overflow-hidden">
      <AdminSidebar role={role} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader user={session.user} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
```

**Step 2: Create AdminSidebar component**

`components/admin/layout/AdminSidebar.tsx`:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  UserCog,
  KanbanSquare,
  MessageSquare,
  Settings,
  Bot,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, href: "/admin", adminOnly: true },
  { label: "Academy", icon: GraduationCap, href: "/admin/academy", adminOnly: true },
  { label: "Users", icon: Users, href: "/admin/users", adminOnly: true },
  { label: "Team", icon: UserCog, href: "/admin/team", adminOnly: true },
  { label: "Tasks", icon: KanbanSquare, href: "/admin/tasks", adminOnly: false },
  { label: "Leads", icon: MessageSquare, href: "/admin/leads", adminOnly: true },
  { label: "Settings", icon: Settings, href: "/admin/settings", adminOnly: true },
  { label: "AI Agent", icon: Bot, href: "/admin/agent", adminOnly: true },
];

export default function AdminSidebar({ role }: { role: string }) {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.adminOnly || role === "ADMIN"
  );

  return (
    <aside
      className={`relative flex flex-col bg-[#0D1117] border-r border-white/6 transition-all duration-200 ${
        expanded ? "w-60" : "w-16"
      }`}
    >
      {/* Logo area */}
      <div className="h-14 flex items-center justify-center border-b border-white/6">
        <span className="text-emerald font-display font-bold text-lg">
          {expanded ? "Vanguard" : "V"}
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {visibleItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-emerald/10 text-white border-l-2 border-emerald"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
              title={!expanded ? item.label : undefined}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {expanded && <span className="font-body">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="absolute -right-3 top-20 w-6 h-6 bg-slate-800 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white z-10"
      >
        {expanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>
    </aside>
  );
}
```

**Step 3: Create AdminHeader component**

`components/admin/layout/AdminHeader.tsx`:

```tsx
"use client";

import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";

const BREADCRUMB_MAP: Record<string, string> = {
  "/admin": "Overview",
  "/admin/academy": "Academy",
  "/admin/users": "Users",
  "/admin/team": "Team",
  "/admin/tasks": "Tasks",
  "/admin/leads": "Leads",
  "/admin/settings": "Settings",
  "/admin/agent": "AI Agent",
};

interface AdminHeaderProps {
  user: { name?: string | null; email?: string | null; image?: string | null };
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const pathname = usePathname();
  const pageTitle = BREADCRUMB_MAP[pathname] ?? "Admin";
  const initials = (user.name || user.email || "A")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-white/6 bg-[#0D1117]">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2">
        <span className="text-slate-500 text-sm">Admin</span>
        <span className="text-slate-600">/</span>
        <span className="text-white text-sm font-medium">{pageTitle}</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Search placeholder */}
        <button className="text-slate-400 hover:text-white transition-colors">
          <Search size={18} />
        </button>

        {/* Notifications */}
        <button className="relative text-slate-400 hover:text-white transition-colors">
          <Bell size={18} />
        </button>

        {/* User avatar */}
        <div className="w-8 h-8 rounded-full bg-emerald/20 flex items-center justify-center text-emerald text-xs font-bold">
          {initials}
        </div>
      </div>
    </header>
  );
}
```

---

### Task 6: Create shared admin components (MetricCard, Badge)

**Files:**
- Create: `components/admin/shared/MetricCard.tsx`
- Create: `components/admin/shared/Badge.tsx`

**Step 1: Create MetricCard**

`components/admin/shared/MetricCard.tsx`:

```tsx
import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: string;
  icon: LucideIcon;
  accent?: "emerald" | "amber" | "red" | "cyan" | "purple";
}

const ACCENT_CLASSES = {
  emerald: "text-emerald bg-emerald/10",
  amber: "text-amber bg-amber/10",
  red: "text-red-400 bg-red-400/10",
  cyan: "text-cyan-400 bg-cyan-400/10",
  purple: "text-purple-400 bg-purple-400/10",
};

export default function MetricCard({
  label,
  value,
  trend,
  icon: Icon,
  accent = "emerald",
}: MetricCardProps) {
  const accentClass = ACCENT_CLASSES[accent];

  return (
    <div className="bg-[#111827] border border-white/6 rounded-xl p-6 hover:border-white/12 transition-colors">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${accentClass}`}>
        <Icon size={20} />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-body font-bold text-white">{value}</span>
        {trend && (
          <span className="text-xs text-emerald font-medium">{trend}</span>
        )}
      </div>
      <p className="text-sm text-slate-400 mt-1">{label}</p>
    </div>
  );
}
```

**Step 2: Create Badge**

`components/admin/shared/Badge.tsx`:

```tsx
interface BadgeProps {
  label: string;
  variant?: "emerald" | "amber" | "red" | "slate" | "cyan" | "purple";
}

const VARIANT_CLASSES = {
  emerald: "bg-emerald/10 text-emerald",
  amber: "bg-amber/10 text-amber",
  red: "bg-red-400/10 text-red-400",
  slate: "bg-white/10 text-slate-400",
  cyan: "bg-cyan-400/10 text-cyan-400",
  purple: "bg-purple-400/10 text-purple-400",
};

export default function Badge({ label, variant = "slate" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${VARIANT_CLASSES[variant]}`}
    >
      {label}
    </span>
  );
}
```

---

### Task 7: Create Overview dashboard page + API

**Files:**
- Create: `app/admin/page.tsx`
- Create: `app/api/admin/stats/route.ts`

**Step 1: Create the stats API route**

`app/api/admin/stats/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    userCount,
    purchaseCount,
    certificateCount,
    unreadLeads,
    totalLeadsThisMonth,
    quizAttempts,
    recentLeads,
    recentAttempts,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.coursePurchase.count(),
    prisma.certificate.count(),
    prisma.contactSubmission.count({ where: { read: false } }),
    prisma.contactSubmission.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.quizAttempt.findMany({
      where: { attemptedAt: { gte: thirtyDaysAgo } },
      select: { passed: true, attemptedAt: true },
    }),
    prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, service: true, read: true, createdAt: true },
    }),
    prisma.quizAttempt.findMany({
      orderBy: { attemptedAt: "desc" },
      take: 5,
      include: { user: { select: { name: true, email: true } } },
    }),
  ]);

  const passedCount = quizAttempts.filter((a) => a.passed).length;
  const passRate = quizAttempts.length > 0 ? Math.round((passedCount / quizAttempts.length) * 100) : 0;

  return NextResponse.json({
    metrics: {
      userCount,
      purchaseCount,
      certificateCount,
      unreadLeads,
      totalLeadsThisMonth,
      passRate,
      quizAttemptCount: quizAttempts.length,
    },
    recentLeads,
    recentAttempts,
  });
}
```

**Step 2: Create the Overview page**

`app/admin/page.tsx`:

```tsx
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import {
  Users,
  BookOpen,
  Award,
  Trophy,
  MessageSquare,
  KanbanSquare,
} from "lucide-react";
import MetricCard from "@/components/admin/shared/MetricCard";
import Badge from "@/components/admin/shared/Badge";

export default async function AdminOverviewPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    userCount,
    purchaseCount,
    certificateCount,
    unreadLeads,
    quizAttempts,
    recentLeads,
    recentAttempts,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.coursePurchase.count(),
    prisma.certificate.count(),
    prisma.contactSubmission.count({ where: { read: false } }),
    prisma.quizAttempt.findMany({
      where: { attemptedAt: { gte: thirtyDaysAgo } },
      select: { passed: true },
    }),
    prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, service: true, read: true, createdAt: true },
    }),
    prisma.quizAttempt.findMany({
      orderBy: { attemptedAt: "desc" },
      take: 5,
      include: { user: { select: { name: true, email: true } } },
    }),
  ]);

  const passedCount = quizAttempts.filter((a) => a.passed).length;
  const passRate = quizAttempts.length > 0 ? Math.round((passedCount / quizAttempts.length) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Page title */}
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Overview</h1>
        <p className="text-sm text-slate-400 mt-1">Dashboard metrics and recent activity</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard label="Total Users" value={userCount} icon={Users} accent="emerald" />
        <MetricCard label="Active Courses" value={41} icon={BookOpen} accent="emerald" />
        <MetricCard label="Exam Completions" value={quizAttempts.length} trend={`${passRate}% pass`} icon={Award} accent="emerald" />
        <MetricCard label="Certificates" value={certificateCount} icon={Trophy} accent="amber" />
        <MetricCard label="Open Leads" value={unreadLeads} icon={MessageSquare} accent="amber" />
        <MetricCard label="Course Purchases" value={purchaseCount} icon={KanbanSquare} accent="amber" />
      </div>

      {/* Recent tables row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
          <h2 className="font-display text-base font-semibold text-white mb-4">Recent Leads</h2>
          <div className="space-y-3">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div className="min-w-0">
                  <p className="text-sm text-white truncate">
                    {lead.name}
                    {!lead.read && <span className="ml-1.5 inline-block w-2 h-2 bg-emerald rounded-full" />}
                  </p>
                  <p className="text-xs text-slate-500 truncate">{lead.email}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  {lead.service && <Badge label={lead.service} variant="emerald" />}
                  <p className="text-[10px] text-slate-600 mt-1">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            {recentLeads.length === 0 && <p className="text-sm text-slate-500">No leads yet.</p>}
          </div>
        </div>

        {/* Recent Quiz Attempts */}
        <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
          <h2 className="font-display text-base font-semibold text-white mb-4">Recent Exams</h2>
          <div className="space-y-3">
            {recentAttempts.map((attempt) => (
              <div key={attempt.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div className="min-w-0">
                  <p className="text-sm text-white truncate">{attempt.user.name || attempt.user.email}</p>
                  <p className="text-xs text-slate-500 truncate">{attempt.courseSlug}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`text-sm font-bold ${attempt.passed ? "text-emerald" : "text-red-400"}`}>
                    {attempt.score}/{attempt.totalQuestions}
                  </span>
                  <p className="text-[10px] text-slate-600">
                    {attempt.passed ? "Passed" : "Failed"} · {new Date(attempt.attemptedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            {recentAttempts.length === 0 && <p className="text-sm text-slate-500">No exams yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 3: Build and verify**

Run:
```bash
cd /home/vanguardm/public_html && npx next build 2>&1 | tail -20
```
Expected: Build succeeds, `/admin` route compiled

---

### Task 8: Seed admin user role + sync isAdmin → role

**Files:**
- Create: `scripts/sync-roles.mjs`

**Step 1: Create a one-time migration script**

`scripts/sync-roles.mjs`:

```javascript
import { PrismaClient } from "../lib/generated/prisma/client.js";

const prisma = new PrismaClient();

async function main() {
  // Sync all isAdmin=true users to role=ADMIN
  const result = await prisma.user.updateMany({
    where: { isAdmin: true, role: "USER" },
    data: { role: "ADMIN" },
  });
  console.log(`Updated ${result.count} admin users to role=ADMIN`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

**Step 2: Run it**

Run:
```bash
cd /home/vanguardm/public_html && node scripts/sync-roles.mjs
```
Expected: `Updated N admin users to role=ADMIN`

---

## Phase 2: Data Pages (Academy + Users + Leads)

### Task 9: Create reusable DataTable component

**Files:**
- Create: `components/admin/shared/DataTable.tsx`

**Step 1: Build the DataTable**

`components/admin/shared/DataTable.tsx`:

```tsx
"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  sortKey?: string;
  sortDir?: "asc" | "desc";
  onSort?: (key: string) => void;
  onRowClick?: (row: T) => void;
  loading?: boolean;
}

export default function DataTable<T extends { id: string }>({
  columns,
  data,
  totalCount,
  page,
  pageSize,
  onPageChange,
  sortKey,
  sortDir,
  onSort,
  onRowClick,
  loading,
}: DataTableProps<T>) {
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/6">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 ${
                    col.sortable ? "cursor-pointer hover:text-white" : ""
                  } ${col.className || ""}`}
                  onClick={() => col.sortable && onSort?.(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      sortDir === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={columns.length} className="text-center py-8 text-slate-500">Loading...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={columns.length} className="text-center py-8 text-slate-500">No data found</td></tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row.id}
                  className={`border-b border-white/4 hover:bg-white/5 transition-colors ${
                    onRowClick ? "cursor-pointer" : ""
                  }`}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={`px-4 py-3 text-sm text-slate-300 ${col.className || ""}`}>
                      {col.render ? col.render(row) : (row as Record<string, unknown>)[col.key] as React.ReactNode}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-white/6">
          <p className="text-xs text-slate-500">
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, totalCount)} of {totalCount}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs text-slate-400">Page {page} of {totalPages}</span>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

### Task 10: Create SidePanel component

**Files:**
- Create: `components/admin/shared/SidePanel.tsx`

**Step 1: Build the SidePanel**

`components/admin/shared/SidePanel.tsx`:

```tsx
"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface SidePanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function SidePanel({ open, onClose, title, children }: SidePanelProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-[#0D1117] border-l border-white/6 z-50 overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-white/6">
          <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </>
  );
}
```

---

### Task 11: Create ConfirmModal component

**Files:**
- Create: `components/admin/shared/ConfirmModal.tsx`

**Step 1: Build the modal**

`components/admin/shared/ConfirmModal.tsx`:

```tsx
"use client";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
  loading?: boolean;
}

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  danger = false,
  loading = false,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-[#111827] border border-white/10 rounded-xl p-6 max-w-md w-full shadow-2xl">
          <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-slate-400 mt-2">{message}</p>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border border-white/10 text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors disabled:opacity-50 ${
                danger
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-emerald text-white hover:bg-emerald-600"
              }`}
            >
              {loading ? "..." : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
```

---

### Task 12: Build Academy Analytics page + API

**Files:**
- Create: `app/admin/academy/page.tsx`
- Create: `app/api/admin/academy/attempts/route.ts`

**Step 1: Create the academy attempts API**

`app/api/admin/academy/attempts/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "20");
  const courseFilter = searchParams.get("course") || undefined;
  const passedFilter = searchParams.get("passed");
  const sortBy = searchParams.get("sortBy") || "attemptedAt";
  const sortDir = (searchParams.get("sortDir") || "desc") as "asc" | "desc";

  const where: Record<string, unknown> = {};
  if (courseFilter) where.courseSlug = courseFilter;
  if (passedFilter === "true") where.passed = true;
  if (passedFilter === "false") where.passed = false;

  const orderBy: Record<string, string> = {};
  if (["attemptedAt", "score", "courseSlug"].includes(sortBy)) {
    orderBy[sortBy] = sortDir;
  } else {
    orderBy.attemptedAt = "desc";
  }

  const [data, totalCount] = await Promise.all([
    prisma.quizAttempt.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        user: { select: { id: true, name: true, email: true } },
        certificate: { select: { id: true, certificateNumber: true } },
      },
    }),
    prisma.quizAttempt.count({ where }),
  ]);

  return NextResponse.json({ data, totalCount, page, pageSize });
}
```

**Step 2: Create the Academy page**

`app/admin/academy/page.tsx`:

```tsx
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { GraduationCap, Target, BarChart3, Award } from "lucide-react";
import MetricCard from "@/components/admin/shared/MetricCard";

export const metadata = { title: "Academy Analytics" };

export default async function AcademyPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const [totalAttempts, passedAttempts, certificates, allScores] = await Promise.all([
    prisma.quizAttempt.count(),
    prisma.quizAttempt.count({ where: { passed: true } }),
    prisma.certificate.count(),
    prisma.quizAttempt.findMany({ select: { score: true, totalQuestions: true } }),
  ]);

  const passRate = totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 0;
  const avgScore = allScores.length > 0
    ? Math.round(allScores.reduce((sum, a) => sum + (a.score / a.totalQuestions) * 100, 0) / allScores.length)
    : 0;

  // Recent attempts for the table (server-rendered first page)
  const recentAttempts = await prisma.quizAttempt.findMany({
    orderBy: { attemptedAt: "desc" },
    take: 20,
    include: {
      user: { select: { id: true, name: true, email: true } },
      certificate: { select: { id: true, certificateNumber: true } },
    },
  });
  const attemptCount = await prisma.quizAttempt.count();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Academy Analytics</h1>
        <p className="text-sm text-slate-400 mt-1">Course completions, scores, and certificates</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Attempts" value={totalAttempts} icon={GraduationCap} accent="emerald" />
        <MetricCard label="Pass Rate" value={`${passRate}%`} icon={Target} accent="emerald" />
        <MetricCard label="Avg Score" value={`${avgScore}%`} icon={BarChart3} accent="cyan" />
        <MetricCard label="Certificates Issued" value={certificates} icon={Award} accent="amber" />
      </div>

      {/* Attempts table (server-rendered) */}
      <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/6">
          <h2 className="font-display text-base font-semibold text-white">All Quiz Attempts</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Student</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Course</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Score</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Certificate</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentAttempts.map((attempt) => (
                <tr key={attempt.id} className="border-b border-white/4 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm text-white">{attempt.user.name || "—"}</p>
                    <p className="text-xs text-slate-500">{attempt.user.email}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-300">{attempt.courseSlug}</td>
                  <td className="px-4 py-3 text-sm font-medium text-white">
                    {attempt.score}/{attempt.totalQuestions} ({Math.round((attempt.score / attempt.totalQuestions) * 100)}%)
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                      attempt.passed ? "bg-emerald/10 text-emerald" : "bg-red-400/10 text-red-400"
                    }`}>
                      {attempt.passed ? "Passed" : "Failed"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400">
                    {attempt.certificate ? attempt.certificate.certificateNumber : "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">{new Date(attempt.attemptedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-white/6 text-xs text-slate-500">
          Showing {Math.min(20, attemptCount)} of {attemptCount} attempts
        </div>
      </div>
    </div>
  );
}
```

---

### Task 13: Build User Management page + API

**Files:**
- Create: `app/admin/users/page.tsx`
- Create: `app/api/admin/users/route.ts`
- Create: `app/api/admin/users/[id]/route.ts`

**Step 1: Create users list API**

`app/api/admin/users/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "20");
  const search = searchParams.get("search") || "";

  const where = search
    ? { OR: [
        { name: { contains: search, mode: "insensitive" as const } },
        { email: { contains: search, mode: "insensitive" as const } },
      ] }
    : {};

  const [data, totalCount] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isAdmin: true,
        createdAt: true,
        _count: { select: { coursePurchases: true, certificates: true } },
      },
    }),
    prisma.user.count({ where }),
  ]);

  return NextResponse.json({ data, totalCount, page, pageSize });
}
```

**Step 2: Create user update/delete API**

`app/api/admin/users/[id]/route.ts`:

```typescript
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

  // Only allow updating role
  if (body.role && ["ADMIN", "TEAM", "USER"].includes(body.role)) {
    const user = await prisma.user.update({
      where: { id },
      data: {
        role: body.role,
        isAdmin: body.role === "ADMIN",
      },
    });
    return NextResponse.json(user);
  }

  return NextResponse.json({ error: "Invalid update" }, { status: 400 });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;

  // Prevent self-deletion
  if (id === session.user.id) {
    return NextResponse.json({ error: "Cannot delete yourself" }, { status: 400 });
  }

  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
```

**Step 3: Create Users page (server-rendered)**

`app/admin/users/page.tsx`:

```tsx
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { Users, UserPlus, Shield } from "lucide-react";
import MetricCard from "@/components/admin/shared/MetricCard";
import Badge from "@/components/admin/shared/Badge";

export const metadata = { title: "User Management" };

export default async function UsersPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [totalUsers, newThisMonth, adminTeamCount, users, userCount] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.user.count({ where: { role: { in: ["ADMIN", "TEAM"] } } }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isAdmin: true,
        createdAt: true,
        _count: { select: { coursePurchases: true, certificates: true } },
      },
    }),
    prisma.user.count(),
  ]);

  const roleVariant = (role: string) => {
    if (role === "ADMIN") return "emerald";
    if (role === "TEAM") return "amber";
    return "slate";
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">User Management</h1>
        <p className="text-sm text-slate-400 mt-1">Manage users, roles, and access</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard label="Total Users" value={totalUsers} icon={Users} accent="emerald" />
        <MetricCard label="New This Month" value={newThisMonth} icon={UserPlus} accent="cyan" />
        <MetricCard label="Admin/Team" value={adminTeamCount} icon={Shield} accent="amber" />
      </div>

      <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/6">
          <h2 className="font-display text-base font-semibold text-white">All Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">User</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Courses</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Certs</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const displayRole = user.role || (user.isAdmin ? "ADMIN" : "USER");
                const initials = (user.name || user.email || "?").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
                return (
                  <tr key={user.id} className="border-b border-white/4 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald/20 flex items-center justify-center text-emerald text-xs font-bold flex-shrink-0">
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-white truncate">{user.name || "—"}</p>
                          <p className="text-xs text-slate-500 truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge label={displayRole} variant={roleVariant(displayRole) as "emerald" | "amber" | "slate"} />
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">{user._count.coursePurchases}</td>
                    <td className="px-4 py-3 text-sm text-slate-300">{user._count.certificates}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-white/6 text-xs text-slate-500">
          Showing {Math.min(20, userCount)} of {userCount} users
        </div>
      </div>
    </div>
  );
}
```

---

### Task 14: Build Leads Management page + API

**Files:**
- Create: `app/admin/leads/page.tsx`
- Create: `app/api/admin/leads/route.ts`
- Create: `app/api/admin/leads/[id]/route.ts`

**Step 1: Create leads list API**

`app/api/admin/leads/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "20");
  const readFilter = searchParams.get("read");

  const where: Record<string, unknown> = {};
  if (readFilter === "true") where.read = true;
  if (readFilter === "false") where.read = false;

  const [data, totalCount] = await Promise.all([
    prisma.contactSubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.contactSubmission.count({ where }),
  ]);

  return NextResponse.json({ data, totalCount, page, pageSize });
}
```

**Step 2: Create lead update/delete API**

`app/api/admin/leads/[id]/route.ts`:

```typescript
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

  const lead = await prisma.contactSubmission.update({
    where: { id },
    data: { read: body.read },
  });

  return NextResponse.json(lead);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  await prisma.contactSubmission.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
```

**Step 3: Create Leads page (server-rendered)**

`app/admin/leads/page.tsx`:

```tsx
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { MessageSquare, MailOpen } from "lucide-react";
import MetricCard from "@/components/admin/shared/MetricCard";

export const metadata = { title: "Lead Management" };

export default async function LeadsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [unreadCount, monthCount, leads, totalCount] = await Promise.all([
    prisma.contactSubmission.count({ where: { read: false } }),
    prisma.contactSubmission.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.contactSubmission.count(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Leads</h1>
        <p className="text-sm text-slate-400 mt-1">Contact form submissions</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MetricCard label="Unread Leads" value={unreadCount} icon={MessageSquare} accent="amber" />
        <MetricCard label="This Month" value={monthCount} icon={MailOpen} accent="emerald" />
      </div>

      <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/6">
          <h2 className="font-display text-base font-semibold text-white">All Submissions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Phone</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Service</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Message</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-white/4 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-sm text-white">{lead.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">{lead.email}</td>
                  <td className="px-4 py-3 text-sm text-slate-400">{lead.phone || "—"}</td>
                  <td className="px-4 py-3">
                    {lead.service && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-emerald/10 text-emerald">
                        {lead.service}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400 max-w-[200px] truncate">{lead.message}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    {lead.read ? (
                      <span className="text-xs text-slate-500">Read</span>
                    ) : (
                      <span className="inline-block w-2 h-2 bg-emerald rounded-full" title="Unread" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-white/6 text-xs text-slate-500">
          Showing {Math.min(20, totalCount)} of {totalCount} submissions
        </div>
      </div>
    </div>
  );
}
```

---

## Phase 3: Collaboration (Team + Tasks + Notifications)

### Task 15: Build Team Management page + invite API

**Files:**
- Create: `app/admin/team/page.tsx`
- Create: `app/api/admin/team/invite/route.ts`
- Create: `app/api/admin/team/[id]/route.ts`

**Step 1: Create invite API**

`app/api/admin/team/invite/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { email, inviteRole } = await request.json();
  if (!email || !["ADMIN", "TEAM"].includes(inviteRole)) {
    return NextResponse.json({ error: "Email and valid role required" }, { status: 400 });
  }

  const invite = await prisma.teamInvite.create({
    data: {
      email,
      role: inviteRole,
      invitedById: session.user.id,
      expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000), // 72 hours
    },
  });

  // Send invite email
  const inviteUrl = `https://vanguardm.com/auth/sign-up?invite=${invite.token}`;
  await sendEmail({
    to: email,
    subject: "You've been invited to Vanguard Digital Marketing",
    html: `<p>You've been invited to join the Vanguard team as a <strong>${inviteRole}</strong>.</p>
           <p><a href="${inviteUrl}">Accept Invite</a></p>
           <p>This link expires in 72 hours.</p>`,
  });

  return NextResponse.json({ success: true, invite });
}
```

**Step 2: Create team member remove API**

`app/api/admin/team/[id]/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;

  if (id === session.user.id) {
    return NextResponse.json({ error: "Cannot remove yourself" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id },
    data: { role: "USER", isAdmin: false },
  });

  return NextResponse.json({ success: true });
}
```

**Step 3: Create Team page (server-rendered)**

`app/admin/team/page.tsx`:

```tsx
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import Badge from "@/components/admin/shared/Badge";

export const metadata = { title: "Team Management" };

export default async function TeamPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const [teamMembers, pendingInvites] = await Promise.all([
    prisma.user.findMany({
      where: { role: { in: ["ADMIN", "TEAM"] } },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.teamInvite.findMany({
      where: { acceptedAt: null, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: "desc" },
      select: { id: true, email: true, role: true, expiresAt: true, createdAt: true },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Team</h1>
          <p className="text-sm text-slate-400 mt-1">Manage team members and invitations</p>
        </div>
        {/* Invite button — Phase 3 will add client-side modal */}
      </div>

      {/* Active members */}
      <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/6">
          <h2 className="font-display text-base font-semibold text-white">Active Members ({teamMembers.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Member</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Joined</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => {
                const initials = (member.name || member.email).split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
                return (
                  <tr key={member.id} className="border-b border-white/4 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald/20 flex items-center justify-center text-emerald text-xs font-bold flex-shrink-0">
                          {initials}
                        </div>
                        <div>
                          <p className="text-sm text-white">{member.name || "—"}</p>
                          <p className="text-xs text-slate-500">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge label={member.role} variant={member.role === "ADMIN" ? "emerald" : "amber"} />
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{new Date(member.createdAt).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending invites */}
      {pendingInvites.length > 0 && (
        <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/6">
            <h2 className="font-display text-base font-semibold text-white">Pending Invites ({pendingInvites.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/6">
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Email</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Role</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Expires</th>
                </tr>
              </thead>
              <tbody>
                {pendingInvites.map((invite) => (
                  <tr key={invite.id} className="border-b border-white/4">
                    <td className="px-4 py-3 text-sm text-slate-300">{invite.email}</td>
                    <td className="px-4 py-3"><Badge label={invite.role} variant="amber" /></td>
                    <td className="px-4 py-3 text-xs text-slate-500">{new Date(invite.expiresAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

### Task 16: Build Kanban Task Board page + APIs

**Files:**
- Create: `app/admin/tasks/page.tsx`
- Create: `app/api/admin/tasks/route.ts`
- Create: `app/api/admin/tasks/[id]/route.ts`

**Step 1: Create tasks CRUD API**

`app/api/admin/tasks/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN" && role !== "TEAM") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const where = role === "TEAM" ? { assigneeId: session.user.id } : {};

  const tasks = await prisma.task.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      assignee: { select: { id: true, name: true, email: true } },
      createdBy: { select: { id: true, name: true } },
      _count: { select: { comments: true } },
    },
  });

  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();

  const task = await prisma.task.create({
    data: {
      title: body.title,
      description: body.description || null,
      priority: body.priority || "NORMAL",
      category: body.category || null,
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
      assigneeId: body.assigneeId || null,
      createdById: session.user.id,
    },
    include: {
      assignee: { select: { id: true, name: true, email: true } },
      createdBy: { select: { id: true, name: true } },
      _count: { select: { comments: true } },
    },
  });

  return NextResponse.json(task, { status: 201 });
}
```

**Step 2: Create task update/delete API**

`app/api/admin/tasks/[id]/route.ts`:

```typescript
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

  // Team members can only update status of assigned tasks
  if (role === "TEAM") {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task || task.assigneeId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    // Only allow status update for team members
    const updated = await prisma.task.update({
      where: { id },
      data: { status: body.status },
    });
    return NextResponse.json(updated);
  }

  // Admin can update everything
  const data: Record<string, unknown> = {};
  if (body.title !== undefined) data.title = body.title;
  if (body.description !== undefined) data.description = body.description;
  if (body.status !== undefined) data.status = body.status;
  if (body.priority !== undefined) data.priority = body.priority;
  if (body.category !== undefined) data.category = body.category;
  if (body.dueDate !== undefined) data.dueDate = body.dueDate ? new Date(body.dueDate) : null;
  if (body.assigneeId !== undefined) data.assigneeId = body.assigneeId || null;

  const task = await prisma.task.update({
    where: { id },
    data,
    include: {
      assignee: { select: { id: true, name: true, email: true } },
      createdBy: { select: { id: true, name: true } },
      _count: { select: { comments: true } },
    },
  });

  return NextResponse.json(task);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  await prisma.task.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
```

**Step 3: Create Tasks page (server-rendered with basic columns)**

`app/admin/tasks/page.tsx`:

```tsx
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import MetricCard from "@/components/admin/shared/MetricCard";
import Badge from "@/components/admin/shared/Badge";

export const metadata = { title: "Tasks" };

export default async function TasksPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  const where = role === "TEAM" ? { assigneeId: session.user.id } : {};

  const [tasks, completedCount, inProgressCount, overdueCount] = await Promise.all([
    prisma.task.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        assignee: { select: { id: true, name: true, email: true } },
        createdBy: { select: { id: true, name: true } },
      },
    }),
    prisma.task.count({ where: { ...where, status: "COMPLETED" } }),
    prisma.task.count({ where: { ...where, status: "IN_PROGRESS" } }),
    prisma.task.count({ where: { ...where, status: "NEW", dueDate: { lt: new Date() } } }),
  ]);

  const newTasks = tasks.filter((t) => t.status === "NEW");
  const ipTasks = tasks.filter((t) => t.status === "IN_PROGRESS");
  const doneTasks = tasks.filter((t) => t.status === "COMPLETED");

  const priorityVariant = (p: string) => {
    if (p === "URGENT") return "red";
    if (p === "HIGH") return "amber";
    return "slate";
  };

  const renderColumn = (title: string, color: string, columnTasks: typeof tasks) => (
    <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-white/6 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <span className="text-xs text-slate-500 ml-auto">{columnTasks.length}</span>
      </div>
      <div className="p-3 space-y-3 min-h-[200px]">
        {columnTasks.map((task) => (
          <div key={task.id} className="bg-white/5 rounded-lg p-4 border border-white/6 hover:border-white/12 transition-colors">
            <p className="text-sm font-medium text-white">{task.title}</p>
            {task.description && (
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{task.description}</p>
            )}
            <div className="flex items-center gap-2 mt-3">
              <Badge label={task.priority} variant={priorityVariant(task.priority) as "red" | "amber" | "slate"} />
              {task.category && <Badge label={task.category} variant="cyan" />}
            </div>
            <div className="flex items-center justify-between mt-3">
              {task.assignee ? (
                <span className="text-xs text-slate-400">{task.assignee.name || task.assignee.email}</span>
              ) : (
                <span className="text-xs text-slate-600">Unassigned</span>
              )}
              {task.dueDate && (
                <span className="text-xs text-slate-500">{new Date(task.dueDate).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Tasks</h1>
        <p className="text-sm text-slate-400 mt-1">Task board</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard label="Completed" value={completedCount} icon={CheckCircle} accent="emerald" />
        <MetricCard label="In Progress" value={inProgressCount} icon={Clock} accent="amber" />
        <MetricCard label="Overdue" value={overdueCount} icon={AlertCircle} accent="red" />
      </div>

      {/* Kanban columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {renderColumn("New", "bg-red-400", newTasks)}
        {renderColumn("In Progress", "bg-amber", ipTasks)}
        {renderColumn("Completed", "bg-emerald", doneTasks)}
      </div>
    </div>
  );
}
```

---

### Task 17: Build Notification system

**Files:**
- Create: `app/api/admin/notifications/route.ts`
- Create: `app/api/admin/notifications/[id]/route.ts`

**Step 1: Notifications list API**

`app/api/admin/notifications/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const notifications = await prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return NextResponse.json(notifications);
}
```

**Step 2: Mark notification read API**

`app/api/admin/notifications/[id]/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const notification = await prisma.notification.update({
    where: { id, userId: session.user.id },
    data: { read: true },
  });

  return NextResponse.json(notification);
}
```

---

## Phase 4: AI Agent + Settings + Deploy

### Task 18: Build Settings page

**Files:**
- Create: `app/admin/settings/page.tsx`

**Step 1: Create Settings page**

`app/admin/settings/page.tsx`:

```tsx
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Dashboard configuration</p>
      </div>

      {/* Profile section */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <h2 className="font-display text-base font-semibold text-white">Profile</h2>
          <p className="text-sm text-slate-400 mt-1">Your account information</p>
        </div>
        <div className="lg:col-span-8 bg-[#111827] border border-white/6 rounded-xl p-6 space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Name</label>
            <p className="text-sm text-white">{session.user.name || "—"}</p>
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Email</label>
            <p className="text-sm text-white">{session.user.email}</p>
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Role</label>
            <p className="text-sm text-white">{session.user.role}</p>
          </div>
        </div>
      </div>

      {/* Site section */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <h2 className="font-display text-base font-semibold text-white">Site</h2>
          <p className="text-sm text-slate-400 mt-1">Integration status</p>
        </div>
        <div className="lg:col-span-8 bg-[#111827] border border-white/6 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300">Google Tag Manager</span>
            <span className="text-xs text-emerald font-mono">GTM-N4SJ38HT</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300">Cloudflare Turnstile</span>
            <span className="text-xs text-emerald">Active</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300">Stripe Payments</span>
            <span className="text-xs text-emerald">Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### Task 19: Build AI Agent chat page + API

**Files:**
- Create: `app/admin/agent/page.tsx`
- Create: `app/api/admin/agent/chat/route.ts`
- Create: `app/api/admin/agent/conversations/route.ts`

**Step 1: Create chat streaming API**

`app/api/admin/agent/chat/route.ts`:

```typescript
import { NextRequest } from "next/server";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") {
    return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
  }

  const { messages, skill } = await request.json();
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "ANTHROPIC_API_KEY not configured" }), { status: 500 });
  }

  const systemPrompt = `You are an AI assistant for Vanguard Digital Marketing's admin dashboard. You help with digital marketing strategy, analytics, campaign management, and general business operations.${
    skill ? `\n\nActive skill context: ${skill}` : ""
  }`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: systemPrompt,
      messages,
      stream: true,
    }),
  });

  // Forward the SSE stream
  return new Response(response.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
```

**Step 2: Create conversations CRUD API**

`app/api/admin/agent/conversations/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const conversations = await prisma.conversation.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, updatedAt: true },
  });

  return NextResponse.json(conversations);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  const conversation = await prisma.conversation.create({
    data: {
      userId: session.user.id,
      title: body.title || "New conversation",
      messages: body.messages || [],
    },
  });

  return NextResponse.json(conversation, { status: 201 });
}
```

**Step 3: Create AI Agent page (placeholder)**

`app/admin/agent/page.tsx`:

```tsx
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Bot } from "lucide-react";

export const metadata = { title: "AI Agent" };

export default async function AgentPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)]">
      <div className="w-16 h-16 rounded-2xl bg-emerald/10 flex items-center justify-center mb-4">
        <Bot size={32} className="text-emerald" />
      </div>
      <h1 className="font-display text-2xl font-bold text-white">AI Agent</h1>
      <p className="text-sm text-slate-400 mt-2 max-w-md text-center">
        Chat with an AI assistant powered by Claude. Ask about marketing strategy,
        campaign management, analytics, and more.
      </p>
      <p className="text-xs text-slate-600 mt-4">
        Full chat interface coming in Phase 4b — API routes are ready.
      </p>
    </div>
  );
}
```

---

### Task 20: Build and deploy

**Step 1: Build the project**

Run:
```bash
cd /home/vanguardm/public_html && npx next build 2>&1 | tail -30
```
Expected: All routes compile successfully including `/admin/*`

**Step 2: Restart PM2**

Run:
```bash
cd /home/vanguardm/env && pm2 restart ecosystem.config.cjs
```
Expected: `vanguardm` process restarts with status `online`

**Step 3: Clear nginx cache**

Run:
```bash
rm -rf /var/cache/ea-nginx/proxy/vanguardm/ && service nginx restart
```

**Step 4: Verify**

Run:
```bash
curl -s -o /dev/null -w "%{http_code}" https://vanguardm.com/admin
```
Expected: `302` (redirects to sign-in for unauthenticated users) or `200` if already authenticated

---

## Summary

| Phase | Tasks | What's Built |
|-------|-------|-------------|
| 1 | 1–8 | Dependencies, schema, auth, middleware, layout, overview, role sync |
| 2 | 9–14 | DataTable, SidePanel, ConfirmModal, Academy, Users, Leads pages |
| 3 | 15–17 | Team management, Kanban task board, notifications |
| 4 | 18–20 | Settings, AI Agent (placeholder + API), build & deploy |

**Total: 20 tasks across 4 phases.**

After Phase 4, the admin dashboard will be functional at `/admin` with all 8 navigation items, server-rendered data pages, and API routes ready for client-side interactivity enhancements (drag-and-drop Kanban, real-time SSE, full AI chat UI).
