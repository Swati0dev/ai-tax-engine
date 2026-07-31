import { IFetchEngine } from './interfaces';
import { FetchMethod, NormalizedResponse } from './types';
import { FetchContext } from './request-context';
import { FetchService } from './fetch.service';
import { SnapshotService } from './snapshot.service';
import { AccessStrategy } from '@prisma/client';

export class FetchEngine implements IFetchEngine {
  private fetchService = new FetchService();
  private snapshotService = new SnapshotService();

  public async fetch(url: string, method: FetchMethod = FetchMethod.HTTP, sourceId?: string, strategy: AccessStrategy = 'HTTP_FETCH'): Promise<NormalizedResponse> {
    console.log(`[FetchEngine] Orchestrating fetch for: ${url}`);
    
    const context = new FetchContext(url, method, sourceId, strategy);
    
    try {
      // Step 1: Execute fetch pipeline
      const response = await this.fetchService.execute(context);
      
      // Step 2: Persist immutable snapshot if sourceId is provided
      if (sourceId) {
         await this.snapshotService.createSnapshot(sourceId, response);
      }
      
      return response;
    } catch (error) {
      console.error(`[FetchEngine] Fetch failed for ${url}`, error);
      throw error;
    }
  }
}

export const fetchEngine = new FetchEngine();
