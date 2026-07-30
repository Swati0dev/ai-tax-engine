import { MessageSquare, ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SavedChatConversation {
  id: string;
  title: string;
  timestamp: string;
}

interface RecentChatsWidgetProps {
  recentChats: SavedChatConversation[];
}

export function RecentChatsWidget({ recentChats }: RecentChatsWidgetProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
          <MessageSquare className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold tracking-tight text-foreground">Recent Tax AI Chats</h3>
          <p className="text-xs text-muted-foreground font-semibold">Resume your AI tax intelligence dialogues</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {recentChats.length > 0 ? (
          recentChats.map((chat) => (
            <Link 
              key={chat.id} 
              href={`/chat`}
              className="p-5 bg-white border border-primary/5 rounded-[2rem] hover:shadow-md hover:border-primary/20 transition-all flex flex-col justify-between h-36 group relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 h-10 w-10 rounded-bl-[2rem] bg-slate-50 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="space-y-2 pr-6">
                <h4 className="font-extrabold text-sm text-foreground line-clamp-2 leading-snug">
                  {chat.title}
                </h4>
                <span className="text-[10px] text-muted-foreground font-bold block">
                  {new Date(chat.timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </span>
              </div>
              <span className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1 group-hover:gap-1.5 transition-all">
                Resume Dialogue
                <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))
        ) : (
          <div className="col-span-3 p-8 rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-200 text-center space-y-4">
            <p className="text-sm font-semibold text-muted-foreground">
              Aapne abhi tak koi conversation start nahi kiya hai.
            </p>
            <Link href="/chat">
              <Button className="rounded-xl font-bold bg-primary hover:bg-primary/95 text-white">
                Start Asking Tax AI
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
