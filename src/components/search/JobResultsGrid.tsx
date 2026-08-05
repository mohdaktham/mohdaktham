import { AlertTriangleIcon, SearchXIcon } from "lucide-react";

import { JobCard } from "@/components/search/JobCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { JobResult } from "@/types/job";

interface JobResultsGridProps {
  jobs: JobResult[];
  loading: boolean;
  error: string | null;
  hasSearched: boolean;
  savedIds: Set<string>;
  onSaved: (externalId: string) => void;
  onRetry: () => void;
}

export function JobResultsGrid({
  jobs,
  loading,
  error,
  hasSearched,
  savedIds,
  onSaved,
  onRetry,
}: JobResultsGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-56 rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState icon={AlertTriangleIcon} title="Search failed" description={error} >
        <Button onClick={onRetry} variant="outline" size="sm" className="mt-3">
          Retry
        </Button>
      </EmptyState>
    );
  }

  if (!hasSearched) {
    return (
      <EmptyState
        icon={SearchXIcon}
        title="Search for jobs to get started"
        description="Set a location and job title above, then hit Search."
      />
    );
  }

  if (jobs.length === 0) {
    return (
      <EmptyState
        icon={SearchXIcon}
        title="No jobs found"
        description="Try a broader location or different keywords."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} saved={savedIds.has(job.id)} onSaved={onSaved} />
      ))}
    </div>
  );
}
