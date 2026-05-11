import Link from "next/link";
import { Landmark, ShieldAlert } from "lucide-react";

const footerLinks = [
  { href: "/chat", label: "AI Tax Chat" },
  { href: "/direct-tax", label: "Direct Tax Guide" },
  { href: "/indirect-tax", label: "Indirect Tax (GST)" },
  { href: "/forms", label: "Filing Forms" },
  { href: "/sources", label: "Official Sources" }
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-5">
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg w-max">
              <Landmark className="h-5 w-5" />
              Tax AI Platform
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Simplifying Indian taxation with source-grounded AI intelligence. Built for clarity, compliance, and trust.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-2">
            <div className="rounded-2xl bg-amber-500/5 p-6 border border-amber-500/10 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-5 text-amber-500">
                <ShieldAlert className="w-32 h-32" />
              </div>
              <div className="flex items-center gap-2 mb-3 text-amber-700">
                <ShieldAlert className="h-5 w-5" />
                <h4 className="text-sm font-bold">Legal Disclaimer</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed relative z-10">
                This platform provides educational information and assistive guidance only. It is not a substitute for professional advice from a Chartered Accountant or Tax Advocate. Always verify information with official government portals (Income Tax Dept, GST Council, etc.) before making financial decisions.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t pt-8 text-center sm:flex sm:items-center sm:justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Tax AI Platform. Built for compliance and clarity.</p>
          <p className="mt-2 sm:mt-0">Powered by UI UX Pro Max</p>
        </div>
      </div>
    </footer>
  );
}
