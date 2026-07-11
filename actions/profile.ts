"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export type UserProfileData = {
  occupation?: string;
  businessStatus?: string;
  ageBracket?: string;
  annualIncomeEstimate?: string;
  filingExperience?: string;
  state?: string;
  taxGoals?: string[];
  guidanceLevel?: string;
  existingRegistrations?: string[];
  preferredLanguage?: string;
};

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
    console.error("Failed to get user profile", error);
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

    // Check if profile exists
    const existing = await prisma.userProfile.findUnique({
      where: { userId }
    });

    if (existing) {
      // Update existing
      await prisma.userProfile.update({
        where: { userId },
        data
      });
    } else {
      // Create new
      await prisma.userProfile.create({
        data: {
          ...data,
          user: { connect: { id: userId } }
        }
      });
    }

    return { success: true, message: "Profile saved successfully" };
  } catch (error) {
    console.error("Failed to save user profile", error);
    return { success: false, message: "Server error" };
  }
}
