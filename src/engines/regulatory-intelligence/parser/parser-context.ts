export class ParserContext {
  public snapshotId: string;
  public sourceId: string;
  public mimeType: string;
  public rawBuffer: Buffer;
  public url: string;
  public options?: Record<string, unknown>;

  constructor(
    snapshotId: string, 
    sourceId: string, 
    mimeType: string, 
    rawBuffer: Buffer,
    url: string,
    options?: Record<string, unknown>
  ) {
    this.snapshotId = snapshotId;
    this.sourceId = sourceId;
    this.mimeType = mimeType;
    this.rawBuffer = rawBuffer;
    this.url = url;
    this.options = options;
  }
}
