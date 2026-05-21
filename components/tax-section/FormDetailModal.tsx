"use client";

import { X, CheckCircle2, AlertOctagon, Landmark, HelpCircle, ArrowRight, Play, Lightbulb, Scale } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FormDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    slug: string;
    title: string;
    relatedForms: string[];
    filingProcedure: string[];
    category: string;
    sectionNumber: string | null;
    explanation: string;
    applicability: string[];
    benefitsOrDeductions: string[];
    restrictions: string[];
    examples: string[];
    actName: string;
  };
}

export function FormDetailModal({ isOpen, onClose, item }: FormDetailModalProps) {
  // Prevent propagation of click inside modal content
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={handleContentClick}
            className="relative w-full max-w-3xl bg-background/95 border border-primary/10 shadow-2xl rounded-[2.5rem] overflow-hidden max-h-[85vh] flex flex-col z-10 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b bg-primary/5 flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-widest">
                    {item.category.replace("_", " ")}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                    {item.sectionNumber || item.actName}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground">
                  {item.title}
                </h2>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                  {item.actName}
                </p>
              </div>
              <button
                onClick={onClose}
                className="h-10 w-10 rounded-2xl bg-muted/60 hover:bg-muted border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all shrink-0 hover:rotate-90 duration-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-hide">
              {/* 1. Purpose (Kyun bharna hai?) */}
              <div className="space-y-3">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Kyun bharna hai? (Purpose & Context)
                </h3>
                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 text-sm font-medium leading-relaxed text-foreground/80">
                  {item.explanation}
                </div>
              </div>

              {/* 2. Applicability (Kab bharna hai & Eligibility) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Eligibility (Kise bharna hai) */}
                <div className="space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Kab & Kise bharna hai?
                  </h3>
                  <ul className="space-y-2">
                    {item.applicability.map((app, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Restrictions (Kise nahi bharna hai) */}
                {item.restrictions.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-black uppercase tracking-widest text-amber-600 flex items-center gap-2">
                      <AlertOctagon className="h-4 w-4" />
                      Restrictions / Exceptions
                    </h3>
                    <ul className="space-y-2">
                      {item.restrictions.map((res, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* 3. Filing Procedure (Kaise bharna hai?) */}
              {item.filingProcedure.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Kaise bharna hai? (Filing Steps)
                  </h3>
                  <div className="relative border-l border-primary/20 ml-3 pl-6 space-y-6">
                    {item.filingProcedure.map((step, idx) => (
                      <div key={idx} className="relative">
                        {/* Bullet Circle */}
                        <div className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-black text-primary uppercase tracking-widest block">
                            Step {idx + 1}
                          </span>
                          <p className="text-xs font-semibold text-muted-foreground leading-relaxed">
                            {step}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Regime Comparison (Old vs New Regime) */}
              {item.benefitsOrDeductions.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-widest text-indigo-600 flex items-center gap-2">
                    <Scale className="h-4 w-4" />
                    New & Old Regime Conditions / Benefits
                  </h3>
                  <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-5 space-y-2">
                    {item.benefitsOrDeductions.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-muted-foreground">
                        <ArrowRight className="h-3.5 w-3.5 text-indigo-500 mt-0.5 shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Example Box */}
              {item.examples.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-widest text-amber-500 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Practical Example
                  </h3>
                  <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-5 text-xs font-semibold text-muted-foreground leading-relaxed italic flex gap-3">
                    <Lightbulb className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>{item.examples[0]}</div>
                  </div>
                </div>
              )}

              {/* Related Forms */}
              {item.relatedForms.length > 0 && (
                <div className="pt-4 border-t border-dashed space-y-2">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block">
                    Related Forms
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {item.relatedForms.map((form, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-muted border text-xs font-bold text-foreground/80 shadow-sm"
                      >
                        {form}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 md:p-8 border-t bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                <Landmark className="h-4 w-4" />
                <span>Verified Official Guide</span>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-2xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                Got It, Thanks!
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
