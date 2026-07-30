import { prisma } from "@/lib/db";
import { SaveCalculationRequest, SavedCalculationViewModel } from "./calculation.types";
import { toSavedCalculationViewModel } from "./calculation.mapper";

export async function saveUserCalculation(
  userId: string,
  request: SaveCalculationRequest
): Promise<SavedCalculationViewModel> {
  // Prevent duplicate saves
  const existing = await prisma.savedCalculation.findFirst({
    where: {
      userId,
      financialYear: request.financialYear,
      engineVersion: "1.0.0",
      grossSalary: request.inputs.grossSalary,
      hraExemption: request.inputs.hraExemption,
      section80C: request.inputs.section80C,
      section80D: request.inputs.section80D,
      otherDeductions: request.inputs.otherDeductions,
      interestOnHomeLoan: request.inputs.interestOnHomeLoan,
      recommendedRegime: request.results.recommendedRegime,
    }
  });

  if (existing) {
    return toSavedCalculationViewModel(existing);
  }

  const entity = await prisma.savedCalculation.create({
    data: {
      userId,
      financialYear: request.financialYear,
      engineVersion: "1.0.0", // Hardcoded for now
      grossSalary: request.inputs.grossSalary,
      hraExemption: request.inputs.hraExemption,
      section80C: request.inputs.section80C,
      section80D: request.inputs.section80D,
      otherDeductions: request.inputs.otherDeductions,
      interestOnHomeLoan: request.inputs.interestOnHomeLoan,
      additionalDeductions: request.inputs.additionalDeductions ? JSON.parse(JSON.stringify(request.inputs.additionalDeductions)) : null,
      
      recommendedRegime: request.results.recommendedRegime,
      taxUnderOld: request.results.taxUnderOld,
      taxUnderNew: request.results.taxUnderNew,
      taxSavings: request.results.taxSavings,
    },
  });

  return toSavedCalculationViewModel(entity);
}

export async function getUserCalculations(userId: string): Promise<SavedCalculationViewModel[]> {
  const calculations = await prisma.savedCalculation.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return calculations.map(toSavedCalculationViewModel);
}

export async function deleteUserCalculation(userId: string, calculationId: string): Promise<boolean> {
  try {
    const result = await prisma.savedCalculation.deleteMany({
      where: {
        id: calculationId,
        userId: userId, // Ensure user owns it
      },
    });
    return result.count > 0;
  } catch (error) {
    console.error("Failed to delete calculation", error);
    return false;
  }
}
