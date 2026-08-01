import { InvestmentPlanner80C } from "@/components/tools/InvestmentPlanner80C";
import { Calculator } from "lucide-react";

export default function TaxPlannerPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
          <Calculator className="h-8 w-8 text-indigo-600" />
          Smart Tax Planner
        </h1>
        <p className="mt-2 text-lg text-slate-600 max-w-2xl">
          Optimize your tax savings under Section 80C and other regimes. Enter your current investments to see how much more you can save.
        </p>
      </div>

      <div className="w-full">
        <InvestmentPlanner80C />
      </div>
    </div>
  );
}
