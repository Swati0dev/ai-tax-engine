import React from "react";
import { SmartSearch } from "@/components/rie/search/SmartSearch";
import { AIConversationEngine } from "@/components/rie/assistant/AIConversationEngine";

export default function ResearchWorkspacePage() {
  return (
    <div className="h-full flex flex-col bg-slate-50">
      
      {/* Top Search Bar Area */}
      <div className="bg-white border-b border-slate-200 p-6 z-10 shadow-sm relative">
        <SmartSearch />
      </div>

      {/* Workspace Split View */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left: Research Results/Content Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 border-r border-slate-200">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-black tracking-tight text-slate-800">Search Results</h2>
            <p className="text-slate-500">Enter a query to begin your research session.</p>
            
            {/* Mock Article Card */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-primary/30 transition-all cursor-pointer">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Income Tax Act</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Active</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Section 194R: TDS on Benefits or Perquisites</h3>
              <p className="text-sm text-slate-600 line-clamp-2">Any person responsible for providing to a resident, any benefit or perquisite, whether convertible into money or not...</p>
            </div>
          </div>
        </div>

        {/* Right: AI Assistant */}
        <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 bg-white">
          <AIConversationEngine mode="workspace" />
        </div>

      </div>

    </div>
  );
}
