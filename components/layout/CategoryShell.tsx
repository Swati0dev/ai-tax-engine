import { ReactNode } from "react";
import { Landmark } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryShellProps {
  title: string;
  description: string;
  category: "Direct Tax" | "Indirect Tax" | "GST" | "Forms" | "Sources";
  children: ReactNode;
  className?: string;
}

export function CategoryShell({ 
  title, 
  description, 
  category, 
  children, 
  className 
}: CategoryShellProps) {
  return (
    <div className={cn("flex flex-col w-full", className)}>
      {/* Category Header */}
      <header className="bg-background border-b py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60 mb-2">
              <Landmark className="h-3 w-3" />
              <span>Tax Knowledge Base</span>
              <span className="text-muted-foreground/30">/</span>
              <span className="text-primary">{category}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="max-w-3xl text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="bg-muted/10 py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
