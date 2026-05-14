"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { TaxInputs } from "@/lib/tax-calculations";

interface Props {
  inputs: TaxInputs;
  setInputs: (inputs: TaxInputs) => void;
}

export function CalculatorInputs({ inputs, setInputs }: Props) {
  const handleChange = (key: keyof TaxInputs, value: number) => {
    setInputs({ ...inputs, [key]: value });
  };

  return (
    <div className="space-y-8 p-6 bg-background/50 backdrop-blur-xl rounded-3xl border border-primary/10 shadow-xl">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-base font-bold">Gross Annual Salary</Label>
          <span className="text-primary font-mono font-bold">₹{inputs.grossSalary.toLocaleString()}</span>
        </div>
        <Slider
          value={[inputs.grossSalary]}
          max={5000000}
          step={50000}
          onValueChange={([v]) => handleChange("grossSalary", v)}
          className="py-4"
        />
        <Input 
          type="number" 
          value={inputs.grossSalary} 
          onChange={(e) => handleChange("grossSalary", Number(e.target.value))}
          className="bg-muted/30 border-primary/10 font-mono"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* HRA Exemption */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-semibold">HRA Exemption</Label>
            <span className="text-sm font-mono text-muted-foreground">₹{inputs.hraExemption.toLocaleString()}</span>
          </div>
          <Slider
            value={[inputs.hraExemption]}
            max={500000}
            step={5000}
            onValueChange={([v]) => handleChange("hraExemption", v)}
          />
        </div>

        {/* Section 80C */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-semibold">Section 80C (Max 1.5L)</Label>
            <span className="text-sm font-mono text-muted-foreground">₹{inputs.section80C.toLocaleString()}</span>
          </div>
          <Slider
            value={[inputs.section80C]}
            max={150000}
            step={5000}
            onValueChange={([v]) => handleChange("section80C", v)}
          />
        </div>

        {/* Section 80D */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-semibold">Section 80D (Health Insurance)</Label>
            <span className="text-sm font-mono text-muted-foreground">₹{inputs.section80D.toLocaleString()}</span>
          </div>
          <Slider
            value={[inputs.section80D]}
            max={100000}
            step={1000}
            onValueChange={([v]) => handleChange("section80D", v)}
          />
        </div>

        {/* Home Loan Interest */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-semibold">Home Loan Interest (24b)</Label>
            <span className="text-sm font-mono text-muted-foreground">₹{inputs.interestOnHomeLoan.toLocaleString()}</span>
          </div>
          <Slider
            value={[inputs.interestOnHomeLoan]}
            max={200000}
            step={5000}
            onValueChange={([v]) => handleChange("interestOnHomeLoan", v)}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-dashed">
        <div className="flex justify-between items-center mb-4">
          <Label className="text-sm font-semibold">Other Deductions</Label>
          <span className="text-sm font-mono text-muted-foreground">₹{inputs.otherDeductions.toLocaleString()}</span>
        </div>
        <Slider
          value={[inputs.otherDeductions]}
          max={200000}
          step={5000}
          onValueChange={([v]) => handleChange("otherDeductions", v)}
        />
      </div>
    </div>
  );
}
