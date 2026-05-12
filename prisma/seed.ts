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
      slug: "section-80c",
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
      slug: "section-80d",
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
      slug: "section-24b",
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
      slug: "gst-registration",
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

  // 5. Section 10(13A) - HRA (New)
  await prisma.taxKnowledgeItem.create({
    data: {
      category: TaxCategory.DIRECT_TAX,
      actName: "Income Tax Act, 1961",
      slug: "section-10-13a-hra",
      sectionNumber: "Section 10(13A)",
      title: "House Rent Allowance (HRA) Exemption",
      summary: "Exemption for rent paid by salaried individuals who receive HRA from their employer.",
      explanation: "HRA is provided by employers to meet the cost of a rented house. Section 10(13A) allows for an exemption of a portion of this allowance if the employee lives in a rented accommodation.",
      applicability: ["Salaried Individuals"],
      benefitsOrDeductions: ["Least of: Actual HRA", "50% of Basic+DA (Metro) / 40% (Non-metro)", "Rent paid minus 10% of Basic+DA"],
      restrictions: ["Not available in New Tax Regime", "Must stay in a rented house", "Landlord's PAN required if rent > ₹1L per year"],
      examples: ["Salary ₹50k, HRA ₹20k, Rent ₹15k in Delhi. Calculation: Least of (20k, 25k, 15k-5k=10k). Exempt: ₹10k."],
      relatedForms: ["Form 16", "ITR-1"],
      filingProcedure: ["Submit rent receipts to employer", "Declare in ITR under Salary schedule"],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "Income Tax India - HRA", url: "https://www.incometaxindia.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    }
  });

  // 6. GST Composition Scheme (New)
  await prisma.taxKnowledgeItem.create({
    data: {
      category: TaxCategory.INDIRECT_TAX,
      actName: "CGST Act, 2017",
      slug: "gst-composition",
      sectionNumber: "Section 10",
      title: "GST Composition Scheme",
      summary: "A simplified tax scheme for small businesses with lower compliance and fixed tax rates.",
      explanation: "Small taxpayers with turnover up to ₹1.5 Crore can opt for the Composition Scheme to pay a fixed percentage of turnover as tax and file simplified returns.",
      applicability: ["Small Businesses", "Manufacturers", "Traders", "Restaurants"],
      benefitsOrDeductions: ["Tax rates: 1% (Traders/Mfrs), 5% (Restaurants), 6% (Service Providers)", "Fewer returns (Quarterly CMP-08, Annual GSTR-4)"],
      restrictions: ["Cannot claim Input Tax Credit (ITC)", "Cannot collect tax from customers", "Cannot make interstate sales", "Turnover limit: ₹1.5 Cr (₹75L for special states)"],
      relatedForms: ["CMP-02", "CMP-08", "GSTR-4"],
      filingProcedure: ["Opt-in via CMP-02 before financial year starts", "Quarterly payment via CMP-08"],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "GST Council - Composition", url: "https://www.gst.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    }
  });

  // 7. ITR-1 Sahaj Guide (New)
  await prisma.taxKnowledgeItem.create({
    data: {
      category: TaxCategory.DIRECT_TAX,
      actName: "Income Tax Rules",
      slug: "itr-1-guide",
      sectionNumber: "ITR-1",
      title: "ITR-1 (Sahaj) Filing Guide",
      summary: "Simplified income tax return for individuals with income from salary, one house property, and other sources.",
      explanation: "ITR-1 is the most commonly used form for salaried individuals with simple financial profiles and total income up to ₹50 Lakh.",
      applicability: ["Resident Individuals", "Income up to ₹50 Lakh"],
      benefitsOrDeductions: ["Simplest form", "Pre-filled data available", "Easy e-verification via Aadhaar"],
      restrictions: ["Not for Directors", "Not for those with Capital Gains", "Not for Business/Professional income", "Not for Foreign Assets"],
      relatedForms: ["Form 16", "Form 26AS", "AIS"],
      filingProcedure: ["Log in to e-filing portal", "Select AY 2026-27", "Verify pre-filled data", "Compute tax and e-verify"],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "ITR-1 Instructions", url: "https://www.incometax.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    }
  });

  // 8. ITR-4 Sugam Guide (New)
  await prisma.taxKnowledgeItem.create({
    data: {
      category: TaxCategory.DIRECT_TAX,
      actName: "Income Tax Rules",
      slug: "itr-4-guide",
      sectionNumber: "ITR-4",
      title: "ITR-4 (Sugam) Filing Guide",
      summary: "Tax return for individuals, HUFs, and firms opting for presumptive taxation schemes.",
      explanation: "ITR-4 is for taxpayers who have opted for presumptive taxation under sections 44AD, 44ADA, or 44AE, allowing them to declare income as a fixed percentage of turnover.",
      applicability: ["Resident Individuals", "HUFs", "Partnership Firms (except LLPs)"],
      benefitsOrDeductions: ["No need to maintain detailed books of accounts", "Lower compliance burden", "Income up to ₹50 Lakh (or ₹75L/3Cr for specific presumptive limits)"],
      restrictions: ["Not for Capital Gains", "Not for Foreign Assets", "Not for Company Directors"],
      relatedForms: ["Form 16", "AIS", "Form 26AS"],
      filingProcedure: ["Calculate turnover", "Apply presumptive rate (6%/8% for 44AD, 50% for 44ADA)", "Fill ITR-4 and e-verify"],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "ITR-4 Guide", url: "https://www.incometax.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    }
  });

  // 9. GSTR-3B Filing Guide (New)
  await prisma.taxKnowledgeItem.create({
    data: {
      category: TaxCategory.INDIRECT_TAX,
      actName: "CGST Rules",
      slug: "gstr-3b-guide",
      sectionNumber: "GSTR-3B",
      title: "GSTR-3B Filing Procedure",
      summary: "Monthly/Quarterly summary return for regular GST taxpayers to declare sales, claim ITC, and pay tax.",
      explanation: "GSTR-3B is a self-assessment summary return where taxpayers declare their outward supplies, inward supplies eligible for ITC, and tax liability.",
      applicability: ["All Regular GST Taxpayers", "Monthly or QRMP filers"],
      benefitsOrDeductions: ["Mechanism to claim Input Tax Credit", "Auto-populated from GSTR-1 and GSTR-2B"],
      restrictions: ["Mandatory even for Nil returns", "Interest applies on late payments", "Late fee for delayed filing"],
      relatedForms: ["GSTR-1", "GSTR-2B"],
      filingProcedure: ["File GSTR-1 first", "Verify auto-populated values in 3B", "Pay net tax using cash/credit ledger", "File using DSC or EVC"],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "GST Portal Help - 3B", url: "https://www.gst.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    }
  });

  console.log("Seed finished. Added 8 high-value tax knowledge items and guides.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
