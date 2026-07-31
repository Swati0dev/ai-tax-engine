import { ICanonicalDocument } from '../canonical';

/**
 * Service for fast-path comparison of Canonical Documents using their structural hashes.
 */
export class ChecksumService {
  
  /**
   * Compares the final checksum of two canonical documents.
   * If hashes match, no structural content has changed.
   */
  public static doHashesMatch(oldDoc: ICanonicalDocument, newDoc: ICanonicalDocument): boolean {
    if (!oldDoc.checksum || !newDoc.checksum) {
      return false; // Force deep comparison if checksums are missing
    }
    return oldDoc.checksum === newDoc.checksum;
  }
}
