export class ParserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ParserError';
  }
}

export class UnsupportedMimeTypeError extends ParserError {
  constructor(mimeType: string) {
    super(`Unsupported MIME type for parsing: ${mimeType}`);
    this.name = 'UnsupportedMimeTypeError';
  }
}

export class ParserValidationError extends ParserError {
  constructor(message: string) {
    super(`Parser validation failed: ${message}`);
    this.name = 'ParserValidationError';
  }
}
