import { TaxKnowledgeItem } from "@/types/tax";
import { ArticleSchema } from "@/types/article";
import { ArticleLayout } from "@/components/layout/ArticleLayout";
import { BookOpen, Scale, FileText, CheckCircle2, ListChecks, AlertCircle } from "lucide-react";
import React from "react";

interface TaxKnowledgeDetailProps {
  item: TaxKnowledgeItem;
}

export function TaxKnowledgeDetail({ item }: TaxKnowledgeDetailProps) {
  
  // Transform legacy TaxKnowledgeItem into new ArticleSchema format
  const mappedArticle: ArticleSchema = {
    id: item.id,
    title: item.title,
    summary: item.summary,
    heroImage: item.imageUrl || "/hero-tax.png",
    
    metadata: {
      readingTime: "5",
      difficulty: "Intermediate",
      reviewedBy: "Sarah Jenkins, CPA",
      reviewerTitle: "Senior Tax Expert",
      publishedDate: "May 10, 2026",
      lastUpdated: "May 12, 2026",
      version: "1.2.0",
      nextReviewDate: "May 12, 2027"
    },
    
    // Quick Scan / Takeaways derived from applicability or benefits
    keyTakeaways: [
      ...item.applicability.slice(0, 2),
      ...item.benefitsOrDeductions.slice(0, 1)
    ],
    
    blocks: [
      {
        id: "lawful-explanation",
        type: "custom",
        content: (
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="icon-box h-10 w-10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight" id="lawful-explanation">Lawful Explanation</h2>
            </div>
            
            <div className="prose-editorial max-w-none text-lg text-muted-foreground leading-relaxed space-y-6">
              {item.explanation}
            </div>
          </section>
        )
      },
      {
        id: "applicability",
        type: "custom",
        content: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16" id="applicability-benefits">
            <section className="space-y-6">
              <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-foreground/60 border-b pb-4">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Applicability
              </h3>
              <ul className="space-y-4 m-0 p-0 list-none">
                {item.applicability.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base text-muted-foreground group">
                    <span className="h-2 w-2 rounded-full bg-emerald-500/40 shrink-0 mt-2 group-hover:bg-emerald-500 transition-colors" />
                    {point}
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-6">
              <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-foreground/60 border-b pb-4">
                <ListChecks className="h-4 w-4 text-primary" />
                Benefits & Deductions
              </h3>
              <ul className="space-y-4 m-0 p-0 list-none">
                {item.benefitsOrDeductions.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base text-muted-foreground group">
                    <span className="h-2 w-2 rounded-full bg-primary/40 shrink-0 mt-2 group-hover:bg-primary transition-colors" />
                    {point}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )
      },
      // Restrictions as Callouts
      ...item.restrictions.map((res, idx) => ({
        id: `restriction-${idx}`,
        type: "callout" as const,
        content: {
          variant: "warning",
          title: "Crucial Compliance Rule",
          children: <p>{res}</p>
        }
      })),
      
      // Filing Procedures as StepList
      ...(item.filingProcedure.length > 0 ? [{
        id: "filing-procedure",
        type: "custom" as const,
        content: (
          <div className="mt-16" id="filing-procedure">
            <h3 className="text-2xl font-bold mb-8">Filing Procedures</h3>
            <div className="space-y-4">
              {item.filingProcedure.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start p-6 rounded-2xl bg-muted/30 border border-transparent hover:border-primary/20 transition-all duration-200">
                  <span className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-base text-muted-foreground font-medium leading-relaxed m-0 mt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )
      }] : []),
      
      // Required Forms as a SummaryBox
      ...(item.relatedForms.length > 0 ? [{
        id: "required-forms",
        type: "summaryBox" as const,
        content: {
          type: "documents",
          title: "Required Forms",
          items: item.relatedForms
        }
      }] : []),
      
      // Practical Examples
      ...(item.examples.length > 0 ? [{
        id: "examples",
        type: "custom" as const,
        content: (
          <section className="bg-accent/5 p-8 md:p-10 rounded-[2.5rem] border border-accent/10 mt-16" id="practical-examples">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <FileText className="h-5 w-5 text-accent" />
              Practical Examples
            </h3>
            <div className="space-y-6">
              {item.examples.map((ex, idx) => (
                <div key={idx} className="bg-white/80 p-6 rounded-2xl border shadow-sm">
                  <p className="text-muted-foreground leading-relaxed m-0">{ex}</p>
                </div>
              ))}
            </div>
          </section>
        )
      }] : [])
    ],
    
    officialSources: item.sourceReferences.map((ref) => ({
      title: ref.title,
      url: ref.url || "#",
      type: "Other"
    }))
  };

  return <ArticleLayout article={mappedArticle} />;
}

