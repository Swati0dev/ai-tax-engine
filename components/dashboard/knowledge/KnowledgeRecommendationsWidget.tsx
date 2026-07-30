import { BookOpen } from "lucide-react";
import { EmptyWidget } from "../shared/EmptyWidget";

export function KnowledgeRecommendationsWidget() {
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
      <div className="h-48">
        <EmptyWidget 
          icon={BookOpen}
          title="No Recommendations Yet"
          description="We are analyzing your profile to recommend the best tax reading material."
        />
      </div>
    </section>
  );
}
