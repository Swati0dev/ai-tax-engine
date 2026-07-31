import { Settings } from "lucide-react";

export default function SettingsAdminPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
            <Settings className="h-8 w-8 text-indigo-600" />
            Platform Settings
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Global application configuration and API keys.
          </p>
        </div>
      </div>
      <div className="flex h-[50vh] w-full items-center justify-center border border-dashed border-slate-300 rounded-2xl bg-slate-50">
        <div className="text-center">
          <p className="text-slate-600 font-medium">This module is locked under the Phase 10 Scope Freeze.</p>
          <p className="text-slate-400 text-sm mt-2">All global settings are currently managed via Vercel Environment Variables.</p>
        </div>
      </div>
    </div>
  );
}
