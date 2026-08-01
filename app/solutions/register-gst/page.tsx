import { GSTCalculator } from "@/components/tools/GSTCalculator";
import { Receipt } from "lucide-react";

export default function RegisterGSTPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 flex items-center gap-4">
          <Receipt className="h-10 w-10 text-indigo-600" />
          GST Registration & Calculation
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-3xl">
          Check your GST applicability, determine your slab, and calculate the exact GST components (CGST, SGST, IGST) for your invoices.
        </p>
      </div>

      <div className="w-full">
        <GSTCalculator />
      </div>
    </div>
  );
}
