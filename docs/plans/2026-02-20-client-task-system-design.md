# Client + Task System Design — Agency Operations Dashboard

**Date:** 2026-02-20
**Status:** Approved
**Author:** Claude Code + James Kent

## Overview

Transform the vanguardm.com admin dashboard from an academy-focused LMS into a full agency operations hub. Add Client CRM, Project tracking, Support tickets, Communication logs, and enhanced Task management across 6 service lines: SMA, PPC, Web Design, Support, SEO, and Reporting.

## Architecture

- **Framework:** Next.js 16.1.6 (App Router, Server Components)
- **Database:** PostgreSQL via Prisma ORM (PrismaPg adapter)
- **Auth:** NextAuth v5 (JWT, Credentials + Turnstile)
- **Styling:** Tailwind v4, dark theme (#0A0F1A / #111827 / #0D1117)
- **Brand:** Emerald #10b981 primary, Amber #f59e0b secondary

## New Enums

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

## New Models

### Client

```prisma
model Client {
  id                String       @id @default(cuid())
  name              String
  domain            String?
  phone             String?
  email             String?
  address           String?      @db.Text
  status            ClientStatus @default(PROSPECT)
  monthlyRetainer   Int?         // cents
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

### ClientContact

```prisma
model ClientContact {
  id        String  @id @default(cuid())
  clientId  String
  client    Client  @relation(fields: [clientId], references: [id], onDelete: Cascade)
  name      String
  email     String
  phone     String?
  role      String  @default("primary") // primary, billing, technical, marketing
  isPrimary Boolean @default(false)
  createdAt DateTime @default(now())

  @@index([clientId])
}
```

### ClientService

```prisma
model ClientService {
  id            String      @id @default(cuid())
  clientId      String
  client        Client      @relation(fields: [clientId], references: [id], onDelete: Cascade)
  serviceType   ServiceType
  status        ClientStatus @default(ACTIVE)
  monthlyBudget Int?        // cents (ad spend for PPC)
  startDate     DateTime    @default(now())
  createdAt     DateTime    @default(now())

  @@unique([clientId, serviceType])
  @@index([clientId])
}
```

### Project

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
  budget        Int?          // cents
  tasks         Task[]
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  @@index([clientId])
  @@index([status])
  @@index([serviceType])
}
```

### Enhanced Task (add fields to existing model)

```prisma
// ADD to existing Task model:
clientId    String?
client      Client?      @relation(fields: [clientId], references: [id])
projectId   String?
project     Project?     @relation(fields: [projectId], references: [id])
serviceType ServiceType?

@@index([clientId])
@@index([serviceType])
```

### ClientNote

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

### SupportTicket

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

### User Model Additions

```prisma
// ADD to existing User model:
clientNotes      ClientNote[]
assignedTickets  SupportTicket[]
```

## Admin Pages

### New Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/admin/clients` | ClientsPage | Client list — card grid or table, status badges, search, filter by service/status |
| `/admin/clients/new` | NewClientPage | Create client form (name, domain, contacts, services) |
| `/admin/clients/[id]` | ClientDetailPage | Tabbed detail: Overview / Contacts / Services / Projects / Tasks / Notes / Tickets |
| `/admin/clients/[id]/edit` | EditClientPage | Edit client info |
| `/admin/projects` | ProjectsPage | All projects, filter by client/service/status |
| `/admin/tickets` | TicketsPage | Support tickets with SLA countdown, filter by status/priority/client |

### Enhanced Routes

| Route | Changes |
|-------|---------|
| `/admin` | Add: client count, tasks by service line bar chart, team workload, upcoming deadlines |
| `/admin/tasks` | Add: client column, service type filter tabs, create/edit/delete modals |

### Updated Sidebar

```
Overview        LayoutDashboard
Clients         Building2        (NEW)
Projects        FolderKanban     (NEW)
Tasks           KanbanSquare     (enhanced)
Tickets         LifeBuoy         (NEW)
Leads           MessageSquare
Team            UserCog
AI Agent        Bot
Academy         GraduationCap
Settings        Settings
```

## New API Routes

| Endpoint | Methods | Purpose |
|----------|---------|---------|
| `/api/admin/clients` | GET, POST | List/create clients |
| `/api/admin/clients/[id]` | GET, PUT, DELETE | Client CRUD |
| `/api/admin/clients/[id]/contacts` | GET, POST | Client contacts |
| `/api/admin/clients/[id]/services` | GET, POST, DELETE | Client services |
| `/api/admin/clients/[id]/notes` | GET, POST | Communication log |
| `/api/admin/projects` | GET, POST | List/create projects |
| `/api/admin/projects/[id]` | GET, PUT, DELETE | Project CRUD |
| `/api/admin/tickets` | GET, POST | List/create tickets |
| `/api/admin/tickets/[id]` | GET, PUT, DELETE | Ticket CRUD |
| `/api/admin/tasks` | (enhanced) | Add client/project/serviceType filters |

## New Components

### Shared
- `ServiceTypeBadge.tsx` — Color-coded service line pill (SMA=purple, PPC=blue, WEB=cyan, SUPPORT=amber, SEO=emerald, REPORTING=slate)
- `ClientStatusBadge.tsx` — ACTIVE=emerald, PAUSED=amber, CHURNED=red, PROSPECT=slate
- `SLATimer.tsx` — Countdown timer for ticket SLA deadlines
- `ServiceFilterTabs.tsx` — [ All | SMA | PPC | Web | Support | SEO | Reporting ] tab bar

### Client-specific
- `ClientCard.tsx` — Card view showing name, domain, status, active services
- `ClientDetailTabs.tsx` — Tab navigation for client detail page
- `ContactList.tsx` — List/add/edit contacts for a client
- `NoteTimeline.tsx` — Chronological timeline of calls, emails, meetings
- `AddNoteModal.tsx` — Quick-add note with type selector

### Task enhancements
- `TaskCreateModal.tsx` — Modal form: title, description, client selector, project selector, service type, priority, assignee, due date
- `TaskEditModal.tsx` — Edit existing task
- `TaskCard.tsx` — Enhanced card showing client name + service badge

## Service Line Color Scheme

| Service | Color | Tailwind | Hex |
|---------|-------|----------|-----|
| SMA | Purple | `purple-400` | #c084fc |
| PPC | Blue | `blue-400` | #60a5fa |
| WEB | Cyan | `cyan-400` | #22d3ee |
| SUPPORT | Amber | `amber-400` | #fbbf24 |
| SEO | Emerald | `emerald-400` | #34d399 |
| REPORTING | Slate | `slate-400` | #94a3b8 |

## Seed Data

Pre-populate from known clients:
- Howdy Garage Doors (howdygarage.com) — PPC, Web, SEO
- Brazos Valley HVAC (brazosvalleyhvac.com) — PPC, Web, SEO, SMA
- ADVTECH Detailing (advtechdetailing.com) — Web
- ABWMS (abwmsonline.org) — Web, SEO
- + remaining Nimbata/GTM clients as ACTIVE

## Security

- All new routes require ADMIN role (or TEAM for assigned tasks/tickets)
- Client data never exposed to USER role
- API routes validate session + role before any operation
- No client financial data in client-facing endpoints

## Testing Criteria

- All CRUD operations work for Client, Contact, Service, Project, Task, Note, Ticket
- Service line filter tabs correctly filter across all list pages
- Task create/edit modal properly links to client + project
- SLA timer calculates correctly from client.slaResponseHours
- Sidebar shows correct navigation for ADMIN vs TEAM roles
- Seed data populates correctly from known client list

## Implementation Order

1. Prisma schema migration (new models + enhanced Task)
2. API routes (clients → projects → tickets → enhanced tasks)
3. Shared components (badges, filters, modals)
4. Client pages (list → detail → create/edit)
5. Project pages
6. Ticket pages
7. Enhanced task pages
8. Enhanced overview dashboard
9. Seed data
10. Sidebar navigation update
