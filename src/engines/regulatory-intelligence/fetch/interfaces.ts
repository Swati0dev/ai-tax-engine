import { FetchMethod, NormalizedResponse } from './types';
import { FetchContext } from './request-context';

export interface IFetchEngine {
  fetch(url: string, method: FetchMethod): Promise<NormalizedResponse>;
}

export interface IFetchService {
  execute(context: FetchContext): Promise<NormalizedResponse>;
}

export interface IFetchClient {
  request(context: FetchContext): Promise<NormalizedResponse>;
}

export interface IRateLimiter {
  acquire(domain: string): Promise<void>;
  release(domain: string): void;
}

export interface IRetryPolicy {
  shouldRetry(error: Error, attempt: number): boolean;
  getDelay(attempt: number): number;
}

export interface IRobotsPolicy {
  isAllowed(url: string, userAgent: string): Promise<boolean>;
  getCrawlDelay(domain: string, userAgent: string): Promise<number>;
}

export interface ISnapshotService {
  createSnapshot(sourceId: string, response: NormalizedResponse): Promise<string>;
}

export interface IContentValidator {
  validate(response: NormalizedResponse): boolean;
}

export interface IChecksumService {
  generate(buffer: Buffer): string;
}
