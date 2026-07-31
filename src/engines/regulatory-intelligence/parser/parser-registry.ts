import { IParserRegistry, IParserStrategy } from './interfaces';

export class ParserRegistry implements IParserRegistry {
  private strategies: IParserStrategy[] = [];

  public register(strategy: IParserStrategy): void {
    this.strategies.push(strategy);
  }

  public getStrategies(): IParserStrategy[] {
    return this.strategies;
  }
}
