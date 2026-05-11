import { Info, AlertTriangle, FileText, Lightbulb, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TaxChatResponse } from "@/types/tax";
import { ReviewBadge } from "./ReviewBadge";

interface StructuredAnswerProps {
  response: TaxChatResponse;
  className?: string;
}

export function StructuredAnswer({ response, className }: StructuredAnswerProps) {
  return (
    <div className={cn("space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500", className)}>
      {/* Primary Answer */}
      <section className="soft-ui-card p-6 md:p-10 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent border-primary/20 shadow-xl shadow-primary/5">
        <div className="flex items-center justify-between mb-6">
          <ReviewBadge status={response.dataStatus === "UNAVAILABLE" ? "DRAFT" : response.dataStatus} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Source-Grounded AI Response</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-extrabold leading-tight mb-6">
          {response.shortAnswer}
        </h3>
        
        {/* Caveats */}
        {response.caveats.length > 0 && (
          <div className="flex gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <div className="text-sm font-medium">
              {response.caveats.map((c, idx) => <p key={idx}>{c}</p>)}
            </div>
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Applicability */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <Info className="h-5 w-5" />
            <h4 className="font-bold text-sm uppercase tracking-wider">Who it applies to</h4>
          </div>
          <ul className="space-y-2">
            {response.applicabilityConditions.map((condition, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-xl bg-muted/50 border border-transparent hover:border-border transition-colors">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                {condition}
              </li>
            ))}
          </ul>
        </section>

        {/* Procedures */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <FileText className="h-5 w-5" />
            <h4 className="font-bold text-sm uppercase tracking-wider">Forms & Procedures</h4>
          </div>
          <ul className="space-y-2">
            {response.relevantFormsOrProcedures.map((proc, idx) => (
              <li key={idx} className="flex items-center justify-between p-3 rounded-xl bg-background border shadow-sm group hover:border-primary/30 transition-all">
                <span className="text-sm font-semibold">{proc}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Legal Options */}
      {response.legalTaxSavingOptions.length > 0 && (
        <section className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
          <div className="flex items-center gap-2 text-emerald-600 mb-4">
            <Lightbulb className="h-5 w-5" />
            <h4 className="font-bold text-sm uppercase tracking-wider">Tax Saving Opportunities</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {response.legalTaxSavingOptions.map((option, idx) => (
              <div key={idx} className="bg-background/50 p-4 rounded-2xl border border-emerald-500/10 text-sm font-medium">
                {option}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sources Citation */}
      <section className="pt-8 border-t">
        <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground mb-4">References Checked</h4>
        <div className="flex flex-wrap gap-2">
          {response.sources.map((source, idx) => (
            <div key={idx} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border text-xs font-bold hover:bg-background hover:border-primary/30 transition-all cursor-default">
              {source.title}
              <ReviewBadge status={source.reviewStatus} className="px-1 py-0 border-0 bg-transparent text-[8px]" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
