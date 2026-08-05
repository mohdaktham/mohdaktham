import { NextResponse } from "next/server";

import { searchJobs } from "@/lib/adzuna";
import { searchQuerySchema } from "@/lib/validation";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const parsed = searchQuerySchema.safeParse({
    where: searchParams.get("where"),
    what: searchParams.get("what"),
    whatOr: searchParams.get("whatOr") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const result = await searchJobs(parsed.data);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Live search failed. Please try again." },
      { status: 502 }
    );
  }
}
