import Link from "next/link";

import { EmptyState } from "@/components/layout/empty-state";
import { Button } from "@/components/ui/button";

type SectionPlaceholderProps = {
  category: "Direct Tax" | "Indirect Tax";
  section: string;
};

export function SectionPlaceholder({ category, section }: SectionPlaceholderProps) {
  const categoryPath = category === "Direct Tax" ? "/direct-tax" : "/indirect-tax";

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-3">
        <p className="text-sm font-medium text-primary">{category}</p>
        <h1 className="text-3xl font-semibold tracking-normal">{section}</h1>
        <p className="max-w-2xl text-muted-foreground">
          This detail route is reserved for reviewed section content in a later phase.
        </p>
      </div>
      <div className="space-y-4">
        <EmptyState
          title="Section content pending"
          description="No tax-law explanation is shown here until the content has a source-backed record and review status."
        />
        <Button asChild variant="secondary">
          <Link href={categoryPath}>Back to {category}</Link>
        </Button>
      </div>
    </div>
  );
}
