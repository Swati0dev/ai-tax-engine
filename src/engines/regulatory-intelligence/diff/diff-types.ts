export enum ChangeType {
  NO_CHANGE = 'NO_CHANGE',
  CONTENT_CHANGED = 'CONTENT_CHANGED',
  METADATA_CHANGED = 'METADATA_CHANGED',
  SECTION_ADDED = 'SECTION_ADDED',
  SECTION_REMOVED = 'SECTION_REMOVED',
  LINK_CHANGED = 'LINK_CHANGED',
  ATTACHMENT_CHANGED = 'ATTACHMENT_CHANGED',
  TITLE_CHANGED = 'TITLE_CHANGED',
  DATE_CHANGED = 'DATE_CHANGED',
  UNKNOWN = 'UNKNOWN'
}

export enum ChangeSeverity {
  NONE = 'NONE',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface ComparatorResult {
  hasChanges: boolean;
  changeTypes: ChangeType[];
  severity: ChangeSeverity;
  details: string[]; // Deterministic descriptions of changes
}
