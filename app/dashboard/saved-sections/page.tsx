"use client";

import { Bookmark, FileText, ExternalLink, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const SAVED_SECTIONS = [
  {
    id: "sec-80c",
    title: "Section 80C: Deductions on Investments",
    category: "Direct Tax",
    description: "Deduction up to ₹1.5 Lakh for investments in PPF, EPF, ELSS, Life Insurance premiums, etc.",
    dateSaved: "May 25, 2026",
    href: "/direct-tax/section-80c"
  },
  {
    id: "sec-115bac",
    title: "Section 115BAC: New Tax Regime",
    category: "Direct Tax",
    description: "Lower tax rates but without most of the deductions and exemptions available in the old regime.",
    dateSaved: "May 20, 2026",
    href: "/direct-tax/new-tax-regime"
  }
];

export default function SavedSectionsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Saved Tax Knowledge</h1>
        <p className="text-sm text-muted-foreground font-medium mt-1">
          Your bookmarked tax sections, guides, and articles for quick reference.
        </p>
      </div>

      <div className="space-y-4">
        {SAVED_SECTIONS.length === 0 ? (
          <div className="text-center py-12">
            <Bookmark className="h-12 w-12 text-slate-200 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700">No saved sections yet</h3>
            <p className="text-slate-500 text-sm mt-1">Bookmark important tax rules to find them easily here.</p>
          </div>
        ) : (
          SAVED_SECTIONS.map((section) => (
            <Card key={section.id} className="rounded-2xl border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-900 text-lg">{section.title}</h3>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-widest px-2 py-0.5">
                        {section.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-500">{section.description}</p>
                    <div className="flex items-center gap-1.5 mt-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Saved on {section.dateSaved}
                    </div>
                  </div>
                </div>
                
                <div className="shrink-0 flex items-center gap-2 w-full md:w-auto mt-4 md:mt-0">
                  <button className="flex-1 md:flex-none flex items-center justify-center p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-slate-200 md:border-transparent">
                    <Bookmark className="h-4 w-4 fill-current" />
                  </button>
                  <Link href={section.href} className="flex-1 md:flex-none">
                    <button className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2.5 rounded-xl font-bold transition-all">
                      Read Rule
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
