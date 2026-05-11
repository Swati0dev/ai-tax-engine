# Deployment Checklist - Tax Assistance Platform

This checklist ensures all steps are completed for a successful and safe production release.

## 1. Environment Readiness
- [x] `.env` exists and contains `DATABASE_URL`.
- [ ] Verify `DATABASE_URL` points to the production database (Neon/PostgreSQL).
- [ ] Ensure `NODE_ENV` is set to `production` in the deployment environment.
- [ ] Confirm no local secrets or keys are hardcoded in the codebase.

## 2. Code & Build Quality
- [x] Run `npm run lint` - No errors.
- [x] Run `npm run build` - Build successful.
- [ ] Verify all dynamic routes are correctly configured (Next.js 15 async params).
- [x] Audit for any `console.log` or debug statements that should be removed.

## 3. Database & Content
- [ ] Run `npx prisma db push` (or migration) on the production database.
- [ ] Run `npx tsx prisma/seed.ts` if initial tax data is needed in production.
- [ ] Verify all seeded content has `reviewStatus: 'VERIFIED'`.

## 4. UI/UX & Safety
- [ ] Verify Global Disclosure Bar is visible on all pages.
- [ ] Confirm Disclaimer is present in AI Chat responses.
- [ ] Test Safety Guardrails (Evasion keywords) in the production build.
- [ ] Check responsive design on mobile and desktop.

## 5. Vercel Deployment
- [ ] Connect GitHub repository to Vercel.
- [ ] Add `DATABASE_URL` to Vercel Environment Variables.
- [ ] Trigger deployment and verify logs.
- [ ] Perform a smoke test on the live URL.

## 6. Post-Release
- [ ] Monitor Vercel logs for any runtime errors.
- [ ] Verify analytics or observability (if Phase 9 is partially implemented).
