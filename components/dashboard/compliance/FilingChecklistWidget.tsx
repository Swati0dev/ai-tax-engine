"use client";

import { useState } from "react";
import { ListTodo, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toggleComplianceDoc } from "@/actions/compliance";
import { addXp } from "@/lib/gamification";
import { triggerConfetti } from "@/components/ui/Confetti";
import { DashboardComplianceItem } from "@/src/engines/dashboard/dashboard.types";

interface FilingChecklistWidgetProps {
  initialChecklist: DashboardComplianceItem[];
}

export function FilingChecklistWidget({ initialChecklist }: FilingChecklistWidgetProps) {
  const [checkedItems, setCheckedItems] = useState<string[]>(
    initialChecklist.filter(item => item.isCompleted).map(item => item.id)
  );

  const handleToggleChecklist = (id: string) => {
    const isNowChecked = !checkedItems.includes(id);
    const updated = isNowChecked
      ? [...checkedItems, id]
      : checkedItems.filter((i) => i !== id);

    setCheckedItems(updated);
    
    // Background sync
    toggleComplianceDoc(id, isNowChecked).catch(() => {});
    
    if (isNowChecked) {
      addXp(15).then(() => {
        window.dispatchEvent(new Event("compliance-update"));
      });
      
      if (updated.length === initialChecklist.length && initialChecklist.length > 0) {
        triggerConfetti();
      }
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
          <ListTodo className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold tracking-tight text-foreground">Interactive Filing Checklist</h3>
          <p className="text-xs text-muted-foreground font-semibold">Verify preparation actions to earn XP points</p>
        </div>
      </div>

      <Card className="rounded-[2.5rem] border-primary/10 shadow-lg bg-white">
        <CardContent className="p-6 md:p-8 space-y-4">
          {initialChecklist.map((item) => {
            const isChecked = checkedItems.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleToggleChecklist(item.id)}
                className="w-full text-left flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-slate-100 hover:border-slate-200 cursor-pointer group"
              >
                <div className={cn(
                  "h-5 w-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                  isChecked ? "border-primary bg-primary text-white" : "border-slate-300 group-hover:border-primary/55 bg-white"
                )}>
                  {isChecked && <CheckCircle className="h-4.5 w-4.5" />}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-bold text-foreground">
                    {item.title}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-accent group-hover:translate-x-0.5 transition-transform shrink-0">
                  +15 XP
                </span>
              </button>
            );
          })}
        </CardContent>
      </Card>
    </section>
  );
}
