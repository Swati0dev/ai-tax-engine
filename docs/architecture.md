# AI Tax Engine Architecture

This document describes the high-level architecture of the AI Tax Engine platform.

## System Overview

The AI Tax Engine is built on the **Next.js 15+ App Router**, utilizing React Server Components (RSC) to strictly separate data authority from client interaction.

```mermaid
graph TD
    Client[Client Browser]
    
    subgraph Next.js App Router
        UI[React Client Components]
        RSC[React Server Components]
        SA[Server Actions]
    end
    
    subgraph Core Engines
        CalcEngine[Calculation Engine]
        CompEngine[Compliance Engine]
        AdminEngine[Admin CMS Engine]
    end
    
    subgraph Data Layer
        Prisma[Prisma ORM]
        DB[(PostgreSQL)]
    end
    
    Client -- Interactions --> UI
    Client -- Page Loads --> RSC
    
    UI -- Mutations --> SA
    RSC -- Reads --> Prisma
    
    SA -- Validated Data --> Core Engines
    Core Engines -- Transactions --> Prisma
    
    Prisma -- Queries --> DB
```

## Client-Server Boundaries

The application enforces a strict separation of concerns to maximize security and performance.

### 1. Server Components (The Authority)
- **Location:** `app/**/*.tsx` (without `"use client"`)
- **Responsibility:** Data fetching, SEO metadata generation, and initial page rendering.
- **Security:** Server Components directly access Prisma ORM and the database, ensuring no sensitive credentials or raw data are ever exposed to the client bundle.

### 2. Client Components (The Interactivity)
- **Location:** `components/**/*.tsx` (with `"use client"`)
- **Responsibility:** Managing local state, handling user interactions (clicks, forms), and rendering animations.
- **Security:** Client components do NOT fetch data directly from databases. They rely on props passed down from Server Components or invoke secure Server Actions for mutations.

### 3. Server Actions (The Gateway)
- **Location:** `actions/*.ts` (with `"use server"`)
- **Responsibility:** Handling form submissions, data mutations, and triggering revalidation (`revalidateTag`).
- **Security:** Every Server Action acts as a secure API endpoint. They enforce Role-Based Access Control (RBAC) via `requireAdmin()` or `auth()` and strictly validate payloads using `Zod`.

## Database Schema Highlights

The database is managed via Prisma. Key models include:
- `User`: Handles authentication via NextAuth.js.
- `TaxKnowledgeItem`: The core entity of the platform's knowledge base. Contains `ReviewStatus` (`DRAFT`, `VERIFIED`) to govern editorial workflows.
- `SavedCalculation`: Stores user-generated tax calculations.
