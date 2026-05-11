import { ChatInterface } from "@/components/chat/ChatInterface";

export default function ChatPage() {
  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-4rem)] bg-muted/5 py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <ChatInterface />
      </div>
    </div>
  );
}
