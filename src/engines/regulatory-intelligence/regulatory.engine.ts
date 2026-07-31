import { IRegulatoryEngine, IRegulatorySourceConfig } from './interfaces';
import { SourceHealthStatusType } from './types';
import { OFFICIAL_SOURCES_REGISTRY } from './source-registry';
import { schedulerService } from './scheduler.service';

/**
 * RegulatoryIntelligenceEngine
 * 
 * Phase 1: Architectural Foundation
 * This class serves as the main entry point for the RIE.
 * Currently, it provides the skeleton and interfaces for future crawling/parsing tasks.
 */
export class RegulatoryIntelligenceEngine implements IRegulatoryEngine {
  private sources: Map<string, IRegulatorySourceConfig> = new Map();
  private initialized: boolean = false;

  /**
   * Initializes the Engine, connecting to DB and starting schedulers
   */
  public async initialize(): Promise<void> {
    if (this.initialized) return;
    
    console.log('[RegulatoryEngine] Initializing RIE Foundation...');
    
    // Initialize subsystem dependencies
    await schedulerService.initialize();
    
    // Load configured sources
    await this.loadSources();
    
    this.initialized = true;
    console.log('[RegulatoryEngine] RIE Foundation initialized successfully.');
  }

  /**
   * Loads sources from the registry (and eventually the DB)
   */
  public async loadSources(): Promise<IRegulatorySourceConfig[]> {
    console.log('[RegulatoryEngine] Loading official sources into registry...');
    
    // For Phase 1, we just load the static registry.
    // In Phase 2, this will sync with the Prisma OfficialSource table.
    OFFICIAL_SOURCES_REGISTRY.forEach(source => {
      // Mocking an ID generation for in-memory store
      const mockId = `src_${source.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
      this.sources.set(mockId, { ...source, id: mockId });
    });

    return Array.from(this.sources.values());
  }

  /**
   * Registers a new source into the engine dynamically
   */
  public async registerSource(config: IRegulatorySourceConfig): Promise<string> {
    console.log(`[RegulatoryEngine] Registering new source: ${config.name}`);
    const mockId = `src_${Date.now()}`;
    
    this.sources.set(mockId, { ...config, id: mockId });
    // In Phase 2, this persists to DB
    
    return mockId;
  }

  /**
   * Enables a registered source for active crawling
   */
  public async enableSource(sourceId: string): Promise<boolean> {
    console.log(`[RegulatoryEngine] Enabling source: ${sourceId}`);
    const source = this.sources.get(sourceId);
    
    if (!source) {
      throw new Error(`Source with ID ${sourceId} not found`);
    }

    source.enabled = true;
    // In Phase 2, update DB and trigger scheduler
    return true;
  }

  /**
   * Disables a registered source
   */
  public async disableSource(sourceId: string): Promise<boolean> {
    console.log(`[RegulatoryEngine] Disabling source: ${sourceId}`);
    const source = this.sources.get(sourceId);
    
    if (!source) {
      throw new Error(`Source with ID ${sourceId} not found`);
    }

    source.enabled = false;
    // In Phase 2, update DB and cancel active scheduled jobs
    return true;
  }

  /**
   * Fetches the current health status of a specific source
   */
  public async getSourceHealth(sourceId: string): Promise<SourceHealthStatusType> {
    console.log(`[RegulatoryEngine] Checking health for source: ${sourceId}`);
    
    if (!this.sources.has(sourceId)) {
       throw new Error(`Source with ID ${sourceId} not found`);
    }
    
    // In Phase 2, this will query the SourceHealth table
    return 'UNKNOWN';
  }

  /**
   * Schedules all active jobs based on their frequency
   */
  public async scheduleJobs(): Promise<void> {
    console.log('[RegulatoryEngine] Triggering global job scheduling...');
    
    for (const [id, source] of this.sources.entries()) {
      if (source.enabled) {
        await schedulerService.scheduleSourceCheck(id, { frequency: source.frequency });
      }
    }
  }
}

export const regulatoryEngine = new RegulatoryIntelligenceEngine();
