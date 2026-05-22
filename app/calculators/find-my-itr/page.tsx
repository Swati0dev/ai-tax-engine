import { Metadata } from "next";
import ITRWizard from "@/components/tools/ITRWizard";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

export const metadata: Metadata = {
  title: "Find My ITR Form | AI Tax Platform",
  description: "An interactive wizard to help you determine which Income Tax Return (ITR) form you need to file.",
};

export default function FindMyITRPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20">
      <PageHero 
        title="Find My ITR Form" 
        description="Don't know which form to file? Take our quick quiz and let our AI determine the correct ITR form for you based on your income sources." 
      />
      
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <Breadcrumbs />
        <div className="mt-8">
          <ITRWizard />
        </div>
      </div>
    </main>
  );
}
