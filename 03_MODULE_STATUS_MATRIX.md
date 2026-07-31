# Phase 9.1 — Module Status Matrix

Based on runtime evidence and deep code inspection, this matrix represents the actual implementation status of the platform modules.

| Module | Status | Evidence | Production Blocker? |
| :--- | :--- | :--- | :--- |
| **Homepage** | ✅ Working | `app/page.tsx` fetches `getKnowledgeItems()` | No |
| **Knowledge Hub** | ✅ Working | Dynamic routing `[category]/[slug]` calls Prisma `findUnique` | No |
| **Search API** | ✅ Working | `app/api/search/route.ts` executes Prisma `contains` query | No |
| **Calculators** | ✅ Working | Math models in `lib/tax-calculations.ts` execute dynamically | No |
| **Dashboard** | ✅ Working | `dashboard.service.ts` fetches from 8 Prisma models | No |
| **Authentication** | ✅ Working | `auth.ts` uses PrismaAdapter. `middleware.ts` guards routes | No |
| **RBAC Security** | ⚠ Partial | Enums exist, but `/admin/*` lacks explicit role checks | Yes |
| **Parse Doc API** | ✅ Working | `app/api/parse-document/route.ts` parses PDFs in memory | No |
| **Tax API** | ✅ Working | Returns JSON array of `TaxKnowledgeItem` | No |
| **Chat API** | ❌ Broken | Hardcoded 501 `not-ready` | No (Phase scoped out) |
| **CMS Draft Gen** | ✅ Working | `ReviewStatus.DRAFT` is successfully seeded by AI output | No |
| **RIE Orchestration**| ✅ Working | `scheduler.service.ts` correctly pipelines all jobs | No |
| **Gov Sources** | ⚠ Partial | Hardened WAF strategies trap errors, but HTTP fetch fails | Yes |
| **Routing** | ✅ Working | Next.js App Router correctly maps all routes | No |
| **Navigation** | ✅ Working | Breadcrumbs use `usePathname()` | No |
| **Database** | ✅ Working | Prisma schema perfectly matches execution | No |

## Summary of Matrix
- ✅ **Fully Working**: 13 Modules
- ⚠ **Partial Implementation**: 2 Modules
- ❌ **Broken/Unimplemented**: 1 Module (Chat - Out of Scope)
