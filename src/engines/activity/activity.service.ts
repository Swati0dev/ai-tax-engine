import { prisma } from "@/lib/db";
import { NotificationType, NotificationSeverity } from "@prisma/client";
import { ActivityViewModel, CreateActivityRequest } from "./activity.types";
import { toActivityViewModel, toActivityViewModels } from "./activity.mapper";
import { canMutateActivity } from "./activity.permissions";

export async function getUserActivities(
  userId: string, 
  limit: number = 50, 
  offset: number = 0
): Promise<ActivityViewModel[]> {
  const events = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: offset,
  });
  return toActivityViewModels(events);
}

export async function markAsRead(userId: string, notificationId: string): Promise<ActivityViewModel> {
  const existing = await prisma.notification.findUnique({
    where: { id: notificationId },
  });

  if (!existing || !canMutateActivity(userId, existing)) {
    throw new Error("Activity not found or access denied");
  }

  const updated = await prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true },
  });

  return toActivityViewModel(updated);
}

export async function markAllAsRead(userId: string): Promise<void> {
  await prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
}

// Internal base creator
async function createActivity(userId: string, request: CreateActivityRequest): Promise<ActivityViewModel | null> {
  try {
    const entity = await prisma.notification.create({
      data: {
        userId,
        type: request.type,
        severity: request.severity,
        title: request.title,
        message: request.message,
        actionUrl: request.actionUrl,
        metadata: request.metadata ? JSON.parse(JSON.stringify(request.metadata)) : null,
      },
    });
    return toActivityViewModel(entity);
  } catch (error) {
    console.error("[Activity Engine] Failed to create activity:", error);
    return null;
  }
}

// Domain-Specific Notification Helpers
export async function notifyCalculationSaved(
  userId: string, 
  calculationId: string, 
  financialYear: string,
  taxSavings: number
) {
  return createActivity(userId, {
    type: NotificationType.CALCULATION,
    severity: NotificationSeverity.SUCCESS,
    title: "Calculation Saved",
    message: `Your tax calculation for FY ${financialYear} has been saved. Tax savings projected: ₹${taxSavings}.`,
    actionUrl: "/dashboard/calculations",
    metadata: { calculationId, financialYear, taxSavings }
  });
}

export async function notifyComplianceReminder(
  userId: string, 
  eventId: string, 
  eventName: string, 
  isOverdue: boolean
) {
  return createActivity(userId, {
    type: NotificationType.COMPLIANCE,
    severity: isOverdue ? NotificationSeverity.ERROR : NotificationSeverity.WARNING,
    title: isOverdue ? "Compliance Overdue" : "Upcoming Deadline",
    message: isOverdue 
      ? `Your deadline for ${eventName} has passed. Please act immediately.` 
      : `Your deadline for ${eventName} is approaching soon.`,
    actionUrl: "/dashboard/compliance",
    metadata: { eventId, isOverdue }
  });
}

export async function notifyProfileCompletion(userId: string) {
  return createActivity(userId, {
    type: NotificationType.SYSTEM,
    severity: NotificationSeverity.INFO,
    title: "Complete Your Profile",
    message: "Unlock personalized AI tax recommendations by completing your professional profile.",
    actionUrl: "/dashboard/profile"
  });
}

export async function notifySystemUpdate(userId: string, updateTitle: string, updateMessage: string) {
  return createActivity(userId, {
    type: NotificationType.SYSTEM,
    severity: NotificationSeverity.INFO,
    title: updateTitle,
    message: updateMessage
  });
}

export async function notifyKnowledgeRecommendation(userId: string, articleId: string, articleTitle: string) {
  return createActivity(userId, {
    type: NotificationType.KNOWLEDGE,
    severity: NotificationSeverity.SUCCESS,
    title: "New Tax Saving Opportunity",
    message: `Based on your profile, you might benefit from learning about: ${articleTitle}`,
    actionUrl: `/knowledge-hub`, // can be adjusted to link specifically later
    metadata: { articleId }
  });
}
