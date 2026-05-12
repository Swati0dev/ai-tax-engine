# Phase 10.2 Implementation Plan: Audit Fixes & Refinement

This plan addresses the findings from the Phase 10.2 Audit to ensure the project is stable, robust, and feature-complete for release.

## User Review Required

> [!IMPORTANT]
> - **Schema Migration**: We will add a `slug` field to the `TaxKnowledgeItem` model for stable, SEO-friendly URLs. This will require a database migration.
> - **URL Change**: Existing detail pages will move from `/[category]/[id]` to `/[category]/[slug]`.

## Audit Findings & Proposed Changes

### 1. UI Gaps in Tax Detail Page
- **Problem**: `restrictions` and `relatedForms` are not displayed in the `TaxKnowledgeDetail` component.
- **Solution**: Update `TaxKnowledgeDetail.tsx` to include dedicated sections for Restrictions and Required Forms.

### 2. URL Stability & SEO
- **Problem**: Current URLs use the database `cuid`, which changes if the database is re-seeded, breaking bookmarks.
- **Solution**: 
    - [MODIFY] `prisma/schema.prisma`: Add a `slug String @unique` field.
    - [MODIFY] `prisma/seed.ts`: Generate unique slugs for all items (e.g., `section-80c`, `gst-composition`).
    - [MODIFY] `app/direct-tax/[section]/page.tsx` and `app/indirect-tax/[section]/page.tsx`: Update to fetch by `slug` instead of `id`.

### 3. UX Refinement
- **Problem**: `app/forms/page.tsx` contains placeholder text in its empty state.
- **Solution**: Update the `EmptyState` component calls to reflect the current state (Content is available).

### 4. Documentation Sync
- **Problem**: `DECISIONS.md` has stale "Pending" items that have already been implemented.
- **Solution**: Update `DECISIONS.md` to reflect finalized decisions on Search, Data Storage, and Stack.

## Proposed Changes

### Database & Actions
#### [MODIFY] [schema.prisma](file:///d:/ai-tax-engine/prisma/schema.prisma)
- Add `slug String @unique` to `TaxKnowledgeItem`.

#### [MODIFY] [seed.ts](file:///d:/ai-tax-engine/prisma/seed.ts)
- Update all `create` calls to include a unique `slug`.

#### [MODIFY] [tax.ts](file:///d:/ai-tax-engine/actions/tax.ts)
- Update `getKnowledgeItemBySlug` (rename from `getKnowledgeItemById`) to query by `slug`.

### Components & UI
#### [MODIFY] [TaxKnowledgeDetail.tsx](file:///d:/ai-tax-engine/components/tax-section/TaxKnowledgeDetail.tsx)
- Add UI blocks for `restrictions` and `relatedForms`.

#### [MODIFY] [page.tsx](file:///d:/ai-tax-engine/app/forms/page.tsx)
- Update `EmptyState` props.

## Verification Plan

### Automated Tests
- `npx prisma migrate dev` to apply schema changes.
- `npx prisma db seed` to populate slugs.
- `npm run build` to ensure all routes resolve correctly with slugs.

### Manual Verification
- Navigate to a tax section and verify the URL is slug-based.
- Verify that "Restrictions" and "Forms" are now visible on the detail page.
- Check the Forms landing page.
