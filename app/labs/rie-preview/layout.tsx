import React from "react";
import Link from "next/link";
import { Search, History, LayoutDashboard, GitCompare, Bell, Settings } from "lucide-react";

export default function RIELayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* RIE Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 shrink-0 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold font-mono">AI</span>
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight text-slate-900 leading-none">Tax Engine</h1>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">RIE Platform</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <Link href="/labs/rie-preview" className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors">
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Link>
          <Link href="/labs/rie-preview/research" className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors">
            <Search className="h-4 w-4" /> Research Workspace
          </Link>
          <Link href="/labs/rie-preview/diff" className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors">
            <GitCompare className="h-4 w-4" /> Regulatory Diff
          </Link>
          <Link href="/labs/rie-preview/alerts" className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors">
            <Bell className="h-4 w-4" /> Alert Center
          </Link>
          <Link href="/labs/rie-preview/workspace" className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors">
            <History className="h-4 w-4" /> My Workspace
          </Link>
        </nav>
        
        <div className="p-4 border-t border-slate-100">
          <button className="flex items-center gap-3 px-3 py-2 w-full text-left text-sm font-semibold text-slate-600 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors">
            <Settings className="h-4 w-4" /> Settings
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
}
