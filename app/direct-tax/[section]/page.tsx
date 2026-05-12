import { notFound } from "next/navigation";
import { TaxKnowledgeDetail } from "@/components/tax-section/TaxKnowledgeDetail";
import { getKnowledgeItemBySlug } from "@/actions/tax";
import { TaxKnowledgeItem } from "@/types/tax";

type DirectTaxSectionPageProps = {
  params: Promise<{
    section: string; // This corresponds to the cuid (id) in the DB
  }>;
};

export default async function DirectTaxSectionPage({ params }: DirectTaxSectionPageProps) {
  const { section } = await params;
  
  const result = await getKnowledgeItemBySlug(section);

  if (!result.success || !result.data) {
    return notFound();
  }

  return <TaxKnowledgeDetail item={result.data as unknown as TaxKnowledgeItem} />;
}
