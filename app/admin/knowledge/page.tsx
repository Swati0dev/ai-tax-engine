"use client";

import { useState } from "react";
import { Plus, Search, Edit2, Trash2, Filter, Database, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type KnowledgeItem = {
  id: string;
  title: string;
  category: string;
  status: "PUBLISHED" | "DRAFT" | "NEEDS_REVIEW";
  lastUpdated: string;
};

const DUMMY_KNOWLEDGE: KnowledgeItem[] = [
  { id: "1", title: "Section 80C Deductions", category: "Direct Tax", status: "PUBLISHED", lastUpdated: "May 25, 2026" },
  { id: "2", title: "New Tax Regime Slabs", category: "Direct Tax", status: "PUBLISHED", lastUpdated: "May 20, 2026" },
  { id: "3", title: "GST Rate Changes for Electronics", category: "Indirect Tax", status: "NEEDS_REVIEW", lastUpdated: "May 26, 2026" },
  { id: "4", title: "Presumptive Taxation Sec 44AD", category: "Direct Tax", status: "DRAFT", lastUpdated: "May 22, 2026" },
];

export default function KnowledgeCMSPage() {
  const [search, setSearch] = useState("");

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "PUBLISHED": return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none font-bold">Published</Badge>;
      case "DRAFT": return <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-bold">Draft</Badge>;
      case "NEEDS_REVIEW": return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none font-bold">Needs Review</Badge>;
      default: return null;
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
            <Database className="h-8 w-8 text-indigo-600" />
            Tax Knowledge Base
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Manage the content, rules, and AI knowledge references for the platform.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm">
          <Plus className="h-4 w-4" />
          Add New Entry
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search tax sections, keywords, or acts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition-colors">
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Table / List */}
      <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4">Title / Section</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Updated</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {DUMMY_KNOWLEDGE.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 text-base">{item.title}</div>
                    <div className="text-xs text-slate-500 font-medium">ID: {item.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-700 font-medium">{item.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-medium">
                    {item.lastUpdated}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Publish">
                        <CheckCircle2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
