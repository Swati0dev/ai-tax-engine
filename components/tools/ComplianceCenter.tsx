"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Info, 
  CheckCircle, 
  AlertTriangle, 
  Plus, 
  Minus, 
  TrendingUp, 
  ListTodo,
  FileText,
  Clock,
  Bell,
  BellOff
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleComplianceDoc } from "@/actions/compliance";
import { getUserProfile, UserProfileData } from "@/actions/profile";
import { getDynamicComplianceDates, getDynamicChecklist } from "@/lib/compliance-engine";

type Category = "ALL" | "DIRECT" | "INDIRECT" | "TDS";
type EstimatorType = "itr" | "gst" | "tds";

interface ComplianceFormItem {
  id: string;
  slug: string;
  title: string;
  relatedForms: string[];
  filingProcedure: string[];
  category: string;
  sectionNumber?: string | null;
  explanation?: string;
  applicability?: string[];
  benefitsOrDeductions?: string[];
  restrictions?: string[];
  examples?: string[];
  actName: string;
}

interface ComplianceCenterProps {
  initialDbForms?: ComplianceFormItem[];
  initialCompletedDocs?: string[];
}

export function ComplianceCenter({ initialDbForms = [], initialCompletedDocs = [] }: ComplianceCenterProps) {
  const [timelineFilter, setTimelineFilter] = useState<Category>("ALL");
  const [completedEvents, setCompletedEvents] = useState<string[]>([]);
  const [alertsEnabled, setAlertsEnabled] = useState<string[]>([]);

  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);

  // Dynamic lists based on user profile
  const timelineEvents = useMemo(() => getDynamicComplianceDates(userProfile), [userProfile]);
  const checklist = useMemo(() => getDynamicChecklist(userProfile), [userProfile]);

  // Checklist states
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  // Penalty Estimator states
  const [estimator, setEstimator] = useState<EstimatorType>("itr");
  const [itrTaxableIncome, setItrTaxableIncome] = useState<number>(600000);
  const [itrPendingTax, setItrPendingTax] = useState<number>(20000);
  const [itrDaysLate, setItrDaysLate] = useState<number>(30);
  
  const [gstNilReturn, setGstNilReturn] = useState<boolean>(false);
  const [gstDaysLate, setGstDaysLate] = useState<boolean>(false); // Wait, make days late as number
  const [gstDaysLateCount, setGstDaysLateCount] = useState<number>(15);
  
  const [tdsPendingAmt, setTdsPendingAmt] = useState<number>(15000);
  const [tdsDaysLate, setTdsDaysLate] = useState<number>(20);

  // Sync with LocalStorage and DB
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (initialCompletedDocs && initialCompletedDocs.length > 0) {
        const events = initialCompletedDocs.filter(id => id.startsWith('t'));
        const items = initialCompletedDocs.filter(id => id.startsWith('c'));
        setCompletedEvents(events);
        setCheckedItems(items);
        localStorage.setItem("tax-compliance-completed", JSON.stringify(events));
        localStorage.setItem("tax-compliance-checklist", JSON.stringify(items));
      } else {
        const savedEvents = localStorage.getItem("tax-compliance-completed");
        if (savedEvents) setCompletedEvents(JSON.parse(savedEvents));
        
        const savedChecked = localStorage.getItem("tax-compliance-checklist");
        if (savedChecked) setCheckedItems(JSON.parse(savedChecked));
      }

      const savedAlerts = localStorage.getItem("tax-compliance-alerts");
      if (savedAlerts) setAlertsEnabled(JSON.parse(savedAlerts));

      const localProfile = localStorage.getItem("tax-user-profile");
      if (localProfile) {
        try { setUserProfile(JSON.parse(localProfile)); } catch {}
      } else {
        getUserProfile().then(res => {
          if (res.success && res.data) setUserProfile(res.data as unknown as UserProfileData);
        }).catch(() => {});
      }
    }
  }, [initialCompletedDocs]);

  const toggleEventComplete = (id: string) => {
    const isCompleted = !completedEvents.includes(id);
    const updated = isCompleted 
      ? [...completedEvents, id]
      : completedEvents.filter(eId => eId !== id);
      
    setCompletedEvents(updated);
    localStorage.setItem("tax-compliance-completed", JSON.stringify(updated));
    toggleComplianceDoc(id, isCompleted).catch(() => {});
  };

  const toggleAlert = (id: string) => {
    const updated = alertsEnabled.includes(id)
      ? alertsEnabled.filter(aId => aId !== id)
      : [...alertsEnabled, id];
    setAlertsEnabled(updated);
    localStorage.setItem("tax-compliance-alerts", JSON.stringify(updated));
  };

  const toggleChecklistItem = (id: string) => {
    const isCompleted = !checkedItems.includes(id);
    const updated = isCompleted
      ? [...checkedItems, id]
      : checkedItems.filter(cId => cId !== id);
      
    setCheckedItems(updated);
    localStorage.setItem("tax-compliance-checklist", JSON.stringify(updated));
    toggleComplianceDoc(id, isCompleted).catch(() => {});
  };

  // Timeline events filter
  const filteredEvents = useMemo(() => {
    if (timelineFilter === "ALL") return timelineEvents;
    return timelineEvents.filter(e => e.category === timelineFilter);
  }, [timelineFilter, timelineEvents]);

  // Checklist statistics
  const progressPercent = useMemo(() => {
    if (checklist.length === 0) return 0;
    return Math.round((checkedItems.length / checklist.length) * 100);
  }, [checkedItems, checklist]);

  // Penalty calculations
  const penaltyResult = useMemo(() => {
    let lateFee = 0;
    let interest = 0;
    let notes = "";

    if (estimator === "itr") {
      // Late Fee (Section 234F): Max ₹5,000. Under ₹5 Lakhs taxable income, capped at ₹1,000.
      if (itrDaysLate > 0) {
        lateFee = itrTaxableIncome <= 500000 ? 1000 : 5000;
      }
      // Interest (Section 234A): 1% per month on outstanding tax liability
      if (itrDaysLate > 0 && itrPendingTax > 0) {
        const months = Math.ceil(itrDaysLate / 30);
        interest = itrPendingTax * 0.01 * months;
      }
      notes = `Includes Section 234F filing penalty + Section 234A interest (1% per month) on pending tax liability of ₹${itrPendingTax.toLocaleString()}.`;
    } else if (estimator === "gst") {
      // GST Late Fees: ₹50/day (₹20/day for Nil return) capped at ₹5,000.
      const ratePerDay = gstNilReturn ? 20 : 50;
      lateFee = Math.min(5000, gstDaysLateCount * ratePerDay);
      // Interest on unpaid GST is 18% p.a.
      notes = `Late fee calculated at ₹${ratePerDay} per day (capped at ₹5,000) for CGST + SGST. Interest on unpaid tax is charged separately at 18% per annum.`;
    } else if (estimator === "tds") {
      // TDS late filing fee (Section 234E): ₹200/day capped at total TDS amount.
      lateFee = Math.min(tdsPendingAmt, tdsDaysLate * 200);
      notes = `Late fee under Section 234E of ₹200/day, legally capped at the total TDS amount of ₹${tdsPendingAmt.toLocaleString()}.`;
    }

    return {
      lateFee: Math.round(lateFee),
      interest: Math.round(interest),
      total: Math.round(lateFee + interest),
      notes
    };
  }, [estimator, itrTaxableIncome, itrPendingTax, itrDaysLate, gstNilReturn, gstDaysLateCount, tdsPendingAmt, tdsDaysLate]);

  return (
    <div className="space-y-16">
      
      {/* Overview Tracker */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-[2rem] bg-white border border-border shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Filing Checklist Progress</span>
            <span className="text-3xl font-black text-foreground">{progressPercent}% Done</span>
          </div>
          <div className="mt-6 w-full bg-muted h-3 rounded-full overflow-hidden">
            <div 
              className="bg-primary h-full transition-all duration-500" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="p-8 rounded-[2rem] bg-white border border-border shadow-sm flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Upcoming Due Dates</span>
            <span className="text-3xl font-black text-foreground font-heading">July 31, 2024</span>
            <span className="text-xs text-rose-500 font-bold block mt-1">ITR Filing Deadline (Individuals)</span>
          </div>
        </div>

        <div className="p-8 rounded-[2rem] bg-white border border-border shadow-sm flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Active Alerts</span>
            <span className="text-3xl font-black text-foreground">{alertsEnabled.length} Set</span>
            <span className="text-xs text-muted-foreground font-medium block mt-1">Get notifications before due dates</span>
          </div>
        </div>
      </section>

      {/* Main Timeline & Checklist Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Timeline (Col-8) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground">Compliance Timeline</h3>
                <p className="text-xs text-muted-foreground font-semibold">Important dates under Indian Tax Laws</p>
              </div>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap gap-1.5 bg-muted/60 p-1 rounded-xl border">
              {(["ALL", "DIRECT", "INDIRECT", "TDS"] as Category[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setTimelineFilter(cat)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-bold rounded-lg transition-all",
                    timelineFilter === cat
                      ? "bg-white text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {cat === "ALL" ? "All" : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="relative border-l border-primary/10 pl-6 ml-4 space-y-8 py-2">
            {filteredEvents.map((evt) => {
              const isCompleted = completedEvents.includes(evt.id);
              const isAlertSet = alertsEnabled.includes(evt.id);
              return (
                <div key={evt.id} className="relative group">
                  {/* Timeline bullet dot */}
                  <button
                    onClick={() => toggleEventComplete(evt.id)}
                    className={cn(
                      "absolute -left-9 top-1.5 h-6 w-6 rounded-full border bg-white flex items-center justify-center transition-all cursor-pointer",
                      isCompleted 
                        ? "border-emerald-500 bg-emerald-50 text-emerald-600 scale-110" 
                        : "border-primary/20 hover:border-primary text-transparent"
                    )}
                    title={isCompleted ? "Mark Incomplete" : "Mark Done"}
                  >
                    <CheckCircle className={cn("h-4 w-4", isCompleted ? "opacity-100" : "opacity-0")} />
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-bold text-primary font-mono">{evt.date}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md">
                          {evt.category}
                        </span>
                        <button
                          onClick={() => toggleAlert(evt.id)}
                          className={cn(
                            "p-1.5 rounded-lg border transition-colors",
                            isAlertSet 
                              ? "bg-amber-500/10 border-amber-500/20 text-amber-600" 
                              : "hover:bg-muted text-muted-foreground"
                          )}
                          title={isAlertSet ? "Remove Alert" : "Set Alert"}
                        >
                          {isAlertSet ? <Bell className="h-3.5 w-3.5" /> : <BellOff className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>

                    <Card className={cn(
                      "rounded-[2rem] border-primary/10 shadow-sm transition-all duration-300",
                      isCompleted && "opacity-60 border-emerald-500/20 bg-emerald-500/[0.01]"
                    )}>
                      <CardContent className="p-6">
                        <h4 className={cn("font-bold text-lg text-foreground", isCompleted && "line-through text-muted-foreground")}>
                          {evt.title}
                        </h4>
                        <p className="text-sm text-muted-foreground font-medium leading-relaxed mt-2">
                          {evt.description}
                        </p>
                        
                        {/* Penalty warning */}
                        <div className="flex items-start gap-2 mt-4 p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-amber-900 text-xs">
                          <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                          <p className="font-semibold">{evt.warning}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Checklists (Col-5) */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
          
          {/* Checklist Card */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                <ListTodo className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-foreground">Filing Checklists</h3>
                <p className="text-xs text-muted-foreground font-semibold">Track your document preparation</p>
              </div>
            </div>

            <Card className="rounded-[2rem] border-primary/10 shadow-lg">
              <CardContent className="p-6 space-y-4">
                {checklist.map((item) => {
                  const isChecked = checkedItems.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className="w-full text-left flex items-start gap-3.5 p-3 rounded-2xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border cursor-pointer group"
                    >
                      <div className={cn(
                        "h-5 w-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                        isChecked ? "border-primary bg-primary text-white" : "border-muted-foreground/30 group-hover:border-primary/50 bg-white"
                      )}>
                        {isChecked && <CheckCircle className="h-4 w-4" />}
                      </div>
                      <div>
                        <span className={cn("text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-0.5")}>
                          {item.category}
                        </span>
                        <span className={cn("text-sm font-semibold text-foreground", isChecked && "line-through text-muted-foreground")}>
                          {item.label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Database reference section (Prisma items) */}
          {initialDbForms.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-teal-500/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground">Filing Procedures</h3>
                  <p className="text-xs text-muted-foreground font-semibold">Guides from dynamic database</p>
                </div>
              </div>

              <div className="space-y-4">
                {initialDbForms.slice(0, 3).map((form: ComplianceFormItem, idx: number) => (
                  <Card key={idx} className="rounded-3xl border-primary/10 shadow-md">
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-md">
                          {form.actName || "Income Tax Act"}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-foreground">{form.title}</h4>
                      {form.relatedForms?.length > 0 && (
                        <div className="text-xs font-medium text-muted-foreground">
                          <strong>Forms:</strong> {form.relatedForms.join(", ")}
                        </div>
                      )}
                      {form.filingProcedure?.length > 0 && (
                        <div className="text-xs font-medium text-muted-foreground bg-slate-50 p-2.5 rounded-xl border">
                          <strong>Steps:</strong> {form.filingProcedure[0]}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Penalty Estimator Slider Section */}
      <section className="border-t pt-16 space-y-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">Reminders & Penalty Estimator</h3>
            <p className="text-xs text-muted-foreground font-semibold">Estimate late fees and interest liabilities for delayed filings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-3 gap-2 bg-muted/60 p-1.5 rounded-2xl border">
              {[
                { id: "itr", label: "ITR Filing (Sec 234F)" },
                { id: "gst", label: "GST Returns" },
                { id: "tds", label: "TDS Returns (Sec 234E)" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setEstimator(tab.id as EstimatorType)}
                  className={cn(
                    "py-3 text-xs font-bold rounded-xl transition-all",
                    estimator === tab.id
                      ? "bg-white text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <Card className="rounded-[2rem] border-primary/10 shadow-lg">
              <CardContent className="p-6 space-y-6">
                
                {estimator === "itr" && (
                  <>
                    {/* Taxable Income Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-bold">
                        <label htmlFor="itrTaxable" className="text-foreground">Taxable Income</label>
                        <span className="text-primary font-mono bg-primary/5 px-2.5 py-1 rounded-lg">
                          ₹{itrTaxableIncome.toLocaleString()}
                        </span>
                      </div>
                      <input
                        id="itrTaxable"
                        type="range"
                        min="200000"
                        max="2000000"
                        step="50000"
                        value={itrTaxableIncome}
                        onChange={(e) => setItrTaxableIncome(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-[10px] text-muted-foreground font-bold">
                        <span>₹2 Lakh</span>
                        <span>₹20 Lakh</span>
                      </div>
                    </div>

                    {/* Pending Tax Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-bold">
                        <label htmlFor="itrPending" className="text-foreground">Unpaid / Pending Tax</label>
                        <span className="text-primary font-mono bg-primary/5 px-2.5 py-1 rounded-lg">
                          ₹{itrPendingTax.toLocaleString()}
                        </span>
                      </div>
                      <input
                        id="itrPending"
                        type="range"
                        min="0"
                        max="200000"
                        step="5000"
                        value={itrPendingTax}
                        onChange={(e) => setItrPendingTax(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-[10px] text-muted-foreground font-bold">
                        <span>₹0</span>
                        <span>₹2,00,000</span>
                      </div>
                    </div>

                    {/* Days delayed */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-bold">
                        <label htmlFor="itrDays" className="text-foreground">Days Delayed (after July 31)</label>
                        <span className="text-primary font-mono bg-primary/5 px-2.5 py-1 rounded-lg">
                          {itrDaysLate} Days
                        </span>
                      </div>
                      <input
                        id="itrDays"
                        type="range"
                        min="0"
                        max="180"
                        step="5"
                        value={itrDaysLate}
                        onChange={(e) => setItrDaysLate(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-[10px] text-muted-foreground font-bold">
                        <span>0 Days (On Time)</span>
                        <span>180 Days</span>
                      </div>
                    </div>
                  </>
                )}

                {estimator === "gst" && (
                  <>
                    {/* Nil Return Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border">
                      <div>
                        <span className="text-sm font-bold text-foreground block">Nil Sales Return?</span>
                        <span className="text-[10px] text-muted-foreground font-semibold">Nil returns have reduced late fees of ₹20/day</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setGstNilReturn(!gstNilReturn)}
                        className={cn(
                          "relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                          gstNilReturn ? "bg-primary" : "bg-zinc-300"
                        )}
                      >
                        <span
                          className={cn(
                            "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                            gstNilReturn ? "translate-x-5" : "translate-x-0"
                          )}
                        />
                      </button>
                    </div>

                    {/* Days delayed */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-bold">
                        <label htmlFor="gstDays" className="text-foreground">Days Delayed (after 11th/20th)</label>
                        <span className="text-primary font-mono bg-primary/5 px-2.5 py-1 rounded-lg">
                          {gstDaysLateCount} Days
                        </span>
                      </div>
                      <input
                        id="gstDays"
                        type="range"
                        min="0"
                        max="180"
                        step="5"
                        value={gstDaysLateCount}
                        onChange={(e) => setGstDaysLateCount(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-[10px] text-muted-foreground font-bold">
                        <span>0 Days (On Time)</span>
                        <span>180 Days</span>
                      </div>
                    </div>
                  </>
                )}

                {estimator === "tds" && (
                  <>
                    {/* TDS Amount */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-bold">
                        <label htmlFor="tdsAmtSlider" className="text-foreground">Pending TDS Amount (₹)</label>
                        <span className="text-primary font-mono bg-primary/5 px-2.5 py-1 rounded-lg">
                          ₹{tdsPendingAmt.toLocaleString()}
                        </span>
                      </div>
                      <input
                        id="tdsAmtSlider"
                        type="range"
                        min="1000"
                        max="100000"
                        step="2000"
                        value={tdsPendingAmt}
                        onChange={(e) => setTdsPendingAmt(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-[10px] text-muted-foreground font-bold">
                        <span>₹1,000</span>
                        <span>₹1,00,000</span>
                      </div>
                    </div>

                    {/* Days delayed */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-bold">
                        <label htmlFor="tdsDaysSlider" className="text-foreground">Days Delayed (after 31st of Qtr end)</label>
                        <span className="text-primary font-mono bg-primary/5 px-2.5 py-1 rounded-lg">
                          {tdsDaysLate} Days
                        </span>
                      </div>
                      <input
                        id="tdsDaysSlider"
                        type="range"
                        min="0"
                        max="180"
                        step="5"
                        value={tdsDaysLate}
                        onChange={(e) => setTdsDaysLate(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-[10px] text-muted-foreground font-bold">
                        <span>0 Days (On Time)</span>
                        <span>180 Days</span>
                      </div>
                    </div>
                  </>
                )}

              </CardContent>
            </Card>
          </div>

          {/* Outputs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-[2rem] border-2 bg-rose-500/5 border-rose-500/20 flex flex-col items-center text-center gap-2 shadow-xl">
              <div className="h-10 w-10 rounded-full bg-rose-500 text-white flex items-center justify-center mb-1">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-muted-foreground">Estimated Penalty Fees</h3>
              <p className="text-4xl font-black text-rose-600 font-heading">
                ₹{penaltyResult.total.toLocaleString()}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Total penalty + late fees
              </p>
            </div>

            <Card className="rounded-[2rem] border-primary/10 shadow-lg">
              <CardContent className="p-6 space-y-4">
                <h4 className="font-bold text-sm text-foreground">Calculations Summary</h4>
                <div className="space-y-3.5">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-muted-foreground">Mandatory Late Filing Fee</span>
                    <span>₹{penaltyResult.lateFee.toLocaleString()}</span>
                  </div>
                  {penaltyResult.interest > 0 && (
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-muted-foreground">Interest on Outstanding Tax</span>
                      <span>₹{penaltyResult.interest.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-extrabold border-t pt-3.5">
                    <span className="text-foreground">Total Financial Liability</span>
                    <span className="text-rose-600 font-heading">₹{penaltyResult.total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 flex gap-4">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="text-xs font-semibold text-muted-foreground leading-relaxed">
                <p className="font-bold text-foreground">Section Notes:</p>
                <p className="font-medium text-[11px] mt-0.5">
                  {penaltyResult.notes}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
