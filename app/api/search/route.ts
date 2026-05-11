import { NextResponse } from "next/server";

import { searchTaxKnowledge } from "@/lib/search";

export async function GET() {
  return NextResponse.json({
    results: searchTaxKnowledge({ query: "" }),
    status: "not-ready",
    message: "Search is scaffolded and will be implemented in Phase 6."
  });
}
