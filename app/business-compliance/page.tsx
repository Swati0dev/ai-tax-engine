import { ComplianceCenter } from "@/components/tools/ComplianceCenter";
import { Briefcase } from "lucide-react";

export default function BusinessCompliancePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 flex items-center gap-4">
          <Briefcase className="h-10 w-10 text-indigo-600" />
          Business Compliance Hub
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-3xl">
          Manage your business tax requirements. Track GST filings, TDS deductions, and ROC compliances all in one place.
        </p>
      </div>

      <div className="w-full">
        <ComplianceCenter />
      </div>
    </div>
  );
}
