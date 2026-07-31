// Types for Regulatory Intelligence Engine

export type SourceFrequencyType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CRON';
export type SourceHealthStatusType = 'HEALTHY' | 'DEGRADED' | 'FAILING' | 'UNKNOWN';
export type JobStatusType = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';

export type SupportedSourceCategory = 
  | 'INCOME_TAX'
  | 'GST'
  | 'CORPORATE'
  | 'LABOUR'
  | 'FINANCE'
  | 'GENERAL';

export type ParserStrategy = 'HTML_CRAWLER' | 'API_JSON' | 'RSS_FEED' | 'PDF_EXTRACTOR';
