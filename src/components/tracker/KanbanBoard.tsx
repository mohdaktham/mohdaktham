"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { toast } from "sonner";
import type { Application, Stage } from "@prisma/client";

import { KanbanColumn } from "@/components/tracker/KanbanColumn";
import { EmptyState } from "@/components/shared/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { STAGE_ORDER } from "@/lib/stages";
import { BriefcaseIcon } from "lucide-react";

interface KanbanBoardProps {
  initialApplications: Application[];
}

export function KanbanBoard({ initialApplications }: KanbanBoardProps) {
  const [applications, setApplications] = useState(initialApplications);

  // dnd-kit assigns each draggable a sequential accessibility id (aria-describedby)
  // from a module-level counter that isn't synchronized between the server render
  // and the client's first render, causing a hydration mismatch. Deferring the
  // DnD tree to a client-only mount avoids diffing against server-rendered ids.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard client-only-mount gate, not a cascading update
    setMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor)
  );

  async function handleStageChange(id: string, stage: Stage) {
    const previous = applications;
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, stage } : a)));

    try {
      const res = await fetch(`/api/tracker/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage }),
      });
      if (!res.ok) throw new Error();
      const updated: Application = await res.json();
      setApplications((prev) => prev.map((a) => (a.id === id ? updated : a)));
    } catch {
      setApplications(previous);
      toast.error("Couldn't update stage. Try again.");
    }
  }

  function handleUpdated(updated: Application) {
    setApplications((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
  }

  function handleRemoved(id: string) {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    const targetStage = over.id as Stage;
    const application = applications.find((a) => a.id === active.id);
    if (application && application.stage !== targetStage) {
      handleStageChange(application.id, targetStage);
    }
  }

  if (applications.length === 0) {
    return (
      <EmptyState
        icon={BriefcaseIcon}
        title="No tracked jobs yet"
        description="Save jobs from the Search page to start tracking them here."
      />
    );
  }

  if (!mounted) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-2">
        {STAGE_ORDER.map((stage) => (
          <Skeleton key={stage} className="h-96 w-72 shrink-0 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {STAGE_ORDER.map((stage) => (
          <KanbanColumn
            key={stage}
            stage={stage}
            applications={applications.filter((a) => a.stage === stage)}
            onStageChange={handleStageChange}
            onUpdated={handleUpdated}
            onRemoved={handleRemoved}
          />
        ))}
      </div>
    </DndContext>
  );
}
