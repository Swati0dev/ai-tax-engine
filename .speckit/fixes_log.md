# Solved Queries & Technical Fixes Log

This log records the technical issues, bugs, and queries solved during the development.

## [2026-05-13] Vercel Build Error: Syntax Error in TaxKnowledgeDetail
- **Issue**: The Vercel deployment failed with a "Failed to compile" error.
- **Root Cause**: A missing closing `</div>` tag in `TaxKnowledgeDetail.tsx` during the UI refinement update.
- **Solution**: 
    - Audited the JSX structure.
    - Added the missing `</div>` at line 189.
    - Cleaned up unused imports (`ArrowLeft`, `Link`, etc.) that were causing build warnings.
- **Result**: Local build succeeded (`npm run build`) and Vercel deployment was restored to "Ready" status.

## [2026-05-13] Query: Hero Section Aesthetics
- **Query**: User wanted the hero image to be full-screen with text overlay and sticky background.
- **Solution**: 
    - Modified `PageHero.tsx` to use `sticky top-0` for the image container.
    - Implemented a dark overlay for text contrast.
    - Added `relative z-10 bg-background` to subsequent content areas to create a "scroll-over" effect.

## [2026-05-21] Technical Fixes: Webpack Runtime Error & Gemini API Key on Vercel
- **Issue 1**: Webpack modules runtime TypeError: `__webpack_modules__[moduleId] is not a function` on Next.js 15.5.18.
- **Root Cause 1**: Date object deserialization in `unstable_cache` caused Next.js to crash during dynamic page renders, and importing canvas-confetti directly on SSR pages broke Webpack client chunk evaluation.
- **Solution 1**:
    - Serialized Date objects inside the data-fetching cache function to clean JSON string formats.
    - Added an SSR check/guard using dynamic imports (`dynamic(() => import('canvas-confetti'), { ssr: false })`) to prevent Webpack server/client build conflicts.
- **Issue 2**: Chatbot returned "Please check that GEMINI_API_KEY is active" error on Vercel deployment.
- **Root Cause 2**: `GEMINI_API_KEY` was configured in the local `.env` file but was missing from the Vercel project's environment variables.
- **Solution 2**:
    - Linked the local repository to Vercel via CLI using `npx vercel link --yes`.
    - Added the `GEMINI_API_KEY` environment variable to the Vercel project for both production and preview environments.
    - Triggered a production redeployment via `npx vercel --prod --yes` to rebuild the project with the active key.

