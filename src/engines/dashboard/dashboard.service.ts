import { getUserProfile, UserProfileData } from "@/actions/profile";
import { getUserProgress } from "@/actions/gamification";
import { getCompletedComplianceDocs } from "@/actions/compliance";
import { getDynamicComplianceDates, getDynamicChecklist } from "@/lib/compliance-engine";
import { DashboardData, DashboardComplianceItem, DashboardChat, DashboardRecommendation } from "./dashboard.types";
import { mapDashboardUser, mapGamificationState, mapComplianceMetrics } from "./dashboard.mapper";
import { DASHBOARD_CONSTANTS } from "./dashboard.constants";
import { sortComplianceItemsByDate } from "./dashboard.utils";
import { getUserCalculations } from "../calculations/calculation.service";
import { getUserComplianceEvents, seedDefaultComplianceEvents } from "../compliance/compliance.service";
import { auth } from "@/auth";

export async function getDashboardData(): Promise<DashboardData | null> {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }
  const userId = session.user.id;
  const userEmail = session.user.email;
  const userName = session.user.name;

  // Ensure default events exist for the user
  await seedDefaultComplianceEvents(userId);

  // Rule 2: Parallel Data Fetching
  const [profileResult, progressResult, completedDocs, calculations, complianceEvents] = await Promise.all([
    getUserProfile(),
    getUserProgress(),
    getCompletedComplianceDocs(),
    getUserCalculations(userId),
    getUserComplianceEvents(userId)
  ]);

  const profileData: UserProfileData | null = (profileResult.success && profileResult.data) ? (profileResult.data as unknown as UserProfileData) : null;
  
  const dashboardUser = mapDashboardUser(userId, userName, userEmail, profileData);
  const dashboardGamification = mapGamificationState(progressResult);

  // Compliance mappings
  const rawDueDates = getDynamicComplianceDates(profileData).slice(0, DASHBOARD_CONSTANTS.MAX_DUE_DATES);
  const rawChecklist = getDynamicChecklist(profileData).slice(0, DASHBOARD_CONSTANTS.MAX_CHECKLIST_ITEMS);

  const dueDates: DashboardComplianceItem[] = rawDueDates.map(d => ({
    id: d.id,
    title: d.title,
    dueDate: new Date(d.date),
    isCompleted: completedDocs.includes(d.id),
    type: "event"
  }));

  const checklist: DashboardComplianceItem[] = rawChecklist.map(c => ({
    id: c.id,
    title: c.label,
    isCompleted: completedDocs.includes(c.id),
    type: "document"
  }));

  const sortedDueDates = sortComplianceItemsByDate(dueDates);
  const complianceMetrics = mapComplianceMetrics(sortedDueDates, checklist);

  // Recommendations and recent chats (empty for now, can be populated via other services later)
  const recentChats: DashboardChat[] = [];
  const recommendations: DashboardRecommendation[] = [];
  const savedSections: DashboardRecommendation[] = [];

  return {
    user: dashboardUser,
    gamification: dashboardGamification,
    complianceMetrics: complianceMetrics,
    dueDates: sortedDueDates,
    checklist: checklist,
    recentChats: recentChats,
    recommendations: recommendations,
    savedSections: savedSections,
    calculations: calculations,
    complianceEvents: complianceEvents,
  };
}
