"use client";

import { Calculator, TrendingUp, Home, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const CALCULATORS = [
  {
    id: "income-tax",
    title: "Income Tax Estimator",
    description: "Compare old vs new regime and find your exact tax liability for FY 2025-26.",
    icon: Calculator,
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    textColor: "text-blue-600",
    href: "/dashboard" // Currently on dashboard
  },
  {
    id: "80c-planner",
    title: "80C Investment Planner",
    description: "Maximize your ₹1.5 Lakh limit. See how much more you need to invest to save tax.",
    icon: TrendingUp,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50",
    textColor: "text-emerald-600",
    href: "#"
  },
  {
    id: "hra-calculator",
    title: "HRA Exemption Calculator",
    description: "Calculate your exact House Rent Allowance exemption based on your salary and rent.",
    icon: Home,
    color: "bg-amber-500",
    lightColor: "bg-amber-50",
    textColor: "text-amber-600",
    href: "#"
  }
];

export default function SavedCalculationsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Tax Calculators</h1>
        <p className="text-sm text-muted-foreground font-medium mt-1">
          Quickly access and run simulations on your favorite tax calculators.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CALCULATORS.map((calc) => (
          <Card key={calc.id} className="rounded-[2rem] border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
            <CardContent className="p-6 md:p-8 flex flex-col h-full relative">
              {/* Decorative background element */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${calc.lightColor} rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500`} />
              
              <div className="relative z-10 flex-1">
                <div className={`h-14 w-14 rounded-2xl ${calc.lightColor} flex items-center justify-center mb-6`}>
                  <calc.icon className={`h-7 w-7 ${calc.textColor}`} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">{calc.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{calc.description}</p>
              </div>

              <div className="mt-8 relative z-10 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-slate-400" />
                  FY 2025-26
                </div>
                
                <Link href={calc.href}>
                  <button className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white shadow-sm transition-all hover:shadow-md ${calc.color} hover:opacity-90`}>
                    <Zap className="h-3.5 w-3.5" />
                    Run Tool
                  </button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
