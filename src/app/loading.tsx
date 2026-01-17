import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <main>
      {/* Hero Section Skeleton */}
      <section className="min-h-screen flex flex-col items-center justify-center px-10 max-md:px-5">
        <div className="text-center max-w-3xl">
          <Skeleton className="h-16 w-64 mx-auto mb-6" />
          <Skeleton className="h-12 w-full max-w-xl mx-auto mb-4" />
          <Skeleton className="h-12 w-3/4 mx-auto mb-8" />
          <Skeleton className="h-6 w-96 mx-auto mb-12" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Skeleton className="h-14 w-48 rounded-xl" />
            <Skeleton className="h-14 w-48 rounded-xl" />
          </div>
        </div>
      </section>

      {/* Sample Comparison Section Skeleton */}
      <section className="py-20 px-10 max-md:px-5">
        <div className="max-w-[1200px] mx-auto">
          <Skeleton className="h-10 w-80 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-[400px] rounded-2xl" />
            <Skeleton className="h-[400px] rounded-2xl" />
          </div>
        </div>
      </section>
    </main>
  );
}
