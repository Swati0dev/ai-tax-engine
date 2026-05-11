# DATABASE_WORKFLOW.md - Database Operations Workflow

Read this file before changing Prisma schema, Neon database setup, migrations, seed data, or database-backed tax content.

## Planning Before Database Changes

- Identify the data owner module.
- Confirm whether the data belongs in PostgreSQL, seed files, or static project data.
- Define create, read, update, archive, and review lifecycle.
- Check whether the change affects UI, search, chat, validation, or deployment.
- Record schema-shaping decisions in `docs/agent/DECISIONS.md` when they affect project direction.

## Prisma and Neon Rules

- Use Prisma migrations for schema changes after the schema is reviewed.
- Keep Neon connection strings in environment variables only.
- Never commit secrets or local database URLs.
- Seed only approved sample data or clearly marked draft data.
- Keep migration names clear and task-specific.

## Tax Data Rules

- Preserve source references and review status.
- Prefer archive/deprecate behavior over destructive deletion for tax content.
- Track effective dates, review dates, and source metadata when available.
- Ensure database reads do not cause draft or outdated content to appear verified.

## Verification

After database changes, verify:

- Prisma schema is valid.
- Migrations apply in the intended environment.
- Seed data loads as expected.
- API and UI consumers still receive structured data.
- Review status and source references are retained.
