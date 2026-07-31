import { CheckSquare, FileText, AlertOctagon, Lightbulb, ArrowRightCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryBoxProps {
  type?: "checklist" | "documents" | "mistakes" | "tip" | "next";
  title?: string;
  items: React.ReactNode[];
  className?: string;
}

export function SummaryBox({ type = "checklist", title, items, className }: SummaryBoxProps) {
  const configs = {
    checklist: {
      icon: <CheckSquare className="h-6 w-6 text-emerald-500" />,
      defaultTitle: "Quick Checklist",
      bgClass: "bg-emerald-50/50 border-emerald-100",
      bulletClass: "text-emerald-500",
    },
    documents: {
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      defaultTitle: "Required Documents",
      bgClass: "bg-blue-50/50 border-blue-100",
      bulletClass: "text-blue-500",
    },
    mistakes: {
      icon: <AlertOctagon className="h-6 w-6 text-destructive" />,
      defaultTitle: "Common Mistakes",
      bgClass: "bg-destructive/5 border-destructive/10",
      bulletClass: "text-destructive",
    },
    tip: {
      icon: <Lightbulb className="h-6 w-6 text-amber-500" />,
      defaultTitle: "Expert Tip",
      bgClass: "bg-amber-50/50 border-amber-100",
      bulletClass: "text-amber-500",
    },
    next: {
      icon: <ArrowRightCircle className="h-6 w-6 text-primary" />,
      defaultTitle: "Next Action",
      bgClass: "bg-primary/5 border-primary/10",
      bulletClass: "text-primary",
    },
  };

  const config = configs[type];

  return (
    <div className={cn("p-8 rounded-2xl border shadow-sm my-12", config.bgClass, className)}>
      <div className="flex items-center gap-3 mb-6">
        {config.icon}
        <h3 className="text-xl font-bold text-slate-900 m-0">{title || config.defaultTitle}</h3>
      </div>
      
      <ul className="space-y-4 m-0 p-0 list-none">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className={cn("mt-1.5 shrink-0 text-lg leading-none", config.bulletClass)}>•</span>
            <div className="text-muted-foreground text-lg">{item}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
