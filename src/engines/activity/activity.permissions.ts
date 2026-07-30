import { Notification } from "@prisma/client";

export function canAccessActivity(userId: string, notification: Notification): boolean {
  return notification.userId === userId;
}

export function canMutateActivity(userId: string, notification: Notification): boolean {
  return notification.userId === userId;
}
