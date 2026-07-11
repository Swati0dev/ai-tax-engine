# Wiki & App Operations Log

This file contains a chronological record of all ingest, query, and administrative operations performed on the Tax Engine Knowledge Base.

---

## [2026-06-14] Session End | Initialized Architecture
- Created `gemini.md` operating rules.
- Set up `wiki/` directory and domain folders (`taxation`, `funding`, `compliance`, etc.).
- Set up `filings/` and `raw_sources/` directories.
- Integrated existing Next.js app architecture into the agent's mental model.

## [2026-07-06] Ingest | Taxation & Finance Bill 2026
- Researched Income Tax updates from official portals.
- Ingested New vs Old Regime slab rates for FY 2025-26.
- Ingested Finance Bill 2026 highlights (Income-tax Act 2025, TCS changes).
- Created modular files: `old_vs_new_regime.md` and `finance_bill_2026.md`.
- Updated `taxation/index.md`.

## [2026-07-06] Ingest | Detailed Old Regime & Deductions
- Created `old_tax_regime_slabs.md` with detailed age-based slabs.
- Created `deductions_80c_to_80u.md` covering Section 80C, 80D, 80G, etc.
- Created `salary_and_house_property_exemptions.md` covering HRA and Section 24b.
- Updated indices and cross-links across the taxation domain.

## [2026-07-06] Ingest | Tax Fundamentals
- Restructured Wiki according to the Comprehensive Taxonomy.
- Created `fundamentals.md` detailing Direct vs Indirect tax, GST components, Government levels, and Tax vs Fee/Penalty concepts.

## [2026-07-10] Ingest | Entrepreneur Roadmap
- Created `strategy/entrepreneur_roadmap.md` covering end-to-end compliance for new founders (Registration to ROC).
- Created `strategy/index.md` domain index.

## [2026-07-10] Ingest | Individuals Taxation
- Created `taxation/individuals.md` explaining taxation differences between Salaried employees and Freelancers (Form 16 vs 44ADA).
- Updated indices.

## [2026-07-10] Ingest | Complete GST Guide
- Created `gst/complete_guide.md` detailing registration thresholds, ITC mechanics, composition scheme, and GSTR returns.
- Created `gst/index.md` domain index.

## [2026-07-10] Ingest | TDS and TCS Concepts
- Created `taxation/tds_tcs.md` covering TDS sections (192, 194J, 194C), TCS, and tracking (Form 26AS/AIS).
- Updated taxation index.

## [2026-07-10] Ingest | Business & Company Taxation
- Created `taxation/business_and_company.md` detailing Corporate Tax rates (25%, 22%, 15%), MAT, Dividend Taxation, and Proprietorship vs Company comparison.
- Updated taxation index.

## [2026-07-10] Ingest | Startup Taxation
- Created `taxation/startup_taxation.md` detailing DPIIT Recognition, Section 80-IAC (Tax Holiday), Angel Tax rules, and ESOP tax deferment.
- Updated taxation index.

## [2026-07-10] Ingest | Legal Tax Planning
- Created `strategy/tax_planning.md` detailing HUF benefits, income splitting, claiming business expenses, and a practical consulting case study.
- Updated strategy index.

## [2026-07-10] Ingest | Return Filing Process
- Created `compliance/return_filing.md` detailing ITR forms (ITR-1 to 4), GST return cycle (GSTR-1, 3B), and late filing penalties.
- Created `compliance/index.md` domain index.

## [2026-07-10] Ingest | Practical Case Studies
- Created `filings/case_studies.md` with 3 real-world scenarios: Freelancer (44ADA), Shopkeeper (44AD & GST Composition), and Tech Startup (Angel Tax & DPIIT).
- Created `filings/index.md`.

## [2026-07-10] Ingest | Tax Consultancy Skills
- Created `business-services/consultancy_skills.md` covering Client Onboarding questions, Jargon to Layman translation, highlighting benefits over penalties, and a roleplay example.
- Created `business-services/index.md` domain index.

## [2026-07-11] Architecture Update | Flattened Wiki Structure & Missing Content
- **Refactored Architecture:** Moved all markdown files directly into the root `wiki/` directory to prevent token bloat and simplify agent navigation. Deleted all subdirectories.
- Updated all cross-links across markdown files to match the new flat structure.
- Created Master `wiki/index.md` cataloging all articles.
- Updated `gemini.md` rules to enforce the new flat structure.
- **Created Missing Content:** Added `entity_structure_comparison.md` (Proprietorship vs LLP vs Pvt Ltd) and `government_funding_schemes.md` (Mudra, PMEGP, Stand-Up India, CGTMSE).

## [2026-07-11] Content Optimization | Self-Contained Case Studies
- Distributed the 3 case studies from `case_studies.md` into their respective subject files (`individuals.md`, `business_and_company.md`, and `startup_taxation.md`).
- Deleted `case_studies.md` to ensure every subject file is fully self-contained with its own theory and real-life examples.
- Updated `wiki/index.md` to remove the obsolete link.

## [2026-07-11] Heavy Ingestion | Phase 1: Heads of Income
- Integrated detailed knowledge from the new `taxtaion` PDFs into the wiki.
- **Created `salary_detailed.md`:** Added Sec 15-17 rules, HRA/LTA exemptions, Standard Deduction, and Perquisites valuation.
- **Created `house_property_detailed.md`:** Added Sec 22-27 rules, GAV/NAV calculation, 30% standard deduction, and Sec 24(b) interest limits.
- **Created `pgbp_detailed.md`:** Added Sec 28-44D rules, allowed/disallowed expenses, Sec 40A(3) cash limits, Sec 43B, and Presumptive Taxation (44AD/44ADA).
- **Created `capital_gains.md`:** Added Sec 45-55 rules, STCG vs LTCG definitions, Tax Rates, and Sec 54/54EC/54F exemptions.
- **Created `other_sources.md`:** Added Sec 56-59 rules, Gift Tax provisions (Sec 56(2)(x)), Lottery taxation (Sec 115BB), and allowed deductions (Sec 57).
- Updated `wiki/index.md` to catalog all the new Phase 1 files properly.

## [2026-07-11] Heavy Ingestion | Phase 2: Clubbing, Set-off & Deductions
- **Created `clubbing_of_income.md`:** Added Sec 60-64 rules covering transfers without adequate consideration, minor child income, and revocable transfers.
- **Created `set_off_and_carry_forward.md`:** Added Sec 70-80 rules covering Intra-head and Inter-head adjustments, and carry forward limits (4 vs 8 years).
- **Updated `deductions_80c_to_80u.md`:** Expanded with advanced Chapter VI-A deductions including 80EEA (Housing), 80EEB (EV Loans), 80GGC (Political Donations), and 80QQB/80RRB (Royalties).
- Updated `wiki/index.md` to include Phase 2 files.

## [2026-07-11] Heavy Ingestion | Phase 3: Compliance & Basics
- **Updated `tds_tcs.md`:** Integrated Advance Tax rules (due dates 15 June, Sep, Dec, Mar) and Sec 234B/234C interest penalties.
- **Updated `return_filing.md`:** Integrated Self-Assessment Tax (Sec 140A) and Types of Assessment (143(1) Intimation, 143(3) Scrutiny).
- **Updated `fundamentals.md`:** Added detailed sections on Surcharge (Tax on Tax) and Health & Education Cess (4%).
- All 13 heavy taxation PDFs have now been successfully extracted, summarized, and mapped into the AI Tax Engine Wiki.
