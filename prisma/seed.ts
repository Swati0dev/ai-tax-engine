import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, TaxCategory, ReviewStatus, SourceType } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting seed...");

  // Clean existing data (Safe as per user confirmation)
  await prisma.sourceReference.deleteMany();
  await prisma.taxKnowledgeItem.deleteMany();

  // 1. Direct Tax Item
  const item1 = await prisma.taxKnowledgeItem.create({
    data: {
      category: TaxCategory.DIRECT_TAX,
      actName: "Income Tax Act, 1961",
      sectionNumber: "Section 80C",
      title: "Deduction for Investments and Savings",
      summary: "Allows deductions up to ₹1.5 Lakh for specific investments like EPF, PPF, and ELSS.",
      explanation: "Section 80C is the most popular tax-saving option in India. It encourages long-term savings by providing a deduction from gross total income for investments in various schemes.",
      applicability: ["Individuals", "HUFs"],
      benefitsOrDeductions: ["Max deduction: ₹1,50,000", "Includes Life Insurance Premium", "Public Provident Fund (PPF)", "Equity Linked Savings Scheme (ELSS)"],
      restrictions: ["Lock-in periods apply (e.g., 3 years for ELSS, 15 years for PPF)", "Only available under the Old Tax Regime"],
      examples: ["Investing ₹1.5L in PPF can reduce taxable income by the same amount."],
      relatedForms: ["Form 16", "ITR-1", "ITR-2"],
      filingProcedure: ["Declare investments to employer in Form 12BB", "Claim while filing ITR"],
      relatedItems: ["Section 80CCC", "Section 80CCD"],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [
          {
            title: "Incometaxindia.gov.in - Section 80C",
            url: "https://www.incometaxindia.gov.in/pages/charts-and-tables.aspx",
            sourceType: SourceType.OFFICIAL
          }
        ]
      }
    }
  });

  // 2. Indirect Tax Item
  const item2 = await prisma.taxKnowledgeItem.create({
    data: {
      category: TaxCategory.INDIRECT_TAX,
      actName: "CGST Act, 2017",
      sectionNumber: "Section 7",
      title: "Scope of Supply",
      summary: "Defines what constitutes a 'supply' under GST, the primary taxable event.",
      explanation: "Section 7 of the CGST Act defines supply broadly to include all forms of supply of goods or services such as sale, transfer, barter, exchange, license, rental, lease or disposal made or agreed to be made for a consideration by a person in the course or furtherance of business.",
      applicability: ["Registered GST Taxpayers", "Businesses providing goods/services"],
      benefitsOrDeductions: ["Clarifies taxability of transactions", "Basis for Input Tax Credit (ITC) eligibility"],
      restrictions: ["Excludes items in Schedule III (Negative list)", "Must be in course or furtherance of business"],
      examples: ["Sale of a laptop by a dealer is a supply.", "Donation of old clothes to a charity is generally not a supply."],
      relatedForms: ["GSTR-1", "GSTR-3B"],
      filingProcedure: ["Report supplies in monthly/quarterly returns"],
      relatedItems: ["Section 9 - Levy and Collection", "Schedule I", "Schedule II"],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [
          {
            title: "CBIC GST Resources",
            url: "https://www.cbic.gov.in/entities/gst",
            sourceType: SourceType.OFFICIAL
          }
        ]
      }
    }
  });

  console.log(`Seed finished. Created ${item1.title} and ${item2.title}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
