export enum FetchMethod {
  HTTP = 'HTTP',
  HTTPS = 'HTTPS',
  RSS = 'RSS',
  API = 'API',
  FILE = 'FILE'
}

export type NormalizedResponse = {
  status: number;
  headers: Record<string, string>;
  contentType: string;
  contentLength: number;
  responseTime: number; // in milliseconds
  encoding: string;
  url: string;
  finalUrl: string;
  etag: string | null;
  lastModified: string | null;
  hash: string | null;
  rawBody: Buffer | null;
};
