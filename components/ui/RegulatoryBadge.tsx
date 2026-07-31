import { ShieldAlert, ShieldCheck, FileClock, History, Edit3, Hourglass, Trash2, ShieldQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

export type RegulatoryStatus = 
  | "Active" 
  | "Updated" 
  | "Superseded" 
  | "Repealed" 
  | "Draft" 
  | "Upcoming" 
  | "Deprecated";

interface RegulatoryBadgeProps {
  status: RegulatoryStatus;
  className?: string;
}

export function RegulatoryBadge({ status, className }: RegulatoryBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "Active":
        return {
          icon: ShieldCheck,
          colorClass: "bg-emerald-100 text-emerald-800 border-emerald-200",
          iconClass: "text-emerald-600",
          tooltip: "Currently enforceable law."
        };
      case "Updated":
        return {
          icon: Edit3,
          colorClass: "bg-blue-100 text-blue-800 border-blue-200",
          iconClass: "text-blue-600",
          tooltip: "Recently amended."
        };
      case "Superseded":
        return {
          icon: History,
          colorClass: "bg-amber-100 text-amber-800 border-amber-200",
          iconClass: "text-amber-600",
          tooltip: "Replaced by newer regulation."
        };
      case "Repealed":
        return {
          icon: Trash2,
          colorClass: "bg-red-100 text-red-800 border-red-200",
          iconClass: "text-red-600",
          tooltip: "No longer in effect."
        };
      case "Draft":
        return {
          icon: FileClock,
          colorClass: "bg-purple-100 text-purple-800 border-purple-200",
          iconClass: "text-purple-600",
          tooltip: "Pending final approval."
        };
      case "Upcoming":
        return {
          icon: Hourglass,
          colorClass: "bg-teal-100 text-teal-800 border-teal-200",
          iconClass: "text-teal-600",
          tooltip: "Enacted but not yet effective."
        };
      case "Deprecated":
        return {
          icon: ShieldAlert,
          colorClass: "bg-slate-100 text-slate-800 border-slate-200",
          iconClass: "text-slate-600",
          tooltip: "Phased out."
        };
      default:
        return {
          icon: ShieldQuestion,
          colorClass: "bg-slate-100 text-slate-800 border-slate-200",
          iconClass: "text-slate-600",
          tooltip: "Status unknown."
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div 
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border print:border-black print:text-black print:bg-white",
        config.colorClass,
        className
      )}
      title={config.tooltip}
      aria-label={`Status: ${status}. ${config.tooltip}`}
    >
      <Icon className={cn("h-3.5 w-3.5 print:text-black", config.iconClass)} aria-hidden="true" />
      {status}
    </div>
  );
}
