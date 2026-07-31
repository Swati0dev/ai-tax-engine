import { CanonicalDocument, ICanonicalDocument } from './canonical-document';
import { CanonicalHashUtils } from './canonical-hash.utils';
import { DocumentCategory, AuthorityLevel, Jurisdiction } from './types';
import crypto from 'crypto';

export class CanonicalFactory {
  
  /**
   * Safely instantiates a CanonicalDocument enforcing all required properties.
   */
  public static createDocument(params: Partial<ICanonicalDocument>): CanonicalDocument {
    const doc = new CanonicalDocument();
    
    // Identity
    doc.id = params.id || `doc_${crypto.randomUUID()}`;
    doc.sourceSnapshotId = params.sourceSnapshotId || '';
    
    // Versions
    doc.schemaVersion = params.schemaVersion || '1.0.0';
    doc.canonicalVersion = params.canonicalVersion || '1.0.0';
    doc.parserVersion = params.parserVersion || '1.0.0';
    
    // Metadata
    doc.title = params.title || null;
    doc.issuedDate = params.issuedDate || null;
    doc.effectiveDate = params.effectiveDate || null;
    doc.issuingAuthority = params.issuingAuthority || null;
    
    // Taxonomy with safe defaults
    doc.category = params.category || DocumentCategory.UNKNOWN;
    doc.authorityLevel = params.authorityLevel || AuthorityLevel.UNKNOWN;
    doc.jurisdiction = params.jurisdiction || Jurisdiction.UNKNOWN;
    
    // Content
    doc.summary = params.summary || null;
    doc.content = params.content || [];
    
    // Attachments & Links
    doc.attachments = params.attachments || [];
    doc.links = params.links || [];
    
    // Pass-through metadata
    doc.metadata = params.metadata || {};
    
    // Integrity
    doc.originalChecksum = params.originalChecksum || null;
    doc.checksum = params.checksum || CanonicalHashUtils.generateDocumentHash(doc);
    
    return doc;
  }
}
