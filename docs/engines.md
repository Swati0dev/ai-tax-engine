# Platform Engines

The AI Tax Engine's core business logic is encapsulated within specific "Engines". These engines are located under `src/engines/` and are invoked by Server Actions (`actions/*.ts`).

## 1. Calculation Engine (`src/engines/calculations/`)
The Calculation Engine handles all quantitative analysis for the user.

- **Capabilities:**
  - Income Tax Calculation (Old vs New Regime comparisons).
  - Advance Tax scheduling and penalty calculations.
  - HRA (House Rent Allowance) exemption processing.
- **Workflow:**
  - Client components pass raw input data to a Server Action.
  - The Server Action uses Zod to validate the payload and maps it using `calculation.mapper.ts`.
  - The mapped input is fed into the engine which executes the mathematical logic.
  - Results are serialized and stored in Prisma (`SavedCalculation`) for historical tracking.

## 2. Compliance Engine (`src/engines/compliance/`)
The Compliance Engine manages tax deadlines and calendar events.

- **Capabilities:**
  - Identifying critical compliance dates based on user profiles (e.g., GST vs ITR deadlines).
  - Calculating late filing penalties.
- **Workflow:**
  - Resolves active events and categorizes them by severity (e.g., Overdue vs Upcoming).
  - Feeds data directly to the `CalendarWidget` and `DueDateTrackerWidget` on the User Dashboard.

## 3. Admin CMS Engine
While primarily driven by standard Server Actions in `actions/admin.ts`, the Admin Engine enforces the platform's editorial workflow.

- **Capabilities:**
  - Enforcing Role-Based Access Control (`requireAdmin`).
  - Handling status transitions for `TaxKnowledgeItem` (`DRAFT` → `NEEDS_REVIEW` → `VERIFIED`).
- **Security:**
  - Prevents non-admin users from executing state mutations.
  - Ensures accurate timestamps (`lastReviewed`) are applied when an admin verifies content.
