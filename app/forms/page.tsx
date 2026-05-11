import { getFormsAndProcedures } from "@/actions/tax";
import { FormProcedureCard } from "@/components/tax-section/FormProcedureCard";
import { EmptyState } from "@/components/layout/empty-state";
import { Landmark } from "lucide-react";

export default async function FormsPage() {
  const result = await getFormsAndProcedures();
  const items = (result.success && result.data) ? result.data : [];

  return (
    <div className="flex flex-col w-full">
      {/* Forms Header */}
      <header className="bg-background border-b py-12 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent -z-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col gap-4">
            <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60 mb-2">
              <Landmark className="h-3 w-3" />
              <span>Tax Knowledge Base</span>
              <span className="text-muted-foreground/30">/</span>
              <span className="text-primary text-xs">Forms & Procedures</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Forms & Procedures
            </h1>
            <p className="max-w-3xl text-lg text-muted-foreground leading-relaxed font-medium">
              Access official filing workflows, required forms, and step-by-step procedures grounded in tax law.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="bg-muted/10 py-12 lg:py-24 flex-1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {items.map((item) => (
                <FormProcedureCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState 
              title="Forms and procedures will be added during the tax knowledge phase after source review." 
              description="No tax-law explanation is shown here until the content has a source-backed record and review status." 
            />
          )}
        </div>
      </main>
    </div>
  );
}
