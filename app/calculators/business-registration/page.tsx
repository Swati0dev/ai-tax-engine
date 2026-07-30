import { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const BusinessRegistrationEngine = dynamic(
  () => import("@/components/tools/BusinessRegistrationEngine").then((mod) => mod.BusinessRegistrationEngine),
  {
    loading: () => (
      <div className="flex h-96 w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: "Business Entity Selection Engine | AI Tax Platform",
  description: "Answer a few simple questions to find out which legal entity (Private Limited, LLP, Proprietorship, OPC) is right for your startup or business.",
};

export default function BusinessRegistrationPage() {
  return (
    <main className="flex flex-col w-full pb-24 bg-slate-50/50">
      <PageHero
        title="Choose Your Business Entity"
        description="Don't guess your legal structure. Use our AI-powered engine to find the perfect balance of compliance, liability protection, and funding readiness."
        image="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2064&auto=format&fit=crop"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <Breadcrumbs />
        
        <div className="mt-12">
          <BusinessRegistrationEngine />
        </div>
      </div>
    </main>
  );
}
