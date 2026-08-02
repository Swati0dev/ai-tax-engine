import 'dotenv/config';
import { prisma } from "../lib/db";

async function runE2E() {
  console.log("Starting End-to-End Runtime Validation...");
  const startTime = Date.now();

  try {
    const { regulatoryEngine } = await import('../src/engines/regulatory-intelligence/regulatory.engine');
    const { AiAnalysisService } = await import('../src/engines/ai-analysis/ai-analysis.service');
    const { CmsDraftService } = await import('../src/engines/cms-automation/cms-draft.service');

    await regulatoryEngine.initialize();

    const topic = "Income Tax Portal Crawl";
    const sourceUrl = "https://www.incometax.gov.in/"; // The target URL

    console.log(`[Validation] 1. Registering Source: ${topic} | ${sourceUrl}`);
    const sourceId = await regulatoryEngine.registerSource({
      name: topic,
      authority: "Admin Manual Crawl",
      url: sourceUrl,
      type: "GOVERNMENT_PORTAL",
      category: "GENERAL",
      enabled: true,
      frequency: "DAILY",
      priority: 1,
      accessStrategy: "HEADLESS_BROWSER",
      parserName: "HTML_CRAWLER"
    });
    console.log(`[Validation] OfficialSource created with ID: ${sourceId}`);

    console.log(`[Validation] 2. Executing Crawl, Parse, Canonicalize, and Diff...`);
    const fetchStartTime = Date.now();
    const changeSet = await regulatoryEngine.compareLatest(sourceId, null);
    const fetchEndTime = Date.now();
    
    if (!changeSet) {
       throw new Error("Pipeline returned no ChangeSet.");
    }
    console.log(`[Validation] ChangeSet created with ID: ${changeSet.id}`);

    console.log(`[Validation] 3. Executing AI Analysis...`);
    const aiStartTime = Date.now();
    const aiAnalysisService = new AiAnalysisService();
    await aiAnalysisService.analyzeChangeSet(changeSet.id);
    const aiEndTime = Date.now();

    const analysisRecord = await prisma.changeSetAnalysis.findUnique({
      where: { changeSetId: changeSet.id }
    });
    
    if (!analysisRecord || analysisRecord.status !== "COMPLETED") {
      throw new Error(`AI Analysis failed or did not complete. Status: ${analysisRecord?.status}`);
    }
    console.log(`[Validation] ChangeSetAnalysis created with ID: ${analysisRecord.id}`);

    console.log(`[Validation] 4. Executing CMS Draft Generation...`);
    const cmsStartTime = Date.now();
    const cmsDraftService = new CmsDraftService();
    const finalDraftId = await cmsDraftService.generateDraft(analysisRecord.id);
    const cmsEndTime = Date.now();

    const newItem = await prisma.taxKnowledgeItem.findUnique({
      where: { id: finalDraftId },
      include: { sourceReferences: true, faqs: true }
    });
    
    if (!newItem) {
      throw new Error("TaxKnowledgeItem was not created.");
    }
    console.log(`[Validation] TaxKnowledgeItem (DRAFT) created with ID: ${newItem.id}, Slug: ${newItem.slug}`);

    // Gather metrics
    const totalTime = Date.now() - startTime;
    console.log("\n=================================");
    console.log("PERFORMANCE METRICS");
    console.log("=================================");
    console.log(`Fetch + Canonical + Diff: ${fetchEndTime - fetchStartTime} ms`);
    console.log(`AI Analysis: ${aiEndTime - aiStartTime} ms`);
    console.log(`CMS Draft: ${cmsEndTime - cmsStartTime} ms`);
    console.log(`Total Pipeline: ${totalTime} ms`);

    console.log("\n=================================");
    console.log("DATABASE TRACE VERIFICATION");
    console.log("=================================");
    console.log(`OfficialSource: ${sourceId}`);
    
    const snapshot = await prisma.sourceSnapshot.findFirst({ where: { sourceId }, orderBy: { capturedAt: 'desc' } });
    console.log(`SourceSnapshot: ${snapshot?.id}`);
    
    const canonical = await prisma.canonicalDocument.findFirst({ where: { sourceId }, orderBy: { createdAt: 'desc' } });
    console.log(`CanonicalDocument: ${canonical?.id}`);
    
    console.log(`ChangeSet: ${changeSet.id}`);
    console.log(`ChangeSetAnalysis: ${analysisRecord.id}`);
    console.log(`TaxKnowledgeItem: ${newItem.id} (Status: ${newItem.reviewStatus})`);
    console.log(`SourceReference: ${newItem.sourceReferences[0]?.id}`);

    console.log("\n=================================");
    console.log("AI VALIDATION PREVIEW");
    console.log("=================================");
    console.log(`Title: ${newItem.title}`);
    console.log(`Act Name: ${newItem.actName}`);
    console.log(`Section: ${newItem.sectionNumber}`);
    console.log(`Summary: ${newItem.summary}`);
    console.log(`Applicability: ${JSON.stringify(newItem.applicability)}`);
    console.log(`FAQs extracted: ${newItem.faqs.length}`);
    
    console.log("\nSUCCESS: End-to-End Pipeline executed successfully.");
    
  } catch (error) {
    console.error("\n[Validation] FAILED:", error);
  } finally {
    await prisma.$disconnect();
  }
}

runE2E();
