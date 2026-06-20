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
          <Shimmer className="h-5 w-20" />
          <Shimmer className="h-9 w-32 rounded-lg" />
        </div>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <Shimmer className="h-9 w-56 rounded-lg" />
                <Shimmer className="h-9 w-52 rounded-lg" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {["w-40", "w-28", "w-24", "w-32", "w-20"].map((w, i) => (
                        <th key={i} className="px-5 py-3">
                          <Shimmer className={`h-3 ${w}`} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <tr key={i} className="border-t border-gray-100">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <Shimmer className="h-9 w-9 rounded-full" />
                            <div className="space-y-1.5">
                              <Shimmer className="h-3.5 w-28" />
                              <Shimmer className="h-3 w-20" />
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5"><Shimmer className="h-3.5 w-24" /></td>
                        <td className="px-5 py-3.5"><Shimmer className="h-5 w-16 rounded-full" /></td>
                        <td className="hidden px-5 py-3.5 md:table-cell">
                          <div className="space-y-1.5">
                            <Shimmer className="h-3.5 w-32" />
                            <Shimmer className="h-3 w-24" />
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex justify-end gap-1">
                            <Shimmer className="h-8 w-8 rounded-lg" />
                            <Shimmer className="h-8 w-8 rounded-lg" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-gray-200 px-5 py-3">
                <Shimmer className="h-3 w-36" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
