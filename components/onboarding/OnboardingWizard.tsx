"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Briefcase, 
  Building2, 
  GraduationCap, 
  Coffee, 
  LineChart, 
  Megaphone,
  ArrowRight,
  CheckCircle2,
  Loader2,
  ChevronLeft,
  MapPin,
  Target,
  ShieldCheck,
  Languages
} from "lucide-react";
import { saveUserProfile, UserProfileData } from "@/actions/profile";

const OCCUPATIONS = [
  { id: "Salaried", label: "Salaried Employee", icon: Briefcase },
  { id: "Business Owner", label: "Business Owner", icon: Building2 },
  { id: "Freelancer", label: "Freelancer / Consultant", icon: Coffee },
  { id: "Investor", label: "Trader / Investor", icon: LineChart },
  { id: "Creator", label: "Creator / Influencer", icon: Megaphone },
  { id: "Student", label: "Student", icon: GraduationCap },
];

const BUSINESS_STATUSES = [
  { id: "Planning", label: "Planning to start soon" },
  { id: "Unregistered", label: "Running an unregistered business" },
  { id: "Registered", label: "Already registered (GST/Company)" },
];

const INCOME_BRACKETS = [
  { id: "0-3L", label: "Under ₹3 Lakhs (No Tax Zone)" },
  { id: "3-7L", label: "₹3L - ₹7 Lakhs (Rebate Zone)" },
  { id: "7-15L", label: "₹7L - ₹15 Lakhs" },
  { id: "15L+", label: "Above ₹15 Lakhs" },
];

const AGE_BRACKETS = [
  { id: "Below 60", label: "Below 60 years" },
  { id: "60-80", label: "60 - 80 years (Senior Citizen)" },
  { id: "Above 80", label: "Above 80 years (Super Senior)" },
];

const TAX_GOALS = [
  { id: "File ITR", label: "File my ITR accurately" },
  { id: "Save Tax", label: "Learn how to save taxes" },
  { id: "Start Business", label: "Register a new business" },
  { id: "GST", label: "Manage GST compliances" },
];

export function OnboardingWizard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<UserProfileData>({
    taxGoals: [],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateData = (key: keyof UserProfileData, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    // Conditional logic for skipping business status if not relevant
    if (step === 0 && !["Business Owner", "Freelancer", "Creator"].includes(data.occupation || "")) {
      setStep(2); // Skip business status
      return;
    }
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step === 2 && !["Business Owner", "Freelancer", "Creator"].includes(data.occupation || "")) {
      setStep(0);
      return;
    }
    setStep((s) => Math.max(0, s - 1));
  };

  const toggleGoal = (goalId: string) => {
    const current = data.taxGoals || [];
    if (current.includes(goalId)) {
      updateData("taxGoals", current.filter(g => g !== goalId));
    } else {
      updateData("taxGoals", [...current, goalId]);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      // 1. Save to local storage for immediate personalization (works for guests too)
      if (typeof window !== "undefined") {
        localStorage.setItem("tax-user-profile", JSON.stringify(data));
      }
      
      // 2. Try to save to DB via Server Action (will gracefully fail if not logged in)
      const res = await saveUserProfile(data);
      
      // 3. Redirect to dashboard
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="w-full max-w-3xl mx-auto min-h-[60vh] flex flex-col justify-center relative">
      
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${(step / 5) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      <div className="pt-8">
        {step > 0 && step < 5 && (
          <button 
            onClick={handleBack}
            className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 0: Occupation */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
                  Hi there! 👋 What do you do?
                </h2>
                <p className="text-muted-foreground font-medium">
                  We'll customize your tax recommendations based on your primary source of income.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {OCCUPATIONS.map((occ) => {
                  const Icon = occ.icon;
                  const isSelected = data.occupation === occ.id;
                  return (
                    <button
                      key={occ.id}
                      onClick={() => {
                        updateData("occupation", occ.id);
                        setTimeout(handleNext, 300);
                      }}
                      className={`flex items-center gap-4 p-5 rounded-[1.5rem] border-2 text-left transition-all duration-300 ${
                        isSelected 
                          ? "border-primary bg-primary/5 shadow-md scale-[1.02]" 
                          : "border-slate-100 hover:border-primary/30 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected ? "bg-primary text-white" : "bg-slate-100 text-slate-500"
                      }`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="block font-bold text-foreground">{occ.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 1: Business Status (Conditional) */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
                  How is your business set up? 🏢
                </h2>
                <p className="text-muted-foreground font-medium">
                  This helps us identify if you need GST or company compliance tracking.
                </p>
              </div>

              <div className="space-y-4">
                {BUSINESS_STATUSES.map((status) => {
                  const isSelected = data.businessStatus === status.id;
                  return (
                    <button
                      key={status.id}
                      onClick={() => {
                        updateData("businessStatus", status.id);
                        setTimeout(handleNext, 300);
                      }}
                      className={`w-full flex items-center gap-4 p-5 rounded-[1.5rem] border-2 text-left transition-all duration-300 ${
                        isSelected 
                          ? "border-primary bg-primary/5 shadow-md scale-[1.02]" 
                          : "border-slate-100 hover:border-primary/30 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? "border-primary bg-primary text-white" : "border-slate-300"
                      }`}>
                        {isSelected && <CheckCircle2 className="h-4 w-4" />}
                      </div>
                      <span className="block font-bold text-foreground text-lg">{status.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Income & Age */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-10"
            >
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
                  Let's talk numbers 📊
                </h2>
                <p className="text-muted-foreground font-medium">
                  Tax slabs vary by age and income. We never share this data.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-black text-muted-foreground uppercase tracking-widest mb-4 block">
                    Estimated Annual Income
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {INCOME_BRACKETS.map((bracket) => (
                      <button
                        key={bracket.id}
                        onClick={() => updateData("annualIncomeEstimate", bracket.id)}
                        className={`p-4 rounded-2xl border-2 text-left font-bold transition-all ${
                          data.annualIncomeEstimate === bracket.id 
                            ? "border-primary bg-primary/5 text-primary" 
                            : "border-slate-100 hover:border-primary/30 text-slate-700"
                        }`}
                      >
                        {bracket.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-black text-muted-foreground uppercase tracking-widest mb-4 block">
                    Your Age Group
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {AGE_BRACKETS.map((bracket) => (
                      <button
                        key={bracket.id}
                        onClick={() => updateData("ageBracket", bracket.id)}
                        className={`p-4 rounded-2xl border-2 text-center font-bold transition-all ${
                          data.ageBracket === bracket.id 
                            ? "border-primary bg-primary/5 text-primary" 
                            : "border-slate-100 hover:border-primary/30 text-slate-700"
                        }`}
                      >
                        {bracket.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  disabled={!data.annualIncomeEstimate || !data.ageBracket}
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-primary/20"
                >
                  Continue
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Tax Goals */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
                  What brings you here? 🎯
                </h2>
                <p className="text-muted-foreground font-medium">
                  Select all that apply. We'll prioritize these tools for you.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {TAX_GOALS.map((goal) => {
                  const isSelected = data.taxGoals?.includes(goal.id);
                  return (
                    <button
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className={`w-full flex items-center justify-between p-5 rounded-[1.5rem] border-2 text-left transition-all duration-300 ${
                        isSelected 
                          ? "border-primary bg-primary/5 shadow-md" 
                          : "border-slate-100 hover:border-primary/30 hover:bg-slate-50"
                      }`}
                    >
                      <span className={`font-bold text-lg ${isSelected ? "text-primary" : "text-foreground"}`}>
                        {goal.label}
                      </span>
                      <div className={`h-6 w-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                        isSelected ? "border-primary bg-primary text-white" : "border-slate-300"
                      }`}>
                        {isSelected && <CheckCircle2 className="h-4 w-4" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
                >
                  Almost Done
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Completion */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-8 py-10"
            >
              <div className="mx-auto h-24 w-24 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <ShieldCheck className="h-12 w-12 text-emerald-500" />
              </div>
              
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                  Profile Personalized! ✨
                </h2>
                <p className="text-muted-foreground font-medium max-w-md mx-auto">
                  We've tailored the dashboard, compliance calendar, and calculators based on your profile.
                </p>
              </div>

              <button
                onClick={handleComplete}
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-primary to-indigo-600 text-white font-bold hover:opacity-90 transition-all shadow-xl shadow-primary/20 w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Setting up your dashboard...
                  </>
                ) : (
                  <>
                    Go to My Dashboard
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
