import type { Metadata } from "next";
import { Source_Sans_3, Merriweather } from "next/font/google";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ReadingProgressBar } from "@/components/ui/ReadingProgressBar";
import { SafetyDisclaimer } from "@/components/layout/SafetyDisclaimer";

import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

import { constructMetadata } from "@/lib/seo";
import { generateOrganizationJsonLd, generateWebsiteJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = constructMetadata();

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${sourceSans.variable} ${merriweather.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebsiteJsonLd()) }}
        />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground">
          Skip to main content
        </a>
        <ReadingProgressBar />
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
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
