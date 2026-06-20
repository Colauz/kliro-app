import Sidebar from "@/app/components/Sidebar";

function Shimmer({ className }: { className: string }) {
  return <div className={`animate-pulse rounded bg-gray-200 ${className}`} />;
}

export default function Loading() {
  return (
    <div className="flex flex-1 bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-gray-50/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
          <Shimmer className="h-5 w-44" />
          <div className="flex items-center gap-2">
            <Shimmer className="h-9 w-9 rounded-lg" />
            <Shimmer className="h-9 w-32 rounded-lg" />
          </div>
        </div>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <Shimmer className="h-4 w-28" />
                  <div className="mt-3 flex items-end justify-between">
                    <Shimmer className="h-8 w-20" />
                    <Shimmer className="h-4 w-14" />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                    <Shimmer className="h-4 w-32" />
                    <Shimmer className="h-4 w-16" />
                  </div>
                  <div className="divide-y divide-gray-100">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                        <Shimmer className="h-4 w-20" />
                        <Shimmer className="h-4 w-24 flex-1" />
                        <Shimmer className="h-5 w-18 rounded-full" />
                        <Shimmer className="h-4 w-16" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                    <Shimmer className="h-4 w-28" />
                    <Shimmer className="h-4 w-12" />
                  </div>
                  <div className="divide-y divide-gray-100">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3 px-5 py-3.5">
                        <Shimmer className="h-9 w-9 rounded-full" />
                        <div className="flex-1 space-y-1.5">
                          <Shimmer className="h-3.5 w-24" />
                          <Shimmer className="h-3 w-16" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                  <div className="border-b border-gray-200 px-5 py-4">
                    <Shimmer className="h-4 w-32" />
                  </div>
                  <div className="px-5 py-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-start gap-3 py-3">
                        <Shimmer className="h-8 w-8 rounded-full" />
                        <div className="flex-1 space-y-1.5">
                          <Shimmer className="h-3.5 w-36" />
                          <Shimmer className="h-3 w-24" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
