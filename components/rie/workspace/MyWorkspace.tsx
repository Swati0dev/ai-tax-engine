import React from "react";
import { FolderHeart, Clock, History, Bookmark, Library } from "lucide-react";

export function MyWorkspace() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left Column: Collections */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Library className="h-5 w-5 text-primary" />
              My Collections
            </h3>
            <button className="text-sm font-semibold text-primary hover:underline">View All</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Collection Cards */}
            <div className="p-5 rounded-xl border border-slate-200 hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <FolderHeart className="h-6 w-6 text-slate-400 group-hover:text-primary transition-colors" />
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">12 items</span>
              </div>
              <h4 className="text-sm font-bold text-slate-800 mb-1">Q3 Tax Audit Prep</h4>
              <p className="text-xs text-slate-500 line-clamp-1">Saved articles and compliance steps.</p>
            </div>
            
            <div className="p-5 rounded-xl border border-slate-200 hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <FolderHeart className="h-6 w-6 text-slate-400 group-hover:text-primary transition-colors" />
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">5 items</span>
              </div>
              <h4 className="text-sm font-bold text-slate-800 mb-1">GST Changes 2026</h4>
              <p className="text-xs text-slate-500 line-clamp-1">Recent notifications and impact summaries.</p>
            </div>
          </div>
        </div>

        {/* Saved Articles */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-amber-500" />
              Saved Articles
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-800 truncate mb-1">Understanding Section 194R</h4>
                <p className="text-xs text-slate-500 truncate">Perquisites and TDS implications for businesses.</p>
              </div>
              <span className="text-xs text-slate-400 whitespace-nowrap">Saved 2d ago</span>
            </div>
            <div className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-800 truncate mb-1">FEMA Guidelines on Foreign Direct Investment</h4>
                <p className="text-xs text-slate-500 truncate">Updated compliance requirements for startups.</p>
              </div>
              <span className="text-xs text-slate-400 whitespace-nowrap">Saved 1w ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: History */}
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Recent Searches
          </h3>
          <ul className="space-y-3">
            <li className="text-sm font-medium text-slate-700 hover:text-primary cursor-pointer truncate">&quot;TDS on software subscriptions&quot;</li>
            <li className="text-sm font-medium text-slate-700 hover:text-primary cursor-pointer truncate">&quot;Section 43B(h) MSME payments&quot;</li>
            <li className="text-sm font-medium text-slate-700 hover:text-primary cursor-pointer truncate">&quot;GST on EV charging stations&quot;</li>
          </ul>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
            <History className="h-4 w-4" />
            Reading History
          </h3>
          <ul className="space-y-4">
            <li>
              <h4 className="text-sm font-semibold text-slate-700 line-clamp-2 hover:text-primary cursor-pointer transition-colors">Capital Gains Tax on Unlisted Shares</h4>
              <p className="text-xs text-slate-400 mt-1">Read yesterday</p>
            </li>
            <li>
              <h4 className="text-sm font-semibold text-slate-700 line-clamp-2 hover:text-primary cursor-pointer transition-colors">Export Incentives under Foreign Trade Policy</h4>
              <p className="text-xs text-slate-400 mt-1">Read 3 days ago</p>
            </li>
          </ul>
        </div>
      </div>
      
    </div>
  );
}
