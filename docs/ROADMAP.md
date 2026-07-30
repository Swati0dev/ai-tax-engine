# AI Tax Engine ROADMAP

This document outlines the strategic future enhancements for the AI Tax Engine. These features were deliberately excluded from Version 1 to prioritize shipping a stable, high-performance, and secure core, but the architecture has been explicitly designed to support their seamless introduction in Version 2.

## CMS Version 2 (Enterprise Governance)

The next evolution of the Admin CMS will focus heavily on strict governance and "Four-Eyes" operational compliance.

### 1. Advanced Reviewer Tracking
Currently, the system securely tracks timestamps of reviews. Version 2 will expand the `TaxKnowledgeItem` schema to explicitly enforce tracking of:
- `authorId`: The original creator of the document.
- `reviewerId`: The admin who verified the content (enforcing a rule that `reviewerId !== authorId`).
- `approvedBy`: A potential tertiary role for highly sensitive publishing.
- `revisionNumber` & `publishedVersion`: Maintaining historical records of text modifications over time.

### 2. Soft Delete Methodology
To prevent accidental data loss and maintain historical integrity:
- Transition from Prisma `delete()` to an `update({ deletedAt: now() })` model.
- Articles will transition through states: **Hidden** → **Recoverable**, ensuring editorial mistakes can be undone easily.

### 3. Comprehensive Audit Logs
Introduce a dedicated `SystemAuditLog` model to track all administrative actions.
- **Record Structure:** `[Action Type] | [Admin User] | [Timestamp] | [Target Record ID]`
- **Examples:**
  - *Created*: Admin A
  - *Edited*: Admin B
  - *Verified*: Admin A
  - *Archived*: Admin C

### 4. Optimistic Concurrency
To support scaling the editorial team:
- Implement `updatedAt` concurrency checks or explicit `version` counters in the schema.
- This will prevent data-loss scenarios where two admins edit the same article simultaneously (the second save attempt will be gracefully rejected with a "Data modified by another user" error).

### 5. Media Upload Infrastructure
When file and image uploads become a requirement:
- Media handling will undergo a strict separate security review.
- Infrastructure will leverage dedicated object storage (e.g., AWS S3) rather than application server disks.
