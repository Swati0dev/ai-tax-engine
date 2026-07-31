import { IParserStrategy } from '../../interfaces';
import { ParserContext } from '../../parser-context';
import { ParserResult } from '../../parser-result';
import { ExtractedMetadata, ParserMimeType } from '../../types';
import { ParserUtils } from '../../parser-utils';
import * as cheerio from 'cheerio';

export class HTMLParserStrategy implements IParserStrategy {
  public name = 'HTMLParser';

  public supports(mimeType: string): boolean {
    return mimeType === ParserMimeType.HTML || mimeType === 'text/plain';
  }

  public validate(context: ParserContext): boolean {
    return context.rawBuffer && context.rawBuffer.length > 0;
  }

  public extractMetadata(context: ParserContext, $: cheerio.CheerioAPI): ExtractedMetadata {
    const baseMetadata = ParserUtils.extractBaseMetadata(context);
    
    // Attempt heuristic extraction for typical government sites
    const title = $('title').text().trim() || $('h1').first().text().trim() || 'Untitled Document';
    const textContent = $('body').text();
    
    // Look for things resembling notification numbers
    const notifMatch = textContent.match(/No\.\s*([A-Za-z0-9-/]+)/i) || textContent.match(/Notification\s*No\.?\s*([A-Za-z0-9-/]+)/i);
    const notificationNumber = notifMatch ? notifMatch[1] : undefined;
    
    return {
      ...baseMetadata,
      title,
      customData: {
        notificationNumber,
      }
    };
  }

  public async parse(context: ParserContext): Promise<ParserResult> {
    const result = new ParserResult();
    result.parserName = this.name;
    result.sourceId = context.sourceId;
    result.snapshotId = context.snapshotId;

    if (!this.validate(context)) {
      result.errors.push('Empty buffer provided to HTML Parser');
      return result;
    }

    try {
      const htmlString = context.rawBuffer.toString('utf-8');
      const $ = cheerio.load(htmlString);
      
      // Clean up scripts, styles, and empty elements
      $('script, style, noscript, iframe, svg, nav, footer, header').remove();

      // Extract main text content, compressing whitespace
      let contentText = $('body').text().replace(/\s+/g, ' ').trim();
      
      // Extract links & attachments
      const links: any[] = [];
      $('a').each((i, el) => {
        const href = $(el).attr('href');
        const text = $(el).text().trim();
        if (href && href.length > 1) {
          links.push({ text, href });
        }
      });

      result.extractedContent = contentText;
      
      const metadata = this.extractMetadata(context, $);
      result.extractedMetadata = {
        ...metadata,
        customData: {
          ...metadata.customData,
          extractedLinksCount: links.length,
          hasAttachments: links.some(l => l.href.toLowerCase().endsWith('.pdf'))
        }
      };
      
      result.success = true;
    } catch (e: unknown) {
      result.errors.push((e as Error).message);
    }

    return result;
  }
}
