import { getAdminKnowledgeItems } from "@/actions/admin";
import { KnowledgeCMSClient } from "@/components/admin/KnowledgeCMSClient";

export default async function KnowledgeCMSPage() {
  const result = await getAdminKnowledgeItems();
  
  if (!result.success || !result.data) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <p className="text-red-500 font-medium">Failed to load CMS data: {result.error}</p>
      </div>
    );
  }

  return <KnowledgeCMSClient initialItems={result.data} />;
}
