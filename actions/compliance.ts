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

import { updateComplianceEventStatus, createCustomComplianceEvent } from '@/src/engines/compliance/compliance.service';
import { ComplianceStatus, ComplianceEventType, CompliancePriority } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { CreateComplianceEventRequest } from '@/src/engines/compliance/compliance.types';

export async function updateComplianceEventStatusAction(eventId: string, status: ComplianceStatus) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

  try {
    const updated = await updateComplianceEventStatus(session.user.id, eventId, status);
    revalidatePath('/dashboard');
    return { success: true, data: updated };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function createCustomEventAction(request: CreateComplianceEventRequest) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

  try {
    const created = await createCustomComplianceEvent(session.user.id, request);
    revalidatePath('/dashboard');
    return { success: true, data: created };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

