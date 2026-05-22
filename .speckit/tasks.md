# Task List

Detailed checklist of tasks to implement the Premium AI-Powered Tax Platform redesign.

---

## 🎨 Phase 1: Design System & Root Layout
- [x] Configure new HSL color variables in `app/globals.css` (navy, gold, teal, soft gray background, charcoal text).
- [x] Implement glassmorphism and modern visual utilities in `app/globals.css`.
- [x] Replace `Outfit` with `Sora` headings and configure `Inter` body in `app/layout.tsx`.
- [x] Update `tailwind.config.ts` to map `heading` font to `var(--font-sora)`.
- [x] Revamp `site-header.tsx` with sticky blur effect and new menu list (with mobile navbar drawer).
- [x] Revamp `site-footer.tsx` with multi-column links and newsletter mock.

## 🏠 Phase 2: Homepage Redesign (8 Sections)
- [x] Rewrite `app/page.tsx` with clean tailwind sections.
- [x] Section 1: Hero area with AI orb, search, Sora headings, and glass CTAs.
- [x] Section 2: Popular Tax Categories grid.
- [x] Section 3: Tax Calculator Hub cards linking to individual calculator routes.
- [x] Section 4: AI Tax Assistant Conversational UI Demo.
- [x] Section 5: Knowledge Hub overview.
- [x] Section 6: Compliance Center timeline card.
- [x] Section 7: Trust & Security credentials.
- [x] Section 8: Final CTA banner.

## 🧮 Phase 3: Calculators Hub & New Calculators
- [x] Create `/calculators` listing page: `app/calculators/page.tsx`.
- [x] Migrate/adapt existing calculators:
  - [x] Move/Update Income Tax to `/calculators/income-tax-calculator`.
  - [x] Move/Update 80C Planner to `/calculators/80c-planner`.
  - [x] Move/Update ITR Finder to `/calculators/find-my-itr`.
- [x] Create HRA Calculator page: `app/calculators/hra-calculator/page.tsx`.
- [x] Create GST Calculator page: `app/calculators/gst-calculator/page.tsx`.
- [x] Create TDS Calculator page: `app/calculators/tds-calculator/page.tsx`.
- [x] Create Salary Breakdown Calculator page: `app/calculators/salary-breakdown/page.tsx`.
- [x] Create Advance Tax Calculator page: `app/calculators/advance-tax/page.tsx`.

## 📆 Phase 4: Compliance Center
- [x] Create Compliance page: `app/compliance/page.tsx`.
- [x] Implement interactive timeline of tax due dates.
- [x] Implement interactive checklist and penalty calculator.
- [x] Connect content to Neon Postgres DB with static fallbacks.

## 📚 Phase 5: Knowledge Hub
- [x] Create Knowledge Hub index page: `app/knowledge-hub/page.tsx`.
- [x] Implement tag filtering and dynamic search.
- [x] Connect sections dynamically to database using existing schema.

## 💬 Phase 6: Ask Tax AI dedicated Page
- [ ] Rewrite `app/chat/page.tsx` into a full-screen app.
- [ ] Implement left sidebar for chat history (stored in `localStorage`).
- [ ] Implement right sidebar for instant tax summaries/stats.
- [ ] Add quick-prompt suggestion chips, upload files UI, and language selector.

## 📊 Phase 7: Personal Dashboard
- [ ] Create Dashboard page: `app/dashboard/page.tsx`.
- [ ] Bind metrics (saved tax, complete checklist, recent tools) to `localStorage` sync.
- [ ] Implement modern glass charts and checklist trackers.

## 💼 Phase 8: SaaS Pages
- [ ] Create Pricing page: `app/pricing/page.tsx`.
- [ ] Create Login page: `app/login/page.tsx`.

## 🧪 Phase 9: Verification
- [ ] Run `npm run build` to verify Next.js builds successfully.
- [ ] Verify responsiveness of all routes on mobile viewports.
- [ ] Test calculations for HRA, GST, TDS, Salary, and Advance Tax.
