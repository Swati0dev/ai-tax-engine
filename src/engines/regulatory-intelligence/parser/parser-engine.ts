import { IParserEngine } from './interfaces';
import { ParserContext } from './parser-context';
import { ParserResult } from './parser-result';
import { ParserService } from './parser.service';
import { ParserFactory } from './parser-factory';
import { ParserRegistry } from './parser-registry';
import { ParserValidator } from './parser-validator';

// Strategies
import { HTMLParserStrategy } from './strategies/html/html-parser';
import { PDFParserStrategy } from './strategies/pdf/pdf-parser';
import { RSSParserStrategy } from './strategies/rss/rss-parser';
import { XMLParserStrategy } from './strategies/xml/xml-parser';
import { JSONParserStrategy } from './strategies/json/json-parser';

export class ParserEngine implements IParserEngine {
  private parserService: ParserService;

  constructor() {
    const registry = new ParserRegistry();
    // Register all supported deterministic strategies
    registry.register(new HTMLParserStrategy());
    registry.register(new PDFParserStrategy());
    registry.register(new RSSParserStrategy());
    registry.register(new XMLParserStrategy());
    registry.register(new JSONParserStrategy());

    const factory = new ParserFactory(registry);
    const validator = new ParserValidator();

    this.parserService = new ParserService(factory, validator);
  }

  /**
   * Deterministically parses a raw snapshot buffer into a structured object.
   * @param snapshotId The immutable snapshot ID
   * @param mimeType The MIME type of the raw content
   * @param rawBuffer The raw opaque buffer from the Fetch Layer
   * @param url The origin canonical URL
   * @returns ParserResult The strongly typed, structured representation
   */
  public async parseSnapshot(
    snapshotId: string,
    mimeType: string,
    rawBuffer: Buffer,
    url: string,
    sourceId: string = 'UNKNOWN_SOURCE'
  ): Promise<ParserResult> {
    console.log(`[ParserEngine] Parsing snapshot: ${snapshotId} [${mimeType}]`);
    const context = new ParserContext(snapshotId, sourceId, mimeType, rawBuffer, url);
    return this.parserService.parse(context);
  }
}
