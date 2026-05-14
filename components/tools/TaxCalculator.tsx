"use client";

import { useState, useMemo } from "react";
import { CalculatorInputs } from "./CalculatorInputs";
import { compareRegimes, TaxInputs } from "@/lib/tax-calculations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, Info, Landmark, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function TaxCalculator() {
  const [inputs, setInputs] = useState<TaxInputs>({
    grossSalary: 1200000,
    hraExemption: 50000,
    section80C: 150000,
    section80D: 25000,
    otherDeductions: 0,
    interestOnHomeLoan: 0,
  });

  const results = useMemo(() => compareRegimes(inputs), [inputs]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Inputs Section */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Landmark className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Tax Inputs</h2>
            <p className="text-sm text-muted-foreground font-medium">Adjust your income and deductions below</p>
          </div>
        </div>
        <CalculatorInputs inputs={inputs} setInputs={setInputs} />
      </div>

      {/* Results Section */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
            <TrendingDown className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Tax Comparison</h2>
            <p className="text-sm text-muted-foreground font-medium">FY 2024-25 (Latest Budget)</p>
          </div>
        </div>

        {/* Winner Badge */}
        <div className={cn(
          "p-6 rounded-[2rem] border-2 flex flex-col items-center text-center gap-2 transition-all duration-500 shadow-2xl",
          results.recommendation === "NEW" 
            ? "bg-emerald-500/5 border-emerald-500/20" 
            : "bg-blue-500/5 border-blue-500/20"
        )}>
          <div className={cn(
            "h-12 w-12 rounded-full flex items-center justify-center mb-2",
            results.recommendation === "NEW" ? "bg-emerald-500 text-white" : "bg-blue-500 text-white"
          )}>
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">
            {results.recommendation === "NEW" ? "New Regime" : "Old Regime"} is Better!
          </h3>
          <p className="text-3xl font-black text-foreground">
            Save ₹{results.savings.toLocaleString()}
          </p>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">
            Estimated annual savings
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className={cn(
            "rounded-3xl border-primary/10 shadow-lg",
            results.recommendation === "OLD" && "ring-2 ring-primary ring-offset-2"
          )}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Old Regime</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{results.oldRegime.totalTax.toLocaleString()}</div>
              <p className="text-[10px] text-muted-foreground font-medium mt-1">Taxable: ₹{results.oldRegime.taxableIncome.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className={cn(
            "rounded-3xl border-primary/10 shadow-lg",
            results.recommendation === "NEW" && "ring-2 ring-emerald-500 ring-offset-2"
          )}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">New Regime</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{results.newRegime.totalTax.toLocaleString()}</div>
              <p className="text-[10px] text-muted-foreground font-medium mt-1">Taxable: ₹{results.newRegime.taxableIncome.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Info */}
        <div className="p-5 rounded-2xl bg-muted/30 border border-border flex gap-4">
          <Info className="h-5 w-5 text-primary shrink-0" />
          <p className="text-xs font-medium text-muted-foreground leading-relaxed">
            The **New Regime** now includes a standard deduction of **₹75,000** and zero tax up to **₹7.75 Lakh** (including rebate) as per July 2024 budget.
          </p>
        </div>
      </div>
    </div>
  );
}
