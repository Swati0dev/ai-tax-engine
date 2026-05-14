export type TaxCategory = "DIRECT_TAX" | "INDIRECT_TAX";

export type ReviewStatus = "VERIFIED" | "NEEDS_REVIEW" | "OUTDATED" | "DRAFT";

export type SourceReference = {
  id: string;
  title: string;
  url: string;
  sourceType: "OFFICIAL" | "PROJECT_APPROVED" | "ORIENTATION_ONLY";
  publishedAt?: string | Date | null;
  accessedAt: string | Date;
};

export type TaxKnowledgeItem = {
  id: string;
  category: TaxCategory;
  actName: string;
  slug: string;
  imageUrl?: string | null;
  sectionNumber: string | null;
  title: string;
  summary: string;
  explanation: string;
  applicability: string[];
  benefitsOrDeductions: string[];
  restrictions: string[];
  examples: string[];
  relatedForms: string[];
  filingProcedure: string[];
  relatedItems: string[];
  sourceReferences: SourceReference[];
  effectiveFrom: string | Date | null;
  lastReviewed: string | Date;
  reviewStatus: ReviewStatus;
};

export type TaxSearchQuery = {
  query: string;
  category?: TaxCategory;
};

export type TaxSearchResult = {
  item: TaxKnowledgeItem;
  score: number;
  matchedFields: string[];
};

export type QueryInterpretation = {
  category: TaxCategory | "UNKNOWN";
  relevantConcepts: string[];
  userType?: string;
  applicableForms: string[];
  missingFacts: string[];
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "UNKNOWN";
};

export type ChatReference = {
  title: string;
  href?: string;
  reviewStatus: ReviewStatus;
};

export type TaxChatResponse = {
  shortAnswer: string;
  likelyCategory: TaxCategory | "UNKNOWN";
  applicableConcepts: string[];
  applicabilityConditions: string[];
  relevantFormsOrProcedures: string[];
  legalTaxSavingOptions: string[];
  example: string;
  caveats: string[];
  sources: ChatReference[];
  dataStatus: ReviewStatus | "UNAVAILABLE";
};
