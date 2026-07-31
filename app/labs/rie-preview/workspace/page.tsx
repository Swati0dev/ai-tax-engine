import React from "react";
import { MyWorkspace } from "@/components/rie/workspace/MyWorkspace";
import { Watchlist } from "@/components/rie/workspace/Watchlist";

export default function WorkspacePage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">My Workspace</h1>
          <p className="text-slate-500 mt-2">Manage your saved intelligence, collections, and watchlists.</p>
        </div>

        <Watchlist />
        
        <MyWorkspace />
        
      </div>
    </div>
  );
}
