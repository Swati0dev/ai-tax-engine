import { Notification } from "@prisma/client";
import { ActivityViewModel } from "./activity.types";

export function toActivityViewModel(notification: Notification): ActivityViewModel {
  return {
    id: notification.id,
    type: notification.type,
    severity: notification.severity,
    title: notification.title,
    message: notification.message,
    isRead: notification.isRead,
    actionUrl: notification.actionUrl,
    metadata: notification.metadata ? (notification.metadata as Record<string, unknown>) : null,
    createdAt: notification.createdAt,
  };
}

export function toActivityViewModels(notifications: Notification[]): ActivityViewModel[] {
  return notifications.map(toActivityViewModel);
}
