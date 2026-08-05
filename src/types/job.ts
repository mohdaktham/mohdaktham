export interface JobResult {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  description: string;
  applyUrl: string;
  postedAt: string | null;
}

export interface JobSearchResponse {
  jobs: JobResult[];
  demoMode: boolean;
  count: number;
}
