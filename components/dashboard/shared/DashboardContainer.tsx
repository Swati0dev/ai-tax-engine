import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardContainerProps {
  children: ReactNode;
  className?: string;
}

export function DashboardContainer({ children, className }: DashboardContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10", className)}>
      {children}
    </div>
  );
}
