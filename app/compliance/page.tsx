import { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ComplianceCenter } from "@/components/tools/ComplianceCenter";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { getFormsAndProcedures } from "@/actions/tax";
import { getCompletedComplianceDocs } from "@/actions/compliance";

export const metadata: Metadata = {
  title: "Tax Compliance Center | AI Tax Platform",
  description: "Stay ahead of Indian tax deadlines. Reconcile due dates, download checklists, and estimate penalties with our interactive timeline.",
};

export const dynamic = "force-dynamic";

export default async function CompliancePage() {
  // Fetch forms and procedures dynamically from Neon Postgres database
  const res = await getFormsAndProcedures();
  const initialDbForms = res.success && res.data ? res.data : [];
  const completedDocs = await getCompletedComplianceDocs();

  return (
    <main className="flex flex-col w-full pb-24 bg-background">
      <PageHero
        title="Compliance Center"
        description="Never miss a deadline. Track ITR, GST, and TDS due dates, track documentation checklists, and estimate filing penalties."
        image="https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=2070&auto=format&fit=crop"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <Breadcrumbs />
        
        <div className="mt-8">
          <ComplianceCenter initialDbForms={initialDbForms} initialCompletedDocs={completedDocs} />
        </div>
      </div>
    </main>
  );
}
