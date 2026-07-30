"use server";

import { markAsRead, markAllAsRead } from "@/src/engines/activity/activity.service";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function markActivityAsReadAction(activityId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    const updated = await markAsRead(session.user.id, activityId);
    revalidatePath("/dashboard");
    return { success: true, data: updated };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function markAllActivitiesAsReadAction() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    await markAllAsRead(session.user.id);
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
