# Phase 6 Implementation Plan: AI Search & Chat Integration

This phase focuses on enabling users to search the tax knowledge base and interact with an AI assistant that provides source-grounded answers.

## User Review Required

> [!IMPORTANT]
> - We will implement a search utility that queries the Prisma database.
> - The Chat interface will be revamped to use real data instead of mock responses.

## Open Questions

- Which AI provider should we prioritize for the Chat orchestration (e.g., OpenAI, Anthropic, or Gemini)?

## Proposed Changes

### Logic [Component]

#### [NEW] [lib/search/tax-search.ts](file:///d:/New%20project/lib/search/tax-search.ts)
- Implement full-text search logic using Prisma's search capabilities or simple `contains` filters.

#### [NEW] [actions/ai-chat.ts](file:///d:/New%20project/actions/ai-chat.ts)
- Create a server action to handle AI chat queries, perform retrieval, and format structured answers.

### Components [Component]

#### [MODIFY] [app/chat/page.tsx](file:///d:/New%20project/app/chat/page.tsx)
- Revamp the chat UI to be more interactive and premium.
- Connect the chat input to the `ai-chat` server action.

#### [NEW] [components/tax-section/SearchBar.tsx](file:///d:/New%20project/components/tax-section/SearchBar.tsx)
- A global search bar component with auto-suggestions.

## Verification Plan

### Manual Verification
- Test search with keywords like "80C" or "GST".
- Ask a tax question in the chat and verify the response is grounded in the seeded database data.
