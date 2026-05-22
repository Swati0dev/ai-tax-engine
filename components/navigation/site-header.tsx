"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Landmark, Menu, X, ChevronRight, User } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { GamificationBadge } from "./GamificationBadge";

const desktopNavigationItems = [
  { href: "/chat", label: "Ask AI" },
  { href: "/direct-tax", label: "Direct Tax" },
  { href: "/indirect-tax", label: "Indirect Tax" },
  { href: "/calculators", label: "Calculators" },
  { href: "/compliance", label: "Compliance" },
  { href: "/knowledge-hub", label: "Knowledge Hub" },
  { href: "/dashboard", label: "Dashboard" }
];

const allNavigationItems = [
  { href: "/", label: "Home" },
  ...desktopNavigationItems,
  { href: "/pricing", label: "Pricing" }
];

type SiteHeaderProps = {
  className?: string;
};

export function SiteHeader({ className }: SiteHeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={cn("sticky top-0 z-50 w-full glass-navbar transition-all duration-300", className)}>
      <div className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link 
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-primary transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg p-1" 
          href="/"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
            <Landmark className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
          </span>
          <span className="font-heading text-xl font-bold tracking-tight text-primary">Tax AI Platform</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav aria-label="Main navigation" className="hidden lg:flex lg:items-center lg:gap-1">
          {desktopNavigationItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                className={cn(
                  "px-3.5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive 
                    ? "bg-primary/10 text-primary font-bold" 
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Items */}
        <div className="flex items-center gap-2 sm:gap-4">
          <GamificationBadge />
          
          {/* Dashboard Icon Shortcut */}
          <Link
            href="/login"
            className="p-2 text-muted-foreground hover:text-primary rounded-xl hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            title="Profile / Login"
          >
            <User className="h-5 w-5" />
          </Link>

          {/* Ask Tax AI Quick Call-To-Action Button */}
          <Link 
            href="/chat"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-secondary px-5 py-2 text-sm font-bold text-secondary-foreground shadow-lg shadow-secondary/20 transition-transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Ask Tax AI
          </Link>

          {/* Mobile Menu Hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[4.5rem] z-40 w-full bg-background/95 backdrop-blur-md animate-in fade-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col gap-1 p-6 border-b shadow-2xl bg-white max-h-[calc(100vh-4.5rem)] overflow-y-auto">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Navigation Menu
            </div>
            {allNavigationItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
              return (
                <Link
                  className={cn(
                    "flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold transition-all focus-visible:outline-none",
                    isActive 
                      ? "bg-primary/10 text-primary font-bold" 
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  )}
                  href={item.href}
                  key={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                  <ChevronRight className="h-4 w-4 opacity-55" />
                </Link>
              );
            })}
            <div className="mt-6 pt-6 border-t px-3 flex flex-col gap-4">
              <Link
                href="/chat"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center rounded-xl bg-primary py-3.5 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-transform active:translate-y-0.5"
              >
                Ask Tax AI Assistant
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
