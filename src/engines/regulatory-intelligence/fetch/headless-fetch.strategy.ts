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
        pageFunction: "async function pageFunction(context) { const { $ } = context; return { text: $('body').text(), html: $('html').html(), markdown: null, content: null, body: $('body').html() }; }"
      });

      const { items } = await client.dataset(run.defaultDatasetId).listItems();
      
      if (!items || items.length === 0) {
        throw new FetchError(FetchFailureType.EMPTY_RESPONSE, "Apify returned an empty dataset");
      }

      const datasetItem = items[0] as any;
      
      let scrapedText = "";
      let contentType = "text/plain";
      let selectedField = "";

      if (datasetItem.markdown && String(datasetItem.markdown).trim().length > 0) {
        scrapedText = String(datasetItem.markdown);
        selectedField = "markdown";
      } else if (datasetItem.text && String(datasetItem.text).trim().length > 0) {
        scrapedText = String(datasetItem.text);
        selectedField = "text";
      } else if (datasetItem.content && String(datasetItem.content).trim().length > 0) {
        scrapedText = String(datasetItem.content);
        selectedField = "content";
      } else if (datasetItem.body && String(datasetItem.body).trim().length > 0) {
        scrapedText = String(datasetItem.body);
        selectedField = "body";
        contentType = "text/html";
      } else if (datasetItem.html && String(datasetItem.html).trim().length > 0) {
        scrapedText = String(datasetItem.html);
        selectedField = "html";
        contentType = "text/html";
      } else {
        throw new FetchError(FetchFailureType.EMPTY_RESPONSE, "Dataset exists but text field missing");
      }

      const rawBody = Buffer.from(scrapedText, 'utf-8');

      console.log(`[HeadlessFetchStrategy] Success fetching ${context.url} via Apify (${rawBody.length} bytes from field: ${selectedField})`);

      return {
        status: 200,
        headers: { 'content-type': contentType },
        contentType: contentType,
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
