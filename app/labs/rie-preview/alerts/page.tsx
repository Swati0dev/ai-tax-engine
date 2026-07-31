import React from "react";
import { AlertCenter } from "@/components/rie/alerts/AlertCenter";
import { PersonalizedAlerts } from "@/components/rie/alerts/PersonalizedAlerts";

export default function AlertsPage() {
  const mockAlerts = [
    {
      id: "1",
      title: "Supreme Court Ruling on Input Tax Credit",
      description: "Landmark judgment regarding ITC claiming timelines has been passed. This affects your watched topic 'GST'.",
      priority: "High" as const,
      status: "Unread" as const,
      timeAgo: "2 hours ago"
    },
    {
      id: "2",
      title: "CBDT Circular on TDS under 194R",
      description: "New circular clarifies the valuation of perquisites for TDS purposes. Impacts FinTech and E-Commerce sectors.",
      priority: "High" as const,
      status: "Read" as const,
      timeAgo: "1 day ago"
    },
    {
      id: "3",
      title: "Draft Labour Code Rules Published",
      description: "Ministry of Labour has published draft rules for wage definitions.",
      priority: "Medium" as const,
      status: "Resolved" as const,
      timeAgo: "3 days ago"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Alert Center</h1>
          <p className="text-slate-500 mt-2">Manage your regulatory notifications and intelligence radar.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Alert Feed */}
          <div className="xl:col-span-2 h-[600px]">
            <AlertCenter alerts={mockAlerts} />
          </div>

          {/* Preferences */}
          <div>
            <PersonalizedAlerts />
          </div>
        </div>
        
      </div>
    </div>
  );
}
