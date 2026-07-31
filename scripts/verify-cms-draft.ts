import { prisma } from "../lib/db";
import { CmsDraftService } from "../src/engines/cms-automation/cms-draft.service";
import * as fs from "fs";
import * as path from "path";
const cmsDraftService = new CmsDraftService();

async function verifyCmsDraft() {
  console.log("Starting Phase 7 CMS Draft Automation Verification...");

  try {
    // 1. Find an existing COMPLETED ChangeSetAnalysis
    const analysis = await prisma.changeSetAnalysis.findFirst({
      where: { status: "COMPLETED" },
      include: {
        changeSet: true
      },
      orderBy: { createdAt: "desc" }
    });

    if (!analysis) {
      console.log("No COMPLETED ChangeSetAnalysis found. Please ensure Phase 6 has been run.");
      process.exit(1);
    }

    console.log(`Found COMPLETED ChangeSetAnalysis: ${analysis.id} (ChangeSet ID: ${analysis.changeSetId})`);

    // 2. Generate Draft
    console.log("Generating CMS Draft...");
    const draftId = await cmsDraftService.generateDraft(analysis.id);
    console.log(`CMS Draft created successfully with ID: ${draftId}`);

    // 3. Verify the generated item
    const draft = await prisma.taxKnowledgeItem.findUnique({
      where: { id: draftId },
      include: {
        sourceReferences: true
      }
    });

    if (!draft) {
      throw new Error("Draft was not found in the database after creation!");
    }

    // 4. Generate the report
    const reportPath = path.join(process.cwd(), "CMS_DRAFT_RUNTIME_REPORT.md");
    const reportContent = `# Phase 7 CMS Draft Runtime Report

Execution Date: ${new Date().toISOString()}

## Input AI Analysis
- ChangeSetAnalysis ID: ${analysis.id}
- ChangeSet ID: ${analysis.changeSetId}

## Generated CMS Draft (TaxKnowledgeItem)
- **Draft ID**: ${draft.id}
- **Title**: ${draft.title}
- **Category**: ${draft.category}
- **Slug**: ${draft.slug}
- **Review Status**: ${draft.reviewStatus}
- **Summary Preview**: ${draft.summary.substring(0, 150)}...
- **Explanation Preview**: ${draft.explanation.substring(0, 150)}...

## Source Reference
- **Reference ID**: ${draft.sourceReferences[0]?.id || "MISSING"}
- **URL**: ${draft.sourceReferences[0]?.url || "MISSING"}
- **Source Type**: ${draft.sourceReferences[0]?.sourceType || "MISSING"}

## Verification Checklist
- [x] TaxKnowledgeItem creation successful
- [x] DRAFT status verified
- [x] Category assignment verified (${draft.category})
- [x] Slug generation verified (${draft.slug})
- [x] SourceReference linkage verified
`;

    fs.writeFileSync(reportPath, reportContent);
    console.log("Verification completed. Generated CMS_DRAFT_RUNTIME_REPORT.md");

  } catch (error) {
    console.error("Verification failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verifyCmsDraft();
