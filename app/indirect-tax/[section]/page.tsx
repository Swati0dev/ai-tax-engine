import { notFound } from "next/navigation";
import { TaxKnowledgeDetail } from "@/components/tax-section/TaxKnowledgeDetail";
import { getKnowledgeItemById } from "@/actions/tax";
import { TaxKnowledgeItem } from "@/types/tax";

type IndirectTaxSectionPageProps = {
  params: Promise<{
    section: string;
  }>;
};

export default async function IndirectTaxSectionPage({ params }: IndirectTaxSectionPageProps) {
  const { section } = await params;
  
  const result = await getKnowledgeItemById(section);

  if (!result.success || !result.data) {
    return notFound();
  }

  return <TaxKnowledgeDetail item={result.data as unknown as TaxKnowledgeItem} />;
}
