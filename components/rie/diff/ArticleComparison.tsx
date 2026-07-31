import React from "react";
import { GitCompare } from "lucide-react";

interface DiffSegment {
  type: "added" | "removed" | "unchanged";
  text: string;
}

interface ArticleComparisonProps {
  title: string;
  oldVersion: string;
  newVersion: string;
  segments: DiffSegment[];
}

export function ArticleComparison({ title, oldVersion, newVersion, segments }: ArticleComparisonProps) {
  
  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden flex flex-col">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <GitCompare className="h-4 w-4 text-slate-500" />
          {title}
        </h3>
        <div className="flex gap-4 text-xs font-bold uppercase tracking-wider">
          <span className="text-red-500">v{oldVersion} (Old)</span>
          <span className="text-emerald-600">v{newVersion} (Current)</span>
        </div>
      </div>
      
      <div className="p-6 md:p-8 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">
        {segments.map((segment, idx) => {
          if (segment.type === "added") {
            return (
              <span key={idx} className="bg-emerald-50 text-emerald-900 border-b-2 border-emerald-500 px-1 mx-0.5 rounded-sm">
                {segment.text}
              </span>
            );
          }
          if (segment.type === "removed") {
            return (
              <span key={idx} className="bg-red-50 text-red-900 line-through decoration-red-500/50 px-1 mx-0.5 rounded-sm opacity-80">
                {segment.text}
              </span>
            );
          }
          return <span key={idx} className="text-slate-600">{segment.text}</span>;
        })}
      </div>
    </div>
  );
}
