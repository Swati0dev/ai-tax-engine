import { DashboardUser } from "./dashboard.types";

export function canAccessCalculator(_user: DashboardUser): boolean {
  return true; // currently available to all
}

export function requiresProfileCompletion(user: DashboardUser): boolean {
  return !user.profileComplete;
}
