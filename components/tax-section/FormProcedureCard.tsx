import { FileText, ClipboardList, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FormProcedureCardProps {
  item: {
    id: string;
    slug: string;
    title: string;
    relatedForms: string[];
    filingProcedure: string[];
    category: string;
    sectionNumber: string | null;
  };
}

export function FormProcedureCard({ item }: FormProcedureCardProps) {
  const detailPath = `${item.category === "DIRECT_TAX" ? "/direct-tax" : "/indirect-tax"}/${item.slug}`;

  return (
    <div className="soft-ui-card p-6 md:p-8 rounded-3xl flex flex-col gap-6 group hover:border-primary/30 transition-all">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">
            {item.category.replace("_", " ")}
          </span>
          <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
            {item.title}
          </h3>
        </div>
        <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center">
          <FileText className="h-5 w-5 text-primary" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-2">
        {/* Related Forms */}
        <div className="space-y-4">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/50">
            <ClipboardList className="h-3.5 w-3.5" />
            Forms
          </h4>
          <div className="flex flex-wrap gap-2">
            {item.relatedForms.map((form, idx) => (
              <span key={idx} className="px-3 py-1 rounded-lg bg-muted/50 border text-xs font-bold text-foreground/70">
                {form}
              </span>
            ))}
          </div>
        </div>

        {/* Procedure Summary */}
        <div className="space-y-4">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/50">
            <ClipboardList className="h-3.5 w-3.5" />
            Key Steps
          </h4>
          <ul className="space-y-2">
            {item.filingProcedure.slice(0, 2).map((step, idx) => (
              <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-primary/40 shrink-0" />
                <span className="line-clamp-1">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-4 border-t border-dashed">
        <Button asChild variant="ghost" className="w-full justify-between group/btn rounded-xl px-4 hover:bg-primary/5">
          <Link href={detailPath}>
            <span className="text-sm font-bold">View Full Procedure</span>
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "default";
  asChild?: boolean;
}

function Button({ children, className, variant, asChild }: ButtonProps) {
  const Comp = asChild ? "span" : "button";
  return (
    <Comp className={cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      variant === "ghost" ? "hover:bg-accent hover:text-accent-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90",
      className
    )}>
      {children}
    </Comp>
  );
}
