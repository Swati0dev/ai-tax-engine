import { prisma } from "@/lib/db";
import { TaxCategory, ReviewStatus } from "@prisma/client";
import { logger } from "@/lib/logger";

export async function searchTaxKnowledge(query: string, category?: TaxCategory) {
  const cleanQuery = query.trim();
  if (!cleanQuery || cleanQuery.length < 2) return [];

  const keywords = cleanQuery.split(/\s+/).filter(word => word.length > 2);
  
  try {
    const items = await prisma.taxKnowledgeItem.findMany({
      where: {
        reviewStatus: ReviewStatus.VERIFIED,
        AND: [
          category ? { category } : {},
          {
            OR: [
              // 1. Exact match on title or section (High priority)
              { title: { contains: cleanQuery, mode: "insensitive" as const } },
              { sectionNumber: { contains: cleanQuery, mode: "insensitive" as const } },
              
              // 2. Keyword matches (Fuzzy-like behavior)
              ...keywords.map(kw => ({
                OR: [
                  { title: { contains: kw, mode: "insensitive" as const } },
                  { summary: { contains: kw, mode: "insensitive" as const } },
                  { explanation: { contains: kw, mode: "insensitive" as const } },
                ]
              }))

            ],
          },
        ],
      },
      include: {
        sourceReferences: true,
      },
      take: 10,
    });

    logger.info("Search performed", { query: cleanQuery, resultsCount: items.length });
    return items;
  } catch (error) {
    logger.error("Search error", { error, query: cleanQuery });
    return [];
  }
}

