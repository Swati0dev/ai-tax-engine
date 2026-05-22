import Link from "next/link";
import { 
  ArrowRight, 
  MessageSquareText, 
  ShieldCheck, 
  BookOpen, 
  Receipt, 
  TrendingDown, 
  Sparkles, 
  Percent, 
  Briefcase, 
  Coins, 
  Scale, 
  Calendar, 
  FileText, 
  AlertCircle, 
  Lock, 
  TrendingUp, 
  Wallet,
  CheckCircle2,
  Users
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/tax-section/SearchBar";

const taxCategories = [
  {
    title: "Income Tax",
    description: "Personal income tax slabs, exemptions, and filing instructions.",
    href: "/direct-tax",
    icon: Coins,
    color: "text-emerald-600 bg-emerald-50"
  },
  {
    title: "GST (Indirect Tax)",
    description: "Goods and Services Tax registration, returns, and ITC calculations.",
    href: "/indirect-tax",
    icon: Percent,
    color: "text-blue-600 bg-blue-50"
  },
  {
    title: "TDS Exemption",
    description: "Tax Deducted at Source limits, forms, and correction procedures.",
    href: "/direct-tax",
    icon: Receipt,
    color: "text-orange-600 bg-orange-50"
  },
  {
    title: "Tax Saving (80C/80D)",
    description: "Strategies to maximize tax deductions and investment benefits.",
    href: "/calculators/80c-planner",
    icon: Wallet,
    color: "text-indigo-600 bg-indigo-50"
  },
  {
    title: "ITR Filing",
    description: "Guides for filing ITR-1, ITR-2, and business structures ITR.",
    href: "/calculators/find-my-itr",
    icon: FileText,
    color: "text-pink-600 bg-pink-50"
  },
  {
    title: "Business Taxation",
    description: "Tax codes for Sole Proprietorships, LLPs, and Pvt Ltd companies.",
    href: "/direct-tax",
    icon: Briefcase,
    color: "text-sky-600 bg-sky-50"
  },
  {
    title: "Capital Gains",
    description: "Short and long term gains from stock market, property, or mutual funds.",
    href: "/direct-tax",
    icon: TrendingUp,
    color: "text-amber-600 bg-amber-50"
  },
  {
    title: "Advance Tax",
    description: "Quarterly tax liability calculations and payment schedules.",
    href: "/calculators/advance-tax",
    icon: Calendar,
    color: "text-rose-600 bg-rose-50"
  }
];

const calculatorsList = [
  {
    title: "Income Tax Calculator",
    description: "Quickly compute your income tax liability for the financial year.",
    href: "/calculators/income-tax-calculator",
    label: "Regime Comparison"
  },
  {
    title: "80C Planner",
    description: "Track your ₹1.5 Lakh investment limit and bridge the savings gap.",
    href: "/calculators/80c-planner",
    label: "Deduction Tracker"
  },
  {
    title: "Find My ITR",
    description: "Take the quiz to determine which ITR form you need to file.",
    href: "/calculators/find-my-itr",
    label: "Smart Quiz"
  },
  {
    title: "HRA Calculator",
    description: "Calculate house rent allowance exemption under Sec 10(13A).",
    href: "/calculators/hra-calculator",
    label: "Exempt vs Taxable"
  },
  {
    title: "GST Calculator",
    description: "Determine gross/net amount and CGST/SGST/IGST shares.",
    href: "/calculators/gst-calculator",
    label: "Add/Remove GST"
  },
  {
    title: "TDS Calculator",
    description: "Find applicable TDS rates across contract, rent, and salary sections.",
    href: "/calculators/tds-calculator",
    label: "Rate Estimator"
  },
  {
    title: "Salary Breakdown",
    description: "Calculate take-home salary, PF, and professional tax from CTC.",
    href: "/calculators/salary-breakdown",
    label: "Take-Home Estimator"
  },
  {
    title: "Advance Tax Calculator",
    description: "Calculate quarterly tax payments to avoid Section 234 interest.",
    href: "/calculators/advance-tax",
    label: "Installment Tracker"
  }
];

const mockComplianceTimeline = [
  { date: "June 15, 2026", task: "1st Installment of Advance Tax", status: "Upcoming", color: "bg-amber-500" },
  { date: "July 31, 2026", task: "ITR Filing Deadline (Individuals)", status: "Critical", color: "bg-destructive" },
  { date: "Sept 15, 2026", task: "2nd Installment of Advance Tax", status: "Upcoming", color: "bg-amber-500" },
  { date: "Oct 31, 2026", task: "Audit Filing Deadline for Businesses", status: "Standard", color: "bg-blue-500" }
];

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 hero-gradient border-b">
        {/* Soft Ambient Lights */}
        <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-accent/5 rounded-full filter blur-3xl opacity-60 pointer-events-none -z-10 animate-pulse-slow" />
        <div className="absolute bottom-10 left-1/4 w-[30rem] h-[30rem] bg-primary/5 rounded-full filter blur-3xl opacity-40 pointer-events-none -z-10" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left: Copy & Actions */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 rounded-full border bg-white/80 backdrop-blur-md px-4 py-2 text-xs font-bold text-primary mb-6 shadow-sm">
                <Sparkles className="h-4.5 w-4.5 text-secondary animate-bounce" />
                Next-Gen AI Tax Operating System
              </div>
              <h1 className="text-4xl font-heading font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6 leading-[1.15]">
                Navigate Indian Taxes <br />
                with <span className="text-gradient">AI Confidence.</span>
              </h1>
              <p className="text-base text-muted-foreground sm:text-lg leading-relaxed mb-8 max-w-xl font-medium">
                Ditch the confusing tax portals. Understand your Income Tax slabs, track investments, calculate deductions, and clear compliance deadlines with friendly, multilingual AI.
              </p>

              {/* Direct Search Entry */}
              <div className="w-full max-w-xl mb-8 shadow-xl shadow-primary/5 rounded-2xl">
                <SearchBar />
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button asChild size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/95 text-white shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all font-bold">
                  <Link href="/chat">
                    Ask Tax AI
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 bg-white/70 backdrop-blur-sm hover:bg-white text-primary border-border/80 font-bold transition-all">
                  <Link href="/calculators">Explore Calculators</Link>
                </Button>
              </div>
            </div>

            {/* Hero Right: Futuristic Interactive AI visual & floating cards */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              
              {/* Interactive CSS Orb */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-primary/30 via-accent/20 to-secondary/30 flex items-center justify-center p-8 shadow-2xl animate-float">
                <div className="absolute inset-0 rounded-full border border-white/40 backdrop-blur-sm animate-pulse-slow -z-10" />
                <div className="w-full h-full rounded-full bg-gradient-to-bl from-white/90 to-white/40 backdrop-blur-lg border border-white/50 shadow-inner flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/20 rounded-full filter blur-xl" />
                  
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/25 mb-4">
                    <Sparkles className="h-8 w-8 text-secondary animate-pulse" />
                  </span>
                  <h3 className="font-heading text-lg font-bold text-primary">Tax AI Assistant</h3>
                  <p className="text-xs text-muted-foreground font-semibold mt-1">Ask questions in English, Hindi & Hinglish</p>
                  
                  {/* Glowing Status Dot */}
                  <div className="flex items-center gap-1.5 mt-4 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-600 border border-emerald-500/25">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Agent Active
                  </div>
                </div>
              </div>

              {/* Floating Financial Cards */}
              <div className="absolute -top-4 -left-6 bg-white/80 backdrop-blur-md p-4 rounded-2xl border shadow-lg flex items-center gap-3 animate-float transition-all hover:scale-105" style={{ animationDelay: "1s" }}>
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                  ₹
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Exempt HRA</p>
                  <p className="text-sm font-bold text-foreground">Exemption calculated</p>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl border shadow-lg flex items-center gap-3 animate-float transition-all hover:scale-105" style={{ animationDelay: "2s" }}>
                <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Tax Saved</p>
                  <p className="text-sm font-bold text-foreground">₹1,50,000 Saved</p>
                </div>
              </div>

              <div className="absolute top-1/2 -right-8 bg-white/80 backdrop-blur-md p-3.5 rounded-2xl border shadow-lg flex items-center gap-2.5 animate-float transition-all hover:scale-105" style={{ animationDelay: "1.5s" }}>
                <div className="h-2 w-2 rounded-full bg-secondary" />
                <p className="text-xs font-bold text-foreground">Regime comparison ready</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. Popular Tax Categories */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-heading font-bold text-foreground sm:text-4xl">
              Popular Indian Tax Categories
            </h2>
            <p className="text-muted-foreground font-medium mt-3">
              Explore easy-to-understand explanations and structural compliance guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {taxCategories.map((cat, idx) => (
              <Link 
                key={idx} 
                href={cat.href}
                className="group relative rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-5 ${cat.color} group-hover:scale-110 transition-all`}>
                  <cat.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                  {cat.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-all">
                  Browse topics <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Tax Calculator Hub */}
      <section className="py-24 bg-background border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-2xl">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">Interactive Tools</span>
              <h2 className="text-3xl font-heading font-bold text-foreground mt-2 sm:text-4xl">
                Tax Calculator Hub
              </h2>
              <p className="text-muted-foreground font-medium mt-3">
                No complex spreadsheets. Calculate tax, HRA, GST, and plan deductions interactively.
              </p>
            </div>
            <Link 
              href="/calculators" 
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 font-bold text-primary hover:text-primary/80 text-sm"
            >
              View all calculators <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {calculatorsList.map((calc, idx) => (
              <Link 
                key={idx} 
                href={calc.href}
                className="group relative flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="inline-block rounded-full bg-secondary/15 px-2.5 py-0.5 text-[10px] font-bold text-secondary-foreground mb-4">
                    {calc.label}
                  </div>
                  <h3 className="font-heading text-base font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {calc.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                    {calc.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                  Open Calculator <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AI Tax Assistant Preview */}
      <section className="py-24 bg-white border-t relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent/5 rounded-full filter blur-3xl -translate-y-1/2 -z-10" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Conversational UI Demo */}
            <div className="soft-3d rounded-3xl bg-primary p-6 relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-secondary flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Tax AI Assistant</h4>
                    <p className="text-[10px] text-blue-100/60 font-semibold">Answers verified with law references</p>
                  </div>
                </div>
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Chat Content */}
              <div className="space-y-4 mb-6 max-h-72 overflow-y-auto">
                <div className="flex items-end gap-2.5 justify-end">
                  <div className="rounded-2xl rounded-br-sm bg-accent p-3 max-w-[80%] text-xs font-bold text-white">
                    Hi, main New Tax Regime select karu ya Old? Meri salary ₹12 Lakhs hai.
                  </div>
                </div>

                <div className="flex items-end gap-2.5">
                  <div className="h-7 w-7 rounded-lg bg-secondary flex items-center justify-center text-secondary-foreground text-xs font-extrabold shrink-0">
                    AI
                  </div>
                  <div className="rounded-2xl rounded-bl-sm bg-white/10 border border-white/10 p-3 max-w-[85%] text-xs text-blue-50 leading-relaxed font-semibold">
                    Namaste! Agar aapki taxable income ₹12 Lakhs hai aur aapke paas koi investments nahi hain (like Sec 80C, HRA, or Home Loan interest), toh **New Tax Regime** aapke liye better rahega.<br/><br/>
                    • **New Regime Tax:** ~₹90,000 (standard deduction lagakar)<br/>
                    • **Old Regime Tax:** ~₹1,70,000 (bina deductions ke)<br/><br/>
                    Deductions check karne ke liye kya aap HRA ya 80C savings declare karna chahenge?
                  </div>
                </div>
              </div>

              {/* Prompt Suggestions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                <Link href="/chat" className="text-[10px] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-blue-100 hover:bg-white/15 transition-all">
                  80C limits details?
                </Link>
                <Link href="/chat" className="text-[10px] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-blue-100 hover:bg-white/15 transition-all">
                  GST rate on services?
                </Link>
                <Link href="/chat" className="text-[10px] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-blue-100 hover:bg-white/15 transition-all">
                  ITR-1 eligibility rules?
                </Link>
              </div>
            </div>

            {/* Explanatory text */}
            <div className="flex flex-col items-start">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Conversational Engine</span>
              <h2 className="text-3xl font-heading font-bold text-foreground mt-2 sm:text-4xl">
                Chat with an Assistant That Speaks Your Language
              </h2>
              <p className="text-base text-muted-foreground mt-4 leading-relaxed font-medium">
                Our AI Assistant is trained specifically on active Indian tax codes (Income Tax Act 1961, CGST/SGST Acts). You can talk to it in English, Hindi, or conversational Hinglish and get instantly grounded answers with links to tax sections.
              </p>
              
              <ul className="space-y-3 mt-6">
                <li className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-accent" /> No hallucinated advice—grounded directly in tax rules.
                </li>
                <li className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-accent" /> Multilingual chat support for local context.
                </li>
                <li className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-accent" /> Suggests actual sections and downloadable forms.
                </li>
              </ul>

              <Button asChild size="lg" className="rounded-full mt-8 px-8 bg-primary hover:bg-primary/95 text-white font-bold transition-all shadow-lg shadow-primary/10">
                <Link href="/chat">Start Chatting Now</Link>
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Knowledge Hub */}
      <section className="py-24 bg-background border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-2xl">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">Educational Library</span>
              <h2 className="text-3xl font-heading font-bold text-foreground mt-2 sm:text-4xl">
                Knowledge Hub
              </h2>
              <p className="text-muted-foreground font-medium mt-3">
                Learn how taxes work with simple definitions, real-life examples, and tax-saving guides.
              </p>
            </div>
            <Link 
              href="/knowledge-hub" 
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 font-bold text-primary hover:text-primary/80 text-sm"
            >
              Browse Articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/50 px-2.5 py-1 rounded-full uppercase">
                  Beginner Friendly
                </span>
                <h3 className="font-heading text-lg font-bold text-foreground mt-4 mb-2">
                  Tax Basics: What is ITR-1?
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                  A beginner-friendly breakdown of who needs to file ITR-1 (Sahaj), salary requirements, interest income rules, and standard limits.
                </p>
              </div>
              <Link href="/direct-tax/itr-1-filing-steps" className="mt-6 flex items-center text-xs font-bold text-primary">
                Read Guide <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200/50 px-2.5 py-1 rounded-full uppercase">
                  Tax Saving
                </span>
                <h3 className="font-heading text-lg font-bold text-foreground mt-4 mb-2">
                  Deductions Under Sec 80C vs 80D
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                  Master the difference between PPF/ELSS investments under Section 80C and Health Insurance tax benefits under Section 80D.
                </p>
              </div>
              <Link href="/direct-tax/80c-deductions" className="mt-6 flex items-center text-xs font-bold text-primary">
                Read Guide <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200/50 px-2.5 py-1 rounded-full uppercase">
                  GST Returns
                </span>
                <h3 className="font-heading text-lg font-bold text-foreground mt-4 mb-2">
                  GST Compliance for Freelancers
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                  Learn when a freelancer is required to register for GST in India, how to calculate GSTR-1, and export tax rates.
                </p>
              </div>
              <Link href="/indirect-tax/gst-registration-rules" className="mt-6 flex items-center text-xs font-bold text-primary">
                Read Guide <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Compliance Center */}
      <section className="py-24 bg-white border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Compliance Info */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">Deadlines & Updates</span>
              <h2 className="text-3xl font-heading font-bold text-foreground mt-2 sm:text-4xl">
                Stay Compliant. Avoid Penalties.
              </h2>
              <p className="text-base text-muted-foreground mt-4 leading-relaxed font-medium">
                Keep track of critical dates set by the Central Board of Direct Taxes (CBDT) and the GST Council. Our interactive due-dates timeline helps you plan filings and payments ahead of time.
              </p>
              
              <div className="mt-6 flex gap-6">
                <div>
                  <h4 className="text-2xl font-extrabold text-primary">Zero</h4>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Missed Deadlines</p>
                </div>
                <div className="w-px bg-border" />
                <div>
                  <h4 className="text-2xl font-extrabold text-primary">100%</h4>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Penalty Free Guidance</p>
                </div>
              </div>

              <Button asChild variant="outline" className="rounded-full mt-8 border-border font-bold">
                <Link href="/compliance">Open Compliance Center</Link>
              </Button>
            </div>

            {/* Interactive Timeline Card */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border bg-background p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6 pb-4 border-b">
                  <h3 className="font-heading text-base font-bold text-foreground flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" /> Tax Due Dates (FY 2026-27)
                  </h3>
                  <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full">
                    Active Calendar
                  </span>
                </div>

                <div className="space-y-4">
                  {mockComplianceTimeline.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between rounded-xl bg-white p-4 border shadow-sm transition-transform hover:-translate-x-1"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                        <div>
                          <p className="text-xs font-bold text-foreground">{item.task}</p>
                          <p className="text-[10px] text-muted-foreground font-semibold">{item.date}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-foreground/60 bg-muted/60 px-2 py-0.5 rounded-md">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Trust & Authority */}
      <section className="py-24 bg-background border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">Fintech Security Standards</span>
          <h2 className="text-3xl font-heading font-bold text-foreground mt-2 mb-16 sm:text-4xl">
            Designed for Financial Trust
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-8 rounded-2xl bg-white border shadow-sm">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-3 text-foreground">Source-Grounded Answers</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-semibold max-w-xs">
                Every AI response is mapped directly to actual sections of the Income Tax Act 1961 and GST Council updates to prevent hallucinations.
              </p>
            </div>

            <div className="flex flex-col items-center p-8 rounded-2xl bg-white border shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full filter blur-xl" />
              <div className="h-12 w-12 rounded-xl bg-primary text-white flex items-center justify-center mb-6 shadow-md shadow-primary/20">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-3 text-foreground">Secure & Private</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-semibold max-w-xs">
                We do not upload or store personal documents permanently. Calculations are processed locally inside your secure browser session.
              </p>
            </div>

            <div className="flex flex-col items-center p-8 rounded-2xl bg-white border shadow-sm">
              <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-3 text-foreground">CBDT Reference Standards</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-semibold max-w-xs">
                Equations and logic models reflect the latest official budget slabs and circulars released by the Government of India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Call To Action (Encourage asks / dashboard creation) */}
      <section className="py-20 bg-white border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-primary text-primary-foreground p-8 md:p-16 relative overflow-hidden shadow-2xl flex flex-col items-center text-center">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl -z-10" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl -z-10 animate-pulse-slow" />

            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground shadow-lg shadow-secondary/15 mb-6">
              <Sparkles className="h-6 w-6" />
            </span>
            
            <h2 className="text-3xl font-heading font-extrabold sm:text-4xl text-white mb-6 max-w-2xl leading-tight">
              Taxes Are No Longer Confusing.<br /> Let AI Simplify Everything.
            </h2>
            <p className="text-blue-100/80 leading-relaxed font-medium mb-10 max-w-md text-sm sm:text-base">
              Ask your first query or open your personalized dashboard to track savings and filing progress.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Button asChild size="lg" className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-8 shadow-xl shadow-secondary/10 transition-all hover:scale-105 active:scale-95">
                <Link href="/chat">Start Free Chat</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-white/20 text-white hover:bg-white/10 font-bold px-8 transition-all">
                <Link href="/dashboard">Create Free Dashboard</Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-4 mt-8 text-xs text-blue-100/50">
              <span className="flex items-center gap-1"><Lock className="h-3.5 w-3.5" /> Secure local processing</span>
              <span className="h-3 w-px bg-white/10" />
              <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> 10k+ Indian taxpayers served</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
