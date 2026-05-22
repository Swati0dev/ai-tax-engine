import { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { InvestmentPlanner80C } from "@/components/tools/InvestmentPlanner80C";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Section 80C Investment Planner | AI Tax Platform",
  description: "Track your tax-saving investments and maximize your ₹1.5 Lakh limit under Section 80C.",
};

export default function InvestmentPlannerPage() {
  return (
    <main className="flex flex-col w-full pb-24">
      <PageHero
        title="80C Investment Planner"
        description="Don't leave tax savings on the table. Track your EPF, PPF, ELSS, and more to reach your ₹1.5 Lakh goal."
        image="https://images.unsplash.com/photo-1454165833767-027ffea9e772?q=80&w=2070&auto=format&fit=crop"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <Breadcrumbs />
        
        <div className="space-y-12">
          <InvestmentPlanner80C />
          
          {/* Visual Guide & Detailed Explanation */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-8 md:p-12 rounded-[2.5rem] border shadow-sm">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <Sparkles className="h-3 w-3" />
                Expert Guide
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Understanding Section 80C</h2>
              <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                Section 80C is the most powerful tax-saving tool for individuals. By investing in safe instruments like PPF or growth-oriented ones like ELSS, you can reduce your taxable income by up to ₹1,50,000 every financial year.
              </p>
              <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-amber-900 font-medium text-sm">
                <strong>Important:</strong> These deductions are strictly for the <strong>Old Tax Regime</strong>. If you opt for the New Regime, you cannot claim 80C benefits.
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-3xl border shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop" 
                alt="Section 80C Investment Guide" 
                width={800}
                height={600}
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </section>
        </div>
        
        {/* Educational Content */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-border shadow-sm">
            <h3 className="text-xl font-bold mb-4">What is Section 80C?</h3>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed">
              Section 80C is the most popular tax-saving section of the Income Tax Act. It allows individual taxpayers to reduce their taxable income by up to ₹1,50,000 every year by investing in specific schemes.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white border border-border shadow-sm">
            <h3 className="text-xl font-bold mb-4">Lock-in Periods</h3>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed">
              Most 80C investments come with a lock-in period:
              <br />• **ELSS**: 3 Years
              <br />• **Tax-Saving FD**: 5 Years
              <br />• **PPF**: 15 Years
              <br />• **SSY**: Until the girl child turns 21 or gets married.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white border border-border shadow-sm">
            <h3 className="text-xl font-bold mb-4">Beyond 80C</h3>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed">
              If your 80C limit is full, you can still save tax under:
              <br />• **Section 80CCD(1B)**: Additional ₹50,000 for NPS.
              <br />• **Section 80D**: Up to ₹75,000 for health insurance.
              <br />• **Section 24(b)**: Up to ₹2 Lakh for home loan interest.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
