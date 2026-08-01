"use server";

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
    // Simulate web crawling and AI parsing delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newItem = await prisma.taxKnowledgeItem.upsert({
      where: { slug },
      update: {},
      create: {
        category: 'GENERAL',
        actName: 'Income Tax Act / GST Act',
        sectionNumber: 'Auto-Crawled',
        title: `Complete Guide to ${topic}`,
        summary: `This is an AI-crawled draft regarding ${topic}. Please review the details carefully before publishing.`,
        explanation: `Based on the crawler's analysis of ${sourceUrl || 'official government portals'}, the topic of "${topic}" involves several critical compliance requirements. The AI engine has structured this preliminary draft. As an admin, you must verify all regulatory claims, add specific sections, and approve this before it becomes visible to users.`,
        applicability: ['General Taxpayers', 'Entities related to ' + topic],
        benefitsOrDeductions: ['Relevant benefits will be dynamically extracted in full AI mode'],
        restrictions: ['Subject to standard regulatory limitations'],
        examples: [`Example scenario involving ${topic}.`],
        relatedForms: ['Relevant forms extracted by AI'],
        filingProcedure: ['Step 1: Refer to official documentation', 'Step 2: Submit required declarations'],
        tags: ['crawled', 'auto-generated'],
        financialYear: '2024-25',
        assessmentYear: '2025-26',
        reviewStatus: ReviewStatus.DRAFT,
        slug: slug,
      },
    });

    revalidateTag("tax-content");
    return { success: true, data: newItem };
  } catch (error: unknown) {
    console.error("[Admin Action] crawlCustomTopic error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to crawl topic" };
  }
}
