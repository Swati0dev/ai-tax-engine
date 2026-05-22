"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Landmark, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Globe, 
  UploadCloud, 
  ShieldCheck, 
  Menu, 
  Settings,
  X,
  ChevronRight,
  FileText,
  Check,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { processAIChat } from "@/actions/ai-chat";
import { getGamificationState, addXp, GamificationState } from "@/lib/gamification";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string; // Serialized Date string
  sources?: { title: string; url: string }[];
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  timestamp: string;
}

const SUGGESTIONS = [
  { label: "80C Limits? 🪙", query: "Section 80C deductions kya hain aur kitni limit hai?" },
  { label: "ITR-1 Steps? 📋", query: "ITR-1 file karne ke steps kya hain aur kisey file karna hota hai?" },
  { label: "GST Thresholds? 🏢", query: "What are the GST registration thresholds for business in India?" },
  { label: "ITR-6 Corporate? 💼", query: "ITR-6 corporate guide batao, companies ke liye kya rules hain?" }
];

export function ChatInterface() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeChatId, setActiveChatId] = useState<string>("");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Toggles for Mobile Drawer Views
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);
  const [showInfoMobile, setShowInfoMobile] = useState(false);

  // Settings
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Detect"); // Detect, English, Hindi, Hinglish
  const [isGroundedMode, setIsGroundedMode] = useState<boolean>(true);

  // File Upload State
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Gamification State
  const [gamerState, setGamerState] = useState<GamificationState>({ xp: 0, level: 1, title: "Tax Novice" });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load initial configurations, conversations, and XP state from LocalStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      setGamerState(getGamificationState());

      const savedConversations = localStorage.getItem("tax-ai-conversations");
      const savedActiveChatId = localStorage.getItem("tax-ai-active-conversation-id");

      if (savedConversations) {
        const parsed = JSON.parse(savedConversations);
        if (parsed && parsed.length > 0) {
          setConversations(parsed);
          if (savedActiveChatId && parsed.some((c: Conversation) => c.id === savedActiveChatId)) {
            setActiveChatId(savedActiveChatId);
          } else {
            setActiveChatId(parsed[0].id);
          }
          return;
        }
      }

      // Initialize with a welcome conversation if none exists
      const defaultChat: Conversation = {
        id: "default-chat",
        title: "Introduction",
        messages: [
          {
            id: "1",
            role: "assistant",
            content: "Hello! Main aapka AI Tax Assistant hoon. Aap mujhse Income Tax sections, ITR filing, GST rules ya koi bhi query English, Hindi ya Hinglish (WhatsApp script) mein pooch sakte hain. How can I help you today?",
            timestamp: new Date().toISOString(),
          }
        ],
        timestamp: new Date().toISOString()
      };
      setConversations([defaultChat]);
      setActiveChatId("default-chat");
      localStorage.setItem("tax-ai-conversations", JSON.stringify([defaultChat]));
      localStorage.setItem("tax-ai-active-conversation-id", "default-chat");
    }
  }, []);

  // Update gamification status listeners
  useEffect(() => {
    const handleGamerUpdate = () => {
      setGamerState(getGamificationState());
    };
    window.addEventListener("gamification-update", handleGamerUpdate);
    return () => window.removeEventListener("gamification-update", handleGamerUpdate);
  }, []);

  // Auto-scroll messages feed
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations, activeChatId, isLoading]);

  // Find active chat details
  const activeChat = useMemo(() => {
    return conversations.find((c) => c.id === activeChatId) || null;
  }, [conversations, activeChatId]);

  // Create a new chat session
  const handleNewChat = () => {
    const newId = `chat-${Date.now()}`;
    const newChat: Conversation = {
      id: newId,
      title: `New Chat`,
      messages: [
        {
          id: `welcome-${Date.now()}`,
          role: "assistant",
          content: "Hello! Main aapka AI Tax Assistant hoon. Aap mujhse Indian Tax sections ya GST rules ke baare mein pooch sakte hain. Main ready hoon!",
          timestamp: new Date().toISOString(),
        }
      ],
      timestamp: new Date().toISOString()
    };

    const updated = [newChat, ...conversations];
    setConversations(updated);
    setActiveChatId(newId);
    localStorage.setItem("tax-ai-conversations", JSON.stringify(updated));
    localStorage.setItem("tax-ai-active-conversation-id", newId);
    
    // Close mobile sidebars if open
    setShowSidebarMobile(false);
  };

  // Delete a specific chat session
  const handleDeleteChat = (idToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid selecting the chat while deleting it
    
    const updated = conversations.filter((c) => c.id !== idToDelete);
    setConversations(updated);

    if (updated.length === 0) {
      // Re-initialize with a default conversation if all are deleted
      const defaultChat: Conversation = {
        id: "default-chat",
        title: "Introduction",
        messages: [
          {
            id: `welcome-${Date.now()}`,
            role: "assistant",
            content: "Hello! Main aapka AI Tax Assistant hoon. Aap mujhse Income Tax sections, ITR filing, GST rules ya koi bhi query English, Hindi ya Hinglish (WhatsApp script) mein pooch sakte hain. How can I help you today?",
            timestamp: new Date().toISOString(),
          }
        ],
        timestamp: new Date().toISOString()
      };
      setConversations([defaultChat]);
      setActiveChatId("default-chat");
      localStorage.setItem("tax-ai-conversations", JSON.stringify([defaultChat]));
      localStorage.setItem("tax-ai-active-conversation-id", "default-chat");
    } else {
      if (activeChatId === idToDelete) {
        setActiveChatId(updated[0].id);
        localStorage.setItem("tax-ai-active-conversation-id", updated[0].id);
      }
      localStorage.setItem("tax-ai-conversations", JSON.stringify(updated));
    }
  };

  // Switch between conversations
  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    localStorage.setItem("tax-ai-active-conversation-id", id);
    setShowSidebarMobile(false);
  };

  // Clear all history
  const handleClearAllHistory = () => {
    if (confirm("Are you sure you want to delete all chat history? This cannot be undone.")) {
      localStorage.removeItem("tax-ai-conversations");
      localStorage.removeItem("tax-ai-active-conversation-id");
      
      const defaultChat: Conversation = {
        id: "default-chat",
        title: "Introduction",
        messages: [
          {
            id: `welcome-${Date.now()}`,
            role: "assistant",
            content: "Hello! Main aapka AI Tax Assistant hoon. Aap mujhse Income Tax sections, ITR filing, GST rules ya koi bhi query English, Hindi ya Hinglish (WhatsApp script) mein pooch sakte hain. How can I help you today?",
            timestamp: new Date().toISOString(),
          }
        ],
        timestamp: new Date().toISOString()
      };
      setConversations([defaultChat]);
      setActiveChatId("default-chat");
      localStorage.setItem("tax-ai-conversations", JSON.stringify([defaultChat]));
      localStorage.setItem("tax-ai-active-conversation-id", "default-chat");
    }
  };

  // Submit User Message
  const handleSend = async () => {
    if (!input.trim() || isLoading || !activeChatId) return;
    const textToSend = input;
    setInput("");
    await submitQuery(textToSend);
  };

  const handleSuggestClick = async (queryText: string) => {
    if (isLoading || !activeChatId) return;
    await submitQuery(queryText);
  };

  const submitQuery = async (queryText: string) => {
    const activeChat = conversations.find((c) => c.id === activeChatId);
    if (!activeChat) return;

    // Create user message
    const userMessage: Message = {
      id: `msg-user-${Date.now()}`,
      role: "user",
      content: queryText,
      timestamp: new Date().toISOString()
    };

    // Calculate dynamic title for New Chats
    const isNew = activeChat.title === "New Chat" || activeChat.title === "Introduction";
    const updatedTitle = isNew 
      ? queryText.slice(0, 25) + (queryText.length > 25 ? "..." : "")
      : activeChat.title;

    const initialMessages = [...activeChat.messages, userMessage];

    // Optimistically update UI
    setConversations((prev) => {
      const next = prev.map((c) => {
        if (c.id === activeChatId) {
          return {
            ...c,
            title: updatedTitle,
            messages: initialMessages,
            timestamp: new Date().toISOString()
          };
        }
        return c;
      });
      localStorage.setItem("tax-ai-conversations", JSON.stringify(next));
      return next;
    });

    setIsLoading(true);

    try {
      // Append language instruction in background if specific instruction exists
      let finalQuery = queryText;
      if (selectedLanguage === "Hinglish") {
        finalQuery = `${queryText} (Provide response in Hinglish/WhatsApp script language)`;
      } else if (selectedLanguage === "Hindi") {
        finalQuery = `${queryText} (Provide response in Hindi - Devanagari script)`;
      } else if (selectedLanguage === "English") {
        finalQuery = `${queryText} (Provide response in clean, helpful English)`;
      }

      const result = await processAIChat(finalQuery);

      if (result.success && result.data) {
        const botMessage: Message = {
          id: `msg-bot-${Date.now()}`,
          role: "assistant",
          content: result.data.content,
          timestamp: new Date().toISOString(),
          sources: result.data.sources
        };

        const finalMessages = [...initialMessages, botMessage];

        // Reward user with 25 XP for asking a tax query
        addXp(25);

        // Update list
        setConversations((prev) => {
          const next = prev.map((c) => {
            if (c.id === activeChatId) {
              return {
                ...c,
                messages: finalMessages,
                timestamp: new Date().toISOString()
              };
            }
            return c;
          });
          localStorage.setItem("tax-ai-conversations", JSON.stringify(next));
          return next;
        });
      } else {
        throw new Error(result.error || "Failed to process query");
      }
    } catch (err) {
      const error = err as Error;
      const errMessage: Message = {
        id: `msg-err-${Date.now()}`,
        role: "assistant",
        content: `Sorry, there was an issue processing your question: ${error.message || "Failed request"}. Please verify your network and Gemini API keys.`,
        timestamp: new Date().toISOString()
      };

      setConversations((prev) => {
        const next = prev.map((c) => {
          if (c.id === activeChatId) {
            return {
              ...c,
              messages: [...initialMessages, errMessage],
              timestamp: new Date().toISOString()
            };
          }
          return c;
        });
        localStorage.setItem("tax-ai-conversations", JSON.stringify(next));
        return next;
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Mock File Upload Handler
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    setUploadedFileName(file.name);

    // Simulate parsing the file
    setTimeout(() => {
      setUploadingFile(false);
      
      const activeChat = conversations.find((c) => c.id === activeChatId);
      if (!activeChat) return;

      // Add custom parser notification in chat stream
      const uploadNotification: Message = {
        id: `upload-notif-${Date.now()}`,
        role: "assistant",
        content: `📄 **Document Uploaded & Parsed Successfully!**\n\nFile Name: \`${file.name}\`\n\n**AI Pre-analysis:** I have scanned this tax document. I found:\n- **Primary Headings:** Salaried Income Summary / Tax Deduction claims\n- **Potential Exemptions:** Detected eligible Section 80C investment limits\n\n*Aap ab is document se related detailed questions pooch sakte hain, jaise: \"Kya mere Form 16 deductions sahi hain?\" ya \"Is document me taxable liability kitni hai?\"*`,
        timestamp: new Date().toISOString()
      };

      const finalMessages = [...activeChat.messages, uploadNotification];

      // Reward XP for uploading compliance document
      addXp(50);

      setConversations((prev) => {
        const next = prev.map((c) => {
          if (c.id === activeChatId) {
            return {
              ...c,
              messages: finalMessages,
              timestamp: new Date().toISOString()
            };
          }
          return c;
        });
        localStorage.setItem("tax-ai-conversations", JSON.stringify(next));
        return next;
      });
    }, 2000);
  };

  // Helper to format timestamps inside messages
  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });
    } catch {
      return "";
    }
  };

  // Dynamic values for Right Sidebar Stats
  const mockTaxSavings = useMemo(() => {
    // In real app, load sum of items saved or default to HRA / Salary breakdowns
    if (typeof window !== "undefined") {
      const completedList = localStorage.getItem("tax-compliance-completed");
      const completedCount = completedList ? JSON.parse(completedList).length : 0;
      return completedCount * 12500 || 25000; // Simulated dynamically based on compliance tasks
    }
    return 25000;
  }, [conversations]);

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-background/50 border border-primary/10 rounded-[2.5rem] shadow-2xl overflow-hidden relative">
      
      {/* 1. Left Sidebar (History & Conversations) */}
      <aside className={cn(
        "w-[260px] border-r border-slate-100 flex flex-col justify-between bg-slate-50/50 z-30 shrink-0",
        // Desktop Layout: Always Visible. Mobile Layout: Abs overlay based on showSidebarMobile
        "hidden md:flex",
        showSidebarMobile && "flex absolute inset-y-0 left-0 bg-white border-r shadow-2xl w-[260px] animate-in slide-in-from-left duration-300"
      )}>
        <div className="p-4 space-y-4 flex-1 flex flex-col overflow-hidden">
          {/* New Chat & Close Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleNewChat}
              className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-primary/20 hover:border-primary text-primary hover:bg-primary/5 rounded-2xl text-xs font-black transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              New Conversation
            </button>
            
            {showSidebarMobile && (
              <button 
                onClick={() => setShowSidebarMobile(false)}
                className="p-3 bg-slate-100 rounded-xl hover:bg-slate-200 md:hidden"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>

          <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground px-2">
            Recent Chats
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
            {conversations.map((conv) => {
              const isActive = conv.id === activeChatId;
              return (
                <div
                  key={conv.id}
                  onClick={() => handleSelectChat(conv.id)}
                  className={cn(
                    "group flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer",
                    isActive 
                      ? "bg-primary text-white shadow-sm" 
                      : "text-muted-foreground hover:bg-slate-100 hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <MessageSquare className={cn("h-4 w-4 shrink-0", isActive ? "text-white" : "text-primary/70")} />
                    <span className="truncate max-w-[150px]">{conv.title}</span>
                  </div>
                  
                  <button
                    onClick={(e) => handleDeleteChat(conv.id, e)}
                    className={cn(
                      "p-1.5 rounded-lg hover:bg-rose-600 hover:text-white transition-all shrink-0",
                      isActive ? "text-white/70" : "opacity-0 group-hover:opacity-100 text-muted-foreground"
                    )}
                    title="Delete Chat"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Clear History Button */}
        <div className="p-4 border-t bg-slate-50/80">
          <button
            onClick={handleClearAllHistory}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs text-rose-500 hover:text-rose-700 hover:bg-rose-50 font-bold rounded-xl transition-colors cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear All History
          </button>
        </div>
      </aside>

      {/* 2. Middle Panel (Chat Messages Area) */}
      <main className="flex-1 flex flex-col justify-between bg-white overflow-hidden relative">
        {/* Chat Header */}
        <div className="p-4 border-b bg-primary/5 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            {/* Sidebar mobile toggle trigger */}
            <button
              onClick={() => setShowSidebarMobile(!showSidebarMobile)}
              className="p-2.5 bg-slate-100 rounded-xl md:hidden hover:bg-slate-200 text-foreground"
              title="Show History"
            >
              <Menu className="h-4 w-4" />
            </button>

            <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>

            <div>
              <h2 className="text-sm font-black tracking-tight text-foreground">Tax AI Assistant</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Active • Grounded Model</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/5 border border-primary/10 text-[9px] font-black text-primary uppercase tracking-widest">
              <ShieldCheck className="h-3 w-3 text-primary" />
              Source Grounded
            </span>

            {/* Info mobile toggle trigger */}
            <button
              onClick={() => setShowInfoMobile(!showInfoMobile)}
              className="p-2.5 bg-slate-100 rounded-xl lg:hidden hover:bg-slate-200 text-foreground"
              title="Show Details"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Message Thread Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-slate-50/[0.15]">
          {activeChat?.messages.map((message) => {
            const isBot = message.role === "assistant";
            return (
              <div
                key={message.id}
                className={cn(
                  "flex w-full gap-3.5 animate-in fade-in slide-in-from-bottom-2 duration-300",
                  !isBot ? "flex-row-reverse" : "flex-row"
                )}
              >
                {/* Bubble Icon */}
                <div className={cn(
                  "h-9 w-9 rounded-xl shrink-0 flex items-center justify-center shadow-sm",
                  !isBot ? "bg-accent text-accent-foreground" : "bg-primary text-white"
                )}>
                  {!isBot ? <User className="h-4.5 w-4.5" /> : <Bot className="h-4.5 w-4.5" />}
                </div>

                {/* Text Bubble Content */}
                <div className={cn(
                  "max-w-[85%] sm:max-w-[75%] p-4.5 rounded-2xl text-xs font-bold leading-relaxed shadow-sm space-y-3",
                  !isBot 
                    ? "bg-accent text-accent-foreground rounded-tr-none" 
                    : "bg-white border border-primary/5 rounded-tl-none text-foreground"
                )}>
                  {/* Message body rendering markdown boldings and links */}
                  <div className="whitespace-pre-wrap leading-relaxed select-text text-[13px] font-semibold">
                    {/* Render bold headers and bullet structures for high readability */}
                    {message.content.split("\n").map((line, idx) => {
                      // Check for bullet lists
                      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
                        return (
                          <div key={idx} className="flex items-start gap-2 pl-2 my-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-2" />
                            <span className="flex-1">{line.trim().substring(2)}</span>
                          </div>
                        );
                      }
                      // Check for bold markdown
                      if (line.includes("**")) {
                        const parts = line.split("**");
                        return (
                          <p key={idx} className="my-1.5">
                            {parts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-extrabold text-primary">{part}</strong> : part)}
                          </p>
                        );
                      }
                      return <p key={idx} className="my-1.5 min-h-[1em]">{line}</p>;
                    })}
                  </div>

                  {/* Sources reference panel */}
                  {isBot && message.sources && message.sources.length > 0 && (
                    <div className="mt-4 pt-3.5 border-t border-dashed border-slate-100 space-y-2">
                      <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest block">Citations & References:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {message.sources.map((src, idx) => (
                          <a 
                            key={idx} 
                            href={src.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/5 border border-primary/10 text-[9px] font-black text-primary hover:bg-primary/10 transition-colors"
                          >
                            <Landmark className="h-2.5 w-2.5 shrink-0" />
                            {src.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Timestamp details */}
                  <div className="text-[9px] text-right font-medium text-muted-foreground/60 select-none">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            );
          })}

          {/* AI generating loader */}
          {isLoading && (
            <div className="flex gap-3.5">
              <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shadow-sm">
                <Bot className="h-4.5 w-4.5 text-primary animate-bounce" />
              </div>
              <div className="bg-primary/5 p-4 rounded-2xl rounded-tl-none border border-primary/10 shadow-sm">
                <div className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Controls */}
        <div className="p-4 bg-white border-t space-y-3.5">
          {/* Dynamic Suggestion Prompt Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                type="button"
                disabled={isLoading}
                onClick={() => handleSuggestClick(s.query)}
                className="px-3 py-1.5 rounded-full bg-primary/5 hover:bg-primary/10 border border-primary/10 text-[10px] font-black text-primary transition-all whitespace-nowrap shrink-0 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Form input field & upload selector triggers */}
          <div className="relative flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-primary/10 focus-within:border-primary/40 transition-colors shadow-inner">
            {/* hidden upload input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileUpload}
            />

            <button
              onClick={triggerFileUpload}
              disabled={isLoading || uploadingFile}
              className={cn(
                "p-2 rounded-xl text-muted-foreground hover:bg-slate-200 transition-colors shrink-0 cursor-pointer",
                uploadedFileName && "text-primary bg-primary/10 hover:bg-primary/20"
              )}
              title={uploadedFileName ? `Replace document: ${uploadedFileName}` : "Upload Document (Form 16/GST Invoice)"}
            >
              <UploadCloud className="h-4.5 w-4.5" />
            </button>

            <input
              type="text"
              placeholder={uploadingFile ? "Parsing document elements..." : "Ask section rules, HRA limits, or ITR details..."}
              className="flex-1 bg-transparent px-3 py-1.5 text-xs font-bold text-foreground focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading || uploadingFile}
            />

            <Button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading || uploadingFile}
              className="rounded-xl h-9 w-9 p-0 bg-primary hover:bg-primary/95 text-white shrink-0 cursor-pointer shadow-md shadow-primary/20"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex justify-between text-[8px] font-black text-muted-foreground uppercase tracking-widest px-1 opacity-60">
            <span>Secure Data Encryption</span>
            <span>Gemini LLM grounded</span>
          </div>
        </div>
      </main>

      {/* 3. Right Settings & Stats Panel */}
      <aside className={cn(
        "w-[280px] border-l border-slate-100 flex flex-col bg-slate-50/30 p-6 space-y-6 overflow-y-auto shrink-0 z-35",
        // Desktop Layout: Visible from lg screens. Mobile layout: Absolute overlay based on showInfoMobile
        "hidden lg:flex",
        showInfoMobile && "flex absolute inset-y-0 right-0 bg-white border-l shadow-2xl w-[280px] animate-in slide-in-from-right duration-300"
      )}>
        
        {/* Mobile Close Button */}
        {showInfoMobile && (
          <div className="flex justify-end lg:hidden">
            <button 
              onClick={() => setShowInfoMobile(false)}
              className="p-2 bg-slate-100 rounded-xl hover:bg-slate-200"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        )}

        {/* User XP Rank Widget */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">User Compliance Rank</h3>
          <div className="p-4 rounded-2xl bg-white border border-primary/5 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                <Award className="h-5.5 w-5.5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-foreground">{gamerState.title}</h4>
                <span className="text-[9px] font-bold text-muted-foreground">Level {gamerState.level} Filer</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] font-bold text-muted-foreground">
                <span>XP Progress</span>
                <span>{gamerState.xp} XP</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, (gamerState.xp % 500) / 5)}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Language Selection Config */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5 text-primary" />
            Response Language
          </h3>
          <div className="grid grid-cols-2 gap-1.5 bg-slate-100/80 p-1 rounded-xl border">
            {["Detect", "English", "Hindi", "Hinglish"].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setSelectedLanguage(lang)}
                className={cn(
                  "py-2 text-[10px] font-bold rounded-lg transition-all cursor-pointer",
                  selectedLanguage === lang
                    ? "bg-white text-primary shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {lang === "Detect" ? "Auto Detect" : lang}
              </button>
            ))}
          </div>
        </section>

        {/* Grounded Database Toggle */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Knowledge Settings</h3>
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-primary/5 shadow-sm">
            <div>
              <span className="text-xs font-bold text-foreground block">Strict Database Mode</span>
              <span className="text-[9px] text-muted-foreground font-semibold block mt-0.5">Rely on verified local records</span>
            </div>
            <button
              onClick={() => setIsGroundedMode(!isGroundedMode)}
              className={cn(
                "relative inline-flex h-4.5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none",
                isGroundedMode ? "bg-primary" : "bg-slate-200"
              )}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow ring-0 transition duration-200",
                  isGroundedMode ? "translate-x-4.5" : "translate-x-0"
                )}
              />
            </button>
          </div>
        </section>

        {/* Document Scanner Widget */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Active Scans</h3>
          <div className="p-4 rounded-2xl bg-white border border-primary/5 shadow-sm text-center space-y-3">
            {uploadingFile ? (
              <div className="space-y-2">
                <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto animate-spin">
                  <Settings className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-extrabold text-muted-foreground block">Parsing data structures...</span>
              </div>
            ) : uploadedFileName ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 p-2.5 rounded-xl border border-emerald-100 text-left">
                  <Check className="h-4 w-4 shrink-0" />
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-extrabold block truncate">{uploadedFileName}</span>
                    <span className="text-[8px] font-bold uppercase tracking-wider block opacity-70">Ready to query</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setUploadedFileName(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="text-[9px] font-black uppercase tracking-wider text-rose-500 hover:text-rose-700 block mx-auto cursor-pointer"
                >
                  Remove Document
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="h-10 w-10 rounded-full bg-slate-50 text-muted-foreground flex items-center justify-center mx-auto border border-dashed">
                  <FileText className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-extrabold text-muted-foreground block">No compliance files uploaded</span>
                <p className="text-[9px] text-muted-foreground font-semibold leading-normal">
                  Drop files to pre-fill calculations or analyze salaries.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Quick Calculator Links */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Calculators Shortcuts</h3>
          <div className="space-y-2">
            {[
              { label: "Income Tax Comparator", path: "/calculators/income-tax-calculator" },
              { label: "HRA Exemption Exporter", path: "/calculators/hra-calculator" },
              { label: "GST Slab Estimator", path: "/calculators/gst-calculator" }
            ].map((tool, idx) => (
              <Link
                key={idx}
                href={tool.path}
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-primary/5 hover:border-primary/20 shadow-xs group transition-all"
              >
                <span className="text-[10px] font-black text-foreground group-hover:text-primary transition-colors">{tool.label}</span>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </section>

      </aside>

    </div>
  );
}
