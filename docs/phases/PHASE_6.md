# PHASE_6.md - AI Search and Chat Integration

Objective: Allow users to search and ask natural-language tax questions while grounding responses in reviewed project data.

## Phase 6.1 - Search Module

Tasks:

- Implement keyword, category, section, form, and topic search over normalized tax knowledge.
- Support result ranking without hiding review status.
- Keep search utilities reusable by UI and chat.

Deliverables:

- Reusable search utility.
- Search UI.
- Search result acceptance checks.

## Phase 6.2 - Chat Interface

Tasks:

- Build chat page and chat input.
- Display structured answers using the required response format.
- Link to related sections, forms, procedures, and sources.

Deliverables:

- Chat UI.
- Structured answer display.
- Related reference links.

## Phase 6.3 - AI Orchestration and Grounding

Tasks:

- Define model/provider integration after decision approval.
- Implement query interpretation and retrieval-grounded answer generation.
- Add fallback behavior for missing, conflicting, draft, or outdated data.

Deliverables:

- AI orchestration module.
- Safety and uncertainty handling.
- Provider decision logged in `docs/agent/DECISIONS.md`.
