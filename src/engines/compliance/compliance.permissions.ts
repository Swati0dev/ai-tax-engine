import { ComplianceEvent } from "@prisma/client";

export function canAccessComplianceEvent(userId: string, event: ComplianceEvent): boolean {
  return event.userId === userId;
}

export function canMutateComplianceEvent(userId: string, event: ComplianceEvent): boolean {
  return event.userId === userId;
}
