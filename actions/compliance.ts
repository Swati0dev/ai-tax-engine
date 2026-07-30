"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { getUserProgress } from "./gamification";
import { ComplianceStatus, ComplianceEventType, CompliancePriority } from '@prisma/client';
import { z } from "zod";

const DocIdSchema = z.string().min(1);
const EventIdSchema = z.string().cuid();
const StatusSchema = z.nativeEnum(ComplianceStatus);

const CreateComplianceEventSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional().nullable(),
  dueDate: z.date(),
  eventType: z.nativeEnum(ComplianceEventType),
  priority: z.nativeEnum(CompliancePriority).optional(),
  reminderAt: z.date().optional()
});

export async function getCompletedComplianceDocs() {
  try {
    const session = await auth();
    if (!session?.user?.id) return [];

    const progress = await prisma.userProgress.findUnique({
      where: { userId: session.user.id },
      select: { completedDocs: true }
    });

    return progress?.completedDocs || [];
  } catch (error) {
    console.error("[Action] getCompletedComplianceDocs Error:", error);
    return [];
  }
}

export async function toggleComplianceDoc(docId: string, isCompleted: boolean) {
  try {
    const session = await auth();
    if (!session?.user?.id) return false;

    const parsedDocId = DocIdSchema.parse(docId);
    const parsedIsCompleted = z.boolean().parse(isCompleted);

    // Ensure progress exists
    const progress = await getUserProgress();
    if (!progress) return false;

    let newDocs = [...progress.completedDocs];
    if (parsedIsCompleted) {
      if (!newDocs.includes(parsedDocId)) {
        newDocs.push(parsedDocId);
      }
    } else {
      newDocs = newDocs.filter(id => id !== parsedDocId);
    }

    await prisma.userProgress.update({
      where: { userId: session.user.id },
      data: {
        completedDocs: newDocs
      }
    });

    return true;
  } catch (error) {
    console.error("[Action] toggleComplianceDoc Error:", error);
    return false;
  }
}

import { updateComplianceEventStatus, createCustomComplianceEvent } from '@/src/engines/compliance/compliance.service';
import { revalidatePath } from 'next/cache';
import { CreateComplianceEventRequest } from '@/src/engines/compliance/compliance.types';

export async function updateComplianceEventStatusAction(eventId: string, status: ComplianceStatus) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized. Please log in." };
    }

    const parsedId = EventIdSchema.parse(eventId);
    const parsedStatus = StatusSchema.parse(status) as ComplianceStatus;

    // Authorization & Ownership verified in service
    const updated = await updateComplianceEventStatus(session.user.id, parsedId, parsedStatus);
    revalidatePath('/dashboard');
    return { success: true, data: updated };
  } catch (error) {
    console.error("[Action] updateComplianceEventStatusAction Error:", error);
    return { success: false, error: "Failed to update compliance event status." };
  }
}

export async function createCustomEventAction(request: CreateComplianceEventRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized. Please log in." };
    }

    const parsedRequest = CreateComplianceEventSchema.parse(request) as CreateComplianceEventRequest;

    const created = await createCustomComplianceEvent(session.user.id, parsedRequest);
    revalidatePath('/dashboard');
    return { success: true, data: created };
  } catch (error) {
    console.error("[Action] createCustomEventAction Error:", error);
    return { success: false, error: "Failed to create custom compliance event." };
  }
}

