import { prisma } from "@/lib/db";
import { ComplianceStatus, ComplianceEventType, CompliancePriority, EventSource } from "@prisma/client";
import { ComplianceEventViewModel, CreateComplianceEventRequest } from "./compliance.types";
import { toComplianceEventViewModel, toComplianceEventViewModels } from "./compliance.mapper";
import { canAccessComplianceEvent, canMutateComplianceEvent } from "./compliance.permissions";

export async function getUserComplianceEvents(userId: string): Promise<ComplianceEventViewModel[]> {
  const events = await prisma.complianceEvent.findMany({
    where: { userId },
    orderBy: { dueDate: 'asc' },
  });
  return toComplianceEventViewModels(events);
}

export async function getUpcomingComplianceEvents(userId: string, limit: number = 5): Promise<ComplianceEventViewModel[]> {
  const events = await prisma.complianceEvent.findMany({
    where: { 
      userId,
      status: {
        in: [ComplianceStatus.PENDING, ComplianceStatus.IN_PROGRESS]
      },
      dueDate: {
        gte: new Date()
      }
    },
    orderBy: { dueDate: 'asc' },
    take: limit,
  });
  return toComplianceEventViewModels(events);
}

export async function createCustomComplianceEvent(
  userId: string, 
  request: CreateComplianceEventRequest
): Promise<ComplianceEventViewModel> {
  const entity = await prisma.complianceEvent.create({
    data: {
      userId,
      title: request.title,
      description: request.description,
      eventType: request.eventType,
      dueDate: request.dueDate,
      priority: request.priority ?? CompliancePriority.MEDIUM,
      reminderAt: request.reminderAt,
      source: EventSource.USER,
      isSystemGenerated: false,
      status: ComplianceStatus.PENDING,
    }
  });

  return toComplianceEventViewModel(entity);
}

export async function updateComplianceEventStatus(
  userId: string, 
  eventId: string, 
  status: ComplianceStatus
): Promise<ComplianceEventViewModel> {
  const existing = await prisma.complianceEvent.findUnique({
    where: { id: eventId }
  });

  if (!existing || !canMutateComplianceEvent(userId, existing)) {
    throw new Error("Event not found or access denied");
  }

  const updated = await prisma.complianceEvent.update({
    where: { id: eventId },
    data: { status }
  });

  return toComplianceEventViewModel(updated);
}

// Ensure the user has the basic default compliance events generated
export async function seedDefaultComplianceEvents(userId: string): Promise<void> {
  const existingSystemEvents = await prisma.complianceEvent.count({ 
    where: { userId, isSystemGenerated: true } 
  });
  
  if (existingSystemEvents === 0) {
    const currentYear = new Date().getFullYear();
    const defaults = [
      {
        title: "File Income Tax Return",
        description: "Annual ITR Filing for Individuals",
        eventType: ComplianceEventType.ITR_FILING,
        dueDate: new Date(`${currentYear}-07-31`),
        priority: CompliancePriority.HIGH,
        source: EventSource.SYSTEM,
        isSystemGenerated: true
      },
      {
        title: "Advance Tax Payment Q1",
        description: "15% of total tax liability",
        eventType: ComplianceEventType.ADVANCE_TAX,
        dueDate: new Date(`${currentYear}-06-15`),
        priority: CompliancePriority.MEDIUM,
        source: EventSource.SYSTEM,
        isSystemGenerated: true
      },
      {
        title: "Advance Tax Payment Q2",
        description: "45% of total tax liability",
        eventType: ComplianceEventType.ADVANCE_TAX,
        dueDate: new Date(`${currentYear}-09-15`),
        priority: CompliancePriority.MEDIUM,
        source: EventSource.SYSTEM,
        isSystemGenerated: true
      }
    ];

    await prisma.complianceEvent.createMany({
      data: defaults.map(d => ({ ...d, userId }))
    });
  }
}
