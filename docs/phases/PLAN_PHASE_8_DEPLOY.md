# Phase 8.2 Implementation Plan: Vercel Deployment

This plan covers the steps to take the Tax AI Platform from local production verification to a live URL on Vercel.

## User Review Required

> [!IMPORTANT]
> - You will need to provide the production `DATABASE_URL` for Neon/PostgreSQL.
> - Code must be pushed to a GitHub repository before Vercel can connect to it.

## Proposed Steps

### 1. Code Preparation [Task]
- [ ] Remove any remaining `console.log` or debug code.
- [ ] Ensure `prisma.config.ts` and `lib/db.ts` use `process.env.DATABASE_URL` correctly.
- [ ] Verify `package.json` build scripts.

### 2. GitHub Sync [Manual Task]
- [ ] Initialize git (if not done): `git init`
- [ ] Add all files: `git add .`
- [ ] Commit: `git commit -m "feat: complete phase 7 and ready for phase 8 deployment"`
- [ ] Push to a new GitHub repository.

### 3. Vercel Configuration [Manual Task]
- [ ] Create a new project on Vercel.
- [ ] Import the GitHub repository.
- [ ] **Environment Variables**: Add `DATABASE_URL` (Production Neon URL).
- [ ] **Build Command**: `next build` (Default).
- [ ] **Install Command**: `npm install` (Default).

### 4. Database Migration [Task]
- [ ] Run `npx prisma db push` against the production database to sync the schema.
- [ ] (Optional) Run `npm run seed` to populate initial tax data.

## Verification Plan

### Automated Verification
- Vercel will run a build check on push.
- We will monitor the Vercel Build Logs.

### Manual Verification
- Access the live `.vercel.app` URL.
- Test the Chat functionality with the production database.
- Verify that SSL (HTTPS) is active.
