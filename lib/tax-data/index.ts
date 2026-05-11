import { getKnowledgeItems } from "@/actions/tax";

export async function getTaxKnowledgeItems() {
  const result = await getKnowledgeItems();
  return result.success ? result.data : [];
}
