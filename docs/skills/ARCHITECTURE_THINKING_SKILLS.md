# ARCHITECTURE_THINKING_SKILLS.md - Architecture Thinking Behavior

Read this file before making module, folder, dependency, data-flow, or major implementation decisions.

## Architecture Principles

- Keep `AGENT.md` short and navigational.
- Put detailed guidance in the most specific documentation file.
- Keep UI, tax data, search, chat, validation, and database logic separate.
- Prefer shared typed contracts over implicit string formats.
- Avoid adding abstractions until repeated behavior proves they are useful.

## Decision Checklist

Before changing architecture, confirm:

- Which phase owns the change.
- Which workflow applies.
- Which module owns the behavior.
- Which files or folders are affected.
- Whether the decision should be recorded in `docs/agent/DECISIONS.md`.
- Whether downstream docs need reference updates.

## Scalability Checks

- New content areas should fit existing category and detail-page patterns.
- New APIs should use shared validation and response types.
- New AI behavior should be grounded in tax data and source metadata.
- New database tables should serve a clear product or maintenance need.
