# Production Checklist

Based on the Phase 9 Enterprise Validation, the following actions must be taken before the platform can be safely deployed to production end-users.

## Must Complete Before Launch (Critical Blockers)

- [ ] **UI Data Integration**: Connect all scaffolded Next.js page routes (Dashboard, Knowledge Hub, Calculators) to the Prisma Database and real API routes. Remove all mocked responses.
- [ ] **Authentication & Authorization**: Wire NextAuth to actual providers (Google, Email) and implement global route protection via Next.js Middleware.
- [ ] **RBAC Enforcement**: Implement server-side checks to restrict `/admin/*` routes strictly to users with the `ADMIN` or `SUPER_ADMIN` role.
- [ ] **Government Source Access**: Implement `HEADLESS_BROWSER` strategy or proxy rotations to bypass WAF blocks (HTTP 403, Captchas) currently preventing data extraction from major sources (e.g. incometaxindia.gov.in).
- [ ] **Production Database Migration**: Run full Prisma migrations on a production-ready managed PostgreSQL instance (e.g., Supabase, Neon, AWS RDS).
- [ ] **Real AI Provider Integration**: Replace the verified mock/fallback AI provider with production Gemini/OpenAI API keys and validate prompt outputs on real government PDFs/HTML.
- [ ] **API Security**: Add rate-limiting, Zod input validation, and CORS policies to all `/api/*` endpoints.

## Recommended Before Launch

- [ ] **Automated CMS Publishing Workflow**: Build the admin UI for reviewing `ReviewStatus = DRAFT` articles and publishing them directly to the Knowledge Hub.
- [ ] **Caching Layer**: Implement Redis or Next.js ISR (Incremental Static Regeneration) for the Knowledge Hub and Homepage to reduce database load.
- [ ] **Accessibility (WCAG) Verification**: Run automated a11y testing (e.g., axe-core) across all finalized interactive components (forms, calculators).
- [ ] **SEO Automation**: Configure dynamic `sitemap.xml` generation, `robots.txt`, and automated OpenGraph/Twitter card population for published Knowledge Items.
- [ ] **End-to-End Testing**: Implement Cypress or Playwright tests for critical user flows (Login, Calculator usage, Search).

## Optional After Launch (Version 2 Features)

- [ ] **Knowledge Graph**: Implement vector embeddings and semantic relationships between sections, acts, and articles for advanced search capabilities.
- [ ] **AI Chat Assistant**: Fully implement the conversational AI bot using RAG (Retrieval-Augmented Generation) against the generated Knowledge Items.
- [ ] **Personalization Engine**: Tailor the dashboard UI and recommended actions based on the `UserProfile` data.
- [ ] **Notification System**: Build email and in-app alerts for critical compliance deadlines and tax updates.
- [ ] **Analytics Dashboard**: Implement post-launch tracking (e.g., Google Analytics, PostHog) for user engagement metrics.
