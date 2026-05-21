"use client";

import { useState } from "react";
import { Send, Bot, User, Sparkles, Landmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { processAIChat } from "@/actions/ai-chat";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  sources?: { title: string; url: string }[];
}

const suggestions = [
  { label: "80C deductions kya hain? 🪙", query: "Section 80C deductions kya hain aur kitni limit hai?" },
  { label: "ITR-1 filing steps? 📋", query: "ITR-1 file karne ke steps kya hain aur kisey file karna hota hai?" },
  { label: "GST registration limits? 🏢", query: "What are the GST registration thresholds for business?" },
  { label: "ITR-6 corporate filing details? 💼", query: "ITR-6 corporate guide batao, companies ke liye kya rules hain?" }
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! Main aapka AI Tax Assistant hoon. Aap mujhse Income Tax sections, ITR filing, GST rules ya koi bhi query English, Hindi ya Hinglish (WhatsApp script) mein pooch sakte hain. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const queryText = input;
    setInput("");
    await submitQuery(queryText);
  };

  const handleSuggestClick = async (queryText: string) => {
    if (isLoading) return;
    await submitQuery(queryText);
  };

  const submitQuery = async (queryText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: queryText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const result = await processAIChat(queryText);
      if (result.success && result.data) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: result.data.content,
          timestamp: new Date(),
          sources: result.data.sources,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(result.error || "Failed to get response");
      }
    } catch (error: unknown) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I'm sorry, I encountered an issue: ${error instanceof Error ? error.message : "Unknown error"}. Please try again.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[70vh] w-full max-w-4xl mx-auto bg-background/50 backdrop-blur-xl rounded-[2.5rem] border border-primary/10 shadow-2xl overflow-hidden">
      {/* Chat Header */}
      <div className="p-6 border-b bg-primary/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight">Tax AI Assistant</h2>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active • Multilingual Gemini</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1">
             <Sparkles className="h-3 w-3" />
             Grounded Results
           </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex w-full gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300",
              message.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div className={cn(
              "h-10 w-10 rounded-2xl shrink-0 flex items-center justify-center shadow-sm",
              message.role === "user" ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
            )}>
              {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
            </div>
            <div className={cn(
              "max-w-[80%] p-5 rounded-[1.5rem] text-sm font-medium leading-relaxed shadow-sm",
              message.role === "user" 
                ? "bg-accent text-accent-foreground rounded-tr-none" 
                : "bg-background border border-primary/10 rounded-tl-none"
            )}>
              <div className="whitespace-pre-wrap">{message.content}</div>
              
              {message.sources && message.sources.length > 0 && (
                <div className="mt-4 pt-4 border-t border-dashed space-y-2">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Sources & Citations</span>
                  <div className="flex flex-wrap gap-2">
                    {message.sources.map((src, idx) => (
                      <a 
                        key={idx} 
                        href={src.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary hover:bg-primary/10 transition-colors"
                      >
                        <Landmark className="h-3 w-3" />
                        {src.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary animate-bounce" />
            </div>
            <div className="bg-primary/5 p-4 rounded-2xl rounded-tl-none border border-primary/10">
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input & Suggestions Area */}
      <div className="p-6 bg-background/80 border-t space-y-4">
        {/* Suggestion Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isLoading}
              onClick={() => handleSuggestClick(s.query)}
              className="px-3 py-1.5 rounded-full bg-primary/5 hover:bg-primary/10 border border-primary/10 text-xs font-bold text-primary transition-all whitespace-nowrap shrink-0 disabled:opacity-50 disabled:pointer-events-none"
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="relative flex items-center gap-2 bg-muted/30 p-2 rounded-2xl border focus-within:border-primary/50 transition-colors shadow-inner">
          <input
            type="text"
            placeholder="Poochhein - 80C rules, GST limits, ya ITR details..."
            className="flex-1 bg-transparent px-4 py-2 text-sm font-medium focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isLoading}
          />
          <Button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="rounded-xl h-10 w-10 p-0 shadow-lg shadow-primary/20"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-[10px] text-center text-muted-foreground font-bold uppercase tracking-widest opacity-50">
          Source-grounded AI • Speaks English, Hindi & Hinglish
        </p>
      </div>
    </div>
  );
}
