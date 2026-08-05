import { Stage } from "@prisma/client";

export const STAGE_ORDER: Stage[] = [
  Stage.SAVED,
  Stage.SUBMITTED,
  Stage.INTERVIEW_1,
  Stage.INTERVIEW_2,
  Stage.INTERVIEW_3,
  Stage.INTERVIEW_4,
  Stage.OFFER,
  Stage.REJECTED,
];

export const STAGE_LABELS: Record<Stage, string> = {
  SAVED: "Saved",
  SUBMITTED: "Submitted",
  INTERVIEW_1: "Interview 1",
  INTERVIEW_2: "Interview 2",
  INTERVIEW_3: "Interview 3",
  INTERVIEW_4: "Interview 4",
  OFFER: "Offer",
  REJECTED: "Rejected",
};

export const STAGE_BADGE_VARIANT: Record<
  Stage,
  "default" | "secondary" | "destructive" | "success" | "outline"
> = {
  SAVED: "secondary",
  SUBMITTED: "default",
  INTERVIEW_1: "outline",
  INTERVIEW_2: "outline",
  INTERVIEW_3: "outline",
  INTERVIEW_4: "outline",
  OFFER: "success",
  REJECTED: "destructive",
};
