# RULES.md - Global Agent Rules

Read this file when unsure about constraints, hallucination prevention, safety, naming, coding standards, or legal boundaries.

## Agent Intelligence Rules

- Always start from root `AGENT.md`.
- Do not load reference files that are not needed for the task.
- Read `docs/logs/LOG.md` before starting task work.
- Update `docs/logs/LOG.md` before performing the task.
- Follow phases and sub-phases in `docs/phases/PHASES.md`.
- Use the relevant workflow file before adding or changing UI, data, pages, or components.
- Update `docs/logs/IMPROVEMENTS.md` after meaningful task completion or self-correction.
- Ask questions only when requirements are unclear and cannot be safely inferred.

## Anti-Hallucination Rules

- Do not invent tax law, sections, rates, thresholds, forms, due dates, penalties, or procedures.
- Use approved project data or official sources for tax claims.
- If information is missing, conflicting, or outdated, say so.
- Mark unverified tax content as draft or needs-review.
- Do not convert unofficial summaries into final legal guidance.

## Legal and Safety Boundaries

The system may explain lawful compliance and legal tax-saving options.

The system must not:

- Help users evade tax illegally.
- Suggest hiding income, fake invoices, false deductions, or misreporting.
- Guarantee tax outcomes.
- Replace professional advice.
- Encourage non-compliance.

For illegal evasion requests, refuse that part and redirect to lawful compliance, correction, disclosure, or professional consultation.

## Coding Standards

- Use TypeScript for application code.
- Keep modules independent and reusable.
- Prefer explicit types for tax data and AI response structures.
- Avoid duplicating tax logic across UI and backend.
- Keep names consistent with existing module and file conventions.
- Do not remove user work without explicit permission.

## Approved Source Categories

Prefer official sources, including:

- Income Tax Department e-Filing portal.
- Income Tax Department forms and instructions.
- Central Board of Direct Taxes resources.
- GST portal.
- Central Board of Indirect Taxes and Customs resources.
- Official acts, rules, circulars, notifications, and government help pages.

Unofficial blogs, videos, and summaries may be used only for orientation and must not be treated as final authority.

