import { ReviewStatus } from '@prisma/client';
import { prisma } from '../lib/db';

async function main() {
  console.log('Clearing existing data...');
  // Clear existing items to eliminate placeholder content
  await prisma.fAQ.deleteMany({});
  await prisma.sourceReference.deleteMany({});
  await prisma.taxKnowledgeItem.deleteMany({});

  console.log('Seeding official tax knowledge base...');

  // 1. Old vs New Tax Regime
  const regimeArticle = await prisma.taxKnowledgeItem.create({
    data: {
      category: 'INCOME_TAX',
      actName: 'Income Tax Act, 1961',
      sectionNumber: '115BAC',
      title: 'Old vs New Tax Regime (FY 2024-25)',
      summary: 'A detailed comparison of the Old vs New Tax Regime following the July 2024 Union Budget changes, including the ₹75,000 standard deduction.',
      explanation: 'The New Tax Regime under Section 115BAC is the default tax regime starting FY 2023-24. In the July 2024 Budget for FY 2024-25, the standard deduction for salaried employees under the new regime was increased from ₹50,000 to ₹75,000. Under the new regime, taxpayers give up most exemptions (like HRA, LTA, and Section 80C) in exchange for lower slab rates. However, a full rebate under Section 87A is available for taxable income up to ₹7,000,000, meaning a salaried individual earning up to ₹7,75,000 pays zero tax.',
      applicability: [
        'Individuals (Resident and Non-Resident)',
        'Hindu Undivided Families (HUFs)',
        'Association of Persons (AOPs)'
      ],
      benefitsOrDeductions: [
        'Standard Deduction of ₹75,000 (FY 2024-25 onwards)',
        'Lower tax slab rates compared to the Old Regime',
        'No requirement to submit investment proofs to employer'
      ],
      restrictions: [
        'Cannot claim Section 80C (EPF, ELSS, LIC)',
        'Cannot claim Section 80D (Health Insurance)',
        'Cannot claim Section 24b (Home Loan Interest on self-occupied property)',
        'Cannot claim HRA (House Rent Allowance) exemption'
      ],
      examples: [
        'Example 1: A salaried individual earns ₹12,000,000. Under the new regime, after the ₹75,000 standard deduction, the taxable income is ₹11,25,000. Using the new slab rates, the tax liability is significantly lower than the old regime unless they have over ₹3,00,000 in qualifying deductions (like 80C, HRA).'
      ],
      relatedForms: ['Form 10-IEA (if applicable for business income)', 'ITR-1', 'ITR-2'],
      filingProcedure: [
        'The New Regime is the default. If you have business income and wish to opt-out, you must file Form 10-IEA before the due date of filing the return (Section 139(1)).',
        'Salaried individuals can choose the regime directly in ITR-1/ITR-2 without filing Form 10-IEA.'
      ],
      relatedItems: ['Section 80C Deductions', 'Section 87A Rebate'],
      relatedCalculators: ['income-tax-calculator', 'tax-planner'],
      tags: ['regime', 'new tax regime', 'budget 2024', 'slab rates'],
      financialYear: '2024-25',
      assessmentYear: '2025-26',
      reviewStatus: ReviewStatus.VERIFIED,
      slug: 'old-vs-new-tax-regime-fy-2024-25',
      sourceReferences: {
        create: [
          {
            title: 'Finance (No. 2) Act, 2024',
            url: 'https://incometaxindia.gov.in/pages/budget-and-bills/finance-act.aspx',
            sourceType: 'OFFICIAL'
          }
        ]
      },
      faqs: {
        create: [
          {
            question: 'Is the standard deduction available in the New Tax Regime?',
            answer: 'Yes. For FY 2024-25 (AY 2025-26), a standard deduction of ₹75,000 is available to salaried employees and pensioners under the New Tax Regime.'
          },
          {
            question: 'Can I switch back to the Old Regime if I have business income?',
            answer: 'If you have business/professional income, you can opt out of the New Regime once. If you switch back to the New Regime again in the future, you cannot opt out for a lifetime.'
          }
        ]
      }
    }
  });

  // 2. Section 80C
  const sec80C = await prisma.taxKnowledgeItem.create({
    data: {
      category: 'INCOME_TAX',
      actName: 'Income Tax Act, 1961',
      sectionNumber: '80C',
      title: 'Section 80C Deductions Guide',
      summary: 'Comprehensive guide to Section 80C, allowing up to ₹1.5 Lakhs deduction on specified investments like EPF, PPF, ELSS, and LIC.',
      explanation: 'Section 80C of the Income Tax Act allows individuals and HUFs to claim a deduction of up to ₹1,50,000 from their gross total income for specific investments and expenditures. This deduction is ONLY available under the Old Tax Regime. Popular qualifying investments include Public Provident Fund (PPF), Employees Provident Fund (EPF), Equity Linked Savings Scheme (ELSS), Life Insurance Premiums, and principal repayment of home loans.',
      applicability: [
        'Individuals (Residents and Non-Residents)',
        'Hindu Undivided Families (HUFs)'
      ],
      benefitsOrDeductions: [
        'Maximum combined deduction of ₹1,50,000 under sections 80C, 80CCC, and 80CCD(1).',
        'Reduces taxable income, thereby lowering overall tax liability.'
      ],
      restrictions: [
        'Not available under the New Tax Regime (Section 115BAC).',
        'Lock-in periods apply (e.g., 3 years for ELSS, 15 years for PPF, 5 years for Tax Saving FDs).',
        'Cannot exceed the ₹1.5 Lakh limit even if total investments are higher.'
      ],
      examples: [
        'Example: Mr. Sharma invests ₹1,00,000 in PPF and pays ₹60,000 as life insurance premium. His total investment is ₹1,60,000, but he can only claim a maximum deduction of ₹1,50,000 under Section 80C.'
      ],
      relatedForms: ['ITR-1', 'ITR-2', 'ITR-3', 'ITR-4'],
      filingProcedure: [
        'Declare the investments in the Chapter VI-A deductions schedule of the respective ITR form.',
        'Submit proofs to your employer to prevent excess TDS deduction on salary.'
      ],
      relatedItems: ['Section 80D Medical Insurance', 'Old vs New Tax Regime'],
      relatedCalculators: ['80c-planner', 'income-tax-calculator'],
      tags: ['80c', 'ppf', 'elss', 'epf', 'old regime'],
      financialYear: '2024-25',
      assessmentYear: '2025-26',
      reviewStatus: ReviewStatus.VERIFIED,
      slug: 'section-80c-deductions-guide',
      sourceReferences: {
        create: [
          {
            title: 'Income Tax Act, 1961 - Section 80C',
            url: 'https://incometaxindia.gov.in/acts/income-tax-act/1961/section80c.aspx',
            sourceType: 'OFFICIAL'
          }
        ]
      },
      faqs: {
        create: [
          {
            question: 'Can I claim 80C deduction in the New Tax Regime?',
            answer: 'No, Section 80C deductions are strictly disallowed under the New Tax Regime.'
          },
          {
            question: 'Are school tuition fees covered under 80C?',
            answer: 'Yes, tuition fees paid to any school, college, or university in India for full-time education of up to 2 children qualify for deduction under Section 80C.'
          }
        ]
      }
    }
  });

  // 3. GST Registration
  const gstReg = await prisma.taxKnowledgeItem.create({
    data: {
      category: 'GST',
      actName: 'Central Goods and Services Tax Act, 2017',
      sectionNumber: 'Section 22 & 24',
      title: 'Mandatory GST Registration Thresholds',
      summary: 'Understand the turnover limits and conditions requiring mandatory GST registration for businesses and service providers in India.',
      explanation: 'Under the CGST Act 2017, every supplier whose aggregate turnover in a financial year exceeds ₹40 Lakhs for goods (₹20 Lakhs in special category states) or ₹20 Lakhs for services (₹10 Lakhs in special category states) is liable to register for GST. Additionally, Section 24 mandates compulsory registration regardless of turnover for certain entities, including those making inter-state taxable supplies, casual taxable persons, and e-commerce operators.',
      applicability: [
        'Businesses selling goods with turnover > ₹40 Lakhs',
        'Service providers with turnover > ₹20 Lakhs',
        'E-commerce sellers (Mandatory regardless of turnover)'
      ],
      benefitsOrDeductions: [
        'Legally recognized as supplier of goods or services.',
        'Can collect taxes from purchasers and pass on the credit.',
        'Can claim Input Tax Credit (ITC) on purchases.'
      ],
      restrictions: [
        'Failure to register incurs a penalty of ₹10,000 or 10% of the tax due, whichever is higher.',
        'Composition scheme dealers have restrictions on inter-state sales and claiming ITC.'
      ],
      examples: [
        'Example: A software freelancer (service provider) in Karnataka crosses ₹20 Lakhs in gross receipts in January. They must apply for GST registration within 30 days of crossing the threshold.'
      ],
      relatedForms: ['GST REG-01', 'GSTR-1', 'GSTR-3B'],
      filingProcedure: [
        'Go to the GST Portal (gst.gov.in) and navigate to Services > Registration > New Registration.',
        'Fill Part A (PAN, Mobile, Email) to generate TRN.',
        'Fill Part B (Business Details, Promoters, Principal Place of Business, Bank Account).',
        'Verify via Aadhaar Authentication for faster approval (within 3-7 working days).'
      ],
      relatedItems: ['Composition Scheme', 'GSTR-3B Filing'],
      relatedCalculators: ['gst-calculator', 'business-registration'],
      tags: ['gst', 'registration', 'turnover', 'e-commerce'],
      financialYear: '2024-25',
      assessmentYear: '2024-25',
      reviewStatus: ReviewStatus.VERIFIED,
      slug: 'mandatory-gst-registration-thresholds',
      sourceReferences: {
        create: [
          {
            title: 'CGST Act 2017 - Section 22',
            url: 'https://cbic-gst.gov.in/cgst-act.html',
            sourceType: 'OFFICIAL'
          },
          {
            title: 'CBIC Notificiation No. 10/2019',
            url: 'https://cbic-gst.gov.in/pdf/central-tax/notfctn-10-central-tax-english-2019.pdf',
            sourceType: 'OFFICIAL'
          }
        ]
      },
      faqs: {
        create: [
          {
            question: 'Do I need GST registration if I sell exclusively on Amazon/Flipkart?',
            answer: 'Yes. E-commerce sellers undertaking supply of goods through an operator are required to obtain mandatory GST registration irrespective of their aggregate turnover.'
          },
          {
            question: 'What is a Special Category State?',
            answer: 'Under GST, special category states include Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, Tripura, Himachal Pradesh, and Uttarakhand, where the threshold limit for registration is lower (₹10/20 Lakhs).'
          }
        ]
      }
    }
  });

  console.log('Seeding complete. Added real CMS articles.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
