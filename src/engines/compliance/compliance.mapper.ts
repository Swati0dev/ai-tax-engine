import { ComplianceEvent } from "@prisma/client";
import { ComplianceEventViewModel } from "./compliance.types";

export function toComplianceEventViewModel(entity: ComplianceEvent): ComplianceEventViewModel {
  return {
    id: entity.id,
    userId: entity.userId,
    title: entity.title,
    description: entity.description,
    eventType: entity.eventType,
    dueDate: entity.dueDate,
    status: entity.status,
    priority: entity.priority,
    source: entity.source,
    isSystemGenerated: entity.isSystemGenerated,
    reminderAt: entity.reminderAt,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
}

export function toComplianceEventViewModels(entities: ComplianceEvent[]): ComplianceEventViewModel[] {
  return entities.map(toComplianceEventViewModel);
}
