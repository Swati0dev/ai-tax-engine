import { IParserFactory, IParserValidator } from './interfaces';
import { ParserContext } from './parser-context';
import { ParserResult } from './parser-result';
import { ParserError } from './parser-errors';

export class ParserService {
  private factory: IParserFactory;
  private validator: IParserValidator;

  constructor(factory: IParserFactory, validator: IParserValidator) {
    this.factory = factory;
    this.validator = validator;
  }

  public async parse(context: ParserContext): Promise<ParserResult> {
    const result = new ParserResult();
    result.sourceId = context.sourceId;
    result.snapshotId = context.snapshotId;

    try {
      // 1. Resolve Strategy
      const parser = this.factory.getParser(context.mimeType);
      
      // 2. Parse Snapshot
      const parsedResult = await parser.parse(context);
      
      // 3. Validate Deterministic Output
      this.validator.validateResult(parsedResult);
      
      return parsedResult;
    } catch (error) {
      result.success = false;
      if (error instanceof ParserError) {
        result.errors.push(error.message);
      } else {
        result.errors.push(`Unexpected error during parsing: ${(error as Error).message}`);
      }
      return result;
    }
  }
}
