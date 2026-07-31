import { IParserValidator } from './interfaces';
import { ParserResult } from './parser-result';
import { PARSER_CONFIG } from './parser-config';
import { ParserValidationError } from './parser-errors';

export class ParserValidator implements IParserValidator {
  public validateResult(result: ParserResult): boolean {
    if (PARSER_CONFIG.STRICT_MODE) {
      if (!result.extractedContent && !result.errors.length) {
        throw new ParserValidationError('Parsed result has no content and no errors logged.');
      }
      
      if (result.extractedTitle && result.extractedTitle.length > PARSER_CONFIG.MAX_TITLE_LENGTH) {
        throw new ParserValidationError('Parsed title exceeds maximum allowed length.');
      }
    }
    return true;
  }
}
