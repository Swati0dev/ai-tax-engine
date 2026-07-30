"use client";

import { ComplianceEventViewModel } from "@/src/engines/compliance/compliance.types";
import { format } from "date-fns";

interface TimelineWidgetProps {
  events: ComplianceEventViewModel[];
}

export function TimelineWidget({ events }: TimelineWidgetProps) {
  const sorted = [...events].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return (
    <div className="bg-white p-6 rounded-xl border border-neutral-200/50 shadow-sm relative overflow-hidden">
      <h3 className="text-lg font-semibold text-neutral-800 mb-6 relative z-10">Compliance Timeline</h3>
      
      {sorted.length === 0 ? (
        <p className="text-sm text-neutral-500 relative z-10">No upcoming events.</p>
      ) : (
        <div className="relative z-10 space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-300 before:to-transparent">
          {sorted.map((event, index) => (
            <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-500 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm">
                <span className="text-xs font-bold">{index + 1}</span>
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-neutral-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <span className="font-semibold text-neutral-800 text-sm">{event.title}</span>
                  <span className="text-xs text-neutral-500">{format(new Date(event.dueDate), "MMM d")}</span>
                </div>
                <div className="text-neutral-500 text-xs">
                  {event.eventType.replace('_', ' ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
