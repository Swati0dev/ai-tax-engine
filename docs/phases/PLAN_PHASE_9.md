# Phase 9 Implementation Plan: Optimization & Observability

This phase focuses on making the live application faster, more reliable, and easier to monitor.

## User Review Required

> [!NOTE]
> - We will be adding basic logging to server actions.
> - We will implement caching for frequently accessed tax items.

## Proposed Changes

### Performance Optimization (9.1)
- **Data Caching**: Use Next.js `unstable_cache` or standard React `cache` for database queries in `actions/tax.ts` and `actions/ai-chat.ts`.
- **Image Optimization**: Ensure any images used are using `next/image`.
- **Bundle Review**: Check for large dependencies that can be optimized.

### Search & AI Quality (9.2)
- **Fuzzy Search**: Improve `actions/search.ts` to handle minor typos using PostgreSQL `LIKE` or similar if applicable.
- **Prompt Refinement**: Improve the formatting of AI responses for better readability.

### Observability (9.3)
- **Centralized Logging**: Create `lib/logger.ts` to log important events (e.g., successful searches, safety guardrail triggers, errors).
- **Error Boundaries**: Ensure all major pages have proper React Error Boundaries.

## Verification Plan

### Automated Tests
- Run `npm run build` to ensure no performance regressions.
- Use Lighthouse (via browser tool) to check performance scores.

### Manual Verification
- Test search with typos.
- Verify that logs are generated for specific actions.
