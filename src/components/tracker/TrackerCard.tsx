"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { formatDistanceToNow } from "date-fns";
import { ExternalLinkIcon, GripVerticalIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import type { Application, Stage } from "@prisma/client";

import { NotesDialog } from "@/components/tracker/NotesDialog";
import { StageSelect } from "@/components/tracker/StageSelect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatSalary, cn } from "@/lib/utils";

interface TrackerCardProps {
  application: Application;
  onStageChange: (id: string, stage: Stage) => void;
  onUpdated: (application: Application) => void;
  onRemoved: (id: string) => void;
}

export function TrackerCard({
  application,
  onStageChange,
  onUpdated,
  onRemoved,
}: TrackerCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: application.id,
  });

  const salary = formatSalary(application.salaryMin, application.salaryMax);

  async function handleRemove() {
    if (!window.confirm(`Remove "${application.title}" from your tracker?`)) return;
    try {
      const res = await fetch(`/api/tracker/${application.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      onRemoved(application.id);
    } catch {
      toast.error("Couldn't remove this job. Try again.");
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform) }}
      className={cn(
        "flex flex-col gap-2 rounded-lg border bg-card p-3 shadow-sm",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex items-start justify-between gap-1">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{application.title}</p>
          <p className="truncate text-xs text-muted-foreground">
            {application.company} · {application.location}
          </p>
        </div>
        <button
          type="button"
          aria-label="Drag to move"
          className="mt-0.5 shrink-0 cursor-grab touch-none text-muted-foreground active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVerticalIcon className="size-4" />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {salary && (
          <Badge variant="success" className="text-[10px]">
            {salary}
          </Badge>
        )}
        {application.appliedDate && (
          <span className="text-[11px] text-muted-foreground">
            Applied {formatDistanceToNow(new Date(application.appliedDate), { addSuffix: true })}
          </span>
        )}
      </div>

      <StageSelect
        value={application.stage}
        onChange={(stage) => onStageChange(application.id, stage)}
      />

      <div className="flex items-center justify-between pt-1">
        <Button variant="ghost" size="icon" className="size-7" asChild>
          <a href={application.applyUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLinkIcon className="size-3.5" />
            <span className="sr-only">Open application</span>
          </a>
        </Button>
        <NotesDialog application={application} onUpdated={onUpdated} />
        <Button variant="ghost" size="icon" className="size-7" onClick={handleRemove}>
          <Trash2Icon className="size-3.5" />
          <span className="sr-only">Remove</span>
        </Button>
      </div>
    </div>
  );
}
