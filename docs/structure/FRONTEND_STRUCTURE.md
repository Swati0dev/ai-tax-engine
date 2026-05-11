# FRONTEND_STRUCTURE.md - Frontend Structure

Read this file before frontend routing, layout, page, or component changes.

## Required Pages

- Home page with search and chat entry point.
- Chat page for natural-language tax questions.
- Direct Tax category page.
- Indirect Tax category page.
- Dynamic tax section detail pages.
- Forms and procedures page.
- Sources and review status page.

## Core Components

- Global navigation.
- Search input.
- Chat input and message list.
- Structured answer display.
- Tax section card.
- Related section links.
- Form/procedure card.
- Source reference block.
- Review status badge.
- Empty, loading, error, disabled, and needs-review states.

## Chat Interface Behavior

- Accept simple natural-language questions.
- Show structured answers in the required backend format.
- Show source status clearly.
- Link to related sections and forms.
- Ask for missing facts only when required, such as financial year, income type, turnover, residency, or GST registration status.
- Refuse illegal evasion requests and redirect to lawful compliance.

## Navigation Flow

- Home -> Chat -> Related Section -> Related Form -> Source.
- Home -> Direct Tax -> Section Detail -> Related Sections.
- Home -> Indirect Tax -> Section Detail -> Procedure.
- Search -> Matching Sections -> Detail Page.

## Design System Notes

- Use Tailwind CSS and shadcn/ui consistently.
- Keep tax guidance pages readable and scannable.
- Use a restrained, professional visual style with minimal finance/tax-related graphics.
- Surface source status and caveats without overwhelming the main explanation.
- Verify responsive behavior before marking UI work complete.
