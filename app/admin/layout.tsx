import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Admin Content Area */}
      <main className="flex-1 w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
