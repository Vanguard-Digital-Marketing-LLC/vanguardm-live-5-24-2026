# Admin Dashboard Design — vanguardm.com

**Date:** 2026-02-20
**Status:** Approved
**Author:** Brainstorming session (Claude + James)

---

## Goal

Build a comprehensive admin dashboard for vanguardm.com at `/admin/*` with 7 modules: Overview, Academy Analytics, User Management, Team Management, Task Board (real-time Kanban), Lead Management, and Settings. Design inspired by Supabase Studio (layout/data patterns) + Dashbrd X Webflow template (visual style), adapted to the Vanguard brand.

## Architecture

- **Framework:** Next.js 16 App Router (existing stack)
- **Auth:** NextAuth v5 with new Role enum (ADMIN/TEAM/USER)
- **Database:** PostgreSQL + Prisma (extend existing schema)
- **Real-time:** Server-Sent Events (SSE) for task board only
- **Charts:** Recharts (matches Supabase pattern)
- **Styling:** Tailwind CSS v4 (existing), dark theme only

---

## Layout

### 3-Column Inspired, 2-Column Implementation

```
+--------+-------------------------------+
| Icon   | Header (breadcrumbs + search  |
| Nav    |  + notifications + avatar)    |
| Bar    +-------------------------------+
| 64px   | Main Content Area             |
| (exp   | (scrollable, max-w-7xl)       |
| 240px) |                               |
+--------+-------------------------------+
```

- **Icon Nav Bar:** 64px collapsed, 240px expanded on hover/click
- **Header:** 56px height, sticky top, breadcrumbs + search + notification bell + user avatar dropdown
- **Content:** Scrollable, max-width 1280px centered, responsive grid

### Sidebar Navigation (7 items)

| # | Label | Icon (Lucide) | Route | Badge |
|---|-------|---------------|-------|-------|
| 1 | Overview | LayoutDashboard | /admin | — |
| 2 | Academy | GraduationCap | /admin/academy | — |
| 3 | Users | Users | /admin/users | — |
| 4 | Team | UserCog | /admin/team | — |
| 5 | Tasks | KanbanSquare | /admin/tasks | Overdue count |
| 6 | Leads | MessageSquare | /admin/leads | Unread count |
| 7 | Settings | Settings | /admin/settings | — |
| 8 | AI Agent | Bot | /admin/agent | — |

**Active state:** Emerald left border + emerald tinted bg + white text
**Hover state:** Subtle bg lighten
**Collapsed:** Icons only with tooltips
**Expanded:** Icons + labels + chevron for sections

### User Profile (sidebar bottom)

Avatar circle + name + "Account settings" link (like Dashbrd X)

---

## Design Tokens

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-body` | #0A0F1A | Page background |
| `--bg-card` | #111827 | Card/panel surface (slate-900) |
| `--bg-card-hover` | #1F2937 | Card hover state (slate-800) |
| `--bg-sidebar` | #0D1117 | Sidebar background |
| `--border-default` | rgba(255,255,255,0.06) | Card borders |
| `--border-hover` | rgba(255,255,255,0.12) | Hover borders |
| `--accent-primary` | #10b981 | Emerald — active, success, primary CTAs |
| `--accent-secondary` | #f59e0b | Amber — warnings, pending, secondary |
| `--accent-danger` | #ef4444 | Red — errors, overdue, destructive |
| `--text-primary` | #f9fafb | Headings, values |
| `--text-secondary` | #9ca3af | Labels, descriptions |
| `--text-tertiary` | #6b7280 | Timestamps, muted |

### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Page title | Chakra Petch | 24px | 700 |
| Section header | Chakra Petch | 16px | 600 |
| Card title | Outfit | 14px | 600 |
| Metric value | Outfit | 28px | 700 |
| Body text | Outfit | 14px | 400 |
| Table header | Outfit | 12px | 600 uppercase |
| Table cell | Outfit | 13px | 400 |
| Badge | Outfit | 10px | 600 uppercase |
| Nav label | Outfit | 14px | 500 |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| Card padding | 24px | Internal card padding |
| Card gap | 16px | Grid gap between cards |
| Section gap | 32px | Between dashboard sections |
| Table row height | 48px | Data table rows |
| Sidebar item height | 40px | Nav items |

---

## Pages

### 1. `/admin` — Overview Dashboard

**Metric cards:** 6 cards in responsive grid (3x2 desktop, 2x3 tablet, 1x6 mobile)

| Card | Value Source | Trend | Icon | Accent |
|------|-------------|-------|------|--------|
| Total Users | User.count() | % change vs last month | Users | emerald |
| Active Courses | COURSES.length (41) | purchases this month | BookOpen | emerald |
| Exam Completions | QuizAttempt.count(passed:true) | pass rate % | Award | emerald |
| Certificates | Certificate.count() | issued this month | Trophy | amber |
| Open Leads | ContactSubmission.count(read:false) | total this month | MessageSquare | amber |
| Active Tasks | Task.count(status:!COMPLETED) | overdue count | KanbanSquare | amber |

**Each card layout (Dashbrd style):**
```
+----------------------------+
| [icon]                     |
| 60.8K        ▲ 12.6%      |
| ○ Page views               |
+----------------------------+
```

**Chart row:** 2-column grid
- Left (span-7): Line chart — "Exam Completions" (30 days, emerald line for pass, red for fail)
- Right (span-5): Donut chart — "Courses by Category" (8 segments)

**Table row:** 2-column grid
- Left: "Recent Leads" (last 5) — name, email, service, date, read badge
- Right: "Recent Quiz Attempts" (last 5) — student, course, score, pass/fail badge

### 2. `/admin/academy` — Academy Analytics

**Top metrics:** 4 cards
- Total Attempts | Pass Rate % | Avg Score | Certificates Issued

**Charts:** 2-column
- Left: Dual line chart — pass/fail over time (30 days)
- Right: Horizontal bar chart — Top 10 courses by completions

**Main data table:** All QuizAttempts (server-side paginated)

| Column | Type | Sortable | Filterable |
|--------|------|----------|------------|
| Student | Name + email | Yes | Search |
| Course | Title | Yes | Dropdown (41 courses) |
| Score | X/Y (%) | Yes | — |
| Status | Badge (Pass/Fail) | Yes | Toggle |
| Certificate | Link or "—" | — | — |
| Date | Timestamp | Yes | Date range |

**Click student name** → side panel with student profile:
- All courses purchased
- All quiz attempts with scores
- All certificates earned
- Account creation date

### 3. `/admin/users` — User Management

**Top metrics:** 3 cards — Total Users, New This Month, Admin/Team Accounts

**Data table:** All Users

| Column | Type |
|--------|------|
| Avatar | Initials circle (first letter of name) |
| Name | Full name |
| Email | Email address |
| Role | Badge (Admin=emerald, Team=amber, User=slate) |
| Courses | Purchase count |
| Certificates | Cert count |
| Joined | Date |
| Actions | Dropdown (Edit role, View profile, Delete) |

**Click row** → side panel (Supabase-style):
- User overview (all properties)
- Course purchases tab
- Quiz attempts tab
- Certificates tab

### 4. `/admin/team` — Team Management

**Team list:**
- "+ Invite Team Member" button → modal (email input, role select TEAM/ADMIN)
- Sends email with invite link containing token
- Invite accepted → user creates account with assigned role

**Table:**

| Column | Type |
|--------|------|
| Avatar | Profile image or initials |
| Name | Full name |
| Email | Email address |
| Role | Badge (Admin/Team) |
| Tasks | Assigned task count |
| Last Active | Timestamp |
| Status | Active (emerald) / Invited (amber) / Inactive (gray) |
| Actions | Change role, Remove |

### 5. `/admin/tasks` — Kanban Task Board

**Top metrics:** 3 cards
- Completed (emerald) with trend | In Progress (amber) | Overdue (red)

**Kanban board:** 3 columns, drag-and-drop between columns

**Columns:**
- **New** — red dot + count badge
- **In Progress** — amber dot + count badge
- **Completed** — emerald dot + count badge

Each column has "+ Add new task" link at top.

**Task card layout (Dashbrd V3 style):**
```
+----------------------------------+
| Task Title                       |
| Description preview (2 lines)... |
|                                  |
| ✓ 7 of 10 completed        70%  |
| [====------]                     |
|                                  |
| 👤👤👤 +4    📅 Feb 25           |
| [Marketing]  👁 6  📎 4  💬 12  |
+----------------------------------+
```

**Add task modal fields:**
- Title (required)
- Description (textarea)
- Assignee (team member dropdown, multi-select)
- Due date (date picker)
- Priority (Low/Normal/High/Urgent)
- Category (Marketing/Development/Design/Support/Other)

**Real-time:** SSE endpoint at `/api/admin/tasks/stream`
- Emits events: task-created, task-updated, task-moved, task-deleted
- All connected clients receive updates instantly
- Reconnection with exponential backoff

### 6. `/admin/leads` — Contact Submissions

**Top metrics:** 2 cards — Unread Leads, Total This Month

**Filter bar:** Date range picker + Service dropdown + Read/Unread toggle

**Data table:**

| Column | Type |
|--------|------|
| Name | Sender name |
| Email | Email address |
| Phone | Phone number or "—" |
| Service | Service interest |
| Message | Truncated (40 chars) |
| Date | Submission timestamp |
| Status | Read (gray) / Unread (emerald dot) |

**Click row** → expandable detail panel:
- Full message text
- Mark as read/unread button
- Reply via email button (opens mailto or inline compose)
- Delete button (confirmation modal)

### 7. `/admin/settings` — Dashboard Settings

**Sections (left nav within settings):**

1. **Profile** — Name, email, password change, avatar upload
2. **Team** — Default invite role, team permissions
3. **Notifications** — Email alerts toggle for: new leads, task assignments, exam completions
4. **Academy** — Passing score threshold (default 70%), course management
5. **Site** — GTM ID, SMTP config display (read-only), Turnstile status

Each section follows Supabase Scaffold pattern:
```
+------------------+------------------------+
| Section Title    | Form Controls          |
| Description      | (inputs, toggles,      |
| (col-span-4)     |  selects)              |
|                  | (col-span-8)           |
+------------------+------------------------+
```

---

### 8. `/admin/agent` — AI Agent Chat Panel

**Supabase-style assistant panel** with skills loaded as system context.

**Layout:** Full-page chat interface (like ChatGPT/Claude UI)
- Left: Conversation list (saved chats)
- Right: Active chat with message bubbles

**Skill Integration:**
- 35 skills loaded from `/root/.claude/commands/*.md` at build time
- Skills exposed as slash commands in the chat: `/google-ads`, `/gtm`, `/nimbata`, `/seo-structure`, etc.
- Skill content injected into system prompt when invoked
- Admin types a request → backend calls Claude API with skill context → streams response

**Chat features:**
- Message history (persisted to DB)
- Streaming responses (SSE from backend)
- Code blocks with syntax highlighting
- Markdown rendering
- Skill selector dropdown (browse available skills)
- "New chat" button
- Export conversation as markdown

**Backend:**
- `/api/admin/agent/chat` — POST, streams Claude API response
- `/api/admin/agent/conversations` — GET/POST, conversation CRUD
- `/api/admin/agent/skills` — GET, lists available skills
- Claude API key stored in env: `ANTHROPIC_API_KEY`
- Model: claude-sonnet-4-20250514 (fast, capable)
- Skills loaded from filesystem as system prompt context

**New Prisma model:**

```prisma
model Conversation {
  id        String    @id @default(cuid())
  userId    String
  user      User      @relation(fields: [userId], references: [id])
  title     String    @default("New conversation")
  messages  Json      // Array of {role, content, timestamp, skill?}
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  @@index([userId])
}
```

---

## Data Models (New/Modified)

### Modified: User model

```prisma
enum Role {
  ADMIN
  TEAM
  USER
}

model User {
  // ... existing fields ...
  role        Role     @default(USER)
  // Remove: isAdmin Boolean @default(false)
  // Add relations:
  assignedTasks    Task[]    @relation("TaskAssignee")
  createdTasks     Task[]    @relation("TaskCreator")
  taskComments     TaskComment[]
  notifications    Notification[]
  teamInvitesSent  TeamInvite[]  @relation("InvitedBy")
}
```

### New: TeamInvite

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

### New: Task

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

### New: TaskComment

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

### New: Notification

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

---

## API Routes (New)

### Admin APIs (all require ADMIN role)

| Method | Route | Purpose |
|--------|-------|---------|
| GET | /api/admin/stats | Overview dashboard metrics |
| GET | /api/admin/users | Paginated user list |
| PATCH | /api/admin/users/[id] | Update user role |
| DELETE | /api/admin/users/[id] | Delete user |
| GET | /api/admin/academy/attempts | Paginated quiz attempts |
| GET | /api/admin/academy/stats | Academy metrics |
| GET | /api/admin/leads | Paginated contact submissions |
| PATCH | /api/admin/leads/[id] | Mark read/unread |
| DELETE | /api/admin/leads/[id] | Delete lead |
| POST | /api/admin/team/invite | Send team invite |
| DELETE | /api/admin/team/[id] | Remove team member |
| GET | /api/admin/tasks | All tasks |
| POST | /api/admin/tasks | Create task |
| PATCH | /api/admin/tasks/[id] | Update task (status, details) |
| DELETE | /api/admin/tasks/[id] | Delete task |
| POST | /api/admin/tasks/[id]/comments | Add comment |
| GET | /api/admin/tasks/stream | SSE endpoint for real-time |
| GET | /api/admin/notifications | User notifications |
| PATCH | /api/admin/notifications/[id] | Mark notification read |

### Agent APIs (require ADMIN role)

| Method | Route | Purpose |
|--------|-------|---------|
| POST | /api/admin/agent/chat | Stream Claude response with skill context |
| GET | /api/admin/agent/conversations | List conversations |
| POST | /api/admin/agent/conversations | Create conversation |
| GET | /api/admin/agent/conversations/[id] | Get conversation |
| DELETE | /api/admin/agent/conversations/[id] | Delete conversation |
| GET | /api/admin/agent/skills | List available skills |

### Team APIs (require TEAM or ADMIN role)

| Method | Route | Purpose |
|--------|-------|---------|
| GET | /api/team/tasks | Tasks assigned to current user |
| PATCH | /api/team/tasks/[id] | Update assigned task status |
| POST | /api/team/tasks/[id]/comments | Add comment to assigned task |

### Auth

| Method | Route | Purpose |
|--------|-------|---------|
| POST | /api/auth/accept-invite | Accept team invite + create account |

---

## Middleware Updates

```typescript
// Current: protects /dashboard/*
// New: also protect /admin/* with role check

/admin/* → requires role === ADMIN
/admin/tasks/* → requires role === ADMIN or TEAM
```

---

## Component Architecture

```
app/admin/
├── layout.tsx              # Admin layout (sidebar + header + content)
├── page.tsx                # Overview dashboard
├── academy/
│   └── page.tsx            # Academy analytics
├── users/
│   └── page.tsx            # User management
├── team/
│   └── page.tsx            # Team management
├── tasks/
│   └── page.tsx            # Kanban board
├── leads/
│   └── page.tsx            # Contact submissions
├── agent/
│   └── page.tsx            # AI Agent chat
└── settings/
    └── page.tsx            # Settings

components/admin/
├── layout/
│   ├── AdminSidebar.tsx    # Collapsible icon nav
│   ├── AdminHeader.tsx     # Breadcrumbs + search + notifications
│   └── AdminLayout.tsx     # Wrapper combining sidebar + header
├── shared/
│   ├── MetricCard.tsx      # Stat card (value + trend + icon)
│   ├── DataTable.tsx       # Reusable table with sort/filter/pagination
│   ├── SidePanel.tsx       # Slide-over detail panel
│   ├── Badge.tsx           # Status badges
│   ├── Chart.tsx           # Recharts wrapper
│   └── ConfirmModal.tsx    # Confirmation dialog
├── overview/
│   ├── OverviewMetrics.tsx
│   ├── ExamChart.tsx
│   └── RecentTables.tsx
├── academy/
│   ├── AcademyMetrics.tsx
│   ├── AttemptTable.tsx
│   └── StudentPanel.tsx
├── users/
│   ├── UserTable.tsx
│   └── UserPanel.tsx
├── team/
│   ├── TeamTable.tsx
│   └── InviteModal.tsx
├── tasks/
│   ├── KanbanBoard.tsx
│   ├── KanbanColumn.tsx
│   ├── TaskCard.tsx
│   ├── TaskModal.tsx
│   └── useTaskStream.ts   # SSE hook
├── leads/
│   ├── LeadTable.tsx
│   └── LeadDetail.tsx
├── settings/
│   ├── ProfileSection.tsx
│   ├── TeamSection.tsx
│   └── NotificationSection.tsx
└── agent/
    ├── ChatPanel.tsx       # Main chat interface
    ├── MessageBubble.tsx   # Individual message rendering
    ├── SkillSelector.tsx   # Skill browse/select dropdown
    ├── ConversationList.tsx # Saved chats sidebar
    └── useAgentStream.ts   # SSE hook for streaming responses
```

---

## Checks and Balances

### Authorization
- Middleware blocks non-ADMIN users from /admin/* routes
- Every API route double-checks session role server-side
- Team members only see /admin/tasks (their assigned tasks)
- Role changes logged to Notification table

### Data Integrity
- Team invites expire after 72 hours
- Task deletion cascades to comments
- User deletion requires confirmation + orphans tasks to unassigned
- All destructive actions require confirmation modal

### Performance
- Server-side pagination on all tables (20 rows default)
- Chart data aggregated server-side (not loading all records client-side)
- SSE connection pool limited, with heartbeat every 30s
- Metric card data cached with React Query (60s stale time)

### Security
- CSRF protection via NextAuth
- Rate limiting on invite endpoint
- Invite tokens are cuid() (unguessable)
- No sensitive data in SSE stream (just task IDs + status)
- XSS prevention via React's built-in escaping

---

## Reference Templates

Dashboard design screenshots stored at:
`/root/projects/reports/templates/dashboard-reference/`
- dashboard-v1 (Reports — metrics + charts + table)
- dashboard-v2 (Products — gauge + orders + revenue)
- dashboard-v3 (Tasks — Kanban + timeline + team)
