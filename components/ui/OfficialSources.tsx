import { ExternalLink, Scale, FileText, Landmark, ShieldCheck, AlertTriangle } from "lucide-react";
import { OfficialSource } from "@/types/article";

interface OfficialSourcesProps {
  sources: OfficialSource[];
}

export function OfficialSources({ sources }: OfficialSourcesProps) {
  if (!sources || sources.length === 0) return null;

  const getIcon = (type: OfficialSource['type']) => {
    switch (type) {
      case "Act": return <Scale className="h-4 w-4 text-primary" />;
      case "Circular": 
      case "Notification": return <FileText className="h-4 w-4 text-blue-500" />;
      case "Case Law": return <Landmark className="h-4 w-4 text-amber-600" />;
      default: return <FileText className="h-4 w-4 text-slate-500" />;
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 my-12 print:border-black print:bg-white print:text-black">
      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
        <Landmark className="h-4 w-4" />
        Official References
      </h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 m-0 p-0 list-none">
        {sources.map((source, idx) => (
          <li key={idx}>
            <a 
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group no-underline print:border-black"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="mt-0.5 shrink-0 bg-slate-50 p-2 rounded-lg print:border print:border-black">
                  {getIcon(source.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full print:border-black print:text-black">
                      {source.type}
                    </span>
                    {source.authorityLevel === "High" && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1 print:border-black print:text-black">
                        <ShieldCheck className="h-3 w-3" />
                        Binding
                      </span>
                    )}
                    {source.date && (
                      <span className="text-[10px] text-slate-400 print:text-black">{source.date}</span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors m-0 leading-tight print:text-black">
                    {source.title}
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-slate-300 group-hover:text-primary shrink-0 transition-colors print:hidden" />
              </div>
              
              {/* Trust Metadata Footer */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-1 print:border-black">
                {source.lastVerified ? (
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-medium print:text-black">
                    <ShieldCheck className="h-3 w-3" />
                    Verified {source.lastVerified}
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-[10px] text-amber-600 font-medium print:text-black">
                    <AlertTriangle className="h-3 w-3" />
                    Unverified Source
                  </div>
                )}
                {source.rieSourceId && (
                  <div className="text-[9px] text-slate-400 font-mono print:text-black">
                    ID: {source.rieSourceId}
                  </div>
                )}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
