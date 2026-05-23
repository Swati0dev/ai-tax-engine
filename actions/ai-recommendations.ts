"use server";

import { GoogleGenerativeAI, Type } from "@google/generative-ai";
import { TaxInputs, TaxComparisonResult } from "@/lib/tax-calculations";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export interface TaxAIInsight {
  insight: string;
  actionableAdvice: string[];
}

export async function generateTaxInsights(
  inputs: TaxInputs,
  results: TaxComparisonResult
): Promise<{ success: boolean; data?: TaxAIInsight; error?: string }> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured.");
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insight: {
              type: Type.STRING,
              description: "A 2-3 sentence personalized explanation of why the recommended regime is mathematically better based on their exact deductions."
            },
            actionableAdvice: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
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
      - Gross Salary / CTC: ₹${inputs.grossSalary}
      - Section 80C Deductions: ₹${inputs.section80C}
      - Section 80D Deductions: ₹${inputs.section80D}
      - HRA Exemption: ₹${inputs.hraExemption}
      
      [Deterministic Tax Calculation]
      - Engine Recommendation: ${results.recommendation} REGIME
      - Total Tax (Old Regime): ₹${results.oldRegime.totalTax}
      - Total Tax (New Regime): ₹${results.newRegime.totalTax}
      - Projected Savings: ₹${results.savings}
      
      Provide a hyper-personalized response with:
      1. 'insight': Explaining mathematically WHY the recommended regime won based on their specific deductions (e.g. "Because your total deductions are below ₹3.75L, the New Regime's lower base rates are mathematically superior."). Keep it sharp and encouraging.
      2. 'actionableAdvice': Provide 1-3 short, powerful tips. If they are close to a threshold where the other regime becomes better, tell them exactly what to invest in (e.g., "Max out your 80C to ₹1.5L to unlock Old Regime benefits").
    `;

    const response = await model.generateContent(prompt);
    const jsonStr = response.response.text();
    const data = JSON.parse(jsonStr) as TaxAIInsight;

    return { success: true, data };
  } catch (error: any) {
    console.error("AI Insights Error:", error);
    return { success: false, error: error.message || "Failed to generate AI insights." };
  }
}
