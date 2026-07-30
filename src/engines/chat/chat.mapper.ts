import { ChatConversation } from "@prisma/client";
import { ChatViewModel } from "./chat.types";

export function toChatViewModel(conversation: ChatConversation): ChatViewModel {
  return {
    id: conversation.id,
    title: conversation.title,
    timestamp: conversation.createdAt.toISOString(),
  };
}

export function toChatViewModels(conversations: ChatConversation[]): ChatViewModel[] {
  return conversations.map(toChatViewModel);
}
