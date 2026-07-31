import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description: React.ReactNode;
}

interface StepListProps {
  steps: Step[];
  className?: string;
}

export function StepList({ steps, className }: StepListProps) {
  return (
    <div className={cn("relative my-12", className)}>
      {/* Vertical line connector */}
      <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border/50" />
      
      <div className="space-y-12 relative">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-8 relative">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-md z-10 border-4 border-background">
              {index + 1}
            </div>
            <div className="flex-1 pt-1">
              <h4 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h4>
              <div className="text-muted-foreground leading-relaxed text-lg">
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
