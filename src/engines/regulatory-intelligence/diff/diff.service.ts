import { ICanonicalDocument } from '../canonical';
import { ChangeSet } from './diff-result';
import { ChecksumService } from './checksum.service';
import { VersionService } from './version.service';
import { DiffValidator } from './diff-validator';
import { DiffContext } from './diff-context';
import { DiffFactory } from './diff-factory';

import { SectionComparator } from './section-comparator';
import { MetadataComparator } from './metadata-comparator';
import { AttachmentComparator } from './attachment-comparator';
import { LinkComparator } from './link-comparator';

export class DiffService {
  private sectionComparator = new SectionComparator();
  private metadataComparator = new MetadataComparator();
  private attachmentComparator = new AttachmentComparator();
  private linkComparator = new LinkComparator();

  /**
   * Deterministically compares two Canonical Documents and outputs a ChangeSet.
   */
  public compare(oldDoc: ICanonicalDocument, newDoc: ICanonicalDocument): ChangeSet {
    // 1. Validation
    DiffValidator.validate(oldDoc, newDoc);

    const currentVersion = oldDoc.canonicalVersion || '1.0.0';

    // 2. Fast-path Checksum Match
    if (ChecksumService.doHashesMatch(oldDoc, newDoc)) {
      return DiffFactory.createNoChangeSet(oldDoc, newDoc, currentVersion);
    }

    // 3. Deep Comparison Initialization
    const context = new DiffContext();

    // 4. Execute Comparators
    const secResult = this.sectionComparator.compare(oldDoc, newDoc);
    const metaResult = this.metadataComparator.compare(oldDoc, newDoc);
    const attResult = this.attachmentComparator.compare(oldDoc, newDoc);
    const linkResult = this.linkComparator.compare(oldDoc, newDoc);

    // 5. Aggregate Results
    context.addResult(secResult, 'sections');
    context.addResult(metaResult, 'metadata');
    context.addResult(attResult, 'attachments');
    context.addResult(linkResult, 'links');

    // 6. Version Calculation
    let newVersion = currentVersion;
    if (context.hasChanges) {
      newVersion = VersionService.calculateNextVersion(currentVersion, [secResult, metaResult, attResult, linkResult]);
    }

    // 7. Factory Assembly
    return DiffFactory.createChangeSet(oldDoc, newDoc, context, newVersion);
  }
}
