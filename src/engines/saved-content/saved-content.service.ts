import { prisma } from "@/lib/db";
import { SavedContentViewModel } from "./saved-content.types";
import { toSavedContentViewModels } from "./saved-content.mapper";
import { SavedContentType } from "@prisma/client";

export async function getUserSavedContent(userId: string, limit: number = 3): Promise<SavedContentViewModel[]> {
  try {
    const contents = await prisma.savedContent.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: limit,
    });
    return toSavedContentViewModels(contents);
  } catch (error) {
    console.error("[Saved Content Engine] Error fetching saved content:", error);
    return [];
  }
}

export async function saveContent(userId: string, type: SavedContentType, title: string, description?: string, referenceId?: string, tags: string[] = []): Promise<SavedContentViewModel | null> {
  try {
    const content = await prisma.savedContent.create({
      data: {
        userId,
        type,
        title,
        description,
        referenceId,
        tags,
      },
    });
    return toSavedContentViewModels([content])[0];
  } catch (error) {
    console.error("[Saved Content Engine] Error saving content:", error);
    return null;
  }
}
