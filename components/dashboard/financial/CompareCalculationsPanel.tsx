import { SavedCalculationViewModel } from "@/src/engines/calculations/calculation.types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CompareCalculationsPanelProps {
  calcA: SavedCalculationViewModel;
  calcB: SavedCalculationViewModel | null;
  onClose: () => void;
  onSelectCalcB: () => void;
}

export function CompareCalculationsPanel({ calcA, calcB, onClose, onSelectCalcB }: CompareCalculationsPanelProps) {
  return (
    <Card className="rounded-[2.5rem] border-blue-100 shadow-xl overflow-hidden bg-gradient-to-br from-blue-50/50 to-indigo-50/50 relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-6 right-6 h-8 w-8 rounded-full bg-white/50 hover:bg-white text-slate-500 hover:text-slate-900"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>

      <CardHeader className="px-8 pt-8 pb-4">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Activity className="h-6 w-6 text-blue-600" />
          Compare Calculations
        </CardTitle>
        <CardDescription>
          Analyzing differences between saved scenarios
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-8 pb-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          
          {/* calcA Column */}
          <div className="bg-white rounded-3xl p-6 border shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h4 className="font-bold text-lg text-slate-800">Scenario A</h4>
                <p className="text-xs text-muted-foreground">{new Date(calcA.createdAt).toLocaleDateString()}</p>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">FY {calcA.financialYear}</Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Gross Salary</span>
                <span className="font-semibold">₹{calcA.inputs.grossSalary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">80C + 80D + HRA</span>
                <span className="font-semibold text-emerald-600">
                  - ₹{(calcA.inputs.section80C + calcA.inputs.section80D + calcA.inputs.hraExemption).toLocaleString()}
                </span>
              </div>
              <div className="pt-2 border-t flex justify-between font-bold text-sm">
                <span>Tax ({calcA.results.recommendedRegime})</span>
                <span className="text-red-600">
                  ₹{(calcA.results.recommendedRegime === "OLD" ? calcA.results.taxUnderOld : calcA.results.taxUnderNew).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          
          {/* calcB Column */}
          <div className="bg-white rounded-3xl p-6 border border-dashed border-slate-300 shadow-sm space-y-4 flex flex-col justify-center">
            {calcB ? (
              <>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h4 className="font-bold text-lg text-slate-800">Scenario B</h4>
                    <p className="text-xs text-muted-foreground">{new Date(calcB.createdAt).toLocaleDateString()}</p>
                  </div>
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-700">FY {calcB.financialYear}</Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Gross Salary</span>
                    <span className="font-semibold">₹{calcB.inputs.grossSalary.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">80C + 80D + HRA</span>
                    <span className="font-semibold text-emerald-600">
                      - ₹{(calcB.inputs.section80C + calcB.inputs.section80D + calcB.inputs.hraExemption).toLocaleString()}
                    </span>
                  </div>
                  <div className="pt-2 border-t flex justify-between font-bold text-sm">
                    <span>Tax ({calcB.results.recommendedRegime})</span>
                    <span className="text-red-600">
                      ₹{(calcB.results.recommendedRegime === "OLD" ? calcB.results.taxUnderOld : calcB.results.taxUnderNew).toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="pt-4 text-center mt-auto">
                  <Button variant="outline" size="sm" onClick={onSelectCalcB} className="rounded-xl w-full">Change Scenario</Button>
                </div>
              </>
            ) : (
              <div className="text-center space-y-3 py-6">
                <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                  <Activity className="h-6 w-6 text-slate-400" />
                </div>
                <h4 className="font-bold text-slate-700">Select another scenario</h4>
                <p className="text-sm text-muted-foreground">Choose a calculation from your history below to compare</p>
              </div>
            )}
          </div>
          
          {/* Arrow / VS divider (hidden on mobile, absolute center on desktop) */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 bg-white shadow-md border rounded-full items-center justify-center z-10">
            <span className="text-xs font-black text-slate-400">VS</span>
          </div>
        </div>
        
        {/* Difference Summary */}
        {calcB && (
          <div className="bg-indigo-600 text-white p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div>
              <h4 className="font-bold text-indigo-100 uppercase text-xs tracking-widest">Tax Difference</h4>
              <p className="text-xl font-bold mt-1">
                {Math.abs(
                  (calcA.results.recommendedRegime === "OLD" ? calcA.results.taxUnderOld : calcA.results.taxUnderNew) - 
                  (calcB.results.recommendedRegime === "OLD" ? calcB.results.taxUnderOld : calcB.results.taxUnderNew)
                ).toLocaleString('en-IN')} INR
              </p>
            </div>
            <div className="text-right">
              <span className="text-indigo-200 text-sm block">Scenario A is</span>
              <span className="font-bold">
                {(calcA.results.recommendedRegime === "OLD" ? calcA.results.taxUnderOld : calcA.results.taxUnderNew) > 
                 (calcB.results.recommendedRegime === "OLD" ? calcB.results.taxUnderOld : calcB.results.taxUnderNew) ? "More Expensive" : "Cheaper"}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
