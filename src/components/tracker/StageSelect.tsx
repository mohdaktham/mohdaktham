"use client";

import { Stage } from "@prisma/client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { STAGE_LABELS, STAGE_ORDER } from "@/lib/stages";

interface StageSelectProps {
  value: Stage;
  onChange: (stage: Stage) => void;
}

export function StageSelect({ value, onChange }: StageSelectProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as Stage)}>
      <SelectTrigger size="sm" className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STAGE_ORDER.map((stage) => (
          <SelectItem key={stage} value={stage}>
            {STAGE_LABELS[stage]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
