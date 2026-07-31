import { ICanonicalDocument } from '../canonical';
import { ChangeSeverity, ChangeType, ComparatorResult } from './diff-types';

export class MetadataComparator {
  public compare(oldDoc: ICanonicalDocument, newDoc: ICanonicalDocument): ComparatorResult {
    const changeTypes = new Set<ChangeType>();
    const details: string[] = [];
    
    let severity = ChangeSeverity.NONE;

    if (oldDoc.title !== newDoc.title) {
      changeTypes.add(ChangeType.TITLE_CHANGED);
      changeTypes.add(ChangeType.METADATA_CHANGED);
      details.push(`Title changed from "${oldDoc.title}" to "${newDoc.title}".`);
      severity = this.maxSeverity(severity, ChangeSeverity.MEDIUM);
    }

    if (oldDoc.issuedDate !== newDoc.issuedDate || oldDoc.effectiveDate !== newDoc.effectiveDate) {
      changeTypes.add(ChangeType.DATE_CHANGED);
      changeTypes.add(ChangeType.METADATA_CHANGED);
      details.push(`Important dates changed.`);
      severity = this.maxSeverity(severity, ChangeSeverity.HIGH); // Dates in regulations are critical
    }

    if (oldDoc.category !== newDoc.category) {
      changeTypes.add(ChangeType.METADATA_CHANGED);
      details.push(`Category changed from ${oldDoc.category} to ${newDoc.category}.`);
      severity = this.maxSeverity(severity, ChangeSeverity.MEDIUM);
    }
    
    if (oldDoc.authorityLevel !== newDoc.authorityLevel) {
      changeTypes.add(ChangeType.METADATA_CHANGED);
      details.push(`Authority Level changed from ${oldDoc.authorityLevel} to ${newDoc.authorityLevel}.`);
      severity = this.maxSeverity(severity, ChangeSeverity.MEDIUM);
    }
    
    if (oldDoc.issuingAuthority !== newDoc.issuingAuthority) {
      changeTypes.add(ChangeType.METADATA_CHANGED);
      details.push(`Issuing Authority changed.`);
      severity = this.maxSeverity(severity, ChangeSeverity.LOW);
    }

    return {
      hasChanges: changeTypes.size > 0,
      changeTypes: Array.from(changeTypes),
      severity,
      details
    };
  }

  private maxSeverity(s1: ChangeSeverity, s2: ChangeSeverity): ChangeSeverity {
    const levels = {
      [ChangeSeverity.NONE]: 0,
      [ChangeSeverity.LOW]: 1,
      [ChangeSeverity.MEDIUM]: 2,
      [ChangeSeverity.HIGH]: 3,
      [ChangeSeverity.CRITICAL]: 4
    };
    return levels[s1] > levels[s2] ? s1 : s2;
  }
}
