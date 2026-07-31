import { IRegulatoryEngine, IRegulatorySourceConfig } from './interfaces';
import { SourceHealthStatusType } from './types';
import { OFFICIAL_SOURCES_REGISTRY } from './source-registry';
import { schedulerService } from './scheduler.service';
import { fetchEngine, FetchMethod, NormalizedResponse } from './fetch';
import { ParserEngine } from './parser';
import { CanonicalNormalizerService, ICanonicalDocument } from './canonical';
import { DiffEngine, ChangeSet } from './diff';
import { prisma } from '@/lib/db';
import crypto from 'crypto';

const parserEngine = new ParserEngine();
const canonicalNormalizer = new CanonicalNormalizerService();
const diffEngine = new DiffEngine();

/**
 * RegulatoryIntelligenceEngine
 * 
 * Phase 2A: Fetch Layer Foundation Integration
 */
export class RegulatoryIntelligenceEngine implements IRegulatoryEngine {
  private sources: Map<string, IRegulatorySourceConfig> = new Map();
  private initialized: boolean = false;

  public async initialize(): Promise<void> {
    if (this.initialized) return;
    
    console.log('[RegulatoryEngine] Initializing RIE Foundation...');
    await schedulerService.initialize();
    await this.loadSources();
    
    this.initialized = true;
    console.log('[RegulatoryEngine] RIE Foundation initialized successfully.');
  }

  public async loadSources(): Promise<IRegulatorySourceConfig[]> {
    console.log('[RegulatoryEngine] Loading official sources into registry from DB...');
    
    for (const source of OFFICIAL_SOURCES_REGISTRY) {
      const dbSource = await prisma.officialSource.findFirst({
        where: { url: source.url }
      });
      
      let finalSource;
      if (!dbSource) {
        finalSource = await prisma.officialSource.create({
          data: {
            name: source.name,
            authority: source.authority,
            url: source.url,
            type: source.type,
            enabled: source.enabled,
            // @ts-ignore
            frequency: source.frequency,
            priority: source.priority,
            parserName: source.parserName,
            accessStrategy: 'HTTP_FETCH' // Default for new creations if not specified
          }
        });
      } else {
        finalSource = dbSource;
      }
      
      this.sources.set(finalSource.id, {
        id: finalSource.id,
        name: finalSource.name,
        authority: finalSource.authority,
        url: finalSource.url,
        type: finalSource.type as any,
        category: source.category, // Kept in memory only
        enabled: finalSource.enabled,
        frequency: finalSource.frequency as any,
        priority: finalSource.priority,
        parserName: finalSource.parserName || undefined,
        accessStrategy: finalSource.accessStrategy,
      });
    }

    return Array.from(this.sources.values());
  }

  public async registerSource(config: IRegulatorySourceConfig): Promise<string> {
    console.log(`[RegulatoryEngine] Registering new source: ${config.name}`);
    const mockId = `src_${Date.now()}`;
    this.sources.set(mockId, { ...config, id: mockId });
    return mockId;
  }

  public async enableSource(sourceId: string): Promise<boolean> {
    console.log(`[RegulatoryEngine] Enabling source: ${sourceId}`);
    const source = this.sources.get(sourceId);
    if (!source) throw new Error(`Source with ID ${sourceId} not found`);
    source.enabled = true;
    return true;
  }

  public async disableSource(sourceId: string): Promise<boolean> {
    console.log(`[RegulatoryEngine] Disabling source: ${sourceId}`);
    const source = this.sources.get(sourceId);
    if (!source) throw new Error(`Source with ID ${sourceId} not found`);
    source.enabled = false;
    return true;
  }

  public async getSourceHealth(sourceId: string): Promise<SourceHealthStatusType> {
    console.log(`[RegulatoryEngine] Checking health for source: ${sourceId}`);
    if (!this.sources.has(sourceId)) throw new Error(`Source with ID ${sourceId} not found`);
    return 'UNKNOWN';
  }

  public async scheduleJobs(): Promise<void> {
    console.log('[RegulatoryEngine] Triggering global job scheduling...');
    for (const [id, source] of this.sources.entries()) {
      if (source.enabled) {
        await schedulerService.scheduleSourceCheck(id, { frequency: source.frequency });
      }
    }
  }

  // --- Phase 2A: Fetch Layer Integration ---

  /**
   * Orchestrates fetching raw content from a specific source
   */
  public async fetchSource(sourceId: string): Promise<NormalizedResponse> {
    const source = this.sources.get(sourceId);
    if (!source) throw new Error(`Source with ID ${sourceId} not found`);
    if (!source.enabled) throw new Error(`Source ${sourceId} is disabled`);

    console.log(`[RegulatoryEngine] Fetching source: ${source.name} using strategy: ${source.accessStrategy || 'HTTP_FETCH'}`);
    return fetchEngine.fetch(source.url, FetchMethod.HTTP, sourceId, source.accessStrategy || 'HTTP_FETCH');
  }

  /**
   * Triggers a global fetch for all enabled sources
   */
  public async fetchAllSources(): Promise<void> {
    console.log('[RegulatoryEngine] Triggering fetch for all enabled sources...');
    for (const [id, source] of this.sources.entries()) {
      if (source.enabled) {
        try {
          await this.fetchSource(id);
        } catch (error) {
          console.error(`Failed to fetch source ${id}`, error);
        }
      }
    }
  }

  /**
   * Exposes raw fetch validation mechanism
   */
  public validateFetch(response: NormalizedResponse): boolean {
    return !!response && response.status === 200;
  }

  /**
   * Creates an immutable snapshot and persists it to the database
   */
  public async createSnapshot(sourceId: string, response: NormalizedResponse): Promise<string> {
    console.log(`[RegulatoryEngine] Creating snapshot for source: ${sourceId}`);
    
    const buffer = Buffer.isBuffer(response.rawBody) 
      ? response.rawBody 
      : Buffer.from(typeof response.rawBody === 'string' ? response.rawBody : JSON.stringify(response.rawBody));
      
    const contentHash = crypto.createHash('sha256').update(buffer).digest('hex');

    const snapshot = await prisma.sourceSnapshot.create({
      data: {
        sourceId,
        contentHash,
        metadata: {
          status: response.status,
          contentType: response.contentType,
          responseTime: response.responseTime,
          headers: response.headers,
        },
      }
    });

    return snapshot.id;
  }

  // --- Phase 2B: Parser Layer Integration ---

  /**
   * Parses a specific snapshot using the registered parser strategies
   */
  public async parseSnapshot(snapshotId: string, mimeType: string, rawBuffer: Buffer, url: string, sourceId: string) {
    console.log(`[RegulatoryEngine] Orchestrating parsing for snapshot: ${snapshotId}`);
    // In actual implementation, we would fetch the buffer from storage/DB using snapshotId
    return parserEngine.parseSnapshot(snapshotId, mimeType, rawBuffer, url, sourceId);
  }

  // --- Phase 3: Canonical Document Normalization Integration ---
  
  /**
   * Normalizes a ParserResult into a deterministic CanonicalDocument
   */
  public async normalizeSnapshot(snapshotId: string, mimeType: string, rawBuffer: Buffer, url: string, sourceId: string) {
    console.log(`[RegulatoryEngine] Normalizing parsed snapshot: ${snapshotId}`);
    const parserResult = await this.parseSnapshot(snapshotId, mimeType, rawBuffer, url, sourceId);
    const canonicalDoc = canonicalNormalizer.normalize(parserResult);
    
    const createdDoc = await prisma.canonicalDocument.create({
      data: {
        sourceId: parserResult.sourceId,
        snapshotId: parserResult.snapshotId,
        title: canonicalDoc.title || 'Untitled',
        authority: canonicalDoc.issuingAuthority,
        content: JSON.stringify(canonicalDoc.content || []),
        url: url,
        publishedAt: canonicalDoc.issuedDate ? new Date(canonicalDoc.issuedDate) : null,
        effectiveFrom: canonicalDoc.effectiveDate ? new Date(canonicalDoc.effectiveDate) : null,
        metadata: canonicalDoc.metadata as any,
        contentHash: canonicalDoc.checksum || '',
      }
    });

    canonicalDoc.id = createdDoc.id;
    return canonicalDoc;
  }

  /**
   * Fetches, parses, and normalizes the latest content for a source
   */
  public async processLatest(sourceId: string) {
    console.log(`[RegulatoryEngine] Fetching, parsing, and normalizing latest for source: ${sourceId}`);
    const fetchResult = await this.fetchSource(sourceId);
    
    if (fetchResult.status >= 400 || !fetchResult.rawBody) {
      throw new Error(`Failed to fetch source ${sourceId} for processing. Status: ${fetchResult.status}`);
    }

    const mimeType = fetchResult.headers['content-type']?.split(';')[0] || 'text/html';
    
    const snapshotId = await this.createSnapshot(sourceId, fetchResult);
    
    const buffer = Buffer.isBuffer(fetchResult.rawBody) 
      ? fetchResult.rawBody 
      : Buffer.from(typeof fetchResult.rawBody === 'string' ? fetchResult.rawBody : JSON.stringify(fetchResult.rawBody));
      
    const url = this.sources.get(sourceId)?.url || '';
    
    return this.normalizeSnapshot(snapshotId, mimeType, buffer, url, sourceId);
  }

  public async parsePendingSnapshots(): Promise<void> {
    console.log('[RegulatoryEngine] Starting batch parsing for pending snapshots...');
  }

  // --- Phase 4: Enterprise Diff Engine Integration ---

  public compareDocuments(oldDoc: ICanonicalDocument, newDoc: ICanonicalDocument) {
    console.log(`[RegulatoryEngine] Comparing documents: ${oldDoc.id} vs ${newDoc.id}`);
    return diffEngine.compareDocuments(oldDoc, newDoc);
  }

  public async compareLatest(sourceId: string, previousDoc: ICanonicalDocument | null) {
    console.log(`[RegulatoryEngine] Orchestrating full inbound flow + diff for source: ${sourceId}`);
    const newDoc = await this.processLatest(sourceId);
    
    if (!previousDoc) {
      console.log(`[RegulatoryEngine] No previous doc for ${sourceId}, skipping diff.`);
      return null;
    }

    const changeSet = this.compareDocuments(previousDoc, newDoc);
    
    await prisma.changeSet.create({
      data: {
        sourceId,
        oldDocumentId: previousDoc.id,
        newDocumentId: newDoc.id,
        severity: changeSet.changeSeverity as any,
        changes: { summary: changeSet.summary, type: changeSet.changeType } as any,
        isProcessedByAI: false,
      }
    });

    return changeSet;
  }

  public async detectChanges(): Promise<ChangeSet[]> {
    console.log('[RegulatoryEngine] Detecting changes system-wide...');
    const changeSets: ChangeSet[] = [];
    
    for (const [id, source] of this.sources.entries()) {
      if (!source.enabled) continue;
      
      try {
        const previousDbDoc = await prisma.canonicalDocument.findFirst({
          where: { sourceId: id },
          orderBy: { createdAt: 'desc' }
        });
        
        let previousDoc: ICanonicalDocument | null = null;
        if (previousDbDoc) {
           let parsedContent = [];
           try { parsedContent = JSON.parse(previousDbDoc.content); } catch (e) {}
           
           previousDoc = {
             id: previousDbDoc.id,
             sourceSnapshotId: previousDbDoc.snapshotId,
             schemaVersion: '1.0.0',
             canonicalVersion: '1.0.0',
             parserVersion: '1.0.0',
             checksum: previousDbDoc.contentHash,
             originalChecksum: null,
             title: previousDbDoc.title,
             issuedDate: previousDbDoc.publishedAt ? previousDbDoc.publishedAt.toISOString() : null,
             effectiveDate: previousDbDoc.effectiveFrom ? previousDbDoc.effectiveFrom.toISOString() : null,
             issuingAuthority: previousDbDoc.authority || null,
             category: 'UNKNOWN' as any,
             authorityLevel: 'UNKNOWN' as any,
             jurisdiction: 'UNKNOWN' as any,
             summary: null,
             content: parsedContent,
             attachments: [],
             links: [],
             metadata: (previousDbDoc.metadata as Record<string, unknown>) || {},
           };
        }
        
        const changeSet = await this.compareLatest(id, previousDoc);
        if (changeSet) {
           changeSets.push(changeSet);
        }
      } catch (err) {
        console.error(`[RegulatoryEngine] Failed to detect changes for source ${id}`, err);
      }
    }
    return changeSets;
  }
}

export const regulatoryEngine = new RegulatoryIntelligenceEngine();
