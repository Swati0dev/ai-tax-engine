# Implementation Plan — AI-Powered Tax Intelligence Platform Redesign

This document outlines the phased strategy for revamping the UI, structure, features, and databases of the platform.

---

## Phase 1: Design System & Styling (Current)
* **Goal:** Update the global layout, colors, typography, and navigation menu.
* **Colors configuration:** Define the CSS variables inside `app/globals.css` using HSL for `#12344D` (primary), `#F4A300` (secondary), `#00A6A6` (accent), `#F7F9FC` (background), and `#1F2937` (text).
* **Typography configuration:** Update `app/layout.tsx` to load **Sora** (headings) and **Inter** (body) via `next/font/google` and map them to Tailwind font utilities.
* **Sticky Navbar:** Implement a sticky glassmorphic navigation header in `site-header.tsx` linking to all new sections with a mobile hamburger menu.

---

## Phase 2: Homepage Redesign (8 Sections)
* **Goal:** Completely revamp `app/page.tsx` with high-quality visual hierarchy and premium interactive sections.
* **Interactive Elements:**
  * Floating 3D graphics/icons.
  * Search bar connected to the tax API.
  * Interactive AI Chat Preview panel.
  * Direct links to all 8 calculators, 8 tax categories, knowledge guides, and due dates.

---

## Phase 3: Calculators Hub (`/calculators`) & New Calculators
* **Goal:** Implement a dedicated main `/calculators` listing page and create separate routes for all 8 calculators to ensure SEO, scalability, shareability, and clean architecture.
* **Calculator Paths & Logics:**
  * **Income Tax & Old vs New Regime:** `/calculators/income-tax-calculator` (move/adapt existing tool)
  * **80C Planner:** `/calculators/80c-planner` (move/adapt existing tool)
  * **Find My ITR Wizard:** `/calculators/find-my-itr` (move/adapt existing tool)
  * **HRA Calculator:** `/calculators/hra-calculator` (Exempt HRA formula: min of actual HRA received, rent paid minus 10% basic salary, or 40%/50% basic salary).
  * **GST Calculator:** `/calculators/gst-calculator` (Add/subtract GST based on chosen slabs).
  * **TDS Calculator:** `/calculators/tds-calculator` (TDS rates for sections 194C, 194J, 194I, etc.).
  * **Salary Breakdown:** `/calculators/salary-breakdown` (Deduct PF, PT, Gratuity, Tax to find take-home salary).
  * **Advance Tax Calculator:** `/calculators/advance-tax` (June 15, Sept 15, Dec 15, March 15 installments).

---

## Phase 4: Compliance Center (`/compliance`)
* **Goal:** Create a robust compliance timeline and notices guide.
* **Database Integration:** Fetch compliance events (due dates, filing checklists, notice categories) dynamically from Neon Postgres database.
* **Static Fallback:** Implement static files/JSON structures for fast loading, updated via client-side caching.

---

## Phase 5: Knowledge Hub (`/knowledge-hub`)
* **Goal:** Connect the guide content dynamically to the Neon Postgres database.
* **Database & Caching:**
  * Update Prisma schema if needed or map to the existing `TaxKnowledgeItem` table.
  * Seed new detailed Indian tax guides (ITR Types, GST basics, Deductions).
  * Enable client-side caching and dynamic search matching to ensure instant performance.

---

## Phase 6: Ask Tax AI dedicated Page (`/chat`)
* **Goal:** Refactor `/chat` to feel like an AI Operating System.
* **Features:**
  * Left sidebar for chat history (loaded from/saved to `localStorage`).
  * Right panel for AI-generated quick summaries and tax stats.
  * Interactive prompt chips, document upload UI mock, and language selection.

---

## Phase 7: Personal Dashboard (`/dashboard`)
* **Goal:** Design a beautiful fintech dashboard.
* **State Management:** Use `localStorage` to save and display:
  * Total simulated tax savings from calculations.
  * Active compliance checklist items completed.
  * Recent chats and calculator history.
  * Interactive progress trackers.

---

## Phase 8: SaaS Pages & Auth Gateway
* **Goal:** Create Pricing and Login pages to complete the platform's professional SaaS presentation.
* **Pricing (`/pricing`):** Showcase plans with gold accents, plan comparisons, and feature lists.
* **Login (`/login`):** A modern glassmorphic credentials portal.
