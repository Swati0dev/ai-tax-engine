import { Metadata } from "next";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export const metadata: Metadata = {
  title: "Personalize Your Tax Profile | AI Tax Engine",
  description: "Complete your tax profile to get personalized compliance deadlines, tax saving recommendations, and smart calculations.",
};

export default function OnboardingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-slate-50/50">
      <div className="absolute inset-0 z-[-1] h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
      
      <div className="w-full max-w-4xl mx-auto bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl p-6 sm:p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 h-48 w-48 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-48 w-48 bg-indigo-500/5 rounded-full blur-3xl"></div>
        
        <OnboardingWizard />
      </div>
    </main>
  );
}
