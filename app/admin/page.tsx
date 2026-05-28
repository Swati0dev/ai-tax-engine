"use client";

import { Users, Database, MessageSquare, TrendingUp, Activity, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const STATS = [
  { title: "Total Users", value: "2,543", trend: "+12% this month", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
  { title: "Tax Knowledge Items", value: "142", trend: "8 pending review", icon: Database, color: "text-indigo-500", bg: "bg-indigo-50" },
  { title: "Active AI Chats", value: "856", trend: "+24% today", icon: MessageSquare, color: "text-emerald-500", bg: "bg-emerald-50" },
  { title: "Saved Calculations", value: "3,211", trend: "Highly active", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-50" }
];

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Admin Overview</h1>
        <p className="text-sm text-muted-foreground font-medium mt-1">
          High-level metrics and system status for the AI Tax Engine platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => (
          <Card key={idx} className="rounded-2xl border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <Activity className="h-4 w-4 text-slate-300" />
              </div>
              <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm font-bold text-slate-500">{stat.title}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 px-2">Recent Platform Activity</h3>
          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardContent className="p-0 divide-y divide-slate-100">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <Users className="h-4 w-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">New user registered</p>
                      <p className="text-xs text-slate-500">user_{i}@example.com</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase text-slate-400">{i * 2} mins ago</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 px-2">Quick Actions</h3>
          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardContent className="p-4 space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 group text-left">
                <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Add Tax Knowledge</h4>
                  <p className="text-xs text-slate-500">Create a new section entry</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 group text-left">
                <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Review AI Prompts</h4>
                  <p className="text-xs text-slate-500">Update system instructions</p>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
