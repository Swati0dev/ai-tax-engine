export function buildAnalysisPrompt(
  oldDocumentContent: string | null,
  newDocumentContent: string,
  changes: string
): string {
  return `
You are an expert Regulatory Intelligence AI analyzing Indian Tax regulations.
Analyze the following regulatory document changes and provide a structured JSON response.

# Previous Document Content
${oldDocumentContent ? oldDocumentContent : "(No previous document, this is the first version)"}

# New Document Content
${newDocumentContent}

# Detected Structural Changes (Diff)
${changes}

# Instructions
You must output a strictly valid JSON response. DO NOT wrap the output in markdown \`\`\`json blocks. DO NOT add any explanatory text before or after the JSON.

The JSON MUST contain the following fields exactly:
{
  "summary": "Executive Summary of what changed or what this document is.",
  "impact": "Explanation of the Business and Compliance Impact. Include severity justification.",
  "recommendations": "Recommended Actions for the compliance team.",
  "structuredOutput": {
    "title": "A clear, professional title for this topic",
    "explanation": "A detailed, lawful explanation of this tax rule, what it is, why it exists, and how it works. (At least 2 paragraphs).",
    "applicability": ["Who this applies to 1", "Who this applies to 2"],
    "benefitsOrDeductions": ["Benefit 1", "Deduction 2"],
    "restrictions": ["Restriction 1", "Limitation 2"],
    "examples": ["A detailed example scenario with calculations if applicable."],
    "relatedForms": ["Form 16", "ITR-4", "etc"],
    "filingProcedure": ["Step 1...", "Step 2..."],
    "faqs": [
      { "question": "FAQ Question 1", "answer": "FAQ Answer 1" },
      { "question": "FAQ Question 2", "answer": "FAQ Answer 2" }
    ],
    "tags": ["Tag1", "Tag2"]
  }
}

Constraint Checklist & Confidence Score:
1. NEVER fabricate legal information.
2. NEVER modify section numbers, notification numbers, dates, legal limits, monetary values, penalties, or authorities.
3. Return STRICTLY valid JSON ONLY.
`;
}
