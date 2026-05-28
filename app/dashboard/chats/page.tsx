"use client";

import { useState } from "react";
import { MessageSquare, Search, MoreVertical, Pin, Trash2, Edit2, PinOff, Calendar, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

type ChatPreview = {
  id: string;
  title: string;
  date: string;
  snippet: string;
  isPinned: boolean;
};

const DUMMY_CHATS: ChatPreview[] = [
  { id: "c1", title: "Which ITR should I file for crypto?", date: "Today", snippet: "Based on your capital gains from virtual digital assets, you should file ITR-2...", isPinned: true },
  { id: "c2", title: "How to save tax under 80C?", date: "Yesterday", snippet: "You can invest up to ₹1.5L in ELSS, PPF, or EPF to claim deductions under section 80C.", isPinned: true },
  { id: "c3", title: "GST applicability for freelancers", date: "May 20, 2026", snippet: "If your freelance income exceeds ₹20 Lakhs in a financial year, GST registration is mandatory.", isPinned: false },
  { id: "c4", title: "HRA exemption calculation", date: "May 15, 2026", snippet: "The HRA exemption is the minimum of: 1. Actual HRA received, 2. 50% of basic salary...", isPinned: false },
];

export default function ChatsHistoryPage() {
  const [search, setSearch] = useState("");
  const [chats, setChats] = useState<ChatPreview[]>(DUMMY_CHATS);

  const togglePin = (id: string) => {
    setChats(prev => prev.map(chat => chat.id === id ? { ...chat, isPinned: !chat.isPinned } : chat));
  };

  const deleteChat = (id: string) => {
    setChats(prev => prev.filter(chat => chat.id !== id));
  };

  const filteredChats = chats
    .filter(chat => chat.title.toLowerCase().includes(search.toLowerCase()) || chat.snippet.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1));

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">AI Chat History</h1>
          <p className="text-sm text-muted-foreground font-medium mt-1">
            Review your past tax consultations, pin important threads, and continue where you left off.
          </p>
        </div>
        <Link href="/ai-tax-expert" className="shrink-0">
          <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md">
            <MessageSquare className="h-4 w-4" />
            New Chat
          </button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search by topic, question, or keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
        />
      </div>

      {/* Chat List */}
      <div className="space-y-4">
        {filteredChats.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-slate-200 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700">No chats found</h3>
            <p className="text-slate-500 text-sm mt-1">Try adjusting your search or start a new conversation.</p>
          </div>
        ) : (
          filteredChats.map((chat) => (
            <Card key={chat.id} className={cn(
              "rounded-2xl border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden",
              chat.isPinned ? "bg-amber-50/30 border-amber-100/50" : "bg-white"
            )}>
              <div className="flex items-start md:items-center justify-between p-5 gap-4">
                <Link href={`/ai-tax-expert?chatId=${chat.id}`} className="flex-1 min-w-0 flex items-start gap-4 cursor-pointer">
                  <div className={cn(
                    "h-10 w-10 shrink-0 rounded-full flex items-center justify-center transition-colors",
                    chat.isPinned ? "bg-amber-100 text-amber-600" : "bg-primary/10 text-primary"
                  )}>
                    {chat.isPinned ? <Pin className="h-5 w-5 fill-current" /> : <MessageSquare className="h-5 w-5" />}
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 truncate pr-4 text-base">{chat.title}</h3>
                    <p className="text-sm text-slate-500 line-clamp-1">{chat.snippet}</p>
                    <div className="flex items-center gap-1.5 mt-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <Calendar className="h-3 w-3" />
                      {chat.date}
                    </div>
                  </div>
                </Link>

                <div className="shrink-0 flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => togglePin(chat.id)}
                    className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
                    title={chat.isPinned ? "Unpin chat" : "Pin chat"}
                  >
                    {chat.isPinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
                  </button>
                  <button 
                    onClick={() => {}} // Rename logic here
                    className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                    title="Rename chat"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => deleteChat(chat.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete chat"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  
                  <Link href={`/ai-tax-expert?chatId=${chat.id}`}>
                    <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors ml-2">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </Link>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
