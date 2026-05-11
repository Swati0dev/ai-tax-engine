# VALIDATION_SKILLS.md - Validation and Hallucination Checks

Read this file before verifying generated content, checking consistency, or detecting hallucinations.

## Validation Checklist

Check whether the content:

- Matches project requirements.
- Uses the correct tax category.
- References verified project data or official sources.
- Avoids invented sections, forms, rates, thresholds, and due dates.
- Clearly marks uncertainty or missing information.
- Follows the required response or page structure.
- Respects module boundaries.
- Uses consistent terminology.

## Hallucination Detection

Treat content as suspicious if it:

- Mentions a tax section or form not present in verified data.
- Gives exact rates, thresholds, or due dates without a source.
- Claims universal applicability despite missing facts.
- Combines direct tax and indirect tax concepts incorrectly.
- Uses confident language where the data is draft or incomplete.

## Consistency Checks

- Compare page content with structured tax data.
- Compare chat output with source-backed records.
- Compare component behavior with workflow files.
- Compare current task phase with `docs/phases/PHASES.md`.

## Correction Behavior

When a problem is found:

- Correct the content if the verified answer is available.
- Mark the content as needs-review if verification is incomplete.
- Record meaningful issues and better approaches in `docs/logs/IMPROVEMENTS.md`.

