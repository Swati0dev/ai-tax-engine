# APP_ARCHITECTURE.md - Phase 2 Application Architecture

Read this file before changing the app scaffold, route ownership, or initial module boundaries.

## App Router Route Ownership

- `/`: Home entry point for chat, category browsing, and source status.
- `/chat`: Chat interface shell. Full chat behavior is owned by Phase 6.
- `/direct-tax`: Direct Tax category shell. Tax records are owned by Phase 5.
- `/direct-tax/[section]`: Direct Tax section detail route shell.
- `/indirect-tax`: Indirect Tax and GST category shell. Tax records are owned by Phase 5.
- `/indirect-tax/[section]`: Indirect Tax section detail route shell.
- `/forms`: Forms and procedure shell. Tax records are owned by Phase 5.
- `/sources`: Source and review status shell. Source data display is owned by Phase 7.
- `/api/search`: Route handler boundary for future search behavior.
- `/api/chat`: Route handler boundary for future chat behavior.

## Component Boundaries

- `app/` owns routing and page composition.
- `components/` owns reusable visual components.
- `components/ui/` owns shadcn-compatible primitives.
- `lib/` owns reusable logic and service boundaries.
- `types/` owns shared TypeScript contracts.
- `data/` is reserved for seed or static tax records until the Phase 4 storage decision.

## Server, Client, API, and Server Action Boundaries

- Default to server components for pages and layout.
- Add client components only when interaction requires browser state or events.
- Use route handlers for public API endpoints such as search and chat.
- Use server actions only after a specific form or mutation workflow requires them.
- Do not put tax-law decision logic inside UI components.
- Do not let API placeholders present unavailable data as verified guidance.

## Environment Variable Checklist

- `NEXT_PUBLIC_APP_URL`: Public app URL for local and deployed environments.
- `DATABASE_URL`: Neon PostgreSQL connection string, configured in Phase 4.
- `AI_PROVIDER`: AI provider decision, configured in Phase 6.
- `AI_API_KEY`: AI provider secret, configured in Phase 6.

## Setup Commands

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
```
