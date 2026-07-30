import { prisma } from "@/lib/db";
import { ChatViewModel } from "./chat.types";
import { toChatViewModels } from "./chat.mapper";

export async function getUserRecentChats(userId: string, limit: number = 3): Promise<ChatViewModel[]> {
  try {
    const conversations = await prisma.chatConversation.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: limit,
    });
    return toChatViewModels(conversations);
  } catch (error) {
    console.error("[Chat Engine] Error fetching recent chats:", error);
    return [];
  }
}
