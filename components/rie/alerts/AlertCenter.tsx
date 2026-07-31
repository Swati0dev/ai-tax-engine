import React from "react";
import { Bell, AlertTriangle, CheckCircle, Clock, Pin } from "lucide-react";

interface Alert {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  status: "Unread" | "Read" | "Resolved" | "Pinned";
  timeAgo: string;
}

interface AlertCenterProps {
  alerts: Alert[];
}

export function AlertCenter({ alerts }: AlertCenterProps) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col h-full overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 p-4 md:p-5 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Bell className="h-4 w-4 text-slate-500" />
          Alert Center
        </h3>
        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          {alerts.filter(a => a.status === "Unread").length} New
        </span>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            className={`p-4 md:p-5 hover:bg-slate-50 transition-colors flex gap-4 ${alert.status === 'Unread' ? 'bg-blue-50/30' : ''}`}
          >
            <div className="shrink-0 pt-1">
              {alert.priority === "High" ? (
                <AlertTriangle className="h-5 w-5 text-red-500" />
              ) : alert.status === "Resolved" ? (
                <CheckCircle className="h-5 w-5 text-emerald-500" />
              ) : alert.status === "Pinned" ? (
                <Pin className="h-5 w-5 text-amber-500" />
              ) : (
                <Clock className="h-5 w-5 text-blue-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className={`text-sm font-bold truncate ${alert.status === 'Unread' ? 'text-slate-900' : 'text-slate-700'}`}>
                  {alert.title}
                </h4>
                <span className="text-[10px] text-slate-400 whitespace-nowrap shrink-0">{alert.timeAgo}</span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {alert.description}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  alert.priority === "High" ? "bg-red-50 text-red-600 border border-red-200" :
                  alert.priority === "Medium" ? "bg-amber-50 text-amber-600 border border-amber-200" :
                  "bg-blue-50 text-blue-600 border border-blue-200"
                }`}>
                  {alert.priority}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  {alert.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
