import { WelcomeSkeleton, FinancialSkeleton, ComplianceSkeleton, ChatSkeleton, KnowledgeSkeleton, CalculatorSkeleton } from "@/components/dashboard/shared/DashboardSkeletons";

export default function DashboardLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      <WelcomeSkeleton />
      <FinancialSkeleton />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          <CalculatorSkeleton />
          <ComplianceSkeleton />
          <ChatSkeleton />
          <KnowledgeSkeleton />
        </div>
        
        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
          <ComplianceSkeleton />
          <KnowledgeSkeleton />
        </div>
      </div>
    </div>
  );
}
