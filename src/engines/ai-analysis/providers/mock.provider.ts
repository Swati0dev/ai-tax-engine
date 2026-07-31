import { AIProvider } from "./ai-provider.interface";

export class MockAIProvider implements AIProvider {
  public readonly name = "MOCK_PROVIDER";
  public readonly modelName = "mock-model-v1";

  public async analyze(prompt: string): Promise<string> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return structured deterministic response
    const mockResponse = {
      summary: "This is a mocked executive summary of the changes.",
      impact: "The business and compliance impact is simulated as LOW.",
      recommendations: "No action required. This is a mocked analysis."
    };

    return JSON.stringify(mockResponse);
  }
}
