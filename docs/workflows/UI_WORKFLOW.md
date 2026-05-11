# UI_WORKFLOW.md - UI Component Workflow

Read this file before designing reusable UI components or interaction patterns.

## Design System Source of Truth

- **Source of Truth**: All UI work must align with `design-system/MASTER.md`.
- **Reasoning Engine**: Before building, verify the "Pattern + Style + Colors" logic defined in the design system.

## Component Organization

- Put reusable visual components in `components/`.
- Group components by purpose, such as `chat`, `navigation`, `tax-section`, `search`, and `layout`.
- Keep page-only composition in route files.
- Keep business logic in `lib/`, not components.

## Component Rules

- Components should accept typed props.
- Components should have clear empty, loading, error, and disabled states when relevant.
- Components should not hard-code tax claims.
- Components should use shared types for tax data and response structures.

## Interaction Rules

- Buttons must represent clear user actions.
- Cards must have obvious click targets and readable summaries.
- Forms must validate inputs and show useful errors.
- Navigation must support moving between category pages, section detail pages, forms, sources, and chat.

## Visual Consistency

- Keep labels and section names consistent.
- Use review status badges consistently.
- Avoid decorative UI that reduces clarity.
- Prefer dense, organized information layouts for tax assistance workflows.

