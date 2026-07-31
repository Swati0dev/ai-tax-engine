import { ICanonicalDocument } from '../canonical';
import { ChangeSeverity, ChangeType, ComparatorResult } from './diff-types';

export class LinkComparator {
  public compare(oldDoc: ICanonicalDocument, newDoc: ICanonicalDocument): ComparatorResult {
    const oldLinks = oldDoc.links || [];
    const newLinks = newDoc.links || [];
    
    const oldSet = new Set(oldLinks);
    const newSet = new Set(newLinks);
    
    let addedCount = 0;
    let removedCount = 0;
    
    for (const url of newSet) {
      if (!oldSet.has(url)) addedCount++;
    }
    
    for (const url of oldSet) {
      if (!newSet.has(url)) removedCount++;
    }
    
    const changeTypes = new Set<ChangeType>();
    const details: string[] = [];
    
    if (addedCount > 0 || removedCount > 0) {
      changeTypes.add(ChangeType.LINK_CHANGED);
    }
    
    if (addedCount > 0) details.push(`${addedCount} links added.`);
    if (removedCount > 0) details.push(`${removedCount} links removed.`);
    
    const severity = (addedCount > 0 || removedCount > 0) ? ChangeSeverity.LOW : ChangeSeverity.NONE;
    
    return {
      hasChanges: severity !== ChangeSeverity.NONE,
      changeTypes: Array.from(changeTypes),
      severity,
      details
    };
  }
}
