"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WidgetCardProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function WidgetCard({ children, className, noPadding = false }: WidgetCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full h-full"
    >
      <Card className={cn(
        "rounded-[2rem] border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white/80 backdrop-blur-xl h-full overflow-hidden",
        className
      )}>
        <CardContent className={cn("h-full", noPadding ? "p-0" : "p-6 md:p-8")}>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}
