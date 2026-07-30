"use server";

import { prisma } from "@/lib/db";
import { TaxCategory, ReviewStatus } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { logger } from "@/lib/logger";

function toISO(date: string | Date | number | null | undefined): string {
  if (!date) return "";
  if (typeof date === "string") return date;
  if (date instanceof Date) return date.toISOString();
  return new Date(date).toISOString();
}

function toISOOrNull(date: string | Date | number | null | undefined): string | null {
  if (!date) return null;
  if (typeof date === "string") return date;
  if (date instanceof Date) return date.toISOString();
  return new Date(date).toISOString();
}

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
      { tags: ['tax-content'], revalidate: 60 } // Cache for 1 minute
    );

    const items = await fetchItems(category);


    // Serialize Dates for Client Components
    const serializedItems = items.map(item => ({
      ...item,
      effectiveFrom: toISOOrNull(item.effectiveFrom),
      lastReviewed: toISO(item.lastReviewed),
      createdAt: toISO(item.createdAt),
      updatedAt: toISO(item.updatedAt),
      sourceReferences: item.sourceReferences.map(ref => ({
        ...ref,
        publishedAt: toISOOrNull(ref.publishedAt),
        accessedAt: toISO(ref.accessedAt),
        createdAt: toISO(ref.createdAt),
        updatedAt: toISO(ref.updatedAt),
      }))
    }));

    return { success: true, data: serializedItems };
  } catch (error) {
    logger.error("Error fetching knowledge items", { error, category });
    return { success: false, error: "Failed to fetch tax knowledge items." };
  }

}

export async function getKnowledgeItemBySlug(slug: string) {
  try {
    const fetchItem = unstable_cache(
      async (itemSlug: string) => {
        return await prisma.taxKnowledgeItem.findUnique({
          where: { slug: itemSlug },
          include: {
            sourceReferences: true
          }
        });
      },
      [`knowledge-item-${slug}`],
      { tags: ['tax-content'], revalidate: 60 } // Cache for 1 minute for faster updates
    );

    const item = await fetchItem(slug);


    if (!item) {
      return { success: false, error: "Knowledge item not found." };
    }

    // Serialize Dates
    const serializedItem = {
      ...item,
      effectiveFrom: toISOOrNull(item.effectiveFrom),
      lastReviewed: toISO(item.lastReviewed),
      createdAt: toISO(item.createdAt),
      updatedAt: toISO(item.updatedAt),
      sourceReferences: item.sourceReferences.map(ref => ({
        ...ref,
        publishedAt: toISOOrNull(ref.publishedAt),
        accessedAt: toISO(ref.accessedAt),
        createdAt: toISO(ref.createdAt),
        updatedAt: toISO(ref.updatedAt),
      }))
    };

    return { success: true, data: serializedItem };
  } catch (error) {
    logger.error("Error fetching knowledge item by slug", { error, slug });
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
            slug: true,
            title: true,
            relatedForms: true,
            filingProcedure: true,
            category: true,
            sectionNumber: true,
            explanation: true,
            applicability: true,
            benefitsOrDeductions: true,
            restrictions: true,
            examples: true,
            actName: true
          }
        });
      },
      ['forms-and-procedures'],
      { tags: ['tax-content'], revalidate: 60 } // Cache for 1 minute for faster updates
    );

    const items = await fetchForms();


    return { success: true, data: items };
  } catch (error) {
    console.error("Error fetching forms and procedures:", error);
    return { success: false, error: "Failed to fetch forms and procedures." };
  }
}
