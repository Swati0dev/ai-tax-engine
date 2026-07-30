import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ReactNode } from "react";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Dashboard",
  description: "Manage your tax compliances, review personalized recommendations, and track progress securely.",
  noIndex: true,
});

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <main className="flex-1 w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
