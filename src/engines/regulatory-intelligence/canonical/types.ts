export enum DocumentCategory {
  CIRCULAR = 'CIRCULAR',
  NOTIFICATION = 'NOTIFICATION',
  ACT = 'ACT',
  RULE = 'RULE',
  CASE_LAW = 'CASE_LAW',
  PRESS_RELEASE = 'PRESS_RELEASE',
  GUIDELINE = 'GUIDELINE',
  ORDER = 'ORDER',
  UNKNOWN = 'UNKNOWN'
}

export enum AuthorityLevel {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  UNKNOWN = 'UNKNOWN'
}

export enum Jurisdiction {
  CENTRAL = 'CENTRAL',
  STATE = 'STATE',
  INTERNATIONAL = 'INTERNATIONAL',
  UNKNOWN = 'UNKNOWN'
}

export interface CanonicalAttachment {
  id: string;
  fileName: string;
  mimeType: string;
  url: string;
  checksum?: string;
}

export interface CanonicalSection {
  id: string;
  type: 'HEADING' | 'PARAGRAPH' | 'LIST' | 'TABLE' | 'QUOTE' | 'UNKNOWN';
  content: string;
  level?: number; // e.g., 1 for H1, 2 for H2
  metadata?: Record<string, unknown>;
}
