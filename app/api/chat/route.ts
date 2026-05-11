import { NextResponse } from "next/server";

import { createUnavailableChatResponse } from "@/lib/chat";

export async function POST() {
  return NextResponse.json(
    {
      response: createUnavailableChatResponse(),
      status: "not-ready"
    },
    { status: 501 }
  );
}
