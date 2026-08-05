"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { DemoModeBanner } from "@/components/shared/DemoModeBanner";
import { SearchForm } from "@/components/search/SearchForm";
import { JobResultsGrid } from "@/components/search/JobResultsGrid";
import { getRelatedRoles } from "@/lib/relatedRoles";
import type { Application } from "@prisma/client";
import type { JobResult } from "@/types/job";

const PREFS_KEY = "jobSearchPrefs";
const DEFAULT_PREFS: SearchPrefs = {
  location: "Toronto, ON",
  title: "Data Analyst",
  includeSimilar: false,
};

interface SearchPrefs {
  location: string;
  title: string;
  includeSimilar: boolean;
}

function loadStoredPrefs(): SearchPrefs {
  try {
    const raw = window.localStorage.getItem(PREFS_KEY);
    if (!raw) return DEFAULT_PREFS;
    const stored = JSON.parse(raw) as Partial<SearchPrefs>;
    return {
      location: stored.location || DEFAULT_PREFS.location,
      title: stored.title || DEFAULT_PREFS.title,
      includeSimilar:
        typeof stored.includeSimilar === "boolean"
          ? stored.includeSimilar
          : DEFAULT_PREFS.includeSimilar,
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function SearchExperience() {
  const [prefs, setPrefs] = useState<SearchPrefs>(DEFAULT_PREFS);

  const [jobs, setJobs] = useState<JobResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const didInit = useRef(false);

  const runSearch = useCallback(async (params: SearchPrefs) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      window.localStorage.setItem(PREFS_KEY, JSON.stringify(params));
    } catch {
      // ignore storage failures (private browsing, quota, etc.)
    }

    const search = new URLSearchParams({ where: params.location, what: params.title });
    if (params.includeSimilar) {
      const related = getRelatedRoles(params.title);
      if (related.length > 0) search.set("whatOr", related.join(" "));
    }

    try {
      const res = await fetch(`/api/jobs/search?${search.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Search failed");
      setJobs(data.jobs);
      setDemoMode(data.demoMode);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    // One-time hydration from localStorage on mount: this is reading persisted
    // client-only state (unavailable during SSR), not reacting to a subsequent
    // external-system update, so a single setState here is intentional.
    const stored = loadStoredPrefs();
    setPrefs(stored);
    runSearch(stored);

    fetch("/api/tracker")
      .then((res) => (res.ok ? res.json() : []))
      .then((applications: Application[]) => {
        setSavedIds(new Set(applications.map((a) => a.externalId)));
      })
      .catch(() => {});
  }, [runSearch]);

  function handleSaved(externalId: string) {
    setSavedIds((prev) => new Set(prev).add(externalId));
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6">
      <SearchForm
        location={prefs.location}
        title={prefs.title}
        includeSimilar={prefs.includeSimilar}
        loading={loading}
        onLocationChange={(location) => setPrefs((p) => ({ ...p, location }))}
        onTitleChange={(title) => setPrefs((p) => ({ ...p, title }))}
        onIncludeSimilarChange={(includeSimilar) =>
          setPrefs((p) => ({ ...p, includeSimilar }))
        }
        onSubmit={() => runSearch(prefs)}
      />
      {demoMode && !loading && <DemoModeBanner />}
      <JobResultsGrid
        jobs={jobs}
        loading={loading}
        error={error}
        hasSearched={hasSearched}
        savedIds={savedIds}
        onSaved={handleSaved}
        onRetry={() => runSearch(prefs)}
      />
    </div>
  );
}
