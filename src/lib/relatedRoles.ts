const RELATED_ROLES: Record<string, string[]> = {
  "data analyst": ["business analyst", "reporting analyst", "bi analyst", "data associate"],
  "business analyst": ["data analyst", "systems analyst", "product analyst"],
  "bi analyst": ["data analyst", "business intelligence developer", "reporting analyst"],
  "data scientist": ["machine learning engineer", "data analyst", "applied scientist"],
  "software engineer": ["software developer", "backend developer", "full stack developer"],
  "frontend developer": ["front end engineer", "ui developer", "react developer"],
  "backend developer": ["backend engineer", "api developer", "server engineer"],
  "product manager": ["product owner", "technical product manager"],
  "project manager": ["program manager", "delivery manager", "scrum master"],
  "marketing manager": ["marketing coordinator", "digital marketing manager", "brand manager"],
  "accountant": ["staff accountant", "financial analyst", "bookkeeper"],
  "financial analyst": ["accountant", "fp&a analyst", "investment analyst"],
  "hr manager": ["human resources manager", "people operations manager", "hr business partner"],
  "customer service representative": ["customer support specialist", "client services representative"],
  "sales representative": ["account executive", "business development representative"],
  "ux designer": ["ui designer", "product designer", "ux researcher"],
  "devops engineer": ["site reliability engineer", "platform engineer", "cloud engineer"],
};

export function getRelatedRoles(title: string): string[] {
  const key = title.trim().toLowerCase();
  if (RELATED_ROLES[key]) return RELATED_ROLES[key];

  const words = key.split(/\s+/).filter((w) => w.length > 2 && w !== "the" && w !== "and");
  return words.length > 1 ? words : [];
}
