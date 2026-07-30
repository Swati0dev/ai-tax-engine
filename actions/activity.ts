"use server";

import { markAsRead, markAllAsRead } from "@/src/engines/activity/activity.service";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

import { z } from "zod";

const ActivityIdSchema = z.string().cuid();

export async function markActivityAsReadAction(activityId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    const parsedId = ActivityIdSchema.parse(activityId);
    const updated = await markAsRead(session.user.id, parsedId);
    revalidatePath("/dashboard");
    return { success: true, data: updated };
  } catch (error) {
    console.error("[Action] markActivityAsReadAction Error:", error);
    return { success: false, error: "Failed to mark activity as read." };
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
    console.error("[Action] markAllActivitiesAsReadAction Error:", error);
    return { success: false, error: "Failed to mark all activities as read." };
  }
}
