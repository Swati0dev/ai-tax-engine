import type { TaxChatResponse } from "@/types/tax";

export function createUnavailableChatResponse(): TaxChatResponse {
  return {
    shortAnswer: "Chat responses are not available until the AI search and grounding phase is implemented.",
    likelyCategory: "UNKNOWN",
    applicableConcepts: [],
    applicabilityConditions: [],
    relevantFormsOrProcedures: [],
    legalTaxSavingOptions: [],
    example: "",
    caveats: [
      "This point is not yet verified in the project tax data. Please check official sources or consult a qualified tax professional before acting."
    ],
    sources: [],
    dataStatus: "UNAVAILABLE"
  };
}
