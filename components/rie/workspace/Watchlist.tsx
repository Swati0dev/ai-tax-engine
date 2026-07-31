import React from "react";
import { Eye, Plus, Check } from "lucide-react";

export function Watchlist() {
  const watchTopics = [
    { id: "1", name: "GST", following: true },
    { id: "2", name: "Income Tax", following: true },
    { id: "3", name: "MCA", following: false },
    { id: "4", name: "RBI", following: true },
    { id: "5", name: "SEBI", following: false },
    { id: "6", name: "Labour Laws", following: false },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Eye className="h-5 w-5 text-blue-500" />
          Regulatory Watchlist
        </h3>
      </div>
      
      <p className="text-sm text-slate-500 mb-6">Select the regulatory bodies and topics you want to monitor in your alerts.</p>

      <div className="flex flex-wrap gap-3">
        {watchTopics.map(topic => (
          <button 
            key={topic.id}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
              topic.following 
                ? "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300"
                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {topic.following ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {topic.name}
          </button>
        ))}
      </div>
    </div>
  );
}
