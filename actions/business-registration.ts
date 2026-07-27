"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export type RegistrationAnswers = {
  founders: "solo" | "multiple";
  funding: "yes" | "no";
  liability: "limited" | "dont_care";
  scale: "local" | "national_global";
  priority: "compliance" | "credibility";
  employees: "yes" | "no";
  foreignClients: "yes" | "no";
};

export type EntityType = "Sole Proprietorship" | "Partnership" | "LLP" | "Private Limited Company" | "One Person Company (OPC)";

// Deterministic Scoring Engine
export async function calculateBestEntity(answers: RegistrationAnswers): Promise<{ recommended: EntityType; scores: Record<EntityType, number> }> {
  const scores: Record<EntityType, number> = {
    "Sole Proprietorship": 0,
    "Partnership": 0,
    "LLP": 0,
    "Private Limited Company": 0,
    "One Person Company (OPC)": 0,
  };

  // 1. Founders
  if (answers.founders === "solo") {
    scores["Sole Proprietorship"] += 10;
    scores["One Person Company (OPC)"] += 10;
    scores["Partnership"] -= 100; // Impossible
    scores["LLP"] -= 100; // Impossible
    scores["Private Limited Company"] -= 100; // Impossible (requires 2 directors)
  } else {
    scores["Partnership"] += 10;
    scores["LLP"] += 10;
    scores["Private Limited Company"] += 10;
    scores["Sole Proprietorship"] -= 100; // Impossible
    scores["One Person Company (OPC)"] -= 100; // Impossible
  }

  // 2. Funding
  if (answers.funding === "yes") {
    scores["Private Limited Company"] += 25; // Investors prefer this
    scores["LLP"] += 5; // Possible but harder
    scores["Partnership"] -= 20; // Investors hate this
    scores["Sole Proprietorship"] -= 20; // Impossible to give equity
    scores["One Person Company (OPC)"] -= 10; // Hard to dilute
  }

  // 3. Liability
  if (answers.liability === "limited") {
    scores["LLP"] += 15;
    scores["Private Limited Company"] += 15;
    scores["One Person Company (OPC)"] += 15;
    scores["Sole Proprietorship"] -= 15;
    scores["Partnership"] -= 15;
  } else {
    scores["Sole Proprietorship"] += 5;
    scores["Partnership"] += 5;
  }

  // 4. Scale & Credibility
  if (answers.scale === "national_global" || answers.priority === "credibility") {
    scores["Private Limited Company"] += 15;
    scores["LLP"] += 10;
    scores["One Person Company (OPC)"] += 5;
  } else {
    // Local & Compliance-focused
    scores["Sole Proprietorship"] += 10;
    scores["Partnership"] += 5;
  }

  // Foreign Clients
  if (answers.foreignClients === "yes") {
    scores["Private Limited Company"] += 10;
    scores["LLP"] += 5;
  }

  let bestEntity: EntityType = "Private Limited Company";
  let maxScore = -999;

  for (const [entity, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      bestEntity = entity as EntityType;
    }
  }

  return { recommended: bestEntity, scores };
}

export async function generateRegistrationAdvice(answers: RegistrationAnswers) {
  try {
    const { recommended } = calculateBestEntity(answers);

    // AI Personalization Layer
    if (!process.env.GEMINI_API_KEY) {
      return {
        success: true,
        recommended,
        aiExplanation: `Based on our tax rules engine, a **${recommended}** is the best fit for you. Since you indicated specific requirements around funding, liability, and founders, this structure offers the right balance of compliance and growth potential.`
      };
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an expert Indian Chartered Accountant and business advisor.
      A user has answered a questionnaire about starting their business:
      - Founders: ${answers.founders}
      - Plan to raise investor funding: ${answers.funding}
      - Need limited liability protection: ${answers.liability}
      - Target Scale: ${answers.scale}
      - Priority (Easy Compliance vs Credibility): ${answers.priority}
      - Plan to hire employees: ${answers.employees}
      - Expecting foreign clients: ${answers.foreignClients}

      Our deterministic logic engine has recommended they register as a: **${recommended}**.

      Write a beginner-friendly, encouraging explanation (around 150-200 words) answering:
      1. Why is this specific entity the best fit for them based ONLY on their answers?
      2. What is the main tradeoff or alternative they should keep in mind?
      
      Format the response in Markdown. Do NOT suggest a different entity as the primary choice, simply explain why the system recommended this one. Keep the tone professional, educational, and confidence-building.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return {
      success: true,
      recommended,
      aiExplanation: responseText
    };

  } catch (error) {
    console.error("AI Generation error:", error);
    return {
      success: false,
      message: "Failed to generate recommendation."
    };
  }
}
