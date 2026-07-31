export const FETCH_CONFIG = {
  USER_AGENT: 'RegulatoryIntelligenceEngineBot/1.0 (+https://tax-ai-platform.com/bot)',
  DEFAULT_TIMEOUT_MS: 30000,
  MAX_RETRIES: 3,
  BACKOFF_FACTOR: 2,
  MAX_REDIRECTS: 5,
  MAX_RESPONSE_SIZE_BYTES: 10 * 1024 * 1024, // 10 MB
  MIN_RESPONSE_SIZE_BYTES: 100, // 100 bytes
  ALLOWED_MIME_TYPES: [
    'text/html',
    'application/json',
    'application/pdf',
    'application/xml',
    'application/rss+xml',
    'text/plain'
  ]
};
