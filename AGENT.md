# AGENT.md - Tax Assistance Platform Control File

This is the required entry point for every AI agent and developer. Keep it short. Use it to decide which deeper file to read, then read only the files needed for the current task.

## Project Snapshot

Build a modular Next.js full-stack website for Indian direct and indirect tax information and assistance. Users describe tax problems in natural language, and the system guides them with structured, lawful, source-grounded information about tax category, applicable sections, forms, procedures, examples, and legal tax-saving options.

This platform is educational and assistive. It does not replace a chartered accountant, tax advocate, government portal, or professional legal opinion.

## Mandatory Startup Flow

1. Start here, at root `AGENT.md`.
2. Read [docs/logs/LOG.md](docs/logs/LOG.md) before starting work.
3. Add a new entry to [docs/logs/LOG.md](docs/logs/LOG.md) before the task.
4. Open only the referenced file needed for the task.
5. Follow [docs/phases/PHASES.md](docs/phases/PHASES.md) before implementation.
6. Update [docs/logs/IMPROVEMENTS.md](docs/logs/IMPROVEMENTS.md) after meaningful work, self-correction, or workflow learning.

## Global Rules

- Do not hallucinate tax laws, sections, rates, thresholds, forms, due dates, penalties, or procedures.
- Do not provide illegal tax evasion guidance.
- Use official or project-approved sources for tax claims.
- **UI UX Pro Max Rule**: Consult `design-system/MASTER.md` before creating or modifying any UI.
- **UI UX Pro Max Rule**: Follow the "Soft UI Evolution" style and adhere to the pre-delivery checklist.
- Keep documentation and code modular.
- Avoid reading unnecessary files.
- Ask a concise question when requirements are unclear and cannot be safely inferred.
- Do not start coding until the relevant planning phase and workflow are clear.

## Documentation Map

### Agent Control

- [docs/agent/REQUIREMENTS.md](docs/agent/REQUIREMENTS.md): Read when defining product scope, users, use cases, or success criteria.
- [docs/agent/RULES.md](docs/agent/RULES.md): Read when unsure about global constraints, legal safety, hallucination prevention, coding standards, or agent behavior.
- [docs/agent/DECISIONS.md](docs/agent/DECISIONS.md): Read before changing architecture, source policy, naming conventions, or major project direction.

### Phases

- [docs/phases/PHASES.md](docs/phases/PHASES.md): Read before planning or implementing phase-based work.
- [docs/phases/PHASE_1.md](docs/phases/PHASE_1.md): Read for foundation and planning tasks.
- [docs/phases/PHASE_2.md](docs/phases/PHASE_2.md): Read before scaffolding the app or confirming App Router architecture.
- [docs/phases/PHASE_3.md](docs/phases/PHASE_3.md): Read before UI/UX system, page shell, or reusable component work.
- [docs/phases/PHASE_4.md](docs/phases/PHASE_4.md): Read before Neon, Prisma, backend, API, or server-action foundation work.
- [docs/phases/PHASE_5.md](docs/phases/PHASE_5.md): Read before building tax knowledge pages, forms, procedures, or related links.
- [docs/phases/PHASE_6.md](docs/phases/PHASE_6.md): Read before AI, search, chat, retrieval, or response grounding work.
- [docs/phases/PHASE_7.md](docs/phases/PHASE_7.md): Read before safety, validation, testing, or quality review work.
- [docs/phases/PHASE_8.md](docs/phases/PHASE_8.md): Read before GitHub, Vercel, Neon environment, or release work.
- [docs/phases/PHASE_9.md](docs/phases/PHASE_9.md): Read before optimization, observability, performance, or quality tuning work.
- [docs/phases/PHASE_10.md](docs/phases/PHASE_10.md): Read before maintenance, periodic review, or content expansion work.

### Workflows

- [docs/workflows/PAGE_WORKFLOW.md](docs/workflows/PAGE_WORKFLOW.md): Read before creating or changing pages and layouts.
- [docs/workflows/CRUD_WORKFLOW.md](docs/workflows/CRUD_WORKFLOW.md): Read before adding or changing features, cards, forms, buttons, data records, or admin-like flows.
- [docs/workflows/UI_WORKFLOW.md](docs/workflows/UI_WORKFLOW.md): Read before designing reusable UI components or interaction patterns.
- [docs/workflows/RESEARCH_WORKFLOW.md](docs/workflows/RESEARCH_WORKFLOW.md): Read before researching tax rules, forms, rates, sections, circulars, or procedures.
- [docs/workflows/CONTENT_VALIDATION_WORKFLOW.md](docs/workflows/CONTENT_VALIDATION_WORKFLOW.md): Read before publishing, editing, or validating tax explanations.
- [docs/workflows/DATABASE_WORKFLOW.md](docs/workflows/DATABASE_WORKFLOW.md): Read before Prisma, Neon, migration, seed, or database-backed tax content work.
- [docs/workflows/API_WORKFLOW.md](docs/workflows/API_WORKFLOW.md): Read before API route, route handler, server action, or backend service work.
- [docs/workflows/DEPLOYMENT_WORKFLOW.md](docs/workflows/DEPLOYMENT_WORKFLOW.md): Read before GitHub, Vercel, environment, preview, or production release work.

### Skills

- [docs/skills/RESEARCH_SKILLS.md](docs/skills/RESEARCH_SKILLS.md): Read before researching tax law, forms, rates, rules, circulars, or official guidance.
- [docs/skills/CONTENT_SKILLS.md](docs/skills/CONTENT_SKILLS.md): Read before writing tax explanations, examples, page content, or chat response copy.
- [docs/skills/VALIDATION_SKILLS.md](docs/skills/VALIDATION_SKILLS.md): Read before verifying generated content, checking consistency, or detecting hallucinations.
- [docs/skills/ANTI_HALLUCINATION_SKILLS.md](docs/skills/ANTI_HALLUCINATION_SKILLS.md): Read before making factual tax claims or handling uncertain tax information.
- [docs/skills/UI_CONSISTENCY_SKILLS.md](docs/skills/UI_CONSISTENCY_SKILLS.md): Read before UI consistency, accessibility, or visual-system decisions.
- [docs/skills/DATABASE_PLANNING_SKILLS.md](docs/skills/DATABASE_PLANNING_SKILLS.md): Read before database schema, entity, source metadata, or lifecycle decisions.
- [docs/skills/ARCHITECTURE_THINKING_SKILLS.md](docs/skills/ARCHITECTURE_THINKING_SKILLS.md): Read before module, folder, dependency, or major implementation decisions.

### Structure

- [docs/structure/PROJECT_STRUCTURE.md](docs/structure/PROJECT_STRUCTURE.md): Read before creating, moving, or reorganizing project files.
- [docs/structure/APP_ARCHITECTURE.md](docs/structure/APP_ARCHITECTURE.md): Read before app scaffold, route ownership, or module boundary changes.
- [docs/structure/FRONTEND_STRUCTURE.md](docs/structure/FRONTEND_STRUCTURE.md): Read before frontend routing, layout, page, or component changes.
- [docs/structure/BACKEND_STRUCTURE.md](docs/structure/BACKEND_STRUCTURE.md): Read before data, API, search, validation, or AI-response logic changes.

### Logs

- [docs/logs/LOG.md](docs/logs/LOG.md): Read and update before tasks; update again after important milestones.
- [docs/logs/IMPROVEMENTS.md](docs/logs/IMPROVEMENTS.md): Read and update after meaningful work, mistakes, unclear structures, or better approaches.

## Current Status

- Current phase: Phase 10.1 (Content Expansion) complete.
- Phase 10.2 (Maintenance & Review) in progress.
- Next step: Audit database schema and sync all documentation for release.



