import { IParserFactory, IParserRegistry, IParserStrategy } from './interfaces';
import { UnsupportedMimeTypeError } from './parser-errors';

export class ParserFactory implements IParserFactory {
  private registry: IParserRegistry;

  constructor(registry: IParserRegistry) {
    this.registry = registry;
  }

  public getParser(mimeType: string): IParserStrategy {
    const strategies = this.registry.getStrategies();
    const parser = strategies.find((strategy) => strategy.supports(mimeType));
    
    if (!parser) {
      throw new UnsupportedMimeTypeError(mimeType);
    }
    
    return parser;
  }
}
