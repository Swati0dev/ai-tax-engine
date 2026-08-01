import { BusinessRegistrationEngine } from "@/components/tools/BusinessRegistrationEngine";
import { Building2 } from "lucide-react";

export default function StartBusinessPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 bg-blue-100 rounded-2xl flex items-center justify-center">
            <Building2 className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Start Your Business in India
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Use our AI engine to determine the best legal structure (LLP, Pvt Ltd, Sole Proprietorship) and exactly what tax registrations you need.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <BusinessRegistrationEngine />
        </div>
      </div>
    </div>
  );
}
