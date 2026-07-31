import { IRetryPolicy } from './interfaces';
import { FETCH_CONFIG } from './fetch-config';

export class RetryService implements IRetryPolicy {
  public shouldRetry(error: Error | unknown, attempt: number): boolean {
    if (attempt >= FETCH_CONFIG.MAX_RETRIES) {
      return false;
    }
    
    const err = error as Record<string, unknown>;
    
    // Example: Only retry on 5xx or Network errors, not 404s.
    if (err && err.statusCode && typeof err.statusCode === 'number' && err.statusCode >= 400 && err.statusCode < 500) {
      // Don't retry client errors unless it's a 429 Too Many Requests
      if (err.statusCode !== 429) {
        return false;
      }
    }
    
    return true;
  }

  public getDelay(attempt: number): number {
    // Exponential backoff
    return Math.pow(FETCH_CONFIG.BACKOFF_FACTOR, attempt) * 1000;
  }
}
