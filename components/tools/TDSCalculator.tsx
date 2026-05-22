"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Info, Briefcase, FileSpreadsheet, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type Section = "192" | "194C" | "194J" | "194I";

export function TDSCalculator() {
  const [section, setSection] = useState<Section>("194J");
  const [amount, setAmount] = useState<number>(50000);
  
  // Sub-categories
  const [payee194C, setPayee194C] = useState<"individual" | "corporate">("individual");
  const [service194J, setService194J] = useState<"professional" | "technical">("professional");
  const [rentType194I, setRentType194I] = useState<"property" | "machinery">("property");
  const [hasPAN, setHasPAN] = useState<boolean>(true);

  // Rate & Threshold logic
  const details = useMemo(() => {
    let rate = 0;
    let thresholdText = "";
    let thresholdExceeded = false;
    let description = "";

    if (!hasPAN) {
      rate = 20; // Section 206AA - No PAN means flat 20% TDS
      return {
        rate,
        description: "Flat rate applied due to absence of valid PAN Card (Section 206AA).",
        thresholdText: "Threshold limits do not apply when PAN is missing.",
        thresholdExceeded: true
      };
    }

    switch (section) {
      case "192":
        rate = 15; // Standard mock rate for salary TDS
        description = "TDS on Salaried Income. Deducted monthly by employer based on average slab rate.";
        thresholdText = "Exemption limit of ₹3,00,000 (New regime) / ₹2,50,000 (Old regime) annual income.";
        thresholdExceeded = amount > 25000; // Monthly equivalent
        break;
      case "194C":
        rate = payee194C === "individual" ? 1 : 2;
        description = `TDS on Payment to Contractors. ${payee194C === "individual" ? "Individual/HUF payee (1% rate)" : "Company/Corporate payee (2% rate)"}.`;
        thresholdText = "TDS applies if a single invoice exceeds ₹30,000 or aggregate annual exceeds ₹1,00,000.";
        thresholdExceeded = amount > 30000;
        break;
      case "194J":
        rate = service194J === "professional" ? 10 : 2;
        description = `TDS on Professional or Technical Fees. ${service194J === "professional" ? "Professional Fees / Royalty (10% rate)" : "Technical Services / Call Center (2% rate)"}.`;
        thresholdText = "TDS applies if aggregate payment in a financial year exceeds ₹30,000.";
        thresholdExceeded = amount > 30000;
        break;
      case "194I":
        rate = rentType194I === "property" ? 10 : 2;
        description = `TDS on Rent Payments. ${rentType194I === "property" ? "Rent on Land, Building, or Furniture (10% rate)" : "Rent on Plant & Machinery (2% rate)"}.`;
        thresholdText = "TDS applies if aggregate annual rent exceeds ₹2,40,000.";
        thresholdExceeded = amount > 20000; // Approx monthly threshold
        break;
    }

    return {
      rate,
      description,
      thresholdText,
      thresholdExceeded
    };
  }, [section, amount, payee194C, service194J, rentType194I, hasPAN]);

  const results = useMemo(() => {
    const tdsAmount = amount * (details.rate / 100);
    const netAmount = Math.max(0, amount - tdsAmount);

    return {
      tds: Math.round(tdsAmount),
      net: Math.round(netAmount),
      rateApplied: details.rate
    };
  }, [amount, details]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Inputs Section */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">TDS Parameters</h2>
            <p className="text-xs text-muted-foreground font-semibold">Select relevant tax section and amount</p>
          </div>
        </div>

        <Card className="rounded-[2rem] border-primary/10 shadow-lg">
          <CardContent className="p-6 space-y-6">
            {/* Section Selection Buttons */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground block">Select Section of IT Act</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "192", label: "Sec 192", detail: "Salary" },
                  { id: "194C", label: "Sec 194C", detail: "Contract" },
                  { id: "194J", label: "Sec 194J", detail: "Professional" },
                  { id: "194I", label: "Sec 194I", detail: "Rent" }
                ].map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setSection(sec.id as Section)}
                    className={cn(
                      "p-3 rounded-xl border-2 font-bold text-xs text-center flex flex-col items-center justify-center transition-all",
                      section === sec.id
                        ? "border-primary bg-primary/5 text-primary shadow-sm"
                        : "border-border hover:border-muted-foreground/30 text-muted-foreground"
                    )}
                  >
                    <span>{sec.label}</span>
                    <span className="text-[9px] opacity-75 font-normal mt-0.5">{sec.detail}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-options based on Section */}
            {section === "194C" && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground block">Payee Category</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPayee194C("individual")}
                    className={cn(
                      "p-3 rounded-xl border-2 font-bold text-xs text-center transition-all",
                      payee194C === "individual" ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground"
                    )}
                  >
                    Individual / HUF (1%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayee194C("corporate")}
                    className={cn(
                      "p-3 rounded-xl border-2 font-bold text-xs text-center transition-all",
                      payee194C === "corporate" ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground"
                    )}
                  >
                    Others / Corporate (2%)
                  </button>
                </div>
              </div>
            )}

            {section === "194J" && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground block">Service Category</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setService194J("professional")}
                    className={cn(
                      "p-3 rounded-xl border-2 font-bold text-xs text-center transition-all",
                      service194J === "professional" ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground"
                    )}
                  >
                    Professional / Royalty (10%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setService194J("technical")}
                    className={cn(
                      "p-3 rounded-xl border-2 font-bold text-xs text-center transition-all",
                      service194J === "technical" ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground"
                    )}
                  >
                    Technical / Call Center (2%)
                  </button>
                </div>
              </div>
            )}

            {section === "194I" && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground block">Rent Subject Matter</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRentType194I("property")}
                    className={cn(
                      "p-3 rounded-xl border-2 font-bold text-xs text-center transition-all",
                      rentType194I === "property" ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground"
                    )}
                  >
                    Land, Building & Furniture (10%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRentType194I("machinery")}
                    className={cn(
                      "p-3 rounded-xl border-2 font-bold text-xs text-center transition-all",
                      rentType194I === "machinery" ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground"
                    )}
                  >
                    Plant & Machinery (2%)
                  </button>
                </div>
              </div>
            )}

            {/* Base Amount */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-bold">
                <label htmlFor="tdsAmount" className="text-foreground">Payment Amount (₹)</label>
                <input
                  type="number"
                  value={amount === 0 ? "" : amount}
                  onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                  className="w-36 bg-primary/5 border border-primary/10 rounded-xl px-3 py-1 text-right font-mono font-bold text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <input
                id="tdsAmount"
                type="range"
                min="1000"
                max="500000"
                step="1000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-bold">
                <span>₹1,000</span>
                <span>₹5,00,000</span>
              </div>
            </div>

            {/* PAN Card Toggle */}
            <div className="pt-2 flex items-center justify-between p-4 rounded-2xl bg-slate-50 border">
              <div>
                <span className="text-sm font-bold text-foreground block">Payee has valid PAN Card?</span>
                <span className="text-[10px] text-muted-foreground font-medium">Without PAN, standard TDS is 20% (Section 206AA)</span>
              </div>
              <button
                type="button"
                onClick={() => setHasPAN(!hasPAN)}
                className={cn(
                  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                  hasPAN ? "bg-primary" : "bg-zinc-300"
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                    hasPAN ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-teal-500/10 flex items-center justify-center">
            <FileSpreadsheet className="h-5 w-5 text-teal-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">Deductions Output</h2>
            <p className="text-xs text-muted-foreground font-semibold">TDS calculations overview</p>
          </div>
        </div>

        {/* TDS Deducted Card */}
        <div className="p-6 rounded-[2rem] border-2 bg-emerald-500/5 border-emerald-500/20 flex flex-col items-center text-center gap-2 shadow-xl">
          <div className="h-10 w-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-1">
            <span className="text-sm font-black">%</span>
          </div>
          <h3 className="text-base font-bold text-muted-foreground">TDS to be Deducted</h3>
          <p className="text-4xl font-black text-emerald-600 font-heading">
            ₹{results.tds.toLocaleString()}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Rate applied: {results.rateApplied}%
          </p>
        </div>

        {/* Breakdown Details */}
        <Card className="rounded-[2rem] border-primary/10 shadow-lg">
          <CardContent className="p-6 space-y-5">
            <h4 className="font-bold text-sm text-foreground">Payment Summary</h4>
            
            <div className="space-y-3.5">
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-muted-foreground">Gross Invoice Amount</span>
                <span className="text-foreground">₹{amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold border-b pb-3">
                <span className="text-muted-foreground">TDS Deducted ({results.rateApplied}%)</span>
                <span className="text-rose-500 font-bold">₹{results.tds.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold pt-1">
                <span className="text-foreground">Net Payout to Payee</span>
                <span className="text-primary font-heading">₹{results.net.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Threshold Alert or Rules Info */}
        <div className={cn(
          "p-5 rounded-2xl flex gap-4 border",
          details.thresholdExceeded
            ? "bg-amber-500/5 border-amber-500/10 text-amber-900"
            : "bg-blue-500/5 border-blue-500/10 text-blue-900"
        )}>
          {details.thresholdExceeded ? (
            <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          ) : (
            <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
          )}
          <div className="text-xs font-semibold leading-relaxed">
            <p className="font-bold">
              {details.thresholdExceeded ? "TDS Exemption Threshold Exceeded" : "Below Exemption Limit Info"}
            </p>
            <p className="font-medium text-muted-foreground text-[11px] mt-0.5">
              {details.thresholdText} {details.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
