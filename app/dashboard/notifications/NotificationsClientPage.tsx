"use client";

import { useState } from "react";
import { ActivityViewModel } from "@/src/engines/activity/activity.types";
import { formatDistanceToNow } from "date-fns";
import { Bell, CheckCircle2, AlertTriangle, Info, ShieldAlert, Sparkles, XCircle, CheckCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { markActivityAsReadAction, markAllActivitiesAsReadAction } from "@/actions/activity";

interface NotificationsClientPageProps {
  initialActivities: ActivityViewModel[];
}

type TabType = "ALL" | "UNREAD" | "COMPLIANCE" | "CALCULATION" | "SYSTEM";

export default function NotificationsClientPage({ initialActivities }: NotificationsClientPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>("ALL");
  const [activities, setActivities] = useState(initialActivities);

  const filteredActivities = activities.filter(activity => {
    if (activeTab === "ALL") return true;
    if (activeTab === "UNREAD") return !activity.isRead;
    return activity.type === activeTab;
  });

  const handleMarkRead = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const res = await markActivityAsReadAction(id);
    if (res.success) {
      setActivities(prev => prev.map(a => a.id === id ? { ...a, isRead: true } : a));
    }
  };

  const handleMarkAllRead = async () => {
    const res = await markAllActivitiesAsReadAction();
    if (res.success) {
      setActivities(prev => prev.map(a => ({ ...a, isRead: true })));
    }
  };

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

  const tabs: { label: string, value: TabType }[] = [
    { label: "All Activity", value: "ALL" },
    { label: "Unread", value: "UNREAD" },
    { label: "Compliance", value: "COMPLIANCE" },
    { label: "Calculations", value: "CALCULATION" },
    { label: "System", value: "SYSTEM" },
  ];

  const unreadCount = activities.filter(a => !a.isRead).length;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-500" />
            Activity Center
          </h1>
          <p className="text-neutral-500 mt-1">Review your recent updates, alerts, and system notifications.</p>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={handleMarkAllRead}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-medium rounded-lg transition-colors shrink-0"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all as read
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl border border-neutral-200/50 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        
        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-neutral-200 bg-neutral-50/50 p-2 gap-2 hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all",
                activeTab === tab.value 
                  ? "bg-white text-blue-600 shadow-sm border border-neutral-200" 
                  : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100/50 border border-transparent"
              )}
            >
              {tab.label}
              {tab.value === "UNREAD" && unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {filteredActivities.length > 0 ? (
            <div className="divide-y divide-neutral-100">
              {filteredActivities.map(activity => {
                const Icon = getIcon(activity.type, activity.severity);
                if (activity.actionUrl) {
                  return (
                    <Link
                      key={activity.id}
                      href={activity.actionUrl}
                      className={cn(
                        "block p-5 transition-all text-left w-full group relative",
                        activity.isRead 
                          ? "bg-white hover:bg-neutral-50/50" 
                          : "bg-blue-50/20 hover:bg-blue-50/40"
                      )}
                    >
                      {!activity.isRead && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                      )}
                      <div className="flex gap-4">
                        <div className={cn("p-2.5 rounded-lg border shrink-0 h-fit", getColorClass(activity.severity, activity.isRead))}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 gap-2">
                            <h4 className={cn("text-base font-semibold", activity.isRead ? "text-neutral-700" : "text-neutral-900")}>
                              {activity.title}
                            </h4>
                            <span className="text-xs text-neutral-400 whitespace-nowrap shrink-0">
                              {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                            </span>
                          </div>
                          <p className={cn("text-sm max-w-3xl", activity.isRead ? "text-neutral-500" : "text-neutral-700")}>
                            {activity.message}
                          </p>
                        </div>
                        {!activity.isRead && (
                          <div className="shrink-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => handleMarkRead(activity.id, e)}
                              className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors tooltip-trigger"
                              title="Mark as read"
                            >
                              <CheckCircle2 className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                }

                return (
                  <div
                    key={activity.id}
                    className={cn(
                      "block p-5 transition-all text-left w-full group relative",
                      activity.isRead 
                        ? "bg-white hover:bg-neutral-50/50" 
                        : "bg-blue-50/20 hover:bg-blue-50/40"
                    )}
                  >
                    {!activity.isRead && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                    )}
                    <div className="flex gap-4">
                      <div className={cn("p-2.5 rounded-lg border shrink-0 h-fit", getColorClass(activity.severity, activity.isRead))}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 gap-2">
                          <h4 className={cn("text-base font-semibold", activity.isRead ? "text-neutral-700" : "text-neutral-900")}>
                            {activity.title}
                          </h4>
                          <span className="text-xs text-neutral-400 whitespace-nowrap shrink-0">
                            {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <p className={cn("text-sm max-w-3xl", activity.isRead ? "text-neutral-500" : "text-neutral-700")}>
                          {activity.message}
                        </p>
                      </div>
                      {!activity.isRead && (
                        <div className="shrink-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => handleMarkRead(activity.id, e)}
                            className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors tooltip-trigger"
                            title="Mark as read"
                          >
                            <CheckCircle2 className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-neutral-400">
              <Bell className="w-12 h-12 mb-4 opacity-20" />
              <h3 className="text-lg font-medium text-neutral-600">No activities found</h3>
              <p className="text-sm">You are all caught up!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
