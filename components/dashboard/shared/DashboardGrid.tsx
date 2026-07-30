import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardGridProps {
  children: ReactNode;
  className?: string;
}

export function DashboardGrid({ children, className }: DashboardGridProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", className)}>
      {children}
    </div>
  );
}
