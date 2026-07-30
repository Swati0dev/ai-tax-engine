"use client";

import { useState } from "react";
import { Plus, Search, Edit2, Trash2, Filter, Database, CheckCircle2, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { updateKnowledgeItemStatus, deleteKnowledgeItem } from "@/actions/admin";
import { ReviewStatus, TaxKnowledgeItem } from "@prisma/client";
import { useRouter } from "next/navigation";

interface KnowledgeCMSClientProps {
  initialItems: TaxKnowledgeItem[];
}

export function KnowledgeCMSClient({ initialItems }: KnowledgeCMSClientProps) {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<TaxKnowledgeItem[]>(initialItems);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const handleStatusUpdate = async (id: string, newStatus: ReviewStatus) => {
    setLoadingId(id);
    const result = await updateKnowledgeItemStatus(id, newStatus);
    if (result.success && result.data) {
      setItems(items.map(item => item.id === id ? { ...item, reviewStatus: result.data.reviewStatus, lastReviewed: result.data.lastReviewed } : item));
      router.refresh();
    } else {
      alert(result.error || "Failed to update status");
    }
    setLoadingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    setLoadingId(id);
    const result = await deleteKnowledgeItem(id);
    if (result.success) {
      setItems(items.filter(item => item.id !== id));
      router.refresh();
    } else {
      alert(result.error || "Failed to delete item");
    }
    setLoadingId(null);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "VERIFIED": return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none font-bold">Verified</Badge>;
      case "DRAFT": return <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-bold">Draft</Badge>;
      case "NEEDS_REVIEW": return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none font-bold">Needs Review</Badge>;
      case "OUTDATED": return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none font-bold">Outdated</Badge>;
      default: return null;
    }
  };

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.slug.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

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
                <th className="px-6 py-4">Title / Slug</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Updated</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 text-base">{item.title}</div>
                    <div className="text-xs text-slate-500 font-medium">{item.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-700 font-medium">{item.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(item.reviewStatus)}
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-medium">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {loadingId === item.id ? (
                        <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                      ) : (
                        <>
                          <button 
                            onClick={() => handleStatusUpdate(item.id, "NEEDS_REVIEW")}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Request Review">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(item.id, "VERIFIED")}
                            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Verify / Publish">
                            <CheckCircle2 className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No articles found matching &quot;{search}&quot;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
