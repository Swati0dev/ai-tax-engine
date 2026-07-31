import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { AIProvider } from "./ai-provider.interface";

export class GeminiProvider implements AIProvider {
  public readonly name = "GEMINI";
  public readonly modelName = "gemini-1.5-pro";
  private genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set");
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  public async analyze(prompt: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: this.modelName,
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: SchemaType.OBJECT,
            properties: {
              summary: { type: SchemaType.STRING },
              impact: { type: SchemaType.STRING },
              recommendations: { type: SchemaType.STRING },
            },
            required: ["summary", "impact", "recommendations"],
          }
        },
      });

      const result = await model.generateContent(prompt);
      const response = result.response;
      return response.text();
    } catch (error) {
      console.error("[GeminiProvider] Analysis failed:", error);
      throw error;
    }
  }
}
