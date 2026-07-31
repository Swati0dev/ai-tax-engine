import { FetchContext } from './request-context';
import { NormalizedResponse } from './types';
import { IFetchStrategy } from './fetch-strategy.interface';

export class HeadlessFetchStrategy implements IFetchStrategy {
  public async execute(context: FetchContext): Promise<NormalizedResponse> {
    console.log(`[HeadlessFetchStrategy] Attempting to execute headless fetch for ${context.url}`);
    
    // As per Phase 8 requirements: Do not add browser automation.
    // Implement only the abstraction and explicitly throw NotImplementedError.
    
    throw new Error("NotImplementedError: Headless Browser strategy is not implemented in Phase 8.");
  }
}
