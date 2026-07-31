import React from "react";
import { Sparkles, Building2, CalendarX, AlertTriangle, ListChecks } from "lucide-react";

export interface AIChangeSummaryData {
  executiveSummary: string;
  affectedBusinesses: string[];
  complianceDeadline: string;
  riskLevel: "High" | "Medium" | "Low";
  recommendedActions: string[];
}

interface AIChangeSummaryProps {
  summary: AIChangeSummaryData;
}

export function AIChangeSummary({ summary }: AIChangeSummaryProps) {
  if (!summary) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 border border-indigo-100 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
      
      {/* Decorative BG element */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex items-center gap-2 mb-6 border-b border-indigo-100/50 pb-4 relative z-10">
        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 shadow-inner">
          <Sparkles className="h-4 w-4 text-indigo-600" />
        </div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-900 m-0">AI Change Summary</h3>
      </div>

      <div className="space-y-8 relative z-10">
        
        {/* Executive Summary */}
        <div>
          <p className="text-base text-indigo-950 font-medium leading-relaxed m-0">
            {summary.executiveSummary}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Affected Businesses */}
          <div className="bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-2xl p-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-1.5 mb-2">
              <Building2 className="h-3 w-3" /> Affected
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {summary.affectedBusinesses.map((b, i) => (
                <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-md border border-indigo-100">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Compliance Deadline */}
          <div className="bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-2xl p-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-1.5 mb-2">
              <CalendarX className="h-3 w-3" /> Deadline
            </h4>
            <p className="text-sm font-bold text-slate-800 m-0">{summary.complianceDeadline}</p>
          </div>

          {/* Risk Level */}
          <div className="bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-2xl p-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-1.5 mb-2">
              <AlertTriangle className="h-3 w-3" /> Risk Level
            </h4>
            <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${
              summary.riskLevel === "High" ? "bg-red-50 text-red-700 border-red-200" :
              summary.riskLevel === "Medium" ? "bg-amber-50 text-amber-700 border-amber-200" :
              "bg-blue-50 text-blue-700 border-blue-200"
            }`}>
              {summary.riskLevel}
            </span>
          </div>
          
        </div>

        {/* Recommended Actions */}
        <div className="bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-2xl p-5">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-1.5 mb-4">
            <ListChecks className="h-3 w-3" /> Recommended Actions
          </h4>
          <ul className="space-y-3 m-0 p-0 list-none">
            {summary.recommendedActions.map((action, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-700 font-medium leading-relaxed">
                <span className="h-5 w-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 border border-indigo-200">
                  {i + 1}
                </span>
                {action}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
