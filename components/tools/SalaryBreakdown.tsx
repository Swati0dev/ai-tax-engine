"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Info, TrendingUp, DollarSign, PieChart, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type Period = "monthly" | "yearly";

export function SalaryBreakdown() {
  const [period, setPeriod] = useState<Period>("yearly");
  const [ctc, setCtc] = useState<number>(1500000); // 15 Lakh default
  const [basicPct, setBasicPct] = useState<number>(45); // 45% default
  const [deductEPF, setDeductEPF] = useState<boolean>(true);
  const [deductPT, setDeductPT] = useState<boolean>(true);
  const [deductGratuity, setDeductGratuity] = useState<boolean>(true);

  // Calculations
  const results = useMemo(() => {
    // Basic salary calculation
    const annualBasic = ctc * (basicPct / 100);
    
    // PF deduction (12% of basic, standard cap is ₹1,800/month or ₹21,600/year, but many companies deduct actual 12%)
    // Let's deduct actual 12% of basic for this premium calculator
    const annualEPF = deductEPF ? annualBasic * 0.12 : 0;
    
    // PT deduction (Standard is ₹2,500/year)
    const annualPT = deductPT ? 2500 : 0;
    
    // Gratuity (4.81% of basic salary)
    const annualGratuity = deductGratuity ? annualBasic * 0.0481 : 0;
    
    // Net Taxable Income under New Regime (Standard Deduction = ₹75,000)
    const standardDeduction = 75000;
    const taxableIncome = Math.max(0, ctc - standardDeduction);
    
    // New Tax Regime calculation for FY 2024-25
    let rawTax = 0;
    if (taxableIncome > 300000) {
      if (taxableIncome <= 700000) {
        // Section 87A rebate makes tax zero for taxable income <= 7 Lakhs
        rawTax = 0;
      } else {
        // Calculate standard slab rates
        // Slab 1: Up to 3 Lakh (Nil) -> 0
        // Slab 2: 3 to 7 Lakh (5%) -> 5% of 400,000 = 20,000
        rawTax += 20000;
        
        if (taxableIncome <= 1000000) {
          rawTax += (taxableIncome - 700000) * 0.10;
        } else {
          rawTax += 30000; // Slab 3: 7 to 10 Lakh (10%) = 30,000
          
          if (taxableIncome <= 1200000) {
            rawTax += (taxableIncome - 1000000) * 0.15;
          } else {
            rawTax += 30000; // Slab 4: 10 to 12 Lakh (15%) = 30,000
            
            if (taxableIncome <= 1500000) {
              rawTax += (taxableIncome - 1200000) * 0.20;
            } else {
              rawTax += 60000; // Slab 5: 12 to 15 Lakh (20%) = 60,000
              // Slab 6: Above 15 Lakh (30%)
              rawTax += (taxableIncome - 1500000) * 0.30;
            }
          }
        }
      }
    }
    
    const cess = rawTax * 0.04; // 4% Health & Education Cess
    const annualTax = rawTax + cess;
    
    // Take-home calculation
    const annualDeductions = annualEPF + annualPT + annualGratuity + annualTax;
    const annualTakeHome = Math.max(0, ctc - annualDeductions);
    
    const factor = period === "monthly" ? 1/12 : 1;
    
    return {
      ctc: Math.round(ctc * factor),
      basic: Math.round(annualBasic * factor),
      epf: Math.round(annualEPF * factor),
      pt: Math.round(annualPT * factor),
      gratuity: Math.round(annualGratuity * factor),
      tax: Math.round(annualTax * factor),
      takeHome: Math.round(annualTakeHome * factor),
      totalDeductions: Math.round(annualDeductions * factor),
      annualValues: {
        ctc,
        takeHome: annualTakeHome,
        tax: annualTax,
        deductions: annualDeductions
      }
    };
  }, [ctc, basicPct, deductEPF, deductPT, deductGratuity, period]);

  // Percentages for chart visualization
  const takeHomePct = (results.takeHome / results.ctc) * 100;
  const taxPct = (results.tax / results.ctc) * 100;
  const benefitsPct = ((results.epf + results.gratuity + results.pt) / results.ctc) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Inputs Section */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">CTC Components</h2>
              <p className="text-xs text-muted-foreground font-semibold">Adjust your Gross salary structure</p>
            </div>
          </div>
          
          {/* Period Toggle */}
          <div className="flex bg-muted/60 p-1 rounded-xl border">
            <button
              onClick={() => setPeriod("monthly")}
              className={cn(
                "px-3 py-1.5 text-xs font-bold rounded-lg transition-all",
                period === "monthly" 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setPeriod("yearly")}
              className={cn(
                "px-3 py-1.5 text-xs font-bold rounded-lg transition-all",
                period === "yearly" 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Yearly
            </button>
          </div>
        </div>

        <Card className="rounded-[2rem] border-primary/10 shadow-lg">
          <CardContent className="p-6 space-y-6">
            {/* CTC Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-bold">
                <label htmlFor="ctcAmount" className="text-foreground">Annual Gross CTC</label>
                <span className="text-primary font-mono bg-primary/5 px-2.5 py-1 rounded-lg">
                  ₹{ctc.toLocaleString()}
                </span>
              </div>
              <input
                id="ctcAmount"
                type="range"
                min="300000"
                max="5000000"
                step="50000"
                value={ctc}
                onChange={(e) => setCtc(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-bold">
                <span>₹3,00,000</span>
                <span>₹50,00,000</span>
              </div>
            </div>

            {/* Basic % Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-bold">
                <label htmlFor="basicPct" className="text-foreground flex items-center gap-1">
                  Basic Salary Component
                  <span className="group relative cursor-help">
                    <Info className="h-3.5 w-3.5 text-muted-foreground opacity-60" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 hidden group-hover:block bg-slate-900 text-white text-[10px] rounded-lg p-2 font-medium z-50">
                      Standard basic salary is usually 40% to 50% of the gross CTC.
                    </span>
                  </span>
                </label>
                <span className="text-primary font-mono bg-primary/5 px-2.5 py-1 rounded-lg">
                  {basicPct}% (₹{results.basic.toLocaleString()})
                </span>
              </div>
              <input
                id="basicPct"
                type="range"
                min="30"
                max="60"
                step="5"
                value={basicPct}
                onChange={(e) => setBasicPct(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-bold">
                <span>30%</span>
                <span>60%</span>
              </div>
            </div>

            {/* Toggle Deductions */}
            <div className="border-t pt-6 space-y-4">
              <span className="text-sm font-bold text-foreground block">Optional CTC Deductions</span>
              
              {/* EPF Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-foreground block">Employee Provident Fund (EPF)</span>
                  <span className="text-[10px] text-muted-foreground font-medium">Deducts 12% of Basic Salary (Retirement savings)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setDeductEPF(!deductEPF)}
                  className={cn(
                    "relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                    deductEPF ? "bg-primary" : "bg-zinc-300"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                      deductEPF ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>

              {/* PT Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-foreground block">Professional Tax (PT)</span>
                  <span className="text-[10px] text-muted-foreground font-medium">Flat State tax (approx ₹200/month or ₹2,500/year)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setDeductPT(!deductPT)}
                  className={cn(
                    "relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                    deductPT ? "bg-primary" : "bg-zinc-300"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                      deductPT ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>

              {/* Gratuity Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-foreground block">Deduct Retiral Gratuity</span>
                  <span className="text-[10px] text-muted-foreground font-medium">4.81% of Basic (Paid after 5+ years of continuous service)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setDeductGratuity(!deductGratuity)}
                  className={cn(
                    "relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                    deductGratuity ? "bg-primary" : "bg-zinc-300"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                      deductGratuity ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-teal-500/10 flex items-center justify-center">
            <PieChart className="h-5 w-5 text-teal-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">Take-Home</h2>
            <p className="text-xs text-muted-foreground font-semibold">Your monthly and annual earnings</p>
          </div>
        </div>

        {/* Take Home Salary Card */}
        <div className="p-6 rounded-[2rem] border-2 bg-emerald-500/5 border-emerald-500/20 flex flex-col items-center text-center gap-2 shadow-xl">
          <div className="h-10 w-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-1">
            <DollarSign className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-muted-foreground">Estimated Take-Home</h3>
          <p className="text-4xl font-black text-emerald-600 font-heading">
            ₹{results.takeHome.toLocaleString()}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {period === "monthly" ? "Per Month" : "Per Year"}
          </p>
        </div>

        {/* Stacked Chart Breakdown */}
        <Card className="rounded-[2rem] border-primary/10 shadow-lg">
          <CardContent className="p-6 space-y-6">
            <h4 className="font-bold text-sm text-foreground">CTC Breakdown Component</h4>
            
            {/* Visual Bar */}
            <div className="space-y-2">
              <div className="h-3.5 w-full rounded-full bg-muted overflow-hidden flex">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-500" 
                  style={{ width: `${takeHomePct}%` }}
                />
                <div 
                  className="bg-rose-500 h-full transition-all duration-500" 
                  style={{ width: `${taxPct}%` }}
                />
                <div 
                  className="bg-amber-500 h-full transition-all duration-500" 
                  style={{ width: `${benefitsPct}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold flex-wrap gap-2">
                <span className="text-emerald-600 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Take-home: {Math.round(takeHomePct)}%
                </span>
                <span className="text-rose-500 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  Tax: {Math.round(taxPct)}%
                </span>
                <span className="text-amber-500 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  PF/Deductions: {Math.round(benefitsPct)}%
                </span>
              </div>
            </div>

            <div className="border-t pt-4 space-y-3.5">
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-muted-foreground">Gross Salary (CTC)</span>
                <span className="text-foreground">₹{results.ctc.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-muted-foreground">PF (Provident Fund)</span>
                <span className="text-foreground">₹{results.epf.toLocaleString()}</span>
              </div>
              {deductGratuity && (
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-muted-foreground">Gratuity Contribution</span>
                  <span className="text-foreground">₹{results.gratuity.toLocaleString()}</span>
                </div>
              )}
              {deductPT && (
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-muted-foreground">Professional Tax (PT)</span>
                  <span className="text-foreground">₹{results.pt.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-semibold border-b pb-3.5">
                <span className="text-muted-foreground">Estimated Income Tax</span>
                <span className="text-rose-500 font-bold">₹{results.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold pt-1">
                <span className="text-foreground">Net Payout (Take-home)</span>
                <span className="text-primary font-heading">₹{results.takeHome.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regime Notice Box */}
        <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex gap-4">
          <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-xs font-semibold text-amber-900 leading-relaxed">
            <p className="font-bold">Calculated under New Tax Regime:</p>
            <p className="font-medium text-muted-foreground text-[11px] mt-0.5">
              Tax is calculated utilizing the New Regime slabs with standard deduction of ₹75,000 for FY 2024-25. EPF deductions are not tax-deductible under the New Regime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
