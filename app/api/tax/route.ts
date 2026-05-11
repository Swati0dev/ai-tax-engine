import { NextResponse } from "next/server";
import { getKnowledgeItems } from "@/actions/tax";
import { TaxCategory } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryStr = searchParams.get("category");
  
  let category: TaxCategory | undefined;
  if (categoryStr === "DIRECT_TAX") category = TaxCategory.DIRECT_TAX;
  if (categoryStr === "INDIRECT_TAX") category = TaxCategory.INDIRECT_TAX;

  const result = await getKnowledgeItems(category);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json(result.data);
}
