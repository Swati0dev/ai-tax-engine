import { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { HRACalculator } from "@/components/tools/HRACalculator";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

export const metadata: Metadata = {
  title: "HRA Exemption Calculator | AI Tax Platform",
  description: "Calculate your exempt vs taxable House Rent Allowance (HRA) for FY 2024-25 using standard Income Tax rules.",
};

export default function HRACalculatorPage() {
  return (
    <main className="flex flex-col w-full pb-24">
      <PageHero
        title="HRA Exemption Calculator"
        description="Plan your rent savings under Section 10(13A). Determine how much of your House Rent Allowance is exempt from tax."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <Breadcrumbs />
        <HRACalculator />
        
        {/* Additional Info Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-[2.5rem] border shadow-sm">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight">How is HRA Exemption Determined?</h3>
            <div className="space-y-4 text-muted-foreground font-medium leading-relaxed">
              <p>
                House Rent Allowance (HRA) received by salaried employees is exempt from tax under Section 10(13A) of the Income Tax Act. The exempt amount is the **minimum** of the following three rules:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Actual HRA received from your employer.</li>
                <li>Rent paid in excess of 10% of your salary (Basic Salary + DA).</li>
                <li>50% of your salary if you reside in a metro city (Mumbai, Delhi, Kolkata, Chennai) or 40% if you reside in a non-metro city.</li>
              </ol>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight">Key Prerequisites for Claiming HRA</h3>
            <p className="text-muted-foreground font-medium leading-relaxed">
              To successfully claim this tax exemption during your ITR filing:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground font-medium">
              <li>A signed rental agreement with your landlord.</li>
              <li>Monthly rent receipts as proof of payment.</li>
              <li>Landlord&apos;s PAN card (mandatory if your annual rent exceeds ₹1,00,000).</li>
              <li>For rent payments to parents, ensure you transfer via bank and they declare the rental income in their tax return.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
