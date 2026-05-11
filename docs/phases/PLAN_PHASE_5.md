# Phase 5 Implementation Plan: Tax Knowledge System

This phase focuses on building dynamic, source-grounded pages for individual tax sections and topics, replacing placeholders with real database data.

## User Review Required

> [!IMPORTANT]
> - We will be replacing `SectionPlaceholder` with a functional `TaxSectionDetail` component.
> - Data for these pages will be fetched using the `getKnowledgeItemById` server action.

## Open Questions

- Do we want a dedicated layout for section pages that includes a sidebar for related sections, or keep it as a clean single-column view?

## Proposed Changes

### Pages [Component]

#### [MODIFY] [direct-tax/[section]/page.tsx](file:///d:/New%20project/app/direct-tax/%5Bsection%5D/page.tsx)
- Fetch the knowledge item using `getKnowledgeItemById` (assuming `section` param maps to the `id` or we filter by `sectionNumber`).
- Replace `SectionPlaceholder` with a new `TaxKnowledgeDetail` component.

#### [NEW] [indirect-tax/[topic]/page.tsx](file:///d:/New%20project/app/indirect-tax/%5Btopic%5D/page.tsx)
- Create a dynamic route for indirect tax topics (e.g., GST sections).

### Components [Component]

#### [NEW] [tax-knowledge-detail.tsx](file:///d:/New%20project/components/tax-section/tax-knowledge-detail.tsx)
- A comprehensive component to display all fields of a `TaxKnowledgeItem`:
    - Full Explanation (Markdown-ready)
    - Applicability list
    - Benefits/Deductions list
    - Restrictions/Conditions
    - Practical Examples
    - Related Forms & Filing Procedures
    - Source References (using existing `SourceBlock`)

#### [NEW] [section-navigation.tsx](file:///d:/New%20project/components/tax-section/section-navigation.tsx)
- Breadcrumbs and navigation for jumping between related tax sections.

### Data [Component]

#### [MODIFY] [tax.ts](file:///d:/New%20project/actions/tax.ts)
- Add `getKnowledgeItemBySection` action if searching by section number is preferred over ID.

## Verification Plan

### Automated Tests
- Build verification to ensure dynamic routes don't break static generation (if used).

### Manual Verification
- Navigate to `/direct-tax/[id]` (e.g., using the ID from the seeded Section 80C record).
- Verify all data fields render correctly with premium "UI UX Pro Max" styling.
- Check responsive layout on mobile.
