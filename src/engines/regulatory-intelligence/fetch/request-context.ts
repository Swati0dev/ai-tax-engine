import { FetchMethod } from './types';
import { AccessStrategy } from '@prisma/client';

export class FetchContext {
  public url: string;
  public method: FetchMethod;
  public sourceId?: string;
  public attemptCount: number = 0;
  public startTime: number;
  public strategy: AccessStrategy;
  public headers?: Record<string, string>;

  constructor(url: string, method: FetchMethod, sourceId?: string, strategy: AccessStrategy = 'HTTP_FETCH', headers?: Record<string, string>) {
    this.url = url;
    this.method = method;
    this.sourceId = sourceId;
    this.strategy = strategy;
    this.headers = headers;
    this.startTime = Date.now();
  }

  public incrementAttempt() {
    this.attemptCount++;
  }
}
