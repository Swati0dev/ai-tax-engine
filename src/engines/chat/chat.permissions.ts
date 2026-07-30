import { ChatConversation } from "@prisma/client";

export function canAccessChat(userId: string, conversation: ChatConversation): boolean {
  return conversation.userId === userId;
}
