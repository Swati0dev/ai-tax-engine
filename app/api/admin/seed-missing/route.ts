import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ReviewStatus } from "@prisma/client";

export async function GET() {
  try {
    console.log('Seeding missing categories (GENERAL, BUSINESS_TAX)...');

    // GENERAL Category (Tax Basics)
    await prisma.taxKnowledgeItem.create({
      data: {
        category: 'GENERAL',
        actName: 'Income Tax Act, 1961',
        sectionNumber: 'Basics',
        title: 'Introduction to Indian Taxation',
        summary: 'A beginner-friendly guide to understanding the structure of direct and indirect taxes in India.',
        explanation: 'Taxes in India are primarily divided into two categories: Direct Taxes (like Income Tax, Corporate Tax) which are levied directly on the income or wealth of a person, and Indirect Taxes (like GST, Customs Duty) which are levied on the price of a good or service. The Income Tax Department governs direct taxes, while the Central Board of Indirect Taxes and Customs (CBIC) governs indirect taxes. Understanding these basics helps taxpayers ensure compliance and optimize their financial planning.',
        applicability: ['All Indian Citizens', 'NRIs', 'Corporations'],
        benefitsOrDeductions: ['Structured revenue generation for the government', 'Public infrastructure development'],
        restrictions: ['Tax evasion is a punishable offense under various sections of the IT Act and CGST Act.'],
        examples: ['Direct Tax: Paying income tax on your salary. Indirect Tax: Paying GST when buying a laptop.'],
        relatedForms: ['PAN Application', 'TAN Application'],
        filingProcedure: ['First-time taxpayers must apply for a Permanent Account Number (PAN) via the NSDL/UTIITL portal before they can file any taxes.'],
        relatedItems: ['Old vs New Tax Regime', 'GST Basics'],
        relatedCalculators: ['income-tax-calculator'],
        tags: ['basics', 'direct tax', 'indirect tax', 'pan'],
        financialYear: '2024-25',
        assessmentYear: '2025-26',
        reviewStatus: ReviewStatus.DRAFT,
        slug: 'introduction-to-indian-taxation',
        faqs: {
          create: [
            { question: 'What is the difference between Direct and Indirect Tax?', answer: 'Direct tax is paid directly by you to the government (e.g., Income Tax). Indirect tax is collected by an intermediary (like a shopkeeper) who then pays it to the government (e.g., GST).' }
          ]
        }
      }
    });

    // BUSINESS_TAX Category (Freelancer)
    await prisma.taxKnowledgeItem.create({
      data: {
        category: 'BUSINESS_TAX',
        actName: 'Income Tax Act, 1961',
        sectionNumber: '44ADA',
        title: 'Presumptive Taxation for Freelancers (Section 44ADA)',
        summary: 'How freelancers and professionals can claim 50% of their gross receipts as profit and save taxes.',
        explanation: 'Section 44ADA offers a simplified presumptive taxation scheme for specified professionals, including freelancers, consultants, doctors, and lawyers. Under this scheme, if your gross receipts for the financial year are less than ₹75 Lakhs (updated limit), you can declare 50% of your total receipts as your profit. You do not need to maintain detailed books of accounts or get them audited. You pay tax only on this 50% declared profit according to your applicable slab rate.',
        applicability: ['Freelancers', 'IT Professionals', 'Consultants', 'Doctors', 'Lawyers'],
        benefitsOrDeductions: ['Declare only 50% of gross receipts as profit.', 'Exempt from maintaining detailed books of accounts (Section 44AA).'],
        restrictions: ['Gross receipts must not exceed ₹75 Lakhs in a financial year.', 'Not applicable to all businesses (only specified professions).'],
        examples: ['If a freelance software developer earns ₹40 Lakhs in a year, they can declare ₹20 Lakhs as profit and pay tax on that amount.'],
        relatedForms: ['ITR-4 (Sugam)'],
        filingProcedure: ['Select ITR-4 while filing returns. Fill the details under "Income from Business or Profession" and specify the business code for your profession.'],
        relatedItems: ['Section 80C Deductions'],
        relatedCalculators: ['income-tax-calculator'],
        tags: ['freelancer', '44ada', 'presumptive taxation', 'professionals'],
        financialYear: '2024-25',
        assessmentYear: '2025-26',
        reviewStatus: ReviewStatus.DRAFT,
        slug: 'presumptive-taxation-freelancers-44ada',
        faqs: {
          create: [
            { question: 'Do I need to show expenses if I use Section 44ADA?', answer: 'No. The 50% flat deduction is assumed to cover all your professional expenses like internet, rent, and laptop depreciation. You cannot claim additional expenses.' }
          ]
        }
      }
    });

    return NextResponse.json({ success: true, message: 'Seeded missing categories successfully as DRAFTS. Please go to the Admin Panel to approve them.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
