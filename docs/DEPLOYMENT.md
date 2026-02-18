# Deployment Guide

## Environment Setup

### Local Development (Mock Data)
```env
# .env.local
USERS_SOURCE=mock
GOALS_SOURCE=mock
NEXT_PUBLIC_AUTH_ENABLED=false
```

No database needed. Uses mock data from `repositories/mocks/`.

### Vercel Production (Prisma Postgres)
```env
# Vercel Environment Variables
USERS_SOURCE=prisma
GOALS_SOURCE=prisma
NEXT_PUBLIC_AUTH_ENABLED=true
DEMO_PASSWORD_KEY=your-secret-key

# Auto-configured by Vercel Prisma Integration:
DB_DATABASE_URL=postgres://...        # Direct connection (migrations)
DB_PRISMA_DATABASE_URL=prisma://...   # Accelerate connection (queries)
```

## Build Commands

| Command | Use Case | What it does |
|---------|----------|--------------|
| `npm run build` | Local / CI | `prisma generate && next build` |
| `npm run build:vercel` | Vercel only | Migrations + seed + build |

## Data Consistency

The seed data (`prisma/seed.js`) matches the mock data (`repositories/mocks/data/users.ts`):

| Email | Name | Role |
|-------|------|------|
| `manager@employee.test` | James Miller | Manager |
| `ic@employee.test` | Sarah Miller | Senior Engineer |
| `david.brown@employee.test` | David Brown | Tech Lead |
| `nia.washington@employee.test` | Nia Washington | Senior SWE |
| `kylie.davies@employee.test` | Kylie Davies | Product Manager |

## Pre-Deployment Checklist

Before pushing to trigger a Vercel build:

### 1. Schema Changes
- [ ] Run `npm run build` locally to verify TypeScript compiles
- [ ] If you changed `prisma/schema.prisma`, the build script will auto-sync with `db push`

### 2. Seed Data Changes
- [ ] If you modified `prisma/seed.js`, ensure it matches `repositories/mocks/data/users.ts`
- [ ] Test seed locally: Set up a local Postgres and run `npx prisma db seed`

### 3. Repository Changes
- [ ] If using Prisma source, ensure `PrismaGoalRepository` and `PrismaUserRepository` are implemented
- [ ] Check that all methods return data matching the mock structure

### 4. Environment Variables
- [ ] Verify `USERS_SOURCE` and `GOALS_SOURCE` are set in Vercel
- [ ] Verify Prisma integration is connected (DB_DATABASE_URL exists)

## Troubleshooting

### "avatarSelector options empty"
The `PrismaGoalRepository.getGoalFilters()` fetches users from DB. If empty:
1. Check if seed ran: Look for "Seed completed" in build logs
2. Verify users exist: Check Prisma Postgres dashboard

### "P3005: Database schema not empty"
The DB already has tables. `db push` handles this automatically.

### "P3019: Provider mismatch"
Migration lock says SQLite but schema says PostgreSQL.
Solution: Delete `prisma/migrations/` and recreate for PostgreSQL.

### "PrismaClientInitializationError on Vercel"
Vercel caches dependencies. The build script uses dynamic import after `prisma generate` to fix this.

## Database Management

### Automatic Stale Data Detection
The build script automatically detects stale seed data by checking if `manager@employee.test` has the expected name (`James Miller`). If stale data is found, the script will:
1. Clear all existing data (respecting foreign key constraints)
2. Re-run the seed script

### Force Re-seed
To manually force a re-seed (e.g., after updating seed data):
1. Add `FORCE_RESEED=true` to Vercel environment variables
2. Trigger a new deployment
3. After successful deployment, remove `FORCE_RESEED` variable

### Reset database on Vercel (manual)
1. Go to Prisma Console > Your database
2. Delete all data or drop database
3. Re-deploy to trigger seed

### View database
```bash
# If you have direct access to DB_DATABASE_URL
npx prisma studio
```

## Architecture

```
┌─────────────────┐     ┌─────────────────┐
│  Local Dev      │     │  Vercel Prod    │
│  (USERS_SOURCE  │     │  (USERS_SOURCE  │
│   = mock)       │     │   = prisma)     │
└────────┬────────┘     └────────┬────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│ MockRepository  │     │ PrismaRepository│
│ (mockDB.ts)     │     │ (Prisma Client) │
└────────┬────────┘     └────────┬────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│ In-memory data  │     │ Prisma Postgres │
│ (users.ts, etc) │     │ (PostgreSQL)    │
└─────────────────┘     └─────────────────┘
```
