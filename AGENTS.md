<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Mahaproperti v2 — Project Guide

## Package Manager

Use **bun** for all commands (the `packageManager` field is `bun@1.3.12`).

| Task        | Command               |
| ----------- | --------------------- |
| Install     | `bun install`         |
| Dev         | `bun run dev`         |
| Build       | `bun run build`       |
| Lint        | `bun run lint`        |
| Typecheck   | `bun run typecheck`   |
| Format      | `bun run format`      |
| DB generate | `bun run db:generate` |
| DB push     | `bun run db:push`     |
| DB migrate  | `bun run db:migrate`  |
| DB studio   | `bun run db:studio`   |

Do NOT commit `bun.lock` is fine; `node_modules`, `.next`, and `.env*` are gitignored.

## Tech Stack

- Next.js 16 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4 (`@tailwindcss/postcss`, no `tailwind.config.js`)
- Drizzle ORM + Neon PostgreSQL (`@neondatabase/serverless`)
- Better Auth (`better-auth`, Better Auth API route at `src/app/api/auth/[...all]/route.ts`)
- Zod v4 for validation
- Radix UI primitives + custom shadcn-style components in `src/components/shared`
- `motion` package for animations

## Architecture

```
src/
  app/
    (customer)/  landing, search, detail, kpr, berita, auth
    (admin)/     CMS — all modules
    (dashboard)/ user dashboard
    api/         route handlers + better-auth catch-all
  components/
    layout/      Container, Section, Grid, Stack, Cluster, SidebarLayout, ...
    shared/      ui primitives (Button, Card, Badge, Select, ...)
    property/    cards, gallery, filters, calculator, contact
    homepage/    hero, categories, sections
  lib/
    db/          schema/, queries/ (DAL), actions/ (server actions)
    validations/ zod schemas
    auth.ts, auth-client.ts, utils.ts, constants.ts
  types/         shared TS types
```

Conventions:

- One global container system: always use `Container` from `@/components/layout`.
- No duplicated layout logic — use the layout primitives.
- Server Components by default; only mark `"use client"` when needed (interactivity).
- All DB access goes through `src/lib/db/queries/*` (reads) and `src/lib/actions/*` (writes, `"use server"`).
- Never query the DB directly inside route handlers/pages — use the DAL/actions.
- Prefer Server Actions for mutations; use Route Handlers under `src/app/api/*` only for external/explicit APIs (Better Auth, Meilisearch later, etc.).

## Brand

One design system, one spacing system, one layout system. Premium, spacious, clean, minimal, corporate.
Three-dot motif `● ● ●` in logo/branding.

## Environment

`.env.local` holds `DATABASE_URL` (Neon), `BETTER_AUTH_SECRET`, `NEXT_PUBLIC_APP_URL`.
Run `bun run db:push` after schema changes. Seed with `bun run db:seed` (entry `src/lib/db/seed.ts`).
