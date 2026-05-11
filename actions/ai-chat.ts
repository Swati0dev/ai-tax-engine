"use server";

import { prisma } from "@/lib/db";
import { ReviewStatus } from "@prisma/client";

const EVASION_KEYWORDS = [
  "hide income", "black money", "evade tax", "avoid tax illegally", 
  "tax fraud", "fake bill", "cash without bill", "bypass gst",
  "money laundering", "shell company"
];

const DISCLAIMER = "\n\n---\n*Disclaimer: I provide information for guidance only. For specific compliance or legal advice, please consult a Chartered Accountant.*";

export async function processAIChat(query: string) {
  const normalizedQuery = query.toLowerCase();
  
  // 1. Safety Guardrail
  if (EVASION_KEYWORDS.some(keyword => normalizedQuery.includes(keyword))) {
    return {
      success: true,
      data: {
        role: "assistant",
        content: "I cannot assist with requests related to tax evasion, fraud, or illegal financial activities. My purpose is to provide information on lawful tax compliance and source-grounded guidance in accordance with Indian tax laws. I recommend consulting a certified tax professional for legal tax planning.",
        sources: []
      }
    };
  }

  if (!query || query.length < 3) {
    return { 
      success: false, 
      error: "Please enter a more specific question (at least 3 characters)." 
    };
  }

  try {
    // 1. Retrieval Step (Grounding)
    // We search for the most relevant records in our DB
    const groundedDocs = await prisma.taxKnowledgeItem.findMany({
      where: {
        reviewStatus: ReviewStatus.VERIFIED,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { summary: { contains: query, mode: "insensitive" } },
          { explanation: { contains: query, mode: "insensitive" } },
          { sectionNumber: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        sourceReferences: true,
      },
      take: 2, // Take top 2 for context
    });

    // 2. Formatting Step (In Phase 6, we simulate AI but ground it in REAL data)
    if (groundedDocs.length === 0) {
      return {
        success: true,
        data: {
          role: "assistant",
          content: "I couldn't find a specific tax section in our verified database that matches your query. However, I can help you with Income Tax Section 80C or GST Scope of Supply if you'd like to explore those.",
          sources: []
        }
      };
    }

    const primaryDoc = groundedDocs[0];
    const sourceLinks = primaryDoc.sourceReferences.map(ref => ({
      title: ref.title,
      url: ref.url
    }));

    // Formulate a "Grounded" response
    let response = `Based on our verified tax records for **${primaryDoc.title}** (${primaryDoc.sectionNumber || primaryDoc.actName}):\n\n`;
    response += `${primaryDoc.summary}\n\n`;
    
    if (primaryDoc.benefitsOrDeductions.length > 0) {
      response += `**Key Benefits:**\n`;
      primaryDoc.benefitsOrDeductions.slice(0, 3).forEach(benefit => {
        response += `- ${benefit}\n`;
      });
    }

    response += `\nFor a full breakdown, you can view the [Detail Page](${primaryDoc.category === "DIRECT_TAX" ? "/direct-tax" : "/indirect-tax"}/${primaryDoc.id}).`;

    return {
      success: true,
      data: {
        role: "assistant",
        content: response + DISCLAIMER,
        sources: sourceLinks
      }
    };

  } catch (error) {
    return { success: false, error: "I encountered an error while processing your request." };
  }
}
