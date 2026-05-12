import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ReadingProgressBar } from "@/components/ui/ReadingProgressBar";
import { SafetyDisclaimer } from "@/components/layout/SafetyDisclaimer";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Tax AI Platform",
  description: "A source-grounded tax assistance platform for clear Indian tax guidance."
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <ReadingProgressBar />
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
              <Breadcrumbs />
            </div>
            {children}
          </main>
          <SafetyDisclaimer />
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
