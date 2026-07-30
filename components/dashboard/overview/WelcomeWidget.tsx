import { Trophy, Sparkles } from "lucide-react";
import { GamificationState } from "@/lib/gamification";

interface WelcomeWidgetProps {
  gamerState: GamificationState;
  userName?: string;
}

export function WelcomeWidget({ gamerState, userName = "Filer" }: WelcomeWidgetProps) {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-primary via-slate-900 to-indigo-950 p-8 md:p-12 text-white shadow-2xl border border-primary/20">
      {/* Subtle decorative mesh/orb background */}
      <div className="absolute right-0 top-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute left-1/3 bottom-0 -mb-16 h-60 w-60 rounded-full bg-secondary/10 blur-3xl" />
      
      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 z-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-black text-secondary tracking-widest uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            Tax AI Intelligence
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight">
            Namaste, {userName}! 🌟
          </h1>
          <p className="text-sm md:text-base text-slate-300 font-medium max-w-xl leading-relaxed">
            Maintain compliance, save taxes using artificial intelligence, and track your levels. Your filings are secure & verified.
          </p>
        </div>

        {/* Rank Title Widget */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-3xl shrink-0 flex items-center gap-4 shadow-xl">
          <div className="h-12 w-12 rounded-2xl bg-secondary/20 border border-secondary/20 flex items-center justify-center text-secondary">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Filing Title</span>
            <h3 className="text-lg font-black text-white">{gamerState.title}</h3>
            <span className="text-xs text-secondary font-bold">Level {gamerState.level} Tax Filer</span>
          </div>
        </div>
      </div>
    </section>
  );
}
