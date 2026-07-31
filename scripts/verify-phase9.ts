import { regulatoryEngine } from '../src/engines/regulatory-intelligence/regulatory.engine';
import { prisma } from '../lib/db';
import { FetchFailureType } from '../src/engines/regulatory-intelligence/fetch';

async function runAudit() {
  console.log("Starting Enterprise Validation...");
  
  await regulatoryEngine.initialize();
  const sources = await regulatoryEngine.loadSources();
  
  console.log(`\n--- 2. Government Sources (${sources.length} total) ---`);
  // Test just 1 source to verify the pipeline end-to-end (to avoid long rate limits)
  const testSource = sources[0];
  console.log(`Testing source: ${testSource.name} (${testSource.url})`);
  
  let fetchStatus = "FAILED";
  let snapshotStatus = "SKIPPED";
  let parserStatus = "SKIPPED";
  let canonicalStatus = "SKIPPED";
  let diffStatus = "SKIPPED";
  let aiStatus = "SKIPPED";
  let cmsStatus = "SKIPPED";
  
  try {
    const changeSet = await regulatoryEngine.compareLatest(testSource.id!, null);
    fetchStatus = "SUCCESS";
    snapshotStatus = "SUCCESS";
    parserStatus = "SUCCESS";
    canonicalStatus = "SUCCESS";
    
    if (changeSet) {
      diffStatus = "SUCCESS";
      aiStatus = "EXECUTED";
      cmsStatus = "EXECUTED";
    } else {
      diffStatus = "NO_CHANGES";
    }
  } catch (error: any) {
    console.error(`Pipeline failed at fetch: ${error.message}`);
  }

  console.log(`\n--- 1. Regulatory Intelligence Engine ---`);
  console.log(`Fetch: ${fetchStatus}`);
  console.log(`Snapshot: ${snapshotStatus}`);
  console.log(`Parser: ${parserStatus}`);
  console.log(`Canonical: ${canonicalStatus}`);
  console.log(`Diff: ${diffStatus}`);
  
  console.log(`\n--- 3. CMS Verification ---`);
  const knowledgeItems = await prisma.taxKnowledgeItem.count();
  console.log(`TaxKnowledgeItems in DB: ${knowledgeItems}`);
  const drafts = await prisma.taxKnowledgeItem.count({ where: { reviewStatus: 'DRAFT' } });
  console.log(`Drafts in DB: ${drafts}`);
  
  console.log(`\n--- 4. AI Analysis Verification ---`);
  const analysisCount = await prisma.changeSetAnalysis.count();
  console.log(`ChangeSetAnalysis records in DB: ${analysisCount}`);
  
  console.log(`\n--- 5. Database Audit ---`);
  const userCount = await prisma.user.count().catch(() => 'ERROR');
  const sessionCount = await prisma.session.count().catch(() => 'ERROR');
  console.log(`Users: ${userCount}, Sessions: ${sessionCount}`);
  
  await prisma.$disconnect();
  console.log("\nValidation script finished.");
}

runAudit().catch(err => {
  console.error("Audit script failed", err);
  process.exit(1);
});
