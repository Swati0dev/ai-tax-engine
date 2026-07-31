import { Info, AlertTriangle, CheckCircle2, Lightbulb, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalloutProps {
  title?: string;
  children: React.ReactNode;
  variant?: "info" | "warning" | "success" | "tip" | "expert";
  className?: string;
}

export function Callout({ title, children, variant = "info", className }: CalloutProps) {
  const styles = {
    info: {
      container: "bg-primary/5 border-l-primary text-primary-foreground",
      icon: <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />,
      titleColor: "text-primary",
      textColor: "text-foreground"
    },
    warning: {
      container: "bg-destructive/5 border-l-destructive text-destructive-foreground",
      icon: <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />,
      titleColor: "text-destructive",
      textColor: "text-foreground"
    },
    success: {
      container: "bg-emerald-500/10 border-l-emerald-500",
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />,
      titleColor: "text-emerald-700",
      textColor: "text-foreground"
    },
    tip: {
      container: "bg-amber-500/10 border-l-amber-500",
      icon: <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />,
      titleColor: "text-amber-700",
      textColor: "text-foreground"
    },
    expert: {
      container: "bg-slate-900 border-l-slate-400 dark:bg-slate-50 dark:border-l-slate-600",
      icon: <ShieldCheck className="h-5 w-5 text-slate-400 dark:text-slate-600 mt-0.5 shrink-0" />,
      titleColor: "text-white dark:text-slate-900",
      textColor: "text-slate-300 dark:text-slate-700"
    }
  };

  const config = styles[variant];

  return (
    <div className={cn("flex gap-4 p-6 my-8 rounded-r-2xl border-l-4", config.container, className)}>
      {config.icon}
      <div className="flex-1">
        {title && (
          <h5 className={cn("text-sm font-bold uppercase tracking-widest mb-2", config.titleColor)}>
            {title}
          </h5>
        )}
        <div className={cn("text-base leading-relaxed [&>p:last-child]:mb-0 [&>p:first-child]:mt-0", config.textColor)}>
          {children}
        </div>
      </div>
    </div>
  );
}
