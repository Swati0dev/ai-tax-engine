"use client";

import { CheckCircle2, Clock, AlertCircle, FileText, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type FilingStatus = "COMPLETED" | "PENDING" | "OVERDUE";

const FILINGS = [
  {
    id: "itr-25",
    title: "Income Tax Return (ITR-2)",
    type: "Direct Tax",
    dueDate: "July 31, 2026",
    status: "PENDING" as FilingStatus,
    amount: "₹45,200 (Estimated Refund)",
  },
  {
    id: "gst-q1",
    title: "GSTR-1 (Q1)",
    type: "Indirect Tax",
    dueDate: "April 11, 2026",
    status: "COMPLETED" as FilingStatus,
    amount: "₹12,400 (Liability Paid)",
  },
  {
    id: "tds-q1",
    title: "TDS Return (Form 26Q)",
    type: "Compliance",
    dueDate: "May 31, 2026",
    status: "PENDING" as FilingStatus,
    amount: "-",
  },
  {
    id: "adv-tax",
    title: "Advance Tax (Installment 1)",
    type: "Direct Tax",
    dueDate: "June 15, 2026",
    status: "PENDING" as FilingStatus,
    amount: "Pending Calculation",
  }
];

export default function TrackerPage() {
  const getStatusConfig = (status: FilingStatus) => {
    switch(status) {
      case "COMPLETED": return { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" };
      case "PENDING": return { icon: Clock, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" };
      case "OVERDUE": return { icon: AlertCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" };
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Filing Tracker</h1>
        <p className="text-sm text-muted-foreground font-medium mt-1">
          Monitor your upcoming deadlines, pending filings, and completed returns in one place.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-[2rem] border-slate-100 shadow-sm bg-gradient-to-br from-white to-slate-50">
          <CardContent className="p-6 space-y-2">
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Pending Filings</span>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-black text-slate-900">3</span>
              <span className="text-sm font-bold text-amber-600 mb-1">Action Required</span>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[2rem] border-slate-100 shadow-sm bg-gradient-to-br from-white to-slate-50">
          <CardContent className="p-6 space-y-2">
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Next Deadline</span>
            <div className="flex items-end gap-3">
              <span className="text-2xl font-black text-slate-900">May 31</span>
              <span className="text-sm font-bold text-slate-500 mb-1">2026</span>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[2rem] border-slate-100 shadow-sm bg-emerald-50 border-emerald-100">
          <CardContent className="p-6 space-y-2">
            <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">Completed</span>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-black text-emerald-600">1</span>
              <span className="text-sm font-bold text-emerald-600/70 mb-1">This FY</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline/List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 mb-4 px-2">Your Tax Timeline</h3>
        {FILINGS.map((filing) => {
          const config = getStatusConfig(filing.status);
          const Icon = config.icon;
          
          return (
            <Card key={filing.id} className={cn(
              "rounded-2xl border transition-all group overflow-hidden",
              filing.status === "PENDING" ? "hover:shadow-md border-slate-200" : "border-slate-100 opacity-80"
            )}>
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center">
                  
                  {/* Status Indicator Bar */}
                  <div className={cn("hidden md:block w-2 self-stretch", config.bg)} />

                  <div className="flex-1 p-5 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* Left: Info */}
                    <div className="md:col-span-5 flex items-start gap-4">
                      <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shrink-0", config.bg)}>
                        <Icon className={cn("h-6 w-6", config.color)} />
                      </div>
                      <div>
                        <Badge variant="outline" className={cn("mb-1 text-[10px] uppercase font-bold tracking-widest", config.color, config.border)}>
                          {filing.status}
                        </Badge>
                        <h4 className="font-bold text-slate-900 text-lg">{filing.title}</h4>
                        <p className="text-sm font-medium text-slate-500">{filing.type}</p>
                      </div>
                    </div>

                    {/* Middle: Dates & Details */}
                    <div className="md:col-span-4 space-y-3 pl-0 md:pl-4 md:border-l border-slate-100">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span className="text-sm font-bold text-slate-700">Due: {filing.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-slate-400" />
                        <span className="text-sm font-medium text-slate-500">{filing.amount}</span>
                      </div>
                    </div>

                    {/* Right: Action */}
                    <div className="md:col-span-3 flex justify-end">
                      {filing.status === "PENDING" ? (
                        <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold transition-all hover:bg-primary/90 hover:shadow-md">
                          File Now
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-100 text-slate-600 px-5 py-2.5 rounded-xl font-bold transition-all hover:bg-slate-200">
                          View Receipt
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
