"use client";

import { useState } from "react";
import { Calendar, BadgeAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toggleComplianceDoc } from "@/actions/compliance";
import { addXp } from "@/lib/gamification";
import { DashboardComplianceItem } from "@/src/engines/dashboard/dashboard.types";

interface DueDateTrackerWidgetProps {
  initialDueDates: DashboardComplianceItem[];
}

export function DueDateTrackerWidget({ initialDueDates }: DueDateTrackerWidgetProps) {
  const [completedEvents, setCompletedEvents] = useState<string[]>(
    initialDueDates.filter(item => item.isCompleted).map(item => item.id)
  );

  const handleToggleEvent = (id: string) => {
    const isNowCompleted = !completedEvents.includes(id);
    const updated = isNowCompleted
      ? [...completedEvents, id]
      : completedEvents.filter((eId) => eId !== id);
      
    setCompletedEvents(updated);
    
    toggleComplianceDoc(id, isNowCompleted).catch(() => {});
    
    if (isNowCompleted) {
      addXp(30).catch(() => {});
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Calendar className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold tracking-tight text-foreground">Due Date Tracker</h3>
          <p className="text-xs text-muted-foreground font-semibold">Immediate filing reminders</p>
        </div>
      </div>

      <div className="space-y-4">
        {initialDueDates.map((evt) => {
          const isCompleted = completedEvents.includes(evt.id);
          return (
            <Card 
              key={evt.id} 
              className={cn(
                "rounded-3xl border-slate-100 shadow-sm transition-all",
                isCompleted && "bg-emerald-500/[0.01] border-emerald-500/20 opacity-70"
              )}
            >
              <CardContent className="p-5 space-y-3.5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-primary font-bold bg-primary/5 px-2 py-0.5 rounded-md">
                    {evt.dueDate ? evt.dueDate.toDateString() : "TBD"}
                  </span>
                  <button
                    onClick={() => handleToggleEvent(evt.id)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border cursor-pointer transition-colors",
                      isCompleted 
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600" 
                        : "hover:bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? "Completed ✓" : "Mark Done"}
                  </button>
                </div>
                
                <div className="space-y-1">
                  <h4 className={cn("font-bold text-sm", isCompleted && "text-muted-foreground")}>
                    {evt.title}
                  </h4>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
