"use client";
import React, { useState } from "react";
import { Send, Bot, User, ShieldCheck, Scale, Lightbulb } from "lucide-react";

export interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content: string;
  confidence?: "High" | "Medium" | "Low";
  sources?: { title: string; url: string }[];
  suggestedFollowUps?: string[];
}

interface AIConversationEngineProps {
  mode?: "floating" | "workspace";
  initialMessage?: string;
}

export function AIConversationEngine({ mode = "workspace", initialMessage }: AIConversationEngineProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "ai",
      content: initialMessage || "Hello. I am your Regulatory Intelligence Assistant. How can I help you analyze tax laws today?",
      suggestedFollowUps: [
        "What changed in Section 194R?",
        "Explain GST on EV charging",
        "Summarize recent CBDT circulars"
      ]
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), role: "user", content: text }]);
    setInput("");
    
    // Mock response after 1s
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "Based on my analysis, this falls under the recent amendment to Section 43B(h). Payments to MSMEs must be made within 45 days (if written agreement exists) or 15 days.",
        confidence: "High",
        sources: [
          { title: "Income Tax Act, Section 43B", url: "#" },
          { title: "Finance Act 2023", url: "#" }
        ],
        suggestedFollowUps: [
          "What are the penalties for delay?",
          "Does this apply to traders?"
        ]
      }]);
    }, 1000);
  };

  return (
    <div className={`flex flex-col bg-slate-50 overflow-hidden ${mode === 'floating' ? 'h-[500px] w-[350px] rounded-2xl shadow-xl border border-slate-200' : 'h-full w-full rounded-2xl border border-slate-200'}`}>
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">Tax AI Assistant</h3>
            <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 uppercase tracking-wider">
              <ShieldCheck className="h-3 w-3" /> Encrypted Session
            </p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
            
            {msg.role === 'ai' && (
              <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-1">
                <Bot className="h-3 w-3" />
              </div>
            )}
            
            <div className="flex flex-col gap-2">
              <div className={`p-4 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-2xl rounded-tr-sm' 
                  : 'bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-tl-sm shadow-sm'
              }`}>
                {msg.content}
              </div>
              
              {/* AI Metadata (Confidence, Sources) */}
              {msg.role === 'ai' && msg.confidence && (
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="bg-purple-100 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> {msg.confidence} Confidence
                  </span>
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Scale className="h-3 w-3 text-slate-400" />
                      {msg.sources.map((s, i) => (
                        <a key={i} href={s.url} className="text-[10px] font-bold text-slate-500 hover:text-primary transition-colors hover:underline">
                          {s.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Follow ups */}
              {msg.role === 'ai' && msg.suggestedFollowUps && (
                <div className="flex flex-col gap-2 mt-2">
                  {msg.suggestedFollowUps.map((followUp, i) => (
                    <button 
                      key={i}
                      onClick={() => handleSend(followUp)}
                      className="text-left bg-white border border-slate-200 text-xs text-slate-600 rounded-xl px-3 py-2 hover:border-primary hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      <Lightbulb className="h-3 w-3 text-amber-500 group-hover:text-primary transition-colors" />
                      {followUp}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-200 p-3 shrink-0">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all"
        >
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about regulations..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 placeholder:text-slate-400"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center disabled:opacity-50 disabled:bg-slate-300 transition-colors"
          >
            <Send className="h-4 w-4 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
