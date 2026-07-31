import { IFetchService } from './interfaces';
import { FetchContext } from './request-context';
import { NormalizedResponse } from './types';
import { RetryService } from './retry.service';
import { RobotsService } from './robots.service';
import { RateLimiter } from './rate-limiter';
import { ContentValidator } from './content-validator';
import { ChecksumService } from './checksum.service';
import { IFetchStrategy } from './fetch-strategy.interface';
import { HttpFetchStrategy } from './http-fetch.strategy';
import { HeadlessFetchStrategy } from './headless-fetch.strategy';
import { AccessStrategy } from '@prisma/client';
import { FetchFailureType, FetchError } from './fetch-errors';

export class FetchService implements IFetchService {
  private retryPolicy = new RetryService();
  private robots = new RobotsService();
  private rateLimiter = new RateLimiter();
  private validator = new ContentValidator();
  private checksum = new ChecksumService();

  private getStrategy(strategyType: AccessStrategy): IFetchStrategy {
    switch (strategyType) {
      case 'HEADLESS_BROWSER':
        return new HeadlessFetchStrategy();
      case 'HTTP_FETCH':
      case 'RSS_FEED':
      case 'XML_FEED':
      case 'JSON_API':
      case 'FILE_DOWNLOAD':
      default:
        // All these utilize the hardened HTTP client under the hood for Phase 8
        return new HttpFetchStrategy();
    }
  }

  public async execute(context: FetchContext): Promise<NormalizedResponse> {
    console.log(`[FetchService] Executing fetch pipeline for ${context.url} using strategy ${context.strategy}`);
    
    const domain = new URL(context.url).hostname;
    const strategy = this.getStrategy(context.strategy);
    
    const isAllowed = await this.robots.isAllowed(context.url, 'RIE-Bot');
    if (!isAllowed) {
      throw new FetchError(FetchFailureType.HTTP_403, 'Disallowed by robots.txt');
    }

    await this.rateLimiter.acquire(domain);
    
    try {
      context.incrementAttempt();
      
      const response = await strategy.execute(context);
      
      // Compute checksum
      if (response.rawBody) {
        response.hash = this.checksum.generate(response.rawBody);
      }

      this.validator.validate(response);

      return response;

    } catch (error: unknown) {
      if (this.retryPolicy.shouldRetry(error as Error, context.attemptCount)) {
        const delay = this.retryPolicy.getDelay(context.attemptCount);
        console.log(`[FetchService] Retrying in ${delay}ms...`);
        // wait... (simplified for now, ideally we use setTimeout promise)
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.execute(context);
      }
      throw error;
    } finally {
      this.rateLimiter.release(domain);
    }
  }
}
