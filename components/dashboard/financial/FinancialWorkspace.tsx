"use client";

import { useState } from "react";
import { ComparisonResult } from "@/lib/tax-calculations";
import { FinancialSnapshotWidget } from "../overview/FinancialSnapshotWidget";
import { CalculatorWidget, SavedCalculationInputs } from "./CalculatorWidget";
import { DashboardGamification } from "@/src/engines/dashboard/dashboard.types";
import { addXp } from "@/lib/gamification";
import { SavedCalculationsWidget } from "./SavedCalculationsWidget";
import { CompareCalculationsPanel } from "./CompareCalculationsPanel";
import { SavedCalculationViewModel } from "@/src/engines/calculations/calculation.types";
import { saveCalculationAction } from "@/actions/calculations";

interface FinancialWorkspaceProps {
  gamerState: DashboardGamification;
  checklistProgress: number;
  complianceHealth: number;
  dashboardChecklistLength: number;
  checkedItemsLength: number;
  completedEventsLength: number;
  initialCalculations?: SavedCalculationViewModel[];
}

export function FinancialWorkspace({
  gamerState,
  checklistProgress,
  complianceHealth,
  dashboardChecklistLength,
  checkedItemsLength,
  completedEventsLength,
  initialCalculations = []
}: FinancialWorkspaceProps) {
  const [taxResults, setTaxResults] = useState<ComparisonResult | null>(null);
  const [localGamerState, setLocalGamerState] = useState(gamerState);
  
  // History State
  const [calculations, setCalculations] = useState<SavedCalculationViewModel[]>(initialCalculations);
  const [loadedInputs, setLoadedInputs] = useState<SavedCalculationInputs | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Compare State
  const [compareMode, setCompareMode] = useState(false);
  const [calcA, setCalcA] = useState<SavedCalculationViewModel | null>(null);
  const [calcB, setCalcB] = useState<SavedCalculationViewModel | null>(null);

  const handleXpEarned = (amount: number) => {
    addXp(amount).then(newState => {
      setLocalGamerState({
        xp: newState.xp,
        level: newState.level,
        title: newState.title || "Tax Novice"
      });
    });
  };

  const handleSaveCalculation = async (inputs: SavedCalculationInputs, results: ComparisonResult) => {
    setIsSaving(true);
    try {
      const res = await saveCalculationAction({
        financialYear: "2024-25",
        inputs,
        results: {
          recommendedRegime: results.recommendation,
          taxUnderOld: results.oldRegime.totalTax,
          taxUnderNew: results.newRegime.totalTax,
          taxSavings: results.savings
        }
      });
      if (res.success && res.calculation) {
        setCalculations(prev => [res.calculation, ...prev]);
        handleXpEarned(10); // Reward for saving
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoadCalculation = (calc: SavedCalculationViewModel) => {
    setLoadedInputs(calc.inputs);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCompareRequest = (calc: SavedCalculationViewModel) => {
    if (!compareMode) {
      setCalcA(calc);
      setCompareMode(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (!calcA) setCalcA(calc);
      else if (!calcB) setCalcB(calc);
    }
  };

  const handleCloseCompare = () => {
    setCompareMode(false);
    setCalcA(null);
    setCalcB(null);
  };

  return (
    <div className="space-y-10">
      <FinancialSnapshotWidget 
        taxResults={taxResults || { savings: 0, recommendation: "NEW" }}
        gamerState={localGamerState}
        checklistProgress={checklistProgress}
        complianceHealth={complianceHealth}
        dashboardChecklistLength={dashboardChecklistLength}
        checkedItemsLength={checkedItemsLength}
        completedEventsLength={completedEventsLength}
      />
      
      {compareMode && calcA ? (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <CompareCalculationsPanel 
            calcA={calcA} 
            calcB={calcB} 
            onClose={handleCloseCompare} 
            onSelectCalcB={() => setCalcB(null)}
          />
        </div>
      ) : null}

      <div className={compareMode ? "opacity-50 pointer-events-none" : ""}>
        <CalculatorWidget 
          onXpEarned={handleXpEarned} 
          onCalculate={setTaxResults}
          loadedInputs={loadedInputs}
          onSave={handleSaveCalculation}
          isSaving={isSaving}
        />
      </div>

      <SavedCalculationsWidget 
        calculations={calculations}
        onLoad={handleLoadCalculation}
        onCompare={handleCompareRequest}
      />
    </div>
  );
}
