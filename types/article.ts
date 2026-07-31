
export interface ArticleMetadata {
  readingTime?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  reviewedBy?: string;
  reviewerTitle?: string;
  reviewerAvatar?: string;
  publishedDate?: string;
  lastUpdated?: string;
  nextReviewDate?: string;
  version?: string;
  category?: string;
  tags?: string[];
}

export interface ContentBlock {
  id: string;
  type: "markdown" | "callout" | "stepList" | "keyMetrics" | "summaryBox" | "custom";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any; // Can be string for markdown, or specific prop object for others
}

export interface OfficialSource {
  title: string;
  url: string;
  type: "Act" | "Circular" | "Notification" | "Case Law" | "Other";
  date?: string;
  authorityLevel?: "High" | "Medium" | "Low";
  effectiveDate?: string;
  lastVerified?: string;
  rieSourceId?: string;
}

export interface TrustMetadata {
  verificationStatus: "Verified" | "Unverified" | "Pending";
  confidenceScore: {
    score: number;
    level: "High" | "Medium" | "Low";
    calculatedFrom: string[];
  };
  officialReviewed: boolean;
  legalDisclaimer?: string;
  authorityLevel: "High" | "Medium" | "Low";
  reviewCycle?: "Monthly" | "Quarterly" | "Annually";
  sourceCount?: number;
  lastVerificationDate?: string;
}

export interface RegulatoryChange {
  triggerType: "Finance Act" | "CBDT Circular" | "GST Notification" | "MCA Update" | "Court Judgment" | "Other";
  description: string;
  date: string;
}

export interface ArticleSchema {
  id: string;
  title: string;
  summary: string;
  heroImage?: string;
  
  metadata: ArticleMetadata;
  trust?: TrustMetadata;
  regulatoryChange?: RegulatoryChange;
  
  keyTakeaways?: string[];
  
  // The actual layout of the article body
  blocks: ContentBlock[];
  
  officialSources?: OfficialSource[];
  
  relatedArticleIds?: string[];
}
