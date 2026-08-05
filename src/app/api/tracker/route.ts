import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { saveJobSchema } from "@/lib/validation";

export async function GET() {
  const applications = await prisma.application.findMany({
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(applications);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = saveJobSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { source, externalId, postedAt, ...rest } = parsed.data;

  const application = await prisma.application.upsert({
    where: { source_externalId: { source, externalId } },
    update: {},
    create: {
      source,
      externalId,
      postedAt: postedAt ? new Date(postedAt) : null,
      ...rest,
    },
  });

  return NextResponse.json(application, { status: 201 });
}
