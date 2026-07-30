import { DashboardComplianceItem } from "./dashboard.types";

export function sortComplianceItemsByDate(items: DashboardComplianceItem[]): DashboardComplianceItem[] {
  return [...items].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return a.dueDate.getTime() - b.dueDate.getTime();
  });
}
