# CRUD_WORKFLOW.md - CRUD-Based Development Workflow

Read this file before adding or changing any feature, component, card, button, form, page section, data record, or admin-like flow.

Every UI and data element must be designed using CRUD thinking:

- Create: How the element is added.
- Read: How the element is viewed or consumed.
- Update: How the element is edited, refreshed, or corrected.
- Delete: How the element is removed, archived, hidden, or deprecated.

Not every first release needs visible Create, Update, and Delete controls for end users. Every element still needs a defined lifecycle.

## Universal CRUD Checklist

Before implementing an element, define:

- Element name.
- Owner module.
- Create behavior.
- Read behavior.
- Update behavior.
- Delete or archive behavior.
- Validation rules.
- Source of truth.
- User-facing states.
- Related tests or manual checks.

## Database and Data Behavior

- Create operations must validate required fields before saving.
- Read operations must show review status and source status when tax content is involved.
- Update operations must preserve source history when practical.
- Delete operations should prefer archive/deprecate behavior for tax content that may need historical context.

## API Logic

- APIs must validate input and return structured output.
- APIs must avoid exposing internal errors to users.
- APIs must not allow unverified tax content to appear as verified guidance.

## Frontend Interaction

- Create actions should show confirmation or success state.
- Read views should be scannable and link to related content.
- Update actions should show changed fields and validation feedback.
- Delete actions should require confirmation when data loss is possible.

## Examples

### Tax Section Card

- Create: Add a new structured tax record in `data/tax/`.
- Read: Display title, category, summary, section number, and review status.
- Update: Edit the underlying tax record and refresh related links.
- Delete: Remove, archive, or mark deprecated while preserving source history when needed.

### Chat Message

- Create: User submits a natural-language query.
- Read: User views structured answer, caveats, and sources.
- Update: System asks for missing facts or regenerates after more context.
- Delete: User clears chat history or removes a local message.

### Button

- Create: Add the button only when it maps to a clear user action.
- Read: Label, icon, tooltip, and disabled state must explain availability.
- Update: Change behavior through component props or shared handlers.
- Delete: Remove unused buttons and related dead code together.

