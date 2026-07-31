export interface AIProvider {
  /**
   * Identifies the provider for logging and database records.
   */
  readonly name: string;

  /**
   * The underlying model name.
   */
  readonly modelName: string;

  /**
   * Analyzes the given prompt and returns a structured JSON string.
   */
  analyze(prompt: string): Promise<string>;
}
