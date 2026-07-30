"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { z } from "zod";

const UserProfileSchema = z.object({
  occupation: z.string().optional(),
  businessStatus: z.string().optional(),
  ageBracket: z.string().optional(),
  annualIncomeEstimate: z.string().optional(),
  filingExperience: z.string().optional(),
  state: z.string().optional(),
  taxGoals: z.array(z.string()).optional(),
  guidanceLevel: z.string().optional(),
  existingRegistrations: z.array(z.string()).optional(),
  preferredLanguage: z.string().optional(),
});

export type UserProfileData = z.infer<typeof UserProfileSchema>;


export async function getUserProfile() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return { success: false, data: null, message: "Not authenticated" };
    }

    const profile = await prisma.userProfile.findUnique({
      where: { userId: session.user.id }
    });

    return { success: true, data: profile };
  } catch (error) {
    console.error("[Action] getUserProfile Error:", error);
    return { success: false, data: null, message: "Server error" };
  }
}

export async function saveUserProfile(data: UserProfileData) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return { success: false, message: "Not authenticated" };
    }

    const userId = session.user.id;
    const parsedData = UserProfileSchema.parse(data);

    // Check if profile exists
    const existing = await prisma.userProfile.findUnique({
      where: { userId }
    });

    if (existing) {
      // Update existing
      await prisma.userProfile.update({
        where: { userId },
        data: parsedData
      });
    } else {
      // Create new
      await prisma.userProfile.create({
        data: {
          ...parsedData,
          user: { connect: { id: userId } }
        }
      });
    }

    return { success: true, message: "Profile saved successfully" };
  } catch (error) {
    console.error("[Action] saveUserProfile Error:", error);
    return { success: false, message: "Server error" };
  }
}
