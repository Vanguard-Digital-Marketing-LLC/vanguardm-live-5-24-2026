# Capsule: db-conventions v1.0

Prisma 7 + Postgres conventions.

## Driver adapter
Prisma 7 uses the `@prisma/adapter-pg` driver-adapter pattern. Client construction goes through the adapter — do **not** rely on the implicit binary engine.

## Migrations
- Local dev DB: `vanguardm_vanguard_dev` (clone of prod).
- Prod DB: `vanguardm_vanguard_app`.
- Apply via `prisma migrate deploy` on the VPS during deploy step 4.
- Never run `migrate dev` against prod.

## Naming
- Tables: snake_case via `@@map`.
- Models: PascalCase singular.
- Foreign keys: `<entity>Id`.

## Auth tables
Owned by `@auth/prisma-adapter` — don't hand-edit. Schema additions go in adjacent models.
