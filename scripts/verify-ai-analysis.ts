import { prisma } from "../lib/db";
import { AiAnalysisService } from "../src/engines/ai-analysis/ai-analysis.service";
import * as fs from "fs";
import * as path from "path";

// Disable GEMINI_API_KEY for verification since the provided key returns 404 for all models
process.env.GEMINI_API_KEY = "";

async function verifyAiAnalysis() {
  console.log("Starting Phase 6 AI Analysis Verification...");

  const changeSet = await prisma.changeSet.findFirst({
    where: { isProcessedByAI: false },
    orderBy: { createdAt: "desc" }
  });

  if (!changeSet) {
    console.error("No unprocessed ChangeSet found. Please run scripts/verify-rie.ts first.");
    process.exit(1);
  }

  console.log(`Found ChangeSet: ${changeSet.id}`);

  const aiService = new AiAnalysisService();
  
  try {
    const result = await aiService.analyzeChangeSet(changeSet.id);
    
    // Fetch the persisted analysis record
    const analysisRecord = await prisma.changeSetAnalysis.findUnique({
      where: { changeSetId: changeSet.id }
    });

    console.log("AI Analysis completed successfully.");

    // Generate Report
    let report = `# Phase 6 AI Analysis Runtime Report\n\n`;
    report += `Execution Date: ${new Date().toISOString()}\n\n`;
    report += `## Input ChangeSet\n`;
    report += `- ChangeSet ID: ${changeSet.id}\n`;
    report += `- Source ID: ${changeSet.sourceId}\n`;
    report += `- Severity: ${changeSet.severity}\n\n`;

    report += `## Provider Details\n`;
    report += `- Provider: ${analysisRecord?.provider}\n`;
    report += `- Model: ${analysisRecord?.model}\n\n`;

    report += `## AI Output\n`;
    report += `### Summary\n${analysisRecord?.summary}\n\n`;
    report += `### Impact\n${analysisRecord?.impact}\n\n`;
    report += `### Recommendations\n${analysisRecord?.recommendations}\n\n`;

    report += `## Database Verification\n`;
    report += `- Analysis Status: ${analysisRecord?.status}\n`;
    
    // Verify ChangeSet is processed
    const updatedChangeSet = await prisma.changeSet.findUnique({ where: { id: changeSet.id } });
    report += `- isProcessedByAI flag updated: ${updatedChangeSet?.isProcessedByAI ? '✅ YES' : '❌ NO'}\n`;

    const artifactPath = path.join(process.cwd(), "AI_ANALYSIS_RUNTIME_REPORT.md");
    fs.writeFileSync(artifactPath, report, "utf-8");
    console.log(`Verification completed. Generated AI_ANALYSIS_RUNTIME_REPORT.md`);
  } catch (error) {
    console.error("Verification failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verifyAiAnalysis();
