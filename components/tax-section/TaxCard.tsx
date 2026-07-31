import { BookOpen, Calendar, Scale, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TaxKnowledgeItem } from "@/types/tax";
import { ReviewBadge } from "./ReviewBadge";
import { SourceBlock } from "./SourceBlock";

interface TaxCardProps {
  item: TaxKnowledgeItem;
  className?: string;
}

export function TaxCard({ item, className }: TaxCardProps) {
  return (
    <article className={cn("soft-ui-card p-6 md:p-8 rounded-3xl flex flex-col gap-8 overflow-hidden", className)}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <ReviewBadge status={item.reviewStatus} />
            {item.sectionNumber && (
              <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-xs font-bold border border-primary/20">
                Section {item.sectionNumber}
              </span>
            )}
            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
              <Scale className="h-3 w-3" />
              {item.actName}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight hover:text-primary transition-colors cursor-pointer">
            <Link href={`${item.category === "INCOME_TAX" ? "/direct-tax" : "/indirect-tax"}/${item.slug}`}>
              {item.title}
            </Link>
          </h2>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            Reviewed: {item.lastReviewed instanceof Date ? item.lastReviewed.toLocaleDateString() : item.lastReviewed}
          </span>
        </div>
      </div>

      {/* Summary */}
      <p className="text-lg text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-6 py-2">
        {item.summary}
      </p>

      {/* Cover Image */}
      <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden shadow-sm my-4 group bg-slate-100 flex items-center justify-center">
        <Image 
          src={item.imageUrl || "/hero-tax.png"} 
          alt={item.title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <section>
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground/70 mb-4">
              <BookOpen className="h-4 w-4 text-primary" />
              Lawful Explanation
            </h3>
            <div className="text-sm leading-relaxed text-muted-foreground space-y-4">
              {item.explanation}
            </div>
          </section>

          {item.applicability && item.applicability.length > 0 && (
            <section>
              <h4 className="text-xs font-bold uppercase tracking-widest text-primary/70 mb-3">Applicability</h4>
              <ul className="grid grid-cols-1 gap-2">
                {item.applicability.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="space-y-8">
          {/* Sources */}
          <SourceBlock sources={item.sourceReferences} />

          {/* Key Dates */}
          {item.effectiveFrom && (
            <div className="p-4 rounded-2xl bg-muted/50 border flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <div className="text-[10px] uppercase font-bold text-muted-foreground">Effective From</div>
                <div className="text-sm font-bold">{item.effectiveFrom instanceof Date ? item.effectiveFrom.toLocaleDateString() : item.effectiveFrom}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
