import { ChangeSeverity, ChangeType } from './diff-types';

export interface ChangeSet {
  changeId: string;
  documentId: string;
  oldChecksum: string;
  newChecksum: string;
  
  changeDetected: boolean;
  changeType: ChangeType[];
  changeSeverity: ChangeSeverity;
  
  version: string; // The assigned version (major.minor.patch)
  createdAt: string; // ISO 8601
  
  sectionsChanged: boolean;
  metadataChanged: boolean;
  attachmentsChanged: boolean;
  linksChanged: boolean;
  
  summary: string[]; // Deterministic descriptions ONLY. NO AI.
  warnings: string[];
}
