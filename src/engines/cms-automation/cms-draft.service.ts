import { prisma } from "../../../lib/db";
import { ReviewStatus, TaxCategory, SourceType } from "@prisma/client";
import { ICanonicalDocument } from "../regulatory-intelligence/canonical";

export class CmsDraftService {
  /**
   * Deterministically maps the source's authority/name to a TaxCategory.
   */
  private mapCategory(authority: string, sourceName: string): TaxCategory {
    const combined = `${authority} ${sourceName}`.toUpperCase();
    
    if (combined.includes("INCOME TAX") || combined.includes("CBDT") || combined.includes("ITR")) {
      return TaxCategory.INCOME_TAX;
    }
    if (combined.includes("GST") || combined.includes("CBIC")) {
      return TaxCategory.GST;
    }
    if (combined.includes("CORPORATE") || combined.includes("MCA") || combined.includes("COMPANY")) {
      return TaxCategory.CORPORATE_TAX;
    }
    if (combined.includes("TDS")) {
      return TaxCategory.TDS;
    }
    if (combined.includes("STARTUP")) {
      return TaxCategory.STARTUP_COMPLIANCE;
    }
    if (combined.includes("BUSINESS")) {
      return TaxCategory.BUSINESS_TAX;
    }
    return TaxCategory.GENERAL;
  }

  /**
   * Generates a unique slug for the knowledge item.
   */
  private generateSlug(title: string): string {
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
      .substring(0, 100);
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    return `${baseSlug}-${randomSuffix}`;
  }

  /**
   * Generates a draft TaxKnowledgeItem from a completed ChangeSetAnalysis.
   */
  public async generateDraft(analysisId: string): Promise<string> {
    // 1. Fetch the analysis with relations
    const analysis = await prisma.changeSetAnalysis.findUnique({
      where: { id: analysisId },
      include: {
        changeSet: {
          include: {
            source: true,
          }
        }
      }
    });

    if (!analysis) {
      throw new Error(`ChangeSetAnalysis with ID ${analysisId} not found`);
    }

    if (analysis.status !== "COMPLETED") {
      throw new Error(`Cannot generate draft for incomplete analysis (Status: ${analysis.status})`);
    }

    // 2. Fetch the new document to get the Title and URL
    const canonicalDoc = await prisma.canonicalDocument.findUnique({
      where: { id: analysis.changeSet.newDocumentId }
    });

    if (!canonicalDoc) {
      throw new Error(`CanonicalDocument ${analysis.changeSet.newDocumentId} not found`);
    }

    // 3. Map Fields
    const structuredOutput = (analysis.structuredOutput as Record<string, unknown>) || {};
    const title = (structuredOutput.title as string) || canonicalDoc.title || "Untitled Regulation Update";
    const summary = analysis.summary;
    const explanation = (structuredOutput.explanation as string) || `**Impact:**\n${analysis.impact}\n\n**Recommendations:**\n${analysis.recommendations}`;
    const category = this.mapCategory(canonicalDoc.authority || "", analysis.changeSet.source.name);
    const slug = this.generateSlug(title as string);

    // 4. Create the TaxKnowledgeItem and SourceReference in a transaction
    const draftId = await prisma.$transaction(async (tx) => {
      const draft = await tx.taxKnowledgeItem.create({
        data: {
          title,
          summary,
          explanation,
          category,
          reviewStatus: ReviewStatus.DRAFT,
          slug,
          actName: (structuredOutput.actName as string) || canonicalDoc.authority || "Unknown Act",
          sectionNumber: (structuredOutput.sectionNumber as string) || null,
          effectiveFrom: structuredOutput.effectiveDate ? new Date(structuredOutput.effectiveDate as string) : canonicalDoc.effectiveFrom,
          applicability: (structuredOutput.applicability as string[]) || [],
          benefitsOrDeductions: (structuredOutput.benefitsOrDeductions as string[]) || [],
          restrictions: (structuredOutput.restrictions as string[]) || [],
          examples: (structuredOutput.examples as string[]) || [],
          relatedForms: (structuredOutput.relatedForms as string[]) || [],
          filingProcedure: (structuredOutput.filingProcedure as string[]) || [],
          relatedItems: [],
          relatedCalculators: [],
          tags: (structuredOutput.tags as string[]) || ["AI_GENERATED", category],
          sourceReferences: {
            create: {
              title: canonicalDoc.title || analysis.changeSet.source.name,
              url: canonicalDoc.url,
              sourceType: SourceType.OFFICIAL,
              publishedAt: canonicalDoc.publishedAt
            }
          }
        }
      });

      // Insert FAQs if any exist
      const faqs = structuredOutput.faqs as Array<{question: string, answer: string}>;
      if (faqs && Array.isArray(faqs)) {
        for (const faq of faqs) {
          if (faq.question && faq.answer) {
            await tx.fAQ.create({
              data: {
                question: faq.question,
                answer: faq.answer,
                knowledgeItemId: draft.id
              }
            });
          }
        }
      }

      return draft.id;
    });

    return draftId;
  }
}
