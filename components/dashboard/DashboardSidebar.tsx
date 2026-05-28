"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  User, 
  PieChart, 
  Calculator, 
  MessageSquare, 
  Bookmark, 
  ListTodo, 
  FileText, 
  ShieldAlert, 
  Bell, 
  Settings, 
  HelpCircle, 
  LogOut,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const SIDEBAR_SECTIONS = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "My Profile", href: "/dashboard/profile", icon: User },
      { name: "Tax Overview", href: "/dashboard/overview", icon: PieChart },
    ]
  },
  {
    title: "Tax Intelligence",
    items: [
      { name: "Saved Calculations", href: "/dashboard/calculations", icon: Calculator },
      { name: "AI Chat History", href: "/dashboard/chats", icon: MessageSquare },
      { name: "Saved Sections", href: "/dashboard/saved-sections", icon: Bookmark },
    ]
  },
  {
    title: "Action Center",
    items: [
      { name: "Filing Tracker", href: "/dashboard/tracker", icon: ListTodo },
      { name: "Documents", href: "/dashboard/documents", icon: FileText },
      { name: "Compliance Alerts", href: "/dashboard/compliance", icon: ShieldAlert },
    ]
  },
  {
    title: "Preferences",
    items: [
      { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
      { name: "Settings", href: "/dashboard/settings", icon: Settings },
      { name: "Help & Support", href: "/dashboard/support", icon: HelpCircle },
    ]
  }
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 hidden md:flex flex-col bg-white border-r border-slate-100 min-h-[calc(100vh-4rem)]">
      <div className="p-6">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-primary/5 border border-primary/10 mb-6 w-max">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-xs font-black uppercase tracking-widest text-primary">Control Center</span>
        </div>
        
        <nav className="space-y-8">
          {SIDEBAR_SECTIONS.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                {section.title}
              </h4>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link 
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all group",
                          isActive 
                            ? "bg-primary text-white shadow-md shadow-primary/20" 
                            : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                        )}
                      >
                        <item.icon className={cn(
                          "h-4 w-4 transition-colors", 
                          isActive ? "text-white" : "text-slate-400 group-hover:text-primary"
                        )} />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-100">
        <button className="flex items-center gap-3 px-3 py-2 w-full rounded-xl text-sm font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors group">
          <LogOut className="h-4 w-4 text-slate-400 group-hover:text-red-500 transition-colors" />
          Logout
        </button>
      </div>
    </aside>
  );
}
