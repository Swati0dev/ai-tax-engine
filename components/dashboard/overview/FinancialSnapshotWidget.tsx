import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TaxResults {
  savings: number;
  recommendation: string;
}

interface GamificationState {
  xp: number;
  level: number;
}

interface FinancialSnapshotWidgetProps {
  taxResults: TaxResults;
  gamerState: GamificationState;
  checklistProgress: number;
  complianceHealth: number;
  dashboardChecklistLength: number;
  checkedItemsLength: number;
  completedEventsLength: number;
}

export function FinancialSnapshotWidget({
  taxResults,
  gamerState,
  checklistProgress,
  complianceHealth,
  dashboardChecklistLength,
  checkedItemsLength,
  completedEventsLength
}: FinancialSnapshotWidgetProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Estimated Savings */}
      <Card className="rounded-3xl border-primary/10 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
        <CardContent className="p-6 flex flex-col justify-between h-full">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">Regime Savings</span>
            <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-black text-foreground block">
              ₹{taxResults.savings.toLocaleString()}
            </span>
            <span className="text-[10px] text-muted-foreground font-bold mt-1 block">
              Regime: <strong className="text-primary font-black">{taxResults.recommendation} REGIME</strong> wins
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Gamification Progress */}
      <Card className="rounded-3xl border-primary/10 shadow-sm hover:shadow-md transition-all duration-300">
        <CardContent className="p-6 flex flex-col justify-between h-full">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">XP Progress</span>
            <span className="text-xs font-black text-accent">{gamerState.xp} XP</span>
          </div>
          <div className="mt-4 space-y-2">
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-accent h-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (gamerState.xp % 500) / 5)}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] text-muted-foreground font-black uppercase tracking-wider">
              <span>LVL {gamerState.level}</span>
              <span>Next Lvl in {(500 - (gamerState.xp % 500))} XP</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Readiness progress percentage */}
      <Card className="rounded-3xl border-primary/10 shadow-sm hover:shadow-md transition-all duration-300">
        <CardContent className="p-6 flex flex-col justify-between h-full">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">Filing Readiness</span>
            <span className="text-xs font-black text-primary">{checklistProgress}%</span>
          </div>
          <div className="mt-4 space-y-2">
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-500" 
                style={{ width: `${checklistProgress}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground font-bold mt-1 block">
              {checkedItemsLength} of {dashboardChecklistLength} preparation tasks done
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Compliance checklist progress */}
      <Card className="rounded-3xl border-primary/10 shadow-sm hover:shadow-md transition-all duration-300">
        <CardContent className="p-6 flex flex-col justify-between h-full">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">Compliance Health</span>
            <span className={`text-xs font-black ${complianceHealth === 100 ? "text-emerald-600" : "text-amber-600"}`}>
              {complianceHealth}% Done
            </span>
          </div>
          <div className="mt-4 space-y-2">
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all duration-500",
                  complianceHealth === 100 ? "bg-emerald-500" : "bg-amber-500"
                )}
                style={{ width: `${complianceHealth}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground font-bold mt-1 block">
              {completedEventsLength} due tasks marked complete
            </span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
