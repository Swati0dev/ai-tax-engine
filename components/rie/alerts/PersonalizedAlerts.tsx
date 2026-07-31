import React from "react";
import { Settings2, Building2, MapPin, Briefcase, FileText } from "lucide-react";

export function PersonalizedAlerts() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Intelligence Preferences</h3>
          <p className="text-sm text-slate-500 mt-1">Configure your personalized regulatory radar.</p>
        </div>
        <button className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors">
          <Settings2 className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Industry & Geography */}
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Saved Industries
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-primary/5 text-primary text-sm font-semibold border border-primary/20">FinTech</span>
              <span className="px-3 py-1.5 rounded-lg bg-primary/5 text-primary text-sm font-semibold border border-primary/20">E-Commerce</span>
              <button className="px-3 py-1.5 rounded-lg border border-dashed border-slate-300 text-slate-400 text-sm font-semibold hover:border-primary/50 hover:text-primary transition-colors">
                + Add Industry
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Monitored Jurisdictions
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-semibold border border-slate-200">Central Government</span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-semibold border border-slate-200">Karnataka</span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-semibold border border-slate-200">Maharashtra</span>
            </div>
          </div>
        </div>

        {/* Laws & Topics */}
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Followed Regulations
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-sm font-semibold border border-blue-200">Income Tax Act</span>
              <span className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-sm font-semibold border border-blue-200">CGST Act</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Company Types
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-semibold border border-emerald-200">Private Limited</span>
              <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-semibold border border-emerald-200">LLP</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
