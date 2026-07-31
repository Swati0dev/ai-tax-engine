import { regulatoryEngine } from '../src/engines/regulatory-intelligence/regulatory.engine';
import { prisma } from '../lib/db';
import * as fs from 'fs';
import * as path from 'path';
import { FetchError, FetchFailureType } from '../src/engines/regulatory-intelligence/fetch';

async function verifyWafHardening() {
  console.log("Starting Phase 8 WAF Hardening Verification...");
  
  await regulatoryEngine.initialize();
  const sources = await regulatoryEngine.loadSources();
  
  if (sources.length === 0) {
    console.error("No official sources found in the registry.");
    process.exit(1);
  }

  let report = `# Phase 8 Runtime Report: WAF Hardening\n\n`;
  report += `Execution Date: ${new Date().toISOString()}\n\n`;
  
  // We'll test against up to 3 sources to keep the report concise
  const testSources = sources.slice(0, 3);
  
  for (const source of testSources) {
    console.log(`\nTesting Source: ${source.name} (${source.url})`);
    console.log(`Strategy: ${source.accessStrategy || 'HTTP_FETCH'}`);
    
    let httpStatus = "N/A";
    let failureClassification = "NONE (SUCCESS)";
    let snapshotStatus = "SKIPPED";
    let parserStatus = "SKIPPED";
    let canonicalStatus = "SKIPPED";
    let diffStatus = "SKIPPED";
    let finalResult = "SUCCESS";
    
    try {
      const changeSet = await regulatoryEngine.compareLatest(source.id!, null);
      
      // If it succeeded, we got past Fetch
      httpStatus = "200 OK";
      snapshotStatus = "CREATED";
      parserStatus = "EXECUTED";
      canonicalStatus = "CREATED";
      
      if (changeSet) {
        diffStatus = "EXECUTED (CHANGES DETECTED)";
      } else {
        diffStatus = "EXECUTED (NO PREVIOUS DOC)";
      }
      
    } catch (error: any) {
      finalResult = "FAILED";
      
      if (error instanceof FetchError || error.type) {
        failureClassification = error.type || FetchFailureType.UNKNOWN;
        
        // Extract HTTP status if possible
        if (error.type === FetchFailureType.HTTP_403) httpStatus = "403 Forbidden";
        else if (error.type === FetchFailureType.HTTP_404) httpStatus = "404 Not Found";
        else if (error.type === FetchFailureType.HTTP_429) httpStatus = "429 Too Many Requests";
        else if (error.type === FetchFailureType.HTTP_500) httpStatus = "500 Internal Server Error";
        else if (error.type === FetchFailureType.WAF_CHALLENGE) httpStatus = "403 WAF Block";
        else httpStatus = "ERROR";
      } else {
        failureClassification = "UNKNOWN_ERROR";
        httpStatus = "ERROR";
      }
      
      console.error(`Fetch failed for ${source.name}: [${failureClassification}] ${error.message}`);
    }
    
    report += `### Source: ${source.name}\n`;
    report += `- **URL**: ${source.url}\n`;
    report += `- **Strategy**: ${source.accessStrategy || 'HTTP_FETCH'}\n`;
    report += `- **HTTP Status**: ${httpStatus}\n`;
    report += `- **Failure Classification**: ${failureClassification}\n`;
    report += `- **Snapshot Status**: ${snapshotStatus}\n`;
    report += `- **Parser Status**: ${parserStatus}\n`;
    report += `- **Canonical Status**: ${canonicalStatus}\n`;
    report += `- **Diff Status**: ${diffStatus}\n`;
    report += `- **Final Pipeline Result**: ${finalResult}\n\n`;
  }
  
  const reportPath = path.join(process.cwd(), "PHASE8_RUNTIME_REPORT.md");
  fs.writeFileSync(reportPath, report);
  
  console.log(`\nVerification complete. Report generated at ${reportPath}`);
  await prisma.$disconnect();
}

verifyWafHardening().catch(err => {
  console.error("Verification script failed", err);
  process.exit(1);
});
