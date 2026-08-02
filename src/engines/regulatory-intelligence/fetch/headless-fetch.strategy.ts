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

    // Official Source Validation
    const officialDomains = ['.gov.in', '.nic.in', 'gst.gov.in', 'cbic.gov.in', 'cbdt.gov.in', 'egazette.nic.in'];
    const urlObj = new URL(context.url);
    const isOfficial = officialDomains.some(d => urlObj.hostname.endsWith(d));
    const sourceType = isOfficial ? 'Official Government' : 'Reference Website';

    try {
      const client = new ApifyClient({ token: apifyToken });
      
      // We pass topic via a URL parameter or context if available. For now, we extract it from context or assume a generic fetch.
      // If context had a topic, we'd pass it. Assuming we can pass it via URL query ?topic=... or we just rely on general ranking.
      // Since context currently doesn't have topic, we'll try to extract it from context.url or pass a default.
      const urlParams = new URLSearchParams(urlObj.search);
      const topic = urlParams.get('topic') || '';

      const pageFunction = `
        async function pageFunction(context) {
          const { $, request } = context;
          const url = request.url;
          
          // 1. Remove UI noise
          $('header, footer, nav, menu, .search, .accessibility-widget, .cookie-banner, script, style, svg, [hidden], button, noscript, iframe').remove();

          // 2. Legal metadata detection
          const text = $('body').text();
          const legalKeywords = ['Act', 'Chapter', 'Section', 'Rule', 'Notification', 'Circular', 'Gazette', 'Effective Date', 'Authority', 'Penalty', 'Explanation', 'Schedule', 'Amendment'];
          const uiKeywords = ['Login', 'Search', 'Accessibility', 'Skip to content', 'Contrast', 'Font Size', 'Menu', 'Footer', 'Privacy', 'Contact'];
          
          let legalCount = 0;
          let uiCount = 0;
          
          legalKeywords.forEach(k => {
             const regex = new RegExp('\\\\b' + k + '\\\\b', 'gi');
             const matches = text.match(regex);
             if (matches) legalCount += matches.length;
          });
          
          uiKeywords.forEach(k => {
             const regex = new RegExp('\\\\b' + k + '\\\\b', 'gi');
             const matches = text.match(regex);
             if (matches) uiCount += matches.length;
          });

          // 3. Link extraction and ranking
          const topic = "${topic}";
          const links = [];
          $('a').each((i, el) => {
            const href = $(el).attr('href');
            const linkText = $(el).text().trim().toLowerCase();
            if (href) {
              let score = 0;
              
              // Document Type Score
              if (linkText.includes('act pdf') || href.toLowerCase().endsWith('.pdf')) score += 100;
              else if (linkText.includes('act')) score += 95;
              else if (linkText.includes('finance act')) score += 90;
              else if (linkText.includes('notification')) score += 80;
              else if (linkText.includes('circular')) score += 75;
              else if (linkText.includes('manual') || linkText.includes('guidelines')) score += 30;
              
              // Topic Match Score
              if (topic && linkText.includes(topic.toLowerCase())) score += 100;
              
              // Reject UI links
              if (['accessibility', 'privacy', 'contact', 'login', 'home'].some(u => linkText.includes(u))) {
                 score = 0;
              }

              if (score > 0) {
                 links.push({ href, text: linkText, score });
              }
            }
          });
          
          links.sort((a, b) => b.score - a.score);

          // 4. Page classification
          let pageType = 'LANDING_PAGE';
          if (uiCount > legalCount) pageType = 'UI_ONLY';
          else if (links.length > 10 && legalCount < 50) pageType = 'PDF_INDEX';
          else if (legalCount > 50) pageType = 'LEGAL_DOCUMENT';

          return { 
            text: $('body').text(), 
            html: $('html').html(), 
            metadata: {
              legalCount,
              uiCount,
              pageType,
              topLinks: links.slice(0, 5)
            }
          };
        }
      `;

      const run = await client.actor("apify/cheerio-scraper").call({
        startUrls: [{ url: context.url }],
        maxPagesPerCrawl: 1,
        pageFunction: pageFunction
      });

      const { items } = await client.dataset(run.defaultDatasetId).listItems();
      
      if (!items || items.length === 0) {
        throw new FetchError(FetchFailureType.EMPTY_RESPONSE, "Apify returned an empty dataset");
      }

      const datasetItem = items[0] as any;
      const metadata = datasetItem.metadata || {};
      const topLinks = metadata.topLinks || [];
      const pageType = metadata.pageType || 'UNKNOWN';

      console.log(`[HeadlessFetchStrategy] Apify scrape done. Type: ${pageType}, Legal: ${metadata.legalCount}, UI: ${metadata.uiCount}`);

      if (pageType === 'UI_ONLY') {
        throw new FetchError(FetchFailureType.INVALID_CONTENT, "Website UI detected. Rejected due to insufficient legal content.");
      }

      // PDF Priority: Native Fetch if highest scoring link is a PDF
      if (topLinks.length > 0 && topLinks[0].href.toLowerCase().endsWith('.pdf')) {
         let pdfUrl = topLinks[0].href;
         if (!pdfUrl.startsWith('http')) {
            pdfUrl = new URL(pdfUrl, context.url).href;
         }
         console.log(`[HeadlessFetchStrategy] High-priority PDF found (${topLinks[0].score} pts). Transitioning to native fetch for: ${pdfUrl}`);
         
         const pdfResponse = await fetch(pdfUrl);
         if (pdfResponse.ok) {
           const pdfBuffer = Buffer.from(await pdfResponse.arrayBuffer());
           return {
             status: 200,
             headers: { 
               'content-type': 'application/pdf',
               'x-ai-tax-source-type': sourceType,
               'x-ai-tax-page-type': 'PDF_DOCUMENT',
               'x-ai-tax-selected-link': pdfUrl
             },
             contentType: 'application/pdf',
             contentLength: pdfBuffer.length,
             responseTime: Date.now() - context.startTime,
             encoding: 'binary',
             url: pdfUrl,
             finalUrl: pdfUrl,
             etag: null,
             lastModified: null,
             hash: null,
             rawBody: pdfBuffer,
           };
         }
      }

      let scrapedText = "";
      if (datasetItem.html && String(datasetItem.html).trim().length > 0) {
        scrapedText = String(datasetItem.html);
      } else if (datasetItem.text && String(datasetItem.text).trim().length > 0) {
        scrapedText = String(datasetItem.text);
      } else {
        throw new FetchError(FetchFailureType.EMPTY_RESPONSE, "Dataset exists but text field missing");
      }

      const rawBody = Buffer.from(scrapedText, 'utf-8');

      return {
        status: 200,
        headers: { 
          'content-type': 'text/html',
          'x-ai-tax-source-type': sourceType,
          'x-ai-tax-page-type': pageType
        },
        contentType: 'text/html',
        contentLength: rawBody.length,
        responseTime: Date.now() - context.startTime,
        encoding: 'utf-8',
        url: context.url,
        finalUrl: context.url,
        etag: null,
        lastModified: null,
        hash: null,
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

  // Reusable method for single crawls, exposed for future batching
  public async crawlSingle(url: string, topic?: string): Promise<NormalizedResponse> {
     return this.execute({ url, startTime: Date.now(), method: 'HTTP' } as any);
  }

  // Future-ready batch crawl
  public async crawlBatch(urls: string[], topic?: string): Promise<NormalizedResponse[]> {
     const results = [];
     for (const url of urls) {
       try {
         results.push(await this.crawlSingle(url, topic));
       } catch (e) {
         console.error(`Batch fetch failed for ${url}`);
       }
     }
     return results;
  }
}
