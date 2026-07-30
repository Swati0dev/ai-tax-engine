import { redirect } from "next/navigation";
import { getDashboardData } from "@/src/engines/dashboard/dashboard.service";
import { MyITRQuest } from "@/components/dashboard/compliance/MyITRQuest";
import { WelcomeWidget } from "@/components/dashboard/overview/WelcomeWidget";
import { ProfilePromptWidget } from "@/components/dashboard/overview/ProfilePromptWidget";
import { QuickActionsWidget } from "@/components/dashboard/overview/QuickActionsWidget";
import { FilingChecklistWidget } from "@/components/dashboard/compliance/FilingChecklistWidget";
import { DueDateTrackerWidget } from "@/components/dashboard/compliance/DueDateTrackerWidget";
import { RecentChatsWidget } from "@/components/dashboard/ai/RecentChatsWidget";
import { SavedSectionsWidget } from "@/components/dashboard/knowledge/SavedSectionsWidget";
import { KnowledgeRecommendationsWidget } from "@/components/dashboard/knowledge/KnowledgeRecommendationsWidget";
import { DailyCheckInWidget } from "@/components/dashboard/productivity/DailyCheckInWidget";
import { FinancialWorkspace } from "@/components/dashboard/financial/FinancialWorkspace";
import { requiresProfileCompletion } from "@/src/engines/dashboard/dashboard.permissions";
import { ErrorBoundary } from "@/components/ui/error-boundary";

export default async function DashboardPage() {
  const dashboardData = await getDashboardData();
  
  if (!dashboardData) {
    redirect("/login");
  }

  const {
    user,
    gamification,
    complianceMetrics,
    dueDates,
    checklist,
    recentChats,
    calculations
  } = dashboardData;

  const isProfileComplete = !requiresProfileCompletion(user);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* 1. Overview Widgets */}
      <ErrorBoundary fallbackTitle="Welcome Error">
        <WelcomeWidget gamerState={gamification} userName={user.occupation} />
      </ErrorBoundary>
      
      <ErrorBoundary fallbackTitle="Profile Prompt Error">
        <ProfilePromptWidget isProfileComplete={isProfileComplete} />
      </ErrorBoundary>
      
      <ErrorBoundary fallbackTitle="Financial Workspace Error">
        <FinancialWorkspace 
          gamerState={gamification}
          checklistProgress={complianceMetrics.checklistProgress}
          complianceHealth={complianceMetrics.healthScore}
          dashboardChecklistLength={complianceMetrics.totalChecklist}
          checkedItemsLength={complianceMetrics.checkedItems}
          completedEventsLength={complianceMetrics.completedDue}
          initialCalculations={calculations}
        />
      </ErrorBoundary>

      {/* 3. Main Dashboard Grid splits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Financial & Compliance (Col-8) */}
        <div className="lg:col-span-8 space-y-8">
          
          <ErrorBoundary fallbackTitle="ITR Quest Error">
            <MyITRQuest />
          </ErrorBoundary>
          
          <ErrorBoundary fallbackTitle="Checklist Error">
            <FilingChecklistWidget initialChecklist={checklist} />
          </ErrorBoundary>
          
          <ErrorBoundary fallbackTitle="AI Chats Error">
            <RecentChatsWidget recentChats={recentChats} />
          </ErrorBoundary>
          
          <ErrorBoundary fallbackTitle="Saved Sections Error">
            <SavedSectionsWidget />
          </ErrorBoundary>

        </div>

        {/* Right Side: Productivity, Compliance tracking, Links (Col-4) */}
        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
          
          <ErrorBoundary fallbackTitle="Daily Reward Error">
            <DailyCheckInWidget />
          </ErrorBoundary>
          
          <ErrorBoundary fallbackTitle="Tracker Error">
            <DueDateTrackerWidget initialDueDates={dueDates} />
          </ErrorBoundary>
          
          <ErrorBoundary fallbackTitle="Quick Actions Error">
            <QuickActionsWidget />
          </ErrorBoundary>
          
          <ErrorBoundary fallbackTitle="Recommendations Error">
            <KnowledgeRecommendationsWidget />
          </ErrorBoundary>

        </div>
      </div>
    </div>
  );
}
