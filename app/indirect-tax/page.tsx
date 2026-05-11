import { CategoryPageShell } from "@/components/tax-section/category-page-shell";
import { getKnowledgeItems } from "@/actions/tax";
import { TaxCategory } from "@prisma/client";
import { TaxKnowledgeItem } from "@/types/tax";

export default async function IndirectTaxPage() {
  const result = await getKnowledgeItems(TaxCategory.INDIRECT_TAX);
  const items = result.success ? result.data : [];

  return (
    <CategoryPageShell
      category="Indirect Tax"
      description="Explore GST, Custom duties, and other indirect tax topics through organized category pages."
      emptyState="Indirect Tax records will be added during the tax knowledge phase after source validation."
      items={items as unknown as TaxKnowledgeItem[]}
    />
  );
}
