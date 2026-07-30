import { 
  ComplianceEventType, 
  ComplianceStatus, 
  CompliancePriority, 
  EventSource 
} from "@prisma/client";

export interface ComplianceEventViewModel {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  eventType: ComplianceEventType;
  dueDate: Date;
  status: ComplianceStatus;
  priority: CompliancePriority;
  source: EventSource;
  isSystemGenerated: boolean;
  reminderAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateComplianceEventRequest {
  title: string;
  description?: string;
  eventType: ComplianceEventType;
  dueDate: Date;
  priority?: CompliancePriority;
  reminderAt?: Date;
}
