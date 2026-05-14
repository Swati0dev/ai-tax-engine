# Skill: UI Standards & Aesthetics

This skill defines the visual and interactive standards for the AI Tax Engine project.

## Core Aesthetics
- **Premium Look**: Use glassmorphism (`glass-card`), subtle shadows, and modern typography (Outfit/Inter).
- **Smooth Transitions**: Implement page-level and component-level animations (e.g., `animate-in`, `fade-in`, `slide-in`).
- **Full-Screen Heros**: Use the `PageHero` component with fixed/sticky background images for a parallax effect.

## Component Principles
- **Responsiveness**: All components must be mobile-friendly.
- **Accessibility**: Follow WCAG AA standards.
- **Consistency**: Use existing UI components from `@/components/ui/` and standard HSL tokens from `globals.css`.

## Knowledge Base Standards (The 80C Standard)
- **Detailed Explanation**: Every tax section must have a comprehensive description (Lawful Explanation) that avoids brief summaries.
- **Regime Clarity**: Explicitly highlight whether a deduction/rule applies to the **Old Regime**, **New Regime**, or **Both**.
- **Visual Infographics**: Every knowledge item must include a high-quality visual chart or infographic (rendered using `<Image />`) to simplify complex data.
- **Consistent Layout**: Use the premium layout with expert guide badges and structured lists as seen in Section 80C.

## Implementation Rules
- Always use `tailwind-merge` (`cn`) for class manipulation.
- Ensure high contrast for text overlays on background images.
- Add a "Reading Progress Bar" to content-heavy pages.
