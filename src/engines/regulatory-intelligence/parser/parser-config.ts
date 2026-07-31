export const PARSER_CONFIG = {
  STRICT_MODE: true,
  MAX_TITLE_LENGTH: 255,
  MAX_CONTENT_LENGTH: 5 * 1024 * 1024, // 5MB limit for parser string allocation
  ALLOWED_EXTRACTED_LANGUAGES: ['en', 'hi'],
  FALLBACK_ENCODING: 'utf-8',
};
