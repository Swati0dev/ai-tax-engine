"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import { TaxCategory, ReviewStatus } from "@prisma/client";

// Ensure Admin Role
async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized: Admin access required.");
  }
  return session.user;
}

// Zod schemas for validation
const KnowledgeItemSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  category: z.nativeEnum(TaxCategory),
  slug: z.string().min(3),
  reviewStatus: z.nativeEnum(ReviewStatus).default(ReviewStatus.DRAFT),
});

export async function createKnowledgeItem(data: z.infer<typeof KnowledgeItemSchema>) {
  try {
    await requireAdmin();
    const validatedData = KnowledgeItemSchema.parse(data);

    const newItem = await prisma.taxKnowledgeItem.create({
      data: {
        ...validatedData,
        actName: "Unknown", // Required field
        explanation: validatedData.summary, // Defaulting required fields for creation
      },
    });

    revalidateTag("tax-content");
    return { success: true, data: newItem };
  } catch (error: unknown) {
    console.error("[Admin Action] createKnowledgeItem error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to create item" };
  }
}

export async function updateKnowledgeItemStatus(id: string, newStatus: ReviewStatus) {
  try {
    await requireAdmin();

    const updateData: Record<string, unknown> = { reviewStatus: newStatus };

    if (newStatus === ReviewStatus.VERIFIED) {
      updateData.lastReviewed = new Date();
    }

    const updatedItem = await prisma.taxKnowledgeItem.update({
      where: { id },
      data: updateData,
    });

    revalidateTag("tax-content");
    return { success: true, data: updatedItem };
  } catch (error: unknown) {
    console.error("[Admin Action] updateKnowledgeItemStatus error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to update status" };
  }
}

export async function deleteKnowledgeItem(id: string) {
  try {
    await requireAdmin();

    await prisma.taxKnowledgeItem.delete({
      where: { id },
    });

    revalidateTag("tax-content");
    return { success: true };
  } catch (error: unknown) {
    console.error("[Admin Action] deleteKnowledgeItem error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to delete item" };
  }
}

export async function getAdminKnowledgeItems() {
  try {
    await requireAdmin();
    const items = await prisma.taxKnowledgeItem.findMany({
      orderBy: { updatedAt: "desc" },
    });
    return { success: true, data: items };
  } catch (error: unknown) {
    console.error("[Admin Action] getAdminKnowledgeItems error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to fetch items" };
  }
}

export async function crawlCustomTopic(topic: string, sourceUrl?: string) {
  try {
    await requireAdmin();
    console.log(`[Admin Action] Orchestrating manual crawl for topic: ${topic}, url: ${sourceUrl}`);

    if (!sourceUrl) {
      throw new Error("A Source URL is required to initiate a live government crawl.");
    }

    const { regulatoryEngine } = await import('@/src/engines/regulatory-intelligence/regulatory.engine');
    const { AiAnalysisService } = await import('@/src/engines/ai-analysis/ai-analysis.service');
    const { CmsDraftService } = await import('@/src/engines/cms-automation/cms-draft.service');

    await regulatoryEngine.initialize();

    // 1. Register or retrieve the source
    // In a real scenario we'd check if the URL already exists.
    const sourceId = await regulatoryEngine.registerSource({
      name: topic,
      authority: "Admin Manual Crawl",
      url: sourceUrl,
      type: "GOVERNMENT_PORTAL",
      category: "GENERAL",
      enabled: true,
      frequency: "DAILY",
      priority: 1,
      accessStrategy: "HEADLESS_BROWSER",
      parserName: "HTML_CRAWLER"
    });

    // 2. Fetch, Parse, Normalize, and Diff
    // Since it's a manual one-off, we treat it as if there's no previous doc.
    const changeSet = await regulatoryEngine.compareLatest(sourceId, null);
    
    if (!changeSet) {
       throw new Error("Pipeline returned no ChangeSet.");
    }

    // 3. AI Analysis
    const aiAnalysisService = new AiAnalysisService();
    await aiAnalysisService.analyzeChangeSet(changeSet.id);

    // 4. CMS Draft Generation
    // We need the actual analysis ID for generating draft. The analyzeChangeSet saves to DB.
    // Let's fetch it to be sure.
    const analysisRecord = await prisma.changeSetAnalysis.findUnique({
      where: { changeSetId: changeSet.id }
    });
    
    if (!analysisRecord) {
      throw new Error("AI Analysis failed to generate a record.");
    }

    const cmsDraftService = new CmsDraftService();
    const finalDraftId = await cmsDraftService.generateDraft(analysisRecord.id);

    // Return the created item
    const newItem = await prisma.taxKnowledgeItem.findUnique({
      where: { id: finalDraftId }
    });

    revalidateTag("tax-content");
    return { success: true, data: newItem };
  } catch (error: unknown) {
    console.error("[Admin Action] crawlCustomTopic error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to crawl topic using enterprise pipeline" };
  }
}

