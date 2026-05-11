import { MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChatPlaceholder() {
  return (
    <section className="flex flex-col flex-1 justify-center items-center text-center p-8">
      <div className="mb-12 relative">
        <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full -z-10 transform scale-150" />
        <div className="icon-box h-24 w-24 bg-primary text-primary-foreground border-primary shadow-xl shadow-primary/20">
          <MessageSquareText className="h-10 w-10" aria-hidden="true" />
        </div>
      </div>
      
      <div className="max-w-2xl space-y-6 mb-12">
        <h2 className="text-4xl font-extrabold tracking-tight">AI Tax Assistant <span className="text-muted-foreground/40">is coming.</span></h2>
        <p className="text-lg text-muted-foreground leading-relaxed font-medium">
          The foundation is ready. In Phase 6, we will integrate source-grounded AI search to provide accurate, lawful answers to your natural language questions.
        </p>
      </div>

      <div className="w-full max-w-xl p-2 rounded-2xl bg-white shadow-inner border flex items-center gap-2 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
        <div className="flex-1 px-4 text-sm text-muted-foreground text-left font-medium">
          Chat input will be enabled in Phase 6...
        </div>
        <Button disabled size="lg" className="rounded-xl px-8 opacity-50 bg-primary/20 text-primary-foreground border border-primary/30">
          Ask Later
        </Button>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left w-full max-w-3xl">
        <div className="soft-ui-card p-6 bg-primary/5 border-primary/10 hover:border-primary/20">
          <h4 className="text-sm font-bold text-primary mb-2 uppercase tracking-wider">Future Capability</h4>
          <p className="text-xs text-muted-foreground leading-relaxed font-medium">Natural language interpretation of Indian Tax sections and GST notifications.</p>
        </div>
        <div className="soft-ui-card p-6 bg-white">
          <h4 className="text-sm font-bold text-primary mb-2 uppercase tracking-wider">Source Grounding</h4>
          <p className="text-xs text-muted-foreground leading-relaxed font-medium">Every chat response will cite official PDF circulars and government links.</p>
        </div>
      </div>
    </section>
  );
}
