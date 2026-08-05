import type { JobResult } from "@/types/job";

const MOCK_JOBS: JobResult[] = [
  {
    id: "mock-1",
    title: "Data Analyst",
    company: "Northgate Analytics",
    location: "Toronto, ON",
    salaryMin: 65000,
    salaryMax: 80000,
    description:
      "Join our analytics team to turn messy datasets into decisions. You'll build dashboards in Power BI, write SQL against our warehouse, and partner with stakeholders across the business.",
    applyUrl: "https://example.com/jobs/mock-1",
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  },
  {
    id: "mock-2",
    title: "Business Analyst",
    company: "Harbourfront Consulting",
    location: "Toronto, ON",
    salaryMin: 70000,
    salaryMax: 90000,
    description:
      "Work with cross-functional teams to gather requirements, model processes, and translate business needs into technical specifications for our product team.",
    applyUrl: "https://example.com/jobs/mock-2",
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "mock-3",
    title: "BI Developer",
    company: "Lakeshore Financial Group",
    location: "Toronto, ON",
    salaryMin: 75000,
    salaryMax: 95000,
    description:
      "Design and maintain scalable BI pipelines and semantic models. Advanced SQL and DAX required; Python is a plus.",
    applyUrl: "https://example.com/jobs/mock-3",
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: "mock-4",
    title: "Reporting Analyst",
    company: "BC Housing",
    location: "Toronto, ON",
    salaryMin: 60000,
    salaryMax: 72000,
    description:
      "Produce recurring operational reports and ad hoc analysis for housing program stakeholders. Strong Excel and SQL skills expected.",
    applyUrl: "https://example.com/jobs/mock-4",
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
  },
  {
    id: "mock-5",
    title: "Junior Data Analyst",
    company: "Maple Retail Co.",
    location: "Waterloo, ON",
    salaryMin: 55000,
    salaryMax: 65000,
    description:
      "Entry-level role analyzing retail sales trends and customer behaviour. Great opportunity to grow SQL and Python skills on real datasets.",
    applyUrl: "https://example.com/jobs/mock-5",
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "mock-6",
    title: "Data Analyst, Marketing",
    company: "Beacon Digital",
    location: "Remote (Canada)",
    salaryMin: 68000,
    salaryMax: 85000,
    description:
      "Analyze campaign performance across channels, build attribution models, and present insights to the marketing leadership team.",
    applyUrl: "https://example.com/jobs/mock-6",
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
  },
  {
    id: "mock-7",
    title: "Product Analyst",
    company: "Crestline Software",
    location: "Toronto, ON",
    salaryMin: 72000,
    salaryMax: 88000,
    description:
      "Partner with product managers to define metrics, run experiments, and analyze user behaviour to guide the product roadmap.",
    applyUrl: "https://example.com/jobs/mock-7",
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: "mock-8",
    title: "Financial Data Analyst",
    company: "Union Capital Partners",
    location: "Toronto, ON",
    salaryMin: 70000,
    salaryMax: 92000,
    description:
      "Support the finance team with forecasting models, variance analysis, and automated reporting using SQL, Python, and Excel.",
    applyUrl: "https://example.com/jobs/mock-8",
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
  },
];

export function filterMockJobs(params: {
  where: string;
  what: string;
  whatOr?: string;
}): JobResult[] {
  const where = params.where.trim().toLowerCase();
  const terms = [params.what, params.whatOr]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  return MOCK_JOBS.filter((job) => {
    const haystack = `${job.title} ${job.company} ${job.description}`.toLowerCase();
    const matchesWhere = where.length === 0 || job.location.toLowerCase().includes(where);
    const matchesWhat = terms.length === 0 || terms.some((term) => haystack.includes(term));
    return matchesWhere && matchesWhat;
  });
}
