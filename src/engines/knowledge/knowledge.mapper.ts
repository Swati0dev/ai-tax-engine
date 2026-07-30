import { TaxKnowledgeItem } from "@prisma/client";
import { KnowledgeRecommendationViewModel } from "./knowledge.types";

type KnowledgeItemSubset = Pick<TaxKnowledgeItem, 'id' | 'slug' | 'title' | 'category' | 'summary' | 'explanation'>;

export function toKnowledgeRecommendationViewModel(item: KnowledgeItemSubset): KnowledgeRecommendationViewModel {
  // Simple word count to estimate read time. Assume 200 words per minute.
  const wordCount = (item.explanation + item.summary).split(/\s+/).length;
  const readTimeMins = Math.max(1, Math.ceil(wordCount / 200));

  let categoryStr = "Tax Article";
  switch (item.category) {
    case "DIRECT_TAX": categoryStr = "Direct Tax"; break;
    case "INDIRECT_TAX": categoryStr = "Indirect Tax"; break;
  }

  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    category: categoryStr,
    summary: item.summary,
    readTime: `${readTimeMins} min read`,
  };
}

export function toKnowledgeRecommendationViewModels(items: KnowledgeItemSubset[]): KnowledgeRecommendationViewModel[] {
  return items.map(toKnowledgeRecommendationViewModel);
}
