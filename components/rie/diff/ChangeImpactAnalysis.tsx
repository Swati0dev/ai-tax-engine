import React from "react";
import { AlertCircle, ArrowRight, Briefcase, FileWarning } from "lucide-react";

interface ImpactItem {
  id: string;
  previousRule: string;
  currentRule: string;
  businessImpact: string;
  requiredAction: string;
  riskLevel: "High" | "Medium" | "Low";
}

interface ChangeImpactAnalysisProps {
  impacts: ImpactItem[];
}

export function ChangeImpactAnalysis({ impacts }: ChangeImpactAnalysisProps) {
  if (!impacts || impacts.length === 0) return null;

  return (
    <div className="space-y-8">
      {impacts.map((impact) => (
        <div key={impact.id} className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
          
          <div className="bg-slate-50 border-b border-slate-100 p-4 md:p-6 flex flex-col md:flex-row gap-6 md:items-center">
            
            {/* Previous vs Current Diff */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-red-50/50 border border-red-100">
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-2">Previous Rule</h5>
                <p className="text-sm font-medium text-slate-700 m-0 line-through decoration-red-300">
                  {impact.previousRule}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 relative">
                <div className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 h-6 w-6 bg-white rounded-full border border-slate-200 items-center justify-center z-10 shadow-sm">
                  <ArrowRight className="h-3 w-3 text-slate-400" />
                </div>
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-2">Current Rule</h5>
                <p className="text-sm font-medium text-slate-800 m-0">
                  {impact.currentRule}
                </p>
              </div>
            </div>

          </div>

          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
            {/* Business Impact */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Business Impact
              </h5>
              <p className="text-sm text-slate-700 leading-relaxed">
                {impact.businessImpact}
              </p>
            </div>

            {/* Required Action */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
                <FileWarning className="h-4 w-4" />
                Required Action
              </h5>
              <div className={`p-4 rounded-xl border ${
                impact.riskLevel === "High" ? "bg-red-50 border-red-200" :
                impact.riskLevel === "Medium" ? "bg-amber-50 border-amber-200" :
                "bg-blue-50 border-blue-200"
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className={`h-4 w-4 ${
                    impact.riskLevel === "High" ? "text-red-500" :
                    impact.riskLevel === "Medium" ? "text-amber-500" :
                    "text-blue-500"
                  }`} />
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    impact.riskLevel === "High" ? "text-red-600" :
                    impact.riskLevel === "Medium" ? "text-amber-600" :
                    "text-blue-600"
                  }`}>
                    {impact.riskLevel} Risk Action
                  </span>
                </div>
                <p className={`text-sm font-semibold m-0 ${
                  impact.riskLevel === "High" ? "text-red-900" :
                  impact.riskLevel === "Medium" ? "text-amber-900" :
                  "text-blue-900"
                }`}>
                  {impact.requiredAction}
                </p>
              </div>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}
