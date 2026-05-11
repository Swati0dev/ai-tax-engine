# DESIGN_SYSTEM.md - Visual and UX Guidelines

This document defines the design system for the Tax Assistance Platform to ensure consistency and a premium feel.

## Color Palette

| Token | HSL | HEX (Approx) | Usage | Emotion |
|-------|-----|--------------|-------|---------|
| Primary | `196 64% 24%` | #164E63 | Deep Cyan | Trust, Authority |
| Secondary | `204 100% 97%` | #F0F9FF | Soft Sky | Cleanliness, Space |
| Background | `210 40% 98%` | #F8FAFC | Slate White | Neutral, Calm |
| Accent | `38 92% 50%` | #F59E0B | Amber | Action, Clarity |
| Destructive | `0 84% 60%` | #EF4444 | Red | Error, Alert |

## Typography

- **Headings**: Sans-serif (Inter/Geist), Tight letter spacing, Semi-bold to Bold.
- **Body**: Sans-serif, optimized for readability (line-height 1.6).
- **Tax Code**: Monospace for section numbers (e.g., `Section 80C`).

## UI Patterns

### Cards
- Use `.soft-ui-card` for tax sections and information blocks.
- Border radius: `1rem` (16px).
- Subtle shadow and smooth hover transitions.

### Badges
- **Verified**: Green background, Check icon.
- **Draft/Review**: Yellow background, Info icon.
- **Official Source**: Blue background, External link icon.

### Navigation
- Top navigation for main categories.
- Sidebar for deep tax section hierarchy.
- Breadcrumbs for orientation.

## Accessibility

- Minimum contrast ratio 4.5:1 for body text.
- Focus states must be highly visible (`ring-primary`).
- ARIA labels for all interactive elements.
- Semantic HTML tags (`<main>`, `<nav>`, `<article>`, `<header>`, `<footer>`).
