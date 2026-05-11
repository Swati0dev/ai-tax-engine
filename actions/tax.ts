"use server";

import { prisma } from "@/lib/db";
import { TaxCategory, ReviewStatus } from "@prisma/client";

export async function getKnowledgeItems(category?: TaxCategory) {
  try {
    const items = await prisma.taxKnowledgeItem.findMany({
      where: {
        ...(category ? { category } : {}),
        reviewStatus: ReviewStatus.VERIFIED
      },
      include: {
        sourceReferences: true
      },
      orderBy: {
        updatedAt: "desc"
      }
    });

    // Serialize Dates for Client Components
    const serializedItems = items.map(item => ({
      ...item,
      effectiveFrom: item.effectiveFrom?.toISOString() || null,
      lastReviewed: item.lastReviewed.toISOString(),
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      sourceReferences: item.sourceReferences.map(ref => ({
        ...ref,
        publishedAt: ref.publishedAt?.toISOString() || null,
        accessedAt: ref.accessedAt.toISOString(),
        createdAt: ref.createdAt.toISOString(),
        updatedAt: ref.updatedAt.toISOString(),
      }))
    }));

    return { success: true, data: serializedItems };
  } catch (error) {
    console.error("Error fetching knowledge items:", error);
    return { success: false, error: "Failed to fetch tax knowledge items." };
  }
}

export async function getKnowledgeItemById(id: string) {
  try {
    const item = await prisma.taxKnowledgeItem.findUnique({
      where: { id },
      include: {
        sourceReferences: true
      }
    });

    if (!item) {
      return { success: false, error: "Knowledge item not found." };
    }

    // Serialize Dates
    const serializedItem = {
      ...item,
      effectiveFrom: item.effectiveFrom?.toISOString() || null,
      lastReviewed: item.lastReviewed.toISOString(),
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      sourceReferences: item.sourceReferences.map(ref => ({
        ...ref,
        publishedAt: ref.publishedAt?.toISOString() || null,
        accessedAt: ref.accessedAt.toISOString(),
        createdAt: ref.createdAt.toISOString(),
        updatedAt: ref.updatedAt.toISOString(),
      }))
    };

    return { success: true, data: serializedItem };
  } catch (error) {
    console.error("Error fetching knowledge item by ID:", error);
    return { success: false, error: "Failed to fetch tax knowledge item." };
  }
}

export async function getFormsAndProcedures() {
  try {
    const items = await prisma.taxKnowledgeItem.findMany({
      where: {
        reviewStatus: ReviewStatus.VERIFIED,
        OR: [
          { relatedForms: { isEmpty: false } },
          { filingProcedure: { isEmpty: false } }
        ]
      },
      select: {
        id: true,
        title: true,
        relatedForms: true,
        filingProcedure: true,
        category: true,
        sectionNumber: true
      }
    });

    return { success: true, data: items };
  } catch (error) {
    console.error("Error fetching forms and procedures:", error);
    return { success: false, error: "Failed to fetch forms and procedures." };
  }
}
