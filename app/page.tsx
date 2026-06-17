import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import StatCard from "@/app/components/StatCard";
import RecentInvoices from "@/app/components/RecentInvoices";
import RecentClients from "@/app/components/RecentClients";
import ActivityFeed from "@/app/components/ActivityFeed";
import { stats } from "@/app/lib/mock-data";

export default function Home() {
  return (
    <div className="flex flex-1 bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <StatCard key={stat.id} stat={stat} />
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <RecentInvoices />
              </div>
              <div className="space-y-6">
                <RecentClients />
                <ActivityFeed />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
