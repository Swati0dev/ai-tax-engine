"use server";

import { auth } from "@/auth";
import { saveUserCalculation, deleteUserCalculation } from "@/src/engines/calculations/calculation.service";
import { SaveCalculationRequest } from "@/src/engines/calculations/calculation.types";
import { revalidatePath } from "next/cache";

import { z } from "zod";

const SaveCalculationSchema = z.object({
  financialYear: z.string().min(1),
  inputs: z.object({
    grossSalary: z.number().min(0),
    hraExemption: z.number().min(0),
    section80C: z.number().min(0),
    section80D: z.number().min(0),
    otherDeductions: z.number().min(0),
    interestOnHomeLoan: z.number().min(0),
    additionalDeductions: z.record(z.string(), z.unknown()).optional().nullable(),
  }),
  results: z.object({
    recommendedRegime: z.enum(["OLD", "NEW"]),
    taxUnderOld: z.number().min(0),
    taxUnderNew: z.number().min(0),
    taxSavings: z.number(),
  })
});

const DeleteCalculationSchema = z.string().cuid();

export async function saveCalculationAction(request: SaveCalculationRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    // Zod Validation
    const parsedData = SaveCalculationSchema.parse(request);

    // Business Logic
    const result = await saveUserCalculation(session.user.id, parsedData as SaveCalculationRequest);
    
    revalidatePath("/dashboard");
    return { success: true, calculation: result };
  } catch (error) {
    console.error("[Action] saveCalculationAction Error:", error);
    throw new Error("Something went wrong while saving the calculation. Please try again.");
  }
}

export async function deleteCalculationAction(calculationId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    // Zod Validation
    const parsedId = DeleteCalculationSchema.parse(calculationId);

    // Authorization & Business Logic (Ownership is checked inside deleteUserCalculation)
    const success = await deleteUserCalculation(session.user.id, parsedId);
    
    revalidatePath("/dashboard");
    return { success };
  } catch (error) {
    console.error("[Action] deleteCalculationAction Error:", error);
    throw new Error("Something went wrong while deleting the calculation. Please try again.");
  }
}
