import { ParserContext } from './parser-context';
import { ParserResult } from './parser-result';
import { ExtractedMetadata } from './types';

export interface IParserStrategy {
  name: string;
  supports(mimeType: string): boolean;
  parse(context: ParserContext): Promise<ParserResult>;
  validate(context: ParserContext): boolean;
  extractMetadata(context: ParserContext): ExtractedMetadata;
}

export interface IParserFactory {
  getParser(mimeType: string): IParserStrategy;
}

export interface IParserRegistry {
  register(strategy: IParserStrategy): void;
  getStrategies(): IParserStrategy[];
}

export interface IParserEngine {
  parseSnapshot(snapshotId: string, mimeType: string, rawBuffer: Buffer, url: string): Promise<ParserResult>;
}

export interface IParserValidator {
  validateResult(result: ParserResult): boolean;
}
