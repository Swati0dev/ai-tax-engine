import { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import dynamic from "next/dynamic";
import { Loader2, FileText, ChevronRight, BookOpen } from "lucide-react";
import { getKnowledgeItemsByCalculator } from "@/actions/tax";
import Link from "next/link";

const TaxCalculator = dynamic(
  () => import("@/components/tools/TaxCalculator").then((mod) => mod.TaxCalculator),
  {
    loading: () => (
      <div className="flex h-96 w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: "Tax Regime Comparator | AI Tax Platform",
  description: "Compare Old vs New Tax Regime for FY 2024-25 with our interactive real-time calculator.",
};

export default async function IncomeTaxCalculatorPage() {
  const { data: relatedArticles, success } = await getKnowledgeItemsByCalculator("income-tax-calculator");

  // Collect FAQs from all related articles
  const allFaqs = success && relatedArticles 
    ? relatedArticles.flatMap(article => article.faqs || [])
    : [];

  return (
    <main className="flex flex-col w-full pb-24 bg-slate-50 min-h-screen">
      <PageHero
        title="Tax Regime Comparator"
        description="Choose the right path for your financial savings. Compare liabilities under the latest July 2024 Budget updates."
        image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2022&auto=format&fit=crop"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <Breadcrumbs />
        <TaxCalculator />
        
        {/* Dynamic Related Knowledge Section */}
        {success && relatedArticles && relatedArticles.length > 0 && (
          <div className="mt-24 space-y-12">
            
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="h-8 w-8 text-primary" />
                <h3 className="text-3xl font-bold tracking-tight">Understanding the Rules</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedArticles.map((article) => (
                  <Link 
                    key={article.id} 
                    href={`/knowledge-hub/${article.category.toLowerCase().replace('_', '-')}/${article.slug}`}
                    className="group block bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:border-primary/20 hover:shadow-md transition-all"
                  >
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md mb-4 inline-block">
                      {article.actName}
                    </span>
                    <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {article.summary}
                    </p>
                    <div className="flex items-center text-sm font-bold text-primary group-hover:gap-2 transition-all">
                      Read Full Guide <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {allFaqs.length > 0 && (
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border shadow-sm">
                <h3 className="text-3xl font-bold tracking-tight mb-8">Frequently Asked Questions</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {allFaqs.map((faq, idx) => (
                    <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <div className="flex gap-4">
                        <FileText className="h-6 w-6 text-slate-400 shrink-0" />
                        <div>
                          <h4 className="font-bold text-slate-900 mb-2">{faq.question}</h4>
                          <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
