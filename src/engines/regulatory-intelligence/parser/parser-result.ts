import { ExtractedMetadata } from './types';

export class ParserResult {
  public success: boolean = false;
  public parserName: string = 'UnknownParser';
  public sourceId: string = '';
  public snapshotId: string = '';
  
  public extractedTitle: string | null = null;
  public extractedDate: string | null = null;
  public extractedAuthor: string | null = null;
  public extractedContent: string = '';
  public extractedMetadata: ExtractedMetadata = {};
  public extractedLinks: string[] = [];
  public extractedAttachments: string[] = [];
  
  public warnings: string[] = [];
  public errors: string[] = [];
  public checksum: string | null = null;
}
