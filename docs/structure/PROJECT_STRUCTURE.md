# PROJECT_STRUCTURE.md - Project Structure

Read this file before creating, moving, or reorganizing project files.

## Documentation Structure

```text
/
  AGENT.md
  docs/
    agent/
      REQUIREMENTS.md
      RULES.md
      DECISIONS.md
    phases/
      PHASES.md
      PHASE_1.md
      PHASE_2.md
      PHASE_3.md
      PHASE_4.md
      PHASE_5.md
      PHASE_6.md
      PHASE_7.md
      PHASE_8.md
      PHASE_9.md
      PHASE_10.md
    workflows/
      PAGE_WORKFLOW.md
      CRUD_WORKFLOW.md
      UI_WORKFLOW.md
      RESEARCH_WORKFLOW.md
      CONTENT_VALIDATION_WORKFLOW.md
      DATABASE_WORKFLOW.md
      API_WORKFLOW.md
      DEPLOYMENT_WORKFLOW.md
    skills/
      RESEARCH_SKILLS.md
      CONTENT_SKILLS.md
      VALIDATION_SKILLS.md
      ANTI_HALLUCINATION_SKILLS.md
      UI_CONSISTENCY_SKILLS.md
      DATABASE_PLANNING_SKILLS.md
      ARCHITECTURE_THINKING_SKILLS.md
    logs/
      LOG.md
      IMPROVEMENTS.md
    structure/
      PROJECT_STRUCTURE.md
      APP_ARCHITECTURE.md
      FRONTEND_STRUCTURE.md
      BACKEND_STRUCTURE.md
```

## Application Structure

```text
/
  app/
    layout.tsx
    page.tsx
    api/
      chat/
        route.ts
      search/
        route.ts
    chat/
      page.tsx
    direct-tax/
      page.tsx
      [section]/
        page.tsx
    indirect-tax/
      page.tsx
      [section]/
        page.tsx
    forms/
      page.tsx
    sources/
      page.tsx
  components/
    chat/
    navigation/
    tax-section/
    search/
    layout/
  data/
    tax/
      direct-tax/
      indirect-tax/
      forms/
      sources/
  lib/
    tax-data/
    search/
    chat/
    validation/
    db/
    ai/
  types/
    tax.ts
  prisma/
    schema.prisma
```

## Module Boundaries

- UI components must not contain tax-law decision logic.
- Tax data loading must not depend on UI components.
- Search must consume normalized data, not raw page components.
- Chat response logic must use tax data and search helpers, not hard-coded page text.
- Validation must be reusable for local checks and future CI.
- Prisma and Neon database access must stay behind backend modules, route handlers, or server actions.
- AI orchestration must not bypass validation, source status, or anti-hallucination rules.
