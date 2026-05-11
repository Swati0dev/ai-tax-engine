import { getTaxKnowledgeItems } from "@/lib/tax-data";
import type { TaxSearchQuery, TaxSearchResult } from "@/types/tax";

export async function searchTaxKnowledge(query: TaxSearchQuery): Promise<TaxSearchResult[]> {
  void query;

  const items = await getTaxKnowledgeItems();

  return (items || []).map((item) => ({
    item,
    score: 0,
    matchedFields: []
  }));
}
