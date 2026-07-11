"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, RefreshCcw, Building2, Shield, Users, Globe, Briefcase, FileText } from "lucide-react";
import { generateRegistrationAdvice, RegistrationAnswers, EntityType } from "@/actions/business-registration";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Step = {
  id: keyof RegistrationAnswers;
  title: string;
  description: string;
  icon: React.ElementType;
  options: { label: string; value: string; hint: string }[];
};

const STEPS: Step[] = [
  {
    id: "founders",
    title: "How many founders?",
    description: "The number of owners dictates which legal entities are even possible for you to register.",
    icon: Users,
    options: [
      { label: "Just me (Solo)", value: "solo", hint: "100% ownership" },
      { label: "Two or more", value: "multiple", hint: "Co-founders" }
    ]
  },
  {
    id: "liability",
    title: "Personal Liability Protection",
    description: "If the business goes bankrupt or faces a lawsuit, should your personal assets (house, car) be protected?",
    icon: Shield,
    options: [
      { label: "Yes, protect my personal assets", value: "limited", hint: "Creates a separate legal entity" },
      { label: "Not a major concern right now", value: "dont_care", hint: "Lower cost, higher risk" }
    ]
  },
  {
    id: "funding",
    title: "External Funding",
    description: "Do you plan to raise money from angel investors or venture capital in the future?",
    icon: Building2,
    options: [
      { label: "Yes, definitely", value: "yes", hint: "Investors require specific entities" },
      { label: "No, bootstrapping", value: "no", hint: "Self-funded or bank loans" }
    ]
  },
  {
    id: "scale",
    title: "Business Ambition",
    description: "Is this a local lifestyle business, or do you plan to scale nationally/globally?",
    icon: Globe,
    options: [
      { label: "Local / Lifestyle", value: "local", hint: "Small scale, focused" },
      { label: "National / Global Scale", value: "national_global", hint: "High growth potential" }
    ]
  },
  {
    id: "foreignClients",
    title: "International Clients",
    description: "Will you be exporting goods or receiving payments from foreign clients in foreign currency?",
    icon: Briefcase,
    options: [
      { label: "Yes", value: "yes", hint: "Software, agencies, exports" },
      { label: "No", value: "no", hint: "Domestic clients only" }
    ]
  },
  {
    id: "employees",
    title: "Hiring Plans",
    description: "Do you plan to hire full-time employees in the near future?",
    icon: Users,
    options: [
      { label: "Yes", value: "yes", hint: "Will need payroll compliance" },
      { label: "No / Just Freelancers", value: "no", hint: "Simpler operations" }
    ]
  },
  {
    id: "priority",
    title: "Your Biggest Priority",
    description: "Every business has tradeoffs. What is more important to you right now?",
    icon: FileText,
    options: [
      { label: "Easy & Cheap Compliance", value: "compliance", hint: "Less paperwork" },
      { label: "High Trust & Credibility", value: "credibility", hint: "Better for B2B/Corporate clients" }
    ]
  }
];

export function BusinessRegistrationEngine() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<RegistrationAnswers>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ recommended: EntityType; aiExplanation: string } | null>(null);

  const handleSelect = (value: string) => {
    const currentId = STEPS[currentStep].id;
    setAnswers(prev => ({ ...prev, [currentId]: value }));
  };

  const handleNext = async () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Submit
      setIsLoading(true);
      const finalAnswers = answers as RegistrationAnswers;
      const res = await generateRegistrationAdvice(finalAnswers);
      if (res.success && res.recommended && res.aiExplanation) {
        setResult({
          recommended: res.recommended,
          aiExplanation: res.aiExplanation
        });
      }
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
    setResult(null);
  };

  if (result) {
    return (
      <Card className="max-w-3xl mx-auto rounded-[2rem] border-primary/20 shadow-2xl overflow-hidden bg-white">
        <div className="bg-gradient-to-br from-primary/10 via-white to-white p-8 md:p-12 text-center space-y-6">
          <div className="inline-flex h-20 w-20 rounded-full bg-primary/10 items-center justify-center mb-4">
            <Building2 className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-sm font-bold tracking-widest uppercase text-muted-foreground">Your Recommended Entity</h2>
          <h1 className="text-4xl md:text-5xl font-black text-foreground font-heading">
            {result.recommended}
          </h1>
          
          <div className="text-left mt-8 p-6 md:p-8 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              AI Advisor Analysis
            </h3>
            <div 
              className="prose prose-sm md:prose-base prose-slate max-w-none prose-p:leading-relaxed prose-strong:text-primary"
              dangerouslySetInnerHTML={{ __html: result.aiExplanation.replace(/\n/g, '<br/>') }}
            />
          </div>

          <button
            onClick={handleRestart}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-muted text-foreground font-bold rounded-xl hover:bg-muted/80 transition-colors"
          >
            <RefreshCcw className="h-4 w-4" />
            Start Over
          </button>
        </div>
      </Card>
    );
  }

  const step = STEPS[currentStep];
  const StepIcon = step.icon;
  const currentAnswer = answers[step.id];

  return (
    <div className="max-w-2xl mx-auto min-h-[500px] flex flex-col">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between text-xs font-bold text-muted-foreground mb-3 px-1">
          <span>Question {currentStep + 1} of {STEPS.length}</span>
          <span>{Math.round((currentStep / STEPS.length) * 100)}%</span>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-grow relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-[2rem] border shadow-lg p-8 md:p-12 space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex h-12 w-12 rounded-2xl bg-primary/10 items-center justify-center mb-2">
                <StepIcon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">{step.title}</h2>
              <p className="text-base text-muted-foreground font-medium leading-relaxed">
                {step.description}
              </p>
            </div>

            <div className="space-y-3 pt-4">
              {step.options.map((opt) => {
                const isSelected = currentAnswer === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={cn(
                      "w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left group",
                      isSelected 
                        ? "border-primary bg-primary/5 shadow-sm" 
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    )}
                  >
                    <div>
                      <span className={cn("block text-lg font-bold", isSelected ? "text-primary" : "text-foreground")}>
                        {opt.label}
                      </span>
                      <span className="block text-sm text-muted-foreground font-medium mt-1">
                        {opt.hint}
                      </span>
                    </div>
                    <div className={cn(
                      "h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 ml-4 transition-colors",
                      isSelected ? "border-primary bg-primary text-white" : "border-muted-foreground/30 group-hover:border-primary/30 bg-white"
                    )}>
                      {isSelected && <CheckCircle className="h-4 w-4" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between px-2">
        <button
          onClick={handleBack}
          disabled={currentStep === 0 || isLoading}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors",
            currentStep === 0 ? "opacity-0 pointer-events-none" : "text-muted-foreground hover:bg-muted"
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!currentAnswer || isLoading}
          className={cn(
            "flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-md",
            !currentAnswer || isLoading
              ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50" 
              : "bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5"
          )}
        >
          {isLoading ? (
            "Analyzing..."
          ) : currentStep === STEPS.length - 1 ? (
            "Get Recommendation"
          ) : (
            <>Next <ArrowRight className="h-4 w-4" /></>
          )}
        </button>
      </div>
    </div>
  );
}
