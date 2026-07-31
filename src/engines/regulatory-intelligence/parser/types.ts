export enum ParserMimeType {
  HTML = 'text/html',
  PDF = 'application/pdf',
  RSS = 'application/rss+xml',
  XML = 'application/xml',
  JSON = 'application/json'
}

export type ExtractedMetadata = {
  title?: string;
  description?: string;
  keywords?: string[];
  language?: string;
  publishedDate?: string;
  modifiedDate?: string;
  canonicalUrl?: string;
  contentType?: string;
  encoding?: string;
};
