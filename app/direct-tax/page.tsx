import { CategoryPageShell } from "@/components/tax-section/category-page-shell";
import { getKnowledgeItems } from "@/actions/tax";
import { TaxCategory } from "@prisma/client";
import { TaxKnowledgeItem } from "@/types/tax";

export default async function DirectTaxPage() {
  const result = await getKnowledgeItems(TaxCategory.DIRECT_TAX);
  const items = result.success ? result.data : [];

  return (
    <CategoryPageShell
      category="Direct Tax"
      description="Understand Income Tax sections, deductions, exemptions, and filing guidance for individuals and businesses."
      emptyState="Direct Tax records will be added during the tax knowledge phase after source validation."
      items={items as unknown as TaxKnowledgeItem[]}
    />
  );
}
