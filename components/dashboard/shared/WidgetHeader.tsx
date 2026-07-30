import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface WidgetHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  action?: ReactNode;
  iconClassName?: string;
  className?: string;
}

export function WidgetHeader({ 
  title, 
  subtitle, 
  icon: Icon, 
  action, 
  iconClassName,
  className 
}: WidgetHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-6", className)}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={cn("h-10 w-10 rounded-2xl flex items-center justify-center shrink-0", iconClassName || "bg-primary/10 text-primary")}>
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div>
          <h3 className="text-xl font-bold tracking-tight text-foreground">{title}</h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground font-semibold">{subtitle}</p>
          )}
        </div>
      </div>
      {action && (
        <div className="shrink-0 ml-4">
          {action}
        </div>
      )}
    </div>
  );
}
