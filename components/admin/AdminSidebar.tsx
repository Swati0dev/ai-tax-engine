"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Database, 
  MessageSquare, 
  Settings, 
  LogOut,
  ShieldCheck,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_SECTIONS = [
  {
    title: "Core",
    items: [
      { name: "Overview", href: "/admin", icon: LayoutDashboard },
      { name: "User Management", href: "/admin/users", icon: Users },
    ]
  },
  {
    title: "Content",
    items: [
      { name: "Tax Knowledge CMS", href: "/admin/knowledge", icon: Database },
      { name: "AI Prompts", href: "/admin/prompts", icon: MessageSquare },
    ]
  },
  {
    title: "System",
    items: [
      { name: "Platform Settings", href: "/admin/settings", icon: Settings },
    ]
  }
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Actual Sidebar */}
      <aside 
        className={cn(
          "sticky left-0 top-[4.5rem] h-[calc(100vh-4.5rem)] z-40 bg-slate-900 border-r border-slate-800 text-slate-300 transition-all duration-300 flex flex-col overflow-hidden shadow-xl hidden md:flex",
          isOpen ? "w-64" : "w-16"
        )}
      >
        <div className="py-4 flex flex-col h-full">
          
          {/* Hamburger / Branding */}
          <div className="flex items-center gap-4 mb-6 h-10 px-3">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="shrink-0 p-2 hover:bg-slate-800 rounded-full transition-colors focus:outline-none flex items-center justify-center"
              title={isOpen ? "Close sidebar" : "Open sidebar"}
            >
              <Menu className="h-5 w-5 text-slate-300" />
            </button>
            <div className={cn("flex items-center gap-2 px-2 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 transition-opacity duration-300", isOpen ? "opacity-100" : "opacity-0")}>
              <ShieldCheck className="h-4 w-4 text-indigo-400 shrink-0" />
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 whitespace-nowrap">Admin</span>
            </div>
          </div>
          
          <nav className="space-y-6 flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide px-2">
            {ADMIN_SECTIONS.map((section, idx) => (
              <div key={idx} className="space-y-1">
                <h4 className={cn(
                  "text-[10px] font-black text-slate-500 uppercase tracking-widest px-3 mb-2 transition-all duration-300", 
                  isOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden mb-0"
                )}>
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
                            "flex items-center py-3 rounded-full text-sm font-semibold transition-all group overflow-hidden whitespace-nowrap",
                            isOpen ? "px-3 gap-4" : "justify-center px-0",
                            isActive 
                              ? "bg-indigo-500/15 text-indigo-400" 
                              : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                          )}
                          title={!isOpen ? item.name : undefined}
                        >
                          <item.icon className={cn(
                            "h-5 w-5 shrink-0 transition-colors", 
                            isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-200"
                          )} />
                          <span className={cn("transition-opacity duration-300", isOpen ? "opacity-100" : "opacity-0 w-0")}>
                            {item.name}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <div className="mt-auto pt-4 border-t border-slate-800 px-2">
            <button 
              className={cn(
                "flex items-center py-3 rounded-full text-sm font-semibold transition-all group overflow-hidden whitespace-nowrap text-slate-400 hover:bg-red-500/10 hover:text-red-400 w-full",
                isOpen ? "px-3 gap-4" : "justify-center px-0"
              )}
              title={!isOpen ? "Logout" : undefined}
            >
              <LogOut className="h-5 w-5 shrink-0 text-slate-400 group-hover:text-red-400 transition-colors" />
              <span className={cn("transition-opacity duration-300", isOpen ? "opacity-100" : "opacity-0 w-0")}>
                Logout Admin
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
