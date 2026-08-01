import { Globe, Plane, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ExportBusinessPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 flex items-center gap-4">
          <Globe className="h-10 w-10 text-indigo-600" />
          Export Business Compliance
        </h1>
        <p className="mt-4 text-xl text-slate-600 max-w-3xl">
          Selling goods or services outside India? Navigate LUTs, FEMA regulations, and zero-rated GST supplies with our compliance hub.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:border-indigo-300 transition-all">
          <CardContent className="p-6">
            <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
              <FileText className="h-6 w-6 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">LUT (Letter of Undertaking)</h2>
            <p className="text-slate-600 mb-6 text-sm">
              Export goods and services without paying IGST by filing an LUT in Form GST RFD-11. Valid for one financial year.
            </p>
            <Link href="/knowledge-hub/gst" className="text-indigo-600 font-bold hover:underline">Read the LUT Guide →</Link>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:border-indigo-300 transition-all">
          <CardContent className="p-6">
            <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
              <Globe className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">FEMA & FIRC</h2>
            <p className="text-slate-600 mb-6 text-sm">
              Understand the Foreign Exchange Management Act guidelines for inward remittances and obtaining a Foreign Inward Remittance Certificate.
            </p>
            <Link href="/knowledge-hub/international-tax" className="text-indigo-600 font-bold hover:underline">Learn about FEMA →</Link>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:border-indigo-300 transition-all">
          <CardContent className="p-6">
            <div className="h-12 w-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
              <Plane className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Zero-Rated Supply</h2>
            <p className="text-slate-600 mb-6 text-sm">
              Explore how exports and SEZ supplies are treated as zero-rated supplies under Section 16 of the IGST Act, and claim your input tax credit refunds.
            </p>
            <Link href="/knowledge-hub/gst" className="text-indigo-600 font-bold hover:underline">View GST Export Rules →</Link>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
