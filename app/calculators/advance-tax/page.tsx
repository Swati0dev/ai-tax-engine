import { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { AdvanceTaxCalculator } from "@/components/tools/AdvanceTaxCalculator";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

export const metadata: Metadata = {
  title: "Advance Tax Installments Planner | AI Tax Platform",
  description: "Calculate your installment due dates and percentages (June 15, Sept 15, Dec 15, March 15) for FY 2024-25.",
};

export default function AdvanceTaxCalculatorPage() {
  return (
    <main className="flex flex-col w-full pb-24">
      <PageHero
        title="Advance Tax Installments Planner"
        description="Avoid interest penalties under Sections 234B & 234C. Plan and track your quarterly tax payments accurately."
        image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2022&auto=format&fit=crop"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <Breadcrumbs />
        <AdvanceTaxCalculator />
        
        {/* Additional Info Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-[2.5rem] border shadow-sm">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight">Who is Liable to Pay Advance Tax?</h3>
            <div className="space-y-4 text-muted-foreground font-medium leading-relaxed">
              <p>
                Any taxpayer (salaried, self-employed, or corporate) whose estimated net tax liability (after subtracting TDS/TCS) for the financial year is **₹10,000 or more** is required to pay advance tax.
              </p>
              <p>
                <strong>Exemption for Senior Citizens:</strong> Senior citizens (aged 60 years or older) who do not have any income from business or profession are exempt from paying advance tax and can pay their taxes during regular ITR filing.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight">How to Pay Advance Tax Online?</h3>
            <p className="text-muted-foreground font-medium leading-relaxed">
              You can pay your advance tax installments online through the Income Tax Department e-filing portal:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground font-medium">
              <li>Log in to the **Income Tax e-filing portal** or visit the **e-payment portal**.</li>
              <li>Select **Challan No./ITNS 280** under the e-payment option.</li>
              <li>Choose **(100) Advance Tax** as the Type of Payment.</li>
              <li>Fill in the assessment year (for FY 2024-25, the Assessment Year is **AY 2025-26**).</li>
              <li>Provide your payment details and make the payment via Net Banking, Debit Card, or UPI, and download the tax payment challan receipt containing the BSR code and Challan Identification Number (CIN) for your records.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
