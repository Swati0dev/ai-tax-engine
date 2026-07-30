"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { getUserProgress } from "./gamification";

export async function getCompletedComplianceDocs() {
  const session = await auth();
  if (!session?.user?.id) return [];

  const progress = await prisma.userProgress.findUnique({
    where: { userId: session.user.id },
    select: { completedDocs: true }
  });

  return progress?.completedDocs || [];
}

export async function toggleComplianceDoc(docId: string, isCompleted: boolean) {
  const session = await auth();
  if (!session?.user?.id) return false;

  // Ensure progress exists
  const progress = await getUserProgress();
  if (!progress) return false;

  let newDocs = [...progress.completedDocs];
  if (isCompleted) {
    if (!newDocs.includes(docId)) {
      newDocs.push(docId);
    }
  } else {
    newDocs = newDocs.filter(id => id !== docId);
  }

  await prisma.userProgress.update({
    where: { userId: session.user.id },
    data: {
      completedDocs: newDocs
    }
  });

  return true;
}
