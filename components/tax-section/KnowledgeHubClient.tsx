"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Search, 
  Calendar, 
  Scale, 
  BookOpen, 
  Landmark, 
  ChevronRight, 
  X, 
  Sparkles,
  Award,
  BookMarked
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TaxKnowledgeItem } from "@/types/tax";
import { ReviewBadge } from "./ReviewBadge";

interface KnowledgeHubClientProps {
  items: TaxKnowledgeItem[];
}

type CategoryTab = "ALL" | "DIRECT_TAX" | "INDIRECT_TAX";
type SubTopicTag = "ALL" | "DEDUCTIONS" | "GST" | "ITR" | "BUSINESS" | "CAPITAL_GAINS";

interface TagConfig {
  id: SubTopicTag;
  label: string;
}

const TOPIC_TAGS: TagConfig[] = [
  { id: "ALL", label: "All Topics" },
  { id: "DEDUCTIONS", label: "Deductions & Exemptions" },
  { id: "GST", label: "GST Returns & Slabs" },
  { id: "ITR", label: "ITR Filing & Forms" },
  { id: "BUSINESS", label: "Business & Presumptive Tax" },
  { id: "CAPITAL_GAINS", label: "Capital Gains" }
];

export function KnowledgeHubClient({ items }: KnowledgeHubClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryTab>("ALL");
  const [activeTag, setActiveTag] = useState<SubTopicTag>("ALL");

  // Filter items based on active states and search query
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 1. Category Filter
      if (activeCategory !== "ALL" && item.category !== activeCategory) {
        return false;
      }

      // 2. Sub-Topic Tag Filter
      if (activeTag !== "ALL") {
        const textToSearch = `${item.title} ${item.summary} ${item.explanation} ${item.sectionNumber || ""} ${item.slug}`.toLowerCase();
        
        switch (activeTag) {
          case "DEDUCTIONS":
            // Matches 80C, 80D, 80G, 80TTA, 10(13A) (HRA), Deductions, Exemptions
            const isDeduction = textToSearch.includes("80c") || 
                                textToSearch.includes("80d") || 
                                textToSearch.includes("80g") || 
                                textToSearch.includes("80tta") || 
                                textToSearch.includes("80ttb") || 
                                textToSearch.includes("10(13a)") || 
                                textToSearch.includes("hra") || 
                                textToSearch.includes("deduction") || 
                                textToSearch.includes("exemption");
            if (!isDeduction) return false;
            break;
            
          case "GST":
            // Matches GST, GSTR-1, GSTR-3B, Composition, ITC
            const isGST = textToSearch.includes("gst") || 
                          textToSearch.includes("gstr") || 
                          textToSearch.includes("composition") || 
                          textToSearch.includes("input tax credit") || 
                          textToSearch.includes("itc");
            if (!isGST) return false;
            break;

          case "ITR":
            // Matches ITR-1, ITR-4, ITR-5, ITR-6, 26AS, Form 26Q, filing guide
            const isITR = textToSearch.includes("itr") || 
                          textToSearch.includes("26as") || 
                          textToSearch.includes("26q") || 
                          textToSearch.includes("income tax return") || 
                          textToSearch.includes("sugam") || 
                          textToSearch.includes("sahaj");
            if (!isITR) return false;
            break;

          case "BUSINESS":
            // Matches 44ADA, LLPs, Companies, corporate, business, partnership, firm, composition
            const isBusiness = textToSearch.includes("44ada") || 
                               textToSearch.includes("llp") || 
                               textToSearch.includes("compan") || 
                               textToSearch.includes("corporate") || 
                               textToSearch.includes("business") || 
                               textToSearch.includes("partnership") || 
                               textToSearch.includes("firm") || 
                               textToSearch.includes("composition");
            if (!isBusiness) return false;
            break;

          case "CAPITAL_GAINS":
            // Matches capital gains
            const isCapGains = textToSearch.includes("capital gain") || 
                               textToSearch.includes("capital asset");
            if (!isCapGains) return false;
            break;
            
          default:
            break;
        }
      }

      // 3. Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery = 
          item.title.toLowerCase().includes(query) ||
          item.summary.toLowerCase().includes(query) ||
          item.explanation.toLowerCase().includes(query) ||
          (item.sectionNumber && item.sectionNumber.toLowerCase().includes(query)) ||
          item.actName.toLowerCase().includes(query);
        
        if (!matchesQuery) return false;
      }

      return true;
    });
  }, [items, activeCategory, activeTag, searchQuery]);

  return (
    <div className="space-y-12">
      {/* Search & Category Tabs Panel */}
      <div className="soft-ui-card p-6 md:p-8 rounded-[2.5rem] bg-white border border-primary/5 shadow-sm space-y-6">
        
        {/* Search Bar Input */}
        <div className="relative max-w-3xl mx-auto w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-10 py-4 bg-slate-50 border border-primary/10 rounded-2xl text-sm font-semibold placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner"
            placeholder="Search tax sections, forms, compliance guidelines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="border-t border-slate-100 my-4" />

        {/* Tab Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex bg-slate-100/80 p-1.5 rounded-2xl border w-fit">
            {[
              { id: "ALL", label: "All Topics" },
              { id: "DIRECT_TAX", label: "Direct Tax" },
              { id: "INDIRECT_TAX", label: "Indirect Tax" }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveCategory(tab.id as CategoryTab);
                  setActiveTag("ALL"); // Reset sub-tag on main category change
                }}
                className={cn(
                  "px-5 py-2.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer",
                  activeCategory === tab.id
                    ? "bg-white text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
            <BookMarked className="h-4 w-4 text-primary" />
            <span>Showing {filteredItems.length} verified tax guides</span>
          </div>
        </div>

        {/* Sub-topic Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {TOPIC_TAGS.map((tag) => {
            const isActive = activeTag === tag.id;
            return (
              <button
                key={tag.id}
                onClick={() => setActiveTag(tag.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer",
                  isActive
                    ? "bg-primary/5 border-primary text-primary"
                    : "bg-white border-slate-200 text-muted-foreground hover:border-slate-300 hover:text-foreground"
                )}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <article 
              key={item.id} 
              className="group p-6 md:p-8 rounded-[2rem] bg-white border border-primary/10 hover:border-primary/20 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Meta details */}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <ReviewBadge status={item.reviewStatus} />
                    {item.sectionNumber && (
                      <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-[10px] font-black border border-primary/20">
                        {item.sectionNumber}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground font-bold flex items-center gap-1">
                    <Scale className="h-3 w-3 text-slate-400" />
                    {item.actName}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  <Link href={`${item.category === "DIRECT_TAX" ? "/direct-tax" : "/indirect-tax"}/${item.slug}`}>
                    {item.title}
                  </Link>
                </h3>

                {/* Summary */}
                <p className="text-sm text-muted-foreground font-medium leading-relaxed line-clamp-3">
                  {item.summary}
                </p>

                {/* Related Forms Pills */}
                {item.relatedForms && item.relatedForms.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.relatedForms.map((form, index) => (
                      <span 
                        key={index}
                        className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[10px] font-bold"
                      >
                        {form}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="border-t border-slate-100 mt-6 pt-4 flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-semibold flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  Reviewed: {typeof item.lastReviewed === "string" ? new Date(item.lastReviewed).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' }) : new Date().toLocaleDateString("en-IN")}
                </span>

                <Link
                  href={`${item.category === "DIRECT_TAX" ? "/direct-tax" : "/indirect-tax"}/${item.slug}`}
                  className="flex items-center gap-1 text-primary font-bold hover:gap-2 transition-all"
                >
                  <span>Explore Guide</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="soft-ui-card p-12 text-center max-w-xl mx-auto rounded-[2rem] border border-dashed flex flex-col items-center justify-center space-y-4">
          <div className="h-14 w-14 rounded-full bg-slate-100 text-muted-foreground flex items-center justify-center">
            <Search className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-foreground">No matching tax guides found</h3>
          <p className="text-xs text-muted-foreground font-semibold">
            Try adjusting your search criteria, clearing filters, or exploring other categories.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("ALL");
              setActiveTag("ALL");
            }}
            className="mt-2 px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:opacity-90 transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Bottom Information Callout */}
      <div className="p-6 rounded-[2rem] bg-amber-500/[0.03] border border-amber-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="flex gap-4 items-start">
          <div className="h-10 w-10 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0">
            <Sparkles className="h-5 w-5 text-amber-600 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-foreground">Have complex tax questions?</h4>
            <p className="text-xs text-muted-foreground font-semibold mt-0.5">
              Ask our AI tax operating system for personalized recommendations and filing tips.
            </p>
          </div>
        </div>
        <Link 
          href="/chat"
          className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-extrabold shadow-sm hover:opacity-95 transition-all w-full md:w-auto text-center shrink-0 cursor-pointer"
        >
          Ask Tax AI Now
        </Link>
      </div>

    </div>
  );
}
