# API & Server Actions Specifications

All server-side interactions in the AI Tax Engine run through Next.js Server Actions. We adhere to a strict, project-wide standardized response format to ensure predictable client-side consumption.

## Standardized Response Contract

Every Server Action mutation must wrap its return value in the following TypeScript signature:

```typescript
type ActionResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};
```

**Why this matters:**
- **Predictability:** Clients can safely check `if (result.success)` without relying on unstable `try/catch` wrappers around API calls.
- **Security:** Raw exceptions are caught on the server, preventing stack traces or database schema leaks from reaching the client browser.

## Core Admin APIs (`actions/admin.ts`)

### `createKnowledgeItem`
Creates a new Tax Knowledge Item.
- **Permissions:** `ADMIN`
- **Payload Validation:** `KnowledgeItemSchema` (Zod)
- **Returns:** `{ success: true, data: TaxKnowledgeItem }` on success.

### `updateKnowledgeItemStatus`
Updates the review workflow state of an item.
- **Permissions:** `ADMIN`
- **Logic:** If the status transitions to `VERIFIED`, the system automatically assigns the current server timestamp to `lastReviewed`.
- **Returns:** `{ success: true, data: TaxKnowledgeItem }` on success.

### `deleteKnowledgeItem`
Permanently removes a knowledge item (Note: Slated for Soft-Delete upgrade in Version 2).
- **Permissions:** `ADMIN`
- **Returns:** `{ success: true }` on success.

## Core Tax APIs (`actions/tax.ts`)

### `getKnowledgeItems(category?)`
Fetches verified knowledge items.
- **Cache:** Utilizes `unstable_cache` keyed by `category`, revalidated every 60 seconds or on demand via `revalidateTag('tax-content')`.

### `getKnowledgeItemBySlug(slug)`
Fetches a single verified knowledge article by its unique slug.
- **Returns:** Highly structured data used heavily for route-specific SEO and JSON-LD generation.
