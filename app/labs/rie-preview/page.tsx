import React from "react";
import { Activity, ShieldCheck, Scale, FileText, AlertTriangle } from "lucide-react";

export default function RIEDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Regulatory Dashboard</h1>
          <p className="text-slate-500 mt-2">Your overarching view of the legal intelligence landscape.</p>
        </div>

        {/* High-level Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-50 rounded-lg"><ShieldCheck className="h-4 w-4 text-emerald-600" /></div>
              <h4 className="text-sm font-bold text-slate-500">Articles Verified</h4>
            </div>
            <p className="text-3xl font-black text-slate-800">1,248</p>
          </div>
          
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-50 rounded-lg"><Activity className="h-4 w-4 text-amber-600" /></div>
              <h4 className="text-sm font-bold text-slate-500">Pending Review</h4>
            </div>
            <p className="text-3xl font-black text-slate-800">42</p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 rounded-lg"><FileText className="h-4 w-4 text-blue-600" /></div>
              <h4 className="text-sm font-bold text-slate-500">Recent Changes</h4>
            </div>
            <p className="text-3xl font-black text-slate-800">18</p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-50 rounded-lg"><AlertTriangle className="h-4 w-4 text-red-600" /></div>
              <h4 className="text-sm font-bold text-slate-500">High Priority Alerts</h4>
            </div>
            <p className="text-3xl font-black text-slate-800">3</p>
          </div>
        </div>

        {/* Regulatory Update Center Preview */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              Regulatory Update Center
            </h3>
            <button className="text-sm font-semibold text-primary hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 md:items-center p-4 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
              <div className="flex-1">
                <div className="flex gap-2 items-center mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">Notification</span>
                  <span className="text-xs text-slate-400">Today</span>
                </div>
                <h4 className="text-sm font-bold text-slate-800">CBDT issues guidelines for compounding of offences</h4>
                <p className="text-sm text-slate-500 line-clamp-1 mt-1">New streamlined process under section 279(2) of the Income-tax Act, 1961.</p>
              </div>
              <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap">View Impact</button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 md:items-center p-4 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
              <div className="flex-1">
                <div className="flex gap-2 items-center mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Act</span>
                  <span className="text-xs text-slate-400">Yesterday</span>
                </div>
                <h4 className="text-sm font-bold text-slate-800">Finance Act 2026 published in Official Gazette</h4>
                <p className="text-sm text-slate-500 line-clamp-1 mt-1">Enacts sweeping changes to corporate tax surcharges and personal tax slabs.</p>
              </div>
              <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap">View Diff</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
