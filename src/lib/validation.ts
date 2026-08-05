import { Stage } from "@prisma/client";
import { z } from "zod";

export const searchQuerySchema = z.object({
  where: z.string().min(1, "Location is required"),
  what: z.string().min(1, "Job title / keywords are required"),
  whatOr: z.string().optional(),
});

export const saveJobSchema = z.object({
  source: z.string().default("adzuna"),
  externalId: z.string().min(1),
  title: z.string().min(1),
  company: z.string().min(1),
  location: z.string().min(1),
  salaryMin: z.number().int().positive().optional().nullable(),
  salaryMax: z.number().int().positive().optional().nullable(),
  description: z.string().default(""),
  applyUrl: z.string().url(),
  postedAt: z.iso.datetime().optional().nullable(),
});

export const updateApplicationSchema = z
  .object({
    stage: z.nativeEnum(Stage).optional(),
    notes: z.string().nullable().optional(),
    appliedDate: z.iso.datetime().nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
