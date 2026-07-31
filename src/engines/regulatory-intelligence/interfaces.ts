import { 
  SourceFrequencyType, 
  SourceHealthStatusType, 
  SupportedSourceCategory,
  ParserStrategy 
} from './types';

import { AccessStrategy } from '@prisma/client';

export interface IRegulatorySourceConfig {
  id?: string;
  name: string;
  authority: string;
  url: string;
  type: string;
  category: SupportedSourceCategory;
  enabled: boolean;
  frequency: SourceFrequencyType;
  priority: number;
  parserName?: ParserStrategy;
  accessStrategy?: AccessStrategy;
}

export interface ISourceSnapshotMetadata {
  checksum: string;
  recordCount: number;
  capturedBy: string;
  version: string;
}

export interface ISchedulerOptions {
  cronExpression?: string;
  frequency: SourceFrequencyType;
  retryCount?: number;
  timeoutMs?: number;
}

export interface IRegulatoryEngine {
  initialize(): Promise<void>;
  loadSources(): Promise<IRegulatorySourceConfig[]>;
  registerSource(config: IRegulatorySourceConfig): Promise<string>;
  enableSource(sourceId: string): Promise<boolean>;
  disableSource(sourceId: string): Promise<boolean>;
  getSourceHealth(sourceId: string): Promise<SourceHealthStatusType>;
  scheduleJobs(): Promise<void>;
}
