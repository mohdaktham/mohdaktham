import { InfoIcon } from "lucide-react";

export function DemoModeBanner() {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
      <InfoIcon className="mt-0.5 size-4 shrink-0" />
      <p>
        Showing sample data — add <code className="font-mono">ADZUNA_APP_ID</code> and{" "}
        <code className="font-mono">ADZUNA_APP_KEY</code> to your environment to search
        live jobs.
      </p>
    </div>
  );
}
