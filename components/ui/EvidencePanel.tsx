import { Scale, CheckCircle2, ShieldCheck, Activity } from "lucide-react";
import { TrustMetadata } from "@/types/article";
import { cn } from "@/lib/utils";

interface EvidencePanelProps {
  trust: TrustMetadata;
}

export function EvidencePanel({ trust }: EvidencePanelProps) {
  if (!trust) return null;

  const score = trust.confidenceScore.score;
  let strengthLabel = "Medium";
  let colorClass = "text-blue-600 bg-blue-50 border-blue-200";
  let barColor = "bg-blue-500";

  if (score >= 90) {
    strengthLabel = "High";
    colorClass = "text-emerald-700 bg-emerald-50 border-emerald-200";
    barColor = "bg-emerald-500";
  } else if (score < 70) {
    strengthLabel = "Low";
    colorClass = "text-amber-700 bg-amber-50 border-amber-200";
    barColor = "bg-amber-500";
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 mt-16 shadow-sm print:border-black print:bg-white print:text-black print:shadow-none">
      <div className="flex flex-col md:flex-row md:items-start gap-8">
        
        {/* Left: Overall Evidence Strength */}
        <div className="flex-1">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
            <Scale className="h-4 w-4" />
            Evidence Strength
          </h3>
          
          <div className="flex items-end gap-3 mb-3">
            <span className={cn("text-4xl font-black tracking-tighter leading-none print:text-black", colorClass.split(' ')[0])}>
              {score}%
            </span>
            <span className={cn("px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border print:border-black print:text-black", colorClass)}>
              {strengthLabel} Confidence
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-4 print:border print:border-black">
            <div className={cn("h-full rounded-full transition-all duration-1000 print:bg-black", barColor)} style={{ width: `${score}%` }} />
          </div>
          
          <p className="text-sm text-slate-600 font-medium leading-relaxed m-0 print:text-black">
            Calculated from: {trust.confidenceScore.calculatedFrom.join(", ")}.
          </p>
        </div>

        {/* Right: Verification Status */}
        <div className="flex-1 md:border-l border-slate-100 md:pl-8 print:border-black">
          <ul className="space-y-4 m-0 p-0 list-none">
            <li className="flex items-start gap-3">
              <ShieldCheck className={cn("h-5 w-5 mt-0.5", trust.verificationStatus === "Verified" ? "text-emerald-500 print:text-black" : "text-slate-400")} />
              <div>
                <p className="text-sm font-bold text-slate-800 m-0 print:text-black">Verification Status</p>
                <p className="text-sm text-slate-500 m-0 print:text-black">{trust.verificationStatus} {trust.lastVerificationDate && `(Last: ${trust.lastVerificationDate})`}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className={cn("h-5 w-5 mt-0.5", trust.officialReviewed ? "text-primary print:text-black" : "text-slate-400")} />
              <div>
                <p className="text-sm font-bold text-slate-800 m-0 print:text-black">Official Review</p>
                <p className="text-sm text-slate-500 m-0 print:text-black">{trust.officialReviewed ? "Reviewed by qualified expert" : "Pending expert review"}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="h-5 w-5 text-blue-500 mt-0.5 print:text-black" />
              <div>
                <p className="text-sm font-bold text-slate-800 m-0 print:text-black">Review Cycle</p>
                <p className="text-sm text-slate-500 m-0 print:text-black">{trust.reviewCycle || "Ad-hoc"} Updates</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Disclaimer */}
      {trust.legalDisclaimer && (
        <div className="mt-8 pt-6 border-t border-slate-100 print:border-black">
          <p className="text-xs text-slate-400 font-medium m-0 leading-relaxed uppercase tracking-wider print:text-black">
            Disclaimer: {trust.legalDisclaimer}
          </p>
        </div>
      )}
    </div>
  );
}
