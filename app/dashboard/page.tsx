"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { 
  Trophy, 
  TrendingUp, 
  Calendar, 
  ListTodo, 
  MessageSquare, 
  ArrowUpRight, 
  Sparkles, 
  Landmark, 
  ShieldCheck, 
  CheckCircle, 
  Bell, 
  ArrowRight,
  Info,
  BadgeAlert
} from "lucide-react";
import { getGamificationState, addXp, GamificationState } from "@/lib/gamification";
import { compareRegimes, TaxInputs } from "@/lib/tax-calculations";
import { getUserProgress } from "@/actions/gamification";
import { getCompletedComplianceDocs, toggleComplianceDoc } from "@/actions/compliance";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { triggerConfetti } from "@/components/ui/Confetti";
import { cn } from "@/lib/utils";

// Compliance actions/checklist data structure
const DEFAULT_DASHBOARD_CHECKLIST = [
  { id: "c1", label: "Download Form 16 from employer", category: "Salary Exemption" },
  { id: "c2", label: "Verify Form 26AS for TDS entries", category: "Verification" },
  { id: "c3", label: "Review Annual Information Statement (AIS)", category: "Verification" },
  { id: "c4", label: "Collect Interest Certificates from Banks", category: "Income Proof" },
  { id: "c5", label: "Gather investment proofs (ELSS, PPF, Insurance)", category: "80C Deductions" },
];

const DASHBOARD_DUE_DATES = [
  { id: "t2", title: "Advance Tax 1st Installment", date: "June 15, 2024", category: "DIRECT", warning: "Sec 234C 1% interest applies for delay" },
  { id: "t4", title: "ITR Filing for Individuals", date: "July 31, 2024", category: "DIRECT", warning: "Sec 234F late fee of up to ₹5,000" },
  { id: "t5", title: "TDS Q1 Quarterly Return", date: "July 31, 2024", category: "TDS", warning: "Sec 234E late fee of ₹200/day" }
];

interface SavedCalculationInputs {
  grossSalary: number;
  section80C: number;
  hraExemption: number;
  section80D: number;
}

interface SavedChatConversation {
  id: string;
  title: string;
  timestamp: string;
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  // States loaded from localStorage
  const [gamerState, setGamerState] = useState<GamificationState>({ xp: 0, level: 1, title: "Tax Novice" });
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [completedEvents, setCompletedEvents] = useState<string[]>([]);
  const [recentChats, setRecentChats] = useState<SavedChatConversation[]>([]);
  
  // Interactive inputs for tax planner
  const [plannerInputs, setPlannerInputs] = useState<SavedCalculationInputs>({
    grossSalary: 1200000,
    section80C: 150000,
    hraExemption: 50000,
    section80D: 25000
  });

  // Saved tax regime state preference
  const [preferredRegime, setPreferredRegime] = useState<"NEW" | "OLD">("NEW");

  // Check-in state
  const [lastCheckIn, setLastCheckIn] = useState<string | null>(null);
  const [checkInClaimed, setCheckInClaimed] = useState(false);

  // Hydration safety check
  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      // 1. Gamification Title (Optimistic)
      setGamerState(getGamificationState());
      
      // Background Gamification DB Sync
      getUserProgress().then(progress => {
        if (progress) {
          setGamerState({ xp: progress.xp, level: progress.level, title: progress.title });
          localStorage.setItem("userXp", progress.xp.toString());
        }
      });

      // 2 & 3. Compliance Docs DB Sync
      getCompletedComplianceDocs().then(docs => {
        if (docs.length > 0) {
          const events = docs.filter(id => id.startsWith('t'));
          const items = docs.filter(id => id.startsWith('c'));
          setCompletedEvents(events);
          setCheckedItems(items);
          localStorage.setItem("tax-compliance-completed", JSON.stringify(events));
          localStorage.setItem("tax-compliance-checklist", JSON.stringify(items));
        } else {
          // Fallback to local storage for guests
          const savedChecklist = localStorage.getItem("tax-compliance-checklist");
          if (savedChecklist) setCheckedItems(JSON.parse(savedChecklist));
          
          const savedEvents = localStorage.getItem("tax-compliance-completed");
          if (savedEvents) setCompletedEvents(JSON.parse(savedEvents));
        }
      }).catch(() => {
        const savedChecklist = localStorage.getItem("tax-compliance-checklist");
        if (savedChecklist) setCheckedItems(JSON.parse(savedChecklist));
        const savedEvents = localStorage.getItem("tax-compliance-completed");
        if (savedEvents) setCompletedEvents(JSON.parse(savedEvents));
      });

      // 4. Recent chats
      const savedChats = localStorage.getItem("tax-ai-conversations");
      if (savedChats) {
        try {
          const parsed = JSON.parse(savedChats);
          if (Array.isArray(parsed)) {
            setRecentChats(parsed.slice(0, 3).map((c: { id: string; title: string; timestamp: string }) => ({
              id: c.id,
              title: c.title,
              timestamp: c.timestamp
            })));
          }
        } catch (e) {
          console.error("Failed to parse chats", e);
        }
      }

      // 5. Calculations
      const savedCalc = localStorage.getItem("tax-dashboard-calculation");
      if (savedCalc) {
        try {
          setPlannerInputs(JSON.parse(savedCalc));
        } catch {}
      }

      // 6. Regime
      const savedRegime = localStorage.getItem("tax-dashboard-regime");
      if (savedRegime === "OLD" || savedRegime === "NEW") {
        setPreferredRegime(savedRegime);
      }

      // 7. Check-in
      const savedCheckInDate = localStorage.getItem("tax-last-check-in");
      setLastCheckIn(savedCheckInDate);
      if (savedCheckInDate) {
        const today = new Date().toDateString();
        setCheckInClaimed(savedCheckInDate === today);
      }
    }
  }, []);

  // Recalculate tax comparison on inputs change
  const taxResults = useMemo(() => {
    const inputs: TaxInputs = {
      grossSalary: plannerInputs.grossSalary,
      hraExemption: plannerInputs.hraExemption,
      section80C: plannerInputs.section80C,
      section80D: plannerInputs.section80D,
      otherDeductions: 0,
      interestOnHomeLoan: 0
    };
    return compareRegimes(inputs);
  }, [plannerInputs]);

  // Handle calculator input changes & save them
  const updatePlannerInput = (key: keyof SavedCalculationInputs, val: number) => {
    const nextInputs = { ...plannerInputs, [key]: val };
    setPlannerInputs(nextInputs);
    if (typeof window !== "undefined") {
      localStorage.setItem("tax-dashboard-calculation", JSON.stringify(nextInputs));
    }
  };

  // Toggle compliance checklists
  const handleToggleChecklist = (id: string) => {
    const updated = checkedItems.includes(id)
      ? checkedItems.filter((i) => i !== id)
      : [...checkedItems, id];

    setCheckedItems(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("tax-compliance-checklist", JSON.stringify(updated));
      toggleComplianceDoc(id, !checkedItems.includes(id)).catch(() => {});
      
      // Dispatch event to sync compliance score
      window.dispatchEvent(new Event("compliance-update"));
      
      // Add XP for updating task list
      if (!checkedItems.includes(id)) {
        addXp(15).then(newState => setGamerState(newState));
        
        // Confetti triggers if they complete all items
        if (updated.length === DEFAULT_DASHBOARD_CHECKLIST.length) {
          triggerConfetti();
        }
      }
    }
  };

  // Toggle due dates timeline completion
  const handleToggleEvent = (id: string) => {
    const updated = completedEvents.includes(id)
      ? completedEvents.filter((eId) => eId !== id)
      : [...completedEvents, id];
    setCompletedEvents(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("tax-compliance-completed", JSON.stringify(updated));
      toggleComplianceDoc(id, !completedEvents.includes(id)).catch(() => {});
      
      if (!completedEvents.includes(id)) {
        addXp(30).then(newState => setGamerState(newState));
      }
    }
  };

  // Toggle regime preference
  const togglePreferredRegime = () => {
    const nextRegime = preferredRegime === "NEW" ? "OLD" : "NEW";
    setPreferredRegime(nextRegime);
    if (typeof window !== "undefined") {
      localStorage.setItem("tax-dashboard-regime", nextRegime);
    }
  };

  // Handle daily XP check-in reward
  const handleDailyCheckIn = () => {
    if (checkInClaimed) return;
    
    const today = new Date().toDateString();
    if (typeof window !== "undefined") {
      localStorage.setItem("tax-last-check-in", today);
      setLastCheckIn(today);
      setCheckInClaimed(true);
      addXp(25).then(newState => setGamerState(newState));
      triggerConfetti();
    }
  };

  // Calculate overall filing progress percentage
  const checklistProgress = useMemo(() => {
    if (DEFAULT_DASHBOARD_CHECKLIST.length === 0) return 0;
    return Math.round((checkedItems.length / DEFAULT_DASHBOARD_CHECKLIST.length) * 100);
  }, [checkedItems]);

  // Calculate dynamic compliance score health based on completed timeline items
  const complianceHealth = useMemo(() => {
    const activeDue = DASHBOARD_DUE_DATES.length;
    if (activeDue === 0) return 100;
    const completedCount = DASHBOARD_DUE_DATES.filter(d => completedEvents.includes(d.id)).length;
    return Math.round((completedCount / activeDue) * 100);
  }, [completedEvents]);

  if (!mounted) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-pulse">
        <div className="h-40 bg-slate-200 rounded-[2.5rem]" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 bg-slate-100 rounded-3xl" />
          <div className="h-32 bg-slate-100 rounded-3xl" />
          <div className="h-32 bg-slate-100 rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* 1. Welcome Hero Banner */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-primary via-slate-900 to-indigo-950 p-8 md:p-12 text-white shadow-2xl border border-primary/20">
        {/* Subtle decorative mesh/orb background */}
        <div className="absolute right-0 top-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute left-1/3 bottom-0 -mb-16 h-60 w-60 rounded-full bg-secondary/10 blur-3xl" />
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-black text-secondary tracking-widest uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              Tax AI Intelligence
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight">
              Namaste, Filer! 🌟
            </h1>
            <p className="text-sm md:text-base text-slate-300 font-medium max-w-xl leading-relaxed">
              Maintain compliance, save taxes using artificial intelligence, and track your levels. Your filings are secure & verified.
            </p>
          </div>

          {/* Rank Title Widget */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-3xl shrink-0 flex items-center gap-4 shadow-xl">
            <div className="h-12 w-12 rounded-2xl bg-secondary/20 border border-secondary/20 flex items-center justify-center text-secondary">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Filing Title</span>
              <h3 className="text-lg font-black text-white">{gamerState.title}</h3>
              <span className="text-xs text-secondary font-bold">Level {gamerState.level} Tax Filer</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Top Stats Matrix */}
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
                {checkedItems.length} of {DEFAULT_DASHBOARD_CHECKLIST.length} preparation tasks done
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
                {completedEvents.length} due tasks marked complete
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 3. Main Dashboard Layout splits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Planner & Lists (Col-8) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Real-time tax savings planner widget */}
          <Card className="rounded-[2.5rem] border-primary/10 shadow-xl overflow-hidden bg-white">
            <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Landmark className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground">Interactive Tax Savings Planner</h3>
                  <p className="text-xs text-muted-foreground font-semibold">Simulate deductions to estimate tax liability</p>
                </div>
              </div>

              {/* Preference toggle selection */}
              <button
                onClick={togglePreferredRegime}
                className={cn(
                  "px-3 py-1.5 rounded-xl border text-[10px] font-black tracking-widest uppercase transition-all cursor-pointer",
                  preferredRegime === "NEW" 
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 font-bold" 
                    : "bg-blue-500/10 border-blue-500/20 text-blue-600 font-bold"
                )}
                title="Change Regime Preference"
              >
                Regime Preference: {preferredRegime}
              </button>
            </div>

            <CardContent className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Inputs Sliders */}
              <div className="md:col-span-7 space-y-5">
                {/* Gross salary */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <label htmlFor="grossSalary" className="text-muted-foreground">Gross Salary / CTC</label>
                    <span className="font-mono text-primary bg-primary/5 px-2 py-0.5 rounded">
                      ₹{plannerInputs.grossSalary.toLocaleString()}
                    </span>
                  </div>
                  <input 
                    id="grossSalary"
                    type="range"
                    min="300000"
                    max="3000000"
                    step="50000"
                    value={plannerInputs.grossSalary}
                    onChange={(e) => updatePlannerInput("grossSalary", Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Section 80C */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <label htmlFor="section80C" className="text-muted-foreground">Section 80C Deductions (PPF, ELSS...)</label>
                    <span className="font-mono text-primary bg-primary/5 px-2 py-0.5 rounded">
                      ₹{plannerInputs.section80C.toLocaleString()}
                    </span>
                  </div>
                  <input 
                    id="section80C"
                    type="range"
                    min="0"
                    max="150000"
                    step="5000"
                    value={plannerInputs.section80C}
                    onChange={(e) => updatePlannerInput("section80C", Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* HRA Exemption */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <label htmlFor="hraExemption" className="text-muted-foreground">Rent Paid / HRA Exemption</label>
                    <span className="font-mono text-primary bg-primary/5 px-2 py-0.5 rounded">
                      ₹{plannerInputs.hraExemption.toLocaleString()}
                    </span>
                  </div>
                  <input 
                    id="hraExemption"
                    type="range"
                    min="0"
                    max="300000"
                    step="10000"
                    value={plannerInputs.hraExemption}
                    onChange={(e) => updatePlannerInput("hraExemption", Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>

              {/* Comparison Visual Display */}
              <div className="md:col-span-5 flex flex-col justify-center bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                <div className="space-y-4 text-center">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block">Estimated Liability Comparison</span>
                  
                  {/* Basic Slabs Visual Chart */}
                  <div className="space-y-3.5">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-muted-foreground">Old Tax Regime</span>
                        <span className="text-foreground">₹{taxResults.oldRegime.totalTax.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full transition-all duration-300"
                          style={{ 
                            width: `${Math.max(10, Math.min(100, (taxResults.oldRegime.totalTax / (plannerInputs.grossSalary || 1)) * 100 * 4))}%` 
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-muted-foreground">New Tax Regime</span>
                        <span className="text-foreground">₹{taxResults.newRegime.totalTax.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-600 h-full transition-all duration-300"
                          style={{ 
                            width: `${Math.max(10, Math.min(100, (taxResults.newRegime.totalTax / (plannerInputs.grossSalary || 1)) * 100 * 4))}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-dashed border-slate-200">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-black uppercase">
                      Recommended: {taxResults.recommendation} REGIME
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Filing Checklist */}
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
                {DEFAULT_DASHBOARD_CHECKLIST.map((item) => {
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
                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest block mb-0.5">
                          {item.category}
                        </span>
                        <span className={cn("text-sm font-bold text-foreground", isChecked && "line-through text-muted-foreground")}>
                          {item.label}
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

          {/* Recent AI tax helper conversations */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-foreground">Recent Tax AI Chats</h3>
                <p className="text-xs text-muted-foreground font-semibold">Resume your AI tax intelligence dialogues</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {recentChats.length > 0 ? (
                recentChats.map((chat) => (
                  <Link 
                    key={chat.id} 
                    href={`/chat`}
                    className="p-5 bg-white border border-primary/5 rounded-[2rem] hover:shadow-md hover:border-primary/20 transition-all flex flex-col justify-between h-36 group relative overflow-hidden"
                  >
                    <div className="absolute right-0 top-0 h-10 w-10 rounded-bl-[2rem] bg-slate-50 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="space-y-2 pr-6">
                      <h4 className="font-extrabold text-sm text-foreground line-clamp-2 leading-snug">
                        {chat.title}
                      </h4>
                      <span className="text-[10px] text-muted-foreground font-bold block">
                        {new Date(chat.timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </span>
                    </div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1 group-hover:gap-1.5 transition-all">
                      Resume Dialogue
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                ))
              ) : (
                <div className="col-span-3 p-8 rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-200 text-center space-y-4">
                  <p className="text-sm font-semibold text-muted-foreground">
                    Aapne abhi tak koi conversation start nahi kiya hai.
                  </p>
                  <Link href="/chat">
                    <Button className="rounded-xl font-bold bg-primary hover:bg-primary/95 text-white">
                      Start Asking Tax AI
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </section>

        </div>

        {/* Right Side: XP checkin, due dates, calculators shortcut (Col-4) */}
        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
          
          {/* Daily XP reward checkin widget */}
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
                onClick={handleDailyCheckIn}
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

          {/* Filing Deadlines alerts */}
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
              {DASHBOARD_DUE_DATES.map((evt) => {
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
                          {evt.date}
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
                        <h4 className={cn("text-xs font-black text-foreground", isCompleted && "line-through text-muted-foreground")}>
                          {evt.title}
                        </h4>
                        <div className="flex items-start gap-1 text-[10px] text-muted-foreground font-semibold">
                          <BadgeAlert className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <span>{evt.warning}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Calculator shortcuts */}
          <section className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground px-1">Quick Action Slabs</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/calculators/hra-calculator"
                className="p-4 bg-white border border-primary/5 rounded-3xl hover:border-primary/20 hover:shadow-md transition-all text-center space-y-1 block"
              >
                <span className="text-[10px] font-black text-accent uppercase tracking-widest block">Rent Allowance</span>
                <span className="text-xs font-bold text-foreground">HRA Calculator</span>
              </Link>
              <Link
                href="/calculators/gst-calculator"
                className="p-4 bg-white border border-primary/5 rounded-3xl hover:border-primary/20 hover:shadow-md transition-all text-center space-y-1 block"
              >
                <span className="text-[10px] font-black text-accent uppercase tracking-widest block">Indirect Taxes</span>
                <span className="text-xs font-bold text-foreground">GST Calculator</span>
              </Link>
              <Link
                href="/calculators/salary-breakdown"
                className="p-4 bg-white border border-primary/5 rounded-3xl hover:border-primary/20 hover:shadow-md transition-all text-center space-y-1 block"
              >
                <span className="text-[10px] font-black text-accent uppercase tracking-widest block">CTC Analysis</span>
                <span className="text-xs font-bold text-foreground">Salary Breakdown</span>
              </Link>
              <Link
                href="/compliance"
                className="p-4 bg-white border border-primary/5 rounded-3xl hover:border-primary/20 hover:shadow-md transition-all text-center space-y-1 block"
              >
                <span className="text-[10px] font-black text-accent uppercase tracking-widest block">Late Fees</span>
                <span className="text-xs font-bold text-foreground">Compliance Center</span>
              </Link>
            </div>
          </section>

        </div>

      </div>

    </div>
  );
}
