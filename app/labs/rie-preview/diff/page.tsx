import React from "react";
import { ArticleComparison } from "@/components/rie/diff/ArticleComparison";
import { ChangeImpactAnalysis } from "@/components/rie/diff/ChangeImpactAnalysis";
import { AIChangeSummary } from "@/components/rie/assistant/AIChangeSummary";
import { Printer, Download, Share2 } from "lucide-react";

export default function DiffWorkspacePage() {
  
  const mockImpacts = [
    {
      id: "1",
      previousRule: "Any person responsible for providing to a resident, any benefit or perquisite arising from business or the exercise of a profession, shall, before providing such benefit or perquisite, ensure that tax has been deducted in respect of such benefit or perquisite at the rate of 10%.",
      currentRule: "Any person responsible for providing to a resident, any benefit or perquisite arising from business or the exercise of a profession, whether in cash or in kind or partly in cash and partly in kind, shall, before providing such benefit or perquisite, ensure that tax has been deducted in respect of such benefit or perquisite at the rate of 10%.",
      businessImpact: "The scope of TDS under 194R has been explicitly expanded to include benefits provided wholly in cash.",
      requiredAction: "Update ERP/Payroll systems to track and deduct 10% TDS on cash-based benefits and perquisites.",
      riskLevel: "High" as const
    }
  ];

  const mockDiffSegments = [
    { type: "unchanged" as const, text: "Any person responsible for providing to a resident, any benefit or perquisite arising from business or the exercise of a profession," },
    { type: "added" as const, text: " whether in cash or in kind or partly in cash and partly in kind," },
    { type: "unchanged" as const, text: " shall, before providing such benefit or perquisite, ensure that tax has been deducted in respect of such benefit or perquisite at the rate of 10%." }
  ];

  const mockSummary = {
    executiveSummary: "The Finance Act 2023 amendment explicitly states that TDS under section 194R applies to benefits provided in cash, removing the previous ambiguity.",
    affectedBusinesses: ["Corporates", "Pharmaceuticals", "FMCG"],
    complianceDeadline: "Applicable immediately from next quarter",
    riskLevel: "High" as const,
    recommendedActions: [
      "Audit all cash-based incentive programs.",
      "Update internal AP systems to enforce 10% deduction."
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Regulatory Change Analysis</h1>
            <p className="text-slate-500 mt-2">Section 194R Amendment (Finance Act 2023)</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-primary hover:border-primary/50 transition-colors tooltip-trigger" title="Print Analysis">
              <Printer className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-primary hover:border-primary/50 transition-colors tooltip-trigger" title="Download PDF">
              <Download className="h-5 w-5" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors">
              <Share2 className="h-4 w-4" /> Share Report
            </button>
          </div>
        </div>

        {/* AI Summary */}
        <AIChangeSummary summary={mockSummary} />

        {/* Comparison Engine */}
        <ArticleComparison 
          title="Text Comparison: Section 194R(1)"
          oldVersion="2022.1"
          newVersion="2023.1"
          segments={mockDiffSegments}
        />

        {/* Impact Analysis */}
        <div className="pt-4">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Business Impact Analysis</h2>
          <ChangeImpactAnalysis impacts={mockImpacts} />
        </div>

      </div>

    </div>
  );
}
