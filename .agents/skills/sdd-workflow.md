# Skill: Spec-Driven Development Workflow

This skill provides instructions on how to manage the lifecycle of a feature using Spec-Kit standards.

## Workflow Phases

### 1. Understand & Comprehend (New Protocol)
- Analyze the user request.
- Explain the task in your own words.
- **STOP**: Wait for user approval before proceeding to any technical design or code changes.
- Ensure all Knowledge Base additions follow "The 80C Standard" (Detailed text + Infographics).

### 2. Specify (Requirement Capture)
- Read or update `.speckit/specify.md`.
- Ensure requirements are clear and source-grounded.
- Update the version or timestamp in the spec.

### 3. Plan (Technical Design)
- Based on the spec, update `.speckit/plan.md`.
- Group changes by components.
- Outline the technical strategy and dependencies.

### 3. Task (Actionable Breakdown)
- Break the plan into granular items in `.speckit/tasks.md`.
- Mark completed items with `[x]` and in-progress with `[/]`.

### 4. Implement (Execution)
- Execute the tasks one by one.
- Verify each task before moving to the next.
- Update `tasks.md` after each successful implementation.

## Agent Instructions
- Always reference the `.speckit` folder as the source of truth for "What" and "How".
- **Append Only for Logs**: When updating `fixes_log.md` or `WALKTHROUGH.md`, always append new entries at the bottom. Do not overwrite or delete previous history.
- Do not deviate from the approved plan without updating it first.
