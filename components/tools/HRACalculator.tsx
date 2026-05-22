"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Info, Home, ShieldCheck, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Period = "monthly" | "yearly";

export function HRACalculator() {
  const [period, setPeriod] = useState<Period>("monthly");
  
  // Input states (stored as monthly values)
  const [basicSalary, setBasicSalary] = useState<number>(50000);
  const [da, setDa] = useState<number>(0);
  const [hraReceived, setHraReceived] = useState<number>(20000);
  const [rentPaid, setRentPaid] = useState<number>(15000);
  const [isMetro, setIsMetro] = useState<boolean>(true);

  // Calculations
  const results = useMemo(() => {
    // Convert current inputs to annual for standard calculations
    const annualBasic = basicSalary * 12;
    const annualDA = da * 12;
    const annualHraReceived = hraReceived * 12;
    const annualRentPaid = rentPaid * 12;
    
    const salaryForHra = annualBasic + annualDA;
    
    // Formula 1: Actual HRA received
    const rule1 = annualHraReceived;
    
    // Formula 2: Rent paid minus 10% of salary
    const rule2 = Math.max(0, annualRentPaid - (0.1 * salaryForHra));
    
    // Formula 3: 50% of salary for metro, 40% for non-metro
    const rule3 = salaryForHra * (isMetro ? 0.5 : 0.4);
    
    // Exempt HRA is minimum of the three
    const exemptAnnual = Math.min(rule1, rule2, rule3);
    const taxableAnnual = Math.max(0, annualHraReceived - exemptAnnual);
    
    const factor = period === "monthly" ? 1/12 : 1;
    
    return {
      exempt: Math.round(exemptAnnual * factor),
      taxable: Math.round(taxableAnnual * factor),
      totalHra: Math.round(annualHraReceived * factor),
      rentPaidLimit: Math.round(annualRentPaid * factor),
      salaryForHra: Math.round(salaryForHra * factor),
      rules: {
        actualHra: Math.round(rule1 * factor),
        rentMinusTen: Math.round(rule2 * factor),
        cityPct: Math.round(rule3 * factor)
      }
    };
  }, [basicSalary, da, hraReceived, rentPaid, isMetro, period]);

  const taxablePct = results.totalHra > 0 ? (results.taxable / results.totalHra) * 100 : 0;
  const exemptPct = results.totalHra > 0 ? (results.exempt / results.totalHra) * 100 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Inputs Panel */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Home className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">HRA Parameters</h2>
              <p className="text-xs text-muted-foreground font-semibold">Enter your salary details and rent payments</p>
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
            {/* Basic Salary */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-bold">
                <label htmlFor="basicSalary" className="text-foreground">Basic Salary</label>
                <span className="text-primary font-mono bg-primary/5 px-2.5 py-1 rounded-lg">
                  ₹{(period === "monthly" ? basicSalary : basicSalary * 12).toLocaleString()}
                </span>
              </div>
              <input
                id="basicSalary"
                type="range"
                min={period === "monthly" ? "10000" : "120000"}
                max={period === "monthly" ? "300000" : "3600000"}
                step={period === "monthly" ? "1000" : "12000"}
                value={period === "monthly" ? basicSalary : basicSalary * 12}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setBasicSalary(period === "monthly" ? val : Math.round(val / 12));
                }}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-bold">
                <span>{period === "monthly" ? "₹10,000" : "₹1.2 Lakh"}</span>
                <span>{period === "monthly" ? "₹3,00,000" : "₹36 Lakh"}</span>
              </div>
            </div>

            {/* Dearness Allowance */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-bold">
                <label htmlFor="da" className="text-foreground flex items-center gap-1">
                  Dearness Allowance (DA)
                  <span className="group relative cursor-help">
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground opacity-60" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 hidden group-hover:block bg-slate-900 text-white text-[10px] rounded-lg p-2 font-medium z-50">
                      DA is added to Basic Salary for HRA calculation purposes.
                    </span>
                  </span>
                </label>
                <span className="text-primary font-mono bg-primary/5 px-2.5 py-1 rounded-lg">
                  ₹{(period === "monthly" ? da : da * 12).toLocaleString()}
                </span>
              </div>
              <input
                id="da"
                type="range"
                min="0"
                max={period === "monthly" ? "100000" : "1200000"}
                step={period === "monthly" ? "1000" : "12000"}
                value={period === "monthly" ? da : da * 12}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setDa(period === "monthly" ? val : Math.round(val / 12));
                }}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-bold">
                <span>₹0</span>
                <span>{period === "monthly" ? "₹1,00,000" : "₹12 Lakh"}</span>
              </div>
            </div>

            {/* HRA Received */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-bold">
                <label htmlFor="hraReceived" className="text-foreground">HRA Received</label>
                <span className="text-primary font-mono bg-primary/5 px-2.5 py-1 rounded-lg">
                  ₹{(period === "monthly" ? hraReceived : hraReceived * 12).toLocaleString()}
                </span>
              </div>
              <input
                id="hraReceived"
                type="range"
                min={period === "monthly" ? "5000" : "60000"}
                max={period === "monthly" ? "150000" : "1800000"}
                step={period === "monthly" ? "500" : "6000"}
                value={period === "monthly" ? hraReceived : hraReceived * 12}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setHraReceived(period === "monthly" ? val : Math.round(val / 12));
                }}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-bold">
                <span>{period === "monthly" ? "₹5,000" : "₹60k"}</span>
                <span>{period === "monthly" ? "₹1,50,000" : "₹18 Lakh"}</span>
              </div>
            </div>

            {/* Rent Paid */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-bold">
                <label htmlFor="rentPaid" className="text-foreground">Rent Paid</label>
                <span className="text-primary font-mono bg-primary/5 px-2.5 py-1 rounded-lg">
                  ₹{(period === "monthly" ? rentPaid : rentPaid * 12).toLocaleString()}
                </span>
              </div>
              <input
                id="rentPaid"
                type="range"
                min="0"
                max={period === "monthly" ? "150000" : "1800000"}
                step={period === "monthly" ? "500" : "6000"}
                value={period === "monthly" ? rentPaid : rentPaid * 12}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setRentPaid(period === "monthly" ? val : Math.round(val / 12));
                }}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-bold">
                <span>₹0</span>
                <span>{period === "monthly" ? "₹1,50,000" : "₹18 Lakh"}</span>
              </div>
            </div>

            {/* Metro vs Non-Metro Toggle */}
            <div className="pt-2">
              <label className="text-sm font-bold text-foreground block mb-3">Residential Location</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setIsMetro(true)}
                  className={cn(
                    "p-4 rounded-2xl border-2 font-bold text-sm text-center transition-all",
                    isMetro 
                      ? "border-primary bg-primary/5 text-primary" 
                      : "border-border hover:border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  Metro City
                  <span className="block text-[10px] opacity-75 font-normal mt-1">Delhi, Mumbai, Kolkata, Chennai (50% rule)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsMetro(false)}
                  className={cn(
                    "p-4 rounded-2xl border-2 font-bold text-sm text-center transition-all",
                    !isMetro 
                      ? "border-primary bg-primary/5 text-primary" 
                      : "border-border hover:border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  Non-Metro City
                  <span className="block text-[10px] opacity-75 font-normal mt-1">All other cities in India (40% rule)</span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Panel */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-teal-500/10 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-teal-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">HRA Calculations</h2>
            <p className="text-xs text-muted-foreground font-semibold">Exempt vs Taxable tax savings</p>
          </div>
        </div>

        {/* HRA Exemption Summary Card */}
        <div className="p-6 rounded-[2rem] border-2 bg-emerald-500/5 border-emerald-500/20 flex flex-col items-center text-center gap-2 shadow-xl">
          <div className="h-10 w-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-1">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-muted-foreground">Exempt HRA (Tax-Free)</h3>
          <p className="text-4xl font-black text-emerald-600 font-heading">
            ₹{results.exempt.toLocaleString()}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {period === "monthly" ? "Per Month" : "Per Year"}
          </p>
        </div>

        {/* Breakdown Card */}
        <Card className="rounded-[2rem] border-primary/10 shadow-lg overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <h4 className="font-bold text-sm text-foreground">Breakdown of HRA</h4>
            
            {/* Visual Bar */}
            <div className="space-y-2">
              <div className="h-3 w-full rounded-full bg-muted overflow-hidden flex">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-500" 
                  style={{ width: `${exemptPct}%` }}
                />
                <div 
                  className="bg-rose-500 h-full transition-all duration-500" 
                  style={{ width: `${taxablePct}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-bold">
                <span className="text-emerald-600 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Exempt: {Math.round(exemptPct)}%
                </span>
                <span className="text-rose-500 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  Taxable: {Math.round(taxablePct)}%
                </span>
              </div>
            </div>

            <div className="border-t pt-4 space-y-3.5">
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-muted-foreground">Total HRA Received</span>
                <span className="text-foreground">₹{results.totalHra.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-muted-foreground">Exempt Portion</span>
                <span className="text-emerald-600">₹{results.exempt.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-muted-foreground">Taxable Portion</span>
                <span className="text-rose-500">₹{results.taxable.toLocaleString()}</span>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2 text-xs font-medium text-muted-foreground">
              <div className="font-bold text-foreground mb-1">How it is calculated (Rule Minimums):</div>
              <div className="flex justify-between">
                <span>1. Actual HRA received:</span>
                <span className="font-mono">₹{results.rules.actualHra.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>2. Rent paid - 10% salary:</span>
                <span className="font-mono">₹{results.rules.rentMinusTen.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>3. City ceiling ({isMetro ? "50%" : "40%"} salary):</span>
                <span className="font-mono">₹{results.rules.cityPct.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tip Box */}
        <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex gap-4">
          <Info className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-xs font-semibold text-amber-900 leading-relaxed space-y-1">
            <p className="font-bold">HRA Tax Saving Tip:</p>
            <p className="font-medium text-muted-foreground text-[11px]">
              Deductions are only valid under the **Old Tax Regime**. Ensure you have formal rent receipts, landlord PAN (if annual rent exceeds ₹1 Lakh), and a valid rent agreement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
