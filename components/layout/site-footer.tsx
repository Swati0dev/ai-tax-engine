"use client";

import Link from "next/link";
import { Landmark, Github, Twitter, Linkedin, Mail, ShieldAlert } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t bg-primary text-primary-foreground relative overflow-hidden">
      {/* Soft animated gradient overlay */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Column 1: Info and Newsletter */}
          <div className="space-y-6 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-heading font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg w-max">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary shadow-lg shadow-secondary/15">
                <Landmark className="h-5 w-5 text-secondary-foreground" aria-hidden="true" />
              </span>
              Tax AI Platform
            </Link>
            <p className="text-sm text-blue-100/70 leading-relaxed max-w-sm">
              An intelligent, premium AI-powered Tax Operating System. Simplifying complex Indian taxation, ITR filing, GST compliance, and financial decisions using source-grounded intelligence.
            </p>
            
            {/* Newsletter form */}
            <div className="space-y-3 max-w-sm">
              <h4 className="text-sm font-semibold text-white">Subscribe to Weekly Tax Alerts</h4>
              <form 
                onSubmit={(e) => e.preventDefault()} 
                className="flex gap-2"
              >
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full rounded-xl bg-white/10 px-4 py-2.5 text-sm text-white placeholder-blue-100/50 border border-white/15 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  required
                />
                <button 
                  type="submit" 
                  className="rounded-xl bg-secondary px-4 py-2.5 text-sm font-bold text-secondary-foreground shadow-lg shadow-secondary/10 hover:bg-secondary/90 hover:scale-105 active:scale-95 transition-all"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
          
          {/* Column 2: Direct Tax & GST */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">Tax Guides</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/direct-tax" className="text-sm text-blue-100/70 hover:text-secondary transition-colors">
                  Income Tax Rules
                </Link>
              </li>
              <li>
                <Link href="/direct-tax" className="text-sm text-blue-100/70 hover:text-secondary transition-colors">
                  ITR Types & Deadlines
                </Link>
              </li>
              <li>
                <Link href="/direct-tax" className="text-sm text-blue-100/70 hover:text-secondary transition-colors">
                  Tax Deductions & Exemption
                </Link>
              </li>
              <li>
                <Link href="/indirect-tax" className="text-sm text-blue-100/70 hover:text-secondary transition-colors">
                  GST Basics
                </Link>
              </li>
              <li>
                <Link href="/indirect-tax" className="text-sm text-blue-100/70 hover:text-secondary transition-colors">
                  Input Tax Credit
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Calculators */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">Calculators</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/calculators/income-tax-calculator" className="text-sm text-blue-100/70 hover:text-secondary transition-colors">
                  Regime Comparator
                </Link>
              </li>
              <li>
                <Link href="/calculators/hra-calculator" className="text-sm text-blue-100/70 hover:text-secondary transition-colors">
                  HRA Exemption
                </Link>
              </li>
              <li>
                <Link href="/calculators/gst-calculator" className="text-sm text-blue-100/70 hover:text-secondary transition-colors">
                  GST Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators/salary-breakdown" className="text-sm text-blue-100/70 hover:text-secondary transition-colors">
                  Salary Breakdown
                </Link>
              </li>
              <li>
                <Link href="/calculators/80c-planner" className="text-sm text-blue-100/70 hover:text-secondary transition-colors">
                  80C Investment Planner
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Platform */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">Compliance</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/compliance" className="text-sm text-blue-100/70 hover:text-secondary transition-colors">
                  Due Dates Calendar
                </Link>
              </li>
              <li>
                <Link href="/knowledge-hub" className="text-sm text-blue-100/70 hover:text-secondary transition-colors">
                  Knowledge Hub
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-blue-100/70 hover:text-secondary transition-colors">
                  SaaS Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-blue-100/70 hover:text-secondary transition-colors">
                  User Dashboard
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-blue-100/70 hover:text-secondary transition-colors">
                  Login / Signup
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer section inside footer */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="rounded-2xl bg-white/5 p-6 border border-white/10 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-5 text-white">
              <ShieldAlert className="w-32 h-32" />
            </div>
            <div className="flex items-center gap-2 mb-3 text-secondary">
              <ShieldAlert className="h-5 w-5" />
              <h4 className="text-sm font-bold">Legal & Accuracy Disclaimer</h4>
            </div>
            <p className="text-xs text-blue-100/70 leading-relaxed relative z-10">
              Tax AI Platform provides educational information, AI-powered compliance assistance, and calculator estimations for Indian taxpayers. It is not an official government entity and does not replace professional advice from Chartered Accountants (CAs) or legal experts. Always cross-verify calculations and laws with the Income Tax Department of India and the Goods and Services Tax Network (GSTN) before filing.
            </p>
          </div>
        </div>

        {/* Footer bottom details & Social links */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-blue-100/60 gap-4">
          <p>© {new Date().getFullYear()} Tax AI Platform Inc. Securely hosted in India. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-secondary transition-colors p-1" aria-label="Twitter">
              <Twitter className="h-4.5 w-4.5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-secondary transition-colors p-1" aria-label="LinkedIn">
              <Linkedin className="h-4.5 w-4.5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-secondary transition-colors p-1" aria-label="GitHub">
              <Github className="h-4.5 w-4.5" />
            </a>
            <a href="mailto:support@taxai.com" className="hover:text-secondary transition-colors p-1" aria-label="Email support">
              <Mail className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
