"use server";

import { prisma } from "@/lib/db";
import { TaxCategory, ReviewStatus } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { logger } from "@/lib/logger";
import { z } from "zod";

const CategorySchema = z.nativeEnum(TaxCategory).optional();
const SlugSchema = z.string().min(1).max(200);

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

export async function slugToTaxCategory(slug: string): Promise<TaxCategory | undefined> {
  const normalized = slug.toUpperCase().replace(/-/g, '_');
  
  if (Object.values(TaxCategory).includes(normalized as TaxCategory)) {
    return normalized as TaxCategory;
  }
  
  // Manual mappings for standard frontend routes to database enums
  const manualMappings: Record<string, TaxCategory> = {
    'TAX_BASICS': 'GENERAL',
    'COMPANY_TAX': 'CORPORATE_TAX',
    'FREELANCER': 'BUSINESS_TAX',
    'SALARIED': 'INCOME_TAX',
    'SELF_EMPLOYED': 'BUSINESS_TAX',
    'ROADMAP': 'GENERAL'
  };
  
  if (manualMappings[normalized]) {
    return manualMappings[normalized];
  }
  
  return undefined;
}

export async function getKnowledgeItems(category?: TaxCategory) {
  try {
    const parsedCategory = CategorySchema.parse(category);
    
    const fetchItems = unstable_cache(
      async (cat?: TaxCategory) => {
        return await prisma.taxKnowledgeItem.findMany({
          where: {
            ...(cat ? { category: cat } : {}),
            reviewStatus: ReviewStatus.VERIFIED
          },
          include: {
            sourceReferences: true,
            faqs: true
          },
          orderBy: {
            updatedAt: "desc"
          }
        });
      },
      [`knowledge-items-${category || 'all'}`],
      { tags: ['tax-content'], revalidate: 60 } // Cache for 1 minute
    );

    const items = await fetchItems(parsedCategory);

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
      })),
      faqs: item.faqs.map(faq => ({
        ...faq,
        createdAt: toISO(faq.createdAt),
        updatedAt: toISO(faq.updatedAt),
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
    const parsedSlug = SlugSchema.parse(slug);

    const fetchItem = unstable_cache(
      async (s: string) => {
        return await prisma.taxKnowledgeItem.findUnique({
          where: { slug: s },
          include: {
            sourceReferences: true,
            faqs: true
          }
        });
      },
      [`knowledge-item-${slug}`],
      { tags: ['tax-content'], revalidate: 60 } // Cache for 1 minute for faster updates
    );

    const item = await fetchItem(parsedSlug);

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
      })),
      faqs: item.faqs.map(faq => ({
        ...faq,
        createdAt: toISO(faq.createdAt),
        updatedAt: toISO(faq.updatedAt),
      }))
    };

    return { success: true, data: serializedItem };
  } catch (error) {
    logger.error("[Action] getKnowledgeItemBySlug Error:", { error, slug });
    return { success: false, error: "Failed to fetch tax knowledge item." };
  }
}

export async function getKnowledgeItemsByCalculator(calculatorId: string) {
  try {
    const items = await prisma.taxKnowledgeItem.findMany({
      where: {
        relatedCalculators: {
          has: calculatorId
        },
        reviewStatus: ReviewStatus.VERIFIED
      },
      include: {
        faqs: true
      }
    });

    const serializedItems = items.map(item => ({
      ...item,
      effectiveFrom: toISOOrNull(item.effectiveFrom),
      lastReviewed: toISO(item.lastReviewed),
      createdAt: toISO(item.createdAt),
      updatedAt: toISO(item.updatedAt),
      faqs: item.faqs.map(faq => ({
        ...faq,
        createdAt: toISO(faq.createdAt),
        updatedAt: toISO(faq.updatedAt),
      }))
    }));

    return { success: true, data: serializedItems };
  } catch (error) {
    logger.error("[Action] getKnowledgeItemsByCalculator Error:", { error, calculatorId });
    return { success: false, error: "Failed to fetch related articles." };
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
    console.error("[Action] getFormsAndProcedures Error:", error);
    return { success: false, error: "Failed to fetch forms and procedures." };
  }
}
