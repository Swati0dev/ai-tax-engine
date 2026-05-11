import { prisma } from "@/lib/db";
import { TaxCategory } from "@prisma/client";

export async function searchTaxKnowledge(query: string, category?: TaxCategory) {
  if (!query || query.length < 2) return [];

  try {
    const items = await prisma.taxKnowledgeItem.findMany({
      where: {
        AND: [
          category ? { category } : {},
          {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { summary: { contains: query, mode: "insensitive" } },
              { explanation: { contains: query, mode: "insensitive" } },
              { actName: { contains: query, mode: "insensitive" } },
              { sectionNumber: { contains: query, mode: "insensitive" } },
            ],
          },
        ],
      },
      include: {
        sourceReferences: true,
      },
      take: 10,
    });

    return items;
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}
