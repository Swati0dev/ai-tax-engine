import { FetchContext } from './request-context';
import { NormalizedResponse } from './types';
import { IFetchStrategy } from './fetch-strategy.interface';
import { FetchError, FetchFailureType } from './fetch-errors';
import { ApifyClient } from 'apify-client';

export class HeadlessFetchStrategy implements IFetchStrategy {
  public async execute(context: FetchContext): Promise<NormalizedResponse> {
    console.log(`[HeadlessFetchStrategy] Attempting to execute headless fetch for ${context.url} via Apify`);
    
    const apifyToken = process.env.APIFY_API_TOKEN;
    if (!apifyToken) {
      throw new FetchError(FetchFailureType.UNKNOWN, "APIFY_API_TOKEN is not configured for Headless Fetch Strategy");
    }

    try {
      const client = new ApifyClient({ token: apifyToken });
      
      const run = await client.actor("apify/cheerio-scraper").call({
        startUrls: [{ url: context.url }],
        maxPagesPerCrawl: 1,
      });

      const { items } = await client.dataset(run.defaultDatasetId).listItems();
      
      if (!items || items.length === 0 || !items[0].text) {
        throw new FetchError(FetchFailureType.EMPTY_RESPONSE, "Apify returned an empty dataset or no text content");
      }

      const scrapedText = String(items[0].text);
      const rawBody = Buffer.from(scrapedText, 'utf-8');

      console.log(`[HeadlessFetchStrategy] Success fetching ${context.url} via Apify (${rawBody.length} bytes)`);

      return {
        status: 200,
        headers: { 'content-type': 'text/plain' },
        contentType: 'text/plain',
        contentLength: rawBody.length,
        responseTime: Date.now() - context.startTime,
        encoding: 'utf-8',
        url: context.url,
        finalUrl: context.url,
        etag: null,
        lastModified: null,
        hash: null, // Will be computed by caller if needed
        rawBody,
      };
    } catch (error: unknown) {
      console.error(`[HeadlessFetchStrategy] Apify scrape failed for ${context.url}`, error);
      if (error instanceof FetchError) {
        throw error;
      }
      throw new FetchError(FetchFailureType.UNKNOWN, `Apify Headless Fetch error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
