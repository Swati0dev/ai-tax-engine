"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, Landmark, ArrowRight, X } from "lucide-react";
import { performTaxSearch } from "@/actions/search";
import Link from "next/link";
import { TaxKnowledgeItem } from "@/types/tax";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TaxKnowledgeItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length >= 2) {
        setIsSearching(true);
        const res = await performTaxSearch(query);
        if (res.success && res.data) {
          setResults(res.data);
          setShowResults(true);
        }
        setIsSearching(false);
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {isSearching ? (
            <Loader2 className="h-5 w-5 text-primary animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          )}
        </div>
        <input
          type="text"
          className="block w-full pl-11 pr-12 py-4 bg-background border border-primary/10 rounded-2xl text-base font-medium placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
          placeholder="Search Section 80C, GST, ITR forms..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setShowResults(true)}
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setShowResults(false); }}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {showResults && (
        <div className="absolute mt-3 w-full bg-background border rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="max-h-[60vh] overflow-y-auto scrollbar-hide">
            {results.length > 0 ? (
              <div className="p-2 space-y-1">
                <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b mb-2">
                  Knowledge Base Matches ({results.length})
                </div>
                {results.map((item) => (
                  <Link
                    key={item.id}
                    href={`${item.category === "DIRECT_TAX" ? "/direct-tax" : "/indirect-tax"}/${item.id}`}
                    onClick={() => setShowResults(false)}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-primary/5 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/5 flex items-center justify-center">
                        <Landmark className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-bold group-hover:text-primary transition-colors">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-tight">
                          {item.actName} • {item.sectionNumber || "General"}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center space-y-2">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-bold">No exact matches found</p>
                <p className="text-xs text-muted-foreground">Try keywords like &apos;80C&apos;, &apos;GST&apos;, or &apos;Supply&apos;</p>
              </div>
            )}
          </div>
          <div className="p-3 bg-muted/30 border-t flex items-center justify-between">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Database Search v1.0</span>
            <div className="flex gap-1">
              <span className="h-2 w-2 rounded-full bg-primary/20" />
              <span className="h-2 w-2 rounded-full bg-primary/20" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
