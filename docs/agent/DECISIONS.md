# DECISIONS.md - Project Decisions

Read this file before changing architecture, source policy, naming conventions, or major project direction.

## Decision Log

### 2026-05-05 - Jurisdiction

Decision: The default tax jurisdiction is India.

Reason: The product language and direct/indirect tax framing match Indian Income Tax and GST use cases.

### 2026-05-05 - Stack

Decision: The default implementation stack is Next.js full stack with TypeScript.

Reason: It supports frontend pages, API routes, data loading, and modular app structure in one project.

### 2026-05-05 - Documentation Style

Decision: Root `AGENT.md` should remain short and act as a navigation/control file.

Reason: Short navigation reduces unnecessary reading and helps AI agents avoid context overload.

### 2026-05-07 - Folder-Based Documentation

Decision: Detailed project documentation lives under `docs/` in categorized folders.

Reason: Folder-based documentation is easier to navigate, scales better, and reduces hallucination risk by making context boundaries explicit.

### 2026-05-08 - Full Lifecycle Phase System

Decision: The project phase system uses ten phases covering planning, scaffold architecture, UI/UX, database/backend, tax knowledge, AI search/chat, safety/testing, deployment, optimization, and maintenance.

Reason: The original six-phase plan grouped database, deployment, optimization, and maintenance concerns too broadly for a scalable Next.js, Neon, Prisma, GitHub, and Vercel platform.

### 2026-05-12 - Stable Slugs for Tax Knowledge
Decision: Tax knowledge items use a unique, human-readable `slug` for stable URLs instead of database `cuid`.
Reason: `cuid` changes on re-seeds, which breaks bookmarks and shared links. Slugs (e.g., `section-80c`) provide stability and SEO benefits.

### 2026-05-12 - Tax Data Storage
Decision: Tax data is stored in a Neon/PostgreSQL database via Prisma.
Reason: Database storage allows for complex querying, AI search grounding, and easy updates via seeding or an admin UI.

### 2026-05-12 - Search Implementation
Decision: Search is implemented using Prisma's `contains` operator with `insensitive` mode across title, summary, and section fields.
Reason: Sufficient for MVP needs. If complexity grows, we will move to PostgreSQL Full-Text Search or Vector Search (pgvector).

## Pending Decisions
- Exact AI model/provider integration (Currently simulated).
- Admin/content editing interface strategy.
- Privacy and retention policy for user chat/query data.
