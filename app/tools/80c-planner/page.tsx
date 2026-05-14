import { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { InvestmentPlanner80C } from "@/components/tools/InvestmentPlanner80C";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

export const metadata: Metadata = {
  title: "Section 80C Investment Planner | AI Tax Engine",
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

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-[-100px] relative z-20">
        <Breadcrumbs />
        <InvestmentPlanner80C />
        
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
