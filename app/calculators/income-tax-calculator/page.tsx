import { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const TaxCalculator = dynamic(
  () => import("@/components/tools/TaxCalculator").then((mod) => mod.TaxCalculator),
  {
    loading: () => (
      <div className="flex h-96 w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: "Tax Regime Comparator | AI Tax Platform",
  description: "Compare Old vs New Tax Regime for FY 2024-25 with our interactive real-time calculator.",
};

export default function IncomeTaxCalculatorPage() {
  return (
    <main className="flex flex-col w-full pb-24">
      <PageHero
        title="Tax Regime Comparator"
        description="Choose the right path for your financial savings. Compare liabilities under the latest July 2024 Budget updates."
        image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2022&auto=format&fit=crop"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <Breadcrumbs />
        <TaxCalculator />
        
        {/* Additional Info Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-[2.5rem] border shadow-sm">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight">What&apos;s new in FY 2024-25?</h3>
            <div className="space-y-4 text-muted-foreground font-medium leading-relaxed">
              <p>
                In the July 2024 Union Budget, the **New Tax Regime** was further incentivized to make it the default choice for most taxpayers.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Standard Deduction increased from ₹50,000 to **₹75,000**.</li>
                <li>Tax slabs revised: 5% rate now starts from ₹3 Lakh up to ₹7 Lakh.</li>
                <li>Full rebate available for taxable income up to **₹7 Lakh**, meaning zero tax up to ₹7.75 Lakh (including standard deduction).</li>
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight">Should you choose the Old Regime?</h3>
            <p className="text-muted-foreground font-medium leading-relaxed">
              The Old Regime may still be beneficial if you have significant investments and expenses that qualify for deductions, such as:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground font-medium">
              <li>High HRA (House Rent Allowance) exemption.</li>
              <li>Large Home Loan interest (Section 24b).</li>
              <li>Maximum 80C, 80D, and NPS investments.</li>
              <li>Education loan interest (Section 80E).</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
