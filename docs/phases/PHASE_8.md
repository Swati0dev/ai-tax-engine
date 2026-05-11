# PHASE_8.md - Deployment and Release

Objective: Release the application through GitHub and Vercel with clear environment, database, and verification steps.

## Phase 8.1 - Repository and Environment Readiness

Tasks:

- Confirm GitHub repository setup.
- Confirm required environment variables for local, preview, and production.
- Ensure secrets are not committed.
- Confirm Prisma and Neon environment behavior.

Deliverables:

- Environment checklist.
- Repository readiness checklist.

## Phase 8.2 - Vercel Deployment

Tasks:

- Connect GitHub to Vercel.
- Configure build, framework, and environment settings.
- Run Prisma migration or deployment-safe database setup as documented.
- Verify preview deployment before production promotion.

Deliverables:

- Working preview deployment.
- Production deployment checklist.

## Phase 8.3 - Release Verification

Tasks:

- Verify core routes, search, chat, source pages, and database reads.
- Verify safety guardrails in deployed environment.
- Confirm no draft content is represented as verified.
- Record deployment issues and follow-ups.

Deliverables:

- Release verification notes.
- Deployment log entry.
