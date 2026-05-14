import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, TaxCategory, ReviewStatus, SourceType } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting Expanded Knowledge Base Seed...");

  // Clean existing data to ensure a fresh, consistent state
  await prisma.sourceReference.deleteMany();
  await prisma.taxKnowledgeItem.deleteMany();

  const items = [
    // 1. Section 80C
    {
      category: TaxCategory.DIRECT_TAX,
      actName: "Income Tax Act, 1961",
      slug: "section-80c",
      sectionNumber: "Section 80C",
      title: "Deduction for Investments and Savings",
      imageUrl: "/images/section-80c-chart.png",
      summary: "Allows deductions up to ₹1.5 Lakh for specific investments like EPF, PPF, and ELSS.",
      explanation: "Section 80C is the most popular tax-saving option in India. It allows taxpayers to reduce their taxable income by up to ₹1,50,000 per year by investing in specific long-term schemes. IMPORTANT: This deduction is ONLY available under the Old Tax Regime and cannot be claimed if you opt for the New Tax Regime (u/s 115BAC).",
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
    },
    // 2. Section 80D
    {
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
    },
    // 3. Section 24(b)
    {
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
    },
    // 4. GST Registration
    {
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
    },
    // 5. Section 10(13A) - HRA
    {
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
    },
    // 6. GST Composition Scheme
    {
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
    },
    // 7. ITR-1 Sahaj Guide
    {
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
    },
    // 8. ITR-4 Sugam Guide
    {
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
    },
    // 9. GSTR-3B Filing Guide
    {
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
    },
    // 10. Section 80TTA & 80TTB (NEW)
    {
      category: TaxCategory.DIRECT_TAX,
      actName: "Income Tax Act, 1961",
      slug: "section-80tta-80ttb",
      sectionNumber: "80TTA / 80TTB",
      title: "Deduction for Savings Interest",
      summary: "Tax benefits on interest earned from savings accounts with banks or post offices.",
      explanation: "Section 80TTA provides a deduction of up to ₹10,000 on interest from savings accounts for regular individuals. Section 80TTB is a broader deduction for senior citizens, covering interest from all types of deposits including FDs.",
      applicability: ["Individuals", "Senior Citizens (80TTB)"],
      benefitsOrDeductions: ["80TTA: Up to ₹10,000 for regular individuals", "80TTB: Up to ₹50,000 for Senior Citizens", "Includes Bank, Post Office, and Co-op society interest"],
      restrictions: ["80TTA does not cover Fixed Deposits (FDs) or Recurring Deposits (RDs)", "Only 80TTB covers FD/RD interest"],
      examples: ["A senior citizen earning ₹40k interest on FDs can claim the full amount as deduction under 80TTB."],
      relatedForms: ["Form 16A", "ITR-1"],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "Income Tax India - Interest Deduction", url: "https://www.incometaxindia.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    },
    // 11. Section 44ADA (NEW)
    {
      category: TaxCategory.DIRECT_TAX,
      actName: "Income Tax Act, 1961",
      slug: "section-44ada-professionals",
      sectionNumber: "Section 44ADA",
      title: "Presumptive Taxation for Professionals",
      summary: "A simplified tax scheme for professionals like doctors, engineers, and freelancers.",
      explanation: "Section 44ADA allows professionals with gross receipts up to ₹75 Lakh to declare 50% of their receipts as taxable income, eliminating the need to maintain detailed expense records.",
      applicability: ["Freelancers", "Doctors", "Engineers", "CAs", "Architects"],
      benefitsOrDeductions: ["No need to maintain books of accounts", "No audit required if 50% profit is declared", "Simplified tax filing using ITR-4"],
      restrictions: ["Gross receipts must be below ₹75 Lakh (if 95% is digital)", "Cannot claim further business expenses once 50% is opted"],
      examples: ["A freelancer earning ₹20 Lakh can pay tax on only ₹10 Lakh without showing expenses."],
      relatedForms: ["ITR-4"],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "Presumptive Taxation Guide", url: "https://www.incometaxindia.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    },
    // 12. Capital Gains Basics (NEW)
    {
      category: TaxCategory.DIRECT_TAX,
      actName: "Income Tax Act, 1961",
      slug: "capital-gains-basics",
      sectionNumber: "Section 45",
      title: "Basics of Capital Gains Tax",
      summary: "Tax on profits earned from selling capital assets like shares, mutual funds, or real estate.",
      explanation: "Capital gains are divided into Short-Term (STCG) and Long-Term (LTCG) based on the holding period of the asset. Different tax rates apply to equity and non-equity assets.",
      applicability: ["Investors", "Property Sellers"],
      benefitsOrDeductions: ["Equity LTCG: Zero tax up to ₹1.25 Lakh profit per year", "Indexation benefit for property (depending on regime)", "Exemptions under Section 54/54EC for reinvestment"],
      restrictions: ["Holding period varies: 12m for listed shares, 24m for property", "STCG rates are usually higher"],
      examples: ["Selling shares after 15 months with ₹2L profit. ₹1.25L is exempt, pay 12.5% on remaining ₹75k."],
      relatedForms: ["ITR-2", "ITR-3"],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "Capital Gains Tax Rates", url: "https://www.incometaxindia.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    },
    // 13. Section 80G (NEW)
    {
      category: TaxCategory.DIRECT_TAX,
      actName: "Income Tax Act, 1961",
      slug: "section-80g-donations",
      sectionNumber: "Section 80G",
      title: "Deduction for Charitable Donations",
      summary: "Deductions for contributions made to specified relief funds and charitable institutions.",
      explanation: "Taxpayers can claim a deduction for donations made to certain funds or charitable organizations. The deduction can be 50% or 100% of the donation amount, with or without limits.",
      applicability: ["All Taxpayers"],
      benefitsOrDeductions: ["100% deduction for Prime Minister's Relief Fund", "50% deduction for most registered NGOs", "Deduction available for both cash (up to ₹2k) and digital payments"],
      restrictions: ["Cannot claim for donations in kind (food, clothes)", "Max cash donation allowed: ₹2,000", "Must have 80G certificate from the NGO"],
      examples: ["Donating ₹10,000 to a 50% deduction NGO reduces taxable income by ₹5,000."],
      relatedForms: ["ITR-1", "Donation Receipt"],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "80G Donation Rules", url: "https://www.incometaxindia.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    },
    // 14. GST Input Tax Credit (NEW)
    {
      category: TaxCategory.INDIRECT_TAX,
      actName: "CGST Act, 2017",
      slug: "gst-input-tax-credit",
      sectionNumber: "Section 16",
      title: "Understanding Input Tax Credit (ITC)",
      summary: "Reducing net GST liability by deducting tax already paid on business purchases.",
      explanation: "Input Tax Credit (ITC) allows a registered person to take credit for tax paid on inward supplies of goods or services which are used in the course or furtherance of business.",
      applicability: ["Registered GST Taxpayers"],
      benefitsOrDeductions: ["Prevents cascading of taxes (Tax on Tax)", "Reduces the final tax burden on the business", "ITC can be used to pay IGST, CGST, and SGST"],
      restrictions: ["Must have a valid tax invoice", "Goods/services must have been received", "Supplier must have filed GSTR-1 and paid tax"],
      examples: ["Tax on sales: ₹100, Tax on purchases: ₹60. Net GST to be paid in cash: ₹40."],
      relatedForms: ["GSTR-2B", "GSTR-3B"],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "CBIC ITC Guide", url: "https://www.cbic.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    },
    // 15. TDS & Form 26AS Basics (NEW)
    {
      category: TaxCategory.DIRECT_TAX,
      actName: "Income Tax Rules",
      slug: "tds-form-26as-basics",
      sectionNumber: "TDS / 26AS",
      title: "TDS and Tax Credit Tracking",
      summary: "Understanding how tax is deducted at source and tracked in your official records.",
      explanation: "Tax Deducted at Source (TDS) is a system where the person responsible for making specified payments (like salary, rent, interest) deducts tax before paying. These deductions are reflected in Form 26AS and AIS.",
      applicability: ["Salaried Individuals", "Contractors", "FD Holders"],
      benefitsOrDeductions: ["Automatic tax payment throughout the year", "Refundable if total tax liability is less than TDS", "Digital proof of tax payment via Form 26AS"],
      restrictions: ["Must verify TDS credit in 26AS before filing ITR", "TDS rates vary by nature of payment (1%, 10%, etc.)"],
      examples: ["Bank deducts 10% TDS on FD interest. This appears in your 26AS as a tax credit."],
      relatedForms: ["Form 26AS", "Form 16", "Form 16A"],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "TRACES - Form 26AS", url: "https://www.tdscpc.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    }
  ];

  for (const item of items) {
    await prisma.taxKnowledgeItem.create({
      data: item
    });
  }

  console.log(`Seed finished. Total items in Knowledge Base: ${items.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
