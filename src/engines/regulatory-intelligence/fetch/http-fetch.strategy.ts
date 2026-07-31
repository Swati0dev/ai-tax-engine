import { FetchContext } from './request-context';
import { NormalizedResponse } from './types';
import { FETCH_CONFIG } from './fetch-config';
import { FetchFailureType, FetchError } from './fetch-errors';
import { IFetchStrategy } from './fetch-strategy.interface';

// Helper for generating standard browser headers
function getStandardHeaders(url: URL): Record<string, string> {
  return {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-User': '?1',
    'Referer': `https://${url.hostname}/`, // Generic safe referer
  };
}

export class HttpFetchStrategy implements IFetchStrategy {
  
  public async execute(context: FetchContext, attempt = 1): Promise<NormalizedResponse> {
    console.log(`[HttpFetchStrategy] [Attempt ${attempt}] Executing ${context.method} request to ${context.url}`);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_CONFIG.DEFAULT_TIMEOUT_MS);
    
    const targetUrl = new URL(context.url);
    const headers = {
      ...getStandardHeaders(targetUrl),
      ...context.headers,
    };

    try {
      const response = await fetch(context.url, {
        method: context.method || 'GET',
        headers,
        redirect: 'follow', // Explicitly handle redirects
        signal: controller.signal,
        // Node 18+ Next.js fetch options for stability
        cache: 'no-store',
      });
      clearTimeout(timeoutId);

      // Handle HTTP status errors explicitly with WAF detection
      if (response.status === 403 || response.status === 401) {
        const serverHeader = response.headers.get('server')?.toLowerCase() || '';
        if (serverHeader.includes('cloudflare') || serverHeader.includes('akamai') || serverHeader.includes('imperva') || serverHeader.includes('awselb')) {
          console.warn(`[HttpFetchStrategy] WAF Block detected from ${serverHeader} at ${context.url}`);
          throw new FetchError(FetchFailureType.WAF_CHALLENGE, `WAF block detected from ${serverHeader}`);
        }
        throw new FetchError(FetchFailureType.HTTP_403, 'Forbidden access or generic block');
      }
      
      if (response.status === 404) throw new FetchError(FetchFailureType.HTTP_404, 'Not Found');
      if (response.status === 429) throw new FetchError(FetchFailureType.HTTP_429, 'Rate Limited');
      if (response.status >= 500) throw new FetchError(FetchFailureType.HTTP_500, `Server Error: ${response.status}`);
      if (!response.ok) throw new FetchError(FetchFailureType.UNKNOWN, `HTTP Error: ${response.status}`);

      const arrayBuffer = await response.arrayBuffer();
      const rawBody = Buffer.from(arrayBuffer);

      if (rawBody.length === 0) {
        throw new FetchError(FetchFailureType.EMPTY_RESPONSE, 'Empty response body received');
      }

      const contentType = response.headers.get('content-type') || 'text/html';
      
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key.toLowerCase()] = value;
      });

      console.log(`[HttpFetchStrategy] Success fetching ${context.url} (${rawBody.length} bytes)`);

      return {
        status: response.status,
        headers: responseHeaders,
        contentType,
        contentLength: rawBody.length,
        responseTime: Date.now() - context.startTime,
        encoding: 'utf-8',
        url: response.url, // Final url after redirects
        finalUrl: response.url,
        etag: responseHeaders['etag'] || null,
        lastModified: responseHeaders['last-modified'] || null,
        hash: null, // Will be computed by caller if needed
        rawBody,
      };
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      
      // Determine error type based on FetchError or Node native error
      if (error instanceof FetchError) {
        throw error;
      }
      
      if (error instanceof Error && error.name === 'AbortError') {
        console.warn(`[HttpFetchStrategy] Request timeout to ${context.url}`);
        throw new FetchError(FetchFailureType.TIMEOUT, 'Request timed out');
      }
      
      if (error instanceof Error && error.cause) {
        const causeCode = (error.cause as Record<string, unknown>).code as string | undefined;
        if (causeCode === 'ENOTFOUND' || causeCode === 'EAI_AGAIN') {
          throw new FetchError(FetchFailureType.DNS_FAILURE, 'DNS resolution failed');
        }
        if (causeCode === 'ECONNREFUSED' || causeCode === 'ETIMEDOUT') {
          throw new FetchError(FetchFailureType.TIMEOUT, 'Connection timed out or refused');
        }
        if (causeCode?.includes('SSL') || causeCode?.includes('CERT')) {
          throw new FetchError(FetchFailureType.SSL_FAILURE, 'SSL certificate validation failed');
        }
        if (causeCode === 'ECONNRESET') {
          // Connection resets are common in aggressive government firewalls, attempt retry locally if requested.
          throw new FetchError(FetchFailureType.UNKNOWN, 'Connection Reset by Peer');
        }
      }

      throw new FetchError(FetchFailureType.UNKNOWN, `Unknown fetch error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
