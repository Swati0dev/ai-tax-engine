"use client";

import { useState, useMemo } from "react";
import { InvestmentChecklist, InvestmentData } from "./InvestmentChecklist";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, TrendingUp, AlertCircle, Target, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function InvestmentPlanner80C() {
  const [data, setData] = useState<InvestmentData>({
    epf: 0,
    ppf: 0,
    elss: 0,
    lic: 0,
    tuition: 0,
    homeLoanPrincipal: 0,
    ssy: 0,
    taxSavingFD: 0,
  });

  const LIMIT = 150000;

  const totalInvestment = useMemo(() => {
    return Object.values(data).reduce((acc, curr) => acc + curr, 0);
  }, [data]);

  const percentage = Math.min(100, (totalInvestment / LIMIT) * 100);
  const remaining = Math.max(0, LIMIT - totalInvestment);

  return (
    <div className="flex flex-col gap-8">
      {/* Top Warning Banner */}
      <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center gap-3">
        <AlertCircle className="h-5 w-5 text-orange-600" />
        <p className="text-sm font-bold text-orange-900">
          Note: Section 80C deductions are only available in the <span className="underline">Old Tax Regime</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Checklist */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Investment Tracker</h2>
              <p className="text-sm text-muted-foreground font-medium">Enter your annual tax-saving contributions</p>
            </div>
          </div>
          <InvestmentChecklist data={data} setData={setData} />
        </div>

        {/* Right: Progress & Advice */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="p-8 rounded-[2.5rem] bg-background/50 backdrop-blur-xl border border-primary/10 shadow-2xl flex flex-col items-center text-center">
            {/* Visual Progress Meter */}
            <div className="relative h-48 w-48 flex items-center justify-center mb-6">
              <svg className="h-full w-full -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-muted/20"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeDasharray={552.92}
                  strokeDashoffset={552.92 - (552.92 * percentage) / 100}
                  strokeLinecap="round"
                  className={cn(
                    "transition-all duration-1000 ease-out",
                    percentage >= 100 ? "text-emerald-500" : "text-primary"
                  )}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black">{Math.round(percentage)}%</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Utilized</span>
              </div>
            </div>

            <div className="space-y-1 mb-8">
              <h3 className="text-2xl font-black">₹{totalInvestment.toLocaleString()}</h3>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total of ₹1,50,000</p>
            </div>

            {remaining > 0 ? (
              <div className="w-full p-6 rounded-3xl bg-primary/5 border border-primary/10 space-y-4">
                <div className="flex items-center justify-center gap-2 text-primary">
                  <Target className="h-4 w-4" />
                  <span className="text-sm font-bold uppercase tracking-wider">Remaining Gap</span>
                </div>
                <p className="text-3xl font-black text-foreground">₹{remaining.toLocaleString()}</p>
                <div className="pt-4 border-t border-dashed border-primary/20">
                  <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                    You can still save approx. <span className="text-foreground font-bold">₹{(remaining * 0.3).toLocaleString()}*</span> in taxes by filling this gap.
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                <div className="flex items-center justify-center gap-2 text-emerald-600">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-bold uppercase tracking-wider">Goal Reached!</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">You have fully utilized your Section 80C limit for this year.</p>
              </div>
            )}
          </div>

          {/* Smart Recommendations */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-2">Smart Suggestions</h3>
            
            <div className="p-5 rounded-2xl bg-white border shadow-sm group hover:border-primary/50 transition-colors">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold">Consider ELSS for Growth</h4>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    If you have a gap and high risk appetite, ELSS funds offer the shortest lock-in (3 yrs) and potentially higher returns.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border shadow-sm group hover:border-emerald-500/50 transition-colors">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold">PPF for Maximum Safety</h4>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    For tax-free interest and 100% capital safety, Public Provident Fund remains the gold standard for long-term planning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
