export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  occupation: string;
  profileComplete: boolean;
}

export interface DashboardGamification {
  xp: number;
  level: number;
  title: string;
}

export interface DashboardComplianceMetric {
  healthScore: number; // 0 to 100
  totalDue: number;
  completedDue: number;
  checklistProgress: number; // 0 to 100
  totalChecklist: number;
  checkedItems: number;
}

export interface DashboardComplianceItem {
  id: string;
  title: string;
  dueDate?: Date | null;
  isCompleted: boolean;
  type: "document" | "event";
}

export interface DashboardChat {
  id: string;
  title: string;
  timestamp: string;
}

export interface DashboardRecommendation {
  id: string;
  title: string;
  description: string;
  href: string;
  category: string;
}

import { SavedCalculationViewModel } from "../calculations/calculation.types";

import { ComplianceEventViewModel } from "../compliance/compliance.types";

export interface DashboardData {
  user: DashboardUser;
  gamification: DashboardGamification;
  complianceMetrics: DashboardComplianceMetric;
  dueDates: DashboardComplianceItem[];
  checklist: DashboardComplianceItem[];
  recentChats: DashboardChat[];
  recommendations: DashboardRecommendation[];
  savedSections: DashboardRecommendation[]; // Reusing type for now
  calculations: SavedCalculationViewModel[];
  complianceEvents: ComplianceEventViewModel[];
}
