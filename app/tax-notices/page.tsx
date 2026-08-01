import { AlertTriangle, MessageSquareWarning, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function TaxNoticesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 flex items-center gap-4">
          <AlertTriangle className="h-10 w-10 text-amber-500" />
          Tax Notice Explainer
        </h1>
        <p className="mt-4 text-xl text-slate-600 max-w-3xl">
          Received a notice from the Income Tax Department or GST portal? Don&apos;t panic. Our AI can help you understand what it means and how to respond.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        <Card className="rounded-2xl border-amber-200 bg-amber-50 shadow-sm overflow-hidden relative group">
          <CardContent className="p-8">
            <MessageSquareWarning className="h-12 w-12 text-amber-500 mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Analyze Your Notice</h2>
            <p className="text-slate-700 mb-8">
              Upload your Section 143(1), 139(9), or 148 notice. The AI will translate the legal jargon into simple steps you need to take.
            </p>
            <Link href="/chat" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-bold transition-all">
              Launch AI Advisor <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Common Notices Explained</h3>
          
          <Link href="/knowledge-hub/income-tax" className="block p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all bg-white group">
            <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Section 143(1) - Intimation</h4>
            <p className="text-sm text-slate-500 mt-1">Preliminary assessment of your return. Usually points out arithmetic errors or unmatched TDS.</p>
          </Link>
          
          <Link href="/knowledge-hub/income-tax" className="block p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all bg-white group">
            <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Section 139(9) - Defective Return</h4>
            <p className="text-sm text-slate-500 mt-1">Your return is missing required information or documents. Must be corrected within 15 days.</p>
          </Link>
          
          <Link href="/knowledge-hub/income-tax" className="block p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all bg-white group">
            <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Section 148 - Income Escaping Assessment</h4>
            <p className="text-sm text-slate-500 mt-1">The department believes you haven&apos;t disclosed all your income. Requires a serious response.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
