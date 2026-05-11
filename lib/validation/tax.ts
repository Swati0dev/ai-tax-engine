import type { TaxKnowledgeItem } from "@/types/tax";

const requiredStringFields = [
  "id",
  "category",
  "actName",
  "title",
  "summary",
  "explanation",
  "lastReviewed",
  "reviewStatus"
] as const;

export function validateTaxKnowledgeItem(item: TaxKnowledgeItem) {
  const missingFields = requiredStringFields.filter((field) => !item[field]);

  const hasSourceReferences = item.sourceReferences.length > 0;

  return {
    valid: missingFields.length === 0 && hasSourceReferences,
    missingFields,
    hasSourceReferences
  };
}
