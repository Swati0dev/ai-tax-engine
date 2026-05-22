import { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { GSTCalculator } from "@/components/tools/GSTCalculator";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

export const metadata: Metadata = {
  title: "GST Calculator | AI Tax Platform",
  description: "Calculate inclusive and exclusive Goods and Services Tax (GST) for slabs 5%, 12%, 18%, and 28%.",
};

export default function GSTCalculatorPage() {
  return (
    <main className="flex flex-col w-full pb-24">
      <PageHero
        title="GST Calculator"
        description="Simplify invoices and billing calculations. Instantly determine SGST, CGST, and IGST for any transaction."
        image="https://images.unsplash.com/photo-1554224155-8726b3ff858f?q=80&w=2022&auto=format&fit=crop"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <Breadcrumbs />
        <GSTCalculator />
        
        {/* Additional Info Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-[2.5rem] border shadow-sm">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight">Understanding GST Calculations</h3>
            <div className="space-y-4 text-muted-foreground font-medium leading-relaxed">
              <p>
                The Goods and Services Tax (GST) is an indirect tax levied on the supply of goods and services in India.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>CGST:</strong> Central GST, collected by the Central Government on intra-state supplies.</li>
                <li><strong>SGST:</strong> State GST, collected by the State Government on intra-state supplies.</li>
                <li><strong>IGST:</strong> Integrated GST, collected by the Central Government on inter-state supplies.</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight">Inclusive vs Exclusive Formulas</h3>
            <div className="space-y-4 text-muted-foreground font-medium leading-relaxed">
              <p>
                <strong>GST Exclusive (Add GST):</strong>
                <br />
                <span className="font-mono text-xs">GST Amount = (Base Amount * GST Slabs) / 100</span>
                <br />
                <span className="font-mono text-xs">Gross Amount = Base Amount + GST Amount</span>
              </p>
              <p>
                <strong>GST Inclusive (Deduct GST):</strong>
                <br />
                <span className="font-mono text-xs">Net Amount = Base Amount / (1 + (GST Slab / 100))</span>
                <br />
                <span className="font-mono text-xs">GST Amount = Base Amount - Net Amount</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
