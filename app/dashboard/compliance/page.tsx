"use client";

import { ShieldAlert, AlertTriangle, CheckCircle, HelpCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

const COMPLIANCE_ITEMS = [
  {
    id: "pan-aadhaar",
    title: "PAN-Aadhaar Linking",
    description: "Your PAN and Aadhaar cards are successfully linked.",
    status: "HEALTHY",
    actionRequired: false
  },
  {
    id: "gst-filing",
    title: "GST Return Irregularity",
    description: "You have not filed your GSTR-3B for the last two months. E-way bill generation may be blocked soon.",
    status: "CRITICAL",
    actionRequired: true,
    actionText: "File GSTR-3B Now"
  },
  {
    id: "advance-tax",
    title: "Advance Tax Payment",
    description: "Based on your income projection, you may need to pay advance tax to avoid interest under section 234B and 234C.",
    status: "WARNING",
    actionRequired: true,
    actionText: "Calculate Liability"
  }
];

export default function CompliancePage() {
  const getStatusConfig = (status: string) => {
    switch(status) {
      case "HEALTHY": return { icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" };
      case "WARNING": return { icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" };
      case "CRITICAL": return { icon: ShieldAlert, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" };
      default: return { icon: HelpCircle, color: "text-slate-600", bg: "bg-slate-50", border: "border-slate-200" };
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Compliance Alerts</h1>
          <p className="text-sm text-muted-foreground font-medium mt-1">
            Track your overall tax health and respond to critical regulatory requirements.
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl border border-red-100 font-bold text-sm">
          <ShieldAlert className="h-4 w-4" />
          1 Critical Alert
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COMPLIANCE_ITEMS.map((item) => {
          const config = getStatusConfig(item.status);
          const Icon = config.icon;

          return (
            <Card key={item.id} className={cn(
              "rounded-[2rem] border transition-all duration-300 relative overflow-hidden group hover:shadow-md",
              config.border, config.bg,
              item.status === "CRITICAL" ? "shadow-red-100" : "shadow-sm"
            )}>
              {/* Status Gradient background */}
              <div className={cn(
                "absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 opacity-50",
                item.status === "CRITICAL" ? "bg-red-200" : item.status === "WARNING" ? "bg-amber-200" : "bg-emerald-200"
              )} />

              <CardContent className="p-6 md:p-8 flex flex-col h-full relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center bg-white shadow-sm", config.color)}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className={cn("text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white", config.color)}>
                    {item.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm font-medium text-slate-700/80 mb-6 flex-1">{item.description}</p>

                {item.actionRequired && (
                  <button className={cn(
                    "w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all text-white shadow-sm hover:shadow-md",
                    item.status === "CRITICAL" ? "bg-red-600 hover:bg-red-700" : "bg-amber-500 hover:bg-amber-600"
                  )}>
                    {item.actionText}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
