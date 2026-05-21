import ITRWizard from "@/components/tools/ITRWizard";
import { PageHero } from "@/components/layout/PageHero";

export const metadata = {
  title: "Find My ITR Form - AI Tax Engine",
  description: "An interactive wizard to help you determine which Income Tax Return (ITR) form you need to file.",
};

export default function FindMyITRPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20">
      <PageHero 
        title="Find My ITR Form" 
        description="Don't know which form to file? Take our quick quiz and let our AI determine the correct ITR form for you based on your income sources." 
      />
      
      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <ITRWizard />
      </div>
    </main>
  );
}
