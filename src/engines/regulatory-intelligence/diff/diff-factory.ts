import { ChangeSet } from './diff-result';
import { ICanonicalDocument } from '../canonical';
import { DiffContext } from './diff-context';
import { ChangeSeverity } from './diff-types';
import crypto from 'crypto';

export class DiffFactory {
  public static createChangeSet(
    oldDoc: ICanonicalDocument, 
    newDoc: ICanonicalDocument, 
    context: DiffContext, 
    version: string
  ): ChangeSet {
    return {
      changeId: `change_${crypto.randomUUID()}`,
      documentId: newDoc.id,
      oldChecksum: oldDoc.checksum || '',
      newChecksum: newDoc.checksum || '',
      
      changeDetected: context.hasChanges,
      changeType: Array.from(context.changeTypes),
      changeSeverity: context.severity,
      
      version,
      createdAt: new Date().toISOString(),
      
      sectionsChanged: context.sectionsChanged,
      metadataChanged: context.metadataChanged,
      attachmentsChanged: context.attachmentsChanged,
      linksChanged: context.linksChanged,
      
      summary: context.details, // Purely deterministic
      warnings: []
    };
  }

  public static createNoChangeSet(
    oldDoc: ICanonicalDocument, 
    newDoc: ICanonicalDocument, 
    version: string
  ): ChangeSet {
    return {
      changeId: `change_${crypto.randomUUID()}`,
      documentId: newDoc.id,
      oldChecksum: oldDoc.checksum || '',
      newChecksum: newDoc.checksum || '',
      
      changeDetected: false,
      changeType: [],
      changeSeverity: ChangeSeverity.NONE,
      
      version,
      createdAt: new Date().toISOString(),
      
      sectionsChanged: false,
      metadataChanged: false,
      attachmentsChanged: false,
      linksChanged: false,
      
      summary: ['No structural changes detected via checksum comparison.'],
      warnings: []
    };
  }
}
