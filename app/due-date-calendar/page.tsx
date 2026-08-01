import { ComplianceCenter } from "@/components/tools/ComplianceCenter";
import { CalendarDays } from "lucide-react";

export default function DueDateCalendarPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
          <CalendarDays className="h-8 w-8 text-indigo-600" />
          Tax Due Date Calendar
        </h1>
        <p className="mt-2 text-lg text-slate-600 max-w-2xl">
          Never miss a tax deadline. Track upcoming dates for Income Tax returns, Advance Tax, and GST filings. Calculate late fees instantly.
        </p>
      </div>

      <div className="w-full">
        <ComplianceCenter />
      </div>
    </div>
  );
}
