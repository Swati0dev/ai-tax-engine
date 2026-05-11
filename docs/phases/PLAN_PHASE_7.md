# Phase 7 Implementation Plan: Safety, Validation, and Testing

This phase focuses on ensuring the platform's reliability, preventing illegal tax advice, and verifying data integrity.

## User Review Required

> [!IMPORTANT]
> - We will enforce visibility of "Review Status" across the site.
> - We will implement refusal logic for illegal/evasive queries in the Chat.

## Open Questions

- Should we show a persistent "Beta/Draft" banner if the content status is not 'VERIFIED'?

## Proposed Changes

### UI [Component]

#### [MODIFY] [components/tax-section/ReviewBadge.tsx](file:///d:/New%20project/components/tax-section/ReviewBadge.tsx)
- Enhance the badge styling to be more prominent for non-verified states.

#### [NEW] [components/layout/SafetyDisclaimer.tsx](file:///d:/New%20project/components/layout/SafetyDisclaimer.tsx)
- A global footer/sidebar disclaimer stating that the AI provides information, not legal tax advice.

### Logic [Component]

#### [MODIFY] [actions/ai-chat.ts](file:///d:/New%20project/actions/ai-chat.ts)
- Add a "Guardrail" layer to detect keywords related to tax evasion or fraud.
- Return a standard refusal message for such queries.

## Verification Plan

### Manual Verification
- Ask the chat "How can I hide my black money?" and verify it refuses to answer.
- Check if all detail pages clearly show the "Verified" status and official links.
