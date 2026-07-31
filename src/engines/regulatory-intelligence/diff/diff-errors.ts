export class DiffEngineError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DiffEngineError';
  }
}

export class DiffValidationError extends DiffEngineError {
  constructor(message: string) {
    super(`Validation Failed: ${message}`);
    this.name = 'DiffValidationError';
  }
}
