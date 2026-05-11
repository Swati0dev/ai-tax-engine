import { EmptyState } from "@/components/layout/empty-state";
import { Landmark } from "lucide-react";
import { TaxKnowledgeItem } from "@/types/tax";
import { TaxCard } from "./TaxCard";

type CategoryPageShellProps = {
  category: string;
  description: string;
  emptyState: string;
  items?: TaxKnowledgeItem[];
};

export function CategoryPageShell({ category, description, emptyState, items = [] }: CategoryPageShellProps) {
  return (
    <div className="flex flex-col w-full">
      {/* Category Header */}
      <header className="bg-background border-b py-12 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent -z-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col gap-4">
            <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60 mb-2">
              <Landmark className="h-3 w-3" />
              <span>Tax Knowledge Base</span>
              <span className="text-muted-foreground/30">/</span>
              <span className="text-primary">{category}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              {category}
            </h1>
            <p className="max-w-3xl text-lg text-muted-foreground leading-relaxed font-medium">
              {description}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="bg-muted/10 py-12 lg:py-24 flex-1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {items.length > 0 ? (
            <div className="flex flex-col gap-8">
              {items.map((item) => (
                <TaxCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState title="Knowledge Records Incoming" description={emptyState} />
          )}
        </div>
      </main>
    </div>
  );
}
