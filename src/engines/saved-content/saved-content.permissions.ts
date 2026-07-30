import { SavedContent } from "@prisma/client";

export function canAccessSavedContent(userId: string, content: SavedContent): boolean {
  return content.userId === userId;
}
