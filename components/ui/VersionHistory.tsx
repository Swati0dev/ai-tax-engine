import { History, GitCommit, FileText } from "lucide-react";

export interface VersionRecord {
  version: string;
  date: string;
  reason: string;
  trigger?: string;
}

interface VersionHistoryProps {
  history: VersionRecord[];
}

export function VersionHistory({ history }: VersionHistoryProps) {
  if (!history || history.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 mt-12 print:border-black print:bg-white print:text-black">
      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
        <History className="h-4 w-4" />
        Version History
      </h3>
      <div className="relative border-l-2 border-slate-100 ml-3 print:border-black">
        {history.map((record, idx) => (
          <div key={idx} className="mb-8 last:mb-0 pl-6 relative">
            <span className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center print:border-black">
              {idx === 0 ? (
                <GitCommit className="h-3 w-3 text-primary print:text-black" />
              ) : (
                <div className="h-1.5 w-1.5 rounded-full bg-slate-300 print:bg-black" />
              )}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-1">
              <span className="font-bold text-slate-900 print:text-black">v{record.version}</span>
              <span className="text-sm text-slate-500 font-medium print:text-black">{record.date}</span>
            </div>
            <p className="text-sm text-slate-700 m-0 print:text-black">{record.reason}</p>
            {record.trigger && (
              <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/5 inline-flex px-2 py-1 rounded-md print:bg-white print:border print:border-black print:text-black">
                <FileText className="h-3 w-3" />
                Triggered by: {record.trigger}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
