"use client";

import React, { useEffect, useState } from "react";
import { getGamificationState, GamificationState } from "@/lib/gamification";
import { Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function GamificationBadge() {
  const [state, setState] = useState<GamificationState | null>(null);
  const [justLeveledUp, setJustLeveledUp] = useState(false);

  useEffect(() => {
    setState(getGamificationState());

    const handleUpdate = () => {
      setState(getGamificationState());
      setJustLeveledUp(true);
      setTimeout(() => setJustLeveledUp(false), 2000); // Pulse effect duration
    };

    window.addEventListener("gamification-update", handleUpdate);
    return () => window.removeEventListener("gamification-update", handleUpdate);
  }, []);

  if (!state) return null;

  return (
    <motion.div 
      initial={{ scale: 1 }}
      animate={{ scale: justLeveledUp ? [1, 1.1, 1] : 1 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={`hidden sm:flex items-center gap-2 border px-3 py-1 transition-all duration-300 rounded-full backdrop-blur-md ${
        justLeveledUp 
          ? "bg-accent border-accent shadow-lg shadow-accent/20 text-white" 
          : "bg-white/80 border-border/40 shadow-sm hover:-translate-y-0.5 hover:shadow-md text-foreground"
      }`}
    >
      <Trophy className={`h-4 w-4 ${justLeveledUp ? "text-white" : "text-accent"}`} />
      <div className="flex flex-col">
        <span className={`text-[9px] font-bold leading-none uppercase tracking-widest ${justLeveledUp ? "text-white" : "text-muted-foreground"}`}>
          {state.title}
        </span>
        <AnimatePresence mode="popLayout">
          <motion.span 
            key={state.xp}
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 5, opacity: 0 }}
            className={`text-[10px] font-extrabold leading-tight ${justLeveledUp ? "text-white" : "text-accent"}`}
          >
            LVL {state.level} <span className="opacity-40 text-foreground px-0.5">/</span> {state.xp} XP
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
