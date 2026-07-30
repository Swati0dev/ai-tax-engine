"use client";

import { useState } from "react";
import { ComplianceEventViewModel } from "@/src/engines/compliance/compliance.types";
import { DashboardComplianceItem } from "@/src/engines/dashboard/dashboard.types";
import { ComplianceStatus } from "@prisma/client";
import { CalendarWidget } from "./CalendarWidget";
import { TimelineWidget } from "./TimelineWidget";
import { UpcomingDeadlinesCard } from "./UpcomingDeadlinesCard";
import { MyITRQuest } from "./MyITRQuest";
import { FilingChecklistWidget } from "./FilingChecklistWidget";
import { DueDateTrackerWidget } from "./DueDateTrackerWidget";
import { updateComplianceEventStatusAction } from "@/actions/compliance";

interface ComplianceWorkspaceProps {
  initialEvents: ComplianceEventViewModel[];
  checklist: DashboardComplianceItem[];
  dueDates: DashboardComplianceItem[];
}

export function ComplianceWorkspace({ initialEvents, checklist, dueDates }: ComplianceWorkspaceProps) {
  const [events, setEvents] = useState<ComplianceEventViewModel[]>(initialEvents);
  const [activeTab, setActiveTab] = useState<"calendar" | "timeline">("calendar");

  const handleStatusChange = async (eventId: string, newStatus: ComplianceStatus) => {
    // Optimistic update
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, status: newStatus } : e));
    
    // Server action
    const res = await updateComplianceEventStatusAction(eventId, newStatus);
    if (!res.success) {
      // Revert on failure (simple reload or state revert)
      setEvents(initialEvents);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-neutral-800">Compliance & Deadlines</h2>
          <p className="text-sm text-neutral-500">Track and manage your tax and regulatory obligations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Main views (Calendar/Timeline + Old Widgets) */}
        <div className="lg:col-span-8 space-y-8">
          
          <MyITRQuest />

          {/* View Toggles */}
          <div className="flex items-center gap-2 p-1 bg-neutral-100 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab("calendar")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === "calendar" ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setActiveTab("timeline")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === "timeline" ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              Timeline
            </button>
          </div>

          {activeTab === "calendar" ? (
            <CalendarWidget events={events} onStatusChange={handleStatusChange} />
          ) : (
            <TimelineWidget events={events} />
          )}

          <FilingChecklistWidget initialChecklist={checklist} />
        </div>

        {/* Right Col: Summaries */}
        <div className="lg:col-span-4 space-y-8">
          <UpcomingDeadlinesCard events={events} />
          <DueDateTrackerWidget initialDueDates={dueDates} />
        </div>
      </div>
    </div>
  );
}
