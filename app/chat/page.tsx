import { ChatInterface } from "@/components/chat/ChatInterface";

export default function ChatPage() {
  return (
    <div className="w-full h-[calc(100vh-18rem)] min-h-[650px] bg-muted/5 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full h-full max-w-7xl">
        <ChatInterface />
      </div>
    </div>
  );
}

