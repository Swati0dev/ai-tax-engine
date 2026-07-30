import { notFound } from "next/navigation";
import { TaxKnowledgeDetail } from "@/components/tax-section/TaxKnowledgeDetail";
import { getKnowledgeItemBySlug } from "@/actions/tax";
import { TaxKnowledgeItem } from "@/types/tax";
import { constructMetadata } from "@/lib/seo";
import { generateArticleJsonLd } from "@/lib/jsonld";
import { Metadata } from "next";

type DirectTaxSectionPageProps = {
  params: Promise<{
    section: string; // This corresponds to the cuid (id) in the DB
  }>;
};

export async function generateMetadata({ params }: DirectTaxSectionPageProps): Promise<Metadata> {
  const { section } = await params;
  const result = await getKnowledgeItemBySlug(section);
  
  if (!result.success || !result.data) {
    return constructMetadata({ title: "Article Not Found" });
  }
  
  return constructMetadata({
    title: result.data.title,
    description: result.data.summary,
  });
}

export default async function DirectTaxSectionPage({ params }: DirectTaxSectionPageProps) {
  const { section } = await params;
  
  const result = await getKnowledgeItemBySlug(section);

  if (!result.success || !result.data) {
    return notFound();
  }

  const item = result.data as unknown as TaxKnowledgeItem;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleJsonLd({
              headline: item.title,
              description: item.summary,
              authorName: item.reviewerId || "AI Tax Engine Expert",
              datePublished: item.createdAt,
              dateModified: item.updatedAt,
            })
          ),
        }}
      />
      <TaxKnowledgeDetail item={item} />
    </>
  );
}
