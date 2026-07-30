"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { z } from "zod";

const XpSchema = z.number().min(0);
const DocsSchema = z.array(z.string().min(1));

export async function getUserProgress() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return null;
    }

    const progress = await prisma.userProgress.findUnique({
      where: { userId: session.user.id }
    });

    if (!progress) {
      // Create default progress for a new user
      return await prisma.userProgress.create({
        data: {
          userId: session.user.id,
          xp: 0,
          level: 1,
          title: "Tax Novice",
          completedDocs: [],
          checkInDates: [],
        }
      });
    }

    return progress;
  } catch (error) {
    console.error("[Action] getUserProgress Error:", error);
    return null;
  }
}

export async function syncLocalProgress(localXp: number, completedDocs: string[]) {
  try {
    const session = await auth();
    if (!session?.user?.id) return null;

    const parsedXp = XpSchema.parse(localXp);
    const parsedDocs = DocsSchema.parse(completedDocs);

    const progress = await getUserProgress();
    if (!progress) return null;

    // Only merge if DB xp is less than local and they just joined, 
    // or if we simply want to preserve the max. Let's preserve max.
    const finalXp = Math.max(progress.xp, parsedXp);
    
    // Merge arrays uniquely
    const finalDocs = Array.from(new Set([...progress.completedDocs, ...parsedDocs]));

    if (finalXp > progress.xp || finalDocs.length > progress.completedDocs.length) {
      let newLevel = 1;
      let newTitle = "Tax Novice";
      
      if (finalXp >= 1000) { newLevel = 5; newTitle = "Tax Master"; }
      else if (finalXp >= 500) { newLevel = 4; newTitle = "Tax Pro"; }
      else if (finalXp >= 250) { newLevel = 3; newTitle = "Tax Explorer"; }
      else if (finalXp >= 100) { newLevel = 2; newTitle = "Tax Learner"; }

      return await prisma.userProgress.update({
        where: { userId: session.user.id },
        data: {
          xp: finalXp,
          level: newLevel,
          title: newTitle,
          completedDocs: finalDocs
        }
      });
    }

    return progress;
  } catch (error) {
    console.error("[Action] syncLocalProgress Error:", error);
    return null;
  }
}

export async function addExperiencePoints(amount: number) {
  try {
    const session = await auth();
    if (!session?.user?.id) return null;

    const parsedAmount = XpSchema.parse(amount);

    const progress = await getUserProgress();
    if (!progress) return null;

    const newXp = progress.xp + parsedAmount;
    let newLevel = progress.level;
    let newTitle = progress.title;

    if (newXp >= 1000) { newLevel = 5; newTitle = "Tax Master"; }
    else if (newXp >= 500) { newLevel = 4; newTitle = "Tax Pro"; }
    else if (newXp >= 250) { newLevel = 3; newTitle = "Tax Explorer"; }
    else if (newXp >= 100) { newLevel = 2; newTitle = "Tax Learner"; }

    return await prisma.userProgress.update({
      where: { userId: session.user.id },
      data: {
        xp: newXp,
        level: newLevel,
        title: newTitle,
      }
    });
  } catch (error) {
    console.error("[Action] addExperiencePoints Error:", error);
    return null;
  }
}
