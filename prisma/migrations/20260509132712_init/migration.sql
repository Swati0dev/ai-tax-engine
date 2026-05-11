-- CreateEnum
CREATE TYPE "TaxCategory" AS ENUM ('DIRECT_TAX', 'INDIRECT_TAX');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('VERIFIED', 'NEEDS_REVIEW', 'OUTDATED', 'DRAFT');

-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('OFFICIAL', 'PROJECT_APPROVED', 'ORIENTATION_ONLY');

-- CreateTable
CREATE TABLE "TaxKnowledgeItem" (
    "id" TEXT NOT NULL,
    "category" "TaxCategory" NOT NULL,
    "actName" TEXT NOT NULL,
    "sectionNumber" TEXT,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "applicability" TEXT[],
    "benefitsOrDeductions" TEXT[],
    "restrictions" TEXT[],
    "examples" TEXT[],
    "relatedForms" TEXT[],
    "filingProcedure" TEXT[],
    "relatedItems" TEXT[],
    "effectiveFrom" TIMESTAMP(3),
    "lastReviewed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewStatus" "ReviewStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxKnowledgeItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SourceReference" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sourceType" "SourceType" NOT NULL DEFAULT 'OFFICIAL',
    "publishedAt" TIMESTAMP(3),
    "accessedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "knowledgeItemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SourceReference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TaxKnowledgeItem_category_idx" ON "TaxKnowledgeItem"("category");

-- CreateIndex
CREATE INDEX "TaxKnowledgeItem_reviewStatus_idx" ON "TaxKnowledgeItem"("reviewStatus");

-- CreateIndex
CREATE INDEX "SourceReference_knowledgeItemId_idx" ON "SourceReference"("knowledgeItemId");

-- AddForeignKey
ALTER TABLE "SourceReference" ADD CONSTRAINT "SourceReference_knowledgeItemId_fkey" FOREIGN KEY ("knowledgeItemId") REFERENCES "TaxKnowledgeItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
