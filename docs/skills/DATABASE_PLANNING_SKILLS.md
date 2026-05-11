# DATABASE_PLANNING_SKILLS.md - Database Planning Behavior

Read this file before designing or changing database-backed behavior.

## Planning Principles

- Model tax knowledge as structured, source-backed records.
- Preserve review status, source metadata, and effective dates.
- Design data for UI, search, chat, validation, and maintenance reuse.
- Prefer explicit relationships over duplicated free-text references.
- Avoid destructive deletion for tax content unless a decision explicitly allows it.

## Entity Planning

Consider whether the feature needs entities for:

- Tax knowledge items.
- Source references.
- Forms and procedures.
- Related sections or topics.
- Review history.
- Chat/query records, if retention is approved.

## Risk Checks

- Do not store secrets or private user tax details unnecessarily.
- Do not make user-submitted tax facts part of training or public content.
- Do not let client input set verification status.
- Confirm migrations and seed data before deployment.
