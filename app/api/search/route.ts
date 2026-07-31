import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ReviewStatus } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  if (!query) {
    return NextResponse.json({ results: [], status: "success" });
  }

  try {
    const items = await prisma.taxKnowledgeItem.findMany({
      where: {
        reviewStatus: ReviewStatus.VERIFIED,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { summary: { contains: query, mode: "insensitive" } },
          { explanation: { contains: query, mode: "insensitive" } },
          { tags: { has: query.toLowerCase() } }
        ]
      },
      take: 10,
    });

    return NextResponse.json({
      results: items,
      status: "success"
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Failed to search" }, { status: 500 });
  }
}
