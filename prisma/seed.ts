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
      filingProcedure: ["Declare in Form 12BB to employer", "Claim in ITR under Chapter VI-A deductions schedule"],
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
      imageUrl: "/images/section-80d-chart.png",
      summary: "Allows deduction for premium paid for health insurance for self, family, and parents.",
      explanation: "Section 80D provides substantial tax relief for health insurance premiums. You can claim up to ₹25,000 for yourself, spouse, and children, and an additional ₹25,000 (₹50,000 for seniors) for your parents. IMPORTANT: This deduction is exclusive to the Old Tax Regime. It also covers ₹5,000 for preventive health checkups within the overall limit.",
      applicability: ["Individuals", "HUFs"],
      benefitsOrDeductions: ["Up to ₹25,000 for self/family", "Additional ₹25,000 for parents", "Limit increases to ₹50,000 for senior citizens"],
      restrictions: ["Premium must be paid in any mode other than cash", "Preventive health checkup limited to ₹5,000"],
      examples: ["Paying ₹20k for self and ₹30k for senior citizen parents gives total ₹50k deduction."],
      relatedForms: ["Form 16", "ITR-1"],
      filingProcedure: ["Declare premium in Form 12BB", "Claim under Section 80D during ITR filing in Schedule 80D"],
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
      imageUrl: "/images/section-24b-chart.png",
      summary: "Deduction on interest paid for a home loan for a self-occupied or let-out property.",
      explanation: "Section 24(b) allows you to deduct the interest portion of your home loan from your taxable income. For self-occupied properties, the maximum limit is ₹2,00,000 per year. For let-out properties, there is no upper limit on the interest deduction. IMPORTANT: In the New Tax Regime, this deduction is not allowed for self-occupied properties.",
      applicability: ["Individuals", "HUFs"],
      benefitsOrDeductions: ["Up to ₹2 Lakh for self-occupied property", "No limit for let-out property"],
      restrictions: ["Construction must be completed within 5 years", "Available in both regimes but with limitations in New Regime"],
      examples: ["Annual interest of ₹2.5L on home loan allows ₹2L deduction for self-occupied house."],
      relatedForms: ["ITR-2", "Form 12BB"],
      filingProcedure: ["Calculate interest from home loan certificate", "Declare under Income/Loss from House Property in ITR", "Declare in Form 12BB to employer for TDS adjustment"],
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
      imageUrl: "/images/gst-registration-chart.png",
      summary: "Mandatory registration for businesses exceeding specific turnover limits.",
      explanation: "Every business must register for GST once their aggregate annual turnover exceeds the threshold. For Goods, the limit is generally ₹40 Lakh, while for Services, it is ₹20 Lakh. Special Category states have a lower limit of ₹10 Lakh. CRITICAL: Once registered, you are legally required to collect tax and can claim Input Tax Credit (ITC).",
      applicability: ["Businesses", "Freelancers", "E-commerce operators"],
      benefitsOrDeductions: ["Legally authorized to collect tax", "Eligibility for Input Tax Credit (ITC)"],
      restrictions: ["₹40 Lakh for goods (Normal states)", "₹20 Lakh for services", "₹10 Lakh for special category states"],
      relatedForms: ["REG-01", "REG-06"],
      filingProcedure: ["Apply online on GST Portal using Form GST REG-01", "Provide PAN, Aadhaar, and business address proof", "Verification by officer within 7 working days", "Grant of GSTIN and Registration Certificate in Form GST REG-06"],
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
      imageUrl: "/images/hra-exemption-chart.png",
      summary: "Exemption for rent paid by salaried individuals who receive HRA from their employer.",
      explanation: "House Rent Allowance (HRA) is a key component for salaried employees. Under Section 10(13A), you can claim an exemption based on the least of three values: Actual HRA received, 40-50% of Basic Salary, or Rent paid minus 10% of Basic Salary. CRITICAL: This exemption is NOT available in the New Tax Regime.",
      applicability: ["Salaried Individuals"],
      benefitsOrDeductions: ["Least of: Actual HRA", "50% of Basic+DA (Metro) / 40% (Non-metro)", "Rent paid minus 10% of Basic+DA"],
      restrictions: ["Not available in New Tax Regime", "Must stay in a rented house", "Landlord's PAN required if rent > ₹1L per year"],
      examples: ["Salary ₹50k, HRA ₹20k, Rent ₹15k in Delhi. Calculation: Least of (20k, 25k, 15k-5k=10k). Exempt: ₹10k."],
      relatedForms: ["Form 16", "ITR-1"],
      filingProcedure: ["Submit rent receipts & rent agreement to employer", "Declare Landlord PAN if annual rent exceeds ₹1,00,000", "Declare in ITR under Salary schedule"],
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
      imageUrl: "/images/gst-composition-chart.png",
      summary: "A simplified tax scheme for small businesses with lower compliance and fixed tax rates.",
      explanation: "Small taxpayers with turnover up to ₹1.5 Crore can opt for the Composition Scheme to reduce compliance burdens. Instead of standard rates, they pay a fixed percentage of turnover (1% to 6%) as tax. CRITICAL RESTRICTION: You cannot claim Input Tax Credit (ITC) or collect GST from your customers under this scheme.",
      applicability: ["Small Businesses", "Manufacturers", "Traders", "Restaurants"],
      benefitsOrDeductions: ["Tax rates: 1% (Traders/Mfrs), 5% (Restaurants), 6% (Service Providers)", "Fewer returns (Quarterly CMP-08, Annual GSTR-4)"],
      restrictions: ["Cannot claim Input Tax Credit (ITC)", "Cannot collect tax from customers", "Cannot make interstate sales", "Turnover limit: ₹1.5 Cr (₹75L for special states)"],
      relatedForms: ["CMP-02", "CMP-08", "GSTR-4"],
      filingProcedure: ["Opt-in via Form GST CMP-02 before financial year starts", "Quarterly payment via CMP-08 statement by 18th of next month", "File annual return GSTR-4 by 30th April of next financial year"],
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
      imageUrl: "/images/itr1-guide-chart.png",
      summary: "Simplified income tax return for individuals with income from salary, one house property, and other sources.",
      explanation: "ITR-1, also known as Sahaj, is the simplest tax return form. It is meant for resident individuals with total income up to ₹50 Lakh from Salary, one House Property, and Other Sources (like Interest). CRITICAL: It cannot be used if you are a Director in a company, have Capital Gains, or own foreign assets.",
      applicability: ["Resident Individuals", "Income up to ₹50 Lakh"],
      benefitsOrDeductions: ["Simplest form", "Pre-filled data available", "Easy e-verification via Aadhaar"],
      restrictions: ["Not for Directors", "Not for those with Capital Gains", "Not for Business/Professional income", "Not for Foreign Assets"],
      relatedForms: ["Form 16", "Form 26AS", "AIS"],
      filingProcedure: ["Log in to e-filing portal", "Select AY 2026-27", "Verify pre-filled data against Form 16 & Form 26AS/AIS", "Compute tax, pay outstanding tax if any, and submit ITR-1", "E-verify using Aadhaar OTP within 30 days"],
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
      imageUrl: "/images/itr4-guide-chart.png",
      summary: "Tax return for individuals, HUFs, and firms opting for presumptive taxation schemes.",
      explanation: "ITR-4, or Sugam, is designed for taxpayers opting for the Presumptive Taxation Scheme under Sections 44AD, 44ADA, or 44AE. It allows you to declare business/professional income at a fixed percentage of turnover, eliminating the need for detailed bookkeeping. LIMIT: Applicable for income up to ₹50 Lakh (conditions apply for higher limits).",
      applicability: ["Resident Individuals", "HUFs", "Partnership Firms (except LLPs)"],
      benefitsOrDeductions: ["No need to maintain detailed books of accounts", "Lower compliance burden", "Income up to ₹50 Lakh (or ₹75L/3Cr for specific presumptive limits)"],
      restrictions: ["Not for Capital Gains", "Not for Foreign Assets", "Not for Company Directors"],
      relatedForms: ["Form 16", "AIS", "Form 26AS"],
      filingProcedure: ["Calculate turnover/gross receipts", "Apply presumptive rate (6%/8% for 44AD, 50% for 44ADA)", "Fill ITR-4 and report presumptive business details", "Pay balance tax and e-verify return using Aadhaar OTP"],
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
      imageUrl: "/images/gstr3b-filing-chart.png",
      summary: "Monthly/Quarterly summary return for regular GST taxpayers to declare sales, claim ITC, and pay tax.",
      explanation: "GSTR-3B is a monthly (or quarterly for QRMP) self-declaration return. It captures the summary of your Outward Supplies (Sales) and Inward Supplies (Purchases for ITC). The net tax liability (Sales Tax - ITC) must be paid in cash before filing. MANDATORY: Even if you have no transactions, you must file a 'Nil' return.",
      applicability: ["All Regular GST Taxpayers", "Monthly or QRMP filers"],
      benefitsOrDeductions: ["Mechanism to claim Input Tax Credit", "Auto-populated from GSTR-1 and GSTR-2B"],
      restrictions: ["Mandatory even for Nil returns", "Interest applies on late payments", "Late fee for delayed filing"],
      relatedForms: ["GSTR-1", "GSTR-2B"],
      filingProcedure: ["File GSTR-1 first (updates buyer's ITC and your outward tax)", "Verify auto-populated values in GSTR-3B from GSTR-1 & GSTR-2B", "Offset output liability using available ITC", "Pay net tax using cash ledger (net tax payable)", "File GSTR-3B using DSC or EVC"],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "GST Portal Help - 3B", url: "https://www.gst.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    },
    // 10. Section 80TTA & 80TTB
    {
      category: TaxCategory.DIRECT_TAX,
      actName: "Income Tax Act, 1961",
      slug: "section-80tta-80ttb",
      sectionNumber: "80TTA / 80TTB",
      title: "Deduction for Savings Interest",
      imageUrl: "/images/80tta-80ttb-chart.png",
      summary: "Tax benefits on interest earned from savings accounts with banks or post offices.",
      explanation: "Sections 80TTA and 80TTB offer deductions on interest income. 80TTA allows up to ₹10,000 for regular individuals on savings account interest. 80TTB is for Senior Citizens, offering a higher limit of ₹50,000 on all types of deposits (FDs/Savings). IMPORTANT: These deductions are ONLY available in the Old Tax Regime.",
      applicability: ["Individuals", "Senior Citizens (80TTB)"],
      benefitsOrDeductions: ["80TTA: Up to ₹10,000 for regular individuals", "80TTB: Up to ₹50,000 for Senior Citizens", "Includes Bank, Post Office, and Co-op society interest"],
      restrictions: ["80TTA does not cover Fixed Deposits (FDs) or Recurring Deposits (RDs)", "Only 80TTB covers FD/RD interest"],
      examples: ["A senior citizen earning ₹40k interest on FDs can claim the full amount as deduction under 80TTB."],
      relatedForms: ["Form 16A", "ITR-1"],
      filingProcedure: ["Collect interest certificate from bank/post office", "Declare interest income under 'Income from Other Sources'", "Claim deduction under Chapter VI-A (Section 80TTA/80TTB) in ITR"],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "Income Tax India - Interest Deduction", url: "https://www.incometaxindia.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    },
    // 11. Section 44ADA
    {
      category: TaxCategory.DIRECT_TAX,
      actName: "Income Tax Act, 1961",
      slug: "section-44ada-professionals",
      sectionNumber: "Section 44ADA",
      title: "Presumptive Taxation for Professionals",
      imageUrl: "/images/section-44ada-chart.png",
      summary: "A simplified tax scheme for professionals like doctors, engineers, and freelancers.",
      explanation: "Section 44ADA offers a simplified taxation scheme for specified professionals (Doctors, Lawyers, IT Consultants, etc.). If your turnover is up to ₹50 Lakh (₹75 Lakh if 95% of receipts are digital), you can declare 50% of your gross receipts as taxable income. MANDATORY: You cannot claim any business expenses separately if you opt for this. Available in both regimes.",
      applicability: ["Freelancers", "Doctors", "Engineers", "CAs", "Architects"],
      benefitsOrDeductions: ["No need to maintain books of accounts", "No audit required if 50% profit is declared", "Simplified tax filing using ITR-4"],
      restrictions: ["Gross receipts must be below ₹75 Lakh (if 95% is digital)", "Cannot claim further business expenses once 50% is opted"],
      examples: ["A freelancer earning ₹20 Lakh can pay tax on only ₹10 Lakh without showing expenses."],
      relatedForms: ["ITR-4"],
      filingProcedure: ["Calculate total gross receipts during financial year", "Ensure digital transactions meet 95% rule for higher limit", "Declare 50% (or more) of receipts as income in ITR-4 presumptive schedules", "File return and e-verify"],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "Presumptive Taxation Guide", url: "https://www.incometaxindia.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    },
    // 12. Capital Gains Basics
    {
      category: TaxCategory.DIRECT_TAX,
      actName: "Income Tax Act, 1961",
      slug: "capital-gains-basics",
      sectionNumber: "Section 45",
      title: "Basics of Capital Gains Tax",
      imageUrl: "/images/capital-gains-chart.png",
      summary: "Tax on profits earned from selling capital assets like shares, mutual funds, or real estate.",
      explanation: "Capital Gains Tax applies when you sell an asset for more than its purchase price. It is split into Short-Term (STCG) and Long-Term (LTCG) based on the holding period. For example, Stocks are LTCG after 1 year, Real Estate after 2 years, and Gold after 3 years. CRITICAL: Tax rates and exemptions (u/s 54) vary significantly by asset type.",
      applicability: ["Investors", "Property Sellers"],
      benefitsOrDeductions: ["Equity LTCG: Zero tax up to ₹1.25 Lakh profit per year", "Indexation benefit for property (depending on regime)", "Exemptions under Section 54/54EC for reinvestment"],
      restrictions: ["Holding period varies: 12m for listed shares, 24m for property", "STCG rates are usually higher"],
      examples: ["Selling shares after 15 months with ₹2L profit. ₹1.25L is exempt, pay 12.5% on remaining ₹75k."],
      relatedForms: ["ITR-2", "ITR-3"],
      filingProcedure: ["Obtain Capital Gains statement from broker/registry", "Categorize into Short-Term or Long-Term based on asset hold times", "Report in Schedule CG of ITR-2 or ITR-3", "Pay self-assessment tax if tax liability arises"],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "Capital Gains Tax Rates", url: "https://www.incometaxindia.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    },
    // 13. Section 80G
    {
      category: TaxCategory.DIRECT_TAX,
      actName: "Income Tax Act, 1961",
      slug: "section-80g-donations",
      sectionNumber: "Section 80G",
      title: "Deduction for Charitable Donations",
      imageUrl: "/images/section-80g-chart.png",
      summary: "Deductions for contributions made to specified relief funds and charitable institutions.",
      explanation: "Section 80G encourages philanthropy by offering tax deductions on donations to approved funds. Depending on the fund, you can claim either 50% or 100% of the donated amount. RESTRICTION: Cash donations exceeding ₹2,000 are not eligible. IMPORTANT: This deduction is strictly for the Old Tax Regime.",
      applicability: ["All Taxpayers"],
      benefitsOrDeductions: ["100% deduction for Prime Minister's Relief Fund", "50% deduction for most registered NGOs", "Deduction available for both cash (up to ₹k) and digital payments"],
      restrictions: ["Cannot claim for donations in kind (food, clothes)", "Max cash donation allowed: ₹2,000", "Must have 80G certificate from the NGO"],
      examples: ["Donating ₹10,000 to a 50% deduction NGO reduces taxable income by ₹5,000."],
      relatedForms: ["ITR-1", "Donation Receipt"],
      filingProcedure: ["Collect 80G donation receipt and Form 10BE from the NGO", "Ensure NGO has filed Form 10BD to reflect donation in your AIS", "Claim deduction under Section 80G in Schedule 80G of ITR"],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "80G Donation Rules", url: "https://www.incometaxindia.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    },
    // 14. GST Input Tax Credit
    {
      category: TaxCategory.INDIRECT_TAX,
      actName: "CGST Act, 2017",
      slug: "gst-input-tax-credit",
      sectionNumber: "Section 16",
      title: "Understanding Input Tax Credit (ITC)",
      imageUrl: "/images/gst-itc-chart.png",
      summary: "Reducing net GST liability by deducting tax already paid on business purchases.",
      explanation: "Input Tax Credit (ITC) allows a registered person to take credit for tax paid on business purchases. This credit can be used to pay your output tax liability. MANDATORY: You must possess a valid tax invoice, and the supplier must have filed their returns (GSTR-1) for you to claim ITC.",
      applicability: ["Registered GST Taxpayers"],
      benefitsOrDeductions: ["Prevents cascading of taxes (Tax on Tax)", "Reduces the final tax burden on the business", "ITC can be used to pay IGST, CGST, and SGST"],
      restrictions: ["Must have a valid tax invoice", "Goods/services must have been received", "Supplier must have filed GSTR-1 and paid tax"],
      examples: ["Tax on sales: ₹100, Tax on purchases: ₹60. Net GST to be paid in cash: ₹40."],
      relatedForms: ["GSTR-2B", "GSTR-3B"],
      filingProcedure: ["Verify available credit in GSTR-2B (auto-drafted statement)", "Ensure matching with purchase invoices in books", "Claim credit in Table 4 of GSTR-3B monthly", "Ensure payment to supplier is made within 180 days to avoid reversal"],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "CBIC ITC Guide", url: "https://www.cbic.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    },
    // 15. TDS & Form 26AS Basics
    {
      category: TaxCategory.DIRECT_TAX,
      actName: "Income Tax Rules",
      slug: "tds-form-26as-basics",
      sectionNumber: "TDS / 26AS",
      title: "TDS and Tax Credit Tracking",
      imageUrl: "/images/tds-26as-chart.png",
      summary: "Understanding how tax is deducted at source and tracked in your official records.",
      explanation: "Tax Deducted at Source (TDS) is a system where tax is collected at the point of income generation. These deductions are reflected in your Form 26AS (Tax Credit Statement) and AIS. CRITICAL: Always cross-verify your TDS certificates with Form 26AS before filing your return to ensure you get full credit for taxes paid.",
      applicability: ["Salaried Individuals", "Contractors", "FD Holders"],
      benefitsOrDeductions: ["Automatic tax payment throughout the year", "Refundable if total tax liability is less than TDS", "Digital proof of tax payment via Form 26AS"],
      restrictions: ["Must verify TDS credit in 26AS before filing ITR", "TDS rates vary by nature of payment (1%, 10%, etc.)"],
      examples: ["Bank deducts 10% TDS on FD interest. This appears in your 26AS as a tax credit."],
      relatedForms: ["Form 26AS", "Form 16", "Form 16A"],
      filingProcedure: ["Log in to Income Tax e-filing portal", "Navigate to View Form 26AS/AIS", "Match TDS amount with Form 16/16A", "Claim tax credit in corresponding schedules of ITR"],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "TRACES - Form 26AS", url: "https://www.tdscpc.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    },
    // 16. ITR-5 Guide (NEW - Firm & LLP)
    {
      category: TaxCategory.DIRECT_TAX,
      actName: "Income Tax Rules",
      slug: "itr-5-guide",
      sectionNumber: "ITR-5",
      title: "ITR-5 Filing Guide for Firms & LLPs",
      imageUrl: "/images/itr5-guide-chart.png",
      summary: "Income tax return for Partnership Firms, LLPs, AOPs, BOIs, and Artificial Juridical Persons.",
      explanation: "ITR-5 is dedicated to business entities that are not individuals, HUFs, or companies. It is applicable for Partnership Firms, LLPs (Limited Liability Partnerships), Association of Persons (AOP), and Body of Individuals (BOI). CRITICAL: LLPs and firms are taxed at a flat rate of 30% (plus surcharge and cess). Unlike individuals, there is no slab benefit. Tax audit u/s 44AB might apply if turnover exceeds ₹10 Crore (for business) or ₹50 Lakh (for professionals).",
      applicability: ["Partnership Firms", "LLPs", "Association of Persons (AOP)", "Body of Individuals (BOI)"],
      benefitsOrDeductions: ["Allows deduction of partner's salary & interest (subject to Section 40(b) limits)", "Carry forward of business losses up to 8 years"],
      restrictions: ["Not for Individual taxpayers", "Not for Companies (ITR-6)", "Not for Charitable Trusts (ITR-7)"],
      examples: ["An LLP with ₹25 Lakh profit files ITR-5 and pays flat 30% tax + 4% cess."],
      relatedForms: ["Form 3CD (Audit Report)", "Form 10IC", "Partner Capital Accounts"],
      filingProcedure: [
        "Prepare final accounts (P&L and Balance Sheet)",
        "Calculate partner remuneration & interest limits under Section 40(b)",
        "Undergo tax audit under Section 44AB if turnover exceeds threshold limits",
        "Fill ITR-5 online/offline utility, verify shares/profit splits",
        "Digitally sign the return (DSC) of the designated partner/partner"
      ],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "ITR-5 Instructions - Income Tax", url: "https://www.incometax.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    },
    // 17. ITR-6 Guide (NEW - Corporate Companies)
    {
      category: TaxCategory.DIRECT_TAX,
      actName: "Income Tax Rules",
      slug: "itr-6-guide",
      sectionNumber: "ITR-6",
      title: "ITR-6 Filing Guide for Companies",
      imageUrl: "/images/itr6-guide-chart.png",
      summary: "Income tax return for corporate taxpayers (Companies) other than those claiming exemption u/s 11.",
      explanation: "All companies registered under the Companies Act (Private Limited, Public Limited, One Person Company) must file ITR-6. Even if a company has zero business activity or is inactive, filing ITR-6 is legally mandatory. Tax rates vary: 15% for new manufacturing companies (u/s 115BAB), 22% under Section 115BAA, or 25%/30% base rates. CRITICAL: Every company filing ITR-6 must sign the return using a Class 3 Digital Signature Certificate (DSC) of the Director.",
      applicability: ["Private Limited Companies", "Public Limited Companies", "One Person Companies (OPC)"],
      benefitsOrDeductions: ["Concessional tax rates of 22% or 15% under new regimes", "Exemptions on inter-corporate dividends"],
      restrictions: ["Cannot be filed by individuals or firms", "Not for companies claiming exemption u/s 11 (Charitable/Religious trusts)"],
      examples: ["A Private Limited Company registered in India files ITR-6 and opts for Section 115BAA to pay 22% flat tax + surcharge & cess."],
      relatedForms: ["Form 3CD (Audit Report)", "Form 29B (MAT report)", "MGT-7"],
      filingProcedure: [
        "Audit accounts by Chartered Accountant (Form 3CD is uploaded beforehand)",
        "Ensure MAT (Minimum Alternate Tax) calculation is done if regular regime is opted",
        "Fill Schedule AL (Assets and Liabilities) and Shareholding pattern",
        "File ITR-6 on e-filing portal using Director's Digital Signature Certificate (DSC)"
      ],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "ITR-6 Guide - Income Tax India", url: "https://www.incometax.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    },
    // 18. GSTR-1 Guide (NEW - GST Sales)
    {
      category: TaxCategory.INDIRECT_TAX,
      actName: "CGST Act, 2017",
      slug: "gstr-1-guide",
      sectionNumber: "GSTR-1",
      title: "GSTR-1 Filing Procedure",
      imageUrl: "/images/gstr1-guide-chart.png",
      summary: "Monthly or quarterly return to declare details of outward supplies (sales invoices) of goods and services.",
      explanation: "GSTR-1 is a mandatory return where a registered GST taxpayer details all invoices, debit notes, credit notes, and revised invoices for sales. The data uploaded here directly populates the GSTR-2B of your buyers, enabling them to claim Input Tax Credit (ITC). If you don't file GSTR-1 on time, your buyers cannot claim ITC.",
      applicability: ["Regular GST Taxpayers", "SEZ Developers/Units", "Casual Taxable Persons"],
      benefitsOrDeductions: ["Passes on Input Tax Credit (ITC) to buyers", "B2B and B2C sales segregation"],
      restrictions: ["Must be filed before the 11th of next month (monthly) or 13th (quarterly under QRMP)", "No tax payment is made in GSTR-1 (tax is paid in GSTR-3B)"],
      relatedForms: ["GSTR-2B", "GSTR-3B"],
      filingProcedure: [
        "Upload all sales invoices on GST Portal",
        "Categorize under B2B (business-to-business) or B2C (business-to-consumer) supplies",
        "Verify GSTR-1 summary generated by the portal",
        "File using DSC (for companies/LLPs) or EVC (Aadhaar OTP for others)"
      ],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "GSTR-1 Help - GST Portal", url: "https://www.gst.gov.in", sourceType: SourceType.OFFICIAL }]
      }
    },
    // 19. Form 26Q (NEW - TDS Non-Salary)
    {
      category: TaxCategory.DIRECT_TAX,
      actName: "Income Tax Act, 1961",
      slug: "form-26q-tds",
      sectionNumber: "Form 26Q",
      title: "Form 26Q TDS Return (Non-Salary)",
      imageUrl: "/images/form-26q-chart.png",
      summary: "Quarterly return for tax deducted at source (TDS) on payments other than salary (e.g. rent, professional fees, commission).",
      explanation: "Form 26Q is filed by deductors (employers, businesses) who deduct TDS on payments made to resident individuals/firms for business expenses. Common sections under this include Section 194C (contractors), 194J (professional/technical fees), and 194I (rent). CRITICAL: Late filing attracts a fee of ₹200 per day under Section 234E and interest on delayed payments (1% or 1.5%).",
      applicability: ["Corporate Deductors", "Non-corporate Deductors (under Tax Audit)"],
      benefitsOrDeductions: ["Ensures government receives tax on income as it is earned", "Allows deductee to claim tax credit in Form 26AS"],
      restrictions: ["Applicable only for payments to resident individuals/entities", "Must be filed quarterly by the end of the month following the quarter"],
      examples: ["A company pays ₹50,000 professional fees to a CA. It deducts 10% TDS (₹5,000) u/s 194J and reports this in Form 26Q."],
      relatedForms: ["Form 16A (TDS Certificate)", "Challan 281"],
      filingProcedure: [
        "Deduct TDS at correct rate (e.g. 10% u/s 194J) when booking expense or making payment",
        "Deposit TDS to government account using Challan 281 by 7th of the next calendar month",
        "Prepare quarterly TDS return using NSDL e-Gov utility",
        "Validate file using FVU (File Validation Utility) and upload on TRACES/Income tax portal"
      ],
      reviewStatus: ReviewStatus.VERIFIED,
      sourceReferences: {
        create: [{ title: "TRACES TDS Guidelines", url: "https://www.tdscpc.gov.in", sourceType: SourceType.OFFICIAL }]
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
