import Link from "next/link";
import { 
  ArrowRight, 
  Search,
  BookOpen, 
  PlayCircle,
  TrendingUp, 
  Sparkles, 
  Lightbulb, 
  Briefcase, 
  GraduationCap, 
  Building2,
  Calculator,
  BrainCircuit,
  Newspaper,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "AI Tax Engine | Simplified Indian Tax Compliance",
  description: "Navigate Indian tax compliance, filing, and learning with ease using the AI Tax Engine.",
});

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative pt-20 pb-24 lg:pt-28 lg:pb-32 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent blur-3xl opacity-50 -z-0"></div>
        
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2 text-xs font-bold text-emerald-400 mb-8 shadow-sm">
            <Sparkles className="h-4 w-4" />
            AI-Powered Tax & Business Guidance
          </div>
          
          <h1 className="text-4xl font-heading font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl mb-8 leading-[1.1]">
            Learn Tax Like <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Never Before</span>
          </h1>
          
          {/* Main Search Bar */}
          <div className="w-full max-w-2xl mx-auto mb-8 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full blur opacity-25 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative flex items-center bg-white rounded-full p-2 shadow-2xl">
              <Search className="h-6 w-6 text-slate-400 ml-4" />
              <input 
                type="text" 
                placeholder="What do you want to learn today?" 
                className="w-full bg-transparent border-none py-3 px-4 text-slate-900 text-lg focus:outline-none placeholder:text-slate-400 font-medium"
              />
              <Button className="rounded-full bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 font-bold text-base">
                Search
              </Button>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-300">
            <span className="font-semibold text-slate-400">Popular Searches:</span>
            {["GST", "Income Tax", "TDS", "Company Registration", "Startup", "ITR"].map((term) => (
              <Link 
                key={term} 
                href={`/search?q=${term.toLowerCase()}`}
                className="px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/50 hover:bg-slate-700 hover:text-white transition-colors font-medium"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Continue Learning (Requires Auth - Showing generic for now) */}
      <section className="py-16 -mt-8 relative z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold font-heading flex items-center gap-2 text-slate-900">
                <BookOpen className="h-6 w-6 text-primary" /> Continue Learning
              </h2>
              <Link href="/dashboard" className="text-sm font-bold text-primary hover:underline flex items-center">
                View Your Progress <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Progress Card */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Track</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-md">60% Complete</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Freelancer Tax Masterclass</h3>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 mb-4 overflow-hidden">
                    <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <Link href="/learn/freelancer">Resume Module</Link>
                </Button>
              </div>

              {/* Recent Lesson */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Last Viewed</span>
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1"><Clock className="h-3 w-3" /> 2h ago</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">How to calculate GSTR-1</h3>
                  <p className="text-sm text-slate-600 font-medium mb-4 line-clamp-2">Understand the nuances of outward supplies and how to file your monthly GSTR-1 on the portal.</p>
                </div>
                <Button asChild variant="outline" className="w-full border-slate-300 hover:bg-slate-100">
                  <Link href="/learn/gst/gstr-1">Read Again</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Today's Tax Tip */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl p-1 shadow-sm">
            <div className="bg-white/60 backdrop-blur-xl rounded-[23px] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 border border-amber-200/50">
              <div className="h-16 w-16 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
                <Lightbulb className="h-8 w-8 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-1">Today&apos;s Tax Tip</h3>
                <p className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  If your taxable income is strictly below ₹12 Lakhs and you don&apos;t have a home loan, the <span className="text-primary font-extrabold">New Tax Regime</span> will almost always save you more money in FY 2026-27.
                </p>
                <Link href="/learn/tax-basics/old-vs-new-regime" className="inline-flex items-center mt-3 text-sm font-bold text-amber-700 hover:underline">
                  Read the detailed comparison <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Learning Paths */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-heading font-extrabold text-slate-900 sm:text-4xl">
              Choose Your Learning Path
            </h2>
            <p className="text-slate-600 font-medium mt-4">
              Curated roadmaps tailored to your specific profile and goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Beginner", icon: BookOpen, desc: "Start from scratch. Learn what tax is and how to file your first return.", color: "bg-blue-100 text-blue-600" },
              { title: "Freelancer", icon: Briefcase, desc: "Manage GST, TDS, and claim business expenses to maximize your take-home pay.", color: "bg-emerald-100 text-emerald-600" },
              { title: "Business Owner", icon: Building2, desc: "PGBP, company structures, and deep compliance for growing businesses.", color: "bg-indigo-100 text-indigo-600" },
              { title: "Student", icon: GraduationCap, desc: "Master tax laws for exams (CA/CS/BCom) with section-wise breakdowns.", color: "bg-amber-100 text-amber-600" },
              { title: "Startup", icon: Sparkles, desc: "Angel tax, ESOPs, and government funding schemes (Mudra, Stand-Up India).", color: "bg-rose-100 text-rose-600" },
              { title: "Professional", icon: ShieldCheck, desc: "Advanced case studies and tax planning strategies for CAs and consultants.", color: "bg-slate-800 text-slate-100" }
            ].map((path, idx) => (
              <Link key={idx} href={`/path/${path.title.toLowerCase()}`} className="group relative bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-6 ${path.color}`}>
                  <path.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{path.title}</h3>
                <p className="text-sm text-slate-600 font-medium mb-6">{path.desc}</p>
                <div className="flex items-center text-sm font-bold text-primary group-hover:gap-2 transition-all">
                  Start Path <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Interactive Tools & AI */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-heading font-extrabold text-slate-900 sm:text-4xl">
                Interactive Tools
              </h2>
              <p className="text-slate-600 font-medium mt-4">
                Calculate, simulate, and get AI-driven answers in seconds.
              </p>
            </div>
            <Link href="/tools" className="mt-4 md:mt-0 font-bold text-primary hover:underline flex items-center">
              View all tools <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Link href="/tools/gst-calculator" className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary/50 hover:shadow-md transition-all text-center flex flex-col items-center justify-center gap-3">
              <Calculator className="h-8 w-8 text-slate-400" />
              <span className="font-bold text-slate-900">GST Calculator</span>
            </Link>
            <Link href="/tools/income-tax-calculator" className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary/50 hover:shadow-md transition-all text-center flex flex-col items-center justify-center gap-3">
              <Calculator className="h-8 w-8 text-slate-400" />
              <span className="font-bold text-slate-900">Income Tax Calc</span>
            </Link>
            
            {/* Featured AI Tool */}
            <Link href="/chat" className="lg:col-span-3 bg-slate-900 p-8 rounded-2xl shadow-xl relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-64 h-64 bg-primary/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-primary/50 transition-colors duration-700"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold mb-4 backdrop-blur-sm border border-white/10">
                    <BrainCircuit className="h-3.5 w-3.5 text-emerald-400" /> Powered by Gemini
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Tax AI Assistant</h3>
                  <p className="text-slate-300 font-medium max-w-sm">Have a complex question? Ask our AI in Hindi, English, or Hinglish for instant, legally-backed advice.</p>
                </div>
                <div className="mt-8 flex items-center text-emerald-400 font-bold">
                  Ask a question <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
            
            <Link href="/tools/tax-quiz" className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary/50 hover:shadow-md transition-all flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Tax Quiz</h4>
                <p className="text-xs text-slate-500 font-medium mt-1">Test your knowledge with 10 random questions.</p>
              </div>
            </Link>

            <Link href="/tools/decision-tool" className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary/50 hover:shadow-md transition-all flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Tax Decision Tool</h4>
                <p className="text-xs text-slate-500 font-medium mt-1">Interactive roadmaps to help you choose business structures or tax regimes.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Latest Updates */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold font-heading flex items-center gap-2 text-slate-900">
              <Newspaper className="h-6 w-6 text-primary" /> Latest Updates
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { date: "Jul 25, 2026", title: "New GST Rates for E-commerce", tag: "GST" },
              { date: "Jul 10, 2026", title: "Finance Bill 2026 Key Highlights", tag: "Income Tax" },
              { date: "Jun 30, 2026", title: "TDS Changes for Freelancers", tag: "TDS" },
              { date: "Jun 15, 2026", title: "How to claim Angel Tax exemption", tag: "Startup" }
            ].map((news, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="text-xs font-bold text-slate-400 mb-2">{news.date} • {news.tag}</div>
                <h4 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug">{news.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
