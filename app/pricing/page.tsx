"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, HelpCircle, ShieldCheck, Sparkles, Star, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { triggerConfetti } from "@/components/ui/Confetti";

const PLANS = [
  {
    name: "Free Filer",
    priceMonthly: 0,
    priceYearly: 0,
    description: "Ideal for individual salaried taxpayers getting started.",
    features: [
      "Access to basic AI Tax Assistant",
      "Standard tax slab comparisons",
      "HRA, GST, and TDS basic calculators",
      "Standard due dates tracker checklist",
      "SSL secure client data"
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro Optimizer",
    priceMonthly: 99,
    priceYearly: 999,
    description: "Best for professionals, active freelancers, and smart tax-savers.",
    features: [
      "Priority unlimited AI responses (grounded)",
      "All 8 advanced calculators (salary, HRA, advance-tax)",
      "Interactive AI document parser (scan invoices/Form 16)",
      "Dynamic due-date notification system",
      "Comprehensive tax report PDF generation",
      "Custom optimization roadmap",
      "24/7 priority support"
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "CA Elite Care",
    priceMonthly: 499,
    priceYearly: 4999,
    description: "Premium CA-reviewed filing for peace of mind.",
    features: [
      "Everything in Pro Optimizer",
      "1-on-1 expert Chartered Accountant verification",
      "Form 16 salary validation & TDS reconciliation",
      "Business presumptive tax advice (Sec 44AD/ADA)",
      "Tax filing representation assistance",
      "Quarterly direct wealth consultations"
    ],
    cta: "Get CA Elite",
    popular: false,
  }
];

const FAQS = [
  {
    q: "Can the AI Assistant file my ITR directly?",
    a: "The AI Assistant compiles your data, calculates deductions, and recommends the best regime (Old vs New). The actual ITR filing is verified and uploaded to the income tax portal, which you can do yourself or have our CA review in the Elite plan."
  },
  {
    q: "Is my personal financial data secure?",
    a: "Absolutely. We employ bank-grade AES-256 encryption. We never share your data with third parties. All uploaded documents are parsed securely in compliance with ISO guidelines."
  },
  {
    q: "What is the difference between Old and New Regime for FY 2024-25?",
    a: "The New Regime is now the default with a standard deduction of ₹75,000 and zero tax up to ₹7.75 Lakh. The Old Regime allows higher custom deductions like HRA, Section 80C (PPF/insurance), and Home Loan interest. Our Pro Planner handles this comparison instantly."
  },
  {
    q: "Can I cancel or upgrade my subscription plan later?",
    a: "Yes, you can upgrade, downgrade, or cancel your subscription at any time from your account settings page without any hidden cancellation fees."
  }
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleSubscribe = (planName: string) => {
    // Premium celebration on choosing a paid subscription
    if (planName !== "Free Filer") {
      triggerConfetti();
    }
    alert(`Thank you for selecting the ${planName}! Initializing subscription workflow...`);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-slate-50/50 pb-24">
      {/* Header Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-900 to-primary text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,166,166,0.15),transparent)] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-black text-secondary tracking-widest uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            Pricing Plans
          </div>
          
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight">
            Transparent Pricing for Smart Taxpayers
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-semibold">
            Choose the right subscription tier. Optimize your taxes using verified AI grounding and professional Chartered Accountants.
          </p>

          {/* Monthly/Yearly toggle */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex items-center gap-1.5 bg-white/10 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setBillingPeriod("monthly")}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                  billingPeriod === "monthly" ? "bg-white text-primary shadow-md" : "text-slate-300 hover:text-white"
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setBillingPeriod("yearly")}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  billingPeriod === "yearly" ? "bg-white text-primary shadow-md" : "text-slate-300 hover:text-white"
                }`}
              >
                Yearly Billing
                <span className="bg-secondary text-secondary-foreground text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of pricing cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => {
            const price = billingPeriod === "yearly" ? plan.priceYearly : plan.priceMonthly;
            return (
              <Card 
                key={plan.name}
                className={`rounded-[2.5rem] shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl border bg-white ${
                  plan.popular ? "border-2 border-secondary ring-4 ring-secondary/10 relative scale-105" : "border-primary/10"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute right-6 top-6 bg-secondary text-secondary-foreground text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    Most Popular Choice
                  </div>
                )}

                <div className="p-8 md:p-10 space-y-6">
                  {/* Title & Desc */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-foreground">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 pt-2 border-t border-slate-100">
                    <span className="text-4xl font-black text-foreground">₹{price.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground font-bold">
                      {billingPeriod === "yearly" ? "/ year" : "/ month"}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 pt-4 border-t border-slate-100">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-xs font-semibold text-muted-foreground leading-relaxed">
                        <span className="h-5 w-5 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0 mt-0.5">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 bg-slate-50 border-t border-slate-100">
                  <Button
                    onClick={() => handleSubscribe(plan.name)}
                    className={`w-full rounded-2xl py-6 font-bold shadow-md transition-all ${
                      plan.popular 
                        ? "bg-secondary text-secondary-foreground hover:bg-secondary/95 shadow-secondary/20" 
                        : "bg-primary text-white hover:bg-primary/95 shadow-primary/10"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-black text-muted-foreground uppercase tracking-widest bg-slate-100 px-4 py-2 rounded-full shadow-inner border">
          <ShieldCheck className="h-4.5 w-4.5 text-primary" />
          Verified Secure Platform • AES-256 encryption • CA advisory panel
        </div>
      </section>

      {/* FAQs Section */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
            All your questions on subscriptions & security answered
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-3xl border border-primary/10 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-sm text-foreground focus:outline-none hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="h-4.5 w-4.5 text-primary shrink-0" />
                    {faq.q}
                  </span>
                  {isOpen ? <ChevronUp className="h-4.5 w-4.5 text-muted-foreground" /> : <ChevronDown className="h-4.5 w-4.5 text-muted-foreground" />}
                </button>
                {isOpen && (
                  <div className="p-6 pt-0 border-t border-slate-100 text-xs font-semibold text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
