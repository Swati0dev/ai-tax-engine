"use client";

import { ActivityViewModel } from "@/src/engines/activity/activity.types";
import { formatDistanceToNow } from "date-fns";
import { Bell, CheckCircle2, AlertTriangle, Info, ShieldAlert, Sparkles, XCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface RecentActivityWidgetProps {
  activities: ActivityViewModel[];
}

export function RecentActivityWidget({ activities }: RecentActivityWidgetProps) {
  const getSeverityWeight = (severity: string) => {
    if (severity === 'ERROR') return 4;
    if (severity === 'WARNING') return 3;
    if (severity === 'SUCCESS') return 2;
    return 1;
  };

  const sortedActivities = [...activities].sort((a, b) => {
    // 1. Unread first
    if (a.isRead !== b.isRead) {
      return a.isRead ? 1 : -1;
    }
    // 2. Severity
    const severityDiff = getSeverityWeight(b.severity) - getSeverityWeight(a.severity);
    if (severityDiff !== 0) return severityDiff;
    // 3. Newest first
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const displayActivities = sortedActivities.slice(0, 5);

  const getIcon = (type: string, severity: string) => {
    if (severity === 'ERROR') return XCircle;
    if (severity === 'WARNING') return AlertTriangle;
    if (severity === 'SUCCESS') return CheckCircle2;
    if (type === 'AI' || type === 'KNOWLEDGE') return Sparkles;
    if (type === 'COMPLIANCE') return ShieldAlert;
    return Info;
  };

  const getColorClass = (severity: string, isRead: boolean) => {
    if (isRead) return "text-neutral-400 bg-neutral-100 border-neutral-200";
    if (severity === 'ERROR') return "text-rose-600 bg-rose-100 border-rose-200";
    if (severity === 'WARNING') return "text-amber-600 bg-amber-100 border-amber-200";
    if (severity === 'SUCCESS') return "text-emerald-600 bg-emerald-100 border-emerald-200";
    return "text-blue-600 bg-blue-100 border-blue-200";
  };


  return (
    <div className="bg-white p-6 rounded-xl border border-neutral-200/50 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-500" />
          Recent Activity
        </h3>
        {activities.some(a => !a.isRead) && (
          <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {activities.filter(a => !a.isRead).length} New
          </span>
        )}
      </div>

      <div className="flex-1 space-y-3">
        {displayActivities.length > 0 ? (
          displayActivities.map(activity => {
            const Icon = getIcon(activity.type, activity.severity);
            if (activity.actionUrl) {
              return (
                <Link
                  key={activity.id}
                  href={activity.actionUrl}
                  className={cn(
                    "block p-3 rounded-lg border transition-all text-left w-full group",
                    activity.isRead 
                      ? "bg-neutral-50/50 border-transparent hover:bg-neutral-50" 
                      : "bg-white border-neutral-100 shadow-sm hover:border-neutral-200 relative overflow-hidden"
                  )}
                >
                  {!activity.isRead && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                  )}
                  <div className="flex gap-3">
                    <div className={cn("p-2 rounded-lg border shrink-0 h-fit", getColorClass(activity.severity, activity.isRead))}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={cn("text-sm font-semibold truncate pr-2", activity.isRead ? "text-neutral-600" : "text-neutral-900")}>
                          {activity.title}
                        </h4>
                        <span className="text-[10px] text-neutral-400 whitespace-nowrap shrink-0">
                          {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className={cn("text-xs line-clamp-2", activity.isRead ? "text-neutral-400" : "text-neutral-600")}>
                        {activity.message}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            }

            return (
              <div
                key={activity.id}
                className={cn(
                  "block p-3 rounded-lg border transition-all text-left w-full group",
                  activity.isRead 
                    ? "bg-neutral-50/50 border-transparent hover:bg-neutral-50" 
                    : "bg-white border-neutral-100 shadow-sm hover:border-neutral-200 relative overflow-hidden"
                )}
              >
                {!activity.isRead && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                )}
                <div className="flex gap-3">
                  <div className={cn("p-2 rounded-lg border shrink-0 h-fit", getColorClass(activity.severity, activity.isRead))}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={cn("text-sm font-semibold truncate pr-2", activity.isRead ? "text-neutral-600" : "text-neutral-900")}>
                        {activity.title}
                      </h4>
                      <span className="text-[10px] text-neutral-400 whitespace-nowrap shrink-0">
                        {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <p className={cn("text-xs line-clamp-2", activity.isRead ? "text-neutral-400" : "text-neutral-600")}>
                      {activity.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center p-6 text-neutral-400">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-20" />
            <p className="text-sm">No recent activity.</p>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-neutral-100 text-center">
        <Link href="/dashboard/notifications" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View All Activity
        </Link>
      </div>
    </div>
  );
}
