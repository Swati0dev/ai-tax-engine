import { ICanonicalDocument } from '../canonical';
import { DiffValidationError } from './diff-errors';

export class DiffValidator {
  public static validate(oldDoc: ICanonicalDocument, newDoc: ICanonicalDocument): void {
    if (!oldDoc) {
      throw new DiffValidationError('Missing old canonical document.');
    }
    
    if (!newDoc) {
      throw new DiffValidationError('Missing new canonical document.');
    }
    
    // In strict environments, we might enforce that the documents belong to the same logical chain,
    // e.g. checking that oldDoc and newDoc come from the same official source ID or category.
    // For now, we just ensure schemas are compatible if we had strict versioning.
    if (oldDoc.schemaVersion !== newDoc.schemaVersion) {
      // Potentially warn or map schemas here. 
      // For phase 4, we assume they are compatible if they both fit ICanonicalDocument.
    }
  }
}
