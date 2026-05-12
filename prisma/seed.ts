import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, TaxCategory, ReviewStatus, SourceType } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting Phase 10 Expanded Seed...");

  // Clean existing data
  await prisma.sourceReference.deleteMany();
  await prisma.taxKnowledgeItem.deleteMany();

  // 1. Section 80C (Existing)
  await prisma.taxKnowledgeItem.create({
    data: {
      category: TaxCategory.DIRECT_TAX,
      actName: "Income Tax Act, 1961",
      sectionNumber: "Section 80C",
      title: "Deduction for Investments and Savings",
      summary: "Allows deductions up to ₹1.5 Lakh for specific investments like EPF, PPF, and ELSS.",
      explanation: "Section 80C is the most popular tax-saving option in India. It encourages long-term savings by providing a deduction from gross total income for investments in various schemes.",
      applicability: ["Individuals", "HUFs"],
      benefitsOrDeductions: ["Max deduction: ₹1,50,000", "Includes Life Insurance Premium", "Public Provident Fund (PPF)", "Equity Linked Savings Scheme (ELSS)"],
      restrictions: ["Lock-in periods apply", "Only available under the Old Tax Regime"],
      examples: ["Investing ₹1.5L in PPF can reduce taxable income by the same amount."],
      relatedForms: ["Form 16", "ITR-1"],
      filingProcedure: ["Declare in Form 12BB", "Claim in ITR"],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "Income Tax India - 80C", url: "https://www.incometaxindia.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    }
  });

  // 2. Section 80D (New)
  await prisma.taxKnowledgeItem.create({
    data: {
      category: TaxCategory.DIRECT_TAX,
      actName: "Income Tax Act, 1961",
      sectionNumber: "Section 80D",
      title: "Deduction for Medical Insurance Premium",
      summary: "Allows deduction for premium paid for health insurance for self, family, and parents.",
      explanation: "Section 80D provides deductions for health insurance premiums paid for self, spouse, dependent children, and parents. It is over and above the 80C limit.",
      applicability: ["Individuals", "HUFs"],
      benefitsOrDeductions: ["Up to ₹25,000 for self/family", "Additional ₹25,000 for parents", "Limit increases to ₹50,000 for senior citizens"],
      restrictions: ["Premium must be paid in any mode other than cash", "Preventive health checkup limited to ₹5,000"],
      examples: ["Paying ₹20k for self and ₹30k for senior citizen parents gives total ₹50k deduction."],
      relatedForms: ["Form 16", "ITR-1"],
      filingProcedure: ["Claim under Section 80D during ITR filing"],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "Income Tax India - 80D", url: "https://www.incometaxindia.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    }
  });

  // 3. Section 24(b) (New)
  await prisma.taxKnowledgeItem.create({
    data: {
      category: TaxCategory.DIRECT_TAX,
      actName: "Income Tax Act, 1961",
      sectionNumber: "Section 24(b)",
      title: "Interest on Home Loan Deduction",
      summary: "Deduction on interest paid for a home loan for a self-occupied or let-out property.",
      explanation: "Taxpayers can claim a deduction on the interest part of their home loan EMI under Section 24 of the Income Tax Act.",
      applicability: ["Individuals", "HUFs"],
      benefitsOrDeductions: ["Up to ₹2 Lakh for self-occupied property", "No limit for let-out property"],
      restrictions: ["Construction must be completed within 5 years", "Available in both regimes but with limitations in New Regime"],
      examples: ["Annual interest of ₹2.5L on home loan allows ₹2L deduction for self-occupied house."],
      relatedForms: ["ITR-2", "Form 12BB"],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "Income Tax India - House Property", url: "https://www.incometaxindia.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    }
  });

  // 4. GST Registration (New)
  await prisma.taxKnowledgeItem.create({
    data: {
      category: TaxCategory.INDIRECT_TAX,
      actName: "CGST Act, 2017",
      sectionNumber: "Section 22",
      title: "GST Registration Thresholds",
      summary: "Mandatory registration for businesses exceeding specific turnover limits.",
      explanation: "Every supplier shall be liable to be registered under this Act in the State or Union territory, other than special category States, from where he makes a taxable supply of goods or services or both, if his aggregate turnover in a financial year exceeds the threshold limit.",
      applicability: ["Businesses", "Freelancers", "E-commerce operators"],
      benefitsOrDeductions: ["Legally authorized to collect tax", "Eligibility for Input Tax Credit (ITC)"],
      restrictions: ["₹40 Lakh for goods (Normal states)", "₹20 Lakh for services", "₹10 Lakh for special category states"],
      relatedForms: ["REG-01", "REG-06"],
      filingProcedure: ["Apply online on GST Portal", "Verification by officer", "Grant of GSTIN"],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "CBIC GST Registration", url: "https://www.cbic.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    }
  });

  console.log("Seed finished. Added 4 high-value tax knowledge items.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
