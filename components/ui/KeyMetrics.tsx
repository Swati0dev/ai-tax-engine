import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Metric {
  label: string;
  value: string | React.ReactNode;
  icon?: LucideIcon;
  trend?: string;
}

interface KeyMetricsProps {
  title?: string;
  metrics: Metric[];
  className?: string;
}

export function KeyMetrics({ title, metrics, className }: KeyMetricsProps) {
  return (
    <div className={cn("my-10", className)}>
      {title && (
        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">{title}</h4>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-4">
              {metric.icon && (
                <div className="p-2 bg-slate-50 rounded-lg">
                  <metric.icon className="h-5 w-5 text-primary" />
                </div>
              )}
              <span className="text-sm font-medium text-slate-500">{metric.label}</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold tracking-tight text-slate-900">{metric.value}</span>
              {metric.trend && (
                <span className={cn(
                  "text-xs font-semibold px-2 py-1 rounded-full",
                  metric.trend.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-destructive/10 text-destructive"
                )}>
                  {metric.trend}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
