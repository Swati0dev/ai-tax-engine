"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface InvestmentData {
  epf: number;
  ppf: number;
  elss: number;
  lic: number;
  tuition: number;
  homeLoanPrincipal: number;
  ssy: number;
  taxSavingFD: number;
}

interface Props {
  data: InvestmentData;
  setData: (data: InvestmentData) => void;
}

const categories = [
  { id: "epf", label: "EPF (Provident Fund)", tooltip: "Employee contribution to PF, usually deducted from salary." },
  { id: "ppf", label: "PPF (Public Provident Fund)", tooltip: "Government-backed long term savings scheme (15 year lock-in)." },
  { id: "elss", label: "ELSS (Tax Saving Mutual Funds)", tooltip: "Equity-linked savings schemes with 3-year lock-in." },
  { id: "lic", label: "LIC / Life Insurance Premium", tooltip: "Premiums paid for self, spouse, or children." },
  { id: "tuition", label: "Children's Tuition Fees", tooltip: "Full-time education fees for up to 2 children." },
  { id: "homeLoanPrincipal", label: "Home Loan Principal", tooltip: "The principal repayment part of your home loan EMI." },
  { id: "ssy", label: "Sukanya Samriddhi Yojana", tooltip: "Small deposit scheme for the girl child." },
  { id: "taxSavingFD", label: "5-Year Tax Saving FD", tooltip: "Fixed deposits with a mandatory 5-year lock-in period." },
];

export function InvestmentChecklist({ data, setData }: Props) {
  const handleChange = (id: string, value: string) => {
    const numValue = value === "" ? 0 : Math.max(0, parseInt(value) || 0);
    setData({ ...data, [id]: numValue });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-background/40 backdrop-blur-xl rounded-[2.5rem] border border-primary/10 shadow-2xl">
      <TooltipProvider>
        {categories.map((cat) => (
          <div key={cat.id} className="space-y-2 group">
            <div className="flex items-center gap-2">
              <Label htmlFor={cat.id} className="text-sm font-bold text-foreground/80 group-focus-within:text-primary transition-colors">
                {cat.label}
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help hover:text-primary transition-colors" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px] text-xs">
                  {cat.tooltip}
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono font-bold text-sm">₹</span>
              <Input
                id={cat.id}
                type="number"
                placeholder="0"
                value={data[cat.id as keyof InvestmentData] || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(cat.id, e.target.value)}
                className="pl-8 bg-white/50 border-primary/5 focus:border-primary/30 rounded-xl font-mono font-bold text-lg transition-all shadow-inner"
              />
            </div>
          </div>
        ))}
      </TooltipProvider>
    </div>
  );
}
