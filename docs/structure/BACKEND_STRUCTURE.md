# BACKEND_STRUCTURE.md - Backend, Data, Database, and AI Logic Structure

Read this file before data, API, search, validation, or AI-response logic changes.

## Backend Stack

- Next.js API routes, route handlers, and server actions for backend entry points.
- Prisma ORM for typed database access.
- Neon PostgreSQL for hosted relational data.
- Shared validation modules for tax data, API input, and AI response output.

## Tax Knowledge Data Shape

Each tax knowledge record should follow this schema unless a logged decision changes it:

```ts
type TaxKnowledgeItem = {
  id: string;
  category: "direct-tax" | "indirect-tax";
  actName: string;
  sectionNumber?: string;
  title: string;
  summary: string;
  explanation: string;
  applicability: string[];
  benefitsOrDeductions: string[];
  restrictions: string[];
  examples: string[];
  relatedForms: string[];
  filingProcedure: string[];
  relatedItems: string[];
  sourceReferences: SourceReference[];
  effectiveFrom?: string;
  lastReviewed: string;
  reviewStatus: "verified" | "needs-review" | "outdated" | "draft";
};
```

## Suggested Relational Model Areas

The exact Prisma schema must be decided during Phase 4, but planning should account for:

- Tax knowledge items.
- Source references.
- Forms and procedures.
- Related item links.
- Review status and review history.
- Optional query/chat records only if retention, privacy, and product requirements are approved.

## Data Handling Rules

- Store all tax content as structured data.
- Include review status and source references for every record.
- Clearly mark draft, outdated, or unverified data.
- Never present outdated or draft data as final guidance.
- Keep source metadata reusable by UI, search, and chat logic.
- Keep database credentials in environment variables only.
- Prefer archive or deprecate behavior over destructive deletion for tax records.
- Do not store private user tax details unless a documented product and privacy decision requires it.

## Query Interpretation

The system should identify:

- Tax category.
- Relevant section or concept.
- User type.
- Applicable forms.
- Missing facts.
- Risk level or need for professional review.

## Chat Response Format

Chat answers must use this structure:

1. Short answer.
2. Likely tax category.
3. Applicable section, law, or concept.
4. Applicability conditions.
5. Relevant forms or procedures.
6. Legal tax-saving options, if any.
7. Example or scenario explanation.
8. Caveats and when to consult a professional.
9. Sources or data status.

If the system cannot verify a claim from approved data, it must say:

> This point is not yet verified in the project tax data. Please check official sources or consult a qualified tax professional before acting.

## API Logic

- API routes should validate inputs.
- API routes should return structured response objects, not untyped strings.
- Search and chat endpoints should use shared library functions.
- Error responses should be clear and non-sensitive.
- Server actions and route handlers should share validation and service-layer logic when they perform the same operation.
- Database reads must preserve review status and source metadata in returned tax content.
