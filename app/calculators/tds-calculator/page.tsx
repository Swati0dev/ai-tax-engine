import { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { TDSCalculator } from "@/components/tools/TDSCalculator";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

export const metadata: Metadata = {
  title: "TDS Calculator & Estimator | AI Tax Platform",
  description: "Calculate Tax Deducted at Source (TDS) under key sections 192, 194C, 194I, and 194J of the Income Tax Act.",
};

export default function TDSCalculatorPage() {
  return (
    <main className="flex flex-col w-full pb-24">
      <PageHero
        title="TDS Calculator & Estimator"
        description="Simplify compliance for businesses and freelancers. Estimate withholding tax deductions and net payable amounts under major sections."
        image="https://images.unsplash.com/photo-1454165833767-027ffea9e772?q=80&w=2070&auto=format&fit=crop"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <Breadcrumbs />
        <TDSCalculator />
        
        {/* Additional Info Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-[2.5rem] border shadow-sm">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight">Understanding Tax Deducted at Source (TDS)</h3>
            <div className="space-y-4 text-muted-foreground font-medium leading-relaxed">
              <p>
                TDS is a mechanism introduced by the Income Tax Department where a person/entity responsible for making specific payments to another person must deduct tax at source and deposit it into the Government account.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Section 192:</strong> TDS on Salaries. Deducted by employer based on average slab rate.</li>
                <li><strong>Section 194C:</strong> Payments to Contractors. Rates are 1% for Individual/HUF payees and 2% for corporate payees.</li>
                <li><strong>Section 194J:</strong> Fees for Professional or Technical Services. Professional fees incur a 10% deduction, whereas technical or call center services incur a 2% deduction.</li>
                <li><strong>Section 194I:</strong> Rent payments. Rent on land, building, or furniture is subject to a 10% deduction, whereas plant and machinery rent is subject to 2%.</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight">Important TDS Rules</h3>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Keep these rules in mind when deducting or filing TDS:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground font-medium">
              <li><strong>PAN Requirement:</strong> If the payee fails to provide a valid PAN card, the tax must be deducted at a higher flat rate of **20%** under Section 206AA.</li>
              <li><strong>TDS Deposit:</strong> Deducted TDS must be deposited with the government by the 7th of the following month.</li>
              <li><strong>Quarterly Returns:</strong> Deductors must file quarterly returns (Form 24Q for salaries, Form 26Q for non-salaries) and issue Form 16/16A certificates to payees.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
