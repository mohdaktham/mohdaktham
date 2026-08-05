import { formatDistanceToNow } from "date-fns";
import { ExternalLinkIcon, MapPinIcon } from "lucide-react";

import { SaveJobButton } from "@/components/search/SaveJobButton";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatSalary } from "@/lib/utils";
import type { JobResult } from "@/types/job";

interface JobCardProps {
  job: JobResult;
  saved: boolean;
  onSaved: (externalId: string) => void;
}

export function JobCard({ job, saved, onSaved }: JobCardProps) {
  const salary = formatSalary(job.salaryMin, job.salaryMax);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">{job.title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPinIcon className="size-3.5 shrink-0" />
          {job.company} · {job.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {salary && <Badge variant="success">{salary}</Badge>}
          {job.postedAt && (
            <span className="text-xs text-muted-foreground">
              Posted {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
            </span>
          )}
        </div>
        <p className="line-clamp-3 text-sm text-muted-foreground">{job.description}</p>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="default" size="sm" asChild>
          <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
            View & Apply
            <ExternalLinkIcon />
          </a>
        </Button>
        <SaveJobButton job={job} saved={saved} onSaved={onSaved} />
      </CardFooter>
    </Card>
  );
}
