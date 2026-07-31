import { ICanonicalDocument } from '../canonical';
import { ChangeSeverity, ChangeType, ComparatorResult } from './diff-types';

export class SectionComparator {
  public compare(oldDoc: ICanonicalDocument, newDoc: ICanonicalDocument): ComparatorResult {
    const oldSections = oldDoc.content || [];
    const newSections = newDoc.content || [];
    
    let addedCount = 0;
    let removedCount = 0;
    let modifiedCount = 0;
    
    const changeTypes = new Set<ChangeType>();
    const details: string[] = [];
    
    // Map by generic ID or index for deterministic matching
    // If IDs are regenerated, we fall back to index matching for a simple naive diff.
    const oldMap = new Map(oldSections.map((s, i) => [s.id || `idx_${i}`, s]));
    const newMap = new Map(newSections.map((s, i) => [s.id || `idx_${i}`, s]));
    
    for (const [key, newSec] of newMap.entries()) {
      const oldSec = oldMap.get(key);
      if (!oldSec) {
        addedCount++;
        changeTypes.add(ChangeType.SECTION_ADDED);
      } else if (oldSec.content !== newSec.content || oldSec.type !== newSec.type || oldSec.level !== newSec.level) {
        modifiedCount++;
        changeTypes.add(ChangeType.CONTENT_CHANGED);
      }
    }
    
    for (const key of oldMap.keys()) {
      if (!newMap.has(key)) {
        removedCount++;
        changeTypes.add(ChangeType.SECTION_REMOVED);
      }
    }
    
    if (addedCount > 0) details.push(`${addedCount} sections added.`);
    if (removedCount > 0) details.push(`${removedCount} sections removed.`);
    if (modifiedCount > 0) details.push(`${modifiedCount} sections modified.`);
    
    let severity = ChangeSeverity.NONE;
    if (addedCount > 0 || removedCount > 0 || modifiedCount > 0) {
      severity = ChangeSeverity.HIGH; // Structural content changes are generally high severity in regulations
    }
    
    return {
      hasChanges: severity !== ChangeSeverity.NONE,
      changeTypes: Array.from(changeTypes),
      severity,
      details
    };
  }
}
