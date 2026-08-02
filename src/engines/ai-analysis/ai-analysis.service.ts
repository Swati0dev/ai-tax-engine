import { prisma } from "../../../lib/db";
import { AIProvider } from "./providers/ai-provider.interface";
import { GeminiProvider } from "./providers/gemini.provider";
import { MockAIProvider } from "./providers/mock.provider";
import { buildAnalysisPrompt } from "./prompt-builder";

export class AiAnalysisService {
  private provider: AIProvider;

  constructor() {
    if (process.env.GEMINI_API_KEY) {
      console.log("[AiAnalysisService] Initializing with Gemini Provider");
      this.provider = new GeminiProvider();
    } else {
      console.log("[AiAnalysisService] No GEMINI_API_KEY found, falling back to Mock Provider");
      this.provider = new MockAIProvider();
    }
  }

  /**
   * Processes an existing ChangeSet through the AI analysis pipeline.
   */
  public async analyzeChangeSet(changeSetId: string): Promise<Record<string, unknown> | void> {
    console.log(`[AiAnalysisService] Starting analysis for ChangeSet: ${changeSetId}`);
    
    // 1. Fetch ChangeSet and Documents
    const changeSet = await prisma.changeSet.findUnique({
      where: { id: changeSetId },
    });

    if (!changeSet) {
      throw new Error(`ChangeSet not found: ${changeSetId}`);
    }

    if (changeSet.isProcessedByAI) {
      console.log(`[AiAnalysisService] ChangeSet ${changeSetId} is already processed.`);
      return;
    }

    // Fetch new document
    const newDoc = await prisma.canonicalDocument.findUnique({
      where: { id: changeSet.newDocumentId },
    });

    if (!newDoc) {
      throw new Error(`New CanonicalDocument not found: ${changeSet.newDocumentId}`);
    }

    // Fetch old document if exists
    let oldDoc = null;
    if (changeSet.oldDocumentId) {
      oldDoc = await prisma.canonicalDocument.findUnique({
        where: { id: changeSet.oldDocumentId },
      });
    }

    // 2. Build Prompt
    const prompt = buildAnalysisPrompt(
      oldDoc ? oldDoc.content : null,
      newDoc.content,
      JSON.stringify(changeSet.changes, null, 2)
    );

    // 3. Init Analysis Record
    const analysisRecord = await prisma.changeSetAnalysis.upsert({
      where: { changeSetId: changeSet.id },
      create: {
        changeSetId: changeSet.id,
        summary: "",
        impact: "",
        recommendations: "",
        provider: this.provider.name,
        model: this.provider.modelName,
        status: "PROCESSING"
      },
      update: {
        status: "PROCESSING",
        errorMessage: null
      }
    });

    try {
      // 4. Call Provider
      const responseText = await this.provider.analyze(prompt);
      
      const cleanJsonStr = responseText.replace(/```json/g, "").replace(/```/g, "").trim();

      if (cleanJsonStr === "INVALID_LEGAL_CONTENT" || cleanJsonStr.includes("INVALID_LEGAL_CONTENT")) {
        throw new Error("INVALID_LEGAL_CONTENT: Website UI detected.");
      }

      if (cleanJsonStr === "INSUFFICIENT_LEGAL_CONTENT" || cleanJsonStr.includes("INSUFFICIENT_LEGAL_CONTENT")) {
        throw new Error("INSUFFICIENT_LEGAL_CONTENT: Insufficient legal words or entities detected.");
      }

      // Parse JSON from provider
      // Ensure we extract JSON even if there are markdown blocks
      const parsed = JSON.parse(cleanJsonStr);

      // 5. Update Record
      await prisma.changeSetAnalysis.update({
        where: { id: analysisRecord.id },
        data: {
          summary: parsed.summary || "No summary provided",
          impact: parsed.impact || "No impact provided",
          recommendations: parsed.recommendations || "No recommendations provided",
          structuredOutput: parsed.structuredOutput || null,
          status: "COMPLETED"
        }
      });

      // 6. Mark ChangeSet as Processed
      await prisma.changeSet.update({
        where: { id: changeSet.id },
        data: { isProcessedByAI: true }
      });

      console.log(`[AiAnalysisService] Analysis completed for ChangeSet: ${changeSetId}`);
      return parsed;

    } catch (error: unknown) {
      console.error(`[AiAnalysisService] Analysis failed for ChangeSet: ${changeSetId}`, error);
      
      // Update record to FAILED
      await prisma.changeSetAnalysis.update({
        where: { id: analysisRecord.id },
        data: {
          status: "FAILED",
          errorMessage: error instanceof Error ? error.message : "Unknown error"
        }
      });

      throw error;
    }
  }
}
