import Link from "next/link";
import { Landmark } from "lucide-react";

import { cn } from "@/lib/utils";

const navigationItems = [
  { href: "/chat", label: "Chat" },
  { href: "/direct-tax", label: "Direct Tax" },
  { href: "/indirect-tax", label: "Indirect Tax" },
  { href: "/forms", label: "Forms" },
  { href: "/sources", label: "Sources" }
];

type SiteHeaderProps = {
  className?: string;
};

export function SiteHeader({ className }: SiteHeaderProps) {
  return (
    <header className={cn("sticky top-0 z-50 w-full glass border-b", className)}>
      <div className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-2 text-lg font-bold tracking-tight text-primary transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg p-1" href="/">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
            <Landmark className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
          </span>
          <span className="hidden sm:inline-block">Tax AI Platform</span>
        </Link>
        
        <nav aria-label="Main navigation" className="hidden md:flex md:items-center md:gap-1">
          {navigationItems.map((item) => (
            <Link
              className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary rounded-lg hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 text-muted-foreground hover:text-primary rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {/* Mobile Menu Icon would go here */}
            <span className="sr-only">Toggle menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <Link 
            href="/chat"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/20 transition-transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Ask Tax AI
          </Link>
        </div>
      </div>
    </header>
  );
}
