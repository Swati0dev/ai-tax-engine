import { InvestmentPlanner80C } from "@/components/tools/InvestmentPlanner80C";
import { PiggyBank } from "lucide-react";

export default function SaveTaxPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 bg-emerald-100 rounded-2xl flex items-center justify-center">
            <PiggyBank className="h-8 w-8 text-emerald-600" />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Maximize Your Tax Savings
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Every rupee counts. Let our AI planner find the best legal loopholes and deductions under Section 80C, 80D, and HRA to reduce your total tax burden.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-5xl">
          <InvestmentPlanner80C />
        </div>
      </div>
    </div>
  );
}
