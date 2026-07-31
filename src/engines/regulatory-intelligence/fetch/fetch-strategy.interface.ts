import { FetchContext } from './request-context';
import { NormalizedResponse } from './types';

export interface IFetchStrategy {
  execute(context: FetchContext): Promise<NormalizedResponse>;
}
