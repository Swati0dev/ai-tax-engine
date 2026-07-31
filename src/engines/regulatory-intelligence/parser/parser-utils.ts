import { ExtractedMetadata } from './types';
import { ParserContext } from './parser-context';

export class ParserUtils {
  /**
   * Reusable utility to extract basic HTTP metadata
   * (Does not extract from DOM/PDF bodies, only from available context envelopes)
   */
  public static extractBaseMetadata(context: ParserContext): ExtractedMetadata {
    return {
      canonicalUrl: context.url,
      contentType: context.mimeType,
      // Further metadata extraction happens inside specific strategies
    };
  }
}
