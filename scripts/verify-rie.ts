import { regulatoryEngine } from '../src/engines/regulatory-intelligence/regulatory.engine';
import { prisma } from '../lib/db';
import { OFFICIAL_SOURCES_REGISTRY } from '../src/engines/regulatory-intelligence/source-registry';
import fs from 'fs';
import path from 'path';

async function main() {
  console.log('Starting Phase 5 Runtime Verification...');
  
  OFFICIAL_SOURCES_REGISTRY.push({
    name: 'Test Example Source',
    authority: 'Example Authority',
    url: 'https://example.com',
    type: 'WEBSITE',
    category: 'GENERAL_TAX' as any,
    enabled: true,
    frequency: 'DAILY',
    priority: 1,
  });
  
  await regulatoryEngine.initialize();
  
  const testSource = await prisma.officialSource.findFirst({ where: { url: 'https://example.com' } });
  if (!testSource) throw new Error('Test source not loaded');
  const sources = [testSource];
  console.log(`Using test source to verify full pipeline execution: ${testSource.url}`);

  let report = `# Phase 5 Runtime Verification Report\n\n`;
  report += `Execution Date: ${new Date().toISOString()}\n\n`;

  for (const source of sources) {
    console.log(`Processing source: ${source.name} (${source.url})`);
    report += `## Source: ${source.name}\n`;
    report += `- **URL:** ${source.url}\n`;
    
    try {
      console.log('Run 1: Initial Fetch and Parse');
      await regulatoryEngine.compareLatest(source.id, null);
      
      console.log('Run 2: Second Fetch to trigger Diff Engine');
      const previousDbDoc = await prisma.canonicalDocument.findFirst({
        where: { sourceId: source.id },
        orderBy: { createdAt: 'desc' }
      });
      
      let previousDoc: any = previousDbDoc;
      if (previousDoc && typeof previousDoc.content === 'string') {
        try {
          previousDoc = { ...previousDoc, content: JSON.parse(previousDoc.content) };
        } catch(e: unknown) {
          previousDoc = { ...previousDoc, content: [] };
        }
      }
      // Just wait 1s
      await new Promise(r => setTimeout(r, 1000));
      
      // I am manually simulating a difference by updating the URL in DB before 2nd run if we wanted, 
      // but just running it twice will trigger a 'NO_CHANGES' or 'LOW' severity diff.
      const changeSet = await regulatoryEngine.compareLatest(source.id, previousDoc as any);
      
      const snapshot = await prisma.sourceSnapshot.findFirst({
        where: { sourceId: source.id },
        orderBy: { capturedAt: 'desc' }
      });
      
      const canonical = await prisma.canonicalDocument.findFirst({
        where: { sourceId: source.id },
        orderBy: { createdAt: 'desc' }
      });
      
      report += `- **Fetch Engine (Snapshot):** ${snapshot ? '✅ SUCCESS' : '❌ FAILED'}\n`;
      if (snapshot) {
        report += `  - Snapshot ID: ${snapshot.id}\n`;
        report += `  - Content Hash: ${snapshot.contentHash}\n`;
      }
      
      report += `- **HTML Parser & Canonical Normalizer:** ${canonical ? '✅ SUCCESS' : '❌ FAILED'}\n`;
      if (canonical) {
        report += `  - Canonical ID: ${canonical.id}\n`;
        report += `  - Parsed Title: ${canonical.title}\n`;
        const contentLen = canonical.content.length;
        report += `  - Extracted JSON length: ${contentLen}\n`;
      }
      
      report += `- **Diff Engine (ChangeSet):** ${changeSet ? '✅ SUCCESS' : '⏭️ SKIPPED (No previous doc)'}\n`;
      if (changeSet) {
         report += `  - Severity: ${(changeSet as any).changeSeverity || (changeSet as any).severity}\n`;
      }

    } catch (err: any) {
      console.error(`Error processing ${source.name}:`, err);
      report += `❌ **ERROR:** ${err.message}\n`;
    }
    
    report += `\n---\n\n`;
  }
  
  // Verify Scheduler Job Logs
  report += `## Scheduler Verification\n`;
  const jobs = await prisma.schedulerJob.findMany({ take: 5, orderBy: { startedAt: 'desc' } });
  report += `- Total Jobs Triggered: ${jobs.length}\n`;
  for (const job of jobs) {
    report += `  - Job [${job.status}]: ${job.id} for Source ${job.sourceId}\n`;
  }
  
  fs.writeFileSync('PHASE5_RUNTIME_VERIFICATION.md', report);
  console.log('Verification completed. Generated PHASE5_RUNTIME_VERIFICATION.md');
  
  process.exit(0);
}

main().catch(console.error);
