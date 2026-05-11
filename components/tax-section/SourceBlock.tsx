import { ExternalLink, Landmark, ShieldCheck, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { SourceReference } from "@/types/tax";

interface SourceBlockProps {
  sources: SourceReference[];
  className?: string;
}

const sourceConfig = {
  OFFICIAL: {
    icon: Landmark,
    label: "Official Government Source",
    color: "text-primary bg-primary/5 border-primary/10",
  },
  PROJECT_APPROVED: {
    icon: ShieldCheck,
    label: "Expert Verified",
    color: "text-blue-600 bg-blue-500/5 border-blue-500/10",
  },
  ORIENTATION_ONLY: {
    icon: Info,
    label: "Informational Only",
    color: "text-muted-foreground bg-muted border-border",
  },
} as const;

export function SourceBlock({ sources, className }: SourceBlockProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className={cn("space-y-3", className)}>
      <h4 className="text-sm font-bold text-foreground/70 uppercase tracking-wider">Official Citations</h4>
      <div className="grid gap-3">
        {sources.map((source) => {
          const config = sourceConfig[source.sourceType as keyof typeof sourceConfig] || sourceConfig.ORIENTATION_ONLY;
          const Icon = config.icon;
          
          return (
            <a
              key={source.id}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center justify-between p-4 rounded-xl border transition-all hover:shadow-md hover:border-primary/30 group",
                config.color
              )}
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-background flex items-center justify-center shadow-sm">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-bold leading-none mb-1 group-hover:text-primary transition-colors">
                    {source.title}
                  </div>
                  <div className="text-[10px] opacity-70 uppercase font-semibold">
                    {config.label} • Accessed {source.accessedAt instanceof Date ? source.accessedAt.toLocaleDateString() : source.accessedAt}
                  </div>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 opacity-30 group-hover:opacity-100 transition-opacity" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
