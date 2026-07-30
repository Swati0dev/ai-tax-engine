import { TaxRegime } from "@prisma/client";

export interface SavedCalculationViewModel {
  id: string;
  financialYear: string;
  engineVersion: string;
  createdAt: Date;
  
  inputs: {
    grossSalary: number;
    hraExemption: number;
    section80C: number;
    section80D: number;
    otherDeductions: number;
    interestOnHomeLoan: number;
    additionalDeductions?: Record<string, unknown>;
  };

  results: {
    recommendedRegime: TaxRegime;
    taxUnderOld: number;
    taxUnderNew: number;
    taxSavings: number;
  };
}

export type SaveCalculationRequest = Omit<SavedCalculationViewModel, "id" | "createdAt" | "engineVersion">;
