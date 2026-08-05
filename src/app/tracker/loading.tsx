import { Skeleton } from "@/components/ui/skeleton";

export default function TrackerLoading() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6">
      <Skeleton className="h-6 w-48" />
      <div className="flex gap-4 overflow-x-auto pb-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-96 w-72 shrink-0 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
