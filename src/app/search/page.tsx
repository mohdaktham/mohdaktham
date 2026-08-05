import type { Metadata } from "next";

import { SearchExperience } from "@/components/search/SearchExperience";

export const metadata: Metadata = {
  title: "Search Jobs · Job Tracker",
};

export default function SearchPage() {
  return <SearchExperience />;
}
