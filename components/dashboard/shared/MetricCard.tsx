import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: ReactNode;
  subtitle?: ReactNode;
  icon?: LucideIcon;
  iconClassName?: string;
  progressValue?: number; // 0 to 100
  progressClassName?: string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClassName,
  progressValue,
  progressClassName,
  className
}: MetricCardProps) {
  return (
    <Card className={cn("rounded-3xl border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden", className)}>
      <CardContent className="p-6 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">{title}</span>
          {Icon && (
            <div className={cn("h-8 w-8 rounded-xl flex items-center justify-center shrink-0", iconClassName || "bg-primary/10 text-primary")}>
              <Icon className="h-4 w-4" />
            </div>
          )}
        </div>
        
        <div className="mt-4 flex-1 flex flex-col justify-end">
          <div className="text-2xl font-black text-foreground">{value}</div>
          
          {progressValue !== undefined && (
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mt-3 mb-1">
              <div 
                className={cn("h-full transition-all duration-500", progressClassName || "bg-primary")} 
                style={{ width: `${Math.max(0, Math.min(100, progressValue))}%` }}
              />
            </div>
          )}
          
          {subtitle && (
            <div className="text-[10px] text-muted-foreground font-bold mt-1 block">
              {subtitle}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
