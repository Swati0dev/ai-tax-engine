import { IParserStrategy } from '../../interfaces';
import { ParserContext } from '../../parser-context';
import { ParserResult } from '../../parser-result';
import { ExtractedMetadata, ParserMimeType } from '../../types';
import { ParserUtils } from '../../parser-utils';

export class PDFParserStrategy implements IParserStrategy {
  public name = 'PDFParser';

  public supports(mimeType: string): boolean {
    return mimeType === ParserMimeType.PDF;
  }

  public validate(context: ParserContext): boolean {
    return context.rawBuffer && context.rawBuffer.length > 0;
  }

  public extractMetadata(context: ParserContext): ExtractedMetadata {
    return {
      ...ParserUtils.extractBaseMetadata(context),
      // Future Phase: Extract PDF metadata (Author, CreationDate) via pdf-lib/pdf2json
    };
  }

  public async parse(context: ParserContext): Promise<ParserResult> {
    const result = new ParserResult();
    result.parserName = this.name;
    result.sourceId = context.sourceId;
    result.snapshotId = context.snapshotId;

    if (!this.validate(context)) {
      result.errors.push('Empty buffer provided to PDF Parser');
      return result;
    }

    try {
      // Future Phase: Invoke determinist PDF parser
      result.extractedContent = `[PDF_PLACEHOLDER] Buffer size: ${context.rawBuffer.length} bytes`;
      result.extractedMetadata = this.extractMetadata(context);
      result.success = true;
    } catch (e: unknown) {
      result.errors.push((e as Error).message);
    }

    return result;
  }
}
