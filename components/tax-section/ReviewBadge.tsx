import { CheckCircle2, AlertCircle, Clock, FileEdit } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReviewStatus } from "@/types/tax";

interface ReviewBadgeProps {
  status: ReviewStatus;
  className?: string;
}

const statusConfig = {
  VERIFIED: {
    label: "VERIFIED SOURCE",
    icon: CheckCircle2,
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 shadow-[0_0_12px_-4px_rgba(16,185,129,0.3)]",
  },
  NEEDS_REVIEW: {
    label: "NEEDS SOURCE REVIEW",
    icon: AlertCircle,
    color: "bg-amber-500/10 text-amber-600 border-amber-500/20 animate-pulse",
  },
  OUTDATED: {
    label: "OUTDATED / LEGACY",
    icon: Clock,
    color: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  },
  DRAFT: {
    label: "DRAFT CONTENT",
    icon: FileEdit,
    color: "bg-slate-500/10 text-slate-600 border-slate-500/20",
  },
} as const;

export function ReviewBadge({ status, className }: ReviewBadgeProps) {
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.DRAFT;
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border",
        config.color,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </div>
  );
}
