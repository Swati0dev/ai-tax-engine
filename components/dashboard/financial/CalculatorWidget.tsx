"use client";

import { useState, useMemo, useEffect } from "react";
import { Landmark, Loader2, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DocumentUploader } from "@/components/tools/DocumentUploader";
import { triggerConfetti } from "@/components/ui/Confetti";
import { compareRegimes, TaxInputs } from "@/lib/tax-calculations";
import { generateTaxInsights, TaxAIInsight } from "@/actions/ai-recommendations";
import { cn } from "@/lib/utils";

interface SavedCalculationInputs {
  grossSalary: number;
  section80C: number;
  hraExemption: number;
  section80D: number;
}

import { ComparisonResult } from "@/lib/tax-calculations";

interface CalculatorWidgetProps {
  onXpEarned: (amount: number, reason?: string) => void;
  onCalculate?: (results: ComparisonResult) => void;
}

export function CalculatorWidget({ onXpEarned, onCalculate }: CalculatorWidgetProps) {
  // Interactive inputs for tax planner
  const [plannerInputs, setPlannerInputs] = useState<SavedCalculationInputs>({
    grossSalary: 1200000,
    section80C: 150000,
    hraExemption: 50000,
    section80D: 25000
  });

  // Saved tax regime state preference
  const [preferredRegime, setPreferredRegime] = useState<"NEW" | "OLD">("NEW");

  // AI Recommendation State
  const [aiInsight, setAiInsight] = useState<TaxAIInsight | null>(null);
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedCalc = localStorage.getItem("tax-dashboard-calculation");
    if (savedCalc) {
      try {
        setPlannerInputs(JSON.parse(savedCalc));
      } catch {}
    }
    const savedRegime = localStorage.getItem("tax-dashboard-regime");
    if (savedRegime === "OLD" || savedRegime === "NEW") {
      setPreferredRegime(savedRegime);
    }
  }, []);

  // Clear old AI insight if inputs change
  useEffect(() => {
    setAiInsight(null);
  }, [plannerInputs]);

  // Recalculate tax comparison on inputs change
  const taxResults = useMemo(() => {
    const inputs: TaxInputs = {
      grossSalary: plannerInputs.grossSalary,
      hraExemption: plannerInputs.hraExemption,
      section80C: plannerInputs.section80C,
      section80D: plannerInputs.section80D,
      otherDeductions: 0,
      interestOnHomeLoan: 0
    };
    return compareRegimes(inputs);
  }, [plannerInputs]);

  useEffect(() => {
    if (onCalculate) {
      onCalculate(taxResults);
    }
  }, [taxResults, onCalculate]);

  const handleGenerateInsight = async () => {
    setIsGeneratingInsight(true);
    setAiInsight(null);
    try {
      const inputs: TaxInputs = {
        grossSalary: plannerInputs.grossSalary,
        hraExemption: plannerInputs.hraExemption,
        section80C: plannerInputs.section80C,
        section80D: plannerInputs.section80D,
        otherDeductions: 0,
        interestOnHomeLoan: 0
      };
      
      const res = await generateTaxInsights(inputs, taxResults);
      if (res.success && res.data) {
        setAiInsight(res.data);
        onXpEarned(20, "AI Insight Generated");
        triggerConfetti();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingInsight(false);
    }
  };

  // Handle calculator input changes & save them
  const updatePlannerInput = (key: keyof SavedCalculationInputs, val: number) => {
    const nextInputs = { ...plannerInputs, [key]: val };
    setPlannerInputs(nextInputs);
    if (typeof window !== "undefined") {
      localStorage.setItem("tax-dashboard-calculation", JSON.stringify(nextInputs));
    }
  };

  // Handle successful PDF extraction
  const handleExtractSuccess = (data: Partial<SavedCalculationInputs> & { tds?: number }) => {
    const nextInputs = {
      grossSalary: data.grossSalary || plannerInputs.grossSalary,
      section80C: data.section80C || plannerInputs.section80C,
      hraExemption: data.hraExemption || plannerInputs.hraExemption,
      section80D: data.section80D || plannerInputs.section80D,
    };
    setPlannerInputs(nextInputs);
    if (typeof window !== "undefined") {
      localStorage.setItem("tax-dashboard-calculation", JSON.stringify(nextInputs));
    }
    // Gamification reward for uploading
    onXpEarned(50, "Document Extracted");
    triggerConfetti();
  };

  // Toggle regime preference
  const togglePreferredRegime = () => {
    const nextRegime = preferredRegime === "NEW" ? "OLD" : "NEW";
    setPreferredRegime(nextRegime);
    if (typeof window !== "undefined") {
      localStorage.setItem("tax-dashboard-regime", nextRegime);
    }
  };

  return (
    <Card className="rounded-[2.5rem] border-primary/10 shadow-xl overflow-hidden bg-white">
      <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Landmark className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">Interactive Tax Savings Planner</h3>
            <p className="text-xs text-muted-foreground font-semibold">Simulate deductions to estimate tax liability</p>
          </div>
        </div>

        {/* Preference toggle selection */}
        <button
          onClick={togglePreferredRegime}
          className={cn(
            "px-3 py-1.5 rounded-xl border text-[10px] font-black tracking-widest uppercase transition-all cursor-pointer",
            preferredRegime === "NEW" 
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 font-bold" 
              : "bg-blue-500/10 border-blue-500/20 text-blue-600 font-bold"
          )}
          title="Change Regime Preference"
        >
          Regime Preference: {preferredRegime}
        </button>
      </div>

      <CardContent className="p-6 md:p-8 space-y-8">
        {/* Form 16 Uploader */}
        <div className="w-full bg-slate-50 border border-slate-100 p-6 rounded-[2rem]">
          <DocumentUploader onExtractSuccess={handleExtractSuccess} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Inputs Sliders */}
          <div className="md:col-span-7 space-y-5">
            {/* Gross salary */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <label htmlFor="grossSalary" className="text-muted-foreground">Gross Salary / CTC</label>
                <span className="font-mono text-primary bg-primary/5 px-2 py-0.5 rounded">
                  ₹{plannerInputs.grossSalary.toLocaleString()}
                </span>
              </div>
              <input 
                id="grossSalary"
                type="range"
                min="300000"
                max="3000000"
                step="50000"
                value={plannerInputs.grossSalary}
                onChange={(e) => updatePlannerInput("grossSalary", Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Section 80C */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <label htmlFor="section80C" className="text-muted-foreground">Section 80C Deductions (PPF, ELSS...)</label>
                <span className="font-mono text-primary bg-primary/5 px-2 py-0.5 rounded">
                  ₹{plannerInputs.section80C.toLocaleString()}
                </span>
              </div>
              <input 
                id="section80C"
                type="range"
                min="0"
                max="150000"
                step="5000"
                value={plannerInputs.section80C}
                onChange={(e) => updatePlannerInput("section80C", Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* HRA Exemption */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <label htmlFor="hraExemption" className="text-muted-foreground">Rent Paid / HRA Exemption</label>
                <span className="font-mono text-primary bg-primary/5 px-2 py-0.5 rounded">
                  ₹{plannerInputs.hraExemption.toLocaleString()}
                </span>
              </div>
              <input 
                id="hraExemption"
                type="range"
                min="0"
                max="300000"
                step="10000"
                value={plannerInputs.hraExemption}
                onChange={(e) => updatePlannerInput("hraExemption", Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>

          {/* Comparison Visual Display */}
          <div className="md:col-span-5 flex flex-col justify-center bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
            <div className="space-y-4 text-center">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block">Estimated Liability Comparison</span>
              
              {/* Basic Slabs Visual Chart */}
              <div className="space-y-3.5">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-muted-foreground">Old Tax Regime</span>
                    <span className="text-foreground">₹{taxResults.oldRegime.totalTax.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full transition-all duration-300"
                      style={{ 
                        width: `${Math.max(10, Math.min(100, (taxResults.oldRegime.totalTax / (plannerInputs.grossSalary || 1)) * 100 * 4))}%` 
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-muted-foreground">New Tax Regime</span>
                    <span className="text-foreground">₹{taxResults.newRegime.totalTax.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-600 h-full transition-all duration-300"
                      style={{ 
                        width: `${Math.max(10, Math.min(100, (taxResults.newRegime.totalTax / (plannerInputs.grossSalary || 1)) * 100 * 4))}%` 
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-dashed border-slate-200">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-black uppercase">
                  Recommended: {taxResults.recommendation} REGIME
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleGenerateInsight}
                  disabled={isGeneratingInsight}
                  className={cn(
                    "w-full rounded-2xl py-3 text-xs font-bold text-white transition-all shadow-md flex items-center justify-center gap-2",
                    isGeneratingInsight 
                      ? "bg-slate-400 cursor-not-allowed shadow-none" 
                      : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 shadow-purple-500/20"
                  )}
                >
                  {isGeneratingInsight ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Analyzing your tax profile...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Ask AI for Insights ✨
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* AI Insights Result Card */}
            {aiInsight && (
              <div className="mt-6 p-6 rounded-[2rem] bg-gradient-to-br from-indigo-500/5 to-purple-500/10 border border-purple-500/20 text-left relative overflow-hidden backdrop-blur-sm shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="absolute right-0 top-0 h-32 w-32 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
                
                <div className="space-y-4 relative z-10">
                  <div>
                    <h4 className="text-xs font-black text-indigo-700 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3" />
                      AI Tax Verdict
                    </h4>
                    <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                      {aiInsight.insight}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-purple-500/20">
                    <h4 className="text-[10px] font-black text-purple-700 uppercase tracking-widest mb-2">
                      Actionable Optimization
                    </h4>
                    <ul className="space-y-2">
                      {aiInsight.actionableAdvice.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="h-4 w-4 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-[8px] font-black text-purple-700">{idx + 1}</span>
                          </div>
                          <p className="text-xs font-medium text-slate-700">{tip}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
