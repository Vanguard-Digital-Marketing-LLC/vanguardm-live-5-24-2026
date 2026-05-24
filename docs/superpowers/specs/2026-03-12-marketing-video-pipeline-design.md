# Marketing Video Pipeline — Design Spec

**Date**: 2026-03-12
**Status**: Approved
**Location**: Integrated into vanguardm.com (`C:\Users\james\projects\vanguardm.com`)

---

## Overview

A professional video production pipeline integrated into the vanguardm.com platform. Produces branded marketing videos for clients across YouTube (long-form + Shorts), Instagram Reels, and TikTok. Clients provide raw footage, Vanguard provides voiceover. The pipeline runs via Python scripts orchestrated from the admin panel, with deliverables accessible through the client portal.

## Requirements

- **Source material**: Raw footage provided by clients (any format)
- **Output platforms**: YouTube long-form, YouTube Shorts, Instagram Reels, TikTok
- **Branding**: Per-client JSON config file (colors, fonts, logo, watermark, intro/outro, captions)
- **Voiceover**: Provided by Vanguard (file-based, not AI-generated)
- **Motion graphics**: After Effects as core tool (JSX automation with reusable templates)
- **Delivery**: Export final files only (no automated upload); clients download from portal
- **Integration**: Lives inside vanguardm.com; admin UI for management, portal for client access
- **Isolation**: No modifications to existing admin panel models, routes, or components

---

## Data Model

### New Prisma Models

```prisma
model VideoProject {
  id            String   @id @default(cuid())
  name          String
  clientId      String
  client        Client   @relation(fields: [clientId], references: [id], onDelete: Cascade)
  status        VideoProjectStatus @default(INTAKE)
  config        Json
  notes         String?
  pipelineLock  DateTime?                // Non-null = pipeline running. Timestamp of lock acquisition.
  errorMessage  String?                  // Last pipeline error (null when status is not FAILED)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  deliverables  VideoDeliverable[]
}

model VideoDeliverable {
  id             String   @id @default(cuid())
  videoProjectId String
  videoProject   VideoProject @relation(fields: [videoProjectId], references: [id], onDelete: Cascade)
  name           String
  platform       VideoPlatform
  status         DeliverableStatus @default(PENDING)
  filePath       String?
  fileSize       BigInt?                  // Bytes — BigInt to support files > 2GB
  duration       Int?                     // Duration in seconds
  resolution     String?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

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

### Schema Changes to Existing Models

- `Client` model: add relation field `videoProjects VideoProject[]` (additive only, no existing fields modified)

---

## Client Brand Config Schema

The `config` JSON field on `VideoProject` stores per-client brand identity:

```json
{
  "brand": {
    "name": "Client Business Name",
    "primaryColor": "#FF6B00",
    "secondaryColor": "#1A1A2E",
    "accentColor": "#FFFFFF",
    "fontFamily": "Montserrat",
    "fontWeight": "700",
    "logoPath": "clients/{slug}/logo.png",
    "watermark": {
      "position": "bottom-right",
      "opacity": 0.6,
      "scale": 10
    }
  },
  "intro": {
    "style": "fade",
    "duration": 5,
    "showLogo": true,
    "showTagline": true,
    "tagline": "Your Tagline Here"
  },
  "outro": {
    "duration": 5,
    "ctaText": "CALL NOW",
    "ctaColor": "#FF6B00",
    "showLogo": true,
    "showPhone": true,
    "phone": "(555) 000-0000",
    "showWebsite": true,
    "website": "example.com"
  },
  "lowerThirds": {
    "style": "bar",
    "bgColor": "#FF6B00",
    "textColor": "#FFFFFF",
    "position": "bottom-left"
  },
  "captions": {
    "enabled": true,
    "fontColor": "#FFFFFF",
    "strokeColor": "#000000",
    "strokeWidth": 4,
    "fontSize": 48,
    "position": "center"
  },
  "music": {
    "style": "corporate",
    "volume": 0.12
  },
  "voiceover": {
    "source": "file",
    "delayMs": 500
  }
}
```

### Config Behavior

- Pre-populated with sensible defaults when creating a new project
- Can be cloned from a previous project for the same client
- **Source of truth**: The `config` JSON field in the database (`VideoProject.config`)
- Per-client brand assets (logo, watermark, fonts) stored on disk at `pipeline/video/clients/{slug}/`
- At pipeline launch, the orchestrator writes a `config.json` snapshot to the project folder from the DB record — this is a build-time artifact, not an editable source

---

## File Structure

```
pipeline/
└── video/
    ├── clients/                          # Per-client persistent brand assets
    │   └── {client-slug}/
    │       ├── config.json               # Default brand config
    │       ├── logo.png
    │       ├── watermark.png
    │       └── fonts/
    │
    ├── projects/                         # Per-project working directory
    │   └── {project-id}/
    │       ├── config.json               # Project-specific config
    │       ├── footage/                  # Raw clips from client
    │       ├── normalized/               # Converted to H.264
    │       ├── voiceover/                # VO file provided by Vanguard
    │       │   └── voiceover.mp3
    │       ├── music/                    # Generated background music
    │       │   └── bg_music.wav
    │       ├── ae/                       # After Effects project + assets
    │       │   └── project.jsx
    │       ├── output/                   # Final deliverables
    │       │   ├── youtube_long.mp4
    │       │   ├── youtube_short.mp4
    │       │   ├── instagram_reel.mp4
    │       │   └── tiktok.mp4
    │       └── project.log
    │
    ├── scripts/                          # Pipeline Python scripts
    │   ├── normalize.py                  # Step 1: Convert + normalize footage
    │   ├── generate_ae_project.py        # Step 2: Generate AE JSX from config
    │   ├── generate_music.py             # Step 3: Procedural music (mood-based)
    │   ├── mix_audio.py                  # Step 4: Combine VO + music
    │   ├── build_deliverables.py         # Step 5: Render platform variants
    │   ├── run_pipeline.py               # Orchestrator: runs steps 1-5
    │   └── utils/
    │       ├── ffmpeg_helpers.py
    │       ├── config_loader.py
    │       └── logger.py
    │
    └── templates/                        # Reusable AE templates
        ├── intro_fade.jsx
        ├── intro_slide.jsx
        ├── intro_zoom.jsx
        ├── lower_third_bar.jsx
        ├── lower_third_minimal.jsx
        ├── outro_cta.jsx
        └── caption_styles.jsx
```

---

## Pipeline Stages

| Stage | Script | Input | Output | DB Status |
|-------|--------|-------|--------|-----------|
| 1. Normalize | `normalize.py` | `footage/*.mp4` | `normalized/*.mp4` (H.264, standard res) | `NORMALIZING` |
| 2. AE Project | `generate_ae_project.py` | `config.json` + templates | `ae/project.jsx` | `EDITING` |
| 3. Music | `generate_music.py` | `config.music.style` | `music/bg_music.wav` | `EDITING` |
| 4. Mix Audio | `mix_audio.py` | `voiceover/voiceover.mp3` + `music/bg_music.wav` | Mixed audio track | `MIXING` |
| 5. Build | `build_deliverables.py` | AE render + mixed audio | `output/*.mp4` (4 platform variants) | `REVIEW` |

### Orchestrator

```bash
python pipeline/video/scripts/run_pipeline.py --project clxyz123abc
```

- Connects directly to PostgreSQL via `psycopg2` using a `DATABASE_URL` env var (same connection string as Prisma)
- Loads config from the `VideoProject.config` JSON field, writes a `config.json` snapshot to the project folder
- Runs each step sequentially
- Updates `VideoProject.status`, `VideoProject.pipelineLock`, and `VideoDeliverable.status` directly in PostgreSQL after each stage
- On failure: sets `status=FAILED`, writes error to `VideoProject.errorMessage`, clears `pipelineLock`
- Logs all output to `project.log`

### Concurrency Control

- Before launching, the API trigger route checks `VideoProject.pipelineLock`:
  - If non-null and less than 2 hours old → reject with 409 Conflict ("Pipeline already running")
  - If non-null and older than 2 hours → treat as stale lock (crashed process), allow override
- The Python orchestrator sets `pipelineLock = NOW()` on start and clears it on completion or failure
- Pipeline controls in the admin UI disable all stage buttons when `pipelineLock` is set

### Python-to-Database Communication

The Python scripts bypass the Next.js API entirely and write directly to PostgreSQL. This avoids the session-based auth problem (Python has no NextAuth cookie). The `DATABASE_URL` is passed as an environment variable when the API route spawns the child process.

This is safe because:
- The API route has already authenticated the admin user before spawning
- The Python scripts only update the specific `VideoProject` and `VideoDeliverable` rows for the given project ID
- No user-facing input reaches the Python scripts — only the validated project ID

### Platform Output Specs

| Platform | Aspect Ratio | Resolution | Max Duration | Codec |
|----------|-------------|------------|-------------|-------|
| YouTube Long | 16:9 | 1920x1080 | Unlimited | H.264 CRF 18 |
| YouTube Short | 9:16 | 1080x1920 | 60s | H.264 CRF 18 |
| Instagram Reel | 9:16 | 1080x1920 | 90s | H.264 CRF 18 |
| TikTok | 9:16 | 1080x1920 | 60s | H.264 CRF 18 |

---

## Admin UI

### Sidebar Navigation

New entry in `AdminSidebar.tsx` `NAV_ITEMS` array (after Reports, before Team):

```typescript
{ label: "Video", icon: Video, href: "/admin/video", adminOnly: true }
```

### Video Projects List — `/admin/video`

**Metrics row:**

| Card | Filter | Icon | Accent |
|------|--------|------|--------|
| Intake | `status=INTAKE` | `Inbox` | `cyan` |
| In Production | `status IN (NORMALIZING, EDITING, MIXING)` | `Clapperboard` | `amber` |
| In Review | `status=REVIEW` | `Eye` | `purple` |
| Delivered | `status=DELIVERED` | `CheckCircle` | `emerald` |

**Table:** Project name (link), client name, status badge, deliverable count, created date, actions (edit, archive)

**"+ New Video Project" SidePanel form:** Client dropdown, project name, notes. On save: creates DB record, copies client default config, creates project folder structure.

### Video Project Detail — `/admin/video/[id]`

**Header:** Project name + client name + status badge + "Edit Config" button

**Left column:**
- Brand Config card — logo thumbnail, color swatches, intro/outro style labels
- Footage card — uploaded clips with duration + resolution
- Voiceover card — VO file with audio player preview

**Right column:**
- Pipeline Controls card — stage buttons (Normalize, Generate AE, Generate Music, Mix, Build, Run Full). Buttons enabled/disabled based on current status.
- Deliverables card — table of outputs with platform badge, status, file size, download link
- Log card — tail of `project.log`

### Config Editor — `/admin/video/[id]/config`

Tab-based form editor for the JSON config:
- **Brand** — color pickers, font, logo upload, watermark settings
- **Intro/Outro** — style dropdown, duration slider, CTA text, phone/website
- **Lower Thirds** — style, colors, position
- **Captions** — toggle, font settings, stroke
- **Audio** — music style dropdown, volume slider, VO delay

Saves to `VideoProject.config` via `PATCH /api/admin/video/[id]`.

### REVIEW Workflow

After the pipeline completes, status lands at `REVIEW` (set by the final build stage). The admin reviews the deliverables internally. Once satisfied, an "Approve & Deliver" button sets `status=DELIVERED`, making the project visible in the client portal. This two-step gate prevents unreviewed content from reaching clients.

---

## API Routes

### Admin Routes

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/admin/video` | List video projects (with filters) |
| POST | `/api/admin/video` | Create new video project |
| GET | `/api/admin/video/[id]` | Get project detail |
| PATCH | `/api/admin/video/[id]` | Update project (config, status, notes) |
| DELETE | `/api/admin/video/[id]` | Archive/delete project |
| POST | `/api/admin/video/[id]/upload` | Upload footage or VO files (multipart, max 500MB per file) |
| POST | `/api/admin/video/[id]/normalize` | Trigger normalize step |
| POST | `/api/admin/video/[id]/generate-ae` | Trigger AE project generation |
| POST | `/api/admin/video/[id]/generate-music` | Trigger music generation |
| POST | `/api/admin/video/[id]/mix` | Trigger audio mixing |
| POST | `/api/admin/video/[id]/build` | Trigger deliverable builds |
| POST | `/api/admin/video/[id]/run` | Trigger full pipeline |

All admin routes follow existing pattern: rate limit → auth check → ADMIN role check → Prisma query → JSON response. Routes live under `/api/admin/video/` to match the established convention (`/api/admin/clients`, `/api/admin/projects`, etc.).

Pipeline trigger routes:
- Check `pipelineLock` before spawning (409 Conflict if locked)
- Use `child_process.spawn()` (not `exec()`) with an argument array to avoid shell injection and support streaming stdout
- Pass `DATABASE_URL` and project ID as environment variables
- Return immediately with 202 Accepted
- Status updates come from Python writing directly to PostgreSQL

### Upload Route

`POST /api/admin/video/[id]/upload` handles multipart form data:
- Accepts video files (mp4, mov, avi, mkv, webm) and audio files (mp3, wav, aac)
- Max file size: 500MB per file
- `type` field: `"footage"` or `"voiceover"` — determines target directory
- Validates file extension before writing to disk
- Returns file metadata (name, size, duration via ffprobe)

### Portal Routes

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/portal/videos` | List delivered projects for client |
| GET | `/api/portal/videos/[id]` | Get project detail for client |
| GET | `/api/portal/videos/[id]/download/[deliverableId]` | Stream file download |

Portal routes validate `session.user.clientId` matches the project's `clientId`. Download route:
- Validates `session.user.clientId` matches the project's `clientId`
- Looks up `VideoDeliverable.filePath` from the database
- Resolves to an absolute path and verifies it starts with the expected `pipeline/video/projects/` prefix (path traversal protection)
- Streams file with `Content-Disposition: attachment` header
- Never passes user-controllable input directly to `fs.createReadStream`

---

## Client Portal

### Sidebar Navigation

New entry in `PortalSidebar.tsx` `NAV_ITEMS`:

```typescript
{ label: "Videos", icon: Video, href: "/portal/videos" }
```

### Portal Videos Page — `/portal/videos`

- Shows only `DELIVERED` projects for the logged-in client
- Grid of project cards: name, delivery date, deliverable count
- Click through to detail page

### Portal Video Detail — `/portal/videos/[id]`

- Project name + delivery date
- Grid of deliverable cards: platform badge, resolution, duration, file size, download button, preview thumbnail
- Files served through authenticated API route (no public URLs)

---

## Archival & Disk Cleanup

When a project is set to `ARCHIVED`:
- Deliverable files in `output/` are retained (clients may still download)
- Intermediate files (`normalized/`, `ae/`, `music/`) are deleted to reclaim disk space
- Raw footage in `footage/` is deleted (client has the originals)
- The database records remain for historical tracking
- Archived projects are hidden from the default admin list view (filter: `status != ARCHIVED`)

---

## Music Generation

`generate_music.py` uses NumPy-based procedural synthesis (same approach as the gaming pipeline) with mood presets:

| Style | Character | Use Case |
|-------|-----------|----------|
| `corporate` | Clean pad + subtle pulse, major key | Professional services, B2B |
| `upbeat` | Brighter harmonics, faster pulse (130 BPM) | Social media, product launches |
| `ambient` | Deep drone + shimmer, no pulse | Real estate, luxury brands |
| `energetic` | Full layered mix, driving rhythm (140 BPM) | Fitness, automotive, events |

All generated music is royalty-free (procedurally synthesized, no samples). Output: 16-bit PCM WAV at 44.1kHz mono, peak-normalized to 70% headroom.

---

## Isolation Guarantees

1. **Prisma schema**: Additive only — new models + enums, one new relation on `Client`
2. **AdminSidebar**: One line appended to `NAV_ITEMS`
3. **PortalSidebar**: One line appended to `NAV_ITEMS`
4. **All new files**: `app/admin/video/`, `app/api/admin/video/`, `components/admin/video/`, `app/portal/videos/`, `app/api/portal/videos/`, `components/portal/videos/`, `pipeline/video/`
5. **Shared components consumed, not modified**: `MetricCard`, `Badge`, `SidePanel` used as-is
6. **New components scoped**: `VideoStatusBadge`, `PlatformBadge`, etc. in `components/admin/video/`
7. **No existing API routes, layouts, or middleware modified**
8. **Database migration non-destructive**: New tables only

---

## New Files Summary

### App Router Pages
- `app/admin/video/page.tsx` — Video projects list
- `app/admin/video/[id]/page.tsx` — Project detail + pipeline controls
- `app/admin/video/[id]/config/page.tsx` — Config editor
- `app/portal/videos/page.tsx` — Client video list
- `app/portal/videos/[id]/page.tsx` — Client video detail

### API Routes
- `app/api/admin/video/route.ts` — GET (list) + POST (create)
- `app/api/admin/video/[id]/route.ts` — GET + PATCH + DELETE
- `app/api/admin/video/[id]/upload/route.ts` — POST (multipart file upload)
- `app/api/admin/video/[id]/normalize/route.ts` — POST trigger
- `app/api/admin/video/[id]/generate-ae/route.ts` — POST trigger
- `app/api/admin/video/[id]/generate-music/route.ts` — POST trigger
- `app/api/admin/video/[id]/mix/route.ts` — POST trigger
- `app/api/admin/video/[id]/build/route.ts` — POST trigger
- `app/api/admin/video/[id]/run/route.ts` — POST trigger
- `app/api/portal/videos/route.ts` — GET (client list)
- `app/api/portal/videos/[id]/route.ts` — GET (client detail)
- `app/api/portal/videos/[id]/download/[deliverableId]/route.ts` — GET (file stream)

### Components
- `components/admin/video/VideoProjectsClient.tsx`
- `components/admin/video/VideoProjectDetail.tsx`
- `components/admin/video/VideoConfigEditor.tsx`
- `components/admin/video/VideoStatusBadge.tsx`
- `components/admin/video/PlatformBadge.tsx`
- `components/admin/video/PipelineControls.tsx`
- `components/portal/videos/PortalVideosClient.tsx`
- `components/portal/videos/PortalVideoDetail.tsx`

### Pipeline Scripts
- `pipeline/video/scripts/normalize.py`
- `pipeline/video/scripts/generate_ae_project.py`
- `pipeline/video/scripts/generate_music.py`
- `pipeline/video/scripts/mix_audio.py`
- `pipeline/video/scripts/build_deliverables.py`
- `pipeline/video/scripts/run_pipeline.py`
- `pipeline/video/scripts/utils/ffmpeg_helpers.py`
- `pipeline/video/scripts/utils/config_loader.py`
- `pipeline/video/scripts/utils/logger.py`

### AE Templates
- `pipeline/video/templates/intro_fade.jsx`
- `pipeline/video/templates/intro_slide.jsx`
- `pipeline/video/templates/intro_zoom.jsx`
- `pipeline/video/templates/lower_third_bar.jsx`
- `pipeline/video/templates/lower_third_minimal.jsx`
- `pipeline/video/templates/outro_cta.jsx`
- `pipeline/video/templates/caption_styles.jsx`
