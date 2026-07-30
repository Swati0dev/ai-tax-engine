import { prisma } from "@/lib/db";
import { KnowledgeRecommendationViewModel } from "./knowledge.types";
import { toKnowledgeRecommendationViewModels } from "./knowledge.mapper";

export async function getKnowledgeRecommendations(userId: string, limit: number = 3): Promise<KnowledgeRecommendationViewModel[]> {
  try {
    // For Version 1, we provide deterministic recommendations (e.g., latest published items).
    // In the future, this can be filtered by UserProfile (e.g., occupation, taxGoals, saved topics).
    const items = await prisma.taxKnowledgeItem.findMany({
      where: {
        reviewStatus: "VERIFIED"
      },
      orderBy: {
        updatedAt: "desc"
      },
      select: {
        id: true,
        title: true,
        summary: true,
        category: true,
        slug: true,
        explanation: true // Needed for word count in mapper
      },
      take: limit,
    });
    
    return toKnowledgeRecommendationViewModels(items);
  } catch (error) {
    console.error("[Knowledge Engine] Error fetching recommendations:", error);
    return [];
  }
}
