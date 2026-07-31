import { IContentValidator } from './interfaces';
import { NormalizedResponse } from './types';
import { FETCH_CONFIG } from './fetch-config';
import { ContentValidationError } from './fetch-errors';

export class ContentValidator implements IContentValidator {
  public validate(response: NormalizedResponse): boolean {
    if (!response || !response.rawBody) {
      throw new ContentValidationError('Empty response body');
    }

    if (response.contentLength > FETCH_CONFIG.MAX_RESPONSE_SIZE_BYTES) {
      throw new ContentValidationError(`Response too large: ${response.contentLength} bytes`);
    }

    if (response.contentLength < FETCH_CONFIG.MIN_RESPONSE_SIZE_BYTES) {
      throw new ContentValidationError(`Response too small: ${response.contentLength} bytes`);
    }

    const isAllowedMime = FETCH_CONFIG.ALLOWED_MIME_TYPES.some(mime => 
      response.contentType.toLowerCase().includes(mime)
    );

    if (!isAllowedMime) {
      throw new ContentValidationError(`Unsupported MIME type: ${response.contentType}`);
    }

    return true;
  }
}
