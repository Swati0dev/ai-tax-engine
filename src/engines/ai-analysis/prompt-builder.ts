export function buildAnalysisPrompt(
  oldDocumentContent: string | null,
  newDocumentContent: string,
  changes: string
): string {
  return `
You are an expert Regulatory Intelligence AI.
Analyze the following regulatory document changes and provide a structured JSON response.

# Previous Document Content
${oldDocumentContent ? oldDocumentContent : "(No previous document, this is the first version)"}

# New Document Content
${newDocumentContent}

# Detected Structural Changes (Diff)
${changes}

# Instructions
You must output a structured JSON response with exactly three fields:
1. "summary": Provide an Executive Summary of what changed.
2. "impact": Explain the Business and Compliance Impact. Mention the Severity Justification.
3. "recommendations": Provide Recommended Actions for the compliance team.

Ensure the response is valid JSON and strictly follows the schema requested.
`;
}
