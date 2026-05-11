# PHASE_7.md - Safety, Validation, and Testing

Objective: Prevent hallucinations, enforce lawful boundaries, and verify the platform before release.

## Phase 7.1 - Source Verification

Tasks:

- Add source display for all tax records.
- Mark records by review status.
- Add source and review status pages or sections.
- Ensure draft or outdated content is never presented as final guidance.

Deliverables:

- Source references visible in UI.
- Review status labels.
- Validation checks for required source metadata.

## Phase 7.2 - Compliance Guardrails

Tasks:

- Add refusal behavior for illegal evasion requests.
- Add professional advice boundary disclaimers.
- Add uncertainty messaging for incomplete facts.
- Add safe redirects toward lawful compliance, correction, disclosure, or consultation.

Deliverables:

- Guardrail logic.
- User-facing safety messages.
- Evasion-request test cases.

## Phase 7.3 - Automated and Manual Testing

Tasks:

- Test data validation.
- Test database operations and API responses.
- Test search behavior.
- Test chat response structure and source grounding.
- Test navigation across categories, sections, forms, and sources.
- Test responsive UI and accessibility basics.

Deliverables:

- Automated tests where practical.
- Manual acceptance checklist.
- Known limitations documented before deployment.
