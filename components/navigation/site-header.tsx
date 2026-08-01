"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Landmark, Menu, X, ChevronRight, User, LogOut, LayoutDashboard, Settings, UserPlus, LogIn, Search, ChevronDown, Bot } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// --- Desktop Dropdown Data ---
const learnItems = [
  { href: "/knowledge-hub/tax-basics", label: "Tax Basics" },
  { href: "/knowledge-hub/income-tax", label: "Income Tax" },
  { href: "/knowledge-hub/gst", label: "GST" },
  { href: "/knowledge-hub/tds", label: "TDS" },
  { href: "/knowledge-hub/business-tax", label: "Business Tax" },
  { href: "/knowledge-hub/company-tax", label: "Company Tax" },
  { href: "/knowledge-hub/international-tax", label: "International Tax" },
  { href: "/knowledge-hub/roadmap", label: "Learning Roadmap" },
];

const solutionItems = [
  { href: "/solutions/start-business", label: "Start Business" },
  { href: "/solutions/register-gst", label: "Register GST" },
  { href: "/solutions/file-itr", label: "File ITR" },
  { href: "/solutions/save-tax", label: "Save Tax" },
  { href: "/business-compliance", label: "Business Compliance" },
  { href: "/tax-notices", label: "Tax Notices" },
  { href: "/calculators/business-registration", label: "Business Registration" },
  { href: "/export-business", label: "Export Business" },
];

const toolItems = [
  { href: "/calculators/income-tax-calculator", label: "Income Tax Calculator" },
  { href: "/calculators/gst-calculator", label: "GST Calculator" },
  { href: "/calculators/hra-calculator", label: "HRA Calculator" },
  { href: "/tax-planner", label: "Tax Planner" },
  { href: "/ai-document-reader", label: "AI Document Reader" },
  { href: "/due-date-calendar", label: "Due Date Calendar" },
  { href: "/downloads", label: "Downloads" },
];

type SiteHeaderProps = {
  className?: string;
};

export function SiteHeader({ className }: SiteHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Dropdown states
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const session = await res.json();
        if (session && Object.keys(session).length > 0) {
          setIsLoggedIn(true);
          localStorage.setItem("tax-logged-in", "true");
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("tax-logged-in");
        }
      } catch (error) {
        setIsLoggedIn(localStorage.getItem("tax-logged-in") === "true");
      }
    };
    
    checkAuth();
    
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("tax-logged-in");
    setIsLoggedIn(false);
    setProfileOpen(false);
    
    // Dynamic import to avoid SSR errors
    const { signOut } = await import("next-auth/react");
    signOut({ callbackUrl: "/" });
  };

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) setActiveDropdown(null);
    else setActiveDropdown(name);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("q")?.toString().toLowerCase().trim() || "";
    if (!query) return;
    
    if (query.includes("direct tax")) router.push("/direct-tax");
    else if (query.includes("indirect tax") || query.includes("gst")) router.push("/indirect-tax");
    else if (query.includes("business") || query.includes("freelance") || query.includes("self employ")) router.push("/knowledge-hub/business-tax");
    else if (query.includes("salary") || query.includes("income")) router.push("/knowledge-hub/income-tax");
    else router.push(`/knowledge-hub/${query.replace(/\s+/g, '-')}`);
  };

  const handleNavigation = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    
    if (pathname === href) {
      window.location.href = href; // Force reload if already on the page
    } else {
      router.push(href);
    }
  };

  return (
    <header ref={headerRef} className={cn("sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all duration-300", className)}>
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        
        {/* Brand Logo */}
        <Link 
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-primary flex-shrink-0" 
          href="/"
          onClick={() => { setMobileMenuOpen(false); setActiveDropdown(null); }}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
            <Landmark className="h-5 w-5" />
          </span>
          <span className="font-heading text-xl font-bold hidden sm:inline-block">Tax AI</span>
        </Link>
        
        {/* Search Bar (Desktop) */}
        <div className="hidden lg:flex flex-1 max-w-md items-center relative">
          <form onSubmit={handleSearch} className="w-full relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input 
                type="text" 
                name="q"
                placeholder="Search taxes, tools, or ask a question..." 
                className="w-full bg-slate-100/80 border-transparent rounded-full py-2 pl-10 pr-4 text-sm focus:bg-white focus:border-primary/30 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </form>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Learn Dropdown */}
          <div className="relative">
            <button 
                onClick={() => toggleDropdown("learn")}
                aria-expanded={activeDropdown === "learn"}
                aria-haspopup="true"
                className={cn("flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-slate-100", activeDropdown === "learn" ? "bg-slate-100 text-primary" : "text-slate-600")}
            >
                Learn <ChevronDown className={cn("h-4 w-4 transition-transform", activeDropdown === "learn" && "rotate-180")} />
            </button>
            {activeDropdown === "learn" && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-2 grid gap-1 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider border-b mb-1">Learn</div>
                    {learnItems.map(item => (
                        <Link key={item.href} href={item.href} onClick={(e) => handleNavigation(e, item.href)} className="px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-primary/5 hover:text-primary transition-colors">
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div className="relative">
            <button 
                onClick={() => toggleDropdown("solutions")}
                aria-expanded={activeDropdown === "solutions"}
                aria-haspopup="true"
                className={cn("flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-slate-100", activeDropdown === "solutions" ? "bg-slate-100 text-primary" : "text-slate-600")}
            >
                Solutions <ChevronDown className={cn("h-4 w-4 transition-transform", activeDropdown === "solutions" && "rotate-180")} />
            </button>
            {activeDropdown === "solutions" && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-2 grid gap-1 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider border-b mb-1">Solutions</div>
                    {solutionItems.map(item => (
                        <Link key={item.href} href={item.href} onClick={(e) => handleNavigation(e, item.href)} className="px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-primary/5 hover:text-primary transition-colors">
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
          </div>

          {/* Tools Dropdown */}
          <div className="relative">
            <button 
                onClick={() => toggleDropdown("tools")}
                aria-expanded={activeDropdown === "tools"}
                aria-haspopup="true"
                className={cn("flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-slate-100", activeDropdown === "tools" ? "bg-slate-100 text-primary" : "text-slate-600")}
            >
                Tools <ChevronDown className={cn("h-4 w-4 transition-transform", activeDropdown === "tools" && "rotate-180")} />
            </button>
            {activeDropdown === "tools" && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-2 grid gap-1 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider border-b mb-1">Tools</div>
                    {toolItems.map(item => (
                        <Link key={item.href} href={item.href} onClick={(e) => handleNavigation(e, item.href)} className="px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-primary/5 hover:text-primary transition-colors">
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
          </div>
        </nav>

        {/* Right Action Items */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          <Link href="/chat" className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors">
             <Bot className="h-4 w-4 text-emerald-400" />
             AI Advisor
          </Link>

          {/* Profile Logic */}
          {isLoggedIn ? (
             <div className="relative">
               <button 
                 onClick={() => setProfileOpen(!profileOpen)} 
                 aria-expanded={profileOpen}
                 aria-haspopup="true"
                 className="flex items-center gap-2 px-3 py-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors"
               >
                  <User className="h-4 w-4 text-slate-600" />
                  <span className="hidden sm:inline-block text-sm font-medium text-slate-700">Dashboard</span>
               </button>
               {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95">
                    <div className="p-2 flex flex-col gap-1">
                      <Link href="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl">
                        <LayoutDashboard className="h-4 w-4 text-primary" /> My Dashboard
                      </Link>
                      <button onClick={handleLogout} className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-xl text-left">
                        <LogOut className="h-4 w-4" /> Logout
                      </button>
                    </div>
                  </div>
               )}
             </div>
          ) : (
            <Link href="/login" className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 hover:text-primary transition-colors">
              Login
            </Link>
          )}

          {/* Mobile Hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[4.5rem] z-40 bg-white overflow-y-auto animate-in slide-in-from-right-full pb-20">
            <div className="p-4 border-b">
                <form onSubmit={(e) => { handleSearch(e); setMobileMenuOpen(false); }} className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input type="text" name="q" placeholder="Search..." className="w-full bg-slate-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary/20" />
                </form>
            </div>

            <nav className="p-4 flex flex-col gap-6">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-slate-900">Home</Link>
                
                <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">📚 LEARN</h3>
                    <div className="flex flex-col gap-2 pl-2 border-l-2 border-slate-100">
                        {learnItems.map(item => (
                            <Link key={item.href} href={item.href} onClick={(e) => handleNavigation(e, item.href)} className="text-base text-slate-700 font-medium py-1">{item.label}</Link>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">💼 SOLUTIONS</h3>
                    <div className="flex flex-col gap-2 pl-2 border-l-2 border-slate-100">
                        {solutionItems.map(item => (
                            <Link key={item.href} href={item.href} onClick={(e) => handleNavigation(e, item.href)} className="text-base text-slate-700 font-medium py-1">{item.label}</Link>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">🧮 TOOLS</h3>
                    <div className="flex flex-col gap-2 pl-2 border-l-2 border-slate-100">
                        {toolItems.map(item => (
                            <Link key={item.href} href={item.href} onClick={(e) => handleNavigation(e, item.href)} className="text-base text-slate-700 font-medium py-1">{item.label}</Link>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">🤖 AI</h3>
                    <div className="flex flex-col gap-2 pl-2 border-l-2 border-slate-100">
                        <Link href="/chat" onClick={() => setMobileMenuOpen(false)} className="text-base text-primary font-bold py-1">Ask AI Advisor</Link>
                        <Link href="/tools/decision-assistant" onClick={() => setMobileMenuOpen(false)} className="text-base text-slate-700 font-medium py-1">Decision Assistant</Link>
                        <Link href="/tools/notice-explainer" onClick={() => setMobileMenuOpen(false)} className="text-base text-slate-700 font-medium py-1">Notice Explainer</Link>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">👤 ACCOUNT</h3>
                    <div className="flex flex-col gap-2 pl-2 border-l-2 border-slate-100">
                        {isLoggedIn ? (
                            <>
                                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-base text-slate-700 font-medium py-1">Dashboard</Link>
                                <Link href="/dashboard/profile" onClick={() => setMobileMenuOpen(false)} className="text-base text-slate-700 font-medium py-1">Profile</Link>
                                <button onClick={handleLogout} className="text-base text-rose-600 font-bold py-1 text-left">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-base text-slate-700 font-medium py-1">Login</Link>
                                <Link href="/login?mode=signup" onClick={() => setMobileMenuOpen(false)} className="text-base text-primary font-bold py-1">Create Account</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
      )}
    </header>
  );
}
