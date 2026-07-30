import { redirect } from "next/navigation";
import { getUserActivities } from "@/src/engines/activity/activity.service";
import { auth } from "@/auth";
import NotificationsClientPage from "./NotificationsClientPage";

export default async function NotificationsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const activities = await getUserActivities(session.user.id);

  return <NotificationsClientPage initialActivities={activities} />;
}
