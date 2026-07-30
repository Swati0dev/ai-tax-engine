"use client";

import { useState } from "react";
import { ComparisonResult } from "@/lib/tax-calculations";
import { FinancialSnapshotWidget } from "../overview/FinancialSnapshotWidget";
import { CalculatorWidget } from "./CalculatorWidget";
import { DashboardGamification } from "@/src/engines/dashboard/dashboard.types";
import { addXp } from "@/lib/gamification";

interface FinancialWorkspaceProps {
  gamerState: DashboardGamification;
  checklistProgress: number;
  complianceHealth: number;
  dashboardChecklistLength: number;
  checkedItemsLength: number;
  completedEventsLength: number;
}

export function FinancialWorkspace({
  gamerState,
  checklistProgress,
  complianceHealth,
  dashboardChecklistLength,
  checkedItemsLength,
  completedEventsLength
}: FinancialWorkspaceProps) {
  const [taxResults, setTaxResults] = useState<ComparisonResult | null>(null);
  const [localGamerState, setLocalGamerState] = useState(gamerState);

  const handleXpEarned = (amount: number) => {
    addXp(amount).then(newState => {
      setLocalGamerState({
        xp: newState.xp,
        level: newState.level,
        title: newState.title || "Tax Novice"
      });
    });
  };

  return (
    <>
      <FinancialSnapshotWidget 
        taxResults={taxResults || { savings: 0, recommendation: "NEW" }}
        gamerState={localGamerState}
        checklistProgress={checklistProgress}
        complianceHealth={complianceHealth}
        dashboardChecklistLength={dashboardChecklistLength}
        checkedItemsLength={checkedItemsLength}
        completedEventsLength={completedEventsLength}
      />
      
      {/* We render the calculator in the standard flow but lift its state to the snapshot */}
      <CalculatorWidget onXpEarned={handleXpEarned} onCalculate={setTaxResults} />
    </>
  );
}
