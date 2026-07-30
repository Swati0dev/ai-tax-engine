"use server";

import { prisma } from "@/lib/db";
import { ReviewStatus } from "@prisma/client";
import { logger } from "@/lib/logger";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@/auth";
import { z } from "zod";

const QuerySchema = z.string().min(2, "Please enter a more specific question (at least 2 characters).").max(1000);

const EVASION_KEYWORDS = [
  "hide income", "black money", "evade tax", "avoid tax illegally", 
  "tax fraud", "fake bill", "cash without bill", "bypass gst",
  "money laundering", "shell company"
];

const DISCLAIMER = "\n\n---\n*Disclaimer: I provide information for guidance only. For specific compliance or legal advice, please consult a Chartered Accountant.*";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const systemInstruction = `
You are a smart, friendly, and expert AI Tax Assistant for Indian Income Tax and GST, operating in a modern web application.

CRITICAL INSTRUCTIONS FOR CONVERSATIONAL TONE AND LANGUAGE:
1. GREETING & CASUAL CONVERSATION:
   - If the user says hello, hi, greets you, or asks general conversational questions (e.g. "how are you", "kaise ho"), respond in a warm, welcoming, and friendly human-like manner. 
   - Ask them how you can help them today.
   - Example: "Hello! Kaise ho? Main aapki tax, ITR, ya GST related queries solve karne mein help kar sakta hoon. Aaj main aapki kya madad karoon?"

2. LANGUAGE MATCHING & DYNAMIC TONE:
   - Detect the language and style of the user's input and reply in the EXACT SAME LANGUAGE and style.
   - HINGLISH / WHATSAPP LANGUAGE: If the user writes in Hinglish (e.g., "mujhe batao 80c kya hai", "hello, kaise ho aap"), respond in natural Hinglish/WhatsApp script. Use simple, casual, friendly words. Do NOT use overly formal or robotic words. Keep it looking like a real helpful human is chatting on WhatsApp.
     - Example: "Haan bilkul! Section 80C ek tax-saving deduction hai..."
   - HINDI (Devanagari): If the user writes in Hindi characters (e.g., "नमस्ते, आप कैसे हैं?"), reply in warm Hindi using Devanagari script.
   - ENGLISH: If the user writes in English (e.g., "Hi, what is section 80C?"), reply in professional, friendly English.

3. KNOWLEDGE RETRIEVAL & ACCURACY (GROUNDING):
   - You are provided with a verified database context containing tax sections, rules, and filing procedures.
   - If the database context has information relevant to the query, rely heavily on it to provide accurate and legally compliant guidance.
   - If the database context does not contain the exact topic, use your pre-trained knowledge of Indian Tax Laws (Income Tax Act 1961, CGST Act 2017) to provide a helpful, correct answer, but maintain a polite tone and state that the details are for guidance.
   - If the user asks about specific forms, sections, deadlines, old vs new regimes, explain them clearly based on the context or standard rules.

4. FORMATTING & MARKDOWN:
   - Use clean markdown formatting (bolding, bullet points, headers) to make the text highly readable and beautiful in chat.
   - If referencing a verified database item, mention its section and act.
   - If a verified document was used, provide the link format: [Detail Page](/direct-tax/slug) or [Detail Page](/indirect-tax/slug) (fill slug based on the matching document in the context).

5. SAFETY GUARDRAILS:
   - Do NOT help with tax evasion, fraud, illegal bookkeeping, hiding black money, or fake billing. If the user asks about these, refuse politely and advise lawful tax planning.
`;

export async function processAIChat(query: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized. Please log in to use the AI Assistant." };
    }

    const validatedQuery = QuerySchema.parse(query);
    const normalizedQuery = validatedQuery.toLowerCase();
    
    // 1. Safety Guardrail
    if (EVASION_KEYWORDS.some(keyword => normalizedQuery.includes(keyword))) {
      logger.safety("Safety guardrail triggered", { query: validatedQuery });
      return {
        success: true,
        data: {
          role: "assistant",
          content: "I cannot assist with requests related to tax evasion, fraud, or illegal financial activities. My purpose is to provide information on lawful tax compliance and source-grounded guidance in accordance with Indian tax laws. I recommend consulting a certified tax professional for legal tax planning.",
          sources: []
        }
      };
    }
    // 2. Retrieval Step (Grounding)
    // Extract keywords to run a broader check
    const cleanKeywords = query
      .replace(/[^a-zA-Z0-9-]/g, " ")
      .split(/\s+/)
      .map(w => w.toUpperCase().trim())
      .filter(w => w.length > 1);

    const groundedDocs = await prisma.taxKnowledgeItem.findMany({
      where: {
        reviewStatus: ReviewStatus.VERIFIED,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { summary: { contains: query, mode: "insensitive" } },
          { explanation: { contains: query, mode: "insensitive" } },
          { sectionNumber: { contains: query, mode: "insensitive" } },
          ...(cleanKeywords.length > 0 ? [
            {
              relatedForms: {
                hasSome: cleanKeywords
              }
            }
          ] : [])
        ],
      },
      include: {
        sourceReferences: true,
      },
      take: 4, // Take top 4 documents for rich context
    });

    // 3. Construct Grounding Context
    let contextText = "";
    if (groundedDocs.length > 0) {
      contextText = "Grounded Verified Knowledge from Database:\n\n";
      groundedDocs.forEach((doc, index) => {
        contextText += `Document ${index + 1}:
Title: ${doc.title}
Section/Act: ${doc.sectionNumber || ""} (${doc.actName})
Slug: ${doc.slug}
Category: ${doc.category}
Summary: ${doc.summary}
Explanation: ${doc.explanation}
Applicability: ${doc.applicability.join(", ")}
Benefits/Deductions: ${doc.benefitsOrDeductions.join(", ")}
Restrictions: ${doc.restrictions.join(", ")}
Examples: ${doc.examples.join(", ")}
Related Forms: ${doc.relatedForms.join(", ")}
Filing Procedure: ${doc.filingProcedure.join(" -> ")}
Link Path: /${doc.category === "DIRECT_TAX" ? "direct-tax" : "indirect-tax"}/${doc.slug}
\n---\n`;
      });
    } else {
      contextText = "No direct matching document found in verified database. Answer using general Indian Tax Laws (Income Tax Act 1961, CGST Act 2017) knowledge.";
    }

    // 4. Initialize Gemini API and generate response
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemInstruction,
    });

    const promptText = `
Context:
${contextText}

User Query:
${query}

Please formulate a helpful, accurate response matching the user's language and style. Add formatting if needed.
`;

    const chatResult = await model.generateContent(promptText);
    const responseContent = chatResult.response.text().trim();

    // Compile source links
    const sourceLinks = groundedDocs.flatMap(doc => 
      doc.sourceReferences.map(ref => ({
        title: `${doc.sectionNumber || doc.title}: ${ref.title}`,
        url: ref.url
      }))
    );

    logger.info("AI Chat successful via Gemini", { query, resultsCount: groundedDocs.length });

    return {
      success: true,
      data: {
        role: "assistant",
        content: responseContent + DISCLAIMER,
        sources: sourceLinks.slice(0, 5) // Limit to top 5 sources
      }
    };

  } catch (error) {
    logger.error("AI Chat Error", { error, query });
    return { success: false, error: "I encountered an error while processing your request. Please try again." };
  }
}
