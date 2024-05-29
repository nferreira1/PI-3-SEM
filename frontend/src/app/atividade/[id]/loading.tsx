import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-screen-lg mx-auto lg:pt-6 lg:pb-12 lg:px-5">
      <Skeleton className="h-[250px] rounded-none lg:h-[487px] lg:rounded-2xl" />

      <div className="relative p-5 space-y-2 border-b border-solid border-secondary lg:px-0 lg:border-none">
        <Skeleton className="w-24 h-6" />
        <Skeleton className="w-40 h-4" />
        <Skeleton className="block w-28 h-4 lg:hidden" />
        <Skeleton className="hidden absolute top-1 right-0 w-32 h-20 lg:block" />
      </div>

      <div className="mt-6 p-5 flex flex-col gap-4 md:grid grid-cols-2 lg:p-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="min-h-32 min-w-[110px] max-w-[758px]" />
        ))}
      </div>
    </div>
  );
}
