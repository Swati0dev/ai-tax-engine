"use server";

import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { TaxInputs, ComparisonResult } from "@/lib/tax-calculations";
import { auth } from "@/auth";
import { z } from "zod";

const TaxInputsSchema = z.object({
  grossSalary: z.number().min(0),
  hraExemption: z.number().min(0),
  section80C: z.number().min(0),
  section80D: z.number().min(0),
  otherDeductions: z.number().min(0),
  interestOnHomeLoan: z.number().min(0),
  additionalDeductions: z.record(z.string(), z.unknown()).optional().nullable()
});

const ComparisonResultSchema = z.object({
  recommendation: z.enum(["OLD", "NEW"]),
  savings: z.number(),
  oldRegime: z.object({ totalTax: z.number() }),
  newRegime: z.object({ totalTax: z.number() })
}).passthrough();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export interface TaxAIInsight {
  insight: string;
  actionableAdvice: string[];
}

export async function generateTaxInsights(
  inputs: TaxInputs,
  results: ComparisonResult
): Promise<{ success: boolean; data?: TaxAIInsight; error?: string }> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized. Please log in to get AI insights." };
    }

    const parsedInputs = TaxInputsSchema.parse(inputs);
    const parsedResults = ComparisonResultSchema.parse(results);

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured.");
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            insight: {
              type: SchemaType.STRING,
              description: "A 2-3 sentence personalized explanation of why the recommended regime is mathematically better based on their exact deductions."
            },
            actionableAdvice: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
              description: "An array of 1-3 highly personalized, actionable tips to save more tax, focusing on specific deductions or switching regimes."
            }
          },
          required: ["insight", "actionableAdvice"]
        }
      }
    });

    const prompt = `
      You are an elite Indian Tax Advisor AI. Analyze the following user's tax profile.
      
      [User Financial Profile]
      - Gross Salary / CTC: ₹${parsedInputs.grossSalary}
      - Section 80C Deductions: ₹${parsedInputs.section80C}
      - Section 80D Deductions: ₹${parsedInputs.section80D}
      - HRA Exemption: ₹${parsedInputs.hraExemption}
      
      [Deterministic Tax Calculation]
      - Engine Recommendation: ${parsedResults.recommendation} REGIME
      - Total Tax (Old Regime): ₹${parsedResults.oldRegime.totalTax}
      - Total Tax (New Regime): ₹${parsedResults.newRegime.totalTax}
      - Projected Savings: ₹${parsedResults.savings}
      
      Provide a hyper-personalized response with:
      1. 'insight': Explaining mathematically WHY the recommended regime won based on their specific deductions (e.g. "Because your total deductions are below ₹3.75L, the New Regime's lower base rates are mathematically superior."). Keep it sharp and encouraging.
      2. 'actionableAdvice': Provide 1-3 short, powerful tips. If they are close to a threshold where the other regime becomes better, tell them exactly what to invest in (e.g., "Max out your 80C to ₹1.5L to unlock Old Regime benefits").
    `;

    const response = await model.generateContent(prompt);
    const jsonStr = response.response.text();
    const data = JSON.parse(jsonStr) as TaxAIInsight;

    return { success: true, data };
  } catch (error: unknown) {
    console.error("[Action] generateTaxInsights Error:", error);
    return { success: false, error: "Failed to generate AI insights." };
  }
}
