import { UserProfileData } from "@/actions/profile";
import { GamificationState } from "@/lib/gamification";
import { DashboardUser, DashboardGamification, DashboardComplianceMetric, DashboardComplianceItem } from "./dashboard.types";


export function mapDashboardUser(
  id: string,
  name: string | null | undefined,
  email: string | null | undefined,
  profile: UserProfileData | null
): DashboardUser {
  return {
    id,
    name: name || "User",
    email: email || "",
    occupation: profile?.occupation || "Filer",
    profileComplete: !!profile,
  };
}

export function mapGamificationState(state: GamificationState | null): DashboardGamification {
  if (!state) {
    return {
      xp: 0,
      level: 1,
      title: "Tax Novice"
    };
  }
  return {
    xp: state.xp,
    level: state.level,
    title: state.title || "Tax Novice"
  };
}

export function mapComplianceMetrics(
  dueDates: DashboardComplianceItem[],
  checklist: DashboardComplianceItem[]
): DashboardComplianceMetric {
  const activeDue = dueDates.length;
  const completedDue = dueDates.filter(d => d.isCompleted).length;
  const healthScore = activeDue === 0 ? 100 : Math.round((completedDue / activeDue) * 100);

  const totalChecklist = checklist.length;
  const checkedItems = checklist.filter(c => c.isCompleted).length;
  const checklistProgress = totalChecklist === 0 ? 0 : Math.round((checkedItems / totalChecklist) * 100);

  return {
    healthScore,
    totalDue: activeDue,
    completedDue,
    checklistProgress,
    totalChecklist,
    checkedItems
  };
}
