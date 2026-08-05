# Job Tracker

A personal job-search and application tracker: search for jobs by location and title, save the ones you like, then track each one through your pipeline — Saved → Submitted → Interview 1–4 → Offer / Rejected.

- **Search** (`/search`) — pulls live listings from the [Adzuna API](https://developer.adzuna.com/) (Canada), with a modern card UI showing title, company, location, salary, and a direct link to the application portal. Falls back to sample data if no API keys are configured.
- **Tracker** (`/tracker`) — a Kanban board of everything you've saved. Drag a card between columns or use the stage dropdown to update where an application stands. Add notes and an applied date per job.

Built with Next.js (App Router) + TypeScript + Tailwind, Prisma + PostgreSQL, and no login system — it's a single-user tool for your own job search.

## Quick start (local dev)

You need a local PostgreSQL database. Two options:

**Docker (recommended on your own machine):**

```bash
docker compose up -d
```

**No Docker?** Point `DATABASE_URL` at any Postgres instance you have (a native install, `prisma dev`, a free Supabase project, etc.).

Then:

```bash
cp .env.example .env      # edit if your DB isn't the default docker-compose one
npm install                # also runs `prisma generate` via postinstall
npx prisma migrate dev --name init
npm run db:seed            # optional: adds sample tracked applications
npm run dev
```

Open http://localhost:3000 — it redirects to `/search`.

Without `ADZUNA_APP_ID` / `ADZUNA_APP_KEY` set, the search page runs in **demo mode** with realistic sample listings so you can try the whole app immediately. To search real jobs, get a free key pair at https://developer.adzuna.com/ and add them to `.env`.

## Environment variables

See `.env.example` for the full list:

- `DATABASE_URL` — Postgres connection string used at runtime.
- `DIRECT_URL` — non-pooled connection string used only for migrations (matters for Supabase's connection pooler; same value as `DATABASE_URL` for local dev).
- `ADZUNA_APP_ID` / `ADZUNA_APP_KEY` — from https://developer.adzuna.com/. Leave blank to run in demo mode.

## Deploying (Vercel + Supabase)

1. Create a free [Supabase](https://supabase.com) project. In Project Settings → Database, copy the **pooled** connection string (port 6543) as `DATABASE_URL` and the **direct** connection string (port 5432) as `DIRECT_URL`.
2. Run migrations against Supabase once before your first deploy: `DATABASE_URL="<direct-url>" npx prisma migrate deploy`.
3. Deploy this repo to [Vercel](https://vercel.com/new). Set `DATABASE_URL`, `DIRECT_URL`, `ADZUNA_APP_ID`, and `ADZUNA_APP_KEY` as project environment variables.

## Project structure

```
prisma/schema.prisma       Application model + Stage enum
prisma/seed.ts             sample tracked applications for local dev
src/app/search/            job search page
src/app/tracker/           Kanban tracker page
src/app/api/jobs/search/   proxies Adzuna (keeps API keys server-side)
src/app/api/tracker/       CRUD for tracked applications
src/lib/adzuna.ts          Adzuna client + demo-mode fallback
src/lib/stages.ts          stage order/labels, single source of truth
src/components/search/     search form, job cards, save button
src/components/tracker/    Kanban board, columns, cards, stage select
```
