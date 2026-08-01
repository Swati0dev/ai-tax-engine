import ITRWizard from "@/components/tools/ITRWizard";
import { FileCheck2 } from "lucide-react";

export default function FileITRPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 flex items-center gap-4">
          <FileCheck2 className="h-10 w-10 text-indigo-600" />
          Income Tax Return (ITR) Wizard
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-3xl">
          Let our AI guide you through the process of determining which ITR form to file, calculating your liability, and generating your return.
        </p>
      </div>

      <div className="w-full">
        <ITRWizard />
      </div>
    </div>
  );
}
