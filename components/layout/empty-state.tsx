import { FileSearch } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="soft-ui-card p-10 text-center flex flex-col items-center justify-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 relative shadow-inner">
        <div className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
        </div>
        <FileSearch className="h-8 w-8" aria-hidden="true" />
      </div>
      <h2 className="text-2xl font-extrabold tracking-tight text-foreground">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground font-medium">{description}</p>
    </div>
  );
}
