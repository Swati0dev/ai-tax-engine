import { redirect } from "next/navigation";
import { getDashboardData } from "@/src/engines/dashboard/dashboard.service";
import { WelcomeWidget } from "@/components/dashboard/overview/WelcomeWidget";
import { ProfilePromptWidget } from "@/components/dashboard/overview/ProfilePromptWidget";
import { QuickActionsWidget } from "@/components/dashboard/overview/QuickActionsWidget";
import { RecentChatsWidget } from "@/components/dashboard/ai/RecentChatsWidget";
import { SavedSectionsWidget } from "@/components/dashboard/knowledge/SavedSectionsWidget";
import { KnowledgeRecommendationsWidget } from "@/components/dashboard/knowledge/KnowledgeRecommendationsWidget";
import { DailyCheckInWidget } from "@/components/dashboard/productivity/DailyCheckInWidget";
import { FinancialWorkspace } from "@/components/dashboard/financial/FinancialWorkspace";
import { ComplianceWorkspace } from "@/components/dashboard/compliance/ComplianceWorkspace";
import { RecentActivityWidget } from "@/components/dashboard/notifications/RecentActivityWidget";
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
    savedSections,
    calculations,
    complianceEvents,
    activities,
    recommendations
  } = dashboardData;

  const isProfileComplete = !requiresProfileCompletion(user);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* 1. Overview Widgets */}
      <ErrorBoundary fallbackTitle="Welcome Error">
        <WelcomeWidget gamerState={gamification} userName={user.name || "Filer"} />
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

      {/* 2. Compliance Workspace */}
      <ErrorBoundary fallbackTitle="Compliance Workspace Error">
        <ComplianceWorkspace 
          initialEvents={complianceEvents}
          checklist={checklist}
          dueDates={dueDates}
        />
      </ErrorBoundary>

      {/* 3. Main Dashboard Grid splits (Other widgets) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side (Col-8) */}
        <div className="lg:col-span-8 space-y-8">
          
          <ErrorBoundary fallbackTitle="AI Chats Error">
            <RecentChatsWidget recentChats={recentChats} />
          </ErrorBoundary>
          
          <ErrorBoundary fallbackTitle="Saved Sections Error">
            <SavedSectionsWidget savedSections={savedSections} />
          </ErrorBoundary>

        </div>

        {/* Right Side: Productivity, Links (Col-4) */}
        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
          
          <ErrorBoundary fallbackTitle="Activity Error">
            <RecentActivityWidget activities={activities} />
          </ErrorBoundary>

          <ErrorBoundary fallbackTitle="Daily Reward Error">
            <DailyCheckInWidget />
          </ErrorBoundary>
          
          <ErrorBoundary fallbackTitle="Quick Actions Error">
            <QuickActionsWidget />
          </ErrorBoundary>
          
          <ErrorBoundary fallbackTitle="Recommendations Error">
            <KnowledgeRecommendationsWidget recommendations={recommendations} />
          </ErrorBoundary>

        </div>
      </div>
    </div>
  );
}
