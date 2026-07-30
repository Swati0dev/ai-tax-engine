import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export function SectionHeader({ title, className }: SectionHeaderProps) {
  return (
    <h3 className={cn("text-xs font-black uppercase tracking-wider text-muted-foreground px-1 mb-4", className)}>
      {title}
    </h3>
  );
}
