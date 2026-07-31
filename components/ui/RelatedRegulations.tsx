import { Link as LinkIcon, Scale, FileText, Landmark } from "lucide-react";

export type RegulationCategory = "Acts" | "Sections" | "Circulars" | "Notifications" | "Case Law";

export interface RelatedRegulationItem {
  id: string;
  title: string;
  category: RegulationCategory;
  url: string;
}

interface RelatedRegulationsProps {
  items: RelatedRegulationItem[];
}

export function RelatedRegulations({ items }: RelatedRegulationsProps) {
  if (!items || items.length === 0) return null;

  // Group items by category
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<RegulationCategory, RelatedRegulationItem[]>);

  const getCategoryIcon = (category: RegulationCategory) => {
    switch (category) {
      case "Acts":
      case "Sections": return <Scale className="h-4 w-4 text-primary" />;
      case "Circulars":
      case "Notifications": return <FileText className="h-4 w-4 text-blue-500" />;
      case "Case Law": return <Landmark className="h-4 w-4 text-amber-600" />;
      default: return <LinkIcon className="h-4 w-4 text-slate-500" />;
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 mt-12 print:border-black print:bg-white print:text-black">
      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
        <LinkIcon className="h-4 w-4" />
        Cross References
      </h3>
      
      <div className="space-y-6">
        {(Object.entries(grouped) as [RegulationCategory, RelatedRegulationItem[]][]).map(([category, catItems]) => (
          <div key={category}>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2 print:text-black">
              {getCategoryIcon(category)}
              {category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {catItems.map((item) => (
                <a 
                  key={item.id} 
                  href={item.url}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-sm font-semibold text-slate-700 hover:text-primary hover:border-primary/30 hover:shadow-sm transition-all no-underline print:border-black print:text-black"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
