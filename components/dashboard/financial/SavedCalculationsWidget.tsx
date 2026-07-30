"use client";

import { useState } from "react";
import { Trash2, FileOutput, Loader2, Scale } from "lucide-react";
import { SavedCalculationViewModel } from "@/src/engines/calculations/calculation.types";
import { deleteCalculationAction } from "@/actions/calculations";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SavedCalculationsWidgetProps {
  calculations: SavedCalculationViewModel[];
  onLoad: (calc: SavedCalculationViewModel) => void;
  onCompare: (calc: SavedCalculationViewModel) => void;
}

export function SavedCalculationsWidget({ calculations, onLoad, onCompare }: SavedCalculationsWidgetProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await deleteCalculationAction(id);
    setDeletingId(null);
  };

  const displayedCalculations = calculations.slice(0, 10); // Display only top 10

  if (calculations.length === 0) {
    return (
      <Card className="rounded-[2.5rem] border-slate-100 shadow-sm bg-slate-50/50">
        <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
          <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
            <FileOutput className="h-8 w-8 text-blue-600" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold">No Saved Calculations</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              You haven&apos;t saved any tax calculations yet. Run a calculation above and click &quot;Save Calculation&quot; to compare them later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-[2.5rem] border-slate-100 shadow-xl bg-white flex flex-col h-full max-h-[600px]">
      <CardHeader className="px-8 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">History</CardTitle>
            <CardDescription>Your recent saved calculations</CardDescription>
          </div>
          <Badge variant="secondary" className="rounded-full px-4 font-semibold text-sm">
            {calculations.length} Saved
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="px-8 pb-8 flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 pr-4 -mr-4 overflow-y-auto">
          <div className="space-y-4 pb-4">
            {displayedCalculations.map((calc) => (
              <div 
                key={calc.id} 
                className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow gap-4"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">{new Date(calc.createdAt).toLocaleDateString()}</span>
                    <Badge variant="outline" className="rounded-md border-blue-200 bg-blue-50 text-blue-700">
                      FY {calc.financialYear}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-x-4 gap-y-1 flex-wrap text-sm text-muted-foreground font-medium">
                    <span>Income: ₹{calc.inputs.grossSalary.toLocaleString('en-IN')}</span>
                    <span>•</span>
                    <span>Recommended: <strong className="text-foreground">{calc.results.recommendedRegime}</strong></span>
                    <span>•</span>
                    <span className="text-emerald-600">Savings: ₹{calc.results.taxSavings.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-9 px-3 hover:bg-amber-50 hover:text-amber-600 rounded-xl"
                    onClick={() => onCompare(calc)}
                  >
                    <Scale className="h-4 w-4 mr-2" />
                    Compare
                  </Button>
                  
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="h-9 px-4 rounded-xl font-medium"
                    onClick={() => onLoad(calc)}
                  >
                    Load
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-9 w-9 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl ml-1"
                    disabled={deletingId === calc.id}
                    onClick={() => handleDelete(calc.id)}
                  >
                    {deletingId === calc.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {calculations.length > 10 && (
          <div className="pt-4 mt-2 border-t text-center">
            <Button variant="ghost" className="text-blue-600">View All {calculations.length} Calculations</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
