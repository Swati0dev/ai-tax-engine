# PHASE_4.md - Database and Backend Foundation

Objective: Establish Neon, Prisma, backend validation, and API/server-action foundations.

## Phase 4.1 - Database Planning

Tasks:

- Define entities for tax knowledge, sources, forms, procedures, reviews, and related links.
- Decide which content lives in the database versus version-controlled seed data.
- Confirm migration and seed strategy.

Deliverables:

- Prisma schema plan.
- Database ownership and lifecycle rules.

## Phase 4.2 - Prisma and Neon Setup

Tasks:

- Configure Prisma ORM.
- Configure Neon PostgreSQL connection variables.
- Add migrations and seed workflow after schema approval.

Deliverables:

- Prisma schema.
- Migration workflow.
- Seed data workflow.

## Phase 4.3 - API and Server Logic Foundation

Tasks:

- Define API routes and server actions.
- Add input validation, structured errors, and shared response types.
- Ensure backend logic never bypasses tax-data review status.

Deliverables:

- Backend service modules.
- Validated API/server-action patterns.
