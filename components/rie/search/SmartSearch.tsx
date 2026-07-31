"use client";

import { Search, SlidersHorizontal, FileText, Scale, Landmark, ChevronDown } from "lucide-react";
import React, { useState } from "react";

export function SmartSearch() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full max-w-4xl mx-auto z-50">
      <div 
        className={`flex items-center bg-white border-2 transition-all duration-200 rounded-2xl shadow-sm ${
          isFocused ? "border-primary ring-4 ring-primary/10 shadow-md" : "border-slate-200"
        }`}
      >
        <div className="pl-5 pr-2 py-4">
          <Search className={`h-6 w-6 ${isFocused ? "text-primary" : "text-slate-400"}`} />
        </div>
        
        <input 
          type="text" 
          placeholder="Ask a legal question, search sections, or describe a scenario..." 
          className="flex-1 bg-transparent border-none outline-none text-lg font-medium tracking-tight text-slate-800 placeholder:text-slate-400 placeholder:font-normal"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        <div className="flex items-center gap-2 pr-3 pl-2 border-l border-slate-100 py-3">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            <span>All Sources</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
          
          <button className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors tooltip-trigger" title="Advanced Filters">
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mock Filter Popover/Dropdown below search */}
      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-lg p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 px-2">Refine Search</h4>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:border-primary/50 hover:bg-primary/5">
              <Scale className="h-4 w-4 text-primary" /> Acts
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:border-blue-500/50 hover:bg-blue-500/5">
              <FileText className="h-4 w-4 text-blue-500" /> Notifications
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:border-amber-500/50 hover:bg-amber-500/5">
              <Landmark className="h-4 w-4 text-amber-500" /> Case Law
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50">
              Semantic Search
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50">
              Exact Match
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
