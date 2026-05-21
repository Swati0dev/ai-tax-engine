"use client";

import React, { useState } from "react";
import { CheckCircle2, Briefcase, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { addXp } from "@/lib/gamification";
import { triggerConfetti } from "@/components/ui/Confetti";

type QuestionId = "income_source" | "salary_amount" | "business_type" | "capital_gains" | "foreign_assets" | "result";

interface WizardState {
  currentStep: QuestionId;
  answers: Record<string, string>;
  progress: number;
}

export default function ITRWizard() {
  const [state, setState] = useState<WizardState>({
    currentStep: "income_source",
    answers: {},
    progress: 10,
  });
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (question: string, answer: string, nextStep: QuestionId, nextProgress: number) => {
    setState((prev) => ({
      currentStep: nextStep,
      answers: { ...prev.answers, [question]: answer },
      progress: nextProgress,
    }));
  };

  const finishQuiz = () => {
    setCompleted(true);
    addXp(100); // Increased XP for the gamified feel
    triggerConfetti();
  };

  const resetQuiz = () => {
    setState({ currentStep: "income_source", answers: {}, progress: 10 });
    setCompleted(false);
  };

  const getResult = () => {
    const { answers } = state;
    if (answers.income_source === "business") {
      return answers.business_type === "presumptive" ? "ITR-4 (Sugam)" : "ITR-3";
    }
    if (answers.foreign_assets === "yes" || answers.capital_gains === "yes") {
      return "ITR-2";
    }
    if (answers.income_source === "salary" && answers.salary_amount === "under_50lakh") {
      return "ITR-1 (Sahaj)";
    }
    return "ITR-2";
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -50, scale: 0.95 },
  };

  const btnHover = {
    scale: 1.02,
    y: -2,
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      
      {/* Progress Bar Container */}
      <div className="mb-8 bg-slate-100/80 rounded-full h-3 overflow-hidden shadow-inner p-0.5 border border-slate-200/40">
        <motion.div 
          className="h-full bg-accent rounded-full"
          initial={{ width: "10%" }}
          animate={{ width: `${completed ? 100 : state.progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      <div className="bg-white/90 backdrop-blur-md border border-slate-200/60 shadow-[0_20px_50px_rgba(8,112,184,0.05)] rounded-2xl min-h-[420px] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-10 border-b border-slate-100 bg-slate-50/50 flex items-center px-6 gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/70"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/70"></div>
        </div>

        <div className="p-8 md:p-12 mt-8 relative z-10">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Income Source */}
            {state.currentStep === "income_source" && !completed && (
              <motion.div key="income" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="space-y-10">
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 text-center leading-tight">What is your <span className="text-accent">primary source</span> of income?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <motion.button 
                    whileHover={btnHover} whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer("income_source", "salary", "salary_amount", 30)} 
                    className="flex flex-col items-center justify-center p-8 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md group cursor-pointer"
                  >
                    <Briefcase className="w-12 h-12 text-primary/70 mb-4 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                    <span className="text-lg font-bold text-slate-700">Salary / Pension</span>
                  </motion.button>
                  <motion.button 
                    whileHover={btnHover} whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer("income_source", "business", "business_type", 30)} 
                    className="flex flex-col items-center justify-center p-8 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md group cursor-pointer"
                  >
                    <Home className="w-12 h-12 text-primary/70 mb-4 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                    <span className="text-lg font-bold text-slate-700">Business / Profession</span>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 2 (Salary Path): Salary Amount */}
            {state.currentStep === "salary_amount" && !completed && (
              <motion.div key="salary" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="space-y-10">
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 text-center leading-tight">Is your total income more than <span className="text-accent">₹50 Lakhs?</span></h3>
                <div className="flex flex-col gap-4 mt-8">
                  <motion.button whileHover={btnHover} whileTap={{ scale: 0.98 }} onClick={() => handleAnswer("salary_amount", "under_50lakh", "capital_gains", 60)} className="w-full text-left p-5 bg-white border border-slate-200 rounded-xl text-base font-semibold text-slate-700 hover:border-primary/20 hover:bg-slate-50/50 hover:shadow-sm transition-all cursor-pointer">
                    No, it is up to ₹50 Lakhs
                  </motion.button>
                  <motion.button whileHover={btnHover} whileTap={{ scale: 0.98 }} onClick={() => handleAnswer("salary_amount", "over_50lakh", "capital_gains", 60)} className="w-full text-left p-5 bg-white border border-slate-200 rounded-xl text-base font-semibold text-slate-700 hover:border-primary/20 hover:bg-slate-50/50 hover:shadow-sm transition-all cursor-pointer">
                    Yes, it is more than ₹50 Lakhs
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 2 (Business Path): Business Type */}
            {state.currentStep === "business_type" && !completed && (
              <motion.div key="business" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 text-center leading-tight">Are you opting for the <span className="text-accent">Presumptive</span> Scheme?</h3>
                <p className="text-center text-slate-600 font-medium px-4 border-l-4 border-accent bg-accent/5 py-3 rounded-r-lg">Sections 44AD or 44ADA (declaring profit percentage without detailed books).</p>
                <div className="flex flex-col gap-4 mt-6">
                  <motion.button whileHover={btnHover} whileTap={{ scale: 0.98 }} onClick={() => handleAnswer("business_type", "presumptive", "capital_gains", 60)} className="w-full text-left p-5 bg-white border border-slate-200 rounded-xl text-base font-semibold text-slate-700 hover:border-primary/20 hover:bg-slate-50/50 hover:shadow-sm transition-all cursor-pointer">
                    Yes, I am opting for it
                  </motion.button>
                  <motion.button whileHover={btnHover} whileTap={{ scale: 0.98 }} onClick={() => handleAnswer("business_type", "regular", "capital_gains", 60)} className="w-full text-left p-5 bg-white border border-slate-200 rounded-xl text-base font-semibold text-slate-700 hover:border-primary/20 hover:bg-slate-50/50 hover:shadow-sm transition-all cursor-pointer">
                    No, I maintain regular books
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Capital Gains */}
            {state.currentStep === "capital_gains" && !completed && (
              <motion.div key="capital" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="space-y-10">
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 text-center leading-tight">Did you sell any property, shares, or mutual funds this year?</h3>
                <div className="flex flex-col gap-4 mt-8">
                  <motion.button whileHover={btnHover} whileTap={{ scale: 0.98 }} onClick={() => handleAnswer("capital_gains", "yes", "foreign_assets", 85)} className="w-full text-left p-5 bg-white border border-slate-200 rounded-xl text-base font-semibold text-slate-700 hover:border-primary/20 hover:bg-slate-50/50 hover:shadow-sm transition-all cursor-pointer">
                    Yes, I have Capital Gains
                  </motion.button>
                  <motion.button whileHover={btnHover} whileTap={{ scale: 0.98 }} onClick={() => handleAnswer("capital_gains", "no", "foreign_assets", 85)} className="w-full text-left p-5 bg-white border border-slate-200 rounded-xl text-base font-semibold text-slate-700 hover:border-primary/20 hover:bg-slate-50/50 hover:shadow-sm transition-all cursor-pointer">
                    No
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Foreign Assets */}
            {state.currentStep === "foreign_assets" && !completed && (
              <motion.div key="foreign" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="space-y-10">
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 text-center leading-tight">Do you hold any <span className="text-accent underline decoration-2">foreign assets</span> or earn income from outside India?</h3>
                <div className="flex flex-col gap-4 mt-8">
                  <motion.button whileHover={btnHover} whileTap={{ scale: 0.98 }} onClick={() => { handleAnswer("foreign_assets", "yes", "result", 100); finishQuiz(); }} className="w-full text-left p-5 bg-white border border-slate-200 rounded-xl text-base font-semibold text-slate-700 hover:border-primary/20 hover:bg-slate-50/50 hover:shadow-sm transition-all cursor-pointer">
                    Yes
                  </motion.button>
                  <motion.button whileHover={btnHover} whileTap={{ scale: 0.98 }} onClick={() => { handleAnswer("foreign_assets", "no", "result", 100); finishQuiz(); }} className="w-full text-left p-5 bg-white border border-slate-200 rounded-xl text-base font-semibold text-slate-700 hover:border-primary/20 hover:bg-slate-50/50 hover:shadow-sm transition-all cursor-pointer">
                    No
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Result Screen */}
            {completed && (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-8 py-6">
                <div className="w-20 h-20 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <CheckCircle2 className="w-10 h-10" strokeWidth={2.5} />
                </div>
                
                <div className="space-y-2">
                  <p className="text-slate-500 font-semibold tracking-wider uppercase text-xs">Your Correct Form Is</p>
                  <h3 className="text-5xl font-black text-primary uppercase tracking-tight">
                    {getResult()}
                  </h3>
                </div>
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                  className="bg-accent/10 border border-accent/20 rounded-xl p-4 inline-block mt-6"
                >
                  <p className="text-accent font-extrabold text-sm flex items-center justify-center gap-2 uppercase tracking-wider">
                    +100 XP EARNED
                  </p>
                </motion.div>

                <div className="pt-10">
                  <button 
                    onClick={resetQuiz} 
                    className="text-muted-foreground hover:text-primary font-bold text-sm hover:underline transition-colors mt-6"
                  >
                    START OVER
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
