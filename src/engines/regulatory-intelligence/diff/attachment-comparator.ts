import { ICanonicalDocument } from '../canonical';
import { ChangeSeverity, ChangeType, ComparatorResult } from './diff-types';

export class AttachmentComparator {
  public compare(oldDoc: ICanonicalDocument, newDoc: ICanonicalDocument): ComparatorResult {
    const oldAttachments = oldDoc.attachments || [];
    const newAttachments = newDoc.attachments || [];
    
    let addedCount = 0;
    let removedCount = 0;
    let modifiedCount = 0;
    
    const changeTypes = new Set<ChangeType>();
    const details: string[] = [];
    
    // Compare by URL mostly, since IDs might be ephemeral if the canonical document was regenerated
    const oldMap = new Map(oldAttachments.map(a => [a.url, a]));
    const newMap = new Map(newAttachments.map(a => [a.url, a]));
    
    for (const [url, newAtt] of newMap.entries()) {
      const oldAtt = oldMap.get(url);
      if (!oldAtt) {
        addedCount++;
        changeTypes.add(ChangeType.ATTACHMENT_CHANGED);
      } else if (oldAtt.checksum !== newAtt.checksum || oldAtt.fileName !== newAtt.fileName) {
        modifiedCount++;
        changeTypes.add(ChangeType.ATTACHMENT_CHANGED);
      }
    }
    
    for (const url of oldMap.keys()) {
      if (!newMap.has(url)) {
        removedCount++;
        changeTypes.add(ChangeType.ATTACHMENT_CHANGED);
      }
    }
    
    if (addedCount > 0) details.push(`${addedCount} attachments added.`);
    if (removedCount > 0) details.push(`${removedCount} attachments removed.`);
    if (modifiedCount > 0) details.push(`${modifiedCount} attachments modified.`);
    
    let severity = ChangeSeverity.NONE;
    if (addedCount > 0 || removedCount > 0 || modifiedCount > 0) {
      severity = ChangeSeverity.MEDIUM;
    }
    
    return {
      hasChanges: severity !== ChangeSeverity.NONE,
      changeTypes: Array.from(changeTypes),
      severity,
      details
    };
  }
}
