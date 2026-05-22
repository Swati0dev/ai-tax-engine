import { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SalaryBreakdown } from "@/components/tools/SalaryBreakdown";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

export const metadata: Metadata = {
  title: "Take-Home Salary Breakdown | AI Tax Platform",
  description: "Calculate your monthly and annual take-home salary in India by deducting PF, PT, Gratuity, and Income Tax from your gross CTC.",
};

export default function SalaryBreakdownPage() {
  return (
    <main className="flex flex-col w-full pb-24">
      <PageHero
        title="Take-Home Salary Breakdown"
        description="Decode your CTC package. Calculate your in-hand salary, employer/employee PF, professional tax, and income tax withholdings."
        image="https://images.unsplash.com/photo-1454165833767-027ffea9e772?q=80&w=2070&auto=format&fit=crop"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <Breadcrumbs />
        <SalaryBreakdown />
        
        {/* Additional Info Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-[2.5rem] border shadow-sm">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight">Understanding Gross CTC vs In-Hand Salary</h3>
            <div className="space-y-4 text-muted-foreground font-medium leading-relaxed">
              <p>
                Cost to Company (CTC) is the total amount an employer spends on an employee annually. The in-hand salary (Take-home) is the net amount you receive in your bank account after mandatory deductions.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>EPF (Provident Fund):</strong> 12% of your Basic Salary is deducted from your salary as the employee share, and another 12% is paid by the employer (often included in the CTC figure).</li>
                <li><strong>Professional Tax (PT):</strong> A minor state tax (capped at ₹2,500 per year) levied on salaried employees.</li>
                <li><strong>Gratuity:</strong> A defined retiral benefit paid by the employer after completing 5 years of service, calculated as 4.81% of your Basic salary.</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight">Tips for Optimizing Your Salary Structure</h3>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Deductions can be reduced or tax liability optimized by asking your employer to include tax-free allowances under the **Old Regime**:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground font-medium">
              <li><strong>HRA Component:</strong> Adjust basic salary to optimize HRA exemption.</li>
              <li><strong>LTA (Leave Travel Allowance):</strong> Claim tax-free travel expenses inside India twice in a block of 4 years.</li>
              <li><strong>Telephone & Internet Reimbursement:</strong> Fully tax-exempt against bills.</li>
              <li><strong>Food Coupons (Sodexo):</strong> Tax-free up to ₹50 per meal (₹2,200 per month).</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
