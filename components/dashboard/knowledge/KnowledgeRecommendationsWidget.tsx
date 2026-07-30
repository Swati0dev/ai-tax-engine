import { BookOpen, ArrowUpRight } from "lucide-react";
import { EmptyWidget } from "../shared/EmptyWidget";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DashboardRecommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  readTime?: string;
}

interface KnowledgeRecommendationsWidgetProps {
  recommendations?: DashboardRecommendation[];
}

export function KnowledgeRecommendationsWidget({ recommendations = [] }: KnowledgeRecommendationsWidgetProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
          <BookOpen className="h-5 w-5 text-indigo-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold tracking-tight text-foreground">Knowledge Base</h3>
          <p className="text-xs text-muted-foreground font-semibold">Recommended reading from the AI Wiki</p>
        </div>
      </div>
      <div className="space-y-4">
        {recommendations.length > 0 ? (
          recommendations.map((rec) => (
            <Link key={rec.id} href={rec.href} className="group block">
              <Card className="rounded-[1.5rem] border-slate-200 hover:border-indigo-500/30 hover:shadow-md transition-all bg-white relative overflow-hidden">
                <div className="absolute right-0 top-0 h-12 w-12 bg-indigo-50 rounded-bl-full -mr-3 -mt-3 transition-colors group-hover:bg-indigo-100/50" />
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded">
                      {rec.category}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-indigo-700 transition-colors line-clamp-1">
                    {rec.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2">
                    {rec.description}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400">
                      {rec.readTime || "3 min read"}
                    </span>
                    <span className="text-[10px] font-bold text-indigo-600 group-hover:text-indigo-700">
                      Continue Reading →
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="rounded-[1.5rem] bg-slate-50 border-2 border-dashed border-slate-200 p-6 text-center space-y-4">
            <div className="mx-auto w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <BookOpen className="h-4 w-4 text-slate-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">No Recommendations Yet</h4>
              <p className="text-xs text-slate-500 mt-1">Explore the Knowledge Hub to receive personalized recommendations.</p>
            </div>
            <Link href="/knowledge-hub">
              <Button size="sm" className="rounded-xl font-bold bg-indigo-500 hover:bg-indigo-600 text-white w-full">
                Browse Knowledge Hub
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
