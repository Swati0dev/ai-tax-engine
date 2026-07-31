"use client";

import { useState } from "react";
import { Plus, Search, Edit2, Trash2, Filter, Database, CheckCircle2, Loader2, Eye, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { updateKnowledgeItemStatus, deleteKnowledgeItem, createKnowledgeItem } from "@/actions/admin";
import { ReviewStatus, TaxCategory, TaxKnowledgeItem } from "@prisma/client";
import { useRouter } from "next/navigation";

interface KnowledgeCMSClientProps {
  initialItems: TaxKnowledgeItem[];
}

export function KnowledgeCMSClient({ initialItems }: KnowledgeCMSClientProps) {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<TaxKnowledgeItem[]>(initialItems);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  // Modals state
  const [viewingItem, setViewingItem] = useState<TaxKnowledgeItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "GENERAL" as TaxCategory,
    summary: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await createKnowledgeItem({
      title: formData.title,
      slug: formData.slug,
      category: formData.category,
      summary: formData.summary,
      reviewStatus: "DRAFT"
    });

    if (result.success && result.data) {
      setItems([result.data as TaxKnowledgeItem, ...items]);
      setIsCreating(false);
      setFormData({ title: "", slug: "", category: "GENERAL", summary: "" });
      router.refresh();
    } else {
      alert(result.error || "Failed to create item");
    }
    setIsSubmitting(false);
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
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative">
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
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm">
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
                            onClick={() => setViewingItem(item)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Article">
                            <Eye className="h-4 w-4" />
                          </button>
                          {item.reviewStatus !== "VERIFIED" && (
                            <button 
                              onClick={() => handleStatusUpdate(item.id, "VERIFIED")}
                              className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Verify / Publish">
                              <CheckCircle2 className="h-4 w-4" />
                            </button>
                          )}
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

      {/* VIEW MODAL */}
      {viewingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900 pr-4">{viewingItem.title}</h2>
              <button onClick={() => setViewingItem(null)} className="p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <div className="flex gap-2 mb-4">
                {getStatusBadge(viewingItem.reviewStatus)}
                <Badge variant="outline">{viewingItem.category}</Badge>
              </div>
              
              <div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Summary</h3>
                <p className="text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {viewingItem.summary}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Full Explanation</h3>
                <div className="prose prose-slate max-w-none text-sm whitespace-pre-wrap">
                  {viewingItem.explanation}
                </div>
              </div>

              {viewingItem.applicability && viewingItem.applicability.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Applicability</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-slate-700">
                    {viewingItem.applicability.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
              <button onClick={() => setViewingItem(null)} className="px-5 py-2 font-bold text-slate-600 hover:text-slate-900 transition-colors">Close</button>
              {viewingItem.reviewStatus !== 'VERIFIED' && (
                <button 
                  onClick={() => { handleStatusUpdate(viewingItem.id, "VERIFIED"); setViewingItem(null); }}
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors shadow-sm">
                  Approve & Publish
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CREATE MODAL */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={handleCreate} className="bg-white rounded-2xl shadow-xl w-full max-w-lg flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900">Add New Entry</h2>
              <button type="button" onClick={() => setIsCreating(false)} className="p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700">Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" placeholder="e.g. New Section 80C Limits" />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700">URL Slug</label>
                <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" placeholder="e.g. new-section-80c-limits" />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700">Category</label>
                <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as TaxCategory})} className="w-full px-4 py-2 border border-slate-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-white">
                  <option value="GENERAL">General / Tax Basics</option>
                  <option value="INCOME_TAX">Income Tax</option>
                  <option value="BUSINESS_TAX">Business Tax</option>
                  <option value="GST">GST</option>
                  <option value="TDS">TDS</option>
                  <option value="CORPORATE_TAX">Corporate Tax</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700">Summary / Explanation</label>
                <textarea required rows={4} value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none" placeholder="Provide a detailed explanation of the tax rule..."></textarea>
              </div>

            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
              <button type="button" onClick={() => setIsCreating(false)} className="px-5 py-2 font-bold text-slate-600 hover:text-slate-900 transition-colors">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-sm flex items-center gap-2">
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Save as Draft
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
