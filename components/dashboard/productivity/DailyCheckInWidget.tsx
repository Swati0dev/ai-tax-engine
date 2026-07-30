"use client";

import { useState, useEffect } from "react";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { addXp } from "@/lib/gamification";
import { triggerConfetti } from "@/components/ui/Confetti";

export function DailyCheckInWidget() {
  const [checkInClaimed, setCheckInClaimed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCheckInDate = localStorage.getItem("tax-last-check-in");
      if (savedCheckInDate) {
        const today = new Date().toDateString();
        setCheckInClaimed(savedCheckInDate === today);
      }
    }
  }, []);

  const handleClaim = () => {
    if (checkInClaimed) return;
    
    const today = new Date().toDateString();
    localStorage.setItem("tax-last-check-in", today);
    setCheckInClaimed(true);
    addXp(25).then(() => {
      window.dispatchEvent(new Event("compliance-update"));
    });
    triggerConfetti();
  };

  return (
    <Card className="rounded-[2rem] border-amber-500/10 shadow-lg bg-gradient-to-br from-amber-500/5 to-yellow-500/10 border relative overflow-hidden p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Trophy className="h-5.5 w-5.5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-foreground">Compliance Reward</h4>
            <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest">Daily XP Check-in</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
          Maintain good compliance habits! Check in daily to increase your filer score by **25 XP**.
        </p>
        
        <Button
          onClick={handleClaim}
          disabled={checkInClaimed}
          className={cn(
            "w-full rounded-2xl py-3 text-xs font-black uppercase tracking-wider transition-all shadow-md",
            checkInClaimed 
              ? "bg-slate-100 text-muted-foreground border cursor-default shadow-none" 
              : "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20"
          )}
        >
          {checkInClaimed ? "XP Claimed Today ✓" : "Claim Daily 25 XP"}
        </Button>
      </div>
    </Card>
  );
}
