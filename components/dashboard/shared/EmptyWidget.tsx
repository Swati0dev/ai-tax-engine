import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyWidgetProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyWidget({ 
  icon: Icon, 
  title, 
  description, 
  action, 
  className 
}: EmptyWidgetProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center space-y-4 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 h-full w-full", className)}>
      <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h4 className="font-bold text-slate-700">{title}</h4>
        <p className="text-sm font-medium text-slate-500 mt-1 max-w-[250px] mx-auto">{description}</p>
      </div>
      {action && (
        <div className="pt-2">
          {action}
        </div>
      )}
    </div>
  );
}
