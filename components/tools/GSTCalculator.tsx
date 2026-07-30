"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Info, Percent, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Slab = 5 | 12 | 18 | 28;
type Mode = "exclusive" | "inclusive"; // Exclusive: Add GST, Inclusive: Remove GST
type Location = "intra" | "inter"; // Intra-state: CGST/SGST, Inter-state: IGST

export function GSTCalculator() {
  const [amount, setAmount] = useState<number>(10000);
  const [slab, setSlab] = useState<Slab>(18);
  const [mode, setMode] = useState<Mode>("exclusive");
  const [location, setLocation] = useState<Location>("intra");

  const results = useMemo(() => {
    let gstAmount = 0;
    let netAmount = 0;
    let grossAmount = 0;

    if (mode === "exclusive") {
      netAmount = amount;
      gstAmount = amount * (slab / 100);
      grossAmount = amount + gstAmount;
    } else {
      grossAmount = amount;
      netAmount = amount / (1 + slab / 100);
      gstAmount = amount - netAmount;
    }

    const cgst = location === "intra" ? gstAmount / 2 : 0;
    const sgst = location === "intra" ? gstAmount / 2 : 0;
    const igst = location === "inter" ? gstAmount : 0;

    return {
      net: Math.round(netAmount * 100) / 100,
      gst: Math.round(gstAmount * 100) / 100,
      gross: Math.round(grossAmount * 100) / 100,
      cgst: Math.round(cgst * 100) / 100,
      sgst: Math.round(sgst * 100) / 100,
      igst: Math.round(igst * 100) / 100,
    };
  }, [amount, slab, mode, location]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Inputs Section */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Percent className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">GST Details</h2>
            <p className="text-xs text-muted-foreground font-semibold">Enter invoice amount and rate slabs</p>
          </div>
        </div>

        <Card className="rounded-[2rem] border-primary/10 shadow-lg">
          <CardContent className="p-6 space-y-6">
            {/* Base Amount */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-bold">
                <label htmlFor="baseAmount" className="text-foreground">Base Amount (₹)</label>
                <input
                  id="baseAmount"
                  type="number"
                  value={amount === 0 ? "" : amount}
                  onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                  className="w-32 bg-primary/5 border border-primary/10 rounded-xl px-3 py-1 text-right font-mono font-bold text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <input
                type="range"
                aria-label="Base Amount Range"
                min="100"
                max="500000"
                step="500"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-bold">
                <span>₹100</span>
                <span>₹5,00,000</span>
              </div>
            </div>

            {/* Inclusive/Exclusive Mode */}
            <div className="space-y-2">
              <label id="gst-mode-label" className="text-sm font-bold text-foreground block">GST Calculation Mode</label>
              <div className="grid grid-cols-2 gap-4" role="group" aria-labelledby="gst-mode-label">
                <button
                  type="button"
                  aria-pressed={mode === "exclusive"}
                  onClick={() => setMode("exclusive")}
                  className={cn(
                    "p-3.5 rounded-2xl border-2 font-bold text-sm text-center transition-all",
                    mode === "exclusive" 
                      ? "border-primary bg-primary/5 text-primary shadow-sm" 
                      : "border-border hover:border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  GST Exclusive
                  <span className="block text-[10px] opacity-75 font-normal mt-1">Add GST to base amount</span>
                </button>
                <button
                  type="button"
                  aria-pressed={mode === "inclusive"}
                  onClick={() => setMode("inclusive")}
                  className={cn(
                    "p-3.5 rounded-2xl border-2 font-bold text-sm text-center transition-all",
                    mode === "inclusive" 
                      ? "border-primary bg-primary/5 text-primary shadow-sm" 
                      : "border-border hover:border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  GST Inclusive
                  <span className="block text-[10px] opacity-75 font-normal mt-1">Deduct GST from amount</span>
                </button>
              </div>
            </div>

            {/* Slabs */}
            <div className="space-y-2">
              <label id="gst-slab-label" className="text-sm font-bold text-foreground block">GST Slab Rates</label>
              <div className="grid grid-cols-4 gap-2" role="group" aria-labelledby="gst-slab-label">
                {([5, 12, 18, 28] as Slab[]).map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    aria-pressed={slab === rate}
                    onClick={() => setSlab(rate)}
                    className={cn(
                      "py-3 rounded-xl border-2 font-bold text-sm text-center transition-all",
                      slab === rate
                        ? "border-primary bg-primary/5 text-primary shadow-sm"
                        : "border-border hover:border-muted-foreground/30 text-muted-foreground"
                    )}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

            {/* Region / GST Split */}
            <div className="space-y-2">
              <label id="gst-dest-label" className="text-sm font-bold text-foreground block">Supply Destination</label>
              <div className="grid grid-cols-2 gap-4" role="group" aria-labelledby="gst-dest-label">
                <button
                  type="button"
                  aria-pressed={location === "intra"}
                  onClick={() => setLocation("intra")}
                  className={cn(
                    "p-3.5 rounded-2xl border-2 font-bold text-sm text-center transition-all",
                    location === "intra" 
                      ? "border-primary bg-primary/5 text-primary shadow-sm" 
                      : "border-border hover:border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  Intra-State
                  <span className="block text-[10px] opacity-75 font-normal mt-1">CGST (50%) + SGST (50%)</span>
                </button>
                <button
                  type="button"
                  aria-pressed={location === "inter"}
                  onClick={() => setLocation("inter")}
                  className={cn(
                    "p-3.5 rounded-2xl border-2 font-bold text-sm text-center transition-all",
                    location === "inter" 
                      ? "border-primary bg-primary/5 text-primary shadow-sm" 
                      : "border-border hover:border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  Inter-State
                  <span className="block text-[10px] opacity-75 font-normal mt-1">IGST (100%)</span>
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
            <Sparkles className="h-5 w-5 text-teal-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">Tax Output</h2>
            <p className="text-xs text-muted-foreground font-semibold">Real-time invoice figures</p>
          </div>
        </div>

        {/* GST Amount Card */}
        <div className="p-6 rounded-[2rem] border-2 bg-emerald-500/5 border-emerald-500/20 flex flex-col items-center text-center gap-2 shadow-xl">
          <div className="h-10 w-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-1">
            <Percent className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-muted-foreground">GST Tax Amount</h3>
          <p className="text-4xl font-black text-emerald-600 font-heading">
            ₹{results.gst.toLocaleString()}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Total tax component
          </p>
        </div>

        {/* Summary Details */}
        <Card className="rounded-[2rem] border-primary/10 shadow-lg">
          <CardContent className="p-6 space-y-5">
            <h4 className="font-bold text-sm text-foreground">Summary Breakdown</h4>
            
            <div className="space-y-3.5">
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-muted-foreground">Net Price (Base Value)</span>
                <span className="text-foreground">₹{results.net.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold border-b pb-3">
                <span className="text-muted-foreground">GST Component ({slab}%)</span>
                <span className="text-emerald-600 font-bold">₹{results.gst.toLocaleString()}</span>
              </div>
              
              {location === "intra" ? (
                <>
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">Central GST (CGST - {slab/2}%)</span>
                    <span>₹{results.cgst.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold border-b pb-3">
                    <span className="text-muted-foreground">State GST (SGST - {slab/2}%)</span>
                    <span>₹{results.sgst.toLocaleString()}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-xs font-semibold border-b pb-3">
                  <span className="text-muted-foreground">Integrated GST (IGST - {slab}%)</span>
                  <span>₹{results.igst.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-base font-extrabold pt-1">
                <span className="text-foreground">Gross Price (Final Bill)</span>
                <span className="text-primary font-heading">₹{results.gross.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Tip */}
        <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 flex gap-4">
          <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div className="text-xs font-semibold text-muted-foreground leading-relaxed">
            <p className="font-bold text-foreground">GST Invoice Rules:</p>
            <p className="font-medium text-[11px]">
              Intra-state transactions require splitting the tax amount equally into CGST and SGST, whereas inter-state transactions apply the entire tax amount under IGST.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
