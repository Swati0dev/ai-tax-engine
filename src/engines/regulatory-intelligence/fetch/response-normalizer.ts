import { NormalizedResponse } from './types';

export class ResponseNormalizer {
  /**
   * Normalizes an external HTTP response into a standard internal format
   * (Architecture only - no live implementation yet)
   */
  public normalize(rawHttpResponse: unknown, fetchDurationMs: number): NormalizedResponse {
    const response = rawHttpResponse as Record<string, unknown>;
    const headers = (response.headers || {}) as Record<string, string>;
    return {
      status: (response.status as number) || 200,
      headers: headers,
      contentType: headers['content-type'] || 'unknown',
      contentLength: parseInt(headers['content-length'] || '0', 10),
      responseTime: fetchDurationMs,
      encoding: 'utf-8',
      url: (response.url as string) || '',
      finalUrl: (response.url as string) || '',
      etag: headers['etag'] || null,
      lastModified: headers['last-modified'] || null,
      hash: null,
      rawBody: (response.data as Buffer) || Buffer.from('')
    };
  }
}
