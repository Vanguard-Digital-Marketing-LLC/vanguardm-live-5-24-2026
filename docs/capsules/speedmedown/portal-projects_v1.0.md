# Capsule: portal-projects v1.0

Browse active/planning/completed deliverables.

## Surface
- List: `app/portal/projects/page.tsx` — cards grid, paginated 12/page.
- Detail: `app/portal/projects/[id]/page.tsx` — task list.

## Card content
Service type (SMA, PPC, WEB, SEO, …), start/due dates, task count via `_count.tasks`.

## Conventions
- **Progress is status-based, not actual task completion.** 50% if active, 100% if completed. Don't compute from task count without a product decision — clients are used to the status-based bar.
- Status filter has 4 options.
- Service type drives badge color (see `portal-settings` capsule for the color map).

## Anti-patterns
- Don't replace the status-based progress with task-completion progress without a UX call — it changes what clients perceive as "progress."
