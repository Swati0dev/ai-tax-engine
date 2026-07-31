import { CanonicalAttachment, CanonicalSection, AuthorityLevel, DocumentCategory, Jurisdiction } from './types';

export interface ICanonicalDocument {
  // Identity & Versions
  id: string; // Canonical ID
  sourceSnapshotId: string; // Lineage tracking
  schemaVersion: string;
  canonicalVersion: string;
  parserVersion: string;

  // Integrity
  checksum: string; // Hash of this canonical representation
  originalChecksum: string | null; // From the raw snapshot/ParserResult

  // Document Metadata
  title: string | null;
  issuedDate: string | null; // ISO 8601 Date string
  effectiveDate: string | null; // ISO 8601 Date string
  issuingAuthority: string | null;

  // Taxonomy
  category: DocumentCategory;
  authorityLevel: AuthorityLevel;
  jurisdiction: Jurisdiction;

  // Content
  summary: string | null;
  content: CanonicalSection[];

  // Links & Attachments
  attachments: CanonicalAttachment[];
  links: string[];

  // Source Details
  metadata: Record<string, unknown>; // Original source-specific metadata
}

export class CanonicalDocument implements ICanonicalDocument {
  public id: string = '';
  public sourceSnapshotId: string = '';
  public schemaVersion: string = '1.0.0';
  public canonicalVersion: string = '1.0.0';
  public parserVersion: string = '1.0.0';
  
  public checksum: string = '';
  public originalChecksum: string | null = null;
  
  public title: string | null = null;
  public issuedDate: string | null = null;
  public effectiveDate: string | null = null;
  public issuingAuthority: string | null = null;
  
  public category: DocumentCategory = DocumentCategory.UNKNOWN;
  public authorityLevel: AuthorityLevel = AuthorityLevel.UNKNOWN;
  public jurisdiction: Jurisdiction = Jurisdiction.UNKNOWN;
  
  public summary: string | null = null;
  public content: CanonicalSection[] = [];
  
  public attachments: CanonicalAttachment[] = [];
  public links: string[] = [];
  
  public metadata: Record<string, unknown> = {};

  constructor(init?: Partial<ICanonicalDocument>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
