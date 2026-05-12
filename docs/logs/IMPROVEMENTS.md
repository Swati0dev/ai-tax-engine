# IMPROVEMENTS.md - Self-Improvement and Reflection Log

Read this file after completing meaningful tasks and before recording lessons, better approaches, or self-corrections.

## Purpose

This file helps agents improve the project and their own work over time. It records what was not optimal, what changed, and what should be done better next time.

## Entry Format

```text
[YYYY-MM-DD | hh:mm AM/PM]
Task:
What did not work well:
What was improved:
Better approach discovered:
Lesson learned:
Follow-up:
```

## Entries

```text
[2026-05-05 | 10:00 AM]
Task: Modularized project documentation.
What did not work well: The first AGENT.md was too long and contained detailed phase, frontend, backend, and workflow content in one file.
What was improved: Split detailed content into focused reference files and kept AGENT.md as a short navigation document.
Better approach discovered: Agents should start from AGENT.md and open only the specific reference file needed for the task.
Lesson learned: Modular documentation reduces repeated reading and makes agent behavior easier to control.
Follow-up: Keep future documentation changes in the most specific file rather than expanding AGENT.md.

[2026-05-05 | 10:10 AM]
Task: Standardized task tracking as LOG.md.
What did not work well: A case-only rename from log.md to LOG.md did not appear correctly in the Windows workspace during verification.
What was improved: Recreated LOG.md explicitly and kept references aligned to the uppercase project convention.
Better approach discovered: Avoid relying on case-only renames in Windows or synced folders; recreate the target file when needed.
Lesson learned: Verification should include file listing after rename-like operations.
Follow-up: Keep future documentation references aligned to the actual filename shown in the workspace.

[2026-05-07 | 10:15 AM]
Task: Reorganized documentation into folder-based architecture.
What did not work well: Root-level documentation was becoming crowded, making it harder for agents to choose the right context.
What was improved: Moved detailed documentation into categorized docs folders and kept root AGENT.md as the control file.
Better approach discovered: Split large concepts by agent need: phases, workflows, skills, structure, logs, and rules.
Lesson learned: Folder names can act as context boundaries and reduce unnecessary file reading.
Follow-up: Keep future documentation additions inside the most specific folder.

[2026-05-08 | 04:48 PM]
Task: Validated documentation architecture before implementation.
What did not work well: The six-phase roadmap was too compressed for the stated stack and did not explicitly cover database/backend foundation, deployment, optimization, or full maintenance workflows.
What was improved: Expanded the phase system to ten lifecycle phases and added missing workflow and skill files for research, validation, database, API, deployment, anti-hallucination, UI consistency, database planning, and architecture thinking.
Better approach discovered: Keep phase files outcome-focused and pair each high-risk work type with a workflow plus skill reference instead of adding all instructions to AGENT.md.
Lesson learned: A documentation-first project still needs explicit operational paths for database, API, deployment, and AI safety before coding begins.
Follow-up: Before Phase 2, decide the exact app initialization commands, environment variable list, and whether initial tax data starts in seed files, database records, or a hybrid model.

[2026-05-09 | 09:56 AM]
Task: Implemented and validated Phase 2 project scaffold.
What did not work well: The initial lint command used `next lint`, which opened an interactive setup prompt, and the first production build exposed the Next 15 async dynamic params requirement.
What was improved: Replaced linting with an explicit ESLint CLI config, updated dynamic section routes to await params, and added a scoped npm override to resolve the PostCSS audit advisory without a breaking downgrade.
Better approach discovered: New Next.js projects should define non-interactive lint config during scaffold creation and align dynamic route props with the installed Next version before validation.
Lesson learned: Phase validation should include typecheck, lint, production build, audit, documentation links, and local HTTP smoke checks before requesting approval.
Follow-up: In Phase 3, keep UI work focused on design-system and page-shell quality without adding tax-law content before the source-backed knowledge phase.

[2026-05-09 | 10:55 AM]
Task: Implemented Phase 3 UI/UX System.
What did not work well: Several build failures occurred due to missing imports after full file replacements and missing variants in the initial scaffold's Button component.
What was improved: Refined the Button component to include standard shadcn variants and moved imports to the top of components for better consistency.
Better approach discovered: When performing full file replacements, always cross-check the existing imports in the original file to ensure parity. Standard shadcn components should be fully featured from the start to avoid build breaks during UI development.
Lesson learned: Production builds are the ultimate truth; run them frequently during UI-only phases to catch missing props or imports early.
Follow-up: In Phase 4, ensure the Prisma schema aligns with the `TaxKnowledgeItem` and `SourceReference` types defined in Phase 2.

[2026-05-12 | 10:15 AM]
Task: Completed Phase 9 Optimization and Phase 10 Content Expansion.
What did not work well: The local working directory had several phases worth of changes that hadn't been committed, making the Git history lagged behind the LOG.md progress.
What was improved: Performed a full production build audit, verified all features, and pushed a comprehensive commit for Phases 3-9, followed by Phase 10.1 content expansion.
Better approach discovered: Run `npm run build` before any major Git push to ensure the cumulative changes are still stable. Group commits logically even if the working tree is ahead of the remote.
Lesson learned: Always check `git status` and `git log` alongside `LOG.md` to ensure documentation and version control are synchronized.
Follow-up: For Phase 10.2/10.3, keep documentation sync and schema audits as separate check-steps before final release.
```
