import { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { KnowledgeHubClient } from "@/components/tax-section/KnowledgeHubClient";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { getKnowledgeItems } from "@/actions/tax";
import { TaxKnowledgeItem } from "@/types/tax";

export const metadata: Metadata = {
  title: "Tax Knowledge Hub | AI Tax Platform",
  description: "Explore comprehensive guides on Indian direct and indirect tax. Access sections on 80C, 80D, HRA, GST compliance, and presumptive taxation.",
};

export default async function KnowledgeHubPage() {
  // Fetch all verified knowledge base items dynamically from Neon Postgres database
  const res = await getKnowledgeItems();
  const items = res.success && res.data ? res.data : [];

  return (
    <main className="flex flex-col w-full pb-24 bg-background">
      <PageHero
        title="Knowledge Hub"
        description="Master Indian Tax Laws. Search verified articles, sections breakdowns, and filing procedures guided by our database."
        image="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <Breadcrumbs />
        
        <div className="mt-8">
          <KnowledgeHubClient items={items as unknown as TaxKnowledgeItem[]} />
        </div>
      </div>
    </main>
  );
}
