"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Info, Calendar, ShieldCheck, AlertCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdvanceTaxCalculator() {
  const [estimatedTax, setEstimatedTax] = useState<number>(50000);

  const installments = useMemo(() => {
    const isDue = estimatedTax >= 10000;
    
    // Installment percentages: June 15 (15%), Sept 15 (45%), Dec 15 (75%), March 15 (100%)
    const june15Pct = 15;
    const sept15Pct = 45;
    const dec15Pct = 75;
    const march15Pct = 100;

    const juneAmt = isDue ? estimatedTax * (june15Pct / 100) : 0;
    const septAmt = isDue ? estimatedTax * ((sept15Pct - june15Pct) / 100) : 0;
    const decAmt = isDue ? estimatedTax * ((dec15Pct - sept15Pct) / 100) : 0;
    const marchAmt = isDue ? estimatedTax * ((march15Pct - dec15Pct) / 100) : 0;

    return {
      isDue,
      june: {
        percentage: june15Pct,
        installment: Math.round(juneAmt),
        cumulative: Math.round(estimatedTax * (june15Pct / 100)),
        dueDate: "June 15, 2024"
      },
      sept: {
        percentage: sept15Pct - june15Pct,
        installment: Math.round(septAmt),
        cumulative: Math.round(estimatedTax * (sept15Pct / 100)),
        dueDate: "September 15, 2024"
      },
      dec: {
        percentage: dec15Pct - sept15Pct,
        installment: Math.round(decAmt),
        cumulative: Math.round(estimatedTax * (dec15Pct / 100)),
        dueDate: "December 15, 2024"
      },
      march: {
        percentage: march15Pct - dec15Pct,
        installment: Math.round(marchAmt),
        cumulative: Math.round(estimatedTax * (march15Pct / 100)),
        dueDate: "March 15, 2025"
      }
    };
  }, [estimatedTax]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Inputs Section */}
      <div className="lg:col-span-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">Estimated Tax</h2>
            <p className="text-xs text-muted-foreground font-semibold">Enter your total tax liability for the year</p>
          </div>
        </div>

        <Card className="rounded-[2rem] border-primary/10 shadow-lg">
          <CardContent className="p-6 space-y-6">
            {/* Annual Tax Liability */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-bold">
                <label htmlFor="annualTax" className="text-foreground">Estimated Annual Tax Liability</label>
                <input
                  type="number"
                  value={estimatedTax === 0 ? "" : estimatedTax}
                  onChange={(e) => setEstimatedTax(Math.max(0, Number(e.target.value)))}
                  className="w-36 bg-primary/5 border border-primary/10 rounded-xl px-3 py-1 text-right font-mono font-bold text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <input
                id="annualTax"
                type="range"
                min="0"
                max="500000"
                step="5000"
                value={estimatedTax}
                onChange={(e) => setEstimatedTax(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-bold">
                <span>₹0</span>
                <span>₹5,00,000</span>
              </div>
            </div>

            {/* Disclaimer box */}
            <div className="p-4 rounded-xl bg-slate-50 border text-xs font-semibold text-muted-foreground leading-relaxed">
              <p className="font-bold text-foreground mb-1">What is Estimated Tax Liability?</p>
              <p className="font-medium text-[11px]">
                This is your total tax liability calculated after deducting all applicable deductions (80C, 80D, HRA) and TDS already deducted by your employer or clients.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Warning or Success Message */}
        {!installments.isDue ? (
          <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex gap-4">
            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs font-semibold text-emerald-900 leading-relaxed">
              <p className="font-bold">No Advance Tax Required</p>
              <p className="font-medium text-muted-foreground text-[11px] mt-0.5">
                Advance tax is only payable if your estimated net tax liability (after TDS deductions) is **₹10,000 or more** in a financial year.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex gap-4">
            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-xs font-semibold text-amber-900 leading-relaxed">
              <p className="font-bold">Advance Tax Liability Applies</p>
              <p className="font-medium text-muted-foreground text-[11px] mt-0.5">
                Your estimated tax exceeds ₹10,000. You are legally required to make installment payments on the specified due dates to avoid interest penalties under Sections 234B and 234C.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Due Dates Timeline Section */}
      <div className="lg:col-span-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-teal-500/10 flex items-center justify-center">
            <Calendar className="h-5 w-5 text-teal-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">Installment Schedule</h2>
            <p className="text-xs text-muted-foreground font-semibold">Filing timelines and amounts</p>
          </div>
        </div>

        {/* Due Dates Timeline */}
        <div className="relative border-l-2 border-primary/20 pl-6 ml-4 space-y-8 py-2">
          {/* June 15 */}
          <div className="relative">
            <span className="absolute -left-9 top-1 bg-white border-2 border-primary h-6 w-6 rounded-full flex items-center justify-center font-bold text-[10px] text-primary">
              1
            </span>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-foreground">{installments.june.dueDate}</span>
                <span className="text-xs font-bold text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-lg">15% Cumulative</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted-foreground font-semibold">Installment Due</span>
                  <span className="block font-heading text-lg font-bold text-foreground">₹{installments.june.installment.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground font-bold uppercase block">Cumulative Total</span>
                  <span className="text-xs font-bold text-primary">₹{installments.june.cumulative.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sept 15 */}
          <div className="relative">
            <span className="absolute -left-9 top-1 bg-white border-2 border-primary h-6 w-6 rounded-full flex items-center justify-center font-bold text-[10px] text-primary">
              2
            </span>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-foreground">{installments.sept.dueDate}</span>
                <span className="text-xs font-bold text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-lg">45% Cumulative</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted-foreground font-semibold">Installment Due</span>
                  <span className="block font-heading text-lg font-bold text-foreground">₹{installments.sept.installment.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground font-bold uppercase block">Cumulative Total</span>
                  <span className="text-xs font-bold text-primary">₹{installments.sept.cumulative.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dec 15 */}
          <div className="relative">
            <span className="absolute -left-9 top-1 bg-white border-2 border-primary h-6 w-6 rounded-full flex items-center justify-center font-bold text-[10px] text-primary">
              3
            </span>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-foreground">{installments.dec.dueDate}</span>
                <span className="text-xs font-bold text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-lg">75% Cumulative</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted-foreground font-semibold">Installment Due</span>
                  <span className="block font-heading text-lg font-bold text-foreground">₹{installments.dec.installment.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground font-bold uppercase block">Cumulative Total</span>
                  <span className="text-xs font-bold text-primary">₹{installments.dec.cumulative.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* March 15 */}
          <div className="relative">
            <span className="absolute -left-9 top-1 bg-white border-2 border-primary h-6 w-6 rounded-full flex items-center justify-center font-bold text-[10px] text-primary">
              4
            </span>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-foreground">{installments.march.dueDate}</span>
                <span className="text-xs font-bold text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-lg">100% Cumulative</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted-foreground font-semibold">Installment Due</span>
                  <span className="block font-heading text-lg font-bold text-foreground">₹{installments.march.installment.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground font-bold uppercase block">Cumulative Total</span>
                  <span className="text-xs font-bold text-primary">₹{installments.march.cumulative.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Penalties Notice Box */}
        {installments.isDue && (
          <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/10 flex gap-4">
            <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
            <div className="text-xs font-semibold text-rose-950 leading-relaxed">
              <p className="font-bold">Interest Penalty for Defaults:</p>
              <ul className="list-disc pl-4 mt-1 font-medium text-muted-foreground text-[11px] space-y-1">
                <li><strong>Section 234C:</strong> Interest of **1% per month** for 3 months applies to shortfalls in June, September, and December installments, and 1% for 1 month for March.</li>
                <li><strong>Section 234B:</strong> Interest of **1% per month** applies from April 1 if you fail to pay at least 90% of your total tax liability as advance tax by March 31.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
