import { CalendarDays, GitCommit } from "lucide-react";

export type TimelineEventType = "Law Amendment" | "Finance Act" | "Notification" | "Circular" | "Court Decision";

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: TimelineEventType;
  link?: string;
}

interface LegalTimelineProps {
  events: TimelineEvent[];
}

export function LegalTimeline({ events }: LegalTimelineProps) {
  if (!events || events.length === 0) return null;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 mt-12 print:border-black print:bg-white print:text-black">
      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-8 flex items-center gap-2">
        <CalendarDays className="h-4 w-4" />
        Legal Timeline
      </h3>
      
      <div className="relative border-l-2 border-slate-200 ml-4 space-y-10 print:border-black">
        {events.map((event) => (
          <div key={event.id} className="relative pl-8">
            <span className="absolute -left-[11px] top-1.5 h-5 w-5 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center print:border-black">
              <div className="h-1.5 w-1.5 rounded-full bg-slate-400 print:bg-black" />
            </span>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
              <span className="text-sm font-bold text-slate-900 bg-white border border-slate-200 px-2 py-0.5 rounded-md shadow-sm print:border-black print:text-black">
                {event.date}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full print:bg-white print:border print:border-black print:text-black">
                {event.type}
              </span>
            </div>
            
            <h4 className="text-base font-bold text-slate-800 mb-1 print:text-black">
              {event.link ? (
                <a href={event.link} className="hover:text-primary hover:underline transition-colors print:text-black">
                  {event.title}
                </a>
              ) : (
                event.title
              )}
            </h4>
            
            <p className="text-sm text-slate-600 m-0 leading-relaxed print:text-black">
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
