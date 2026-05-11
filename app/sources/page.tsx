import { CategoryPageShell } from "@/components/tax-section/category-page-shell";

export default function SourcesPage() {
  return (
    <CategoryPageShell
      category="Sources"
      description="Every tax claim needs a visible source trail. This page will list official references, review status, and content freshness once records are added."
      emptyState="Source records will be connected to tax content after the knowledge system is implemented."
    />
  );
}
