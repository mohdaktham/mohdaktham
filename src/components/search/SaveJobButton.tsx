"use client";

import { useState } from "react";
import { CheckIcon, LoaderIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { JobResult } from "@/types/job";

interface SaveJobButtonProps {
  job: JobResult;
  saved: boolean;
  onSaved: (externalId: string) => void;
}

export function SaveJobButton({ job, saved, onSaved }: SaveJobButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    try {
      const res = await fetch("/api/tracker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "adzuna",
          externalId: job.id,
          title: job.title,
          company: job.company,
          location: job.location,
          salaryMin: job.salaryMin ?? null,
          salaryMax: job.salaryMax ?? null,
          description: job.description,
          applyUrl: job.applyUrl,
          postedAt: job.postedAt,
        }),
      });

      if (!res.ok) throw new Error("Save failed");

      onSaved(job.id);
      toast.success("Saved to tracker");
    } catch {
      toast.error("Couldn't save this job. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (saved) {
    return (
      <Button variant="secondary" size="sm" disabled>
        <CheckIcon />
        Saved
      </Button>
    );
  }

  return (
    <Button variant="outline" size="sm" onClick={handleSave} disabled={loading}>
      {loading ? <LoaderIcon className="animate-spin" /> : <PlusIcon />}
      Save
    </Button>
  );
}
