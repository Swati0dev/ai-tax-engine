import { SavedCalculation, TaxRegime } from "@prisma/client";
import { SavedCalculationViewModel } from "./calculation.types";

export function toSavedCalculationViewModel(entity: SavedCalculation): SavedCalculationViewModel {
  return {
    id: entity.id,
    financialYear: entity.financialYear,
    engineVersion: entity.engineVersion,
    createdAt: entity.createdAt,
    inputs: {
      grossSalary: entity.grossSalary,
      hraExemption: entity.hraExemption,
      section80C: entity.section80C,
      section80D: entity.section80D,
      otherDeductions: entity.otherDeductions,
      interestOnHomeLoan: entity.interestOnHomeLoan,
      additionalDeductions: entity.additionalDeductions ? JSON.parse(JSON.stringify(entity.additionalDeductions)) : undefined,
    },
    results: {
      recommendedRegime: entity.recommendedRegime,
      taxUnderOld: entity.taxUnderOld,
      taxUnderNew: entity.taxUnderNew,
      taxSavings: entity.taxSavings,
    },
  };
}
