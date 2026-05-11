# DEPLOYMENT_WORKFLOW.md - Deployment Workflow

Read this file before configuring GitHub, Vercel, Neon, environment variables, preview deployments, or production releases.

## Pre-Deployment Checklist

- Confirm the current phase allows deployment work.
- Confirm required environment variables are documented.
- Confirm secrets are not committed.
- Confirm database migration and seed strategy.
- Confirm tests and manual checks have been run or explicitly skipped with reason.

## GitHub and Vercel Flow

1. Push source changes through GitHub.
2. Use Vercel preview deployment for verification.
3. Configure Vercel environment variables for preview and production.
4. Confirm Neon database target for each environment.
5. Promote to production only after preview verification.

## Release Verification

Verify:

- Home, chat, Direct Tax, Indirect Tax, forms, and sources routes.
- Search and chat behavior.
- Source references and review status.
- Refusal behavior for illegal evasion requests.
- Database reads and API responses.
- Responsive layout on mobile and desktop.

## Release Logging

Record deployment activity in `docs/logs/LOG.md`.

Record meaningful release issues, workflow improvements, or follow-up changes in `docs/logs/IMPROVEMENTS.md`.
