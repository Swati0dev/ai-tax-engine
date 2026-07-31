import { ChangeSeverity, ChangeType, ComparatorResult } from './diff-types';

export class DiffContext {
  public changeTypes = new Set<ChangeType>();
  public severity: ChangeSeverity = ChangeSeverity.NONE;
  public details: string[] = [];
  public sectionsChanged = false;
  public metadataChanged = false;
  public attachmentsChanged = false;
  public linksChanged = false;
  
  public addResult(result: ComparatorResult, category: 'sections' | 'metadata' | 'attachments' | 'links') {
    if (!result.hasChanges) return;
    
    result.changeTypes.forEach(t => this.changeTypes.add(t));
    this.details.push(...result.details);
    this.severity = this.maxSeverity(this.severity, result.severity);
    
    if (category === 'sections') this.sectionsChanged = true;
    if (category === 'metadata') this.metadataChanged = true;
    if (category === 'attachments') this.attachmentsChanged = true;
    if (category === 'links') this.linksChanged = true;
  }
  
  public get hasChanges(): boolean {
    return this.changeTypes.size > 0;
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
