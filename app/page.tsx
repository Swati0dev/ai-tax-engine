import Link from "next/link";
import { ArrowRight, FileSearch, MessageSquareText, ShieldCheck, BookOpen, Receipt, CheckCircle2, TrendingDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/tax-section/SearchBar";

const entryPoints = [
  {
    title: "Ask a tax question",
    description: "Use the chat entry point for a structured, source-aware answer flow.",
    href: "/chat",
    icon: MessageSquareText,
    color: "text-primary"
  },
  {
    title: "Browse Direct Tax",
    description: "Start with income tax sections, deductions, forms, and filing topics.",
    href: "/direct-tax",
    icon: BookOpen,
    color: "text-emerald-600"
  },
  {
    title: "Browse Indirect Tax",
    description: "Explore GST and indirect tax topics through organized category pages.",
    href: "/indirect-tax",
    icon: Receipt,
    color: "text-blue-600"
  },
  {
    title: "Tax Calculator",
    description: "Compare Old vs New Tax Regimes for FY 2024-25 with real-time savings estimates.",
    href: "/tools/tax-calculator",
    icon: TrendingDown,
    color: "text-orange-600"
  },
  {
    title: "80C Planner",
    description: "Maximize your ₹1.5 Lakh tax-saving limit with our interactive investment tracker.",
    href: "/tools/80c-planner",
    icon: ShieldCheck,
    color: "text-emerald-600"
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 lg:py-32 border-b">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow -z-10" style={{ animationDelay: "1.5s" }} />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white/80 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-secondary-foreground mb-8 shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              Official Indian Tax Guidance AI
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl mb-8 leading-[1.1]">
              Navigate Indian Taxes with <br className="hidden sm:block" />
              <span className="text-gradient">AI Confidence.</span>
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl leading-relaxed mb-10 max-w-2xl font-medium">
              Understand Income Tax, GST, and legal procedures with source-grounded intelligence. Built for clarity, compliance, and trust.
            </p>

            <div className="w-full max-w-2xl mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              <SearchBar />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button asChild size="lg" className="rounded-full px-8 shadow-xl shadow-primary/20 hover:shadow-primary/30 text-base">
                <Link href="/chat">
                  Start Chat Assistance
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 bg-background/50 backdrop-blur-sm text-base border-border/60 hover:border-border">
                <Link href="/direct-tax">Browse Tax Guide</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-primary text-primary-foreground border-y border-primary/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-primary-foreground/10 py-6">
            <div className="flex items-center justify-center gap-2 py-3 sm:py-0 font-medium">
              <ShieldCheck className="h-5 w-5 text-accent" /> 100% Source-Grounded
            </div>
            <div className="flex items-center justify-center gap-2 py-3 sm:py-0 font-medium">
              <BookOpen className="h-5 w-5 text-accent" /> Direct & Indirect Tax
            </div>
            <div className="flex items-center justify-center gap-2 py-3 sm:py-0 font-medium">
              <CheckCircle2 className="h-5 w-5 text-accent" /> WCAG AA Accessible
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <section className="py-24 bg-muted/20 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {entryPoints.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="soft-ui-card p-8 group relative overflow-hidden flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className={`icon-box mb-6 group-hover:scale-110 transition-transform bg-white shadow-sm border-border ${item.color}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow font-medium">
                  {item.description}
                </p>
                <div className="mt-8 flex items-center text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">
                  Explore Now <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-24 border-t bg-gradient-to-b from-background to-muted/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-16">Designed for Financial Trust</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-8 rounded-3xl bg-white border shadow-sm">
              <div className="icon-box h-16 w-16 mb-6">
                <MessageSquareText className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Source-Grounded</h3>
              <p className="text-sm text-muted-foreground font-medium">Every response is backed by official sections and laws to prevent AI hallucinations.</p>
            </div>
            <div className="flex flex-col items-center p-8 rounded-3xl bg-white border shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent -z-10" />
              <div className="icon-box h-16 w-16 mb-6 bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20">
                <FileSearch className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Structured Knowledge</h3>
              <p className="text-sm text-muted-foreground font-medium">Information is organized by tax categories and forms, making laws easy to navigate.</p>
            </div>
            <div className="flex flex-col items-center p-8 rounded-3xl bg-white border shadow-sm">
              <div className="icon-box h-16 w-16 mb-6 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Compliance Ready</h3>
              <p className="text-sm text-muted-foreground font-medium">Built with precision to assist in understanding complex Indian tax filing procedures.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
