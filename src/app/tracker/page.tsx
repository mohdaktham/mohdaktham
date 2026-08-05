import type { Metadata } from "next";

import { KanbanBoard } from "@/components/tracker/KanbanBoard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tracker · Job Tracker",
};

export default async function TrackerPage() {
  const applications = await prisma.application.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6">
      <div>
        <h1 className="text-lg font-semibold">Application Tracker</h1>
        <p className="text-sm text-muted-foreground">
          Drag a card between columns, or use the dropdown, to update its stage.
        </p>
      </div>
      <KanbanBoard initialApplications={applications} />
    </div>
  );
}
