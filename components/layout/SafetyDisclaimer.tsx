import { ShieldAlert } from "lucide-react";

export function SafetyDisclaimer() {
  return (
    <div className="w-full bg-amber-50/50 border-y border-amber-200/50 py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-start gap-4">
        <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
          <ShieldAlert className="h-4 w-4 text-amber-700" />
        </div>
        <div className="space-y-1">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-800/60">Professional Disclosure</h4>
          <p className="text-[11px] font-medium leading-relaxed text-amber-900/70 max-w-5xl">
            This AI assistant provides information based on verified tax laws and sources. It does not provide legal, financial, or tax advice. For specific filing decisions or complex cases, please consult a qualified Chartered Accountant (CA) or tax professional. 
            The accuracy of responses depends on the current state of our database and source review status.
          </p>
        </div>
      </div>
    </div>
  );
}
