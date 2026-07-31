import { CheckCircle2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface KeyTakeawaysProps {
  takeaways: string[];
  className?: string;
}

export function KeyTakeaways({ takeaways, className }: KeyTakeawaysProps) {
  if (!takeaways || takeaways.length === 0) return null;

  return (
    <div className={cn("bg-white border border-slate-200/60 shadow-sm rounded-xl p-5 md:p-6 mb-10 mt-[-2rem] relative z-20 mx-4 sm:mx-8 lg:mx-0 max-w-4xl", className)}>
      <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
        <Zap className="h-4 w-4 text-amber-500 fill-amber-500/20" />
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 m-0">Quick Scan</h3>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 m-0 p-0 list-none">
        {takeaways.map((point, index) => (
          <li key={index} className="flex items-start gap-2.5 group">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="text-sm text-slate-600 leading-snug font-medium">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
