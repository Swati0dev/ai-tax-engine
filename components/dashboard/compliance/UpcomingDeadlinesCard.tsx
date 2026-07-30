"use client";

import { ComplianceEventViewModel } from "@/src/engines/compliance/compliance.types";
import { format, differenceInDays, isBefore, startOfDay } from "date-fns";
import { AlertCircle, CalendarClock, CheckCircle2 } from "lucide-react";

interface UpcomingDeadlinesCardProps {
  events: ComplianceEventViewModel[];
}

export function UpcomingDeadlinesCard({ events }: UpcomingDeadlinesCardProps) {
  const today = startOfDay(new Date());
  
  const getPriorityWeight = (p: string) => {
    if (p === 'HIGH') return 3;
    if (p === 'MEDIUM') return 2;
    return 1;
  };

  const pending = events.filter(e => e.status !== "COMPLETED");
  
  const overdue = pending
    .filter(e => isBefore(startOfDay(new Date(e.dueDate)), today))
    .sort((a, b) => getPriorityWeight(b.priority) - getPriorityWeight(a.priority));
    
  const upcoming = pending
    .filter(e => !isBefore(startOfDay(new Date(e.dueDate)), today))
    .sort((a, b) => {
      const dateA = startOfDay(new Date(a.dueDate)).getTime();
      const dateB = startOfDay(new Date(b.dueDate)).getTime();
      if (dateA !== dateB) return dateA - dateB;
      return getPriorityWeight(b.priority) - getPriorityWeight(a.priority);
    });

  const displayUpcoming = upcoming.slice(0, 3);

  return (
    <div className="bg-white p-6 rounded-xl border border-neutral-200/50 shadow-sm">
      <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
        <CalendarClock className="w-5 h-5 text-blue-500" />
        Deadlines & Alerts
      </h3>
      
      <div className="space-y-4">
        {overdue.length > 0 && (
          <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg">
            <h4 className="text-xs font-semibold text-rose-800 flex items-center gap-1 mb-2">
              <AlertCircle className="w-4 h-4" /> OVERDUE ({overdue.length})
            </h4>
            <ul className="space-y-2">
              {overdue.map(event => (
                <li key={event.id} className="text-sm text-rose-700 flex justify-between">
                  <span className="truncate pr-2">{event.title}</span>
                  <span className="shrink-0">{format(new Date(event.dueDate), "MMM d")}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {displayUpcoming.length > 0 ? (
          <div>
            <h4 className="text-xs font-semibold text-neutral-500 mb-2 uppercase tracking-wider">Coming Up</h4>
            <ul className="space-y-3">
              {displayUpcoming.map(event => {
                const daysLeft = differenceInDays(startOfDay(new Date(event.dueDate)), today);
                const isUrgent = daysLeft <= 7;
                return (
                  <li key={event.id} className="flex justify-between items-center text-sm p-3 rounded-lg border border-neutral-100 bg-neutral-50">
                    <div className="truncate pr-2">
                      <span className="font-medium text-neutral-800 block truncate">{event.title}</span>
                      <span className="text-xs text-neutral-500 block">
                        {isUrgent ? (
                          <span className="text-amber-600 font-medium">{daysLeft} days left</span>
                        ) : (
                          `In ${daysLeft} days`
                        )}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm text-neutral-600 block">{format(new Date(event.dueDate), "MMM d")}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="text-center p-6 text-neutral-500 bg-neutral-50 rounded-lg border border-neutral-100 border-dashed">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-50" />
            <p className="text-sm">You are all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}
