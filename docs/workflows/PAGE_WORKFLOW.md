# PAGE_WORKFLOW.md - Page and Layout Workflow

Read this file before creating or changing pages and layouts.

## Standard Page Structure

Every page should follow this structure unless a documented design decision says otherwise:

1. Header
2. Navbar
3. Sidebar, if needed
4. Main content area
5. Cards or content sections
6. Footer

## Component Hierarchy

- Route files compose page-level sections.
- Page-level sections compose reusable components.
- Reusable components receive data through props.
- Components must not contain tax-law decision logic.

## Layout Consistency

- Keep navigation labels consistent across pages.
- Use the same spacing and hierarchy patterns for Direct Tax, Indirect Tax, Forms, Sources, and Chat.
- Keep repeated page patterns reusable rather than duplicating layout code.

## Responsive Behavior

- Pages must work on mobile and desktop.
- Navigation must remain accessible on small screens.
- Cards and sections must stack cleanly on narrow viewports.
- Text must not overflow buttons, cards, sidebars, or headings.

## Reusable UI Patterns

- Use section cards for tax topics.
- Use source blocks for official references.
- Use status badges for review state.
- Use related-link groups for connected sections and forms.

