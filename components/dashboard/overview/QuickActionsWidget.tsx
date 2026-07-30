import Link from "next/link";
import { SectionHeader } from "../shared/SectionHeader";

export function QuickActionsWidget() {
  return (
    <section className="space-y-4">
      <SectionHeader title="Quick Action Slabs" />
      <div className="grid grid-cols-2 gap-4">
        <Link
          href="/calculators/hra-calculator"
          className="p-4 bg-white border border-primary/5 rounded-3xl hover:border-primary/20 hover:shadow-md transition-all text-center space-y-1 block"
        >
          <span className="text-[10px] font-black text-accent uppercase tracking-widest block">Rent Allowance</span>
          <span className="text-xs font-bold text-foreground">HRA Calculator</span>
        </Link>
        <Link
          href="/calculators/gst-calculator"
          className="p-4 bg-white border border-primary/5 rounded-3xl hover:border-primary/20 hover:shadow-md transition-all text-center space-y-1 block"
        >
          <span className="text-[10px] font-black text-accent uppercase tracking-widest block">Indirect Taxes</span>
          <span className="text-xs font-bold text-foreground">GST Calculator</span>
        </Link>
        <Link
          href="/calculators/salary-breakdown"
          className="p-4 bg-white border border-primary/5 rounded-3xl hover:border-primary/20 hover:shadow-md transition-all text-center space-y-1 block"
        >
          <span className="text-[10px] font-black text-accent uppercase tracking-widest block">CTC Analysis</span>
          <span className="text-xs font-bold text-foreground">Salary Breakdown</span>
        </Link>
        <Link
          href="/compliance"
          className="p-4 bg-white border border-primary/5 rounded-3xl hover:border-primary/20 hover:shadow-md transition-all text-center space-y-1 block"
        >
          <span className="text-[10px] font-black text-accent uppercase tracking-widest block">Late Fees</span>
          <span className="text-xs font-bold text-foreground">Compliance Center</span>
        </Link>
      </div>
    </section>
  );
}
