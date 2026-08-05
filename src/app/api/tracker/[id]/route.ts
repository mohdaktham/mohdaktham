import { Stage } from "@prisma/client";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { updateApplicationSchema } from "@/lib/validation";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = updateApplicationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { stage, notes, appliedDate } = parsed.data;

  const existing = await prisma.application.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const autoAppliedDate =
    stage === Stage.SUBMITTED && !existing.appliedDate && appliedDate === undefined
      ? new Date()
      : undefined;

  const updated = await prisma.application.update({
    where: { id },
    data: {
      ...(stage !== undefined ? { stage } : {}),
      ...(notes !== undefined ? { notes } : {}),
      ...(appliedDate !== undefined
        ? { appliedDate: appliedDate ? new Date(appliedDate) : null }
        : {}),
      ...(autoAppliedDate ? { appliedDate: autoAppliedDate } : {}),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const existing = await prisma.application.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.application.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
