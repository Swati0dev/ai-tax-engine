import { ISchedulerOptions } from './interfaces';
import * as cron from 'node-cron';
import { prisma } from '@/lib/db';
import { regulatoryEngine } from './regulatory.engine';
import { ICanonicalDocument } from './canonical';

export class SchedulerService {
  private activeJobs: Map<string, cron.ScheduledTask> = new Map();

  public async initialize(): Promise<void> {
    console.log('[SchedulerService] Initializing job scheduler...');
  }

  public async scheduleSourceCheck(sourceId: string, options: ISchedulerOptions): Promise<string> {
    console.log(`[SchedulerService] Scheduling check for source: ${sourceId} with frequency: ${options.frequency}`);
    
    // Map frequency to cron expression
    let cronExpression = '0 0 * * *'; // Default DAILY at midnight
    if (options.frequency === 'WEEKLY') {
      cronExpression = '0 0 * * 0'; // Sunday at midnight
    } else if (options.frequency === 'MONTHLY') {
      cronExpression = '0 0 1 * *'; // 1st of month at midnight
    } else if (options.frequency === 'CRON') {
      // In a real system, you'd pass a custom cron string. For now fallback to daily.
      cronExpression = '0 0 * * *'; 
    }

    const task = cron.schedule(cronExpression, async () => {
      console.log(`[SchedulerService] Executing cron job for source: ${sourceId}`);
      
      const job = await prisma.schedulerJob.create({
        data: {
          sourceId,
          status: 'RUNNING',
          startedAt: new Date(),
        }
      });
      
      await prisma.auditLog.create({
        data: {
          action: 'JOB_STARTED',
          entityId: job.id,
          entityType: 'SchedulerJob',
        }
      });

      try {
        // Trigger the engine to fetch and process this source
        // Note: we can't directly call regulatoryEngine.fetchSource etc if we want full diff
        // But the engine has `compareLatest` for end to end.
        
        const previousDbDoc = await prisma.canonicalDocument.findFirst({
          where: { sourceId },
          orderBy: { createdAt: 'desc' }
        });
        
        let previousDoc: Record<string, unknown> | null = null;
        if (previousDbDoc) {
           let parsedContent = [];
           try { parsedContent = JSON.parse(previousDbDoc.content); } catch (e: unknown) { void e; }
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
             category: 'UNKNOWN' as never,
             authorityLevel: 'UNKNOWN' as never,
             jurisdiction: 'UNKNOWN' as never,
             summary: null,
             content: parsedContent,
             attachments: [],
             links: [],
             metadata: (previousDbDoc.metadata as Record<string, unknown>) || {},
           };
        }
        
        await regulatoryEngine.compareLatest(sourceId, previousDoc as unknown as ICanonicalDocument);
        
        await prisma.schedulerJob.update({
          where: { id: job.id },
          data: {
            status: 'COMPLETED',
            completedAt: new Date(),
          }
        });
        
        await prisma.auditLog.create({
          data: {
            action: 'JOB_COMPLETED',
            entityId: job.id,
            entityType: 'SchedulerJob',
          }
        });

      } catch (error: unknown) {
        console.error(`[SchedulerService] Job failed for source ${sourceId}`, error);
        
        const errorType = error instanceof Error && 'type' in error ? `[${error.type as string}] ` : '';
        const errorMessage = `${errorType}${error instanceof Error ? error.message : String(error)}`;
        
        await prisma.schedulerJob.update({
          where: { id: job.id },
          data: {
            status: 'FAILED',
            completedAt: new Date(),
            errorMessage: errorMessage,
          }
        });
        
        await prisma.auditLog.create({
          data: {
            action: 'JOB_FAILED',
            entityId: job.id,
            entityType: 'SchedulerJob',
            details: { error: errorMessage, type: error instanceof Error && 'type' in error ? error.type as string : 'UNKNOWN' }
          }
        });
      }
    });

    const jobId = `job_${Date.now()}_${sourceId}`;
    this.activeJobs.set(jobId, task);
    
    return jobId;
  }

  public async cancelJob(jobId: string): Promise<boolean> {
    console.log(`[SchedulerService] Cancelling job: ${jobId}`);
    const task = this.activeJobs.get(jobId);
    if (task) {
      task.stop();
      this.activeJobs.delete(jobId);
      return true;
    }
    return false;
  }

  public async getActiveJobs(): Promise<string[]> {
    return Array.from(this.activeJobs.keys());
  }
}

export const schedulerService = new SchedulerService();
