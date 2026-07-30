"use server";

import { auth } from "@/auth";
import { saveUserCalculation, deleteUserCalculation } from "@/src/engines/calculations/calculation.service";
import { SaveCalculationRequest } from "@/src/engines/calculations/calculation.types";
import { revalidatePath } from "next/cache";

export async function saveCalculationAction(request: SaveCalculationRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const result = await saveUserCalculation(session.user.id, request);
  revalidatePath("/dashboard");
  return { success: true, calculation: result };
}

export async function deleteCalculationAction(calculationId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const success = await deleteUserCalculation(session.user.id, calculationId);
  revalidatePath("/dashboard");
  return { success };
}
