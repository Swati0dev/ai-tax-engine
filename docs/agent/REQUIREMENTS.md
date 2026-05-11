# REQUIREMENTS.md - Product Requirements

Read this file when defining project scope, user needs, feature behavior, or expected outcomes.

## Project Requirements

The project is a comprehensive Indian tax information and assistance website covering direct taxes and indirect taxes. It helps users understand which tax may apply, which law sections may be relevant, which forms or procedures may be required, and which legal tax-saving options may exist.

## Target Users

- Individuals filing income tax returns.
- Salaried employees, freelancers, professionals, and small business owners.
- GST-registered businesses and users learning GST compliance.
- Students, researchers, and early professionals studying tax concepts.

## Core Objective

Allow users to describe tax problems in natural language and receive structured, accurate, contextual, source-grounded guidance.

The system should help users understand:

- Which tax category may apply.
- Which return, form, section, rule, or provision may be relevant.
- What legal deductions, exemptions, benefits, or tax-saving options may exist.
- What steps are involved in filing, compliance, or resolving a query.
- Which official sources should be checked before action.

## Key Features

- Search and chat interface for natural-language tax questions.
- Structured knowledge pages for Direct Tax and Indirect Tax.
- Organized section pages with explanations, applicability, benefits, examples, forms, procedures, and related topics.
- Interactive navigation between sections, forms, procedures, and related concepts.
- Source-grounded answer generation using defined project tax data.
- Progress tracking through `docs/logs/LOG.md`.
- Reflection and improvement tracking through `docs/logs/IMPROVEMENTS.md`.

## Detailed Requirement Explanation

### Search and Chat Interface

Use cases:

- "Which ITR should I file if I am salaried and have capital gains?"
- "Can I claim deduction under Section 80C?"
- "What GST return should a small business file?"
- "How does input tax credit work?"

Expected behavior:

- Identify likely tax category: Direct Tax, Indirect Tax, or Unknown.
- Identify relevant law sections or concepts from approved project data.
- Explain applicability in simple language.
- Mention related forms, procedures, examples, and legal tax-saving options.
- Include caveats when the answer depends on income type, turnover, registration status, residency, financial year, or changing law.
- Provide source references or clearly say verified data is unavailable.

### Structured Tax Knowledge Pages

Each tax section page must include:

- Section title and number.
- Act or law name.
- Plain-language explanation.
- Applicability.
- Benefits, deductions, exemptions, or restrictions.
- Examples.
- Related forms.
- Filing or compliance procedure.
- Related sections and topics.
- Official source references.
- Last reviewed date and review status.

### Interactive Navigation

Users must be able to:

- Browse by tax category.
- Search by keyword, form, section, topic, or scenario.
- Click a section and view its full explanation.
- Move between related sections, examples, forms, and procedures.
- Return from detail pages to category indexes.

### Safety Boundaries

The system must provide only lawful compliance and legal tax-saving guidance.

The system must not:

- Help users evade tax illegally.
- Suggest hiding income, fabricating invoices, falsifying deductions, or misreporting transactions.
- Claim certainty when facts are incomplete.
- Invent sections, rates, due dates, forms, thresholds, or procedures.
- Present professional legal or tax advice as final authority.
- Use unofficial or unverified content as final authority.

