"use client";

import { useState } from "react";
import { crawlCustomTopic } from "@/actions/admin";
import { Bot, Search, Loader2, CheckCircle2, ShieldAlert, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function RegulatoryIntelligenceOverview() {
  const [topic, setTopic] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "crawling" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleCrawl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setStatus("crawling");
    setMessage("Initializing AI Crawler...");

    // Fake progress updates for UX
    const t1 = setTimeout(() => setMessage("Fetching from official portals..."), 800);
    const t2 = setTimeout(() => setMessage("Parsing legal documents..."), 1600);

    const res = await crawlCustomTopic(topic, sourceUrl);
    
    clearTimeout(t1);
    clearTimeout(t2);

    if (res.success) {
      setStatus("success");
      setMessage(`Successfully generated DRAFT for "${topic}".`);
      setTopic("");
      setSourceUrl("");
    } else {
      setStatus("error");
      setMessage(res.error || "Failed to crawl topic.");
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-8">
      
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
          <Bot className="h-10 w-10 text-primary" />
          AI Web Crawler Control
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Command the Regulatory Intelligence Engine (RIE) to fetch, parse, and analyze new tax sections and generate knowledge drafts automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Main Crawler Panel */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center gap-2">
              <Search className="h-5 w-5 text-slate-400" />
              <h2 className="font-bold text-slate-700">Manual Crawl Request</h2>
            </div>
            
            <CardContent className="p-6">
              <form onSubmit={handleCrawl} className="space-y-5">
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Topic or Act Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    placeholder="e.g. GST on Software Services, Section 194Q TDS"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    disabled={status === "crawling"}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Target Official URL (Optional)</label>
                  <input 
                    type="url" 
                    value={sourceUrl}
                    onChange={e => setSourceUrl(e.target.value)}
                    placeholder="https://incometaxindia.gov.in/..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                    disabled={status === "crawling"}
                  />
                  <p className="text-xs text-slate-500">Provide a specific government URL for the engine to prioritize.</p>
                </div>

                <button 
                  type="submit" 
                  disabled={status === "crawling" || !topic.trim()}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "crawling" ? (
                    <><Loader2 className="h-5 w-5 animate-spin" /> {message}</>
                  ) : (
                    <><Bot className="h-5 w-5" /> Execute Web Crawl</>
                  )}
                </button>

              </form>

              {/* Status Messages */}
              {status === "success" && (
                <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-5 animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-emerald-900">Crawl Completed</h4>
                      <p className="text-sm text-emerald-700 mt-1">{message}</p>
                      <Link href="/admin/knowledge" className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:text-emerald-900 mt-3 underline underline-offset-4">
                        Review in Knowledge CMS <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-5 animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-start gap-3">
                    <ShieldAlert className="h-6 w-6 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-red-900">Crawl Failed</h4>
                      <p className="text-sm text-red-700 mt-1">{message}</p>
                    </div>
                  </div>
                </div>
              )}

            </CardContent>
          </Card>
        </div>

        {/* Sidebar Status Panels */}
        <div className="space-y-6">
          <Card className="rounded-2xl shadow-sm border-slate-200 bg-slate-50">
            <CardHeader className="pb-4">
              <CardTitle className="text-base text-slate-700">Crawler Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Engine Core</span>
                <span className="text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md">ONLINE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">NLP Parser</span>
                <span className="text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md">ACTIVE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Proxy Pool</span>
                <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded-md">LIMITED</span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm border-slate-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-base text-slate-700">Approved Sources</CardTitle>
              <CardDescription className="text-xs">The crawler only trusts official sites.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> incometaxindia.gov.in
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> cbic.gov.in
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> gst.gov.in
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> mca.gov.in
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
