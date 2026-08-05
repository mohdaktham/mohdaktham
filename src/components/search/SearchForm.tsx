"use client";

import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SearchFormProps {
  location: string;
  title: string;
  includeSimilar: boolean;
  loading: boolean;
  onLocationChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onIncludeSimilarChange: (value: boolean) => void;
  onSubmit: () => void;
}

export function SearchForm({
  location,
  title,
  includeSimilar,
  loading,
  onLocationChange,
  onTitleChange,
  onIncludeSimilarChange,
  onSubmit,
}: SearchFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col gap-4 rounded-xl border bg-card p-5 shadow-sm sm:flex-row sm:items-end sm:gap-3"
    >
      <div className="flex-1 space-y-1.5">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          placeholder="Toronto, ON"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
        />
      </div>
      <div className="flex-1 space-y-1.5">
        <Label htmlFor="title">Job title / keywords</Label>
        <Input
          id="title"
          placeholder="Data Analyst"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2 pb-2 sm:pb-2.5">
        <Checkbox
          id="similar"
          checked={includeSimilar}
          onCheckedChange={(checked) => onIncludeSimilarChange(checked === true)}
        />
        <Label htmlFor="similar" className="font-normal text-muted-foreground">
          Include similar roles
        </Label>
      </div>
      <Button type="submit" disabled={loading} className="sm:w-auto">
        <SearchIcon />
        {loading ? "Searching…" : "Search"}
      </Button>
    </form>
  );
}
