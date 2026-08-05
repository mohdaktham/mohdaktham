-- CreateEnum
CREATE TYPE "Stage" AS ENUM ('SAVED', 'SUBMITTED', 'INTERVIEW_1', 'INTERVIEW_2', 'INTERVIEW_3', 'INTERVIEW_4', 'OFFER', 'REJECTED');

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'adzuna',
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "description" TEXT NOT NULL,
    "applyUrl" TEXT NOT NULL,
    "postedAt" TIMESTAMP(3),
    "stage" "Stage" NOT NULL DEFAULT 'SAVED',
    "notes" TEXT,
    "appliedDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Application_stage_idx" ON "Application"("stage");

-- CreateIndex
CREATE UNIQUE INDEX "Application_source_externalId_key" ON "Application"("source", "externalId");
