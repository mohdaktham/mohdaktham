import { PrismaClient, Stage } from "@prisma/client";

const prisma = new PrismaClient();

const SAMPLE_APPLICATIONS = [
  {
    source: "adzuna",
    externalId: "seed-1",
    title: "Data Analyst",
    company: "Northgate Analytics",
    location: "Toronto, ON",
    salaryMin: 65000,
    salaryMax: 80000,
    description: "Analytics role turning messy datasets into decisions.",
    applyUrl: "https://example.com/jobs/seed-1",
    stage: Stage.SUBMITTED,
    appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
  {
    source: "adzuna",
    externalId: "seed-2",
    title: "Business Intelligence Analyst",
    company: "Harbourfront Consulting",
    location: "Toronto, ON",
    salaryMin: 70000,
    salaryMax: 90000,
    description: "BI role modeling processes and building dashboards.",
    applyUrl: "https://example.com/jobs/seed-2",
    stage: Stage.INTERVIEW_1,
    appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    notes: "Phone screen went well, technical interview scheduled.",
  },
  {
    source: "adzuna",
    externalId: "seed-3",
    title: "Reporting Analyst",
    company: "BC Housing",
    location: "Toronto, ON",
    salaryMin: 60000,
    salaryMax: 72000,
    description: "Operational reporting for housing program stakeholders.",
    applyUrl: "https://example.com/jobs/seed-3",
    stage: Stage.OFFER,
    appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
  },
  {
    source: "adzuna",
    externalId: "seed-4",
    title: "Junior Data Analyst",
    company: "Maple Retail Co.",
    location: "Waterloo, ON",
    salaryMin: 55000,
    salaryMax: 65000,
    description: "Entry-level retail analytics role.",
    applyUrl: "https://example.com/jobs/seed-4",
    stage: Stage.REJECTED,
    appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
  },
  {
    source: "adzuna",
    externalId: "seed-5",
    title: "Product Analyst",
    company: "Crestline Software",
    location: "Toronto, ON",
    salaryMin: 72000,
    salaryMax: 88000,
    description: "Metrics and experiments to guide the product roadmap.",
    applyUrl: "https://example.com/jobs/seed-5",
    stage: Stage.SAVED,
  },
];

async function main() {
  for (const application of SAMPLE_APPLICATIONS) {
    await prisma.application.upsert({
      where: {
        source_externalId: {
          source: application.source,
          externalId: application.externalId,
        },
      },
      update: {},
      create: application,
    });
  }
  console.log(`Seeded ${SAMPLE_APPLICATIONS.length} sample applications.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
