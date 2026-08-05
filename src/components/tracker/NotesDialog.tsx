"use client";

import { useState } from "react";
import { NotebookPenIcon } from "lucide-react";
import { toast } from "sonner";
import type { Application } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface NotesDialogProps {
  application: Application;
  onUpdated: (application: Application) => void;
}

function toDateInputValue(date: Date | string | null) {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
}

export function NotesDialog({ application, onUpdated }: NotesDialogProps) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(application.notes ?? "");
  const [appliedDate, setAppliedDate] = useState(toDateInputValue(application.appliedDate));
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`/api/tracker/${application.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          notes: notes.trim() === "" ? null : notes,
          appliedDate: appliedDate ? new Date(appliedDate).toISOString() : null,
        }),
      });
      if (!res.ok) throw new Error();
      const updated: Application = await res.json();
      onUpdated(updated);
      toast.success("Notes saved");
      setOpen(false);
    } catch {
      toast.error("Couldn't save notes. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="size-7">
          <NotebookPenIcon className="size-3.5" />
          <span className="sr-only">Edit notes</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{application.title}</DialogTitle>
          <DialogDescription>{application.company}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="applied-date">Applied date</Label>
            <Input
              id="applied-date"
              type="date"
              value={appliedDate}
              onChange={(e) => setAppliedDate(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              rows={5}
              placeholder="Recruiter contact, interview prep, follow-ups…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
