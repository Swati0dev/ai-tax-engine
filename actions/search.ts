"use server";

import { searchTaxKnowledge } from "@/lib/search/tax-search";
import { TaxCategory } from "@prisma/client";

export async function performTaxSearch(query: string, category?: TaxCategory) {
  try {
    const results = await searchTaxKnowledge(query, category);
    
    // Serialize for client
    const serializedResults = results.map(item => ({
      ...item,
      effectiveFrom: item.effectiveFrom?.toISOString() || null,
      lastReviewed: item.lastReviewed.toISOString(),
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    return { success: true, data: serializedResults };
  } catch (error) {
    return { success: false, error: "Search failed." };
  }
}
