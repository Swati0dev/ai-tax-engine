"use client";

import { Bell, Info, ShieldAlert, Sparkles, Check, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const NOTIFICATIONS = [
  {
    id: "n1",
    type: "AI_RECOMMENDATION",
    title: "New Tax Saving Opportunity Detected",
    message: "Based on your professional profile, you might be eligible for Section 44ADA presumptive taxation. Chat with AI to learn more.",
    time: "2 hours ago",
    isRead: false,
    icon: Sparkles,
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    id: "n2",
    type: "REMINDER",
    title: "Advance Tax Due Soon",
    message: "Your first installment of Advance Tax for FY 2025-26 is due on June 15, 2026.",
    time: "1 day ago",
    isRead: false,
    icon: Bell,
    color: "text-amber-600",
    bg: "bg-amber-100"
  },
  {
    id: "n3",
    type: "UPDATE",
    title: "New Tax Regime Changes",
    message: "The standard deduction under the new tax regime has been increased to ₹75,000.",
    time: "3 days ago",
    isRead: true,
    icon: Info,
    color: "text-blue-600",
    bg: "bg-blue-100"
  },
  {
    id: "n4",
    type: "ALERT",
    title: "GST Return Filed Successfully",
    message: "Your GSTR-1 for Q1 has been successfully filed and acknowledged.",
    time: "1 week ago",
    isRead: true,
    icon: ShieldAlert,
    color: "text-emerald-600",
    bg: "bg-emerald-100"
  }
];

export default function NotificationsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Notifications</h1>
          <p className="text-sm text-muted-foreground font-medium mt-1">
            Stay updated on deadlines, AI insights, and tax law changes.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
            <Check className="h-4 w-4" />
            Mark all read
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {NOTIFICATIONS.map((notif) => (
          <div key={notif.id} className={cn(
            "p-5 rounded-2xl flex items-start gap-4 transition-all group",
            notif.isRead ? "bg-white border border-slate-100" : "bg-primary/5 border border-primary/10 shadow-sm"
          )}>
            <div className={cn("h-12 w-12 shrink-0 rounded-2xl flex items-center justify-center", notif.bg)}>
              <notif.icon className={cn("h-6 w-6", notif.color)} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className={cn("font-bold text-base truncate", notif.isRead ? "text-slate-700" : "text-slate-900")}>
                  {notif.title}
                </h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 shrink-0">
                  {notif.time}
                </span>
              </div>
              <p className={cn("text-sm leading-relaxed", notif.isRead ? "text-slate-500" : "text-slate-700 font-medium")}>
                {notif.message}
              </p>
            </div>

            <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
