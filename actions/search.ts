"use server";

import { searchTaxKnowledge } from "@/lib/search/tax-search";
import { TaxCategory } from "@prisma/client";

export async function performTaxSearch(query: string, category?: TaxCategory) {
  try {
    const results = await searchTaxKnowledge(query, category) as any[];
    
    // Serialize for client
    const serializedResults = results.map((item: any) => ({
      ...item,
      effectiveFrom: item.effectiveFrom?.toISOString() || null,
      lastReviewed: item.lastReviewed.toISOString(),
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      sourceReferences: item.sourceReferences.map((ref: any) => ({
        ...ref,
        publishedAt: ref.publishedAt?.toISOString() || null,
        accessedAt: ref.accessedAt.toISOString(),
        createdAt: ref.createdAt.toISOString(),
        updatedAt: ref.updatedAt.toISOString(),
      }))
    }));



    return { success: true, data: serializedResults };
  } catch (error) {
    return { success: false, error: "Search failed." };
  }
}
