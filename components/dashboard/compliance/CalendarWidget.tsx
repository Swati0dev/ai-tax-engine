"use client";

import { ComplianceEventViewModel } from "@/src/engines/compliance/compliance.types";
import { ComplianceStatus } from "@prisma/client";
import { format, isSameDay } from "date-fns";

interface CalendarWidgetProps {
  events: ComplianceEventViewModel[];
  onStatusChange: (eventId: string, status: ComplianceStatus) => void;
}

export function CalendarWidget({ events, onStatusChange }: CalendarWidgetProps) {
  // Simplified rendering for demonstration. A full calendar would use a grid.
  const groupedByDate = events.reduce((acc, event) => {
    const dateStr = format(new Date(event.dueDate), "yyyy-MM-dd");
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(event);
    return acc;
  }, {} as Record<string, ComplianceEventViewModel[]>);

  const dates = Object.keys(groupedByDate).sort();

  return (
    <div className="bg-white p-6 rounded-xl border border-neutral-200/50 shadow-sm">
      <h3 className="text-lg font-semibold text-neutral-800 mb-4">Compliance Calendar</h3>
      {dates.length === 0 ? (
        <p className="text-sm text-neutral-500">No events scheduled.</p>
      ) : (
        <div className="space-y-6">
          {dates.map(dateStr => (
            <div key={dateStr} className="space-y-2">
              <h4 className="text-sm font-medium text-neutral-600 border-b pb-1">{format(new Date(dateStr), "MMM d, yyyy")}</h4>
              <ul className="space-y-2">
                {groupedByDate[dateStr].map(event => (
                  <li key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 border border-neutral-100">
                    <div>
                      <p className="text-sm font-medium text-neutral-800">{event.title}</p>
                      {event.description && <p className="text-xs text-neutral-500 mt-1">{event.description}</p>}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        event.status === "COMPLETED" ? "bg-emerald-100 text-emerald-700" :
                        event.status === "OVERDUE" ? "bg-rose-100 text-rose-700" :
                        event.status === "IN_PROGRESS" ? "bg-amber-100 text-amber-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {event.status}
                      </span>
                      <select 
                        value={event.status}
                        onChange={(e) => onStatusChange(event.id, e.target.value as ComplianceStatus)}
                        className="text-xs border border-neutral-200 rounded p-1"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                      </select>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
