import { EmptyState } from "@/components/layout/empty-state";
import { TaxKnowledgeItem } from "@/types/tax";
import { TaxCard } from "./TaxCard";
import { PageHero } from "@/components/layout/PageHero";

type CategoryPageShellProps = {
  category: string;
  description: string;
  emptyState: string;
  items?: TaxKnowledgeItem[];
};

export function CategoryPageShell({ category, description, emptyState, items = [] }: CategoryPageShellProps) {
  return (
    <div className="flex flex-col w-full">
      <PageHero 
        title={category}
        description={description}
        image="/hero-tax.png"
      />

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
