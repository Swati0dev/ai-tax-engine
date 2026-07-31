import { ICanonicalDocument } from '../canonical';
import { ChangeSet } from './diff-result';
import { DiffService } from './diff.service';

/**
 * Enterprise Change Detection & Version Comparison Engine
 * Facade pattern entry point for the Diff module.
 */
export class DiffEngine {
  private diffService = new DiffService();

  /**
   * Compares an old CanonicalDocument with a new one to generate a ChangeSet.
   */
  public compareDocuments(oldDoc: ICanonicalDocument, newDoc: ICanonicalDocument): ChangeSet {
    return this.diffService.compare(oldDoc, newDoc);
  }
}
