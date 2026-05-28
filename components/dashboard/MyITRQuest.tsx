"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight, Coins, Trophy, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { addXp } from "@/lib/gamification";
import { triggerConfetti } from "@/components/ui/Confetti";
import { Button } from "@/components/ui/button";

const STEPS = [
  { id: 1, title: "Personal Details", description: "PAN, Aadhaar, DOB", xp: 50 },
  { id: 2, title: "Income Sources", description: "Salary, Business, Capital Gains", xp: 100 },
  { id: 3, title: "Tax Deductions", description: "80C, 80D, HRA", xp: 150 },
];

export function MyITRQuest() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isFullyCompleted, setIsFullyCompleted] = useState(false);

  // Form values state
  const [formData, setFormData] = useState({
    pan: "",
    aadhaar: "",
    salary: "",
    businessIncome: "",
    section80c: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const completeCurrentStep = async () => {
    if (!completedSteps.includes(currentStep)) {
      const newCompleted = [...completedSteps, currentStep];
      setCompletedSteps(newCompleted);
      
      const stepData = STEPS.find(s => s.id === currentStep);
      if (stepData) {
        await addXp(stepData.xp);
        
        // Dispatch event so dashboard header updates XP
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("gamification-update"));
        }
      }

      if (newCompleted.length === STEPS.length) {
        setIsFullyCompleted(true);
        triggerConfetti();
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const progressPercentage = (completedSteps.length / STEPS.length) * 100;

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-primary/10 shadow-xl p-6 md:p-8">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl pointer-events-none" />
      
      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        
        {/* Left Side: Progress & Steps */}
        <div className="w-full md:w-1/3 space-y-6 border-r border-slate-100 pr-0 md:pr-6">
          <div>
            <h3 className="text-xl font-extrabold tracking-tight flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              My ITR Quest
            </h3>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              Complete your tax profile to level up faster and unlock AI insights.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600">Quest Progress</span>
              <span className="text-primary">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Steps List */}
          <div className="space-y-3 pt-4">
            {STEPS.map((step) => {
              const isCompleted = completedSteps.includes(step.id);
              const isActive = currentStep === step.id;
              
              return (
                <div 
                  key={step.id} 
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-2xl transition-all cursor-pointer border",
                    isActive ? "bg-primary/5 border-primary/20 shadow-sm" : 
                    isCompleted ? "bg-slate-50 border-transparent opacity-70" : "border-transparent hover:bg-slate-50"
                  )}
                  onClick={() => { if (isCompleted || isActive) setCurrentStep(step.id); }}
                >
                  <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-colors",
                    isCompleted ? "bg-emerald-500 text-white" : 
                    isActive ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-slate-200 text-slate-500"
                  )}>
                    {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs font-black">{step.id}</span>}
                  </div>
                  <div className="flex-1">
                    <div className={cn("text-sm font-bold", isActive ? "text-primary" : "text-slate-700")}>
                      {step.title}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
                      {step.description}
                    </div>
                  </div>
                  {!isCompleted && (
                    <div className="flex items-center gap-1 text-[10px] font-black text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full shrink-0">
                      <Coins className="h-3 w-3" />
                      +{step.xp}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Interactive Form Area */}
        <div className="w-full md:w-2/3 flex flex-col justify-center min-h-[300px]">
          {isFullyCompleted ? (
            <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-tr from-emerald-400 to-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-500/30">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-800">Quest Completed! 🎉</h3>
                <p className="text-sm text-slate-500 font-medium mt-2 max-w-sm mx-auto">
                  Your tax profile is fully loaded. The AI Tax Engine now has all it needs to maximize your savings.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-600 rounded-full text-xs font-black uppercase tracking-widest border border-amber-500/20">
                <Trophy className="h-4 w-4" />
                Total XP Earned: 300
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300" key={currentStep}>
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-2">
                  Step {currentStep} of {STEPS.length}
                </span>
                <h4 className="text-xl font-bold text-slate-800">{STEPS[currentStep - 1].title}</h4>
                <p className="text-xs text-slate-500 mt-1">{STEPS[currentStep - 1].description}</p>
              </div>

              {/* Step 1 Form */}
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">PAN Number</label>
                    <input 
                      name="pan" 
                      value={formData.pan} 
                      onChange={handleInputChange}
                      placeholder="ABCDE1234F"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-mono text-sm uppercase placeholder:normal-case placeholder:font-sans"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Aadhaar Number</label>
                    <input 
                      name="aadhaar" 
                      value={formData.aadhaar} 
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-mono text-sm placeholder:font-sans"
                    />
                  </div>
                </div>
              )}

              {/* Step 2 Form */}
              {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Annual Salary (₹)</label>
                    <input 
                      name="salary" 
                      type="number"
                      value={formData.salary} 
                      onChange={handleInputChange}
                      placeholder="e.g. 1200000"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Business/Freelance (₹)</label>
                    <input 
                      name="businessIncome" 
                      type="number"
                      value={formData.businessIncome} 
                      onChange={handleInputChange}
                      placeholder="e.g. 400000"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Step 3 Form */}
              {currentStep === 3 && (
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Total 80C Investments (₹)</label>
                    <input 
                      name="section80c" 
                      type="number"
                      value={formData.section80c} 
                      onChange={handleInputChange}
                      placeholder="e.g. 150000"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm"
                    />
                    <p className="text-[10px] text-muted-foreground">Includes ELSS, PPF, LIC, EPF etc.</p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button 
                  onClick={completeCurrentStep}
                  className="rounded-xl px-6 py-5 bg-gradient-to-r from-primary to-indigo-600 hover:opacity-90 transition-opacity font-bold shadow-lg shadow-primary/25"
                >
                  Save & Earn XP
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
