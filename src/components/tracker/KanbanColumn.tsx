"use client";

import { useDroppable } from "@dnd-kit/core";
import type { Application, Stage } from "@prisma/client";

import { TrackerCard } from "@/components/tracker/TrackerCard";
import { STAGE_LABELS } from "@/lib/stages";
import { cn } from "@/lib/utils";

interface KanbanColumnProps {
  stage: Stage;
  applications: Application[];
  onStageChange: (id: string, stage: Stage) => void;
  onUpdated: (application: Application) => void;
  onRemoved: (id: string) => void;
}

export function KanbanColumn({
  stage,
  applications,
  onStageChange,
  onUpdated,
  onRemoved,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });

  return (
    <div className="flex w-72 shrink-0 flex-col rounded-xl border bg-muted/30">
      <div className="flex items-center justify-between border-b px-3 py-2.5">
        <span className="text-sm font-semibold">{STAGE_LABELS[stage]}</span>
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
          {applications.length}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          "flex min-h-24 flex-1 flex-col gap-2 overflow-y-auto p-2 transition-colors",
          isOver && "bg-accent/60"
        )}
      >
        {applications.map((application) => (
          <TrackerCard
            key={application.id}
            application={application}
            onStageChange={onStageChange}
            onUpdated={onUpdated}
            onRemoved={onRemoved}
          />
        ))}
      </div>
    </div>
  );
}
