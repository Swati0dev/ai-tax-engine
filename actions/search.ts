/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { searchTaxKnowledge } from "@/lib/search/tax-search";
import { TaxCategory } from "@prisma/client";
import { z } from "zod";

const QuerySchema = z.string().max(200);
const CategorySchema = z.nativeEnum(TaxCategory).optional();

export async function performTaxSearch(query: string, category?: TaxCategory) {
  try {
    const parsedQuery = QuerySchema.parse(query);
    const parsedCategory = CategorySchema.parse(category);

    const results = await searchTaxKnowledge(parsedQuery, parsedCategory) as any[];
    
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
    console.error("[Action] performTaxSearch Error:", error);
    return { success: false, error: "Search failed." };
  }
}
