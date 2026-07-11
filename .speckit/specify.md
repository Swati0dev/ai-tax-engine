# Specifications - AI-powered Tax Intelligence Platform

This document defines the requirements, scope, and specifications for the premium, modern AI-powered tax intelligence platform for Indian users.

---

## 🎨 Brand Design & UI Specifications

### Design Aesthetics
* **Visual Style:** SaaS fintech UI, soft 3D elements, glassmorphism cards/navbar, and subtle premium animations.
* **Palette:**
  * **Primary (Deep Navy Blue):** `#12344D` (Trust, finance authority)
  * **Secondary (Warm Gold/Amber):** `#F4A300` (Premium CTA, attention-grabbing)
  * **Accent (Teal AI Tone):** `#00A6A6` (AI highlights, interactive/intelligence state)
  * **Background (Soft White Gray):** `#F7F9FC` (Clean, spacious backdrop)
  * **Text (Charcoal):** `#1F2937` (High readability, professional)
* **Typography:**
  * **Headings:** Sora (Bold, futuristic, professional)
  * **Body:** Inter (Highly readable, SaaS-like)
* **Navbar:** Sticky, semi-transparent background with a blur/glass effect.

---

## 🧭 Page Architecture & Menu Structure

### 1. Global Navigation Menu
* **Home (`/`)**
* **Ask Tax AI (`/chat`)**
* **Direct Tax (`/direct-tax`)**
* **Indirect Tax (`/indirect-tax`)**
* **Calculators (`/calculators`)**
* **Compliance (`/compliance`)**
* **Knowledge Hub (`/knowledge-hub`)**
* **Pricing (`/pricing`)**
* **Login/Profile (`/login`)**
* **Dashboard (`/dashboard`)**

### 2. Homepage (8 Key Sections)
* **Hero Section:** Large intelligent AI assistant visual (orb/avatar), main Sora headline, descriptive sub-heading, quick tax search bar, CTA buttons (Ask Tax AI & Browse Guide), floating financial UI components.
* **Popular Tax Categories:** Grid cards for Income Tax, GST, TDS, Tax Saving, ITR Filing, Business Taxation, Capital Gains, and Advance Tax.
* **Tax Calculator Hub:** Cards with hover animations to access all 8 calculators.
* **AI Tax Assistant Preview:** Visual preview showing a conversational UI, suggested prompts, and tax recommendations.
* **Knowledge Hub:** Quick view of beginner guides, latest updates, and tax-saving strategies.
* **Compliance Center:** Due dates calendar, reminders, and a forms checklist.
* **Trust & Authority:** Verified sources highlight, security indicators, and government references.
* **Call To Action:** Final section prompting users to sign up or ask a question.

### 3. Ask Tax AI Dedicated Page (`/chat`)
* Dedicated chatbot layout with saved chat history in a sidebar.
* Prompt suggestions chips, multilingual toggle (Hinglish, Hindi, English).
* Mock controls to "Upload Document" and AI-generated summary panels.

### 4. Calculators Hub (`/calculators`)
A card-based central index that maps to individual SEO-friendly routes:
* **Income Tax Calculator:** `/calculators/income-tax-calculator`
* **Old vs New Regime Calculator:** Compare both regimes for FY 2024-25.
* **80C Planner:** `/calculators/80c-planner`
* **Find My ITR Wizard:** `/calculators/find-my-itr`
* **HRA Calculator:** `/calculators/hra-calculator` (New)
* **GST Calculator:** `/calculators/gst-calculator` (New)
* **TDS Calculator:** `/calculators/tds-calculator` (New)
* **Salary Breakdown:** `/calculators/salary-breakdown` (New)
* **Advance Tax Calculator:** `/calculators/advance-tax` (New)

### 5. Tax Sections & Info Pages
* **Direct Tax (`/direct-tax`):** Subpages for Income Tax, ITR Types, Deductions, TDS, Capital Gains, Tax Saving, Presumptive Taxation.
* **Indirect Tax (`/indirect-tax`):** Subpages for GST Basics, GST Returns, Input Tax Credit, E-Way Bill, HSN/SAC, GST Calculator.
* **Compliance Center (`/compliance`):** Calendar, checklists, penalties details, and notices guide.
* **Knowledge Hub (`/knowledge-hub`):** Dynamic article list loaded from Neon Postgres (with client-side caching & search optimization).

### 6. Interactive User Context
* **Dashboard (`/dashboard`):** Saved chats, recent calculator history, checklist progression, and live reminders tracked through `localStorage`.
* **Pricing (`/pricing`):** Premium fintech subscription plans.
* **Login (`/login`):** Glassmorphic, modern login gateway.

---

## 🧠 Strategic Additions (Product Audit)
* **Smart Tax Calculation:** Move beyond static forms to guided question flows with conditional logic.
* **Business Registration Recommendation:** Interactive engine for entity types based on risk, liability, and funding.
* **Compliance Tracking:** Highly personalized timeline for GST, ROC, TDS, and ITR.
* **Admin No-Code Rules:** Ability for CAs/Admins to update rules, slabs, and limits without code changes.
