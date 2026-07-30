import { Bookmark, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SAVED_SECTIONS = [
  {
    id: "sec-80c",
    title: "Section 80C: Deductions on Investments",
    category: "Direct Tax",
    description: "Deduction up to ₹1.5 Lakh for investments in PPF, EPF, ELSS, Life Insurance premiums, etc.",
    href: "/direct-tax/section-80c"
  },
  {
    id: "sec-115bac",
    title: "Section 115BAC: New Tax Regime",
    category: "Direct Tax",
    description: "Lower tax rates but without most of the deductions and exemptions available in the old regime.",
    href: "/direct-tax/new-tax-regime"
  }
];

export function SavedSectionsWidget() {
  return (
    <section className="space-y-4 pt-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-amber-500/10 flex items-center justify-center">
          <Bookmark className="h-5 w-5 text-amber-500" />
        </div>
        <div className="flex-1 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">Saved Tax Rules</h3>
            <p className="text-xs text-muted-foreground font-semibold">Quick access to your bookmarked sections</p>
          </div>
          <Link href="/dashboard/saved-sections">
            <Button variant="outline" size="sm" className="rounded-xl h-8 text-xs font-bold shadow-sm">
              View All
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SAVED_SECTIONS.map((section) => (
          <Link key={section.id} href={section.href} className="group h-full">
            <Card className="rounded-[2rem] border-slate-200 hover:border-amber-500/30 hover:shadow-md transition-all h-full bg-white relative overflow-hidden">
              <div className="absolute right-0 top-0 h-16 w-16 bg-amber-50 rounded-bl-full -mr-4 -mt-4 transition-colors group-hover:bg-amber-100/50" />
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded">
                    {section.category}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-amber-500 transition-colors" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-amber-700 transition-colors">
                  {section.title}
                </h4>
                <p className="text-xs text-slate-500 font-medium line-clamp-2">
                  {section.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
