"use server";

import { prisma } from "@/lib/db";
import { TaxCategory, ReviewStatus } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { logger } from "@/lib/logger";



export async function getKnowledgeItems(category?: TaxCategory) {
  try {
    const fetchItems = unstable_cache(
      async (cat?: TaxCategory) => {
        return await prisma.taxKnowledgeItem.findMany({
          where: {
            ...(cat ? { category: cat } : {}),
            reviewStatus: ReviewStatus.VERIFIED
          },
          include: {
            sourceReferences: true
          },
          orderBy: {
            updatedAt: "desc"
          }
        });
      },
      [`knowledge-items-${category || 'all'}`],
      { tags: ['tax-content'], revalidate: 3600 } // Cache for 1 hour
    );

    const items = await fetchItems(category);


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
    logger.error("Error fetching knowledge items", { error, category });
    return { success: false, error: "Failed to fetch tax knowledge items." };
  }

}

export async function getKnowledgeItemById(id: string) {
  try {
    const fetchItem = unstable_cache(
      async (itemId: string) => {
        return await prisma.taxKnowledgeItem.findUnique({
          where: { id: itemId },
          include: {
            sourceReferences: true
          }
        });
      },
      [`knowledge-item-${id}`],
      { tags: ['tax-content'], revalidate: 3600 }
    );

    const item = await fetchItem(id);


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
    logger.error("Error fetching knowledge item by ID", { error, id });
    return { success: false, error: "Failed to fetch tax knowledge item." };
  }

}

export async function getFormsAndProcedures() {
  try {
    const fetchForms = unstable_cache(
      async () => {
        return await prisma.taxKnowledgeItem.findMany({
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
      },
      ['forms-and-procedures'],
      { tags: ['tax-content'], revalidate: 3600 }
    );

    const items = await fetchForms();


    return { success: true, data: items };
  } catch (error) {
    console.error("Error fetching forms and procedures:", error);
    return { success: false, error: "Failed to fetch forms and procedures." };
  }
}
