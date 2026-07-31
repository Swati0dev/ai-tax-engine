import { Megaphone, ArrowRight } from "lucide-react";
import { RegulatoryChange } from "@/types/article";

interface RegulatoryChangeBannerProps {
  change: RegulatoryChange;
}

export function RegulatoryChangeBanner({ change }: RegulatoryChangeBannerProps) {
  if (!change) return null;

  return (
    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 md:p-6 mb-8 mt-[-1rem] md:mt-[-2rem] relative z-20 mx-4 sm:mx-8 lg:mx-0 max-w-4xl shadow-sm rounded-r-xl print:border print:border-black print:bg-white print:text-black">
      <div className="flex items-start gap-4">
        <div className="bg-blue-100 p-2 rounded-full shrink-0 print:hidden">
          <Megaphone className="h-5 w-5 text-blue-700" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1 text-sm text-blue-800 font-bold uppercase tracking-widest print:text-black">
            <span>Regulatory Update</span>
            <span className="text-blue-400 print:text-black">•</span>
            <span>{change.date}</span>
          </div>
          <p className="text-blue-900 font-medium m-0 leading-relaxed print:text-black">
            This article was updated following <strong className="font-bold">{change.triggerType}</strong>: {change.description}
          </p>
        </div>
      </div>
    </div>
  );
}
