import { filterMockJobs } from "@/lib/mockJobs";
import type { JobResult, JobSearchResponse } from "@/types/job";

export interface AdzunaSearchParams {
  where: string;
  what: string;
  whatOr?: string;
  page?: number;
}

interface AdzunaApiResult {
  id: string | number;
  title: string;
  company?: { display_name?: string };
  location?: { display_name?: string };
  salary_min?: number;
  salary_max?: number;
  description?: string;
  redirect_url: string;
  created?: string;
}

function mapAdzunaResult(r: AdzunaApiResult): JobResult {
  return {
    id: String(r.id),
    title: r.title,
    company: r.company?.display_name ?? "Unknown company",
    location: r.location?.display_name ?? "Unknown location",
    salaryMin: r.salary_min ? Math.round(r.salary_min) : undefined,
    salaryMax: r.salary_max ? Math.round(r.salary_max) : undefined,
    description: r.description ?? "",
    applyUrl: r.redirect_url,
    postedAt: r.created ?? null,
  };
}

export async function searchJobs(params: AdzunaSearchParams): Promise<JobSearchResponse> {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  if (!appId || !appKey) {
    const jobs = filterMockJobs(params);
    return { jobs, demoMode: true, count: jobs.length };
  }

  const page = params.page ?? 1;
  const url = new URL(`https://api.adzuna.com/v1/api/jobs/ca/search/${page}`);
  url.searchParams.set("app_id", appId);
  url.searchParams.set("app_key", appKey);
  url.searchParams.set("results_per_page", "20");
  url.searchParams.set("what", params.what);
  if (params.whatOr) url.searchParams.set("what_or", params.whatOr);
  url.searchParams.set("where", params.where);
  url.searchParams.set("content-type", "application/json");
  url.searchParams.set("sort_by", "date");

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Adzuna request failed (${res.status}): ${body}`);
  }

  const data = (await res.json()) as { results?: AdzunaApiResult[]; count?: number };
  const jobs = (data.results ?? []).map(mapAdzunaResult);
  return { jobs, demoMode: false, count: data.count ?? jobs.length };
}
