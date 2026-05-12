import { BookOpen, Scale, FileText, CheckCircle2, ListChecks, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TaxKnowledgeItem } from "@/types/tax";
import { ReviewBadge } from "./ReviewBadge";
import { SourceBlock } from "./SourceBlock";

interface TaxKnowledgeDetailProps {
  item: TaxKnowledgeItem;
}

export function TaxKnowledgeDetail({ item }: TaxKnowledgeDetailProps) {
  const backPath = item.category === "DIRECT_TAX" ? "/direct-tax" : "/indirect-tax";
  const categoryLabel = item.category === "DIRECT_TAX" ? "Direct Tax" : "Indirect Tax";

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Detail Header */}
      <header className="bg-background border-b py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 -z-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col gap-6">
            <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60">
              <Link href={backPath} className="hover:text-primary transition-colors flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" />
                {categoryLabel}
              </Link>
              <span className="text-muted-foreground/30">/</span>
              <span className="text-primary truncate max-w-[200px] md:max-w-none">
                {item.sectionNumber ? `Section ${item.sectionNumber}` : item.title}
              </span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4 max-w-4xl">
                <div className="flex items-center gap-3 flex-wrap">
                  <ReviewBadge status={item.reviewStatus} />
                  {item.sectionNumber && (
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20 shadow-sm">
                      Section {item.sectionNumber}
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-full border">
                    <Scale className="h-3.5 w-3.5 text-primary/70" />
                    {item.actName}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight">
                  {item.title}
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed italic border-l-4 border-primary/30 pl-6">
                  {item.summary}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Detail Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Main Info Column */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Explanation Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="icon-box h-10 w-10">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Lawful Explanation</h2>
              </div>
              <div className="prose prose-slate dark:prose-invert max-w-none text-lg text-muted-foreground leading-relaxed space-y-6">
                {item.explanation}
              </div>
            </section>

            {/* Applicability & Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <section className="space-y-6">
                <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-foreground/60 border-b pb-4">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Applicability
                </h3>
                <ul className="space-y-4">
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
                <ul className="space-y-4">
                  {item.benefitsOrDeductions.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-base text-muted-foreground group">
                      <span className="h-2 w-2 rounded-full bg-primary/40 shrink-0 mt-2 group-hover:bg-primary transition-colors" />
                      {point}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Examples Section */}
            {item.examples.length > 0 && (
              <section className="soft-ui-card p-8 md:p-10 rounded-[2.5rem] bg-accent/5 border-accent/10">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-accent" />
                  Practical Examples
                </h3>
                <div className="space-y-8">
                  {item.examples.map((ex, idx) => (
                    <div key={idx} className="bg-background/60 p-6 rounded-2xl border border-accent/5 shadow-sm">
                      <p className="text-muted-foreground leading-relaxed">{ex}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Info Column */}
          <aside className="lg:col-span-4 space-y-10">
            {/* Sources */}
            <div className="soft-ui-card p-8 rounded-[2rem]">
              <SourceBlock sources={item.sourceReferences} />
            </div>

            {/* Procedures & Forms */}
            <div className="space-y-10">
              {/* Required Forms */}
              {item.relatedForms.length > 0 && (
                <div className="space-y-6">
                  <h4 className="text-sm font-black uppercase tracking-widest text-foreground/60 px-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Required Forms
                  </h4>
                  <div className="flex flex-wrap gap-2 px-2">
                    {item.relatedForms.map((form, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-xl bg-primary/5 border border-primary/20 text-xs font-bold text-primary">
                        {form}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Restrictions Section */}
              {item.restrictions.length > 0 && (
                <div className="space-y-6">
                  <h4 className="text-sm font-black uppercase tracking-widest text-foreground/60 px-2 flex items-center gap-2">
                    <Scale className="h-4 w-4 text-amber-500" />
                    Important Restrictions
                  </h4>
                  <div className="space-y-3 px-2">
                    {item.restrictions.map((res, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-sm text-muted-foreground font-medium flex items-start gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                        {res}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Filing Procedures */}
              <div className="space-y-6">
                <h4 className="text-sm font-black uppercase tracking-widest text-foreground/60 px-2">Filing Procedures</h4>
                <div className="space-y-4">
                  {item.filingProcedure.map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-start p-4 rounded-2xl bg-muted/30 border border-transparent hover:border-primary/20 transition-all">
                      <span className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-muted-foreground font-medium leading-tight">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Items */}
            {item.relatedItems.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-sm font-black uppercase tracking-widest text-foreground/60 px-2">Related Sections</h4>
                <div className="flex flex-wrap gap-2 px-2">
                  {item.relatedItems.map((rel, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-background border text-xs font-bold hover:border-primary transition-colors cursor-pointer">
                      {rel}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
