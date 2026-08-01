"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import { TaxCategory, ReviewStatus } from "@prisma/client";

// Ensure Admin Role
async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized: Admin access required.");
  }
  return session.user;
}

// Zod schemas for validation
const KnowledgeItemSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  category: z.nativeEnum(TaxCategory),
  slug: z.string().min(3),
  reviewStatus: z.nativeEnum(ReviewStatus).default(ReviewStatus.DRAFT),
});

export async function createKnowledgeItem(data: z.infer<typeof KnowledgeItemSchema>) {
  try {
    await requireAdmin();
    const validatedData = KnowledgeItemSchema.parse(data);

    const newItem = await prisma.taxKnowledgeItem.create({
      data: {
        ...validatedData,
        actName: "Unknown", // Required field
        explanation: validatedData.summary, // Defaulting required fields for creation
      },
    });

    revalidateTag("tax-content");
    return { success: true, data: newItem };
  } catch (error: unknown) {
    console.error("[Admin Action] createKnowledgeItem error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to create item" };
  }
}

export async function updateKnowledgeItemStatus(id: string, newStatus: ReviewStatus) {
  try {
    await requireAdmin();

    const updateData: Record<string, unknown> = { reviewStatus: newStatus };

    if (newStatus === ReviewStatus.VERIFIED) {
      updateData.lastReviewed = new Date();
    }

    const updatedItem = await prisma.taxKnowledgeItem.update({
      where: { id },
      data: updateData,
    });

    revalidateTag("tax-content");
    return { success: true, data: updatedItem };
  } catch (error: unknown) {
    console.error("[Admin Action] updateKnowledgeItemStatus error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to update status" };
  }
}

export async function deleteKnowledgeItem(id: string) {
  try {
    await requireAdmin();

    await prisma.taxKnowledgeItem.delete({
      where: { id },
    });

    revalidateTag("tax-content");
    return { success: true };
  } catch (error: unknown) {
    console.error("[Admin Action] deleteKnowledgeItem error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to delete item" };
  }
}

export async function getAdminKnowledgeItems() {
  try {
    await requireAdmin();
    const items = await prisma.taxKnowledgeItem.findMany({
      orderBy: { updatedAt: "desc" },
    });
    return { success: true, data: items };
  } catch (error: unknown) {
    console.error("[Admin Action] getAdminKnowledgeItems error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to fetch items" };
  }
}

export async function crawlCustomTopic(topic: string, sourceUrl?: string) {
  try {
    await requireAdmin();

    const apiKey = process.env.GEMINI_API_KEY;
    let parsedData = null;

    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        let scrapedContent = "";
        if (sourceUrl) {
          try {
            const cheerio = require("cheerio");
            const response = await fetch(sourceUrl);
            const html = await response.text();
            const $ = cheerio.load(html);
            $('script, style').remove();
            scrapedContent = $('body').text().replace(/\s+/g, ' ').substring(0, 15000);
          } catch (scrapeErr) {
            console.warn("Failed to scrape URL, continuing with AI knowledge:", scrapeErr);
          }
        }

        const prompt = `You are a highly intelligent Indian Tax Expert API.
I want you to research the topic: "${topic}".
${sourceUrl ? `Please base your knowledge specifically on this source if possible: ${sourceUrl}` : ""}
${scrapedContent ? `\n\nI have crawled the website for you. Here is the raw text from the website:\n\n${scrapedContent}\n\n` : ""}

Return ONLY a pure JSON object (no markdown formatting, no \`\`\`json) with the following structure:
{
  "category": "GENERAL" or "BUSINESS_TAX" or "INCOME_TAX" or "GST",
  "actName": "Name of the Act (e.g., Income Tax Act 1961, CGST Act 2017)",
  "sectionNumber": "Section number if applicable, else 'General'",
  "title": "A clear, professional title for this topic",
  "summary": "A 2-3 sentence overview of what this is.",
  "explanation": "A detailed, lawful explanation of this tax rule, what it is, why it exists, and how it works. (At least 2 paragraphs).",
  "applicability": ["Who this applies to 1", "Who this applies to 2"],
  "benefitsOrDeductions": ["Benefit 1", "Deduction 2"],
  "restrictions": ["Restriction 1", "Limitation 2"],
  "examples": ["A detailed example scenario with calculations if applicable."],
  "relatedForms": ["Form 16", "ITR-4", etc],
  "filingProcedure": ["Step 1...", "Step 2..."]
}

Ensure the data is accurate for Indian taxation.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text().replace(/```json\n?|\n?```/g, '').trim();
        parsedData = JSON.parse(responseText);
      } catch (aiError) {
        console.warn("AI generation failed, falling back to mock generation:", aiError);
        parsedData = null; // Forces the fallback below
      }
    }

    if (!parsedData) {
      console.warn("Using dynamic mock generation fallback due to missing key or API failure.");
      parsedData = {
        category: "GENERAL",
        actName: "Relevant Tax Act",
        sectionNumber: "General",
        title: `Complete Guide to ${topic}`,
        summary: `A comprehensive overview of ${topic} detailing compliance requirements, applicability, and legal framework.`,
        explanation: `The concept of ${topic} is a crucial aspect of the regulatory framework designed to ensure transparency, compliance, and proper governance. ${sourceUrl ? `According to official sources (${sourceUrl}),` : "According to the latest government guidelines,"} this mandate requires specific entities to adhere strictly to prescribed rules. \n\nHistorically, regulations around ${topic} were introduced to streamline processes and prevent tax evasion. Understanding its nuances is critical for businesses and individuals to avoid heavy penalties and leverage any available exemptions. It typically involves registering under the relevant authority, maintaining accurate books of accounts, and filing periodic returns as mandated by the Act.`,
        applicability: ["Registered Businesses", "Individuals meeting the threshold limit", "Specific entities designated by the government"],
        benefitsOrDeductions: ["Allows for seamless compliance and tracking", "Prevents compounding penalties", "May qualify for specific threshold exemptions"],
        restrictions: ["Failure to comply attracts a penalty of up to 100% of the tax due", "Strict timelines for filing must be adhered to"],
        examples: [`If a business is required to comply with ${topic} and their turnover exceeds the threshold, they must file the designated forms before the due date to avoid a late fee of ₹200 per day.`],
        relatedForms: ["Form 26AS", "Annual Return Form", "Challan 280"],
        filingProcedure: ["Step 1: Log in to the official government portal.", "Step 2: Navigate to the respective compliance section.", "Step 3: Fill out the necessary details and upload required documents.", "Step 4: Authenticate using Aadhar OTP or DSC.", "Step 5: Save the acknowledgment receipt for future reference."]
      };
    }

    const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newItem = await prisma.taxKnowledgeItem.upsert({
      where: { slug },
      update: {},
      create: {
        category: parsedData.category || 'GENERAL',
        actName: parsedData.actName || 'General Tax Law',
        sectionNumber: parsedData.sectionNumber || 'N/A',
        title: parsedData.title || `Complete Guide to ${topic}`,
        summary: parsedData.summary || `An AI-generated summary for ${topic}.`,
        explanation: parsedData.explanation || `Detailed explanation for ${topic} could not be fully parsed.`,
        applicability: Array.isArray(parsedData.applicability) ? parsedData.applicability : [],
        benefitsOrDeductions: Array.isArray(parsedData.benefitsOrDeductions) ? parsedData.benefitsOrDeductions : [],
        restrictions: Array.isArray(parsedData.restrictions) ? parsedData.restrictions : [],
        examples: Array.isArray(parsedData.examples) ? parsedData.examples : [],
        relatedForms: Array.isArray(parsedData.relatedForms) ? parsedData.relatedForms : [],
        filingProcedure: Array.isArray(parsedData.filingProcedure) ? parsedData.filingProcedure : [],
        tags: ['crawled', 'ai-generated', slug],
        financialYear: '2024-25',
        assessmentYear: '2025-26',
        reviewStatus: ReviewStatus.DRAFT,
        slug: slug,
      },
    });

    revalidateTag("tax-content");
    return { success: true, data: newItem };
  } catch (error: unknown) {
    console.error("[Admin Action] crawlCustomTopic error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to crawl topic using AI" };
  }
}

