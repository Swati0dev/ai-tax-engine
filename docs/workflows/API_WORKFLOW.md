# API_WORKFLOW.md - API and Server Action Workflow

Read this file before creating or changing Next.js API routes, route handlers, server actions, or backend service modules.

## API Planning

- Define the caller: UI, chat, search, admin flow, deployment task, or validation tool.
- Define request and response types before implementation.
- Identify required validation and authorization assumptions.
- Confirm which backend module owns the logic.
- Avoid duplicating logic between API routes, server actions, and UI components.

## Request Rules

- Validate all user input.
- Treat natural-language tax questions as untrusted input.
- Avoid accepting client-supplied review status as authoritative.
- Keep errors clear but non-sensitive.

## Response Rules

- Return structured response objects.
- Include review status and source status when tax content is returned.
- Include uncertainty fields when facts are missing or data is unverified.
- Do not return raw internal errors, stack traces, secrets, or database details.

## Chat and Search APIs

- Ground responses in approved project data.
- Refuse illegal evasion requests.
- Ask for missing facts only when needed.
- Return related sections, forms, procedures, and sources as structured references.
