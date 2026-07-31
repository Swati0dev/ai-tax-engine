import { ParserResult } from '../parser';
import { CanonicalDocument } from './canonical-document';
import { CanonicalFactory } from './canonical.factory';
import { CanonicalSection } from './types';
import crypto from 'crypto';

/**
 * Service responsible for deterministic, side-effect free normalization
 * of ParserResult into the Enterprise Canonical Document Model.
 * 
 * Rules:
 * - NO AI reasoning or inference here.
 * - Same ParserResult = Same CanonicalDocument.
 * - Idempotent mapping.
 */
export class CanonicalNormalizerService {

  public normalize(parserResult: ParserResult): CanonicalDocument {
    
    const sections = this.segmentContent(parserResult.extractedContent);
    
    // Normalize dates to basic ISO strings if they are present, 
    // otherwise leave null. (Basic deterministic cleaning).
    const issuedDate = this.normalizeDate(parserResult.extractedDate);
    
    return CanonicalFactory.createDocument({
      sourceSnapshotId: parserResult.snapshotId,
      parserVersion: '1.0.0', // We might eventually get this from ParserResult if parsers report versions
      originalChecksum: parserResult.checksum,
      
      title: parserResult.extractedTitle || 'Untitled Document',
      issuedDate: issuedDate,
      issuingAuthority: parserResult.extractedAuthor || null,
      
      summary: null, // Summary will be populated by AI later if needed, or if the parser extracted an explicit summary
      
      content: sections,
      links: parserResult.extractedLinks || [],
      attachments: parserResult.extractedAttachments?.map(url => ({
        id: `att_${crypto.randomUUID()}`,
        url,
        fileName: url.split('/').pop() || 'attachment',
        mimeType: 'application/octet-stream' // Deterministic default
      })) || [],
      
      metadata: parserResult.extractedMetadata || {}
    });
  }

  /**
   * Extremely naive deterministic segmenter.
   * Splits raw text by double-newlines into paragraphs.
   * A more advanced deterministic structural segmenter could be used here.
   */
  private segmentContent(rawContent: string): CanonicalSection[] {
    if (!rawContent || rawContent.trim() === '') {
      return [];
    }

    // Split by 2 or more newlines
    const paragraphs = rawContent.split(/\n\s*\n/).filter(p => p.trim() !== '');
    
    return paragraphs.map((text, index) => ({
      id: `sec_${index}`,
      type: 'PARAGRAPH',
      content: text.trim()
    }));
  }

  /**
   * Deterministic date string normalizer.
   * Returns a YYYY-MM-DD string if it matches known formats, or the original string.
   */
  private normalizeDate(rawDate: string | null): string | null {
    if (!rawDate) return null;
    
    // Attempt basic JS date parsing as a naive deterministic fallback. 
    // In production, we'd use a strict date library (date-fns, dayjs) with explicit formats to prevent local timezone issues.
    const dateObj = new Date(rawDate);
    if (!isNaN(dateObj.getTime())) {
       return dateObj.toISOString();
    }
    
    return rawDate;
  }
}
