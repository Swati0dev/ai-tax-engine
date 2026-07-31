import crypto from 'crypto';
import { ICanonicalDocument } from './canonical-document';

/**
 * Utility for generating deterministic hashes of Canonical Documents.
 * Excludes variable metadata (like generated timestamps or changing schemas)
 * from the hash to ensure structural diffs are accurate.
 */
export class CanonicalHashUtils {
  
  public static generateDocumentHash(doc: Partial<ICanonicalDocument>): string {
    // We only hash the meaningful content attributes that constitute a change in the document's substance.
    const hashableObject = {
      title: doc.title,
      issuedDate: doc.issuedDate,
      effectiveDate: doc.effectiveDate,
      issuingAuthority: doc.issuingAuthority,
      category: doc.category,
      authorityLevel: doc.authorityLevel,
      jurisdiction: doc.jurisdiction,
      summary: doc.summary,
      content: doc.content?.map(c => ({ type: c.type, content: c.content, level: c.level })), // omitting section IDs which might change
      attachments: doc.attachments?.map(a => a.checksum || a.url),
      links: doc.links,
      originalChecksum: doc.originalChecksum
    };

    const hashString = JSON.stringify(hashableObject, Object.keys(hashableObject).sort());
    
    return crypto.createHash('sha256').update(hashString).digest('hex');
  }
}
